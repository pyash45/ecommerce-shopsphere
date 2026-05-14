import API from '../api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function ProductCard({ product }) {
  const navigate = useNavigate();

  const addToCart = async (
    e
  ) => {
    e.stopPropagation();

    try {
      await API.post('/cart/add', {
        productId: product._id,
        quantity: 1
      });

      toast.success(
        'Added to cart'
      );

    } catch {
      toast.error(
        'Failed to add'
      );
    }
  };

  return (
    <div
      onClick={() =>
        navigate(
          `/product/${product._id}`
        )
      }
      className="cursor-pointer bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-5">
        <h3 className="text-white text-xl font-semibold">
          {product.name}
        </h3>

        <p className="text-gray-300 text-sm mt-2 overflow-hidden">
          {
            product.description
          }
        </p>

        <div className="flex justify-between items-center mt-5">
          <span className="text-cyan-400 text-xl font-bold">
            ₹{product.price}
          </span>

          <button
            onClick={addToCart}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;