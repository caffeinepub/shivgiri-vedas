import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Code2,
  Leaf,
  PenTool,
  Share2,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitContact, useSubscribeNewsletter } from "../hooks/useQueries";
import { useReveal } from "../hooks/useReveal";

// Animated Counter component
function Counter({
  target,
  suffix = "",
  label,
}: { target: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-montserrat font-bold green-gradient-text mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-[#B7C0D6] text-sm">{label}</div>
    </div>
  );
}

// FAQ Item
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="brand-card mb-3 overflow-hidden">
      <button
        type="button"
        className="w-full px-6 py-5 flex items-center justify-between text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-medium text-sm pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-green-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#8B95AD] shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-[#B7C0D6] text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  useReveal();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const subscribe = useSubscribeNewsletter();
  const submitContact = useSubmitContact();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await subscribe.mutateAsync(newsletterEmail);
      toast.success("🌿 Subscribed! Welcome to the Shivgiri family.");
      setNewsletterEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    }
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutateAsync(contactForm);
      toast.success("✅ Message sent! We'll respond within 24 hours.");
      setContactForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const services = [
    {
      icon: TrendingUp,
      title: "SEO Optimization",
      desc: "Dominate search rankings with data-driven SEO strategies tailored for your business.",
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      desc: "Build engaged communities and grow your brand presence across all platforms.",
    },
    {
      icon: Target,
      title: "Google Ads",
      desc: "Precision-targeted ad campaigns that maximize your ROI and drive qualified leads.",
    },
    {
      icon: Code2,
      title: "Website Development",
      desc: "Modern, fast, and conversion-optimized websites that turn visitors into customers.",
    },
    {
      icon: Sparkles,
      title: "Branding",
      desc: "Craft a memorable brand identity that resonates with your audience and stands out.",
    },
    {
      icon: PenTool,
      title: "Content Marketing",
      desc: "Compelling content strategies that educate, engage, and convert your target audience.",
    },
  ];

  const benefits = [
    {
      icon: "💊",
      title: "Rich in Vitamins",
      desc: "Contains 7x more Vitamin C than oranges and 4x more Vitamin A than carrots.",
    },
    {
      icon: "🛡️",
      title: "Boosts Immunity",
      desc: "Powerful antioxidants and anti-inflammatory compounds strengthen your immune system.",
    },
    {
      icon: "⚡",
      title: "Natural Energy",
      desc: "Sustained energy without caffeine crashes. Fuel your day the natural way.",
    },
    {
      icon: "🌿",
      title: "100% Organic",
      desc: "Grown without pesticides or chemicals. Pure, clean, and certified organic.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Health Enthusiast",
      text: "Best moringa powder I have used. Very pure and fresh. My energy levels have improved drastically. Highly recommend Shivgiri Vedas!",
      rating: 5,
      initials: "PS",
    },
    {
      name: "Rahul Mehta",
      role: "Business Owner",
      text: "The digital marketing team at Shivgiri Vedas transformed our online presence. Our sales increased by 200% in just 3 months!",
      rating: 5,
      initials: "RM",
    },
    {
      name: "Anjali Kulkarni",
      role: "Wellness Coach",
      text: "I recommend Shivgiri Moringa to all my clients. The quality is exceptional and results are visible within weeks.",
      rating: 5,
      initials: "AK",
    },
  ];

  const faqs = [
    {
      question: "What is moringa powder?",
      answer:
        "Moringa powder is made from the dried leaves of the Moringa oleifera tree, often called the 'Miracle Tree.' It is packed with essential vitamins, minerals, and antioxidants, making it one of the most nutrient-dense superfoods on the planet.",
    },
    {
      question: "What are the health benefits of moringa powder?",
      answer:
        "Moringa powder is rich in Vitamins A, B, C, and E, iron, calcium, and protein. It boosts immunity, improves energy levels, supports healthy digestion, enhances skin health, and helps manage blood sugar and cholesterol levels.",
    },
    {
      question: "How should moringa powder be consumed?",
      answer:
        "You can mix 1-2 teaspoons of moringa powder into smoothies, juices, yogurt, soups, or warm water. It can also be added to baked goods or sprinkled on salads. Start with a small amount and gradually increase your intake.",
    },
    {
      question: "Is your moringa powder certified organic?",
      answer:
        "Yes, Shivgiri Vedas moringa powder is 100% certified organic. We use natural farming practices without any pesticides, herbicides, or chemical fertilizers. Our products are tested for purity and quality.",
    },
    {
      question: "What digital marketing services do you offer?",
      answer:
        "We offer a comprehensive range of digital marketing services including SEO, Social Media Marketing, Google Ads, Content Marketing, Website Development, and Brand Strategy. We create customized strategies tailored to your business goals.",
    },
    {
      question: "How long before I see results from digital marketing?",
      answer:
        "Results vary by service type. Google Ads can show immediate traffic increases, while SEO typically takes 3-6 months for significant results. Social Media Marketing usually shows engagement improvement within 1-2 months.",
    },
  ];

  const portfolio = [
    {
      title: "SEO Growth 300%",
      tag: "SEO",
      desc: "Helped a local business rank #1 on Google for 50+ keywords, resulting in 300% organic traffic growth.",
      result: "+300% Traffic",
    },
    {
      title: "Social Media Campaign",
      tag: "Social",
      desc: "Viral campaign for a health brand reaching 2M+ people, gaining 50K new followers in 30 days.",
      result: "2M+ Reach",
    },
    {
      title: "Brand Redesign",
      tag: "Branding",
      desc: "Complete brand overhaul for a startup that led to 45% increase in conversion rate.",
      result: "+45% Conversion",
    },
  ];

  return (
    <div style={{ background: "#0F172A" }}>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-moringa-leaves.dim_1200x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-400/10 border border-green-400/20 rounded-full px-4 py-2 mb-6">
              <Leaf className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">
                100% Organic Certified
              </span>
            </div>

            <h1
              className="font-montserrat font-black text-white mb-4 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Shivgiri <span className="green-gradient-text">Organic</span>{" "}
              Moringa
            </h1>

            <p className="text-xl lg:text-2xl text-[#B7C0D6] mb-4 font-light">
              Pure Natural Superfood for Health &amp; Energy 🌿
            </p>

            <p className="text-[#8B95AD] text-base max-w-xl mb-8 leading-relaxed">
              Sourced from pristine organic farms in Maharashtra. Shivgiri Vedas
              delivers nature&apos;s most powerful superfood — along with
              premium digital marketing that grows your brand.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <button
                  type="button"
                  className="btn-green px-8 py-3.5 text-base"
                  data-ocid="hero.primary_button"
                >
                  Shop Now
                </button>
              </Link>
              <Link to="/about">
                <button
                  type="button"
                  className="btn-outline-green px-8 py-3.5 text-base"
                  data-ocid="hero.secondary_button"
                >
                  Learn More
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 mt-10">
              {["FSSAI Certified", "No Chemicals", "Farm to Table"].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-[#B7C0D6] text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-green-400/60" />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              Why Moringa
            </span>
            <h2 className="section-title mb-4">
              Nature&apos;s Most Powerful Superfood
            </h2>
            <p className="section-subtitle">
              Packed with over 90 nutrients, 46 antioxidants, and 36
              anti-inflammatory compounds
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="brand-card p-6 text-center reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {b.title}
                </h3>
                <p className="text-[#8B95AD] text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              What We Do
            </span>
            <h2 className="section-title mb-4">Digital Marketing Services</h2>
            <p className="section-subtitle">
              End-to-end digital solutions to grow your brand online and
              outperform your competition.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="brand-card p-6 reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {s.title}
                </h3>
                <p className="text-[#8B95AD] text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-green-400 text-sm font-medium hover:gap-2 transition-all"
                >
                  Learn more <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <Link to="/services">
              <button
                type="button"
                className="btn-green px-8 py-3"
                data-ocid="services.primary_button"
              >
                View All Services
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-24" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              Pure &amp; Natural
            </span>
            <h2 className="section-title mb-4">Our Premium Moringa Products</h2>
            <p className="section-subtitle">
              Farm-fresh moringa, carefully harvested and processed to preserve
              maximum nutrition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Shivgiri Moringa Powder 100g",
                price: "₹299",
                image: "/assets/generated/moringa-powder-bowl.dim_600x600.jpg",
                popular: false,
              },
              {
                name: "Shivgiri Moringa Powder 250g",
                price: "₹649",
                image:
                  "/assets/generated/moringa-product-package.dim_600x600.jpg",
                popular: true,
              },
              {
                name: "Shivgiri Moringa Powder 500g",
                price: "₹999",
                image: "/assets/generated/moringa-powder-bowl.dim_600x600.jpg",
                popular: false,
              },
            ].map((p, i) => (
              <div
                key={p.name}
                className={`brand-card overflow-hidden reveal ${
                  p.popular ? "ring-1 ring-green-400/40" : ""
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {p.popular && (
                  <div className="bg-gradient-to-r from-green-700 to-green-500 text-white text-xs font-bold text-center py-1.5 tracking-wide">
                    BEST SELLER
                  </div>
                )}
                <div className="overflow-hidden h-52">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {p.name}
                  </h3>
                  <ul className="space-y-1.5 mb-4">
                    {[
                      "100% Natural",
                      "No Chemicals",
                      "Rich in Nutrients",
                      "Organic Farming",
                    ].map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-[#B7C0D6]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold green-gradient-text">
                      {p.price}
                    </span>
                    <Link to="/products">
                      <button
                        type="button"
                        className="btn-green px-5 py-2 text-sm"
                        data-ocid={`products.item.${i + 1}`}
                      >
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
                Our Advantage
              </span>
              <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-white mb-6 leading-tight">
                Why Choose{" "}
                <span className="green-gradient-text">Shivgiri Vedas?</span>
              </h2>
              <p className="text-[#B7C0D6] leading-relaxed mb-6">
                We combine centuries of Ayurvedic wisdom with modern science to
                bring you the purest moringa products, while our digital
                expertise helps businesses thrive in the online world.
              </p>
              <Link to="/about">
                <button
                  type="button"
                  className="btn-green px-6 py-3"
                  data-ocid="why.primary_button"
                >
                  Discover Our Story
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Award,
                  title: "Certified Organic",
                  desc: "FSSAI certified with rigorous quality checks at every step.",
                },
                {
                  icon: Shield,
                  title: "Trusted Quality",
                  desc: "Tested for purity and free from contaminants or additives.",
                },
                {
                  icon: Users,
                  title: "Expert Team",
                  desc: "Agricultural scientists and digital marketing specialists.",
                },
                {
                  icon: Leaf,
                  title: "Customer First",
                  desc: "Your health and business success is our top priority.",
                },
              ].map((f, i) => (
                <div
                  key={f.title}
                  className="brand-card p-5 reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center mb-3">
                    <f.icon className="w-5 h-5 text-green-400" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {f.title}
                  </h4>
                  <p className="text-[#8B95AD] text-xs leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-20 stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            <Counter target={500} suffix="+" label="Projects Completed" />
            <Counter target={1200} suffix="+" label="Happy Clients" />
            <Counter target={98} suffix="%" label="Organic Growth" />
            <Counter target={8} suffix="+" label="Years Experience" />
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-24" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              Case Studies
            </span>
            <h2 className="section-title mb-4">Our Success Stories</h2>
            <p className="section-subtitle">
              Real results for real businesses. See how we&apos;ve helped our
              clients grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolio.map((p, i) => (
              <div
                key={p.title}
                className="relative overflow-hidden rounded-2xl reveal"
                style={{ transitionDelay: `${i * 0.1}s`, height: "280px" }}
              >
                <img
                  src="/assets/generated/moringa-farm.dim_800x500.jpg"
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,18,32,0.95) 40%, rgba(11,18,32,0.3) 100%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="bg-green-400/20 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full mb-2 inline-block">
                    {p.tag}
                  </span>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {p.title}
                  </h3>
                  <p className="text-[#B7C0D6] text-sm mb-3">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="green-gradient-text font-bold text-sm">
                      {p.result}
                    </span>
                    <Link
                      to="/portfolio"
                      className="inline-flex items-center gap-1 text-white text-xs bg-white/10 rounded-full px-3 py-1.5 hover:bg-green-400/20 transition-colors"
                    >
                      View <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <Link to="/portfolio">
              <button
                type="button"
                className="btn-outline-green px-8 py-3"
                data-ocid="portfolio.primary_button"
              >
                View All Case Studies
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              Testimonials
            </span>
            <h2 className="section-title mb-4">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="brand-card p-6 reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={`ts-${t.name}-${j}`}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-[#B7C0D6] text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">
                      {t.name}
                    </div>
                    <div className="text-[#8B95AD] text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="reveal">
              <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
                Got Questions?
              </span>
              <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-white mb-4 leading-tight">
                Frequently Asked{" "}
                <span className="green-gradient-text">Questions</span>
              </h2>
              <p className="text-[#B7C0D6] leading-relaxed mb-6">
                Everything you need to know about our moringa products and
                digital marketing services.
              </p>
              <Link to="/contact">
                <button
                  type="button"
                  className="btn-outline-green px-6 py-3"
                  data-ocid="faq.primary_button"
                >
                  Still have questions? Contact us
                </button>
              </Link>
            </div>
            <div className="reveal">
              {faqs.map((f) => (
                <FAQItem
                  key={f.question}
                  question={f.question}
                  answer={f.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, #0D2B0F 0%, #0F172A 50%, #0B1F3A 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="reveal">
            <Leaf className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h2 className="section-title mb-3">
              Stay Updated with Latest Health Tips
            </h2>
            <p className="section-subtitle mb-8">
              Get exclusive health tips, moringa recipes, and digital marketing
              insights delivered to your inbox.
            </p>
            <form
              onSubmit={handleNewsletter}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                data-ocid="newsletter.input"
                className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-white text-sm placeholder:text-[#8B95AD] focus:outline-none focus:border-green-400/40 transition-colors"
                required
              />
              <button
                type="submit"
                data-ocid="newsletter.submit_button"
                disabled={subscribe.isPending}
                className="btn-green px-6 py-3 text-sm whitespace-nowrap"
              >
                {subscribe.isPending ? "Subscribing..." : "Subscribe Free"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="py-24 relative"
        style={{
          backgroundImage:
            "url('/assets/generated/moringa-farm.dim_800x500.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(11,18,32,0.92), rgba(15,35,15,0.85))",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center reveal">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-white mb-4">
            Ready to Transform Your Health &amp; Business?
          </h2>
          <p className="text-[#B7C0D6] mb-8 text-lg">
            Join 1200+ satisfied customers who trust Shivgiri Vedas for premium
            moringa and digital growth.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <button
                type="button"
                className="btn-green px-10 py-4 text-lg"
                data-ocid="cta.primary_button"
              >
                Order Now
              </button>
            </Link>
            <Link to="/contact">
              <button
                type="button"
                className="btn-outline-green px-10 py-4 text-lg"
                data-ocid="cta.secondary_button"
              >
                Talk to Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
              Get in Touch
            </span>
            <h2 className="section-title mb-4">Contact Us</h2>
            <p className="section-subtitle">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond within 24 hours.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <form onSubmit={handleContact} className="brand-card p-8 reveal">
              <h3 className="text-white font-semibold text-xl mb-6">
                Send a Message
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="home-name"
                    className="text-[#B7C0D6] text-sm block mb-1.5"
                  >
                    Full Name
                  </label>
                  <input
                    id="home-name"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="Your full name"
                    data-ocid="contact.input"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#8B95AD] focus:outline-none focus:border-green-400/40 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="home-email"
                    className="text-[#B7C0D6] text-sm block mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="home-email"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    data-ocid="contact.input"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#8B95AD] focus:outline-none focus:border-green-400/40 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="home-phone"
                    className="text-[#B7C0D6] text-sm block mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="home-phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                    data-ocid="contact.input"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#8B95AD] focus:outline-none focus:border-green-400/40 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="home-message"
                    className="text-[#B7C0D6] text-sm block mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="home-message"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    placeholder="How can we help you?"
                    rows={4}
                    data-ocid="contact.textarea"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#8B95AD] focus:outline-none focus:border-green-400/40 transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  data-ocid="contact.submit_button"
                  disabled={submitContact.isPending}
                  className="btn-green w-full py-3.5 text-sm"
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>

            <div className="reveal">
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: "📧",
                    label: "Email",
                    value: "shivgiriherbal@gmail.com",
                    href: "mailto:shivgiriherbal@gmail.com",
                  },
                  {
                    icon: "📞",
                    label: "Phone",
                    value: "+91 9423376241",
                    href: "tel:+919423376241",
                  },
                  {
                    icon: "📍",
                    label: "Address",
                    value: "Solapur, Maharashtra, India",
                    href: null,
                  },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="brand-card p-5 flex items-start gap-4"
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <div className="text-[#8B95AD] text-xs mb-1">
                        {info.label}
                      </div>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white font-medium text-sm hover:text-green-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-white font-medium text-sm">
                          {info.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="rounded-2xl overflow-hidden border border-white/10"
                style={{ height: "280px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120961.99494893928!2d75.8090697!3d17.6855813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5db3a6b3f0555%3A0x1a5e82498bbb8c1a!2sSolapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shivgiri Vedas Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
