import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';

function Settings() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const fetchProfile = async () => {
    try {
      const res = await API.get('/auth/me');

      setProfile({
        name: res.data.name,
        email: res.data.email
      });
    } catch {
      alert('Failed to fetch profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        '/auth/update-profile',
        profile
      );

      alert(
        'Profile updated successfully'
      );
    } catch {
      alert(
        'Failed to update profile'
      );
    }
  };

  const changePassword = async (
    e
  ) => {
    e.preventDefault();

    try {
      await API.put(
        '/auth/change-password',
        password
      );

      alert(
        'Password changed successfully'
      );

      setPassword({
        currentPassword: '',
        newPassword: ''
      });

    } catch {
      alert(
        'Failed to change password'
      );
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-white">
            Settings
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage your account,
            security and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* PROFILE CARD */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold text-white mb-8">
              Update Profile
            </h2>

            <form
              onSubmit={
                updateProfile
              }
              className="space-y-5"
            >
              <input
                type="text"
                value={
                  profile.name
                }
                placeholder="Name"
                onChange={(
                  e
                ) =>
                  setProfile({
                    ...profile,
                    name:
                      e.target
                        .value
                  })
                }
                className="w-full p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="email"
                value={
                  profile.email
                }
                placeholder="Email"
                onChange={(
                  e
                ) =>
                  setProfile({
                    ...profile,
                    email:
                      e.target
                        .value
                  })
                }
                className="w-full p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-white outline-none focus:border-cyan-400"
              />

              <button className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-white font-semibold text-lg">
                Update Profile
              </button>
            </form>

          </div>

          {/* PASSWORD CARD */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold text-white mb-8">
              Security
            </h2>

            <form
              onSubmit={
                changePassword
              }
              className="space-y-5"
            >
              <input
                type="password"
                value={
                  password.currentPassword
                }
                placeholder="Current Password"
                onChange={(
                  e
                ) =>
                  setPassword({
                    ...password,
                    currentPassword:
                      e.target
                        .value
                  })
                }
                className="w-full p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-white outline-none focus:border-purple-400"
              />

              <input
                type="password"
                value={
                  password.newPassword
                }
                placeholder="New Password"
                onChange={(
                  e
                ) =>
                  setPassword({
                    ...password,
                    newPassword:
                      e.target
                        .value
                  })
                }
                className="w-full p-4 rounded-2xl bg-slate-900/70 border border-white/10 text-white outline-none focus:border-purple-400"
              />

              <button className="w-full py-4 rounded-2xl bg-purple-500 hover:bg-purple-400 transition text-white font-semibold text-lg">
                Change Password
              </button>
            </form>

          </div>

        </div>

        {/* LOGOUT */}
        <div className="mt-12 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-white mb-4">
            Session
          </h2>

          <p className="text-gray-400 mb-6">
            Sign out from your account securely.
          </p>

          <button
            onClick={logout}
            className="px-8 py-4 rounded-2xl bg-red-500 hover:bg-red-400 transition text-white font-semibold text-lg"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Settings;