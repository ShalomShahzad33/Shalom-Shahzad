const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-slate-950 text-white p-4 flex flex-col justify-center items-center gap-4 md:gap-6 md:p-8 md:flex-row md:justify-around md:text-xl"
    >
      <p>Let's work together.</p>
      <p>React • Tailwind • GSAP • WordPress</p>
      <p className="space-x-7 text-blue-100 underline">
        <a
          href="https://www.upwork.com/freelancers/~01f03c187b4fadece0"
          target="_blank"
        >
          Upwork
        </a>
        <a href="https://www.fiverr.com/s/5rZLpmE" target="_blank">
          Fiverr
        </a>
        <a href="https://github.com/ShalomShahzad33" target="_blank">
          Github
        </a>
      </p>
      <p>© 2025 Shalom Shahzad</p>
    </footer>
  );
};

export default Footer;
