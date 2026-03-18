import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Leaf, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { usePlaceOrder } from "../hooks/useQueries";
import { useReveal } from "../hooks/useReveal";

const products = [
  {
    name: "Shivgiri Vedas",
    price: "₹299",
    priceNum: 299,
    originalPrice: "₹399",
    size: "100g",
    image: "/assets/generated/moringa-powder-bowl.dim_600x600.jpg",
    rating: 4.9,
    reviews: 124,
    popular: false,
  },
  {
    name: "Shivgiri Vedas",
    price: "₹649",
    priceNum: 649,
    originalPrice: "₹849",
    size: "250g",
    image: "/assets/generated/moringa-product-package.dim_600x600.jpg",
    rating: 4.9,
    reviews: 256,
    popular: true,
  },
  {
    name: "Shivgiri Vedas",
    price: "₹999",
    priceNum: 999,
    originalPrice: "₹1,199",
    size: "500g",
    image: "/assets/generated/moringa-powder-bowl.dim_600x600.jpg",
    rating: 4.8,
    reviews: 89,
    popular: false,
  },
];

const benefits = [
  {
    emoji: "💊",
    title: "46 Antioxidants",
    desc: "More than any other plant food",
  },
  { emoji: "🦴", title: "4x Calcium", desc: "More calcium than milk" },
  { emoji: "🍊", title: "7x Vitamin C", desc: "More than oranges" },
  {
    emoji: "🥩",
    title: "9 Essential Amino Acids",
    desc: "Complete protein source",
  },
  { emoji: "⚡", title: "3x Iron", desc: "More than spinach" },
  { emoji: "🧠", title: "Rich in B Vitamins", desc: "Supports brain health" },
];

type Product = (typeof products)[number];

