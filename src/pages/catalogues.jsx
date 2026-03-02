import { useEffect, useMemo, useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config/axios.config";
import { addToCart, readCart, removeFromCart } from "../utils/cart";
import SEO from "../utils/seo";

const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(Number(amount || 0));

const catalogueFallbacks = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200",
  "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1200",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
  "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=1200",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200",
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
    <div className="min-h-screen px-6 md:px-20 py-16 bg-gradient-to-b from-bgcolor2 via-bgcolor2 to-bgcolor text-textcolor2">
      <SEO
        title="Service Catalogue | Buy Digital Services Online with Instant Checkout | Lasglowtech"
        description="Browse Lasglowtech service packages—web, mobile, design—and checkout instantly online. Fixed-price packages, secure payment, no lengthy quotes. Nigeria's digital service catalogue."
        keywords="Lasglowtech catalogue, buy services online Nigeria, instant checkout, service packages, web development package, digital agency Nigeria"
        url="https://www.lasglowtech.com.ng/catalogues"
      />
      <section className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-sm tracking-[0.2em] text-Secondarycolor uppercase">Client Marketplace</p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-2">Service Catalogues</h1>
            <p className="text-gray-400 mt-4">
              Pick a package, pay online, and get started. <strong className="text-gray-300">Instant checkout</strong>—no lengthy quotes. Browse options, open any item for details, then Buy Now or Add to Cart.
            </p>
          </div>
          <Link
            to="/cart"
            className="inline-flex items-center gap-3 rounded-full border border-Primarycolor/40 px-5 py-3 hover:bg-Primarycolor/20 transition"
            aria-label="Open cart"
          >
            <span className="relative">
              <FaShoppingCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-3 -right-3 h-5 min-w-[20px] px-1 rounded-full bg-Secondarycolor text-bgcolor2 text-xs font-semibold flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </span>
            <span className="text-sm font-medium">Cart</span>
          </Link>
        </div>
      </section>

      {loading && <p className="text-center text-gray-300">Loading catalogues...</p>}

      {!loading && (
        <div className="max-w-7xl mx-auto">
          {items.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by title, summary, or description…"
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 focus:border-transparent"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" aria-hidden>
                  ⌕
                </span>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-3 rounded-xl border border-Primarycolor/30 bg-bgcolor/80 text-textcolor2 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 min-w-[200px]"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value || "all"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
                className={`rounded-2xl overflow-hidden border bg-bgcolor shadow-lg transition-all duration-300 ${
                  item.isPopular
                    ? "border-Secondarycolor/60 shadow-Secondarycolor/20"
                    : "border-Primarycolor/30 hover:shadow-Primarycolor/30"
                }`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={cardImage(item, (currentPage - 1) * PAGE_SIZE + index)}
                    alt={item.title}
                    className="w-full h-full object-cover scale-105 hover:scale-110 transition duration-500"
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

                <div className="p-5">
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.summary?.slice(0, 105)}
                    {item.summary?.length > 105 ? "..." : ""}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed mt-2">
                    {item.description?.slice(0, 110)}
                    {item.description?.length > 110 ? "..." : ""}
                  </p>
                  {!!item.features?.length && (
                    <ul className="mt-3 space-y-1">
                      {item.features.slice(0, 2).map((feature) => (
                        <li key={feature} className="text-xs text-gray-300">
                          - {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.isPaymentEnabled ? (
                    <div className="mt-4 p-3 rounded-lg border border-Secondarycolor/40 bg-Secondarycolor/10">
                      <p className="text-sm text-gray-300">
                        {item.paymentType === "deposit" ? "Deposit" : "Full payment"}:
                      </p>
                      <p className="text-xl font-semibold text-Secondarycolor">{formatNaira(item.price)}</p>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 rounded-lg border border-Primarycolor/25 bg-bgcolor2/50">
                      <p className="text-sm text-gray-300">Quote-based service. Consultation required.</p>
                    </div>
                  )}

                  <div className="mt-5">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-full border border-Primarycolor/60 text-Primarycolor hover:bg-Primarycolor hover:text-white transition text-sm"
                    >
                      View Options
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {!filteredItems.length && (
              <p className="text-gray-300 text-center col-span-full py-12">
                {items.length ? "No items match your search or filter." : "No catalogue items yet."}
              </p>
            )}
          </div>

          {filteredItems.length > PAGE_SIZE && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md border border-Primarycolor/40 text-sm disabled:opacity-50 hover:bg-Primarycolor/20"
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
                    className={`min-w-[36px] px-3 py-2 rounded-md text-sm border transition ${
                      active
                        ? "border-Secondarycolor bg-Secondarycolor/20 text-Secondarycolor"
                        : "border-Primarycolor/40 hover:bg-Primarycolor/20"
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
                className="px-3 py-2 rounded-md border border-Primarycolor/40 text-sm disabled:opacity-50 hover:bg-Primarycolor/20"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={closeDetails}
          role="presentation"
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-Primarycolor/40 bg-bgcolor2 p-6"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedItem.title} options`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">{selectedItem.title}</h2>
                <p className="text-sm text-gray-400 mt-2">{selectedItem.summary || "No summary available."}</p>
              </div>
              <button
                type="button"
                onClick={closeDetails}
                className="text-gray-300 hover:text-white"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mt-5 border border-Primarycolor/30 rounded-lg p-4">
              <p className="text-sm text-gray-400">Price</p>
              <p className="text-xl font-semibold text-Secondarycolor">{formatNaira(selectedItem.price)}</p>
              <p className="text-sm text-gray-400 mt-1">Payment: {selectedItem.paymentType || "full"}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {selectedItem.isPaymentEnabled ? (
                <Link
                  to={`/checkout/${selectedItem.slug}`}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white transition text-sm"
                  onClick={closeDetails}
                >
                  Buy Now
                </Link>
              ) : (
                <Link
                  to={`/contact?service=${selectedItem.slug}`}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white transition text-sm"
                  onClick={closeDetails}
                >
                  Ask for Quote
                </Link>
              )}

              {cartSlugSet.has(selectedItem.slug) ? (
                <button
                  type="button"
                  onClick={() => handleRemoveFromCart(selectedItem.slug)}
                  className="px-4 py-2 rounded-full border border-red-400 text-red-300 hover:bg-red-500/10 transition text-sm"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleAddToCart(selectedItem, items.findIndex((item) => item.slug === selectedItem.slug))
                  }
                  className="px-4 py-2 rounded-full border border-Primarycolor text-Primarycolor hover:bg-Primarycolor hover:text-white transition text-sm"
                >
                  Add to Cart
                </button>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-4">
              If you are not signed in, checkout will first redirect you to login or register before payment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogues;
