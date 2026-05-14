import { useState } from 'react';
import API from '../api';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AdminLoginModal({ onClose }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post('/auth/login', form);

      if (res.data.user.role !== 'admin') {
        alert('Access denied');
        return;
      }

      localStorage.setItem('token', res.data.token);

      alert('Admin login successful');

      onClose();

      navigate('/admin');

    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">

      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold text-white mb-6">
          Admin Access
        </h2>

        <form onSubmit={handleAdminLogin} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Admin Password"
            onChange={handleChange}
            required
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <button
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold"
          >
            {loading ? 'Checking...' : 'Access Admin'}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLoginModal;