import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../config/axios.config";
import { getToken, getUser } from "../utils/auth";

const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount || 0);

const Checkout = () => {
  const { slug } = useParams();

  const [servicePackage, setServicePackage] = useState(null);
  const [loadingPackage, setLoadingPackage] = useState(true);
  const [loadingPay, setLoadingPay] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setFormData({
        customerName: user.username || "",
        email: user.email || "",
      });
    }
  }, []);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await instance.get(`/payments/packages/${slug}`);
        setServicePackage(res.data);
      } catch (error) {
        toast.error("This service does not have an online payment package yet.");
      } finally {
        setLoadingPackage(false);
      }
    };

    fetchPackage();
  }, [slug]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoadingPay(true);

    try {
      const callbackUrl = `${window.location.origin}/payment/success`;
      const token = getToken();
      const res = await instance.post("/payments/initialize", {
        serviceSlug: slug,
        customerName: formData.customerName,
        email: formData.email,
        callbackUrl,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const paymentLink = res.data?.data?.link;
      if (!paymentLink) {
        throw new Error("No payment link returned");
      }

      window.location.href = paymentLink;
    } catch (error) {
      toast.error(error.response?.data?.error || "Unable to start payment.");
      setLoadingPay(false);
    }
  };

  if (loadingPackage) {
    return (
      <div className="min-h-screen px-6 md:px-20 py-16 bg-bgcolor2 text-textcolor2">
        <p>Loading payment package...</p>
      </div>
    );
  }

  if (!servicePackage) {
    return (
      <div className="min-h-screen px-6 md:px-20 py-16 bg-bgcolor2 text-textcolor2">
        <h1 className="text-2xl font-semibold mb-4">Payment package unavailable</h1>
        <Link to="/services" className="text-violet-500 hover:underline">
          Back to services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-20 py-16 bg-bgcolor2 text-textcolor2">
      <div className="max-w-2xl mx-auto bg-[#121726] border border-Primarycolor/40 rounded-xl p-6 md:p-8">
        <h1 className="text-3xl font-semibold mb-2">Checkout</h1>
        <p className="text-gray-400 mb-6">Complete payment via Flutterwave.</p>

        <div className="mb-6 border border-Primarycolor/30 rounded-lg p-4">
          <p className="text-sm text-gray-400">Service</p>
          <p className="text-lg font-medium">{servicePackage.name}</p>
          <p className="text-sm text-gray-400 mt-2">Payment type: {servicePackage.paymentType}</p>
          <p className="text-xl font-semibold mt-3 text-Secondarycolor">
            {formatNaira(servicePackage.amount)}
          </p>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Full name"
            className="w-full p-3 rounded-md bg-[#F6F5FA] text-black focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full p-3 rounded-md bg-[#F6F5FA] text-black focus:outline-none"
            required
          />

          <button
            type="submit"
            disabled={loadingPay}
            className="w-full text-white px-6 py-3 bg-gradient-to-r from-Primarycolor to-Primarycolor1 hover:from-Secondarycolor hover:to-Secondarycolor rounded-md duration-300"
          >
            {loadingPay ? "Redirecting..." : "Pay with Flutterwave"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
