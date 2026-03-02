import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../config/axios.config";
import { getAdminToken } from "../../utils/adminAuth";

const defaultForm = {
  id: null,
  title: "",
  summary: "",
  description: "",
  imageUrl: "",
  price: "",
  packageTier: "standard",
  isPopular: false,
  featuresText: "",
  paymentType: "full",
  currency: "NGN",
  isPaymentEnabled: true,
  isPublished: true,
  sortOrder: 0,
};

const premiumPackageTemplates = [
  {
    key: "ecommerce-premium",
    label: "Premium Ecommerce Website",
    title: "Premium Ecommerce Website",
    summary: "Conversion-focused online store with seamless checkout and product management.",
    description:
      "Includes UI/UX design, product/catalog setup, payment gateway integration, order flow, responsive storefront, performance optimization, and analytics setup.",
    price: 450000,
    packageTier: "premium",
    paymentType: "deposit",
    currency: "NGN",
    isPaymentEnabled: true,
    isPublished: true,
    features: [
      "Custom homepage and product pages",
      "Payment gateway integration",
      "Cart and checkout optimization",
      "Order/admin management setup",
      "Mobile-first responsive design",
    ],
  },
  {
    key: "portfolio-pro",
    label: "Professional Portfolio Website",
    title: "Professional Portfolio Website",
    summary: "Modern portfolio website for creators, founders, and agencies.",
    description:
      "Includes custom layout, project showcase pages, contact integration, social links, mobile optimization, and SEO-ready structure.",
    price: 180000,
    packageTier: "standard",
    paymentType: "full",
    currency: "NGN",
    isPaymentEnabled: true,
    isPublished: true,
    features: [
      "Project/case study pages",
      "SEO-ready structure",
      "Contact and social links",
      "Mobile responsive design",
    ],
  },
  {
    key: "landing-page-growth",
    label: "Landing Page (Growth Package)",
    title: "Landing Page (Growth Package)",
    summary: "High-converting landing page for campaigns and product launches.",
    description:
      "Includes strategic copy layout, conversion-focused sections, CTA flows, responsive build, speed optimization, and lead form integration.",
    price: 120000,
    packageTier: "starter",
    paymentType: "full",
    currency: "NGN",
    isPaymentEnabled: true,
    isPublished: true,
    features: [
      "Conversion-oriented section flow",
      "Lead form integration",
      "Fast-loading implementation",
      "Analytics-ready setup",
    ],
  },
  {
    key: "branding-suite",
    label: "Branding Suite",
    title: "Branding Suite",
    summary: "Complete visual identity package for modern businesses.",
    description:
      "Includes logo system, color palette, typography style guide, social media branding assets, and brand usage guide.",
    price: 150000,
    packageTier: "standard",
    paymentType: "full",
    currency: "NGN",
    isPaymentEnabled: true,
    isPublished: true,
    features: [
      "Logo and visual identity",
      "Color and typography guide",
      "Social media brand assets",
      "Brand usage guide",
    ],
  },
  {
    key: "uiux-premium",
    label: "UI/UX Design Premium",
    title: "UI/UX Design Premium",
    summary: "Research-backed product design for web and mobile applications.",
    description:
      "Includes user flow mapping, wireframes, high-fidelity screens, design system components, and developer handoff documentation.",
    price: 220000,
    packageTier: "premium",
    paymentType: "deposit",
    currency: "NGN",
    isPaymentEnabled: true,
    isPublished: true,
    features: [
      "User flow and wireframes",
      "High-fidelity UI screens",
      "Component design system",
      "Developer handoff files",
    ],
  },
];

