import { useState, useRef, useEffect } from "react";
import supabase from './supabase.js'  // default import, no curly braces  // add this at the top of App.jsx
import "./App.css";

const PORTRAIT = "/karan.png"
const NAV_LINKS = ["Work", "About", "Process", "Contact"];

const PROJECTS = [
  {
    id: "01",
    title: "BrewLog",
    type: "Mobile App Concept",
    tags: ["Personal Project", "iOS", "UI Design"],
    year: "2024",
    desc: "A passion project for coffee nerds. Designed a minimal app to log brews, track ratios, and remember what worked. Built because I couldn't find anything that didn't feel overcomplicated.",
    metrics: ["Personal project", "Self-initiated", "Figma prototype"],
    color: "#92400E",
  },
  {
    id: "02",
    title: "Readly",
    type: "Reading Tracker Redesign",
    tags: ["Concept", "UX", "Mobile"],
    year: "2024",
    desc: "Took an existing reading tracker app that frustrated me and reimagined the entire flow from scratch. Focused on making the daily logging feel less like a chore and more like a ritual.",
    metrics: ["Concept redesign", "Self-initiated", "Figma"],
    color: "#7C3AED",
  },
  {
    id: "03",
    title: "Halcyon Portfolio",
    type: "Personal Website Design",
    tags: ["Web", "Personal Branding", "Freelance"],
    year: "2023",
    desc: "Designed a portfolio site for a freelance photographer friend. First time designing for someone else's creative identity — learned more about restraint here than any course ever taught me.",
    metrics: ["Freelance", "1 happy client", "Live project"],
    color: "#0369A1",
  },
  {
    id: "04",
    title: "Focus — Pomodoro App",
    type: "Productivity App Concept",
    tags: ["Concept", "Timer", "Minimal UI"],
    year: "2023",
    desc: "Every pomodoro app looks the same. Designed one that doesn't. Stripped it down to just the timer, the task, and nothing else. An exercise in knowing what to remove.",
    metrics: ["Personal project", "Self-initiated", "Figma prototype"],
    color: "#DC2626",
  },
];

const SKILLS = [
  { name: "Product Design", pct: 97 },
  { name: "Design Systems", pct: 93 },
  { name: "User Research", pct: 88 },
  { name: "Prototyping", pct: 95 },
  { name: "Design Leadership", pct: 82 },
  { name: "Front-End Collaboration", pct: 78 },
];

const EXPERIENCE = [
  { role: "UI/UX Designer", co: "Self-Employed / Freelance", period: "2019 – Present", note: "Working with startups and agencies globally" },
  { role: "Product Design Consultant", co: "Independent", period: "2017 – 2019", note: "B2B SaaS and consumer apps" },
  { role: "Junior UI Designer", co: "Freelance", period: "2016 – 2017", note: "Brand + digital for SMBs" },
];

