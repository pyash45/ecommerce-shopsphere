import { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';

function Addresses() {
  const [addresses, setAddresses] =
    useState([]);

  const [formOpen, setFormOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState({
      fullName: '',
      phone: '',
      pincode: '',
      city: '',
      state: '',
      country: 'India',
      addressLine: '',
      landmark: ''
    });

  const fetchAddresses =
    async () => {
      try {
        const res =
          await API.get(
            '/address'
          );

        setAddresses(
          res.data
        );
      } catch {
        alert(
          'Failed to fetch addresses'
        );
      }
    };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      fullName: '',
      phone: '',
      pincode: '',
      city: '',
      state: '',
      country: 'India',
      addressLine: '',
      landmark: ''
    });

    setEditingId(null);
  };

  const saveAddress =
    async (e) => {
      e.preventDefault();

      try {
        if (editingId) {
          await API.put(
            `/address/${editingId}`,
            form
          );
        } else {
          await API.post(
            '/address',
            form
          );
        }

        fetchAddresses();

        resetForm();

        setFormOpen(false);

      } catch {
        alert(
          'Failed to save address'
        );
      }
    };

  const editAddress = (
    address
  ) => {
    setForm(address);
    setEditingId(
      address._id
    );
    setFormOpen(true);
  };

  const deleteAddress =
    async (id) => {
      try {
        await API.delete(
          `/address/${id}`
        );

        fetchAddresses();

      } catch {
        alert(
          'Delete failed'
        );
      }
    };

  const setDefault =
    async (id) => {
      try {
        await API.put(
          `/address/default/${id}`
        );

        fetchAddresses();

      } catch {
        alert(
          'Failed to set default'
        );
      }
    };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-black text-white">
            My Addresses
          </h1>

          <button
            onClick={() =>
              setFormOpen(true)
            }
            className="px-6 py-3 rounded-2xl bg-cyan-500 text-white font-semibold"
          >
            Add Address
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {addresses.map(
            (
              address
            ) => (
              <div
                key={
                  address._id
                }
                className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-xl"
              >
                {address.isDefault && (
                  <span className="inline-block mb-4 px-4 py-2 rounded-full bg-cyan-500 text-white text-sm">
                    DEFAULT
                  </span>
                )}

                <h2 className="text-2xl font-bold text-white">
                  {
                    address.fullName
                  }
                </h2>

                <p className="text-gray-300 mt-3">
                  {
                    address.addressLine
                  }
                </p>

                <p className="text-gray-300">
                  {
                    address.landmark
                  }
                </p>

                <p className="text-gray-300">
                  {
                    address.city
                  }
                  ,{' '}
                  {
                    address.state
                  }
                </p>

                <p className="text-gray-300">
                  {
                    address.pincode
                  }
                </p>

                <p className="text-gray-300">
                  {
                    address.phone
                  }
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={() =>
                      editAddress(
                        address
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-purple-500 text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteAddress(
                        address._id
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-red-500 text-white"
                  >
                    Delete
                  </button>

                  {!address.isDefault && (
                    <button
                      onClick={() =>
                        setDefault(
                          address._id
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-white"
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>

      </div>

      {/* MODAL */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] px-4">

          <div className="w-full max-w-3xl bg-slate-900 border border-white/10 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-white mb-6">
              {editingId
                ? 'Edit Address'
                : 'Add Address'}
            </h2>

            <form
              onSubmit={
                saveAddress
              }
              className="grid md:grid-cols-2 gap-4"
            >
              {Object.keys(
                form
              ).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={
                    form[
                      key
                    ]
                  }
                  placeholder={key}
                  onChange={
                    handleChange
                  }
                  className="p-4 rounded-2xl bg-white/10 text-white"
                />
              ))}

              <div className="md:col-span-2 flex gap-4 mt-4">
                <button className="flex-1 py-4 rounded-2xl bg-cyan-500 text-white font-semibold">
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setFormOpen(
                      false
                    );
                  }}
                  className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-semibold"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>

        </div>
      )}
    </div>
  );
}

export default Addresses;