const CATEGORY_OPTIONS = [
  { value: "", label: "All categories" },
  { value: "starter", label: "Starter" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
];

const CataloguesAdmin = () => {
  const [form, setForm] = useState(defaultForm);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const authHeader = useMemo(() => {
    const token = getAdminToken();
    return { Authorization: `Bearer ${token}` };
  }, []);

  const fetchCatalogues = async () => {
    setLoading(true);
    try {
      const res = await instance.get("/catalogues/admin/all", { headers: authHeader });
      setItems(res.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load catalogues.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogues();
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.imageUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await instance.post("/upload/images", formData);
        const filename = uploadRes.data;
        imageUrl = `${instance.defaults.baseURL}/uploads/images/${filename}`;
      }

      const payload = {
        ...form,
        features: form.featuresText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        imageUrl,
      };

      if (form.id) {
        await instance.put(`/catalogues/admin/${form.id}`, payload, { headers: authHeader });
        toast.success("Catalogue updated.");
      } else {
        await instance.post("/catalogues/admin", payload, { headers: authHeader });
        toast.success("Catalogue created.");
      }
      setForm(defaultForm);
      setSelectedTemplate("");
      setImageFile(null);
      setImagePreview("");
      fetchCatalogues();
    } catch (error) {
      toast.error(error.response?.data?.error || "Unable to save catalogue.");
    }
  };

  const applyTemplate = (templateKey) => {
    const template = premiumPackageTemplates.find((item) => item.key === templateKey);
    if (!template) return;

    setForm((prev) => ({
      ...prev,
      title: template.title,
      summary: template.summary,
      description: template.description,
      price: template.price,
      packageTier: template.packageTier || "standard",
      isPopular: template.packageTier === "premium",
      featuresText: Array.isArray(template.features) ? template.features.join("\n") : "",
      paymentType: template.paymentType,
      currency: template.currency,
      isPaymentEnabled: template.isPaymentEnabled,
      isPublished: template.isPublished,
    }));
    toast.success(`${template.label} template applied.`);
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      title: item.title || "",
      summary: item.summary || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      price: item.price || "",
      packageTier: item.packageTier || "standard",
      isPopular: Boolean(item.isPopular),
      featuresText: Array.isArray(item.features) ? item.features.join("\n") : "",
      paymentType: item.paymentType || "full",
      currency: item.currency || "NGN",
      isPaymentEnabled: Boolean(item.isPaymentEnabled),
      isPublished: Boolean(item.isPublished),
      sortOrder: item.sortOrder || 0,
    });
    setImageFile(null);
    setImagePreview(item.imageUrl || "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this catalogue?")) return;
    try {
      await instance.delete(`/catalogues/admin/${id}`, { headers: authHeader });
      toast.success("Catalogue deleted.");
      fetchCatalogues();
    } catch (error) {
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h2 className="text-xl font-semibold text-textcolor2">Catalogue manager</h2>
          <p className="text-sm text-gray-500 mt-0.5">Create and publish service cards for the marketplace.</p>
        </div>
        <div className="p-6">
        <div className="mb-6 rounded-xl border border-Primarycolor/20 bg-bgcolor/50 p-4">
          <p className="text-sm text-gray-300 mb-2">Quick package templates</p>
          <div className="flex flex-col md:flex-row gap-3">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="p-3 rounded-md bg-[#f6f5fa] text-black md:min-w-[320px]"
            >
              <option value="">Select a package template</option>
              {premiumPackageTemplates.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => applyTemplate(selectedTemplate)}
              disabled={!selectedTemplate}
              className="px-5 py-3 rounded-md border border-Primarycolor/50 text-textcolor2 hover:bg-Primarycolor transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply Template
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Template fills title, summary, description, price, and payment settings. You can edit before saving.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Service title"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
            required
          />
          <input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Summary (one line)"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
            required
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price in NGN (e.g 85000)"
            type="number"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <select
            name="packageTier"
            value={form.packageTier}
            onChange={handleChange}
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          >
            <option value="starter">Starter tier</option>
            <option value="standard">Standard tier</option>
            <option value="premium">Premium tier</option>
          </select>
          <input
            name="sortOrder"
            value={form.sortOrder}
            onChange={handleChange}
            type="number"
            placeholder="Sort order"
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <select
            name="paymentType"
            value={form.paymentType}
            onChange={handleChange}
            className="p-3 rounded-md bg-[#f6f5fa] text-black"
          >
            <option value="full">Full payment</option>
            <option value="deposit">Deposit</option>
          </select>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-300 mb-2">Catalogue image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImageFile(file);
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full p-3 rounded-md bg-[#f6f5fa] text-black"
            />
            {(imagePreview || form.imageUrl) && (
              <img
                src={imagePreview || form.imageUrl}
                alt="Catalogue preview"
                className="mt-3 w-full max-w-xs h-36 object-cover rounded-md border border-Primarycolor/30"
              />
            )}
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Long description"
            rows={4}
            className="md:col-span-2 p-3 rounded-md bg-[#f6f5fa] text-black"
          />
          <textarea
            name="featuresText"
            value={form.featuresText}
            onChange={handleChange}
            placeholder={"Feature list (one per line)\nCustom homepage\nSEO setup\nPayment integration"}
            rows={4}
            className="md:col-span-2 p-3 rounded-md bg-[#f6f5fa] text-black"
          />

          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" name="isPaymentEnabled" checked={form.isPaymentEnabled} onChange={handleChange} />
            Payment enabled
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange} />
            Most Popular
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} />
            Published
          </label>

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white font-semibold"
            >
              {form.id ? "Update Catalogue" : "Create Catalogue"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={() => {
                  setForm(defaultForm);
                  setSelectedTemplate("");
                  setImageFile(null);
                  setImagePreview("");
                }}
                className="px-6 py-3 rounded-md border border-white/20 text-gray-200"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
        </div>
      </section>

      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h3 className="text-xl font-semibold text-textcolor2">Catalogue items</h3>
          <p className="text-sm text-gray-500 mt-0.5">Search and filter your service packages.</p>
        </div>
        <div className="p-6">
          {!loading && items.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, summary, or description…"
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-Primarycolor/25 bg-bgcolor/50 text-textcolor2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" aria-hidden>
                  ⌕
                </span>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-Primarycolor/25 bg-bgcolor/50 text-textcolor2 focus:outline-none focus:ring-2 focus:ring-Primarycolor/50 text-sm min-w-[180px]"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value || "all"} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {loading && <p className="text-gray-400 py-8 text-center">Loading…</p>}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 overflow-hidden hover:border-Primarycolor/40 transition-colors flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-bgcolor2 overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        No image
                      </div>
                    )}
                    <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-Primarycolor/90 text-white text-xs font-medium capitalize">
                        {item.packageTier || "standard"}
                      </span>
                      {item.isPopular && (
                        <span className="px-2 py-0.5 rounded-md bg-Secondarycolor text-white text-xs font-medium">
                          Popular
                        </span>
                      )}
                      {item.isPublished ? (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-xs">Published</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-gray-600/90 text-white text-xs">Draft</span>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h4 className="font-semibold text-textcolor2 text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.summary}</p>
                    <p className="text-sm font-medium text-Secondarycolor mt-2">
                      NGN {Number(item.price || 0).toLocaleString()}
                      <span className="text-gray-500 font-normal text-xs ml-1">· {item.paymentType}</span>
                    </p>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-Primarycolor/20">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="flex-1 py-2 rounded-lg border border-Primarycolor/40 text-textcolor2 text-sm font-medium hover:bg-Primarycolor/20 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="py-2 px-4 rounded-lg border border-red-400/50 text-red-300 text-sm font-medium hover:bg-red-500/10 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
          {!loading && !filteredItems.length && (
            <p className="text-gray-400 text-center py-12">
              {items.length ? "No items match your search or filter." : "No catalogue items yet."}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CataloguesAdmin;
