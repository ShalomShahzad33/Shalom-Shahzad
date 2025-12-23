import { useRef } from "react";
import MyImg from "../assets/images/my-image.webp";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const AboutTitle = useRef(null);
  const AboutPara = useRef(null);
  const AboutSection = useRef(null);
  const AboutImage = useRef(null);

  useGSAP(() => {
    const AboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: AboutSection.current,
        start: "top 50%",
        end: "bottom 50%",
      },
    });

    AboutTl.from(AboutTitle.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "expo",
    })
      .from(AboutPara.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo",
      })
      .from(AboutImage.current, {
        clipPath: "inset(0% 50% 0% 50%)",
        duration: 1,
        ease: "expo",
      });

    return () => {
      AboutTl.kill();
    };
  });

  return (
    <section
      className="w-full h-[80dvh] bg-slate-950 text-white p-6 flex flex-col justify-center items-center gap-6 sm:flex-row"
      ref={AboutSection}
    >
      <div className="text w-full h-content bg-slate-800/70 p-2 rounded space-y-2 md:space-y-5 sm:h-full sm:w-1/2">
        <h1 className="text-4xl md:text-5xl" ref={AboutTitle}>
          ABOUT ME
        </h1>
        <p className="font-extralight text-sm md:text-md" ref={AboutPara}>
          I'm a frontend developer specializing in React, Tailwind CSS, and
          GSAP, focused on building fast, responsive, and visually engaging user
          interfaces. I enjoy turning complex ideas into clean, interactive
          experiences with smooth animations and thoughtful design. Alongside
          modern React workflows, I also have hands-on experience with WordPress
          and Elementor, allowing me to deliver flexible, content-driven
          websites when needed. I care about performance, usability, and writing
          maintainable code that scales.
        </p>
      </div>
      <div className="image h-1/2 w-full overflow-hidden sm:h-full sm:w-1/2">
        <img
          ref={AboutImage}
          src={MyImg}
          alt="my-img"
          className="object-center object-cover h-full w-full my-img sm:object-center rounded"
        />
      </div>
    </section>
  );
};

export default About;
