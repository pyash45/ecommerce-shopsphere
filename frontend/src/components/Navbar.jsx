import { useState, useEffect } from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';

import API from '../api';

import {
  ShieldCheck,
  Package,
  History,
  User,
  Settings,
  ShoppingCart,
  MapPin,
  Menu,
  Search,
  X
} from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cartCount, setCartCount] =
    useState(0);

  const [search, setSearch] =
    useState('');

  const [adminOpen, setAdminOpen] =
    useState(false);

  const [adminData, setAdminData] =
    useState({
      email: '',
      password: ''
    });

  const token =
    localStorage.getItem('token');

  const fetchCart = async () => {
    try {
      const res =
        await API.get('/cart');

      setCartCount(
        res.data.items?.length || 0
      );

    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(
      `/home?search=${search}`
    );
  };

  const handleAdminLogin =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await API.post(
            '/auth/admin-login',
            adminData
          );

        console.log(
          'ADMIN RESPONSE:',
          res.data
        );

        if (!res.data.token) {
          alert(
            'Admin token missing from backend response'
          );
          return;
        }

        localStorage.setItem(
          'admin',
          res.data.token
        );

        console.log(
          'SAVED ADMIN TOKEN:',
          localStorage.getItem(
            'admin'
          )
        );

        alert(
          'Admin login successful'
        );

        setAdminOpen(false);

        navigate('/admin');

      } catch (err) {
        console.log(
          'ADMIN LOGIN ERROR:',
          err.response?.data
        );

        alert(
          err.response?.data
            ?.message ||
            'Invalid admin credentials'
        );
      }
    };

  const iconClass =
    'w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-300';

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-2xl border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">

          <div className="flex items-center justify-between gap-6">

            <Link
              to="/home"
              className="text-3xl font-black tracking-tight text-white shrink-0"
            >
              Shop
              <span className="text-cyan-400">
                Sphere
              </span>
            </Link>

            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-2xl relative"
            >
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full pl-12 pr-5 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
              />
            </form>

            <div className="hidden xl:flex items-center gap-3 bg-white/5 border border-white/10 rounded-3xl px-4 py-2">

              <button
                onClick={() =>
                  setAdminOpen(true)
                }
                className={iconClass}
              >
                <ShieldCheck size={20} />
              </button>

              <Link
                to="/orders"
                className={iconClass}
              >
                <Package size={20} />
              </Link>

              <Link
                to="/history"
                className={iconClass}
              >
                <History size={20} />
              </Link>

              <Link
                to="/profile"
                className={iconClass}
              >
                <User size={20} />
              </Link>

              <Link
                to="/settings"
                className={iconClass}
              >
                <Settings size={20} />
              </Link>

              <Link
                to="/addresses"
                className={iconClass}
              >
                <MapPin size={20} />
              </Link>

              <Link
                to="/cart"
                className={`${iconClass} relative`}
              >
                <ShoppingCart size={20} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-xs px-2 py-1 rounded-full text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

            </div>

            <button
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
              className="xl:hidden text-white"
            >
              {menuOpen ? (
                <X size={30} />
              ) : (
                <Menu size={30} />
              )}
            </button>

          </div>
        </div>
      </nav>

      {adminOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] px-4">
          <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold text-white mb-6">
              Admin Access
            </h2>

            <form
              onSubmit={
                handleAdminLogin
              }
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="Admin Email"
                value={
                  adminData.email
                }
                onChange={(e) =>
                  setAdminData({
                    ...adminData,
                    email:
                      e.target.value
                  })
                }
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={
                  adminData.password
                }
                onChange={(e) =>
                  setAdminData({
                    ...adminData,
                    password:
                      e.target.value
                  })
                }
                className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
              />

              <div className="flex gap-4">
                <button className="flex-1 py-4 rounded-2xl bg-cyan-500 text-white font-semibold">
                  Login
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAdminOpen(
                      false
                    )
                  }
                  className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-semibold"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;