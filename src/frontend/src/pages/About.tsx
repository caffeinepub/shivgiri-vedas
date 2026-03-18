import { Link } from "@tanstack/react-router";
import { Award, Eye, Globe, Heart, Leaf, Sprout, Target } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const team = [
  {
    name: "Shivam Bachute",
    role: "Founder & CEO",
    image: "/assets/uploads/IMG_20250601_121116-1.jpg",
    initials: "SB",
    color: "from-green-700 to-green-500",
  },
  {
    name: "Parshuram Malwadkar",
    role: "Head of Marketing",
    image: "/assets/generated/team-marketing.dim_300x300.jpg",
    initials: "PM",
    color: "from-emerald-700 to-emerald-500",
  },
  {
    name: "Rohit Kumar",
    role: "Lead SEO Strategist",
    image: "/assets/generated/team-marketing.dim_300x300.jpg",
    initials: "RK",
    color: "from-teal-700 to-teal-500",
  },
  {
    name: "Sneha Joshi",
    role: "Content Director",
    image: "/assets/generated/team-wellness.dim_300x300.jpg",
    initials: "SJ",
    color: "from-green-800 to-green-600",
  },
];

export default function About() {
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
            Our Story
          </span>
          <h1
            className="font-montserrat font-black text-white mb-6 leading-tight"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            About <span className="green-gradient-text">Shivgiri Vedas</span>
          </h1>
          <p className="text-[#B7C0D6] text-lg max-w-2xl mx-auto leading-relaxed">
            Born from the rich soil of Maharashtra, we blend ancient Ayurvedic
            wisdom with modern digital expertise to help people and businesses
            thrive.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <img
                src="/assets/generated/moringa-tree-leaves.dim_600x400.jpg"
                alt="Moringa Farm"
                className="rounded-2xl w-full object-cover glow-ring"
                style={{ height: "420px" }}
              />
            </div>
            <div className="reveal">
              <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
                Our Journey
              </span>
              <h2 className="font-montserrat font-bold text-3xl text-white mb-5">
                From Solapur&apos;s Soil to Your Table
              </h2>
              <p className="text-[#B7C0D6] leading-relaxed mb-4">
                Shivgiri Vedas was founded with a simple vision: to bring the
                incredible power of organic moringa to every household in India,
                while helping businesses grow in the digital age.
              </p>
              <p className="text-[#B7C0D6] leading-relaxed mb-6">
                Starting from small organic farms in Solapur, Maharashtra, we
                have grown into a trusted brand with over 1,200 happy customers
                and 500+ successful digital marketing projects.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Founded", value: "2016" },
                  { label: "Products", value: "12+" },
                  { label: "Clients", value: "1200+" },
                  { label: "Awards", value: "15+" },
                ].map((s) => (
                  <div key={s.label} className="brand-card p-4 text-center">
                    <div className="text-2xl font-bold green-gradient-text mb-1">
                      {s.value}
                    </div>
                    <div className="text-[#8B95AD] text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <h2 className="section-title mb-4">Mission &amp; Vision</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="brand-card p-8 reveal">
              <div className="w-14 h-14 rounded-2xl bg-green-400/10 flex items-center justify-center mb-5">
                <Target className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Our Mission</h3>
              <p className="text-[#B7C0D6] leading-relaxed">
                To make premium organic moringa accessible to every Indian
                household while providing world-class digital marketing services
                that help businesses achieve extraordinary growth.
              </p>
            </div>
            <div className="brand-card p-8 reveal">
              <div className="w-14 h-14 rounded-2xl bg-green-400/10 flex items-center justify-center mb-5">
                <Eye className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Our Vision</h3>
              <p className="text-[#B7C0D6] leading-relaxed">
                To be India&apos;s most trusted organic wellness brand and a
                leading digital marketing partner, creating a healthier, more
                connected world through nature and technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <h2 className="section-title mb-4">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: "Organic Integrity",
                desc: "No compromises on purity. Ever.",
              },
              {
                icon: Heart,
                title: "Customer Love",
                desc: "Every decision is made with your wellbeing in mind.",
              },
              {
                icon: Globe,
                title: "Sustainability",
                desc: "Farming and business practices that protect our planet.",
              },
              {
                icon: Sprout,
                title: "Continuous Growth",
                desc: "We grow alongside our customers and partners.",
              },
            ].map((v, i) => (
              <div
                key={v.title}
                className="brand-card p-6 text-center reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-green-400/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{v.title}</h3>
                <p className="text-[#8B95AD] text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <h2 className="section-title mb-4">Meet Our Team</h2>
            <p className="section-subtitle">
              Passionate experts dedicated to your health and digital success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <div
                key={m.name}
                className="brand-card overflow-hidden text-center reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold mb-1">{m.name}</h3>
                  <p className="text-[#8B95AD] text-sm">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 reveal">
            <h2 className="section-title mb-4">Certifications &amp; Awards</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4 reveal">
            {[
              "FSSAI Certified",
              "ISO 9001:2015",
              "Organic India Certified",
              "Best Startup Award 2022",
              "Green Business Award",
            ].map((c) => (
              <div
                key={c}
                className="brand-card px-6 py-4 flex items-center gap-2"
              >
                <Award className="w-5 h-5 text-green-400" />
                <span className="text-white text-sm font-medium">{c}</span>
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
          <h2 className="section-title mb-4">Ready to Start Your Journey?</h2>
          <p className="section-subtitle mb-8">
            Join thousands of customers who trust Shivgiri Vedas.
          </p>
          <Link to="/contact">
            <button
              type="button"
              className="btn-green px-10 py-4 text-base"
              data-ocid="about.primary_button"
            >
              Get in Touch
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
