import { useRef } from "react";
import MyImg from "../assets/images/my-image.webp";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HIDDEN = "invisible opacity-0";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !headingRef.current ||
        !paragraphRef.current ||
        !imageWrapperRef.current ||
        !imageRef.current ||
        !eyebrowRef.current
      ) {
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

      gsap.set(paragraphRef.current, {
        autoAlpha: 0,
        y: 24,
      });

      gsap.set(imageWrapperRef.current, {
        autoAlpha: 0,
        scale: 0.9,
        y: 30,
      });

      gsap.set(imageRef.current, {
        scale: 1.08,
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
          paragraphRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.45",
        )
        .to(
          imageWrapperRef.current,
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 1,
          },
          "-=0.7",
        )
        .to(
          imageRef.current,
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=1",
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
      id="about-section"
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

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center gap-14 lg:flex-row lg:justify-between">
        {/* LEFT CONTENT */}
        <div className="w-full max-w-3xl text-center lg:text-left">
          <p
            ref={eyebrowRef}
            className={`text-xs font-medium tracking-[0.32em] text-slate-400 uppercase md:text-sm ${HIDDEN}`}
          >
            About Me
          </p>

          <h2
            ref={headingRef}
            className={`mt-3 font-['Syne',sans-serif] text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl md:text-[5rem] ${HIDDEN}`}
            style={{ lineHeight: 0.9 }}
          >
            Creating interfaces that blend motion, clarity, and performance.
          </h2>

          <p
            ref={paragraphRef}
            className={`mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base md:text-lg lg:max-w-xl ${HIDDEN}`}
          >
            I’m a frontend developer passionate about crafting immersive digital
            experiences with modern web technologies and thoughtful design.
            <br />
            <br />
            My focus is on building smooth, responsive, and visually polished
            interfaces that not only look great but also feel intuitive and
            performant.
            <br />
            <br />I enjoy turning ideas into engaging user experiences through
            clean code, refined UI, and subtle motion that gives products
            personality.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div
          ref={imageWrapperRef}
          className={`relative flex items-center justify-center ${HIDDEN}`}
        >
          {/* Glow */}
          <div className="absolute h-[120%] w-[120%] rounded-full bg-sky-500/10 blur-3xl" />

          {/* Ring */}
          <div className="absolute h-[420px] w-[420px] rounded-full border border-white/10" />

          {/* Image */}
          <div className="relative h-[340px] w-[340px] overflow-hidden rounded-full border border-white/10 bg-slate-900/70 p-2 backdrop-blur-xl sm:h-[400px] sm:w-[400px]">
            <img
              ref={imageRef}
              src={MyImg}
              alt="Shalom Shahzad"
              className="h-full w-full rounded-full object-cover object-center"
            />
          </div>

          {/* Floating mini badge */}
          <div className="absolute bottom-2 right-0 rounded-full border border-white/10 bg-slate-900/80 px-5 py-2 backdrop-blur-xl">
            <span className="text-xs tracking-[0.2em] text-slate-300 uppercase">
              Frontend Dev
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
