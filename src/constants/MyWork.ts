import DEVPaste from "../assets/images/devpaste.png";
import BearBasket from "../assets/images/bearbasket.png";
import PDFManipulator from "../assets/images/pdfmanipulator.png";

import type { WorkItem } from "../types/content";

const myWork: WorkItem[] = [
  {
    title: "DevPaste",
    description:
      "A modern paste-sharing platform with GitHub authentication, syntax highlighting, secure sharing, and a polished developer-focused experience powered by Supabase.",
    image: DEVPaste,
    alt: "devpaste-project",
    tech: "React, TypeScript, Supabase, Tailwind",
    link: "https://shalomdevpaste.vercel.app/",
  },
  {
    title: "BearBasket",
    description:
      "A sleek ecommerce frontend experience featuring dynamic cart management, smooth UI interactions, and modern state handling using Zustand.",
    image: BearBasket,
    alt: "bearbucket-project",
    tech: "React, Zustand, Tailwind, TypeScript",
    link: "https://bear-basket.vercel.app/",
  },
  {
    title: "PDFManipulator",
    description:
      "A powerful PDF utility web app capable of merging, splitting, and manipulating PDF files through a fast and intuitive user experience.",
    image: PDFManipulator,
    alt: "pdfmanipulator-project",
    tech: "React, TypeScript, Tailwind",
    link: "https://pdf-manipulator-shalom.vercel.app/",
  },
];

export default myWork;
