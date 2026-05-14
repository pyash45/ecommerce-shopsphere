import { useEffect, useState } from 'react';
import API from '../api';
import toast from 'react-hot-toast';

function CheckoutModal({
  onClose,
  refreshCart,
  directProduct = null,
  directQuantity = 1
}) {
  const [addresses, setAddresses] =
    useState([]);

  const [selectedAddress, setSelectedAddress] =
    useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState('COD');

  const [loading, setLoading] =
    useState(false);

  const fetchAddresses = async () => {
    try {
      const res =
        await API.get('/address');

      setAddresses(res.data);

      const defaultAddress =
        res.data.find(
          (addr) =>
            addr.isDefault
        );

      if (defaultAddress) {
        setSelectedAddress(
          defaultAddress
        );
      }

    } catch {
      toast.error(
        'Failed to load addresses'
      );
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const formatAddress = (
    addr
  ) => {
    return `
${addr.fullName},
${addr.addressLine},
${addr.landmark},
${addr.city},
${addr.state},
${addr.pincode},
${addr.country},
Phone: ${addr.phone}
    `;
  };

  const handleOnlinePayment =
    async () => {
      if (!selectedAddress) {
        toast.error(
          'Select an address'
        );
        return;
      }

      try {
        const amount =
          directProduct
            ? directProduct.price *
              directQuantity
            : 1000;

        const res =
          await API.post(
            '/payment/create-order',
            { amount }
          );

        const order =
          res.data.order;

        const options = {
          key:
            import.meta.env
              .VITE_RAZORPAY_KEY_ID,

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            'ShopSphere',

          description:
            'Product Purchase',

          order_id:
            order.id,

          handler:
            async function (
              response
            ) {
              try {
                await API.post(
                  '/payment/verify',
                  {
                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_signature:
                      response.razorpay_signature,

                    productId:
                      directProduct?._id,

                    quantity:
                      directQuantity,

                    shippingAddress:
                      formatAddress(
                        selectedAddress
                      )
                  }
                );

                toast.success(
                  'Payment successful'
                );

                if (
                  refreshCart
                ) {
                  refreshCart();
                }

                onClose();

              } catch (
                error
              ) {
                toast.error(
                  error.response
                    ?.data
                    ?.message ||
                    'Verification failed'
                );
              }
            },

          theme: {
            color:
              '#06b6d4'
          }
        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch {
        toast.error(
          'Payment failed'
        );
      }
    };

  const placeOrder =
    async () => {
      if (!selectedAddress) {
        toast.error(
          'Select an address'
        );
        return;
      }

      setLoading(true);

      try {
        const shippingAddress =
          formatAddress(
            selectedAddress
          );

        if (
          paymentMethod ===
          'ONLINE'
        ) {
          handleOnlinePayment();
          return;
        }

        if (
          directProduct
        ) {
          await API.post(
            '/orders/direct',
            {
              productId:
                directProduct._id,
              quantity:
                directQuantity,
              shippingAddress,
              paymentMethod:
                'COD'
            }
          );
        } else {
          await API.post(
            '/orders',
            {
              shippingAddress,
              paymentMethod:
                'COD'
            }
          );

          if (
            refreshCart
          ) {
            refreshCart();
          }
        }

        toast.success(
          'Order placed successfully'
        );

        onClose();

      } catch (
        error
      ) {
        toast.error(
          error.response
            ?.data
            ?.message ||
            'Checkout failed'
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">
      <div className="w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl p-8 max-h-[90vh] overflow-y-auto">

        <h2 className="text-3xl font-bold text-white mb-6">
          Checkout
        </h2>

        <h3 className="text-xl text-white mb-4">
          Select Delivery Address
        </h3>

        <div className="space-y-4 mb-8">
          {addresses.map(
            (address) => (
              <label
                key={
                  address._id
                }
                className={`block p-5 rounded-2xl border cursor-pointer ${
                  selectedAddress?._id ===
                  address._id
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={
                    selectedAddress?._id ===
                    address._id
                  }
                  onChange={() =>
                    setSelectedAddress(
                      address
                    )
                  }
                  className="mr-3"
                />

                <span className="text-white font-bold">
                  {
                    address.fullName
                  }
                </span>

                {address.isDefault && (
                  <span className="ml-3 px-3 py-1 rounded-full bg-cyan-500 text-white text-xs">
                    DEFAULT
                  </span>
                )}

                <p className="text-gray-300 mt-2">
                  {
                    address.addressLine
                  },{' '}
                  {
                    address.city
                  },{' '}
                  {
                    address.state
                  }
                </p>
              </label>
            )
          )}
        </div>

        <div className="space-y-3 mb-8">
          <label className="flex gap-3 text-white">
            <input
              type="radio"
              value="COD"
              checked={
                paymentMethod ===
                'COD'
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />
            Cash on Delivery
          </label>

          <label className="flex gap-3 text-white">
            <input
              type="radio"
              value="ONLINE"
              checked={
                paymentMethod ===
                'ONLINE'
              }
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            />
            Online Payment
          </label>
        </div>

        <div className="flex gap-4">
          <button
            onClick={
              placeOrder
            }
            disabled={
              loading
            }
            className="flex-1 py-4 rounded-2xl bg-cyan-500 text-white font-semibold"
          >
            {loading
              ? 'Processing...'
              : paymentMethod ===
                'ONLINE'
              ? 'Pay Now'
              : 'Place Order'}
          </button>

          <button
            onClick={
              onClose
            }
            className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-semibold"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default CheckoutModal;