import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  PenTool,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const services = [
  {
    icon: TrendingUp,
    title: "SEO Optimization",
    desc: "Dominate search rankings with data-driven SEO. We conduct in-depth keyword research, technical audits, link building, and content optimization to put you at the top of Google.",
    features: [
      "Keyword Research & Strategy",
      "On-Page & Technical SEO",
      "Link Building",
      "Monthly Reporting",
    ],
    color: "from-green-700 to-green-500",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Build a powerful social media presence. We create engaging content, manage your communities, run influencer campaigns, and grow your following across Instagram, Facebook, and LinkedIn.",
    features: [
      "Content Creation & Scheduling",
      "Community Management",
      "Influencer Partnerships",
      "Analytics & Insights",
    ],
    color: "from-emerald-700 to-emerald-500",
  },
  {
    icon: Target,
    title: "Google Ads",
    desc: "Maximize your advertising ROI with precision-targeted Google Ads campaigns. From Search to Display to YouTube ads, we ensure every rupee works hard for your business.",
    features: [
      "Campaign Strategy & Setup",
      "Ad Copy & Creatives",
      "Bid Management",
      "Conversion Tracking",
    ],
    color: "from-teal-700 to-teal-500",
  },
  {
    icon: Code2,
    title: "Website Development",
    desc: "Modern, fast, and conversion-optimized websites built with the latest technologies. We create responsive designs that look stunning on all devices and drive business results.",
    features: [
      "Custom Web Design",
      "E-commerce Solutions",
      "Speed Optimization",
      "SEO-Ready Structure",
    ],
    color: "from-green-800 to-green-600",
  },
  {
    icon: Sparkles,
    title: "Branding",
    desc: "Create a powerful brand identity that resonates with your audience. From logo design to brand guidelines, we help you tell your unique story in a compelling way.",
    features: [
      "Logo & Visual Identity",
      "Brand Guidelines",
      "Brand Strategy",
      "Packaging Design",
    ],
    color: "from-emerald-800 to-emerald-600",
  },
  {
    icon: PenTool,
    title: "Content Marketing",
    desc: "Compelling content that educates, engages, and converts. We produce blogs, videos, infographics, and more to establish you as an authority in your industry.",
    features: [
      "Blog Writing & SEO Content",
      "Video Scripts",
      "Infographics",
      "Email Campaigns",
    ],
    color: "from-teal-800 to-teal-600",
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We learn about your business, goals, and competitive landscape.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "We craft a customized digital marketing roadmap for your success.",
  },
  {
    num: "03",
    title: "Execution",
    desc: "Our expert team implements the strategy with precision and creativity.",
  },
  {
    num: "04",
    title: "Optimize",
    desc: "We continuously monitor, test, and optimize for better results.",
  },
];

export default function Services() {
  useReveal();

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
            What We Offer
          </span>
          <h1
            className="font-montserrat font-black text-white mb-4"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Digital Marketing{" "}
            <span className="green-gradient-text">Services</span>
          </h1>
          <p className="text-[#B7C0D6] text-lg leading-relaxed">
            Comprehensive digital solutions designed to accelerate your brand
            growth and deliver measurable results.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="brand-card p-7 reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-5`}
                >
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-[#8B95AD] text-sm leading-relaxed mb-5">
                  {s.desc}
                </p>
                <ul className="space-y-2 mb-5">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-[#B7C0D6]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-green-400 text-sm font-medium hover:gap-2 transition-all"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <h2 className="section-title mb-4">How We Work</h2>
            <p className="section-subtitle">
              A proven 4-step process that delivers consistent results.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="brand-card p-6 reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl font-montserrat font-black green-gradient-text mb-4">
                  {s.num}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-[#8B95AD] text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 reveal">
            <h2 className="section-title mb-4">Technologies We Use</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 reveal">
            {[
              "Google Analytics",
              "SEMrush",
              "Ahrefs",
              "Hootsuite",
              "Mailchimp",
              "WordPress",
              "Shopify",
              "React",
              "Meta Ads",
              "Google Ads",
            ].map((t) => (
              <div
                key={t}
                className="brand-card px-5 py-3 text-sm text-[#B7C0D6] font-medium hover:text-green-400 transition-colors"
              >
                {t}
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
          <h2 className="section-title mb-4">Ready to Grow Your Business?</h2>
          <p className="section-subtitle mb-8">
            Get a free consultation and customized digital marketing strategy.
          </p>
          <Link to="/contact">
            <button
              type="button"
              className="btn-green px-10 py-4 text-base"
              data-ocid="services.cta_button"
            >
              Get Free Consultation
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
