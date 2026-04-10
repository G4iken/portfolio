import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Briefcase, MapPin, Clock, ChevronRight, Linkedin } from 'lucide-react'

const ROLES = [
  "Cloud Engineer",
  "Full Stack Developer",
  "IoT / Embedded Engineer",
  "Web Developer Intern",
  "Software Engineer Intern",
];

const PREFERENCES = [
  { icon: <MapPin size={13} />, text: "Remote / Hybrid / Bulacan, PH" },
  { icon: <Clock size={13} />, text: "Part-time, Internship, Full-time" },
  { icon: <Briefcase size={13} />, text: "Available immediately" },
];

export default function OpenToWork() {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5 }}
      // Keeps it fixed. Hidden on small mobile, visible on tablets/desktops
      className="fixed top-20 left-4 z-40 hidden md:block max-w-xs"
    >
      <div
        className="rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: "rgba(9,13,24,0.95)",
          border: "1px solid rgba(18,184,148,0.3)",
          boxShadow: "0 0 20px rgba(18,184,148,0.1)",
          backdropFilter: "blur(16px)",
        }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(18,184,148,0.15)",
                border: "1px solid rgba(18,184,148,0.4)",
              }}
            >
              <Briefcase size={14} style={{ color: "#2dd6ad" }} />
            </div>
            <span
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 animate-pulse"
              style={{ backgroundColor: "#2dd6ad", borderColor: "#050810" }}
            />
          </div>
          <div className="flex-1">
            <p
              className="font-mono text-xs font-bold"
              style={{ color: "#2dd6ad" }}
            >
              #OpenToWork
            </p>
            <p className="font-mono text-[10px] text-slate-500">
              Actively seeking opportunities
            </p>
          </div>
          <div className="flex items-center gap-1">
            <motion.div
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={14} className="text-slate-500" />
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDismissed(true);
              }}
              className="w-5 h-5 flex items-center justify-center rounded text-slate-600 hover:text-slate-400 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div
                className="px-4 pb-4 space-y-4"
                style={{ borderTop: "1px solid rgba(18,184,148,0.1)" }}
              >
                {/* Preferred roles */}
                <div className="pt-3">
                  <p className="font-mono text-[10px] text-slate-600 tracking-widest uppercase mb-2">
                    Preferred Roles
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ROLES.map((role) => (
                      <span
                        key={role}
                        className="px-2 py-0.5 rounded-full font-mono text-[10px]"
                        style={{
                          background: "rgba(18,184,148,0.1)",
                          border: "1px solid rgba(18,184,148,0.25)",
                          color: "#2dd6ad",
                        }}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preferences */}
                <div className="space-y-1.5">
                  {PREFERENCES.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 font-mono text-xs text-slate-400"
                    >
                      <span style={{ color: "#2dd6ad" }}>{p.icon}</span>
                      {p.text}
                    </div>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      "https://www.linkedin.com/in/jeremy-elmo-ebardo-082133368/",
                      "_blank",
                    );
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl font-mono text-xs font-bold transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #12b894, #2dd6ad)",
                    color: "#050810",
                  }}
                >
                  <Linkedin size={12} />
                  View LinkedIn
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
