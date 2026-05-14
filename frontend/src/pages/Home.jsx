import { useEffect, useState } from 'react';
import API from '../api';

import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

function Home() {
  const [products, setProducts] =
    useState([]);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [filters, setFilters] =
    useState({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      inStock: false,
      sort: ''
    });

  const categories = [
    'Electronics',
    'Fashion',
    'Shoes',
    'Accessories',
    'Gaming',
    'Books'
  ];

  const fetchProducts = async (
    activeFilters = filters
  ) => {
    try {
      const params =
        new URLSearchParams();

      Object.entries(
        activeFilters
      ).forEach(
        ([key, value]) => {
          if (
            value !== '' &&
            value !== false &&
            value !== null &&
            value !== undefined
          ) {
            params.append(
              key,
              value
            );
          }
        }
      );

      const res =
        await API.get(
          `/products?${params.toString()}`
        );

      setProducts(
        res.data
      );

    } catch {
      alert(
        'Failed to fetch products'
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFilters({
      ...filters,
      [name]:
        type === 'checkbox'
          ? checked
          : value
    });
  };

  const applyFilters = () => {
    fetchProducts(filters);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    const reset = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      inStock: false,
      sort: ''
    };

    setFilters(reset);
    fetchProducts(reset);
  };

  const selectCategory = (
    category
  ) => {
    const updated = {
      ...filters,
      category
    };

    setFilters(updated);
    fetchProducts(updated);
  };

  return (
    <div className="min-h-screen bg-slate-950">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <HeroSlider />

        {/* CATEGORIES */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-6">
            Shop by Category
          </h2>

          <div className="flex flex-wrap gap-4">
            {categories.map(
              (category) => (
                <button
                  key={category}
                  onClick={() =>
                    selectCategory(
                      category
                    )
                  }
                  className={`px-6 py-3 rounded-full border transition ${
                    filters.category ===
                    category
                      ? 'bg-cyan-500 border-cyan-500 text-white'
                      : 'bg-white/5 border-white/10 text-white hover:bg-cyan-500'
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-white">
              Featured Products
            </h2>

            <button
              onClick={() =>
                setFilterOpen(true)
              }
              className="px-6 py-3 rounded-2xl bg-white/10 border border-white/10 text-white hover:bg-cyan-500 transition"
            >
              Filters
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(
              (
                product
              ) => (
                <ProductCard
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                />
              )
            )}
          </div>
        </div>

      </div>

      <Footer />

      {/* FILTER MODAL */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[100] px-4">

          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-3xl font-bold text-white mb-6">
              Filters
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="search"
                placeholder="Search products..."
                value={filters.search}
                onChange={
                  handleChange
                }
                className="p-4 rounded-2xl bg-white/10 text-white outline-none"
              />

              <select
                name="category"
                value={
                  filters.category
                }
                onChange={
                  handleChange
                }
                className="p-4 rounded-2xl bg-white/10 text-white"
              >
                <option value="">
                  All Categories
                </option>

                {categories.map(
                  (
                    category
                  ) => (
                    <option
                      key={
                        category
                      }
                      value={
                        category
                      }
                    >
                      {
                        category
                      }
                    </option>
                  )
                )}
              </select>

              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                value={
                  filters.minPrice
                }
                onChange={
                  handleChange
                }
                className="p-4 rounded-2xl bg-white/10 text-white"
              />

              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                value={
                  filters.maxPrice
                }
                onChange={
                  handleChange
                }
                className="p-4 rounded-2xl bg-white/10 text-white"
              />

              <select
                name="rating"
                value={
                  filters.rating
                }
                onChange={
                  handleChange
                }
                className="p-4 rounded-2xl bg-white/10 text-white"
              >
                <option value="">
                  Any Rating
                </option>
                <option value="4">
                  4★ & above
                </option>
                <option value="3">
                  3★ & above
                </option>
                <option value="2">
                  2★ & above
                </option>
              </select>

              <select
                name="sort"
                value={
                  filters.sort
                }
                onChange={
                  handleChange
                }
                className="p-4 rounded-2xl bg-white/10 text-white"
              >
                <option value="">
                  Sort By
                </option>
                <option value="newest">
                  Newest
                </option>
                <option value="low-high">
                  Price Low → High
                </option>
                <option value="high-low">
                  Price High → Low
                </option>
                <option value="top-rated">
                  Top Rated
                </option>
              </select>

            </div>

            <label className="flex items-center gap-3 mt-6 text-white">
              <input
                type="checkbox"
                name="inStock"
                checked={
                  filters.inStock
                }
                onChange={
                  handleChange
                }
              />
              In Stock Only
            </label>

            <div className="flex gap-4 mt-8">
              <button
                onClick={
                  applyFilters
                }
                className="flex-1 py-4 rounded-2xl bg-cyan-500 text-white font-semibold"
              >
                Apply
              </button>

              <button
                onClick={
                  clearFilters
                }
                className="flex-1 py-4 rounded-2xl bg-red-500 text-white font-semibold"
              >
                Clear
              </button>

              <button
                onClick={() =>
                  setFilterOpen(
                    false
                  )
                }
                className="flex-1 py-4 rounded-2xl bg-gray-700 text-white font-semibold"
              >
                Cancel
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Home;