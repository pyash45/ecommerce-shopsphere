import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';

function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="w-72 min-h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 p-6">

      <h1 className="text-2xl font-bold text-white mb-10">
        Admin Panel
      </h1>

      <div className="space-y-4">

        <Link
          to="/admin"
          className="flex items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
        >
          <LayoutDashboard />
          Dashboard
        </Link>

        <Link
          to="/admin/add-product"
          className="flex items-center gap-3 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
        >
          <PlusCircle />
          Add Product
        </Link>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-500/20 hover:bg-red-500/40 transition text-white"
        >
          <LogOut />
          Logout
        </button>

      </div>
    </div>
  );
}

export default AdminSidebar;