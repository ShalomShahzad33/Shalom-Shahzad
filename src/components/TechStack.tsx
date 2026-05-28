import { useRef } from "react";
import myTechStack from "../constants/MyTechStack";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HIDDEN = "invisible opacity-0";

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !headingRef.current || !eyebrowRef.current) {
        return;
      }

      const headingSplit = new SplitText(headingRef.current, {
        type: "words",
      });

      headingRef.current.classList.remove("invisible", "opacity-0");

      gsap.set(headingSplit.words, {
        y: 80,
        autoAlpha: 0,
      });

      gsap.set(eyebrowRef.current, {
        autoAlpha: 0,
        y: 16,
      });

      gsap.set(cardsRef.current, {
        autoAlpha: 0,
        y: 40,
        scale: 0.94,
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "expo.out",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
      });

      tl.to(eyebrowRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      })
        .to(
          headingSplit.words,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.04,
          },
          "-=0.2",
        )
        .to(
          cardsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
          },
          "-=0.45",
        );

      return () => {
        headingSplit.revert();
        tl.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="tech-stack-section"
      className="relative overflow-hidden bg-slate-950 px-6 py-28 text-white"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_30%),linear-gradient(to_bottom,#020617,#0f172a,#020617)]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-size-[52px_52px] mask-[radial-gradient(circle_at_center,black,transparent_80%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className={`text-xs font-medium tracking-[0.32em] text-slate-400 uppercase md:text-sm ${HIDDEN}`}
          >
            My Stack
          </p>

          <h2
            ref={headingRef}
            className={`mt-1 font-['Syne',sans-serif] text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl md:text-[5rem] ${HIDDEN}`}
            style={{ lineHeight: 0.9 }}
          >
            Modern tools for fast, scalable, and polished experiences.
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {myTechStack.map(({ title, description, accent }, index) => (
            <div
              key={title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`group relative overflow-hidden rounded-4xl bg-slate-900/40 p-px transition-all duration-500 hover:-translate-y-2 ${HIDDEN}`}
            >
              {/* Animated Gradient Border */}
              <div
                className="absolute inset-0 opacity-60 transition duration-500 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${accent}, transparent 35%, ${accent})`,
                }}
              />

              {/* Glow */}
              <div
                className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition duration-700 group-hover:opacity-100"
                style={{
                  background: `${accent}30`,
                }}
              />

              {/* Inner Card */}
              <div className="relative h-full rounded-4xl bg-slate-950/95 p-7 backdrop-blur-2xl">
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.3em] text-slate-500 uppercase">
                    0{index + 1}
                  </span>

                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: accent,
                      boxShadow: `0 0 18px ${accent}`,
                    }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="mt-10 font-['Syne',sans-serif] text-3xl font-bold tracking-tight text-white"
                  style={{
                    textShadow: `0 0 24px ${accent}20`,
                  }}
                >
                  {title}
                </h3>

                {/* Accent Line */}
                <div
                  className="mt-5 h-px w-full"
                  style={{
                    background: `linear-gradient(to right, ${accent}, transparent)`,
                  }}
                />

                {/* Description */}
                <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {description}
                </p>

                {/* Bottom Glow */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white/3 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                {/* Border Glow */}
                <div
                  className="absolute inset-0 rounded-4xl opacity-0 transition duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${accent}50`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
