import { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

function VerifyOTP() {
  const [email, setEmail] = useState(localStorage.getItem('verifyEmail') || '');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await API.post('/auth/verify-otp', {
        email,
        otp
      });

      alert('Account verified successfully');

      localStorage.removeItem('verifyEmail');

      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 shadow-2xl w-full max-w-md">

        <div className="flex justify-center mb-6">
          <ShieldCheck className="text-cyan-400" size={60} />
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-3">
          Verify OTP
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Enter the OTP sent to your email
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <input
            type="text"
            placeholder="6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
          />

          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:scale-105 transition">
            Verify Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;