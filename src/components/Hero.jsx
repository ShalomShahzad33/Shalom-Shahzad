import ReactLogo from "../assets/images/react-logo.png";
import TailwindLogo from "../assets/images/tailwindcss-logo.png";
import GSAPLogo from "../assets/images/gsap-logo.png";
import JavascriptLogo from "../assets/images/javascript-logo.png";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const Hero = () => {
  const LogoSection = useRef(null);
  const Title = useRef(null);
  const HeroPara = useRef(null);
  const Buttons = useRef(null);

  useGSAP(() => {
    const HeroTitle = new SplitText(Title.current, { type: "words" });

    const HeroTl = gsap.timeline();

    HeroTl.from(HeroTitle.words, {
      y: 150,
      duration: 0.75,
      stagger: 0.1,
      ease: "expo.out",
    })
      .from(HeroPara.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "expo.out",
      })
      .from(Buttons.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      .from(LogoSection.current, {
        opacity: 0,
        duration: 0.5,
        ease: "none",
      });

    return () => {
      HeroTitle.revert();
      HeroTl.kill();
    };
  });

  return (
    <section className="text-white flex flex-col text-center gap-5 justify-center items-center h-dvh w-dvw bg-linear-to-tr from-slate-950 via-indigo-950 to-blue-950 md:gap-9">
      <h1
        className="text-3xl sm:text-5xl md:text-7xl relative overflow-hidden"
        ref={Title}
      >
        Hi, I am&nbsp;
        <span className="font-bold text-blue-700 mix-blend-color-dodge block sm:inline text-6xl md:text-7xl">
          Shalom Shahzad
        </span>
      </h1>
      <p className="md:text-2xl" ref={HeroPara}>
        I am a React Frontend Developer working with{" "}
        <span className="text-blue-500">Tailwind</span> and{" "}
        <span className="text-[#0ae448]">GSAP</span>
      </p>
      <div ref={Buttons} className="flex gap-6">
        <button
          aria-label="See my Work"
          className="bg-white text-blue-700 px-4 py-2 border hover:cursor-pointer hover:bg-transparent hover:text-white hover:border transition-all text-center focus:bg-transparent focus:text-white"
        >
          See my Work &rarr;
        </button>
        <button
          aria-label="Contact Me"
          className="px-4 py-2 border hover:cursor-pointer hover:bg-white hover:text-blue-700 text-center transition-all focus:bg-white focus:text-blue-700"
        >
          Contact Me
        </button>
      </div>

      <div ref={LogoSection}>
        <img
          src={ReactLogo}
          alt="react-logo"
          className="hero-logos float-animation-top top-20 bottom-0 left-15 right-0 drop-shadow-blue-700 drop-shadow-xl"
        />
        <img
          src={TailwindLogo}
          alt="tailwind-logo"
          className="hero-logos float-animation-bottom left-15 bottom-20 drop-shadow-blue-600 drop-shadow-xl"
        />
        <img
          src={GSAPLogo}
          alt="gsap-logo"
          className="hero-logos float-animation-top right-15 top-20 drop-shadow-green-700 drop-shadow-xl"
        />
        <img
          src={JavascriptLogo}
          alt="javascript-logo"
          className="hero-logos float-animation-bottom right-15 bottom-20 drop-shadow-yellow-400 drop-shadow-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
