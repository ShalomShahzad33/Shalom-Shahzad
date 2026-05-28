import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const HERO_TECH_STACK = [
  { label: "React TS", accent: "#61dafb" },
  { label: "Supabase", accent: "#3ecf8e" },
  { label: "Zustand", accent: "#a78bfa" },
  { label: "TanStack Query", accent: "#ff6b6b" },
  { label: "GSAP", accent: "#0ae448" },
  { label: "Tailwind CSS", accent: "#38bdf8" },
  { label: "WordPress", accent: "#21759b" },
] as const;

/** Keeps content hidden until GSAP runs (avoids flash + survives Strict Mode remount). */
const HIDDEN = "invisible opacity-0";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const techPillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (
        !greetingRef.current ||
        !nameRef.current ||
        !techPillsRef.current ||
        !ctaRef.current ||
        !eyebrowRef.current ||
        !subtitleRef.current ||
        !scrollHintRef.current
      ) {
        return;
      }

      const pills = gsap.utils.toArray<HTMLElement>(
        techPillsRef.current.querySelectorAll("[data-hero-pill]"),
      );
      const ctas = gsap.utils.toArray<HTMLElement>(ctaRef.current.children);

      const greetingSplit = new SplitText(greetingRef.current, {
        type: "chars",
      });
      const nameSplit = new SplitText(nameRef.current, {
        type: "words",
        wordsClass: "inline-block",
      });

      // Parent HIDDEN would block split chars from showing — unhide containers only
      greetingRef.current.classList.remove("invisible", "opacity-0");
      nameRef.current.classList.remove("invisible", "opacity-0");

      gsap.set(nameSplit.words, { display: "inline-block" });

      // Hidden + offset before timeline (pairs with HIDDEN class; no clearProps on pills)
      gsap.set(eyebrowRef.current, { autoAlpha: 0, y: 24 });
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 40 });
      gsap.set(scrollHintRef.current, { autoAlpha: 0, y: 12 });
      gsap.set(pills, { autoAlpha: 0, y: 28, scale: 0.92 });
      gsap.set(ctas, { autoAlpha: 0, y: 32 });
      gsap.set(greetingSplit.chars, { autoAlpha: 0, y: 80 });
      gsap.set(nameSplit.words, { autoAlpha: 0, y: 120 });

      const introTl = gsap.timeline({ defaults: { ease: "expo.out" } });

      introTl
        .to(eyebrowRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
        })
        .to(
          greetingSplit.chars,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.03,
          },
          "-=0.25",
        )
        .to(
          nameSplit.words,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.08,
          },
          "-=0.45",
        )
        .to(
          subtitleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
          },
          "-=0.35",
        )
        .to(
          pills,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: "power3.inOut",
          },
          "-=0.15",
        )
        .to(
          ctas,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.05",
        )
        .to(
          scrollHintRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
          },
          ">-0.05",
        );

      orbRefs.current.forEach((orb, index) => {
        if (!orb) return;

        gsap.set(orb, { autoAlpha: 0, scale: 0.6 });
        gsap.to(orb, {
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          delay: 0.15 * index,
          ease: "power2.out",
        });
        gsap.to(orb, {
          y: index % 2 === 0 ? "+=28" : "-=24",
          x: index % 2 === 0 ? "+=16" : "-=14",
          duration: 5 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const scrollBounce = gsap.to(scrollHintRef.current, {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2,
      });

      return () => {
        scrollBounce.kill();
        greetingSplit.revert();
        nameSplit.revert();
      };
    },
    { scope: heroRef },
  );

  const setOrbRef = (index: number) => (el: HTMLDivElement | null) => {
    orbRefs.current[index] = el;
  };

  return (
    <section
      ref={heroRef}
      className="relative grid min-h-dvh w-full grid-rows-[1fr_auto] overflow-hidden bg-slate-950 px-6 text-white"
      aria-label="Introduction"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-slate-950 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(67,56,202,0.35),transparent),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(14,116,144,0.12),transparent),radial-gradient(ellipse_50%_35%_at_0%_80%,rgba(16,185,129,0.1),transparent),linear-gradient(165deg,#020617_0%,#0f172a_45%,#020617_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
        aria-hidden="true"
      />

      <div
        ref={setOrbRef(0)}
        className={`pointer-events-none absolute top-[8%] -left-[6%] z-0 h-88 w-88 rounded-full bg-indigo-500/20 blur-[80px] ${HIDDEN}`}
        aria-hidden="true"
      />
      <div
        ref={setOrbRef(1)}
        className={`pointer-events-none absolute right-[-4%] bottom-[12%] z-0 h-72 w-72 rounded-full bg-emerald-500/15 blur-[80px] ${HIDDEN}`}
        aria-hidden="true"
      />
      <div
        ref={setOrbRef(2)}
        className={`pointer-events-none absolute top-[42%] right-[12%] z-0 h-56 w-56 rounded-full bg-sky-400/10 blur-[80px] ${HIDDEN}`}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center py-16">
        <div className="flex max-w-5xl flex-col items-center text-center">
          <p
            ref={eyebrowRef}
            className={`mb-5 text-xs font-medium tracking-[0.35em] text-slate-400 uppercase md:text-sm ${HIDDEN}`}
          >
            Frontend Developer
          </p>

          <h1 className="mb-6 overflow-hidden leading-[1.05]">
            <span
              ref={greetingRef}
              className={`block font-[Inter,sans-serif] text-4xl font-light tracking-tight text-slate-200 sm:text-5xl md:text-6xl ${HIDDEN}`}
            >
              Hi, I&apos;m
            </span>
            <span
              ref={nameRef}
              className={`mt-1 block font-['Syne',sans-serif] text-5xl font-bold text-slate-50 sm:text-6xl md:text-7xl lg:text-8xl ${HIDDEN}`}
            >
              Shalom Shahzad
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className={`max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl ${HIDDEN}`}
          >
            I craft fast, animated product experiences with{" "}
            <span className="text-[#61dafb]">React & TypeScript</span>,{" "}
            <span className="text-[#3ecf8e]">Supabase</span>, and{" "}
            <span className="text-[#ff6b6b]">TanStack Query</span> — polished
            with <span className="text-[#38bdf8]">Tailwind</span> and{" "}
            <span className="text-[#0ae448]">GSAP</span>.
          </p>

          <div
            ref={techPillsRef}
            className="mt-8 flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-2.5"
          >
            {HERO_TECH_STACK.map(({ label, accent }) => (
              <span
                key={label}
                data-hero-pill
                style={{ "--pill-accent": accent } as CSSProperties}
                className={`inline-flex items-center gap-1.5 rounded-full border border-slate-500/20 bg-slate-900/65 px-3.5 py-1.5 text-[0.7rem] font-medium tracking-wide text-slate-200 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-(--pill-accent)/50 hover:shadow-[0_0_24px_color-mix(in_srgb,var(--pill-accent)_18%,transparent)] sm:px-4 sm:text-xs ${HIDDEN}`}
              >
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 10px ${accent}`,
                  }}
                  aria-hidden="true"
                />
                {label}
              </span>
            ))}
          </div>

          <div
            ref={ctaRef}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5"
          >
            <a
              href="#projects-section"
              className={`inline-flex min-w-44 items-center justify-center gap-2 rounded border border-slate-50 bg-slate-50 px-6 py-3 text-sm font-semibold tracking-wide text-slate-900 transition duration-300 hover:bg-transparent hover:text-slate-50 hover:shadow-[0_0_32px_rgba(147,197,253,0.2)] focus-visible:bg-transparent focus-visible:text-slate-50 ${HIDDEN}`}
            >
              View Projects
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="#footer"
              className={`inline-flex min-w-44 items-center justify-center gap-2 rounded border border-slate-500/45 px-6 py-3 text-sm font-semibold tracking-wide text-slate-200 transition duration-300 hover:border-slate-50 hover:bg-slate-50 hover:text-slate-900 focus-visible:border-slate-50 focus-visible:bg-slate-50 focus-visible:text-slate-900 ${HIDDEN}`}
            >
              Let&apos;s Talk
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className={`relative z-10 flex flex-col items-center gap-2 pb-8 text-slate-500 ${HIDDEN}`}
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="block h-10 w-px bg-linear-to-b from-slate-500 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