function OrderModal({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
    quantity: 1,
  });
  const [success, setSuccess] = useState(false);
  const placeOrder = usePlaceOrder();

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    try {
      await placeOrder.mutateAsync({
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        customerEmail: form.customerEmail,
        customerAddress: form.customerAddress,
        productName: product.name,
        productSize: product.size,
        productPrice: product.priceNum,
        quantity: BigInt(form.quantity),
      });
      setSuccess(true);
    } catch {
      toast.error("Order failed. Please try again.");
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setForm({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      quantity: 1,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-md"
        style={{
          background: "#0F172A",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
        }}
        data-ocid="order.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            {success ? "🎉 Order Placed!" : "Place Your Order"}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="py-6 text-center" data-ocid="order.success_state">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-green-400 text-lg font-semibold mb-2">
              Thank you for your order!
            </p>
            <p className="text-[#B7C0D6] text-sm mb-6">
              We will contact you shortly on your phone number to confirm
              delivery details.
            </p>
            <Button
              onClick={handleClose}
              className="btn-green w-full"
              data-ocid="order.close_button"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {product && (
              <div
                className="brand-card p-4 flex items-center gap-3"
                style={{
                  background: "rgba(46,125,50,0.15)",
                  border: "1px solid rgba(102,187,106,0.2)",
                }}
              >
                <div>
                  <p className="text-white font-semibold text-sm">
                    {product.name} — {product.size}
                  </p>
                  <p className="green-gradient-text font-bold text-lg">
                    {product.price}
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <Label className="text-[#B7C0D6] text-xs">Full Name *</Label>
              <Input
                required
                value={form.customerName}
                onChange={(e) => handleChange("customerName", e.target.value)}
                placeholder="Your full name"
                className="bg-white/5 border-white/10 text-white placeholder:text-[#8B95AD]"
                data-ocid="order.input"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[#B7C0D6] text-xs">Phone Number *</Label>
              <Input
                required
                value={form.customerPhone}
                onChange={(e) => handleChange("customerPhone", e.target.value)}
                placeholder="Your phone number"
                className="bg-white/5 border-white/10 text-white placeholder:text-[#8B95AD]"
                data-ocid="order.input"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[#B7C0D6] text-xs">Email *</Label>
              <Input
                required
                type="email"
                value={form.customerEmail}
                onChange={(e) => handleChange("customerEmail", e.target.value)}
                placeholder="your@email.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-[#8B95AD]"
                data-ocid="order.input"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[#B7C0D6] text-xs">
                Delivery Address *
              </Label>
              <Textarea
                required
                value={form.customerAddress}
                onChange={(e) =>
                  handleChange("customerAddress", e.target.value)
                }
                placeholder="Full delivery address"
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-[#8B95AD] resize-none"
                data-ocid="order.textarea"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[#B7C0D6] text-xs">Quantity</Label>
              <Input
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) =>
                  handleChange("quantity", Number(e.target.value))
                }
                className="bg-white/5 border-white/10 text-white"
                data-ocid="order.input"
              />
            </div>

            <Button
              type="submit"
              disabled={placeOrder.isPending}
              className="btn-green w-full py-3"
              data-ocid="order.submit_button"
            >
              {placeOrder.isPending ? "Placing Order..." : "Place Order"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Products() {
  useReveal();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBuyNow = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div style={{ background: "#0F172A" }}>
      <section
        className="relative pt-32 pb-20"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-moringa-leaves.dim_1200x700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <span className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Pure &amp; Natural
          </span>
          <h1
            className="font-montserrat font-black text-white mb-4"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Premium <span className="green-gradient-text">Moringa Powder</span>
          </h1>
          <p className="text-[#B7C0D6] text-lg leading-relaxed">
            100% organic, chemical-free moringa powder. Straight from our farms
            to your home.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <h2 className="section-title mb-4">Our Moringa Powder</h2>
            <p className="section-subtitle">
              Carefully processed to retain maximum nutrition. Lab-tested for
              purity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div
                key={`${p.name}-${p.size}`}
                className={`brand-card overflow-hidden reveal ${p.popular ? "ring-1 ring-green-400/40" : ""}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {p.popular && (
                  <div className="bg-gradient-to-r from-green-700 to-green-500 text-white text-xs font-bold text-center py-1.5 tracking-wide">
                    BEST SELLER
                  </div>
                )}
                <div className="overflow-hidden h-56 relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      background: "rgba(46,125,50,0.85)",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "999px",
                      letterSpacing: "0.04em",
                      backdropFilter: "blur(4px)",
                      zIndex: 10,
                    }}
                  >
                    Shivgiri Vedas
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={`star-${p.size}-${j}`}
                        className="w-3 h-3 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <span className="text-[#8B95AD] text-xs ml-1">
                      ({p.reviews})
                    </span>
                  </div>
                  <h3 className="text-white font-semibold mb-1">{p.name}</h3>
                  <p className="text-[#8B95AD] text-xs mb-3">
                    Net Weight: {p.size}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {["100% Natural", "No Chemicals", "Organic Certified"].map(
                      (f) => (
                        <li
                          key={f}
                          className="flex items-center gap-1.5 text-xs text-[#B7C0D6]"
                        >
                          <CheckCircle2 className="w-3 h-3 text-green-400" />{" "}
                          {f}
                        </li>
                      ),
                    )}
                  </ul>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold green-gradient-text">
                        {p.price}
                      </span>
                      <span className="text-[#8B95AD] text-xs line-through ml-2">
                        {p.originalPrice}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn-green px-4 py-2 text-xs flex items-center gap-1.5"
                      onClick={() => handleBuyNow(p)}
                      data-ocid={`products.item.${i + 1}`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0B1220" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <h2 className="section-title mb-4">Nutritional Powerhouse</h2>
            <p className="section-subtitle">
              Moringa is called the &apos;Miracle Tree&apos; for good reason.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="brand-card p-6 text-center reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="text-4xl mb-3">{b.emoji}</div>
                <h3 className="text-white font-bold mb-1">{b.title}</h3>
                <p className="text-[#8B95AD] text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: "#0F172A" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <h2 className="section-title mb-4">How to Use Moringa Powder</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "🥤",
                title: "Smoothies",
                desc: "Add 1 tsp to your morning smoothie for an energy boost.",
              },
              {
                icon: "☕",
                title: "Warm Water",
                desc: "Mix with warm water and honey as a health tonic.",
              },
              {
                icon: "🥗",
                title: "Salads",
                desc: "Sprinkle over salads for extra nutrition.",
              },
              {
                icon: "🍛",
                title: "Cooking",
                desc: "Add to soups, curries, and lentil dishes.",
              },
            ].map((u, i) => (
              <div
                key={u.title}
                className="brand-card p-5 text-center reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="text-3xl mb-3">{u.icon}</div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  {u.title}
                </h3>
                <p className="text-[#8B95AD] text-xs leading-relaxed">
                  {u.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #0D2B0F, #0F172A)" }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center reveal">
          <Leaf className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h2 className="section-title mb-4">Quality You Can Trust</h2>
          <p className="section-subtitle mb-8">
            Every batch of our moringa is lab-tested for heavy metals,
            pesticides, and microbiological contaminants before it reaches your
            hands.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "FSSAI Certified",
              "Lab Tested",
              "No Preservatives",
              "Non-GMO",
            ].map((c) => (
              <div
                key={c}
                className="brand-card px-5 py-3 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm font-medium">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrderModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
