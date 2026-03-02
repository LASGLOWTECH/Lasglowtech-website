import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../config/axios.config";
import { getAdminToken } from "../../utils/adminAuth";

const OrdersAdmin = () => {
  const headers = useMemo(() => ({ Authorization: `Bearer ${getAdminToken()}` }), []);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await instance.get("/payments/admin/orders", { headers });
        setOrders(res.data || []);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [headers]);

  const reverifyOrder = async (orderId) => {
    try {
      const res = await instance.post(`/payments/admin/orders/${orderId}/reverify`, {}, { headers });
      const newStatus = res.data?.order?.status;
      toast.success(newStatus ? `Reverified. Current status: ${newStatus}` : "Reverification requested.");
      const refreshed = await instance.get("/payments/admin/orders", { headers });
      setOrders(refreshed.data || []);
    } catch (error) {
      toast.error(error.response?.data?.error || "Unable to reverify this order.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-textcolor2">Orders & payments</h1>
        <p className="text-gray-500 mt-1">Review catalogue transactions and payment status.</p>
      </div>

      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h2 className="text-lg font-semibold text-textcolor2">All orders</h2>
          <p className="text-sm text-gray-500 mt-0.5">{orders.length} order(s)</p>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="py-12 text-center text-gray-400">Loading orders…</p>
          ) : (
          <table className="w-full min-w-[1200px] text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-Primarycolor/20 bg-bgcolor/20">
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Service</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Client alert</th>
                <th className="py-3 px-4 font-semibold">Invoice mail</th>
                <th className="py-3 px-4 font-semibold">Reference</th>
                <th className="py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.id} className="border-b border-Primarycolor/10 hover:bg-Primarycolor/5">
                  <td className="py-3 px-4 text-gray-300">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-gray-300">{item.service_name}</td>
                  <td className="py-3 px-4 text-textcolor2">{item.customer_name}</td>
                  <td className="py-3 px-4 text-gray-300">{item.email}</td>
                  <td className="py-3 px-4 font-medium text-textcolor2">
                    {item.currency} {Number(item.amount || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 uppercase text-xs text-gray-400">{item.payment_type}</td>
                  <td className="py-3 px-4 uppercase text-xs text-gray-400">{item.status}</td>
                  <td className="py-3 px-4 text-gray-300">
                    <span className="uppercase text-xs">{item.email_notification_status || "pending"}</span>
                    {item.email_notification_error && (
                      <p className="text-xs text-red-300 mt-0.5 max-w-[200px] truncate" title={item.email_notification_error}>
                        {item.email_notification_error}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <span className="uppercase text-xs">{item.invoice_email_status || "pending"}</span>
                    {item.invoice_email_error && (
                      <p className="text-xs text-red-300 mt-0.5 max-w-[200px] truncate" title={item.invoice_email_error}>
                        {item.invoice_email_error}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-400 font-mono text-xs">{item.tx_ref}</td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => reverifyOrder(item.id)}
                      className="px-3 py-2 rounded-lg border border-Primarycolor/40 hover:bg-Primarycolor/20 text-xs font-medium transition-colors"
                    >
                      Re-verify
                    </button>
                  </td>
                </tr>
              ))}
              {!orders.length && (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-gray-400">No orders recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersAdmin;
