import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home","About","Products","Quality","Applications","Export","Contact"];

const PRODUCTS = [
  { icon: "🌾", name: "Psyllium Seeds", desc: "Natural fiber-rich seeds sourced directly from premium farms across Gujarat.", color: "#e8f5e9", accent: "#2e7d32" },
  { icon: "🍃", name: "Psyllium Husk", desc: "Premium grade husk with 85–99% purity, ideal for health & pharmaceutical use.", color: "#e3f2fd", accent: "#1565c0" },
  { icon: "🌿", name: "Husk Powder", desc: "Expertly milled psyllium powder for food, nutraceuticals & industrial applications.", color: "#f3e5f5", accent: "#6a1b9a" },
  { icon: "🟤", name: "Khakha Powder", desc: "High-utility by-product powder serving diverse industrial needs worldwide.", color: "#fff3e0", accent: "#e65100" },
  { icon: "🐄", name: "Cattle Feed", desc: "India's largest psyllium cattle feed producer — boosting digestion & milk yield.", color: "#fce4ec", accent: "#ad1457" },
  { icon: "✅", name: "Organic Certified", desc: "Pure organic psyllium products certified by FDA, FSSAI, Halal & Kosher bodies.", color: "#e8f5e9", accent: "#1b5e20" },
];

const STATS = [
  { value: "40+", label: "Countries Exported" },
  { value: "99%", label: "Purity Grade" },
  { value: "500+", label: "Global Clients" },
  { value: "2018", label: "Year Established" },
];

const CERTIFICATIONS = ["FDA Certified","FSSAI Approved","Halal Certified","Kosher Certified","BRCGS Certified","EU Organic"];

const COUNTRIES = ["USA","Australia","Germany","France","Canada","UAE","Russia","Bangladesh","Singapore","Japan","UK","Netherlands"];

const APPLICATIONS = [
  { title: "Health & Wellness", icon: "💊", desc: "Dietary supplements, fiber capsules, health drinks" },
  { title: "Pharmaceuticals", icon: "🏥", desc: "Laxatives, drug coatings, capsule binders" },
  { title: "Food & Bakery", icon: "🍞", desc: "Gluten-free baking, thickeners, functional foods" },
  { title: "Cosmetics", icon: "✨", desc: "Hair gels, skin creams, personal care products" },
  { title: "Animal Feed", icon: "🐾", desc: "Digestive aids for livestock, dairy cattle feed" },
  { title: "Industrial", icon: "🏭", desc: "Construction, textile sizing, paper manufacturing" },
];

