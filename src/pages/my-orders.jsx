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
    <div className="min-h-screen px-6 md:px-20 py-12 bg-gradient-to-b from-bgcolor2 via-bgcolor2 to-bgcolor text-textcolor2">
      <SEO
        title="My Orders | Lasglowtech"
        description="Track your service orders and payment status."
        url="https://www.lasglowtech.com.ng/my/orders"
      />

      <section className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold">My Orders</h1>
            <p className="text-sm text-gray-400 mt-2">Track your service payments and order progress.</p>
          </div>
          <Link
            to="/catalogues"
            className="px-5 py-3 rounded-md bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor text-white text-sm"
          >
            Browse Catalogues
          </Link>
        </div>

        <div className="rounded-2xl p-5 border border-Primarycolor/30 bg-bgcolor">
          {loading && <p className="text-gray-400">Loading orders...</p>}
          {!loading && error && <p className="text-red-300">{error}</p>}

          {!loading && !error && (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-Primarycolor/20">
                      <th className="py-2 pr-4">Date</th>
                      <th className="py-2 pr-4">Service</th>
                      <th className="py-2 pr-4">Amount</th>
                      <th className="py-2 pr-4">Payment Type</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Reference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item) => (
                      <tr key={item.id} className="border-b border-Primarycolor/10">
                        <td className="py-2 pr-4">{new Date(item.created_at).toLocaleDateString()}</td>
                        <td className="py-2 pr-4">{item.service_name}</td>
                        <td className="py-2 pr-4">
                          {item.currency} {Number(item.amount || 0).toLocaleString()}
                        </td>
                        <td className="py-2 pr-4 uppercase text-xs">{item.payment_type}</td>
                        <td className="py-2 pr-4">
                          <span
                            className={`px-3 py-1 rounded-full border text-xs uppercase ${
                              statusClass[item.status] || "text-gray-300 border-gray-300/40"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-2 pr-4">{item.tx_ref}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-3">
                {orders.map((item) => (
                  <article key={item.id} className="rounded-lg border border-Primarycolor/20 p-4 text-sm">
                    <p className="text-gray-300">{new Date(item.created_at).toLocaleDateString()}</p>
                    <p className="mt-1 font-medium">{item.service_name}</p>
                    <p className="mt-1 text-gray-300">
                      {item.currency} {Number(item.amount || 0).toLocaleString()}
                    </p>
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <span className="px-2 py-1 rounded-full border border-Primarycolor/30 text-xs uppercase">
                        {item.payment_type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full border text-xs uppercase ${
                          statusClass[item.status] || "text-gray-300 border-gray-300/40"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-400 break-all">{item.tx_ref}</p>
                  </article>
                ))}
              </div>

              {!orders.length && <p className="py-5 text-gray-400">No orders yet. Start with a service in catalogues.</p>}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyOrders;
