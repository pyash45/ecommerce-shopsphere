import { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import EmptyState from '../components/EmptyState';
import SkeletonCard from '../components/SkeletonCard';

function History() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await API.get('/orders/my-orders');
      setOrders(res.data);
    } catch {
      console.log('history fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-white mb-10">
          Purchase History
        </h1>

        {loading ? (
          <div className="space-y-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            title="No purchase history"
            subtitle="Your completed orders will appear here"
          />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h2 className="text-white text-2xl font-bold">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <p className="text-gray-300 mt-2">
                      {order.shippingAddress}
                    </p>

                    <p className="text-gray-400 mt-2">
                      Payment: {order.paymentMethod}
                    </p>
                  </div>

                  <div>
                    <p className="text-cyan-400 font-semibold">
                      {order.status}
                    </p>

                    <p className="text-white mt-3 text-xl">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default History;