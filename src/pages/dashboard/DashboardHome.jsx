import React, { useEffect, useMemo, useState } from "react";
import instance from "../../config/axios.config";
import { getAdminToken } from "../../utils/adminAuth";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    posts: 0,
    subscribers: 0,
    catalogues: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    revenueThisMonth: 0,
  });
  const [latestOrders, setLatestOrders] = useState([]);

  const headers = useMemo(() => ({ Authorization: `Bearer ${getAdminToken()}` }), []);

  useEffect(() => {
    const load = async () => {
      const [postsRes, subRes, catRes, revenueRes] = await Promise.allSettled([
        instance.get("/posts"),
        instance.get("/subscribe"),
        instance.get("/catalogues/admin/all", { headers }),
        instance.get("/payments/admin/revenue", { headers }),
      ]);
      const revenueStats = revenueRes.status === "fulfilled" ? revenueRes.value.data?.stats : null;
      const recent = revenueRes.status === "fulfilled" ? revenueRes.value.data?.latestPayments || [] : [];

      setStats({
        posts: postsRes.status === "fulfilled" ? postsRes.value.data.length : 0,
        subscribers: subRes.status === "fulfilled" ? subRes.value.data.length : 0,
        catalogues: catRes.status === "fulfilled" ? catRes.value.data.length : 0,
        totalRevenue: Number(revenueStats?.totalRevenue || 0),
        pendingOrders: Number(revenueStats?.pendingOrders || 0),
        revenueThisMonth: Number(revenueStats?.revenueThisMonth || 0),
      });
      setLatestOrders(recent);
    };

    load();
  }, [headers]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-textcolor2">Dashboard overview</h1>
        <p className="text-gray-500 mt-1">Monitor platform activity and manage your digital storefront.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <article className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6 hover:border-Primarycolor/40 transition-colors">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Published blogs</p>
          <p className="text-3xl font-bold text-textcolor2 mt-2 tabular-nums">{stats.posts}</p>
        </article>
        <article className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6 hover:border-Primarycolor/40 transition-colors">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Newsletter subscribers</p>
          <p className="text-3xl font-bold text-textcolor2 mt-2 tabular-nums">{stats.subscribers}</p>
        </article>
        <article className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6 hover:border-Primarycolor/40 transition-colors">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Catalogue items</p>
          <p className="text-3xl font-bold text-textcolor2 mt-2 tabular-nums">{stats.catalogues}</p>
        </article>
        <article className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6 hover:border-Primarycolor/40 transition-colors">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Total revenue</p>
          <p className="text-2xl font-bold text-Secondarycolor mt-2 tabular-nums">NGN {stats.totalRevenue.toLocaleString()}</p>
        </article>
        <article className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6 hover:border-Primarycolor/40 transition-colors">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Revenue this month</p>
          <p className="text-2xl font-bold text-textcolor2 mt-2 tabular-nums">NGN {stats.revenueThisMonth.toLocaleString()}</p>
        </article>
        <article className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 p-6 hover:border-Primarycolor/40 transition-colors">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Pending orders</p>
          <p className="text-3xl font-bold text-textcolor2 mt-2 tabular-nums">{stats.pendingOrders}</p>
        </article>
      </div>

      <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-Primarycolor/20 bg-bgcolor/30">
          <h2 className="text-lg font-semibold text-textcolor2">Recent orders</h2>
          <p className="text-sm text-gray-500 mt-0.5">Latest payment activity</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-Primarycolor/20 bg-bgcolor/20">
                <th className="py-3 px-4 font-semibold">Service</th>
                <th className="py-3 px-4 font-semibold">Customer</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((item) => (
                <tr key={item.id} className="border-b border-Primarycolor/10 hover:bg-Primarycolor/5">
                  <td className="py-3 px-4 text-gray-300">{item.service_name}</td>
                  <td className="py-3 px-4 text-gray-300">{item.customer_name}</td>
                  <td className="py-3 px-4 text-textcolor2 font-medium">
                    {item.currency} {Number(item.amount || 0).toLocaleString()}
                  </td>
                  <td className="py-3 px-4"><span className="uppercase text-xs font-medium text-gray-400">{item.status}</span></td>
                  <td className="py-3 px-4 text-gray-400">{new Date(item.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {!latestOrders.length && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;
