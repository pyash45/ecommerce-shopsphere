import { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ShoppingBag } from 'lucide-react';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post(
        '/auth/register',
        form
      );

      localStorage.setItem(
        'verifyEmail',
        form.email
      );

      alert(
        'OTP sent to your email'
      );

      navigate('/verify-otp');

    } catch (err) {
      alert(
        err.response?.data
          ?.message ||
          'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6 py-10">

      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl w-full items-center">

        {/* LEFT PANEL */}
        <div className="hidden lg:block relative h-[720px] rounded-3xl overflow-hidden shadow-2xl">

          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
            alt="register"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-10 left-10 right-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-xl">
                <ShoppingBag
                  className="text-white"
                  size={28}
                />
              </div>

              <h2 className="text-4xl font-black text-white">
                ShopSphere
              </h2>
            </div>

            <h3 className="text-5xl font-black text-white leading-tight">
              Start your premium shopping experience
            </h3>

            <p className="text-gray-200 text-lg mt-5 leading-relaxed">
              Create your account, verify your email,
              and explore secure ecommerce shopping
              with fast checkout and premium features.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="backdrop-blur-2xl bg-white/8 border border-white/10 rounded-3xl p-10 lg:p-12 shadow-2xl">

          <div className="mb-10">
            <h1 className="text-5xl font-black text-white tracking-tight">
              Create Account
            </h1>

            <p className="text-gray-400 text-lg mt-4">
              Join ShopSphere and start shopping smarter
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* NAME */}
            <div className="flex items-center gap-4 bg-white/6 border border-white/10 rounded-2xl px-5 py-4 hover:border-cyan-400 transition">
              <User
                className="text-cyan-400"
                size={22}
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={
                  handleChange
                }
                required
                className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-lg"
              />
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-4 bg-white/6 border border-white/10 rounded-2xl px-5 py-4 hover:border-cyan-400 transition">
              <Mail
                className="text-cyan-400"
                size={22}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={
                  handleChange
                }
                required
                className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-lg"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex items-center gap-4 bg-white/6 border border-white/10 rounded-2xl px-5 py-4 hover:border-cyan-400 transition">
              <Lock
                className="text-cyan-400"
                size={22}
              />

              <input
                type="password"
                name="password"
                placeholder="Create Password"
                onChange={
                  handleChange
                }
                required
                className="bg-transparent outline-none text-white w-full placeholder-gray-400 text-lg"
              />
            </div>

            {/* BUTTON */}
            <button
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl disabled:opacity-50"
            >
              {loading
                ? 'Sending OTP...'
                : 'Create Account'}
            </button>

          </form>

          {/* FOOTER */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-lg">
              Already have an account?{' '}
              <Link
                to="/"
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
              >
                Login
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;