function Footer() {
  return (
    <footer className="mt-20 bg-white/5 backdrop-blur-2xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-3xl font-black text-white">
              Shop
              <span className="text-cyan-400">
                Sphere
              </span>
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Premium ecommerce shopping
              experience with modern design,
              secure payments and fast delivery.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-bold text-white mb-5">
              Quick Links
            </h3>

            <div className="space-y-3 text-gray-400">
              <p className="hover:text-cyan-400 cursor-pointer transition">
                Home
              </p>

              <p className="hover:text-cyan-400 cursor-pointer transition">
                Products
              </p>

              <p className="hover:text-cyan-400 cursor-pointer transition">
                Orders
              </p>

              <p className="hover:text-cyan-400 cursor-pointer transition">
                Cart
              </p>
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-xl font-bold text-white mb-5">
              Categories
            </h3>

            <div className="space-y-3 text-gray-400">
              <p>Electronics</p>
              <p>Fashion</p>
              <p>Gaming</p>
              <p>Books</p>
            </div>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-xl font-bold text-white mb-5">
              Stay Updated
            </h3>

            <p className="text-gray-400 mb-4">
              Get latest offers and updates.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-l-2xl bg-slate-900 text-white outline-none border border-white/10"
              />

              <button className="px-5 bg-cyan-500 rounded-r-2xl text-white font-semibold hover:bg-cyan-400 transition">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 ShopSphere. All rights reserved.
          </p>

          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-cyan-500 transition">
              f
            </button>

            <button className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-cyan-500 transition">
              X
            </button>

            <button className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-cyan-500 transition">
              in
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;