import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useReveal } from "../hooks/useReveal";

const articles = [
  {
    title: "10 Incredible Health Benefits of Moringa Powder",
    category: "Health & Wellness",
    date: "Mar 10, 2026",
    readTime: "5 min read",
    excerpt:
      "Discover why moringa is called the miracle tree and how its powerful nutrients can transform your health and energy levels.",
    image: "/assets/generated/hero-moringa-leaves.dim_1920x1080.jpg",
  },
  {
    title: "How to Use Moringa Powder in Your Daily Diet",
    category: "Nutrition",
    date: "Mar 5, 2026",
    readTime: "4 min read",
    excerpt:
      "Simple and delicious ways to incorporate moringa powder into your meals, smoothies, and beverages for maximum health benefits.",
    image: "/assets/generated/moringa-powder-bowl.dim_800x800.jpg",
  },
  {
    title: "SEO in 2026: What Changed and How to Adapt",
    category: "Digital Marketing",
    date: "Feb 28, 2026",
    readTime: "7 min read",
    excerpt:
      "Google's latest algorithm updates have reshaped SEO. Learn the strategies that are delivering results in 2026.",
    image: "/assets/generated/moringa-farm.dim_1200x800.jpg",
  },
  {
    title: "Moringa vs. Spirulina: Which Superfood Wins?",
    category: "Health & Wellness",
    date: "Feb 20, 2026",
    readTime: "6 min read",
    excerpt:
      "A detailed nutritional comparison of two popular superfoods to help you choose what's best for your health goals.",
    image: "/assets/generated/moringa-powder-bowl.dim_800x800.jpg",
  },
  {
    title: "Social Media Marketing Strategy for Small Businesses",
    category: "Digital Marketing",
    date: "Feb 15, 2026",
    readTime: "8 min read",
    excerpt:
      "A practical guide to building a strong social media presence on a budget, with templates and tactics that actually work.",
    image: "/assets/generated/moringa-farm.dim_1200x800.jpg",
  },
  {
    title: "Organic Farming: The Future of Food in India",
    category: "Sustainability",
    date: "Feb 8, 2026",
    readTime: "5 min read",
    excerpt:
      "How organic farming practices in Maharashtra are changing the food industry and why consumers are embracing the shift.",
    image: "/assets/generated/hero-moringa-leaves.dim_1920x1080.jpg",
  },
];

const categories = [
  "All",
  "Health & Wellness",
  "Nutrition",
  "Digital Marketing",
  "Sustainability",
];

export default function Blog() {
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
            Insights &amp; Tips
          </span>
          <h1
            className="font-montserrat font-black text-white mb-4"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Our <span className="green-gradient-text">Blog</span>
          </h1>
          <p className="text-[#B7C0D6] text-lg leading-relaxed">
            Health tips, moringa recipes, and digital marketing insights to help
            you live better and grow faster.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                data-ocid="blog.tab"
                className="px-5 py-2 rounded-full text-sm font-medium border border-white/10 text-[#B7C0D6] hover:border-green-400/30 hover:text-green-400 transition-all"
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <article
                key={a.title}
                className="brand-card overflow-hidden reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="bg-green-400/10 text-green-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {a.category}
                  </span>
                  <h2 className="text-white font-bold text-base mt-3 mb-2 leading-snug">
                    {a.title}
                  </h2>
                  <p className="text-[#8B95AD] text-sm leading-relaxed mb-4 line-clamp-2">
                    {a.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[#8B95AD] text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {a.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {a.readTime}
                      </span>
                    </div>
                    <Link
                      to="/blog"
                      className="text-green-400 text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 text-center"
        style={{ background: "linear-gradient(135deg, #0D2B0F, #0F172A)" }}
      >
        <div className="max-w-2xl mx-auto px-4 reveal">
          <h2 className="section-title mb-4">Never Miss a Post</h2>
          <p className="section-subtitle mb-8">
            Subscribe to get the latest health tips and marketing insights
            directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              data-ocid="blog.input"
              className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-white text-sm placeholder:text-[#8B95AD] focus:outline-none focus:border-green-400/40 transition-colors"
            />
            <button
              type="submit"
              className="btn-green px-6 py-3 text-sm whitespace-nowrap"
              data-ocid="blog.submit_button"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
