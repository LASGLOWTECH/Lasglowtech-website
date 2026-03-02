import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import instance from "../config/axios.config";

const formatNaira = (amount) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount || 0);

const PaymentSuccess = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [verification, setVerification] = useState(null);
  const [error, setError] = useState("");

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const txRef = query.get("tx_ref");
  const transactionId = query.get("transaction_id");
  const status = query.get("status");

  useEffect(() => {
    const verify = async () => {
      if (!txRef) {
        setError("No transaction reference found.");
        setLoading(false);
        return;
      }

      try {
        const verifyUrl = transactionId
          ? `/payments/verify/${encodeURIComponent(txRef)}?transaction_id=${encodeURIComponent(transactionId)}`
          : `/payments/verify/${encodeURIComponent(txRef)}`;
        const res = await instance.get(verifyUrl);
        setVerification(res.data?.data || null);
        if (!res.data?.data) {
          setError(
            res.data?.message ||
              "Payment verification is pending. Please check your dashboard or contact support."
          );
        }
      } catch (err) {
        setError("Could not verify this payment right now.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [txRef, transactionId]);

  return (
    <div className="min-h-screen px-6 md:px-20 py-16 bg-bgcolor2 text-textcolor2">
      <div className="max-w-2xl mx-auto bg-[#121726] border border-Primarycolor/40 rounded-xl p-6 md:p-8">
        <h1 className="text-3xl font-semibold mb-3">Payment Status</h1>

        {loading && <p>Verifying payment...</p>}

        {!loading && error && (
          <div>
            <p className="text-red-400 mb-4">{error}</p>
            <Link to="/client/dashboard" className="text-violet-500 hover:underline">
              Go to client dashboard
            </Link>
          </div>
        )}

        {!loading && !error && verification && (
          <div className="space-y-3">
            <p>
              Redirect status: <span className="font-semibold">{status || "unknown"}</span>
            </p>
            <p>
              Gateway status: <span className="font-semibold">{verification.status}</span>
            </p>
            <p>
              Reference: <span className="font-semibold">{verification.tx_ref}</span>
            </p>
            <p>
              Amount: <span className="font-semibold">{formatNaira(verification.amount)}</span>
            </p>
            <p>
              Currency: <span className="font-semibold">{verification.currency}</span>
            </p>
            <p>
              Service:{" "}
              <span className="font-semibold">
                {verification.meta?.serviceName || verification.meta?.serviceSlug || "N/A"}
              </span>
            </p>

            <div className="pt-4">
              <Link to="/services" className="text-violet-500 hover:underline">
                Back to services
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
