import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';
import RatingStars from '../components/RatingStars';
import LoadingSpinner from '../components/LoadingSpinner';
import ReviewCard from '../components/ReviewCard';
import RelatedProducts from '../components/RelatedProducts';
import CheckoutModal from '../components/CheckoutModal';
import toast from 'react-hot-toast';

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [buyNowOpen, setBuyNowOpen] = useState(false);

  const [review, setReview] = useState({
    rating: 5,
    comment: ''
  });

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch {
      toast.error('Failed to load product');
    }
  };

  const fetchRelated = async () => {
    try {
      const res = await API.get(`/products/related/${id}`);
      setRelated(res.data);
    } catch {
      console.log('related fetch failed');
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchRelated();
  }, [id]);

  const addToCart = async () => {
    try {
      await API.post('/cart/add', {
        productId: product._id,
        quantity
      });

      toast.success('Added to cart');
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        `/products/${id}/review`,
        review
      );

      toast.success('Review submitted');

      setReview({
        rating: 5,
        comment: ''
      });

      fetchProduct();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Review failed'
      );
    }
  };

  if (!product) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-950">
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* PRODUCT SECTION */}
          <div className="grid lg:grid-cols-2 gap-12">

            {/* LEFT */}
            <div>
              <div className="bg-white/10 rounded-3xl p-8 border border-white/20">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div>

              <h1 className="text-4xl font-bold text-white">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-4">
                <RatingStars
                  rating={product.rating}
                />

                <span className="text-gray-300">
                  ({product.numReviews} reviews)
                </span>
              </div>

              <p className="text-cyan-400 text-4xl font-bold mt-6">
                ₹{product.price}
              </p>

              <div className="mt-6 space-y-3">
                <p className="text-white">
                  Brand:
                  <span className="text-gray-300 ml-2">
                    {product.brand}
                  </span>
                </p>

                <p className="text-white">
                  Category:
                  <span className="text-gray-300 ml-2">
                    {product.category}
                  </span>
                </p>

                <p className="text-white">
                  Stock:
                  <span className="text-green-400 ml-2">
                    {product.stock} available
                  </span>
                </p>
              </div>

              <p className="text-gray-300 mt-8 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* QUANTITY */}
              <div className="mt-8">
                <h3 className="text-white text-xl mb-4">
                  Quantity
                </h3>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(1, quantity - 1)
                      )
                    }
                    className="px-5 py-3 bg-white/10 rounded-xl text-white"
                  >
                    -
                  </button>

                  <span className="text-white text-2xl">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(
                        Math.min(
                          product.stock,
                          quantity + 1
                        )
                      )
                    }
                    className="px-5 py-3 bg-white/10 rounded-xl text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="grid md:grid-cols-2 gap-4 mt-10">
                <button
                  onClick={addToCart}
                  className="py-4 rounded-2xl bg-cyan-500 text-white font-bold text-lg"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() =>
                    setBuyNowOpen(true)
                  }
                  className="py-4 rounded-2xl bg-green-500 text-white font-bold text-lg"
                >
                  Buy Now
                </button>
              </div>

              {/* DELIVERY */}
              <div className="mt-10 bg-white/10 rounded-3xl p-6 border border-white/20">
                <h3 className="text-white text-2xl font-bold mb-4">
                  Delivery Info
                </h3>

                <p className="text-gray-300">
                  🚚 Free Delivery by Tomorrow
                </p>

                <p className="text-gray-300 mt-2">
                  🔄 7-Day Return Policy
                </p>

                <p className="text-gray-300 mt-2">
                  🔒 Secure Checkout
                </p>
              </div>

            </div>
          </div>

          {/* SPECIFICATIONS */}
          <div className="mt-16 bg-white/10 rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">
              Specifications
            </h2>

            {Object.entries(
              product.specifications || {}
            ).length === 0 ? (
              <p className="text-gray-300">
                No specifications available
              </p>
            ) : (
              Object.entries(
                product.specifications
              ).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-3 border-b border-white/10"
                >
                  <span className="text-white">
                    {key}
                  </span>

                  <span className="text-gray-300">
                    {value}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* REVIEW FORM */}
          <div className="mt-16 bg-white/10 rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">
              Write a Review
            </h2>

            <form
              onSubmit={submitReview}
              className="space-y-4"
            >
              <select
                value={review.rating}
                onChange={(e) =>
                  setReview({
                    ...review,
                    rating: e.target.value
                  })
                }
                className="w-full p-4 rounded-xl bg-slate-800 text-white"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>

              <textarea
                rows="4"
                placeholder="Write your review..."
                value={review.comment}
                onChange={(e) =>
                  setReview({
                    ...review,
                    comment: e.target.value
                  })
                }
                className="w-full p-4 rounded-xl bg-slate-800 text-white"
              />

              <button className="px-8 py-4 rounded-xl bg-cyan-500 text-white font-semibold">
                Submit Review
              </button>
            </form>
          </div>

          {/* CUSTOMER REVIEWS */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Customer Reviews
            </h2>

            <div className="space-y-6">
              {product.reviews?.length === 0 ? (
                <p className="text-gray-300">
                  No reviews yet
                </p>
              ) : (
                product.reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                  />
                ))
              )}
            </div>
          </div>

          {/* RELATED PRODUCTS */}
          <RelatedProducts
            products={related}
          />

        </div>
      </div>

      {/* BUY NOW CHECKOUT */}
      {buyNowOpen && (
        <CheckoutModal
          onClose={() =>
            setBuyNowOpen(false)
          }
          directProduct={product}
          directQuantity={quantity}
        />
      )}
    </>
  );
}

export default ProductDetails;