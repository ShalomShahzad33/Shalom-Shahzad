import { useRef } from "react";
import myTechStack from "../constants/MyTechStack";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const TechStackCard = useRef(null);
  const TechStackSection = useRef(null);

  useGSAP(() => {
    gsap.from(TechStackCard.current, {
      scrollTrigger: {
        trigger: TechStackCard.current,
        start: "top 50%",
        end: "bottom 50%",
      },

      x: -20,
      opacity: 0,
      duration: 0.75,
      ease: "none",
    });
  });

  return (
    <section
      className="w-dvw bg-slate-950 text-white p-6"
      ref={TechStackSection}
    >
      <article className="p-2 md:h-auto rounded bg-slate-800">
        <h2 className="text-4xl md:text-5xl mb-4">My Tech Stack</h2>
        <div
          className="tech-cards items-stretch flex justify-center gap-2 flex-col md:flex-row flex-wrap"
          ref={TechStackCard}
        >
          {myTechStack.map(({ title, description, logo, alt }) => {
            return (
              <div
                className="card flex md:flex-col justify-center md:h-auto md:w-70 h-auto items-center gap-8 bg-slate-900/80 p-4 rounded text-pretty md:text-center hover:drop-shadow transition-all duration-150 ease-in hover:drop-shadow-blue-400/30 hover:shadow-[inset_2px_2px_12px_0px_#9abef8]"
                key={title}
              >
                <div className="text w-1/2 md:w-full md:h-1/2 order-2">
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p>{description}</p>
                </div>
                <div className="w-1/4 md:h-1/2 md:w-1/2 order-1">
                  <img src={logo} alt={alt} className="object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
};

export default TechStack;
