import { useState } from 'react';
import API from '../../api';

function EditProductModal({ product, onClose, refreshProducts }) {
  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(product.image);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (image) {
        formData.append('image', image);
      }

      await API.put(`/products/${product._id}`, formData);

      alert('Product updated successfully');

      refreshProducts();
      onClose();

    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4">

      <div className="w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-6">
          Edit Product
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white"
          />

          <img
            src={preview}
            alt="preview"
            className="w-40 h-40 rounded-2xl object-cover"
          />

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-xl bg-red-500 text-white font-semibold"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditProductModal;