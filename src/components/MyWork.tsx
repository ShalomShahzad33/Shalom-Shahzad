import { useRef } from "react";
import myWork from "../constants/MyWork";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HIDDEN = "invisible opacity-0";

const MyWork = () => {
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
        y: 80,
        scale: 0.96,
      });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
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
            duration: 0.8,
            stagger: 0.12,
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
      id="projects-section"
      className="relative overflow-hidden bg-slate-950 px-6 py-28 text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_30%),linear-gradient(to_bottom,#020617,#0f172a,#020617)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-size-[52px_52px] mask-[radial-gradient(circle_at_center,black,transparent_80%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="max-w-3xl">
          <p
            ref={eyebrowRef}
            className={`text-xs font-medium tracking-[0.32em] text-slate-400 uppercase md:text-sm ${HIDDEN}`}
          >
            My Work
          </p>

          <h2
            ref={headingRef}
            className={`mt-1 font-['Syne',sans-serif] text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl md:text-[5rem] ${HIDDEN}`}
            style={{ lineHeight: 1.2 }}
          >
            Selected projects crafted with performance, motion, and modern UX.
          </h2>
        </div>

        {/* Projects */}
        <div className="mt-16 flex flex-col gap-10">
          {myWork.map(
            ({ title, description, image, alt, tech, link }, index) => (
              <article
                key={title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={`group relative overflow-hidden rounded-[2.5rem] bg-slate-900/40 p-px transition-all duration-500 hover:-translate-y-2 ${HIDDEN}`}
              >
                {/* Border */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.20),transparent_35%,rgba(255,255,255,0.10))]" />

                <div className="relative flex flex-col overflow-hidden rounded-[2.5rem] bg-slate-950/95 backdrop-blur-2xl lg:flex-row">
                  <div className="relative w-full lg:w-[58%] h-[260px] sm:h-[320px] lg:h-[360px] overflow-hidden">
                    {/* Overlay */}
                    <div className="absolute inset-0 z-10 bg-linear-to-tr from-slate-950/60 via-transparent to-transparent opacity-70 transition duration-500 group-hover:opacity-40" />

                    {/* Image */}
                    <img
                      src={image}
                      alt={alt}
                      className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.05]"
                    />

                    {/* Shine */}
                    <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                      <div className="absolute -left-40 top-0 h-full w-32 rotate-12 bg-white/10 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />
                    </div>
                  </div>

                  {/* CONTENT SIDE */}
                  <div className="relative flex flex-1 flex-col justify-between p-8 md:p-10">
                    <span className="text-xs tracking-[0.3em] text-slate-500 uppercase">
                      0{index + 1}
                    </span>

                    <div className="mt-8">
                      <h3 className="font-['Syne',sans-serif] text-4xl font-bold tracking-tight text-white md:text-5xl">
                        {title}
                      </h3>

                      <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                        {description}
                      </p>

                      <div className="mt-7 flex flex-wrap gap-2">
                        {tech.split(",").map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs tracking-wide text-slate-300 backdrop-blur-xl transition duration-300 hover:border-white/20 hover:bg-white/8"
                          >
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10">
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/20 hover:bg-white/8"
                      >
                        View Project
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>

                    <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl opacity-0 transition duration-700 group-hover:opacity-100" />
                  </div>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default MyWork;
