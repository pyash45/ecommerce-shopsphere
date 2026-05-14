import { useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';

function Payments() {
  const [amount, setAmount] = useState('');

  const createPayment = async () => {
    try {
      const res = await API.post(
        '/payment/create-order',
        {
          amount
        }
      );

      alert(res.data.message);

    } catch {
      alert('Payment failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">

          <h1 className="text-4xl font-bold text-white mb-8">
            Payments
          </h1>

          <input
            type="number"
            placeholder="Enter amount"
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <button
            onClick={createPayment}
            className="w-full mt-6 py-4 rounded-xl bg-green-500 text-white"
          >
            Pay Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default Payments;