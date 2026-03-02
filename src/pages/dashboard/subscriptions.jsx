import React, { useEffect, useState } from "react";
import instance from "../../config/axios.config";
const Subscriptions = () => {
 const [data, setData] = useState([]);

  useEffect(() => {
    instance.get('/subscribe') // Replace with your actual API URL
      .then((res) => setData(res.data))

    
     
      .catch((err) => console.error('API error:', err));
  }, []);

  return (
    <section className="rounded-2xl border border-Primarycolor/25 bg-bgcolor2/40 overflow-hidden">
      <div className="px-6 py-5 border-b border-Primarycolor/20 bg-bgcolor/30">
        <h2 className="text-xl font-semibold text-textcolor2">Newsletter subscribers</h2>
        <p className="text-sm text-gray-500 mt-0.5">People interested in updates and offers.</p>
      </div>
      <div className="p-6">
        {data.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No subscribers yet.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.map((sub) => (
              <li
                key={sub.id}
                className="rounded-xl border border-Primarycolor/20 bg-bgcolor/50 px-4 py-3 text-gray-300 text-sm hover:border-Primarycolor/30 transition-colors"
              >
                {sub.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Subscriptions;