const PROCESS_STEPS = [
  { phase: "Discover", num: "01", desc: "User research, competitive audits, stakeholder interviews — I start with questions, not assumptions.", tools: ["User Interviews", "Analytics", "Competitive Audit", "Affinity Mapping"] },
  { phase: "Define", num: "02", desc: "HMW frameworks, persona synthesis, journey mapping. Turning research chaos into a design brief worth building.", tools: ["HMW Statements", "Personas", "Journey Maps", "Problem Framing"] },
  { phase: "Design", num: "03", desc: "Wireframes to pixel-perfect prototypes. I design in systems — every token documented for team-wide scale.", tools: ["Figma", "Design Systems", "Prototyping", "Component Libraries"] },
  { phase: "Test", num: "04", desc: "Moderated sessions, A/B tests, heuristic evaluations. Good design survives contact with real users.", tools: ["Usability Testing", "A/B Testing", "Heuristic Review", "Accessibility Audit"] },
  { phase: "Ship", num: "05", desc: "Annotated handoff specs, dev QA, launch support. The design only matters when it's live and working.", tools: ["Dev Handoff", "QA Review", "Launch", "Metrics Tracking"] },
];

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 64,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #E5E7EB" : "none",
        transition: "all 0.35s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
      }}>
        <a href="#" style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#111827", textDecoration: "none", letterSpacing: "-0.02em" }}>
          Karan<span style={{ color: "#2563EB" }}>.</span>
        </a>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="nav-desktop">
          {NAV_LINKS.map(l => l === "Contact" ? (
            <a key={l} href="#contact" style={{ fontSize: 13, fontWeight: 600, color: "#fff", background: "#111827", padding: "9px 22px", textDecoration: "none", letterSpacing: "0.02em", borderRadius: 6, transition: "background 0.2s" }}
              onMouseEnter={e => e.target.style.background = "#2563EB"}
              onMouseLeave={e => e.target.style.background = "#111827"}>{l}</a>
          ) : (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, fontWeight: 500, color: "#6B7280", textDecoration: "none", transition: "color 0.2s", letterSpacing: "0.01em" }}
              onMouseEnter={e => e.target.style.color = "#111827"}
              onMouseLeave={e => e.target.style.color = "#6B7280"}>{l}</a>
          ))}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, flexDirection: "column", gap: 5 }}>
          <span style={{ display: "block", width: 22, height: 2, background: "#111827", borderRadius: 2 }} />
          <span style={{ display: "block", width: 16, height: 2, background: "#111827", borderRadius: 2 }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#111827", borderRadius: 2 }} />
        </button>
      </nav>
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", fontSize: 28, cursor: "pointer", color: "#111827" }}>✕</button>
          {NAV_LINKS.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: "#111827", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) { .nav-desktop { display: none !important; } .hamburger { display: flex !important; } }
      `}</style>
    </>
  );
}

function Hero() {
  const [role, setRole] = useState(0);
  const ROLES = ["UI/UX Designer", "Design Systems", "Portfolio Reviewer", "Design Educator"];
  useEffect(() => {
    const t = setInterval(() => setRole(r => (r + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 64, background: "#F9FAFB", position: "relative", overflow: "hidden" }}>
      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#E5E7EB 1px,transparent 1px),linear-gradient(90deg,#E5E7EB 1px,transparent 1px)", backgroundSize: "60px 60px", opacity: 0.5, pointerEvents: "none" }} />
      {/* Blue blob */}
      <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(37,99,235,0.07), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 48px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative" }} className="hero-grid">
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 700, lineHeight: 1.05, color: "#111827", margin: 0, letterSpacing: "-0.03em" }}>
            Karan<br /><span style={{ color: "#6B7280", fontStyle: "italic", fontWeight: 400 }}>Sethi</span>
          </h1>
          {/* Role ticker */}
          <div style={{ height: 30, overflow: "hidden", margin: "16px 0 0" }}>
            <div key={role} style={{ fontSize: 14, fontWeight: 600, color: "#2563EB", letterSpacing: "0.1em", textTransform: "uppercase", animation: "slideUp 0.4s ease" }}>
              — {ROLES[role]}
            </div>
          </div>
          <p style={{ marginTop: 24, color: "#6B7280", lineHeight: 1.75, maxWidth: 440, fontSize: 16 }}>
            3 years designing digital products. I teach design on YouTube and review portfolios for designers who want to level up or break in.
          </p>
          {/* Stats */}
          <div style={{ display: "flex", gap: 40, marginTop: 36 }}>
            {[["92", "Subscribers"], ["60+", "Portfolios Reviewed"], ["3+ yrs", "Experience"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: "#111827", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          {/* Background shape */}
          <div style={{ position: "absolute", inset: 24, background: "#EFF6FF", borderRadius: 24, transform: "rotate(3deg)" }} />
          <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 400 }}>
            <img src={PORTRAIT} alt="Karan Sethi — UI/UX Designer" style={{ width: "100%", borderRadius: 20, display: "block", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }} />
            {/* Floating badges */}
            <div style={{ position: "absolute", bottom: -16, left: -16, background: "#fff", borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 20 }}>🎓</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>60+ Portfolios Reviwed</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}></div>
              </div>
            </div>
            <div style={{ position: "absolute", top: 20, right: -16, background: "#fff", borderRadius: 12, padding: "10px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB" }}>Content Creator</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}></div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 768px) { .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; padding: 80px 24px 48px !important; } }
      `}</style>
    </section>
  );
}

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", border: hovered ? `1px solid ${p.color}` : "1px solid #E5E7EB",
        borderRadius: 16, padding: 32, cursor: "pointer",
        transition: "all 0.3s ease",
        transform: visible ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${i * 0.1}s`,
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.08)" : "none",
        position: "relative", overflow: "hidden",
      }}>
      {/* Project number watermark */}
      <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 700, color: hovered ? `${p.color}10` : "#F3F4F6", lineHeight: 1, userSelect: "none", transition: "color 0.3s" }}>{p.id}</div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{p.type} · {p.year}</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: hovered ? p.color : "#111827", margin: 0, transition: "color 0.25s" }}>{p.title}</h3>
          </div>
          <div style={{ width: 36, height: 36, border: `1px solid ${hovered ? p.color : "#E5E7EB"}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.25s", color: hovered ? p.color : "#9CA3AF", fontSize: 16 }}>↗</div>
        </div>
        <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>{p.desc}</p>
        <div style={{ display: "flex", gap: 20, paddingBottom: 16, borderBottom: "1px solid #F3F4F6", marginBottom: 14, flexWrap: "wrap" }}>
          {p.metrics.map(m => <span key={m} style={{ fontSize: 12, fontWeight: 600, color: p.color }}>{m}</span>)}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {p.tags.map(t => <span key={t} style={{ fontSize: 11, fontWeight: 500, color: "#6B7280", background: "#F9FAFB", border: "1px solid #E5E7EB", padding: "4px 10px", borderRadius: 6, letterSpacing: "0.02em" }}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function Work() {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section id="work" style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto" }} className="section-pad">
      <div ref={ref} style={{ transform: visible ? "translateY(0)" : "translateY(32px)", opacity: visible ? 1 : 0, transition: "all 0.7s ease", marginBottom: 56 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Selected Work</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111827", margin: 0, lineHeight: 1.1 }}>Case Studies</h2>
        <div style={{ width: 48, height: 3, background: "#2563EB", marginTop: 20, borderRadius: 2 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="work-grid">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
      </div>
      <style>{`
        @media (max-width: 768px) { .work-grid { grid-template-columns: 1fr !important; } .section-pad { padding: 72px 24px !important; } }
      `}</style>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section id="about" style={{ background: "#fff", padding: "100px 48px" }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="about-grid">
        <div ref={ref} style={{ transform: visible ? "translateX(0)" : "translateX(-32px)", opacity: visible ? 1 : 0, transition: "all 0.8s ease" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>The Designer</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111827", margin: "0 0 20px", lineHeight: 1.1 }}>About Karan</h2>
          <div style={{ width: 48, height: 3, background: "#2563EB", borderRadius: 2, marginBottom: 32 }} />
          <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: "italic", color: "#374151", lineHeight: 1.65, margin: "0 0 28px", paddingLeft: 20, borderLeft: "3px solid #2563EB" }}>
            "Good design solves the right problem. Great design makes people feel like there was never a problem at all."
          </blockquote>
          <p style={{ color: "#6B7280", lineHeight: 1.8, marginBottom: 14, fontSize: 15 }}>
            I'm a product designer with 3 years shaping digital experiences — from early-stage startups to products used by millions. My work spans fintech, health, SaaS, and e-commerce.
          </p>
          <p style={{ color: "#6B7280", lineHeight: 1.8, marginBottom: 14, fontSize: 15 }}>
            My YouTube channel started as a personal project to document my design thinking. Each day I review real portfolios publicly and share what I wish someone had told me earlier.
          </p>
          <p style={{ color: "#6B7280", lineHeight: 1.8, fontSize: 15 }}>
            I believe transparency in design thinking is the fastest path to better designers — and better products. I show my work, my mistakes, and my reasoning. Not just the highlight reel.
          </p>
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid #F3F4F6" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Find me on</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[["YouTube", "www.youtube.com/@design-with-karan"]].map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                className="w-full"  
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", padding: "8px 16px", borderRadius: 8, textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#DC2626"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#FEF2F2"; e.currentTarget.style.color = "#DC2626"; }}>
                  ▶ Design With Karan
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ transform: visible ? "translateX(0)" : "translateX(32px)", opacity: visible ? 1 : 0, transition: "all 0.8s ease 0.1s" }}>
          {/* Skills */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 24 }}>Core Skills</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {SKILLS.map((s, i) => (
                <div key={s.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>{s.name}</span>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>{s.pct}%</span>
                  </div>
                  <div style={{ height: 4, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "#2563EB", borderRadius: 2, width: visible ? `${s.pct}%` : "0%", transition: `width 1.2s ease ${0.2 + i * 0.07}s` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Experience */}
          <div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      `}</style>
    </section>
  );
}

function Process() {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section id="process" style={{ background: "#F9FAFB", padding: "100px 48px" }} className="section-pad">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div ref={ref} style={{ transform: visible ? "translateY(0)" : "translateY(32px)", opacity: visible ? 1 : 0, transition: "all 0.7s ease", marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>How I Work</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111827", margin: "0 0 20px", lineHeight: 1.1 }}>The Process</h2>
          <div style={{ width: 48, height: 3, background: "#2563EB", borderRadius: 2, marginBottom: 20 }} />
          <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.75, maxWidth: 520 }}>Design is repeatable, rigorous craft — not intuition. Here's how I approach every project, from startup MVP to enterprise platform.</p>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 27, top: 0, bottom: 0, width: 2, background: "linear-gradient(#DBEAFE, #EFF6FF)", borderRadius: 1 }} className="process-line" />
          {PROCESS_STEPS.map((s, i) => {
            const sref = useRef(null);
            const sv = useInView(sref);
            return (
              <div key={s.phase} ref={sref} style={{ display: "flex", gap: 40, paddingBottom: 48, transform: sv ? "translateX(0)" : "translateX(-24px)", opacity: sv ? 1 : 0, transition: `all 0.6s ease ${i * 0.08}s` }} className="process-row">
                <div style={{ flexShrink: 0, zIndex: 1 }}>
                  <div style={{ width: 56, height: 56, background: "#fff", border: "2px solid #DBEAFE", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#2563EB" }}>{s.num}</div>
                </div>
                <div style={{ flex: 1, paddingTop: 12, paddingBottom: 36, borderBottom: i < PROCESS_STEPS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 10px" }}>{s.phase}</h3>
                  <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.75, marginBottom: 14 }}>{s.desc}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {s.tools.map(t => <span key={t} style={{ fontSize: 11, fontWeight: 500, color: "#2563EB", background: "#EFF6FF", padding: "4px 10px", borderRadius: 6 }}>{t}</span>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .process-line { left: 19px !important; } .process-row { gap: 20px !important; } }
      `}</style>
    </section>
  );
}

function Videos() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CHANNEL_ID = "UC_j7a4mlbDK5ZDGcQ8rthZQ";
    const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=6`)
      .then(r => r.json())
      .then(data => {
        if (data.status === "ok" && data.items?.length) {
          setVideos(data.items.slice(0, 6));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="videos" style={{ background: "#fff", padding: "100px 48px" }} className="section-pad">
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} style={{ transform: visible ? "translateY(0)" : "translateY(32px)", opacity: visible ? 1 : 0, transition: "all 0.7s ease", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>YouTube Channel</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111827", margin: "0 0 20px", lineHeight: 1.1 }}>Latest Videos</h2>
            <div style={{ width: 48, height: 3, background: "#2563EB", borderRadius: 2 }} />
          </div>
          <a href="https://www.youtube.com/channel/UC_j7a4mlbDK5ZDGcQ8rthZQ" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#DC2626", background: "#FEF2F2", border: "1px solid #FECACA", padding: "10px 20px", borderRadius: 8, textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#DC2626"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#FEF2F2"; e.currentTarget.style.color = "#DC2626"; }}>
            ▶ Subscribe · 92K
          </a>
        </div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="video-grid">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} style={{ background: "#F9FAFB", borderRadius: 12, overflow: "hidden", border: "1px solid #F3F4F6" }}>
                <div style={{ aspectRatio: "16/9", background: "#E5E7EB" }} />
                <div style={{ padding: 16 }}>
                  <div style={{ height: 14, background: "#E5E7EB", borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 14, background: "#E5E7EB", borderRadius: 4, width: "70%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="video-grid">
            {videos.map((v, i) => {
              const [hov, setHov] = useState(false);
              const thumb = v.thumbnail || `https://i.ytimg.com/vi/${v.guid?.split("v=")[1]}/mqdefault.jpg`;
              return (
                <a key={i} href={v.link} target="_blank" rel="noopener noreferrer"
                  onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{ background: "#fff", borderRadius: 12, overflow: "hidden", border: `1px solid ${hov ? "#BFDBFE" : "#F3F4F6"}`, textDecoration: "none", display: "block", transition: "all 0.25s", transform: hov ? "translateY(-3px)" : "translateY(0)", boxShadow: hov ? "0 8px 24px rgba(0,0,0,0.07)" : "none" }}>
                  <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                    <img src={thumb} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", transform: hov ? "scale(1.04)" : "scale(1)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", opacity: hov ? 1 : 0, transition: "opacity 0.25s" }}>
                      <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>▶</div>
                    </div>
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", lineHeight: 1.4, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{v.title}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF" }}>{new Date(v.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#9CA3AF", fontSize: 14 }}>
            <a href="https://www.youtube.com/channel/UC_j7a4mlbDK5ZDGcQ8rthZQ" target="_blank" rel="noopener noreferrer" style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>View channel on YouTube →</a>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 900px) { .video-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .video-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);
  const handle = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => { if (form.name && form.email && form.msg) setSent(true); };

  return (
    <section id="contact" style={{ background: "#F9FAFB", padding: "100px 48px" }} className="section-pad">
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div ref={ref} style={{ transform: visible ? "translateY(0)" : "translateY(32px)", opacity: visible ? 1 : 0, transition: "all 0.7s ease", marginBottom: 52 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Get in Touch</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: "#111827", margin: "0 0 20px", lineHeight: 1.1 }}>Let's Talk</h2>
          <div style={{ width: 48, height: 3, background: "#2563EB", borderRadius: 2, marginBottom: 20 }} />
          <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.75, maxWidth: 500 }}>Whether you want to collaborate, have your portfolio reviewed, or just say hello — my inbox is open.</p>
        </div>

        {sent ? (
          <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#16A34A", letterSpacing: "0.04em" }}>Message received</span>
            </div>
            <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.7, margin: 0 }}>Thanks {form.name} — I'll get back to you within 2–3 days.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="contact-row">
              {["name", "email"].map(k => (
                <div key={k}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>{k}</label>
                  <input type={k === "email" ? "email" : "text"} value={form[k]} onChange={handle(k)} placeholder={k === "name" ? "Your name" : "your@email.com"}
                    style={{ width: "100%", background: "#fff", border: "1px solid #E5E7EB", color: "#111827", padding: "12px 14px", fontSize: 14, borderRadius: 8, boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "#2563EB"}
                    onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>Message</label>
              <textarea value={form.msg} onChange={handle("msg")} rows={5} placeholder="Tell me what you're working on..."
                style={{ width: "100%", background: "#fff", border: "1px solid #E5E7EB", color: "#111827", padding: "12px 14px", fontSize: 14, borderRadius: 8, boxSizing: "border-box", outline: "none", resize: "vertical", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#2563EB"}
                onBlur={e => e.target.style.borderColor = "#E5E7EB"} />
            </div>
            <div>
              <button onClick={submit}
                style={{ background: "#2563EB", border: "none", color: "#fff", fontWeight: 600, fontSize: 14, padding: "13px 32px", borderRadius: 8, cursor: "pointer", transition: "background 0.2s", letterSpacing: "0.02em" }}
                onMouseEnter={e => e.target.style.background = "#1D4ED8"}
                onMouseLeave={e => e.target.style.background = "#2563EB"}>
                Send Message →
              </button>
            </div>
          </div>
        )}
      </div>
      <style>{`@media (max-width: 600px) { .contact-row { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#111827", padding: "36px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>Karan<span style={{ color: "#2563EB" }}>.</span></span>
      <span style={{ fontSize: 12, color: "#6B7280", letterSpacing: "0.06em" }}>© 2025 Karan Sethi — UI/UX Designer</span>
    </footer>
  );
}

function Submitportfolio() {
  const [link, setLink] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!link.trim()) return;
    
    const { error } = await supabase
      .from('links')
      .insert([{ url: link.trim() }]);

    if (error) {
      setError("Something went wrong. Try again.");
    } else {
      setSent(true);
    }
  };

  return (
    <>
      <div className="w-screen flex items-center justify-center my-20">
        <div className="w-full" style={{ marginTop: 72, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 24, maxWidth: 900 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#2563EB", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Submit for review</div>
          <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 14 }}>I review one portfolio publicly each day on YouTube.</div>
          {sent ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} />
              <span style={{ fontSize: 13, color: "#16A34A", fontWeight: 500 }}>Received — I'll be in touch.</span>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", gap: 0 }}>
                <input value={link} onChange={e => setLink(e.target.value)} placeholder="https://yourportfolio.com"
                  style={{ flex: 1, border: "1px solid #D1D5DB", borderRight: "none", borderRadius: "8px 0 0 8px", padding: "10px 14px", fontSize: 13, outline: "none", color: "#111827" }} />
                <button onClick={handleSubmit}
                  style={{ background: "#2563EB", border: "none", color: "#fff", fontWeight: 600, fontSize: 13, padding: "10px 20px", borderRadius: "0 8px 8px 0", cursor: "pointer" }}>
                  Send →
                </button>
              </div>
              {error && <div style={{ marginTop: 8, fontSize: 12, color: "#DC2626" }}>{error}</div>}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <div style={{ background: "#fff", color: "#111827", position:"absolute", top:0, left:0, minHeight: "100vh", minWidth:"100vw" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; font-family: 'Inter', sans-serif; }
        ::selection { background: rgba(37,99,235,0.15); color: #1D4ED8; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F9FAFB; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 2px; }
        input::placeholder, textarea::placeholder { color: #D1D5DB; }
      `}</style>
      <Nav />
      <Hero />
      <Submitportfolio/>
      <Work />
      <About />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}