import { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

function Profile() {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data);
    } catch {
      alert('Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-36 h-36 rounded-full bg-cyan-500 flex items-center justify-center text-5xl font-bold text-white">
              {user.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                {user.name}
              </h1>

              <p className="text-gray-300 mt-2">
                {user.email}
              </p>

              <p className="text-cyan-400 mt-3 capitalize">
                Role: {user.role}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;