import myWork from "../constants/MyWork";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const MyWork = () => {
  useGSAP(() => {
    const projects = gsap.utils.toArray(".project");

    gsap.to(projects, {
      xPercent: -100 * (projects.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#projects-section",
        pin: true,
        scrub: 1,
        snap: 1 / (projects.length - 1),
        end: () => `+=${window.innerWidth * projects.length}`,
      },
    });
  });

  return (
    <section className="bg-slate-950 text-white h-auto overflow-hidden">
      <h2 className="text-4xl md:text-5xl mb-4 ml-6">My Work</h2>
      <div className="h-dvh flex items-stretch gap-2" id="projects-section">
        {myWork.map(({ image, alt, title, description, tech, link }) => {
          return (
            <div
              className="project h-full w-screen flex md:flex-row flex-col shrink-0 bg-slate-800 p-6 rounded gap-2 grow flex-nowrap"
              key={title}
            >
              <div className="texts md:w-[20%] flex flex-col gap-6 justify-center text-pretty">
                <h1 className="text-4xl md:text-5xl">{title}</h1>
                <p>{description}</p>
                <p className="text-slate-200/40">{tech}</p>
                <button className="text-center inline self-center justify-self-center bg-blue-500 py-2 px-4">
                  <a href={link} target="_blank">
                    Live Link
                  </a>
                </button>
              </div>
              <div className="md:w-[80%] md:h-full w-full h-1/3">
                <img
                  src={image}
                  alt={alt}
                  className="object-cover h-full w-full rounded object-left md:object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MyWork;
