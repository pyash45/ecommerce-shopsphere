import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';


// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id
    }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: 'Cart is empty'
      });
    }

    const totalAmount = cart.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id
    })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// ADMIN ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: 'Order not found'
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: 'Order updated successfully',
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createDirectOrder =
  async (req, res) => {
    try {
      const {
        productId,
        quantity,
        shippingAddress,
        paymentMethod
      } = req.body;

      const product =
        await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          message: 'Product not found'
        });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message:
            'Insufficient stock'
        });
      }

      const totalAmount =
        product.price * quantity;

      const order =
        await Order.create({
          user: req.user._id,

          items: [
            {
              product:
                product._id,
              quantity,
              price:
                product.price
            }
          ],

          totalAmount,
          shippingAddress,
          paymentMethod,

          paymentStatus:
            paymentMethod ===
            'ONLINE'
              ? 'Pending'
              : 'Pending'
        });

      product.stock =
        product.stock - quantity;

      await product.save();

      res.status(201).json({
        message:
          'Direct order created',
        order
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };