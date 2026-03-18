import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Moringa Products" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional - only run when path changes
  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-blur ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            data-ocid="nav.link"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-montserrat font-bold text-lg text-white tracking-tight">
              Shivgiri <span className="green-gradient-text">Vedas</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPath === link.to
                    ? "text-green-400"
                    : "text-[#B7C0D6] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              data-ocid="nav.link"
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ml-1 ${
                currentPath === "/admin"
                  ? "text-green-400 bg-green-400/10"
                  : "text-[#8B95AD] hover:text-white hover:bg-white/5"
              }`}
            >
              Admin
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link to="/contact" data-ocid="nav.primary_button">
              <button type="button" className="btn-green px-5 py-2 text-sm">
                Get Free Consultation
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-[#B7C0D6] hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            data-ocid="nav.toggle"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="lg:hidden border-t border-white/5"
          style={{ background: "rgba(11,18,32,0.98)" }}
        >
          <nav
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="nav.link"
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPath === link.to
                    ? "text-green-400 bg-green-400/5"
                    : "text-[#B7C0D6] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              data-ocid="nav.link"
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                currentPath === "/admin"
                  ? "text-green-400 bg-green-400/5"
                  : "text-[#8B95AD] hover:text-white hover:bg-white/5"
              }`}
            >
              Admin
            </Link>
            <Link to="/contact" className="mt-3" data-ocid="nav.primary_button">
              <button type="button" className="btn-green w-full py-3 text-sm">
                Get Free Consultation
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
