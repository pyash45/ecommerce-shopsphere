import { Link } from 'react-router-dom';

function ProfileDropdown() {
  return (
    <div className="absolute right-0 top-14 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50">

      <Link
        to="/profile"
        className="block px-5 py-4 text-white hover:bg-white/10"
      >
        Profile
      </Link>

      <Link
        to="/orders"
        className="block px-5 py-4 text-white hover:bg-white/10"
      >
        Orders
      </Link>

      <Link
        to="/cart"
        className="block px-5 py-4 text-white hover:bg-white/10"
      >
        Cart
      </Link>

      <Link
        to="/payments"
        className="block px-5 py-4 text-white hover:bg-white/10"
      >
        Payments
      </Link>

      <Link
        to="/history"
        className="block px-5 py-4 text-white hover:bg-white/10"
      >
        History
      </Link>

      <Link
        to="/settings"
        className="block px-5 py-4 text-white hover:bg-white/10"
      >
        Settings
      </Link>

    </div>
  );
}

export default ProfileDropdown;