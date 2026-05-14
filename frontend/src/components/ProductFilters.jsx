import { useState } from 'react';

function ProductFilters({
  onApplyFilters
}) {
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

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFilters({
      ...filters,
      [name]:
        type ===
        'checkbox'
          ? checked
          : value
    });
  };

  const applyFilters =
    () => {
      onApplyFilters(filters);
    };

  const clearFilters =
    () => {
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
      onApplyFilters(reset);
    };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 space-y-4">

      <h2 className="text-2xl font-bold text-white">
        Filters
      </h2>

      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={
          filters.search
        }
        onChange={
          handleChange
        }
        className="w-full p-3 rounded-xl bg-slate-800 text-white"
      />

      <select
        name="category"
        value={
          filters.category
        }
        onChange={
          handleChange
        }
        className="w-full p-3 rounded-xl bg-slate-800 text-white"
      >
        <option value="">
          All Categories
        </option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Fashion">
          Fashion
        </option>

        <option value="Books">
          Books
        </option>

        <option value="Home">
          Home
        </option>
      </select>

      <div className="grid grid-cols-2 gap-3">
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
          className="p-3 rounded-xl bg-slate-800 text-white"
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
          className="p-3 rounded-xl bg-slate-800 text-white"
        />
      </div>

      <select
        name="rating"
        value={
          filters.rating
        }
        onChange={
          handleChange
        }
        className="w-full p-3 rounded-xl bg-slate-800 text-white"
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
        value={filters.sort}
        onChange={
          handleChange
        }
        className="w-full p-3 rounded-xl bg-slate-800 text-white"
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

      <label className="flex items-center gap-3 text-white">
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

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={
            applyFilters
          }
          className="py-3 rounded-xl bg-cyan-500 text-white font-semibold"
        >
          Apply
        </button>

        <button
          onClick={
            clearFilters
          }
          className="py-3 rounded-xl bg-red-500 text-white font-semibold"
        >
          Clear
        </button>
      </div>

    </div>
  );
}

export default ProductFilters;