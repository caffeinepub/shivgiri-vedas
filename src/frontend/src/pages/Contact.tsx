import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitContact } from "../hooks/useQueries";
import { useReveal } from "../hooks/useReveal";

export default function Contact() {
  useReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    service: "",
  });
  const submit = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submit.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: `[${form.service || "General"}] ${form.message}`,
      });
      toast.success("✅ Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", message: "", service: "" });
    } catch {
      toast.error("Failed to send. Please try again or call us directly.");
    }
  };

  const update =
    (field: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#8B95AD] focus:outline-none focus:border-green-400/40 transition-colors";

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
            Let&apos;s Connect
          </span>
          <h1
            className="font-montserrat font-black text-white mb-4"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Get In <span className="green-gradient-text">Touch</span>
          </h1>
          <p className="text-[#B7C0D6] text-lg leading-relaxed">
            We&apos;d love to hear from you. Whether it&apos;s about our moringa
            products or digital marketing services.
          </p>
        </div>
      </section>

      <section className="py-16" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="space-y-5 reveal">
              <h2 className="text-white font-bold text-2xl mb-6">
                Contact Information
              </h2>
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "shivgiriherbal@gmail.com",
                  href: "mailto:shivgiriherbal@gmail.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91 9423376241",
                  href: "tel:+919423376241",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "Solapur, Maharashtra, India",
                  href: null as string | null,
                },
                {
                  icon: Clock,
                  label: "Business Hours",
                  value: "Mon–Sat: 9AM – 7PM IST",
                  href: null as string | null,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="brand-card p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-400/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[#8B95AD] text-xs mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-white font-medium text-sm hover:text-green-400 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-white font-medium text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
              <div
                className="rounded-2xl overflow-hidden border border-white/10"
                style={{ height: "220px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120961.99494893928!2d75.8090697!3d17.6855813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5db3a6b3f0555%3A0x1a5e82498bbb8c1a!2sSolapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Shivgiri Vedas Location - Solapur"
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="lg:col-span-2 brand-card p-8 reveal"
            >
              <h2 className="text-white font-bold text-2xl mb-6">
                Send Us a Message
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="cp-name"
                    className="text-[#B7C0D6] text-sm block mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="cp-name"
                    type="text"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    className={inputClass}
                    data-ocid="contact.input"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cp-email"
                    className="text-[#B7C0D6] text-sm block mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="cp-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="your@email.com"
                    className={inputClass}
                    data-ocid="contact.input"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cp-phone"
                    className="text-[#B7C0D6] text-sm block mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="cp-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="+91 XXXXX XXXXX"
                    className={inputClass}
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cp-service"
                    className="text-[#B7C0D6] text-sm block mb-1.5"
                  >
                    Interested In
                  </label>
                  <select
                    id="cp-service"
                    value={form.service}
                    onChange={update("service")}
                    className={inputClass}
                    data-ocid="contact.select"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <option value="" style={{ background: "#111B2D" }}>
                      Select a service
                    </option>
                    <option
                      value="Moringa Products"
                      style={{ background: "#111B2D" }}
                    >
                      Moringa Products
                    </option>
                    <option value="SEO" style={{ background: "#111B2D" }}>
                      SEO Optimization
                    </option>
                    <option
                      value="Social Media"
                      style={{ background: "#111B2D" }}
                    >
                      Social Media Marketing
                    </option>
                    <option
                      value="Google Ads"
                      style={{ background: "#111B2D" }}
                    >
                      Google Ads
                    </option>
                    <option value="Website" style={{ background: "#111B2D" }}>
                      Website Development
                    </option>
                    <option value="Branding" style={{ background: "#111B2D" }}>
                      Branding
                    </option>
                    <option value="Other" style={{ background: "#111B2D" }}>
                      Other
                    </option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="cp-message"
                  className="text-[#B7C0D6] text-sm block mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="cp-message"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us about your project or question..."
                  rows={6}
                  className={`${inputClass} resize-none`}
                  data-ocid="contact.textarea"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submit.isPending}
                data-ocid="contact.submit_button"
                className="btn-green w-full py-4 text-base flex items-center justify-center gap-2"
              >
                {submit.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
              {submit.isSuccess && (
                <div
                  className="mt-4 p-3 bg-green-400/10 border border-green-400/20 rounded-xl text-green-400 text-sm text-center"
                  data-ocid="contact.success_state"
                >
                  ✅ Message sent successfully! We&apos;ll respond within 24
                  hours.
                </div>
              )}
              {submit.isError && (
                <div
                  className="mt-4 p-3 bg-red-400/10 border border-red-400/20 rounded-xl text-red-400 text-sm text-center"
                  data-ocid="contact.error_state"
                >
                  Failed to send. Please email us directly at
                  shivgiriherbal@gmail.com
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
