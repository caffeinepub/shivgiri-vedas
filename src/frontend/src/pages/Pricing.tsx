import { Link } from "@tanstack/react-router";
import { CheckCircle2, Crown, Shield, X, Zap } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const plans = [
  {
    icon: Zap,
    name: "Starter",
    price: "₹15,000",
    period: "/month",
    desc: "Perfect for small businesses starting their digital journey.",
    features: [
      { label: "SEO Optimization", included: true },
      { label: "Social Media (2 platforms)", included: true },
      { label: "Monthly Reporting", included: true },
      { label: "Google Ads Management", included: false },
      { label: "Website Development", included: false },
      { label: "Dedicated Account Manager", included: false },
    ],
    color: "from-slate-700 to-slate-600",
    popular: false,
  },
  {
    icon: Shield,
    name: "Professional",
    price: "₹35,000",
    period: "/month",
    desc: "For growing businesses that need comprehensive digital marketing.",
    features: [
      { label: "SEO Optimization", included: true },
      { label: "Social Media (4 platforms)", included: true },
      { label: "Weekly Reporting", included: true },
      { label: "Google Ads Management", included: true },
      { label: "Website Development", included: true },
      { label: "Dedicated Account Manager", included: false },
    ],
    color: "from-green-700 to-green-500",
    popular: true,
  },
  {
    icon: Crown,
    name: "Enterprise",
    price: "₹75,000",
    period: "/month",
    desc: "Full-scale digital domination for established businesses.",
    features: [
      { label: "SEO Optimization", included: true },
      { label: "Social Media (All platforms)", included: true },
      { label: "Daily Reporting", included: true },
      { label: "Google Ads Management", included: true },
      { label: "Website Development", included: true },
      { label: "Dedicated Account Manager", included: true },
    ],
    color: "from-emerald-700 to-emerald-500",
    popular: false,
  },
];

const comparison = [
  {
    feature: "SEO Keywords Tracked",
    starter: "20",
    pro: "100",
    enterprise: "Unlimited",
  },
  {
    feature: "Social Media Posts/Month",
    starter: "12",
    pro: "30",
    enterprise: "60",
  },
  {
    feature: "Google Ads Budget Managed",
    starter: "—",
    pro: "Up to ₹2L",
    enterprise: "Unlimited",
  },
  {
    feature: "Content Pieces/Month",
    starter: "4",
    pro: "12",
    enterprise: "30",
  },
  {
    feature: "Support",
    starter: "Email",
    pro: "Phone + Email",
    enterprise: "24/7 Dedicated",
  },
];

export default function Pricing() {
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
            Transparent Pricing
          </span>
          <h1
            className="font-montserrat font-black text-white mb-4"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Simple, <span className="green-gradient-text">Honest Pricing</span>
          </h1>
          <p className="text-[#B7C0D6] text-lg leading-relaxed">
            No hidden fees. No long-term contracts. Just results-driven digital
            marketing that grows your business.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ background: "#0F172A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`brand-card p-7 reveal ${
                  plan.popular ? "ring-1 ring-green-400/50 relative" : ""
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-700 to-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                >
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-1">
                  {plan.name}
                </h3>
                <p className="text-[#8B95AD] text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-montserrat font-black green-gradient-text">
                    {plan.price}
                  </span>
                  <span className="text-[#8B95AD] text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-7">
                  {plan.features.map((f) => (
                    <li
                      key={f.label}
                      className={`flex items-center gap-2.5 text-sm ${f.included ? "text-[#B7C0D6]" : "text-[#8B95AD]/50"}`}
                    >
                      {f.included ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-[#8B95AD]/30 shrink-0" />
                      )}
                      {f.label}
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <button
                    type="button"
                    className={`w-full py-3 text-sm ${plan.popular ? "btn-green" : "btn-outline-green"}`}
                    data-ocid={`pricing.item.${i + 1}`}
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "#0B1220" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 reveal">
            <h2 className="section-title mb-4">Full Feature Comparison</h2>
          </div>
          <div className="brand-card overflow-hidden reveal">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                    <th className="text-left px-6 py-4 text-[#B7C0D6] font-semibold">
                      Feature
                    </th>
                    {plans.map((p) => (
                      <th
                        key={p.name}
                        className={`text-center px-6 py-4 font-semibold ${p.popular ? "text-green-400" : "text-[#B7C0D6]"}`}
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr
                      key={row.feature}
                      style={{
                        background:
                          i % 2 === 0
                            ? "transparent"
                            : "rgba(255,255,255,0.02)",
                      }}
                    >
                      <td className="px-6 py-4 text-[#B7C0D6]">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 text-center text-[#8B95AD]">
                        {row.starter}
                      </td>
                      <td className="px-6 py-4 text-center text-green-400 font-medium">
                        {row.pro}
                      </td>
                      <td className="px-6 py-4 text-center text-[#B7C0D6]">
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, #0D2B0F, #0F172A)" }}
      >
        <div className="max-w-2xl mx-auto px-4 reveal">
          <h2 className="section-title mb-4">Not Sure Which Plan Is Right?</h2>
          <p className="section-subtitle mb-8">
            Book a free 30-minute consultation. We&apos;ll help you choose the
            perfect plan for your goals.
          </p>
          <Link to="/contact">
            <button
              type="button"
              className="btn-green px-10 py-4 text-base"
              data-ocid="pricing.primary_button"
            >
              Book Free Consultation
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
