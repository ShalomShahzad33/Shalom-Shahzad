import { useRef } from "react";
import MyImg from "../assets/images/my-image.webp";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutTitle = useRef<HTMLHeadingElement>(null);
  const aboutPara = useRef<HTMLParagraphElement>(null);
  const aboutSection = useRef<HTMLElement>(null);
  const aboutImage = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection.current,
        start: "top 50%",
        end: "bottom 50%",
      },
    });

    aboutTl
      .from(aboutTitle.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo",
      })
      .from(aboutPara.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo",
      })
      .from(aboutImage.current, {
        clipPath: "inset(0% 50% 0% 50%)",
        duration: 1,
        ease: "expo",
      });

    return () => {
      aboutTl.kill();
    };
  });

  return (
    <section
      className="w-full h-[80dvh] bg-slate-950 text-white p-6 flex flex-col justify-center items-center gap-6 sm:flex-row"
      ref={aboutSection}
    >
      <div className="text w-full h-content p-2 rounded space-y-2 md:space-y-5 sm:h-full sm:w-1/2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl" ref={aboutTitle}>
          ABOUT ME
        </h1>
        <p
          className="font-extralight text-sm md:text-md lg:text-xl"
          ref={aboutPara}
        >
          I'm a frontend developer specializing in React, Tailwind CSS, and
          GSAP, focused on building fast, responsive, and visually engaging
          interfaces. I turn complex ideas into clean, interactive experiences
          with smooth animations and thoughtful design. I also have hands-on
          experience with WordPress and Elementor for flexible, content-driven
          websites. I care deeply about performance, usability, and maintainable
          code.
        </p>
      </div>
      <div className="image h-1/2 w-full overflow-hidden sm:h-full sm:w-1/2">
        <img
          ref={aboutImage}
          src={MyImg}
          alt="my-img"
          className="object-center object-cover h-full w-full my-img sm:object-center rounded"
        />
      </div>
    </section>
  );
};

export default About;
