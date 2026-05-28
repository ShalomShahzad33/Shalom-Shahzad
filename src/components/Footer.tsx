const Footer = () => {
  const stack = [
    { label: "React", color: "#61dafb" },
    { label: "TypeScript", color: "#3178c6" },
    { label: "Tailwind", color: "#38bdf8" },
    { label: "GSAP", color: "#0ae448" },
    { label: "WordPress", color: "#21759b" },
  ];

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.08),transparent_40%)]" />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(circle_at_center,black,transparent_75%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 text-center">
        {/* Heading */}
        <div className="space-y-4">
          <h2 className="font-['Syne',sans-serif] text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let’s build something meaningful
          </h2>

          <p className="text-sm text-slate-400 sm:text-base">
            Frontend Developer • Open to freelance & full-time roles
          </p>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {stack.map(({ label, color }) => (
            <span
              key={label}
              className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-wide text-slate-300 backdrop-blur-md transition hover:border-white/20"
            >
              {/* Glow hover */}
              <span
                className="absolute inset-0 opacity-0 blur-xl transition duration-300 group-hover:opacity-20"
                style={{ backgroundColor: color }}
              />

              {/* Dot */}
              <span
                className="mr-2 inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                }}
              />

              <span className="relative z-10">{label}</span>
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-10">
          <a
            href="https://github.com/ShalomShahzad33"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            GitHub
          </a>

          <a
            href="mailto:shalomshahzad450@gmail.com"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Email
          </a>

          <a
            href="#projects-section"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Projects
          </a>
        </div>

        {/* Divider */}
        <div className="h-px w-full max-w-2xl bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom text */}
        <p className="text-xs tracking-[0.3em] text-slate-500 uppercase">
          © {new Date().getFullYear()} Shalom Shahzad
        </p>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -bottom-32 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>
    </footer>
  );
};

export default Footer;
