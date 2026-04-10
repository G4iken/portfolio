import { motion } from "framer-motion";
import { Github, Mail, ExternalLink, Download } from "lucide-react";
import GlitchText from "../ui/GlitchText";
import TypewriterText from "../ui/TypewriterText";
import { fadeUp, fadeIn } from "../../utils/motion";
import { profile } from "../../data";

const ROLES = [
  "Software Developer",
  "IoT Engineer",
  "Embedded Systems Dev",
  "Web Developer",
  "Problem Solver",
];

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050810]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `linear-gradient(rgba(18,184,148,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(18,184,148,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-8 blur-[120px] animate-glow-pulse pointer-events-none"
        style={{ backgroundColor: "rgba(18,184,148,0.08)" }}
      />

      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-px animate-scan"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(45,214,173,0.3), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-24 pb-16">
        {/* Status badge */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 mb-6 rounded-full border font-mono text-[10px] sm:text-xs tracking-widest"
          style={{
            borderColor: "rgba(18,184,148,0.3)",
            backgroundColor: "rgba(18,184,148,0.05)",
            color: "#2dd6ad",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#2dd6ad" }}
          />
          AVAILABLE FOR OPPORTUNITIES
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex justify-center mb-8"
        >
          <div className="relative group cursor-pointer">
            {/* Glow ring on hover */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md scale-110"
              style={{
                background:
                  "radial-gradient(circle, rgba(18,184,148,0.4), transparent)",
              }}
            />

            {/* Photo container */}
            <div
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 transition-all duration-500 group-hover:border-cyber-400 group-hover:shadow-lg group-hover:shadow-cyber-500/40"
              style={{ borderColor: "rgba(18,184,148,0.5)" }}
            >
              {/* Default photo */}
              <img
                src="/profile.jpg"
                alt="Jeremy Elmo D. Ebardo"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-110"
              />

              {/* Hover photo */}
              <img
                src="/profile-hover.jpg"
                alt="Jeremy Elmo D. Ebardo Hover"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                onError={(e) => {
                  // fallback if no second photo — shows name overlay instead
                  e.target.style.display = "none";
                }}
              />

              {/* Hover overlay — shows if no second photo */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ background: "rgba(5,8,16,0.75)" }}
              >
              </div>
            </div>

            {/* Rotating border ring on hover */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-spin"
              style={{
                borderColor: "rgba(18,184,148,0.4)",
                animationDuration: "8s",
              }}
            />

            {/* Online dot */}
            <div
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 animate-pulse z-10"
              style={{ backgroundColor: "#2dd6ad", borderColor: "#050810" }}
            />

            {/* Tooltip on hover */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <span
                className="font-mono text-[10px] px-2 py-1 rounded-full"
                style={{
                  background: "rgba(9,13,24,0.9)",
                  border: "1px solid rgba(18,184,148,0.2)",
                  color: "#2dd6ad",
                }}
              >
                👋 That's me!
              </span>
            </div>
          </div>
        </motion.div>

        {/* Name - Optimized for long length */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mb-4"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight">
            <span className="text-white block">JEREMY ELMO</span>
            <span
              className="block mt-1 md:mt-2"
              style={{
                color: "#2dd6ad",
                textShadow: "0 0 20px rgba(18,184,148,0.5)",
              }}
            >
              D. EBARDO
            </span>
          </h1>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mb-2 h-6"
        >
          <TypewriterText
            words={ROLES}
            className="font-mono text-sm sm:text-base md:text-lg text-slate-400"
          />
        </motion.div>

        {/* Glitch subtitle */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2.5}
          className="mb-4"
        >
          <GlitchText
            text="[ Computer Engineering Student ]"
            className="text-slate-500 text-[11px] sm:text-sm tracking-widest"
          />
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="max-w-2xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed mb-8 px-2"
        >
          Building real-world systems at the intersection of{" "}
          <span style={{ color: "#2dd6ad" }}>web</span>,{" "}
          <span style={{ color: "#2dd6ad" }}>embedded</span>, and{" "}
          <span style={{ color: "#2dd6ad" }}>IoT</span> technologies. Based in{" "}
          <span className="text-slate-300">Bulacan, Philippines</span>.
        </motion.p>

        {/* CTAs - Stacked on mobile, inline on desktop */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 mb-10 w-full sm:w-auto px-4 sm:px-0"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group w-full sm:w-auto justify-center px-6 py-3 sm:py-2.5 font-mono text-sm font-medium text-[#050810] clip-corner hover:opacity-90 transition-all duration-200 flex items-center gap-2"
            style={{ backgroundColor: "#2dd6ad" }}
          >
            View Projects{" "}
            <ExternalLink
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <a
            href="/resume.pdf"
            download="Jeremy_Ebardo_Resume.pdf"
            className="w-full sm:w-auto justify-center px-6 py-3 sm:py-2.5 font-mono text-sm clip-corner border transition-all duration-200 flex items-center gap-2 hover:opacity-80"
            style={{
              color: "#2dd6ad",
              borderColor: "rgba(18,184,148,0.5)",
              backgroundColor: "rgba(18,184,148,0.05)",
            }}
          >
            <Download size={14} /> Resume
          </a>

          <div className="flex w-full sm:w-auto gap-3">
            {/* CONTACT BUTTON - DIRECT TO GMAIL WEB */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ebardojeremyelmo@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 justify-center px-6 py-3 sm:py-2.5 font-mono text-sm clip-corner border transition-all duration-200 flex items-center gap-2 hover:opacity-80 text-[#94a3b8]"
              style={{
                borderColor: "rgba(100,116,139,0.4)",
                display: "flex",
                cursor: "pointer",
              }}
            >
              <Mail size={14} />
              <span>Contact</span>
            </a>

            {/* GITHUB BUTTON */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 justify-center px-6 py-3 sm:py-2.5 font-mono text-sm clip-corner border transition-all duration-200 flex items-center gap-2 hover:opacity-80 text-[#94a3b8]"
              style={{ borderColor: "rgba(100,116,139,0.4)" }}
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

        {/* Stats - Grid layout for mobile stability */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-6 md:gap-10 text-center"
        >
          {[
            { value: "10+", label: "Projects Built" },
            { value: "7+", label: "Languages" },
            { value: "4+", label: "Years Learning" },
            { value: "1", label: "Academic Award" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="font-display text-2xl md:text-3xl font-bold"
                style={{
                  color: "#2dd6ad",
                  textShadow: "0 0 20px rgba(18,184,148,0.5)",
                }}
              >
                {stat.value}
              </p>
              <p className="font-mono text-[10px] md:text-xs text-slate-500 tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
