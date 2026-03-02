import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../config/axios.config";

const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(Number(amount || 0));

const previewFallbacks = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200",
  "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=1200",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200",
];

const cardImage = (item, index) => item.imageUrl || previewFallbacks[index % previewFallbacks.length];

const CataloguePreview = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await instance.get("/catalogues/preview");
        setItems(res.data || []);
      } catch (error) {
        setItems([]);
      }
    };
    load();
  }, []);

  return (
    <section className="px-6 md:px-20 py-20 bg-gradient-to-b from-bgcolor2 to-bgcolor">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-Secondarycolor">Marketplace</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-textcolor2 mt-2">Browse Premium Service Catalogues</h2>
            <p className="text-gray-400 max-w-2xl mt-3">
              Pick a service package, pay online, and get started fast. Our catalogue supports <strong className="text-gray-300">instant checkout</strong>—no lengthy quotes needed. You can also explore our <strong className="text-gray-300">tutoring and training</strong> programmes for your team or career growth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <Link key={item.id} to="/catalogues" className="block">
              <article
                className={`rounded-xl border overflow-hidden bg-bgcolor hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${
                  item.isPopular ? "border-Secondarycolor/60 shadow-Secondarycolor/20" : "border-Primarycolor/30 hover:shadow-Primarycolor/20"
                }`}
              >
                <img
                  src={cardImage(item, index)}
                  alt={item.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-Primarycolor/40 text-gray-300">
                      {item.packageTier || "standard"}
                    </span>
                    {item.isPopular && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-Secondarycolor/40 text-Secondarycolor">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-textcolor2">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-2">{item.summary}</p>
                  {!!item.features?.length && (
                    <ul className="mt-3 space-y-1">
                      {item.features.slice(0, 2).map((feature) => (
                        <li key={feature} className="text-xs text-gray-300">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.isPaymentEnabled && (
                    <p className="text-base font-semibold text-Secondarycolor mt-4">{formatNaira(item.price)}</p>
                  )}
                </div>
              </article>
            </Link>
          ))}
          {!items.length && (
            <div className="col-span-full rounded-xl border border-white/10 p-6 text-gray-400">
              Catalogue preview will appear after admin creates and publishes catalogue items.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CataloguePreview;
