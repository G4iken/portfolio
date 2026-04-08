import { motion } from "framer-motion";
import {Github, Mail, ExternalLink, Download } from "lucide-react";
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

        {/* Profile photo */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="flex justify-center mb-5"
        >
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[#12b894]/50 shadow-lg shadow-[#12b894]/20">
              <img
                src="/profile.jpg"
                alt="Jeremy Elmo D. Ebardo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-3xl font-display font-bold text-[#2dd6ad]" style="background:rgba(18,184,148,0.1)">JE</div>`;
                }}
              />
            </div>
            <div
              className="absolute bottom-1 right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 animate-pulse"
              style={{ backgroundColor: "#2dd6ad", borderColor: "#050810" }}
            />
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
            { value: "11+", label: "Projects Built" },
            { value: "7+", label: "Languages" },
            { value: "3+", label: "Years Learning" },
            { value: "1st", label: "Academic Award" },
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
