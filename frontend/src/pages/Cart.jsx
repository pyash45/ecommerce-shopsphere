import { useEffect, useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import EmptyState from '../components/EmptyState';
import CheckoutModal from '../components/CheckoutModal';
import toast from 'react-hot-toast';

function Cart() {
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] =
    useState(false);

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');
      setCart(res.data.items || []);
    } catch {
      toast.error('Failed to fetch cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (
    productId,
    quantity
  ) => {
    if (quantity < 1) return;

    try {
      await API.put(
        `/cart/update/${productId}`,
        { quantity }
      );

      fetchCart();

    } catch {
      toast.error('Update failed');
    }
  };

  const removeItem = async (productId) => {
    try {
      await API.delete(
        `/cart/remove/${productId}`
      );

      toast.success('Item removed');

      fetchCart();

    } catch {
      toast.error('Remove failed');
    }
  };

  const clearCart = async () => {
    try {
      await API.delete('/cart/clear');

      toast.success('Cart cleared');

      fetchCart();

    } catch {
      toast.error('Clear failed');
    }
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.product.price * item.quantity,
    0
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950">
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-10">

          <h1 className="text-4xl font-bold text-white mb-10">
            My Cart
          </h1>

          {cart.length === 0 ? (
            <EmptyState
              title="Your cart is empty"
              subtitle="Add products to continue shopping"
            />
          ) : (
            <>
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={
                        item.product.name
                      }
                      className="w-36 h-36 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h2 className="text-2xl text-white font-bold">
                        {item.product.name}
                      </h2>

                      <p className="text-gray-300 mt-2">
                        ₹{
                          item.product.price
                        }
                      </p>

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              item.quantity -
                                1
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-white/20 text-white"
                        >
                          -
                        </button>

                        <span className="text-white text-xl">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              item.quantity +
                                1
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-white/20 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        removeItem(
                          item.product._id
                        )
                      }
                      className="px-5 py-3 rounded-xl bg-red-500 text-white"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 rounded-3xl p-8 border border-white/20 mt-10">
                <h2 className="text-3xl text-white font-bold">
                  Total: ₹{total}
                </h2>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-4 rounded-xl bg-red-500 text-white"
                  >
                    Clear Cart
                  </button>

                  <button
                    onClick={() =>
                      setCheckoutOpen(true)
                    }
                    className="flex-1 py-4 rounded-xl bg-green-500 text-white"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {checkoutOpen && (
        <CheckoutModal
          onClose={() =>
            setCheckoutOpen(false)
          }
          refreshCart={fetchCart}
        />
      )}
    </>
  );
}

export default Cart;