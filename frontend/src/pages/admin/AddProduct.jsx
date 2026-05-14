import { useState } from 'react';
import API from '../../api';
import AdminSidebar from '../../components/AdminSidebar';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('description', form.description);
      formData.append('price', form.price);
      formData.append('category', form.category);
      formData.append('stock', form.stock);
      formData.append('image', image);

      await API.post('/products', formData);

      alert('Product added successfully');

      navigate('/admin');

    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950 flex">

      <AdminSidebar />

      <div className="flex-1 p-10 flex justify-center items-center">
        <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">

          <h1 className="text-4xl font-bold text-white mb-8">
            Add Product
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Product Name"
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            />

            <textarea
              name="description"
              placeholder="Description"
              rows="4"
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              onChange={handleChange}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              required
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-40 h-40 object-cover rounded-2xl"
              />
            )}

            <button
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Add Product'}
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}

export default AddProduct;