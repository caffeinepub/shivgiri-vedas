import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubscribeNewsletter } from "../hooks/useQueries";

export default function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribeNewsletter();
  const year = new Date().getFullYear();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribe.mutateAsync(email);
      toast.success("Subscribed successfully! 🌿");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    }
  };

  return (
    <footer
      style={{ background: "#0B1220" }}
      className="border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-montserrat font-bold text-white text-lg">
                Shivgiri <span className="green-gradient-text">Vedas</span>
              </span>
            </div>
            <p className="text-[#8B95AD] text-sm leading-relaxed mb-5">
              Premium Organic Moringa Powder & Digital Marketing Agency. Rooted
              in nature, driven by results.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#8B95AD] hover:text-green-400 hover:border-green-400/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/products", label: "Moringa Products" },
                { to: "/portfolio", label: "Portfolio" },
                { to: "/blog", label: "Blog" },
                { to: "/pricing", label: "Pricing" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#8B95AD] text-sm hover:text-green-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-400/0 group-hover:bg-green-400 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "SEO Optimization",
                "Social Media Marketing",
                "Google Ads",
                "Website Development",
                "Branding",
                "Content Marketing",
              ].map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    className="text-[#8B95AD] text-sm hover:text-green-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-400/0 group-hover:bg-green-400 transition-all" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-[#8B95AD] text-sm">
                <Mail className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <a
                  href="mailto:shivgiriherbal@gmail.com"
                  className="hover:text-green-400 transition-colors break-all"
                >
                  shivgiriherbal@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#8B95AD] text-sm">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <a
                  href="tel:+919423376241"
                  className="hover:text-green-400 transition-colors"
                >
                  +91 9423376241
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#8B95AD] text-sm">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span>Solapur, Maharashtra, India</span>
              </li>
            </ul>
            <h4 className="text-white font-semibold mb-3 text-sm">
              Newsletter
            </h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                data-ocid="footer.input"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-[#8B95AD] focus:outline-none focus:border-green-400/40 transition-colors"
                required
              />
              <button
                type="submit"
                data-ocid="footer.submit_button"
                disabled={subscribe.isPending}
                className="btn-green px-3 py-2 shrink-0"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#8B95AD] text-xs">
            © {year} Shivgiri Vedas. All rights reserved.
          </p>
          <p className="text-[#8B95AD] text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
