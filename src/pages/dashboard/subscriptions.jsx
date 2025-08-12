import React from 'react';
import { useState, useEffect } from 'react';
import instance from '../../config/axios.config';
const Subscriptions = () => {
  // Example subscription data
 const [data, setData] = useState([]);

  useEffect(() => {
    instance.get('/subscribe') // Replace with your actual API URL
      .then((res) => setData(res.data))

    
     
      .catch((err) => console.error('API error:', err));
  }, []);

  console.log(data);
      
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Newsletter Subscribers</h2>
      <ul className="space-y-2">
        {data.map(sub => (
          <li key={sub.id} className="border p-2 rounded shadow">
            {sub.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subscriptions;






