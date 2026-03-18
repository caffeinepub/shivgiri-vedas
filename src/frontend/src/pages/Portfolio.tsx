import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const cases = [
  {
    title: "SEO Growth 300%",
    tag: "SEO",
    client: "HealthMart India",
    desc: "Achieved top 3 Google rankings for 50+ high-value keywords in the health supplement space, resulting in 300% organic traffic growth and 180% revenue increase.",
    result: "+300% Traffic",
    duration: "6 months",
  },
  {
    title: "Viral Social Campaign",
    tag: "Social",
    client: "OrganicLife Co.",
    desc: "Designed and executed a viral social media campaign that reached 2M+ users, gained 50K new followers in 30 days, and drove ₹15L in direct sales.",
    result: "2M+ Reach",
    duration: "30 days",
  },
  {
    title: "Brand Identity Redesign",
    tag: "Branding",
    client: "FreshGreens Startup",
    desc: "Complete brand overhaul including logo, packaging, and website that elevated the brand perception and increased conversion rate by 45%.",
    result: "+45% Conversion",
    duration: "2 months",
  },
  {
    title: "Google Ads Scaling",
    tag: "Ads",
    client: "Wellness Clinic",
    desc: "Scaled Google Ads campaigns from ₹50K to ₹5L/month while maintaining 4x ROAS, generating consistent quality leads for premium health services.",
    result: "4x ROAS",
    duration: "4 months",
  },
  {
    title: "E-Commerce Website",
    tag: "Web",
    client: "Spice Bazaar Online",
    desc: "Built a high-performance Shopify store with custom design, resulting in 220% increase in online sales within 90 days of launch.",
    result: "+220% Sales",
    duration: "45 days",
  },
  {
    title: "Content Marketing",
    tag: "Content",
    client: "Ayurveda Experts",
    desc: "Developed 120+ SEO-optimized articles and a YouTube content strategy that established the brand as the #1 authority in Ayurvedic wellness online.",
    result: "#1 Authority",
    duration: "8 months",
  },
];

const filters = ["All", "SEO", "Social", "Branding", "Ads", "Web", "Content"];
const clients = [
  "HealthMart",
  "OrganicLife",
  "FreshGreens",
  "Wellness Clinic",
  "Spice Bazaar",
  "Ayurveda Experts",
];

export default function Portfolio() {
  useReveal();
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? cases : cases.filter((c) => c.tag === active);

  return (
    <div style={{ background: "#0F172A" }}>
      <section
        className="pt-32 pb-20 text-center"
        style={{
          background: "linear-gradient(180deg, #0B1220 0%, #0F172A 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Our Work
          </span>
          <h1
            className="font-montserrat font-black text-white mb-4"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Portfolio &amp;{" "}
            <span className="green-gradient-text">Case Studies</span>
          </h1>
          <p className="text-[#B7C0D6] text-lg leading-relaxed">
            Real results for real businesses. Explore how we have helped our
            clients achieve extraordinary growth.
          </p>
        </div>
      </section>

      <section className="py-12" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                data-ocid="portfolio.tab"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  active === f
                    ? "btn-green"
                    : "border border-white/10 text-[#B7C0D6] hover:border-green-400/30 hover:text-green-400"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <div
                key={c.title}
                className="relative overflow-hidden rounded-2xl reveal group"
                style={{ transitionDelay: `${i * 0.1}s`, height: "340px" }}
              >
                <img
                  src="/assets/generated/moringa-farm.dim_1200x800.jpg"
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,18,32,0.98) 45%, rgba(11,18,32,0.2) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-400/20 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {c.tag}
                    </span>
                    <span className="text-[#8B95AD] text-xs">{c.client}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {c.title}
                  </h3>
                  <p className="text-[#B7C0D6] text-xs mb-3 line-clamp-2">
                    {c.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="green-gradient-text font-bold text-sm">
                        {c.result}
                      </span>
                    </div>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1 text-white text-xs bg-white/10 rounded-full px-3 py-1.5 hover:bg-green-400/20 transition-colors"
                    >
                      Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[#8B95AD] text-sm mb-8 uppercase tracking-widest">
            Trusted By Leading Brands
          </p>
          <div className="flex flex-wrap justify-center gap-6 reveal">
            {clients.map((c) => (
              <div key={c} className="brand-card px-6 py-3">
                <span className="text-[#B7C0D6] font-semibold text-sm">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, #0D2B0F, #0F172A)" }}
      >
        <div className="max-w-2xl mx-auto px-4 reveal">
          <h2 className="section-title mb-4">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="section-subtitle mb-8">
            Let&apos;s discuss your project and create a winning strategy
            together.
          </p>
          <Link to="/contact">
            <button
              type="button"
              className="btn-green px-10 py-4 text-base"
              data-ocid="portfolio.primary_button"
            >
              Start Your Project
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
