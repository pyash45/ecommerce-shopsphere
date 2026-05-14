import { useEffect, useState } from 'react';
import API from '../../api';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

import AdminSidebar from '../../components/AdminSidebar';
import ProductList from './ProductList';

function AdminDashboard() {
  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0
    });

  const [salesData, setSalesData] =
    useState([]);

  const [recentOrders, setRecentOrders] =
    useState([]);

  const [topProducts, setTopProducts] =
    useState([]);

  const adminToken =
    localStorage.getItem(
      'admin'
    );

  const authHeaders = {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  };

  const fetchStats = async () => {
    try {
      const res =
        await API.get(
          '/admin/stats',
          authHeaders
        );

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSalesChart =
    async () => {
      try {
        const res =
          await API.get(
            '/admin/sales-chart',
            authHeaders
          );

        setSalesData(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchRecentOrders =
    async () => {
      try {
        const res =
          await API.get(
            '/admin/recent-orders',
            authHeaders
          );

        setRecentOrders(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const fetchTopProducts =
    async () => {
      try {
        const res =
          await API.get(
            '/admin/top-products',
            authHeaders
          );

        setTopProducts(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchStats();
    fetchSalesChart();
    fetchRecentOrders();
    fetchTopProducts();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value:
        stats.totalUsers,
      color:
        'from-cyan-500 to-blue-500'
    },
    {
      title: 'Products',
      value:
        stats.totalProducts,
      color:
        'from-purple-500 to-pink-500'
    },
    {
      title: 'Orders',
      value:
        stats.totalOrders,
      color:
        'from-emerald-500 to-green-500'
    },
    {
      title:
        'Revenue',
      value: `₹${stats.totalRevenue}`,
      color:
        'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar />

      <div className="flex-1 p-8 lg:p-10 overflow-y-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-black text-white">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 text-lg mt-3 font-medium">
            Analytics & platform performance
          </p>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {statCards.map(
            (card) => (
              <div
                key={
                  card.title
                }
                className={`bg-gradient-to-br ${card.color} rounded-3xl p-6 shadow-2xl`}
              >
                <p className="text-white/80 text-lg font-semibold">
                  {
                    card.title
                  }
                </p>

                <h2 className="text-4xl font-black text-white mt-4">
                  {
                    card.value
                  }
                </h2>
              </div>
            )
          )}
        </div>

        {/* SALES */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl mb-10">
          <h2 className="text-3xl font-bold text-white mb-8">
            Revenue Trend
          </h2>

          <div className="h-[400px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={salesData}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06b6d4"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-8">
            Top Selling Products
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {topProducts.map(
              (item) => (
                <div
                  key={
                    item.product._id
                  }
                  className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl"
                >
                  <img
                    src={
                      item.product.image
                    }
                    alt={
                      item.product.name
                    }
                    className="w-full h-48 object-cover rounded-2xl"
                  />

                  <h3 className="text-2xl font-bold text-white mt-5">
                    {
                      item.product.name
                    }
                  </h3>

                  <p className="text-gray-400 mt-3 text-lg">
                    Sold:{' '}
                    <span className="text-cyan-400 font-bold">
                      {
                        item.quantity
                      }
                    </span>
                  </p>

                  <p className="text-gray-400 mt-2 text-lg">
                    Revenue:{' '}
                    <span className="text-green-400 font-bold">
                      ₹
                      {
                        item.revenue
                      }
                    </span>
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl mb-10 overflow-x-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            Recent Orders
          </h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 text-gray-300 text-lg">
                  Customer
                </th>
                <th className="py-4 text-gray-300 text-lg">
                  Amount
                </th>
                <th className="py-4 text-gray-300 text-lg">
                  Payment
                </th>
                <th className="py-4 text-gray-300 text-lg">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map(
                (order) => (
                  <tr
                    key={
                      order._id
                    }
                    className="border-b border-white/5"
                  >
                    <td className="py-4 text-white font-medium">
                      {
                        order.user
                          ?.name
                      }
                    </td>

                    <td className="py-4 text-cyan-400 font-semibold">
                      ₹
                      {
                        order.totalAmount
                      }
                    </td>

                    <td className="py-4 text-white">
                      {
                        order.paymentStatus
                      }
                    </td>

                    <td className="py-4 text-white">
                      {
                        order.status
                      }
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8">
            Product Management
          </h2>

          <ProductList />
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;