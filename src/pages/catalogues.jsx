import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaTimes, FaBoxOpen, FaArrowRight, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config/axios.config";
import { addToCart, readCart, removeFromCart } from "../utils/cart";
import SEO from "../utils/seo";
import { LOGO } from "../components/images";

const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(Number(amount || 0));

const catalogueFallbacks = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600",
  "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=600",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
  "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=600",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600",
];

const cardImage = (item, index) => item.imageUrl || catalogueFallbacks[index % catalogueFallbacks.length];
const PAGE_SIZE = 9;

const CATEGORY_OPTIONS = [
  { value: "", label: "All categories" },
  { value: "starter", label: "Starter" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
];

const Catalogues = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => readCart());
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await instance.get("/catalogues");
        setItems(res.data || []);
      } catch (error) {
        toast.error("Unable to load catalogues.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === "lasglowtech_catalogue_cart") {
        setCartItems(readCart());
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const filteredItems = useMemo(() => {
    let list = items;
    const q = (searchQuery || "").toLowerCase().trim();
    if (q) {
      list = list.filter(
        (item) =>
          (item.title || "").toLowerCase().includes(q) ||
          (item.summary || "").toLowerCase().includes(q) ||
          (item.description || "").toLowerCase().includes(q)
      );
    }
    if (categoryFilter) {
      list = list.filter((item) => (item.packageTier || "standard") === categoryFilter);
    }
    return list;
  }, [items, searchQuery, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  const cartSlugSet = useMemo(() => new Set(cartItems.map((item) => item.slug)), [cartItems]);

  const buildCartItem = (item, index) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    price: item.price,
    paymentType: item.paymentType,
    isPaymentEnabled: Boolean(item.isPaymentEnabled),
    imageUrl: cardImage(item, index),
  });

  const openDetails = (item) => {
    setSelectedItem(item);
  };

  const closeDetails = () => {
    setSelectedItem(null);
  };

  const handleAddToCart = (item, index) => {
    const safeIndex = index < 0 ? 0 : index;
    addToCart(buildCartItem(item, safeIndex));
    setCartItems(readCart());
    toast.success("Added to cart.");
  };

  const handleRemoveFromCart = (slug) => {
    removeFromCart(slug);
    setCartItems(readCart());
    toast.info("Removed from cart.");
  };

  return (
    <div className="min-h-screen bg-bgcolor text-textcolor2">
      <SEO
        title="Service Catalogue | Buy Digital Services Online with Instant Checkout | Lasglowtech"
        description="Browse Lasglowtech service packages—web, mobile, design—and checkout instantly online. Fixed-price packages, secure payment, no lengthy quotes. Nigeria's digital service catalogue."
        keywords="Lasglowtech catalogue, buy services online Nigeria, instant checkout, service packages, web development package, digital agency Nigeria"
        url="https://www.lasglowtech.com.ng/catalogues"
      />

      {/* Catalogue nav bar – sticky, back to site + cart */}
      <header className="sticky top-0 z-50 border-b border-Primarycolor/20 bg-bgcolor2/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-textcolor2 hover:text-Secondarycolor transition-colors">
            <img src={LOGO} width={32} height={32} alt="Lasglowtech" className="rounded" />
            <span className="font-semibold text-sm">Lasglowtech</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-gray-400 hover:text-Secondarycolor flex items-center gap-1">
              <FaChevronLeft className="w-3.5 h-3.5" />
              Back to main site
            </Link>
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-sm text-textcolor2 hover:text-Secondarycolor transition-colors font-medium"
              aria-label="Open cart"
            >
              <span className="relative">
                <FaShoppingCart className="w-4 h-4" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-4 min-w-[18px] px-1 rounded-full bg-Secondarycolor text-white text-[0.7rem] font-semibold flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </span>
              Cart
            </Link>
          </div>
        </div>
      </header>

      {/* Hero – SoftVenix-style: tagline, “Grow Now With” + accent, description, two CTAs (no avatars) */}
      <section className="relative border-b border-Primarycolor/20 bg-bgcolor overflow-hidden py-16 sm:py-20 md:py-24 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase mb-6">
            Client Marketplace
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-textcolor2 tracking-tight leading-[1.1]">
            <span className="block">Instant Access to</span>
            <span className="block mt-1 text-Secondarycolor">Our Services</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Select the package that fits your needs, checkout in seconds, and watch your project take off. Simple, fast, and hassle-free.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#catalogue-grid"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-Secondarycolor text-white font-semibold hover:opacity-95 transition-opacity"
              >
                Explore Packages
                <FaArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-Secondarycolor/60 text-Secondarycolor font-semibold hover:bg-Secondarycolor/10 transition-colors"
              >
                <FaShoppingCart className="w-4 h-4" />
                View Cart
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main content – full width: search, filter, grid */}
      <div id="catalogue-grid" className="max-w-6xl mx-auto px-6 md:px-12 py-10 scroll-mt-4">
        {loading && <p className="text-center text-gray-400 text-sm py-8">Loading catalogues...</p>}

        {!loading && (
          <>
            {items.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search by title, summary, or description…"
                    className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-Primarycolor/25 bg-bgcolor/80 text-textcolor2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/40 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-sm" aria-hidden>
                    ⌕
                  </span>
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2.5 rounded-lg border border-Primarycolor/25 bg-bgcolor/80 text-textcolor2 text-sm focus:outline-none focus:ring-2 focus:ring-Primarycolor/40 min-w-[180px]"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value || "all"} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {pagedItems.map((item, index) => (
              <article
                key={item.id}
                onClick={() => openDetails(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openDetails(item);
                  }
                }}
                className={`rounded-xl overflow-hidden border bg-bgcolor/95 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                  item.isPopular
                    ? "border-Secondarycolor/50 shadow-Secondarycolor/10"
                    : "border-Primarycolor/25 hover:border-Primarycolor/40 hover:shadow-Primarycolor/10"
                }`}
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={cardImage(item, (currentPage - 1) * PAGE_SIZE + index)}
                    alt={item.title}
                    className="w-full h-full object-cover max-h-40 scale-[1.02] hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bgcolor via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-xs px-3 py-1 rounded-full bg-bgcolor2/80 border border-Primarycolor/40 text-textcolor2">
                    {item.packageTier || (index % 2 === 0 ? "Featured" : "Creative")}
                  </span>
                  {item.isPopular && (
                    <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-Secondarycolor/15 border border-Secondarycolor/40 text-Secondarycolor">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-[1rem] font-semibold mb-2 text-textcolor2">{item.title}</h2>
                  <p className="text-gray-400 text-[0.875rem] leading-relaxed">
                    {item.summary?.slice(0, 105)}
                    {item.summary?.length > 105 ? "..." : ""}
                  </p>
                  <p className="text-gray-500 text-[0.8125rem] leading-relaxed mt-1.5">
                    {item.description?.slice(0, 110)}
                    {item.description?.length > 110 ? "..." : ""}
                  </p>
                  {!!item.features?.length && (
                    <ul className="mt-2.5 space-y-0.5">
                      {item.features.slice(0, 2).map((feature) => (
                        <li key={feature} className="text-[0.8125rem] text-gray-400">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    {item.isPaymentEnabled ? (
                      <div className="p-2.5 rounded-lg border border-Secondarycolor/40 bg-Secondarycolor/10">
                        <p className="text-[0.8125rem] text-gray-400">
                          {item.paymentType === "deposit" ? "Deposit" : "Full payment"}:
                        </p>
                        <p className="text-[1rem] md:text-lg font-semibold text-Secondarycolor">{formatNaira(item.price)}</p>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-lg border border-Primarycolor/25 bg-bgcolor2/50">
                        <p className="text-[0.875rem] text-gray-400">Quote-based. Consultation required.</p>
                      </div>
                    )}
                    <button
                      type="button"
                      className="flex-shrink-0 px-3.5 py-2 rounded-full border border-Primarycolor/50 text-Primarycolor hover:bg-Primarycolor hover:text-white transition text-[0.875rem] font-medium"
                    >
                      View Options
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {!filteredItems.length && (
              <p className="text-gray-400 text-center col-span-full py-12 text-sm">
                {items.length ? "No items match your search or filter." : "No catalogue items yet."}
              </p>
            )}
            </div>

            {filteredItems.length > PAGE_SIZE && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-Primarycolor/30 text-sm disabled:opacity-50 hover:bg-Primarycolor/15 transition"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const page = idx + 1;
                  const active = page === currentPage;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[34px] px-2.5 py-2 rounded-lg text-sm border transition ${
                        active
                          ? "border-Secondarycolor bg-Secondarycolor/20 text-Secondarycolor font-semibold"
                          : "border-Primarycolor/30 hover:bg-Primarycolor/15"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-Primarycolor/30 text-sm disabled:opacity-50 hover:bg-Primarycolor/15 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={closeDetails}
          role="presentation"
        >
          <div
            className="w-full max-w-lg rounded-xl border border-Primarycolor/40 bg-bgcolor2 p-5"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedItem.title} options`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[1rem] md:text-lg font-semibold text-textcolor2">{selectedItem.title}</h2>
                <p className="text-[0.875rem] text-gray-400 mt-2">{selectedItem.summary || "No summary available."}</p>
              </div>
              <button
                type="button"
                onClick={closeDetails}
                className="text-gray-400 hover:text-white p-1"
                aria-label="Close"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 border border-Primarycolor/25 rounded-lg p-4">
              <p className="text-[0.875rem] text-gray-400">Price</p>
              <p className="text-lg font-semibold text-Secondarycolor mt-0.5">{formatNaira(selectedItem.price)}</p>
              <p className="text-[0.875rem] text-gray-400 mt-1">Payment: {selectedItem.paymentType || "full"}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedItem.isPaymentEnabled ? (
                <Link
                  to={`/checkout/${selectedItem.slug}`}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white transition text-[0.875rem] font-medium"
                  onClick={closeDetails}
                >
                  Buy Now
                </Link>
              ) : (
                <Link
                  to={`/contact?service=${selectedItem.slug}`}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white transition text-[0.875rem] font-medium"
                  onClick={closeDetails}
                >
                  Ask for Quote
                </Link>
              )}

              {cartSlugSet.has(selectedItem.slug) ? (
                <button
                  type="button"
                  onClick={() => handleRemoveFromCart(selectedItem.slug)}
                  className="px-4 py-2 rounded-full border border-red-400 text-red-300 hover:bg-red-500/10 transition text-[0.875rem]"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleAddToCart(selectedItem, items.findIndex((item) => item.slug === selectedItem.slug))
                  }
                  className="px-4 py-2 rounded-full border border-Primarycolor text-Primarycolor hover:bg-Primarycolor hover:text-white transition text-[0.875rem] font-medium"
                >
                  Add to Cart
                </button>
              )}
            </div>

            <p className="text-[0.8125rem] text-gray-500 mt-4">
              If you are not signed in, checkout will first redirect you to login or register before payment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogues;
