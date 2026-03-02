import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart, readCart, removeFromCart } from "../utils/cart";

const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(Number(amount || 0));

const CartPage = () => {
  const [items, setItems] = useState(() => readCart());

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === "lasglowtech_catalogue_cart") {
        setItems(readCart());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleRemove = (slug) => {
    removeFromCart(slug);
    setItems(readCart());
    toast.info("Item removed from cart.");
  };

  const handleClear = () => {
    clearCart();
    setItems([]);
    toast.info("Cart cleared.");
  };

  return (
    <div className="min-h-screen px-6 md:px-20 py-16 bg-gradient-to-b from-bgcolor2 via-bgcolor2 to-bgcolor text-textcolor2">
      <section className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm tracking-[0.2em] text-Secondarycolor uppercase">Your Cart</p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-2">Checkout Queue</h1>
            <p className="text-gray-400 mt-4 max-w-2xl">
              Select an item and proceed to checkout. If you are not signed in, you will be redirected to login or
              register first.
            </p>
          </div>
          {!!items.length && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 rounded-full border border-red-400 text-red-300 hover:bg-red-500/10 transition text-sm"
            >
              Clear Cart
            </button>
          )}
        </div>

        {!items.length && (
          <div className="mt-10 rounded-2xl border border-Primarycolor/30 bg-bgcolor p-8 text-center">
            <p className="text-gray-300">Your cart is empty.</p>
            <Link
              to="/catalogues"
              className="inline-block mt-5 px-5 py-2 rounded-full bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white transition text-sm"
            >
              Browse Catalogues
            </Link>
          </div>
        )}

        {!!items.length && (
          <div className="mt-10 space-y-4">
            {items.map((item) => (
              <article
                key={item.slug}
                className="rounded-2xl border border-Primarycolor/30 bg-bgcolor p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-24 w-full md:w-40 rounded-lg object-cover border border-Primarycolor/30"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-400 mt-1">{item.summary || "No summary available."}</p>
                  <p className="text-sm text-gray-400 mt-2">Payment: {item.paymentType || "full"}</p>
                  <p className="text-lg font-semibold text-Secondarycolor mt-1">{formatNaira(item.price)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleRemove(item.slug)}
                    className="px-4 py-2 rounded-full border border-red-400 text-red-300 hover:bg-red-500/10 transition text-sm"
                  >
                    Remove
                  </button>
                  {item.isPaymentEnabled ? (
                    <Link
                      to={`/checkout/${item.slug}`}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white transition text-sm"
                    >
                      Checkout
                    </Link>
                  ) : (
                    <Link
                      to={`/contact?service=${item.slug}`}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white transition text-sm"
                    >
                      Contact
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CartPage;