const TIMELINE = [
  { year: "2018", event: "Founded in Unjha, Gujarat — the psyllium capital of India" },
  { year: "2020", event: "Expanded to psyllium husk & powder processing facilities" },
  { year: "2021", event: "Became India's largest psyllium cattle feed supplier" },
  { year: "2023", event: "Achieved FDA, FSSAI, Halal & Kosher certifications" },
  { year: "2024", event: "Exported to 40+ countries across 6 continents" },
  { year: "2025", event: "Participated in FI Europe Paris & Biofach Germany" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function CountUp({ target }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target);
    if (isNaN(num)) { setCount(target); return; }
    let start = 0;
    const duration = 1800;
    const step = duration / num;
    const timer = setInterval(() => {
      start += Math.ceil(num / 60);
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, step);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}</span>;
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
  };

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Outfit', 'DM Sans', system-ui, sans-serif", background: "#fafaf8", color: "#1a1a1a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: #c8e6c9; color: #1b5e20; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #2e7d32; border-radius: 3px; }

        .nav-link { cursor: pointer; padding: 8px 16px; border-radius: 25px; font-size: 14px; font-weight: 500; color: #333; transition: all 0.25s; letter-spacing: 0.3px; text-decoration: none; display: inline-block; }
        .nav-link:hover, .nav-link.active { background: #e8f5e9; color: #2e7d32; }

        .btn-primary { background: linear-gradient(135deg, #2e7d32, #43a047); color: white; border: none; padding: 14px 32px; border-radius: 50px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s; letter-spacing: 0.3px; box-shadow: 0 4px 20px rgba(46,125,50,0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(46,125,50,0.4); }
        .btn-secondary { background: transparent; color: #2e7d32; border: 2px solid #2e7d32; padding: 13px 30px; border-radius: 50px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .btn-secondary:hover { background: #2e7d32; color: white; transform: translateY(-2px); }

        .product-card { background: white; border-radius: 20px; padding: 32px 28px; border: 1.5px solid #f0f0f0; cursor: pointer; transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1); position: relative; overflow: hidden; }
        .product-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #2e7d32, #66bb6a); transform: scaleX(0); transform-origin: left; transition: transform 0.3s; }
        .product-card:hover, .product-card.active { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(0,0,0,0.1); border-color: #a5d6a7; }
        .product-card:hover::before, .product-card.active::before { transform: scaleX(1); }

        .stat-card { background: white; border-radius: 20px; padding: 36px 24px; text-align: center; border: 1.5px solid #f0f0f0; transition: all 0.3s; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(46,125,50,0.1); border-color: #c8e6c9; }

        .cert-badge { display: inline-flex; align-items: center; gap: 8px; background: white; border: 1.5px solid #e8f5e9; border-radius: 50px; padding: 10px 20px; font-size: 13px; font-weight: 600; color: #2e7d32; transition: all 0.25s; }
        .cert-badge:hover { background: #e8f5e9; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(46,125,50,0.15); }

        .country-tag { background: #f1f8e9; border: 1px solid #c5e1a5; border-radius: 10px; padding: 8px 16px; font-size: 13px; font-weight: 600; color: #33691e; transition: all 0.2s; cursor: default; }
        .country-tag:hover { background: #dcedc8; transform: scale(1.05); }

        .app-card { background: white; border-radius: 18px; padding: 28px 24px; border: 1.5px solid #f0f0f0; transition: all 0.3s; text-align: center; }
        .app-card:hover { transform: translateY(-6px); box-shadow: 0 16px 50px rgba(0,0,0,0.08); border-color: #c8e6c9; }

        .contact-input { width: 100%; border: 1.5px solid #e0e0e0; border-radius: 12px; padding: 14px 18px; font-size: 15px; font-family: inherit; transition: all 0.25s; background: #fafafa; outline: none; color: #1a1a1a; }
        .contact-input:focus { border-color: #2e7d32; background: white; box-shadow: 0 0 0 4px rgba(46,125,50,0.1); }
        .contact-input::placeholder { color: #aaa; }

        .floating-leaf { position: absolute; pointer-events: none; opacity: 0.07; font-size: 80px; animation: floatAround 12s ease-in-out infinite; font-style: normal; }
        @keyframes floatAround { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-30px) rotate(15deg); } }

        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 50px; padding: 8px 18px; font-size: 13px; font-weight: 600; color: #2e7d32; margin-bottom: 28px; }
        .pulse-dot { width: 8px; height: 8px; background: #4caf50; border-radius: 50%; animation: pulse 2s infinite; display: inline-block; flex-shrink: 0; }
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.3); } }

        .section-tag { display: inline-block; background: #e8f5e9; color: #2e7d32; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 6px 16px; border-radius: 50px; margin-bottom: 16px; }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .mobile-menu { animation: slideDown 0.25s ease; }

        .footer-link { color: #aaa; font-size: 14px; text-decoration: none; transition: color 0.2s; cursor: pointer; }
        .footer-link:hover { color: #4caf50; }

        /* Desktop nav visible, hamburger hidden */
        .desktop-nav { display: flex; gap: 4px; }
        .mobile-only { display: none; }

        @media (max-width: 768px) {
          .hero-title { font-size: 36px !important; }
          .section-title { font-size: 28px !important; }
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
          .desktop-only { display: none !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .grid-5 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-5 { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid #e8f5e9" : "none", transition: "all 0.35s", padding: "0 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("home")}>
            <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#2e7d32,#66bb6a)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🌿</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.3px", lineHeight: 1.1 }}>PureHusk</div>
              <div style={{ fontSize: 10, color: "#888", fontWeight: 500, letterSpacing: "1px", textTransform: "uppercase" }}>Industries</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {NAV_LINKS.map(l => (
              <a key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => { setActiveNav(l); scrollTo(l); }}>{l}</a>
            ))}
          </div>

          {/* Desktop CTA + Mobile Hamburger */}
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn-primary desktop-only" style={{ padding: "10px 24px", fontSize: 14 }} onClick={() => scrollTo("contact")}>Get Quote</button>
            {/* Hamburger — mobile only */}
            <button
              className="mobile-only"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "1.5px solid #ddd", borderRadius: 10, padding: "8px 10px", cursor: "pointer", fontSize: 20, alignItems: "center", justifyContent: "center" }}
            >☰</button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="mobile-menu" style={{ background: "white", borderTop: "1px solid #e8f5e9", padding: "16px 5%" }}>
            {NAV_LINKS.map(l => (
              <div key={l} style={{ padding: "12px 0", borderBottom: "1px solid #f5f5f5", fontSize: 15, fontWeight: 500, cursor: "pointer", color: activeNav === l ? "#2e7d32" : "#333" }}
                onClick={() => { setActiveNav(l); setMenuOpen(false); scrollTo(l); }}>{l}</div>
            ))}
            <button className="btn-primary" style={{ width: "100%", marginTop: 16 }} onClick={() => { setMenuOpen(false); scrollTo("contact"); }}>Get Quote</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f9fdf9 0%, #e8f5e9 40%, #f1f8e9 100%)", display: "flex", alignItems: "center", padding: "100px 5% 60px", position: "relative", overflow: "hidden" }}>
        <span className="floating-leaf" style={{ top: "15%", right: "8%", animationDelay: "0s" }}>🌿</span>
        <span className="floating-leaf" style={{ bottom: "20%", right: "20%", animationDelay: "4s", fontSize: 50 }}>🌾</span>
        <span className="floating-leaf" style={{ top: "40%", left: "2%", animationDelay: "8s", fontSize: 40 }}>🍃</span>

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", width: "100%" }} className="grid-2">
          <div>
            <AnimatedSection>
              <div className="hero-badge">
                <span className="pulse-dot"></span>
                🇮🇳 Proudly Made in India — Unjha, Gujarat
              </div>
              <h1 className="hero-title" style={{ fontSize: 58, fontFamily: "'Playfair Display', serif", fontWeight: 800, lineHeight: 1.1, color: "#1a1a1a", marginBottom: 24, letterSpacing: "-1px" }}>
                Pure Psyllium.<br /><span style={{ color: "#2e7d32" }}>Global Trust.</span>
              </h1>
              <p style={{ fontSize: 18, color: "#555", lineHeight: 1.8, marginBottom: 36, fontWeight: 400 }}>
                Premium Psyllium Husk, Seeds & Powder manufacturer and exporter. Supplying 40+ countries with certified, natural fiber products since 2018.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("products")}>Explore Products</button>
                <button className="btn-secondary" onClick={() => scrollTo("contact")}>Get Free Sample</button>
              </div>
              <div style={{ display: "flex", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
                {[["FDA","Certified"],["FSSAI","Approved"],["Halal","& Kosher"]].map(([t,s]) => (
                  <div key={t} style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#2e7d32" }}>✓ {t}</span>
                    <span style={{ fontSize: 12, color: "#888" }}>{s}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <div style={{ position: "relative" }}>
              <div style={{ background: "white", borderRadius: 28, padding: 40, boxShadow: "0 30px 80px rgba(46,125,50,0.15)", border: "1.5px solid #e8f5e9" }}>
                <div style={{ fontSize: 80, textAlign: "center", marginBottom: 20, fontStyle: "normal" }}>🌿</div>
                <h3 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, marginBottom: 24, color: "#1a1a1a" }}>Our Core Products</h3>
                {PRODUCTS.slice(0, 4).map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 3 ? "1px solid #f5f5f5" : "none" }}>
                    <div style={{ width: 42, height: 42, background: p.color, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, fontStyle: "normal" }}>
                      {p.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a1a" }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>Premium Export Quality</div>
                    </div>
                    <div style={{ marginLeft: "auto", background: "#e8f5e9", color: "#2e7d32", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>99% Pure</div>
                  </div>
                ))}
              </div>
              <div style={{ position: "absolute", top: -20, right: -20, background: "#2e7d32", color: "white", borderRadius: 16, padding: "14px 18px", fontSize: 13, fontWeight: 700, boxShadow: "0 8px 24px rgba(46,125,50,0.35)" }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>40+</div>
                <div style={{ opacity: 0.85 }}>Countries</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "60px 5%", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="grid-4">
          {STATS.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 0.1}>
              <div className="stat-card">
                <div style={{ fontSize: 44, fontWeight: 800, color: "#2e7d32", fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>
                  {s.value === "40+" ? <><CountUp target="40" />+</> :
                   s.value === "99%" ? <><CountUp target="99" />%</> :
                   s.value === "500+" ? <><CountUp target="500" />+</> :
                   <CountUp target="2018" />}
                </div>
                <div style={{ fontSize: 14, color: "#777", fontWeight: 500 }}>{s.label}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 5%", background: "#fafaf8" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-2">
          <AnimatedSection>
            <div style={{ position: "relative" }}>
              <div style={{ background: "linear-gradient(135deg,#e8f5e9,#f1f8e9)", borderRadius: 28, padding: 50, textAlign: "center" }}>
                <div style={{ fontSize: 120 }}>🌾</div>
                <div style={{ marginTop: 20, fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#2e7d32", fontWeight: 700 }}>"From Farm to Global"</div>
              </div>
              <div style={{ position: "absolute", bottom: -20, left: -20, background: "white", borderRadius: 18, padding: "18px 24px", boxShadow: "0 12px 40px rgba(0,0,0,0.1)", border: "1px solid #e8f5e9" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#2e7d32", marginBottom: 4 }}>🏭 Unjha, Gujarat</div>
                <div style={{ fontSize: 12, color: "#888" }}>World's Psyllium Capital</div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="section-tag">About Us</div>
            <h2 className="section-title" style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 800, lineHeight: 1.15, marginBottom: 24, letterSpacing: "-0.5px" }}>
              Your Trusted Partner for Premium Psyllium Products
            </h2>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.85, marginBottom: 20 }}>
              PureHusk Industries is one of India's leading producers, suppliers and exporters of premium-quality psyllium products. Based in Unjha — the psyllium capital of the world — we source directly from farmers and process using advanced automated systems.
            </p>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.85, marginBottom: 32 }}>
              We specialize in gluten-free, non-GMO, Kosher and Halal-certified psyllium products. With a strong presence in health supplements, food, pharmaceuticals, and animal feed industries globally.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["🌱","Source from Farmers","Direct farm procurement"],["⚡","Advanced Processing","Automated facilities"],["🌍","Global Delivery","On-time worldwide"],["📦","Custom Packaging","Retail to Jumbo bags"]].map(([ic,t,s]) => (
                <div key={t} style={{ background: "white", borderRadius: 14, padding: "16px 18px", border: "1.5px solid #e8f5e9" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{ic}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 4 }}>{t}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{s}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: 800, margin: "80px auto 0" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-tag">Our Journey</div>
              <h2 className="section-title" style={{ fontSize: 36, fontFamily: "'Playfair Display', serif", fontWeight: 800 }}>Growing Since 2018</h2>
            </div>
          </AnimatedSection>
          <div style={{ position: "relative", paddingLeft: 24 }}>
            <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 2, background: "linear-gradient(#2e7d32,#c8e6c9)" }}></div>
            {TIMELINE.map((t, i) => (
              <AnimatedSection key={t.year} delay={i * 0.1}>
                <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 32, paddingLeft: 28, position: "relative" }}>
                  <div style={{ position: "absolute", left: -18, width: 14, height: 14, background: "#2e7d32", borderRadius: "50%", marginTop: 4, boxShadow: "0 0 0 4px #e8f5e9" }}></div>
                  <div style={{ background: "white", borderRadius: 16, padding: "18px 24px", border: "1.5px solid #e8f5e9", flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#2e7d32", marginBottom: 6 }}>{t.year}</div>
                    <div style={{ fontSize: 15, color: "#333" }}>{t.event}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: "100px 5%", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-tag">Our Products</div>
              <h2 className="section-title" style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: 16 }}>High-Quality Psyllium Products</h2>
              <p style={{ fontSize: 17, color: "#666", maxWidth: 560, margin: "0 auto" }}>From farm-fresh seeds to certified organic powder — every product meets the highest global quality standards.</p>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="grid-3">
            {PRODUCTS.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.08}>
                <div className={`product-card${activeProduct === i ? " active" : ""}`} onClick={() => setActiveProduct(activeProduct === i ? null : i)}>
                  <div style={{ width: 60, height: 60, background: p.color, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 20 }}>{p.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "#1a1a1a" }}>{p.name}</h3>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{p.desc}</p>
                  {activeProduct === i && (
                    <div style={{ marginTop: 20, padding: "16px", background: p.color, borderRadius: 12, fontSize: 13, color: p.accent, fontWeight: 600 }}>
                      ✓ Export quality certified &nbsp;|&nbsp; Custom packing available &nbsp;|&nbsp; Bulk orders welcome
                    </div>
                  )}
                  <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, color: p.accent, fontSize: 14, fontWeight: 600 }}>
                    Learn more <span style={{ transition: "transform 0.2s", transform: activeProduct === i ? "rotate(90deg)" : "none", display: "inline-block" }}>→</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Packing sizes */}
          <AnimatedSection>
            <div style={{ marginTop: 60, background: "linear-gradient(135deg,#e8f5e9,#f1f8e9)", borderRadius: 24, padding: "40px 48px" }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: "#1a1a1a" }}>📦 Available Packing Sizes</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }} className="grid-5">
                {[["10 KG","HDPE / PP / Paper"],["15 KG","HDPE / PP / Paper"],["25 KG","HDPE / PP / Paper"],["50 KG","PP Bag"],["1000 KG","Jumbo Bag"]].map(([size, label]) => (
                  <div key={size} style={{ background: "white", borderRadius: 14, padding: "20px", textAlign: "center", border: "1.5px solid #c8e6c9" }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>📦</div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "#2e7d32" }}>{size}</div>
                    <div style={{ fontSize: 11, color: "#888", marginTop: 4 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* QUALITY / CERTIFICATIONS */}
      <section id="quality" style={{ padding: "100px 5%", background: "#fafaf8" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-tag">Quality</div>
              <h2 className="section-title" style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: 16 }}>Internationally Certified Quality</h2>
              <p style={{ fontSize: 17, color: "#666", maxWidth: 560, margin: "0 auto" }}>Every batch is tested in our in-house lab and certified by global bodies before it leaves our facility.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 60 }}>
              {CERTIFICATIONS.map(c => <div key={c} className="cert-badge">✓ {c}</div>)}
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="grid-3">
            {[
              { icon: "🔬", title: "In-House Lab Testing", desc: "Every product batch undergoes rigorous testing for purity, moisture, fiber content and contamination." },
              { icon: "🏭", title: "State-of-the-Art Facility", desc: "Automated processing lines with advanced cleaning, grading, and grinding systems for precision output." },
              { icon: "🌱", title: "Non-GMO & Organic", desc: "All products are naturally grown, non-GMO, and available in certified organic variants." },
              { icon: "📋", title: "Full Documentation", desc: "COA, MSDS, and all regulatory documents provided with every shipment for hassle-free import." },
              { icon: "🚚", title: "Timely Global Delivery", desc: "Reliable logistics partners ensure on-time delivery to 40+ countries across all continents." },
              { icon: "🤝", title: "Custom Solutions", desc: "Private labeling, custom formulations, and white-label options for your brand needs." },
            ].map((c, i) => (
              <AnimatedSection key={c.title} delay={i * 0.08}>
                <div className="app-card" style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#1a1a1a" }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section id="applications" style={{ padding: "100px 5%", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-tag">Applications</div>
              <h2 className="section-title" style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: 16 }}>Versatile Applications Across Industries</h2>
              <p style={{ fontSize: 17, color: "#666", maxWidth: 560, margin: "0 auto" }}>Psyllium's unique fiber properties make it indispensable across a wide range of modern industries.</p>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="grid-3">
            {APPLICATIONS.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.08}>
                <div className="app-card">
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{a.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#1a1a1a" }}>{a.title}</h3>
                  <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7 }}>{a.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* EXPORT */}
      <section id="export" style={{ padding: "100px 5%", background: "linear-gradient(160deg,#e8f5e9,#f1f8e9)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-tag">Global Export</div>
              <h2 className="section-title" style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: 16 }}>Trusted Worldwide</h2>
              <p style={{ fontSize: 17, color: "#555", maxWidth: 540, margin: "0 auto" }}>Exporting premium psyllium products to 40+ countries across 6 continents with reliable, on-time delivery.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 48 }}>
              {COUNTRIES.map(c => <div key={c} className="country-tag">🌍 {c}</div>)}
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="grid-3">
              {[
                { icon: "🌏", title: "Asia Pacific", countries: "Singapore, Bangladesh, Japan, China, Australia" },
                { icon: "🌍", title: "Europe & Americas", countries: "Germany, France, UK, USA, Canada, Netherlands" },
                { icon: "🌐", title: "Middle East & CIS", countries: "UAE, Russia, Afghanistan, Pakistan" },
              ].map((r) => (
                <div key={r.title} style={{ background: "white", borderRadius: 20, padding: "28px 24px", border: "1.5px solid #c8e6c9", textAlign: "center" }}>
                  <div style={{ fontSize: 44, marginBottom: 16 }}>{r.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#1a1a1a" }}>{r.title}</h3>
                  <p style={{ fontSize: 13, color: "#666" }}>{r.countries}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "80px 5%", background: "linear-gradient(135deg,#1b5e20,#2e7d32,#388e3c)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-50%", right: "-10%", width: 500, height: 500, background: "rgba(255,255,255,0.04)", borderRadius: "50%" }}></div>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <AnimatedSection>
            <h2 style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 800, color: "white", marginBottom: 20, letterSpacing: "-0.5px" }}>Ready to Partner with Us?</h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 36, lineHeight: 1.7 }}>Get free samples, competitive pricing, and full certifications documentation for your imports.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{ background: "white", color: "#2e7d32", border: "none", padding: "15px 36px", borderRadius: 50, fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all 0.3s", boxShadow: "0 6px 24px rgba(0,0,0,0.2)" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}
                onClick={() => scrollTo("contact")}>
                Request Free Sample
              </button>
              <button style={{ background: "transparent", color: "white", border: "2px solid rgba(255,255,255,0.6)", padding: "14px 34px", borderRadius: 50, fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
                Download Brochure
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 5%", background: "#fafaf8" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }} className="grid-2">
          <AnimatedSection>
            <div className="section-tag">Contact Us</div>
            <h2 className="section-title" style={{ fontSize: 42, fontFamily: "'Playfair Display', serif", fontWeight: 800, marginBottom: 24, letterSpacing: "-0.5px" }}>Let's Start a Conversation</h2>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.85, marginBottom: 40 }}>Whether you need a sample, price list, or want to discuss a bulk order — our team is ready to assist.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "📞", label: "Phone / WhatsApp", value: "+91 98000 00000" },
                { icon: "📧", label: "Email", value: "info@purehusk.com" },
                { icon: "📍", label: "Address", value: "Unjha, Gujarat — 384170, India" },
                { icon: "🕐", label: "Working Hours", value: "Mon–Sat: 9:00 AM – 6:00 PM IST" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, background: "#e8f5e9", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: 12, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div style={{ background: "white", borderRadius: 24, padding: "40px 36px", boxShadow: "0 20px 60px rgba(0,0,0,0.07)", border: "1.5px solid #f0f0f0" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#2e7d32", marginBottom: 12 }}>Message Sent!</h3>
                  <p style={{ color: "#666", fontSize: 15 }}>Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 28, color: "#1a1a1a" }}>Send Us a Message</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 8, display: "block" }}>Full Name *</label>
                      <input className="contact-input" required placeholder="Your name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 8, display: "block" }}>Company</label>
                      <input className="contact-input" placeholder="Company name" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 8, display: "block" }}>Email Address *</label>
                    <input className="contact-input" type="email" required placeholder="your@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 8, display: "block" }}>Phone / WhatsApp</label>
                    <input className="contact-input" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 8, display: "block" }}>Message / Enquiry *</label>
                    <textarea className="contact-input" required rows={4} placeholder="Tell us about your requirements..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "vertical" }} />
                  </div>
                  <button className="btn-primary" style={{ width: "100%", fontSize: 16, padding: "16px" }} onClick={handleSubmit}>Send Enquiry →</button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#111", color: "white", padding: "60px 5% 30px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 48, marginBottom: 48 }} className="grid-2">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#2e7d32,#66bb6a)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🌿</div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "white" }}>PureHusk Industries</div>
                  <div style={{ fontSize: 10, color: "#888", letterSpacing: "1px", textTransform: "uppercase" }}>Unjha, Gujarat</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.8, marginBottom: 24, maxWidth: 280 }}>Supplying pure and reliable psyllium products across the globe since 2018. Trusted by 500+ clients in 40+ countries.</p>
              <div style={{ display: "flex", gap: 12 }}>
                {["📘","📸","💼","🐦"].map((ic, i) => (
                  <div key={i} style={{ width: 38, height: 38, background: "#222", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s", fontSize: 16 }}
                    onMouseEnter={e => e.currentTarget.style.background = "#2e7d32"}
                    onMouseLeave={e => e.currentTarget.style.background = "#222"}>{ic}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 20, textTransform: "uppercase", letterSpacing: "1px" }}>Products</h4>
              {["Psyllium Seeds","Psyllium Husk","Husk Powder","Khakha Powder","Cattle Feed"].map(l => (
                <div key={l} style={{ marginBottom: 12 }}><span className="footer-link">{l}</span></div>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 20, textTransform: "uppercase", letterSpacing: "1px" }}>Company</h4>
              {["About Us","Quality","Certifications","Export","Blogs","Contact"].map(l => (
                <div key={l} style={{ marginBottom: 12 }}><span className="footer-link">{l}</span></div>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "white", marginBottom: 20, textTransform: "uppercase", letterSpacing: "1px" }}>Get In Touch</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["📞","+91 98000 00000"],["📧","info@purehusk.com"],["📍","Unjha, Gujarat 384170"]].map(([ic,v]) => (
                  <div key={v} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 16 }}>{ic}</span>
                    <span style={{ fontSize: 13, color: "#aaa" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={{ fontSize: 13, color: "#aaa", marginBottom: 10 }}>Certifications</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["FDA","FSSAI","Halal","Kosher"].map(c => (
                    <span key={c} style={{ background: "#1a2e1a", color: "#66bb6a", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, border: "1px solid #2e4a2e" }}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid #222", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 13, color: "#666" }}>© 2025 PureHusk Industries. All rights reserved.</div>
            <div style={{ display: "flex", gap: 24 }}>
              {["Privacy Policy","Terms of Use","Sitemap"].map(l => (
                <span key={l} className="footer-link" style={{ fontSize: 13 }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}