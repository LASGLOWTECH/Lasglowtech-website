import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../config/axios.config";
import { getToken } from "../utils/auth";
import SEO from "../utils/seo";

const statusClass = {
  initiated: "text-gray-300 border-gray-300/40",
  pending: "text-yellow-300 border-yellow-300/40",
  paid: "text-green-300 border-green-300/40",
  failed: "text-red-300 border-red-300/40",
  cancelled: "text-orange-300 border-orange-300/40",
};

const MyOrders = () => {
  const token = useMemo(() => getToken(), []);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await instance.get("/payments/my/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data || []);
      } catch (e) {
        setError("Unable to load your orders right now.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  return (
    <div className="min-h-screen px-4 md:px-12 lg:px-20 py-10 md:py-12 bg-gradient-to-b from-bgcolor2 via-bgcolor2 to-bgcolor text-textcolor2">
      <SEO
        title="My Orders | Lasglowtech"
        description="Track your service orders and payment status."
        url="https://www.lasglowtech.com.ng/my/orders"
      />

      <section className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-textcolor2">My Orders</h1>
            <p className="text-[0.875rem] text-gray-400 mt-1.5">Track your service payments and order progress.</p>
          </div>
          <Link
            to="/catalogues"
            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white text-[0.875rem] font-medium transition"
          >
            Browse Catalogues
          </Link>
        </div>

        <div className="rounded-xl border border-Primarycolor/25 bg-bgcolor/95 shadow-sm overflow-hidden">
          <div className="p-4 md:p-5">
            {loading && <p className="text-gray-400 text-[0.875rem]">Loading orders...</p>}
            {!loading && error && <p className="text-red-300 text-[0.875rem]">{error}</p>}

            {!loading && !error && (
              <>
                <div className="hidden md:block overflow-x-auto -mx-1">
                  <table className="w-full text-[0.875rem]">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-Primarycolor/20">
                        <th className="py-3 pr-4 font-semibold">Date</th>
                        <th className="py-3 pr-4 font-semibold">Service</th>
                        <th className="py-3 pr-4 font-semibold">Amount</th>
                        <th className="py-3 pr-4 font-semibold">Type</th>
                        <th className="py-3 pr-4 font-semibold">Status</th>
                        <th className="py-3 pr-4 font-semibold">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((item) => (
                        <tr key={item.id} className="border-b border-Primarycolor/10 hover:bg-Primarycolor/5 transition">
                          <td className="py-3 pr-4 text-gray-300">{new Date(item.created_at).toLocaleDateString()}</td>
                          <td className="py-3 pr-4 font-medium text-textcolor2">{item.service_name}</td>
                          <td className="py-3 pr-4 text-gray-300">
                            {item.currency} {Number(item.amount || 0).toLocaleString()}
                          </td>
                          <td className="py-3 pr-4 text-gray-400 uppercase text-[0.8125rem]">{item.payment_type}</td>
                          <td className="py-3 pr-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full border text-[0.8125rem] uppercase font-medium ${
                                statusClass[item.status] || "text-gray-300 border-gray-300/40"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-gray-400 text-[0.8125rem] font-mono break-all max-w-[140px]">{item.tx_ref}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="md:hidden space-y-3">
                  {orders.map((item) => (
                    <article key={item.id} className="rounded-lg border border-Primarycolor/20 bg-bgcolor2/30 p-4">
                      <p className="text-[0.8125rem] text-gray-400">{new Date(item.created_at).toLocaleDateString()}</p>
                      <p className="mt-1.5 text-[1rem] font-semibold text-textcolor2">{item.service_name}</p>
                      <p className="mt-1 text-[0.875rem] text-gray-300">
                        {item.currency} {Number(item.amount || 0).toLocaleString()}
                      </p>
                      <div className="mt-3 flex gap-2 flex-wrap">
                        <span className="px-2 py-1 rounded-md border border-Primarycolor/30 text-[0.8125rem] uppercase text-gray-400">
                          {item.payment_type}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-md border text-[0.8125rem] uppercase font-medium ${
                            statusClass[item.status] || "text-gray-300 border-gray-300/40"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-[0.75rem] text-gray-500 break-all font-mono" title={item.tx_ref}>{item.tx_ref}</p>
                    </article>
                  ))}
                </div>

                {!orders.length && (
                  <p className="py-8 text-center text-gray-400 text-[0.875rem]">
                    No orders yet. Start with a service in catalogues.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyOrders;
