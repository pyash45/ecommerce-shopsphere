import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';


// DASHBOARD STATS
export const getDashboardStats =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments();

      const totalProducts =
        await Product.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      const paidOrders =
        await Order.find({
          paymentStatus: 'Paid'
        });

      const totalRevenue =
        paidOrders.reduce(
          (sum, order) =>
            sum +
            order.totalAmount,
          0
        );

      res.status(200).json({
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };


// RECENT ORDERS
export const getRecentOrders =
  async (req, res) => {
    try {
      const orders =
        await Order.find()
          .populate(
            'user',
            'name email'
          )
          .populate(
            'items.product',
            'name price image'
          )
          .sort({
            createdAt: -1
          })
          .limit(10);

      res.status(200).json(
        orders
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };


// TOP PRODUCTS
export const getTopProducts =
  async (req, res) => {
    try {
      const orders =
        await Order.find().populate(
          'items.product'
        );

      const productMap =
        {};

      orders.forEach(
        (order) => {
          order.items.forEach(
            (item) => {
              const id =
                item.product?._id?.toString();

              if (!id) return;

              if (
                !productMap[id]
              ) {
                productMap[id] =
                  {
                    product:
                      item.product,
                    quantity: 0,
                    revenue: 0
                  };
              }

              productMap[
                id
              ].quantity +=
                item.quantity;

              productMap[
                id
              ].revenue +=
                item.quantity *
                item.price;
            }
          );
        }
      );

      const topProducts =
        Object.values(
          productMap
        )
          .sort(
            (
              a,
              b
            ) =>
              b.quantity -
              a.quantity
          )
          .slice(0, 5);

      res.status(200).json(
        topProducts
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };


// SALES CHART
export const getSalesChart =
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          paymentStatus: 'Paid'
        });

      const monthlySales =
        {};

      orders.forEach(
        (order) => {
          const date =
            new Date(
              order.createdAt
            );

          const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

          if (
            !monthlySales[
              key
            ]
          ) {
            monthlySales[
              key
            ] = 0;
          }

          monthlySales[
            key
          ] +=
            order.totalAmount;
        }
      );

      const chartData =
        Object.entries(
          monthlySales
        ).map(
          ([
            month,
            revenue
          ]) => ({
            month,
            revenue
          })
        );

      res.status(200).json(
        chartData
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };