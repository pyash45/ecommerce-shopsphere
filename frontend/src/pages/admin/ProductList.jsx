import { useEffect, useState } from 'react';
import API from '../../api';
import EditProductModal from './EditProductModal';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch {
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      'Delete this product?'
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      alert('Product deleted');

      fetchProducts();

    } catch (error) {
      alert(error.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading products...
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-6">
          Products
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-white">

            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-white/10"
                >
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  </td>

                  <td className="p-4">{product.name}</td>
                  <td className="p-4">₹{product.price}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.stock}</td>

                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="px-4 py-2 rounded-xl bg-cyan-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="px-4 py-2 rounded-xl bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          refreshProducts={fetchProducts}
        />
      )}
    </>
  );
}

export default ProductList;