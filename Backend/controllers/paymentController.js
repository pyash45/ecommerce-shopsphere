import Razorpay from 'razorpay';
import crypto from 'crypto';

import Order from '../models/Order.js';
import Product from '../models/Product.js';

const getRazorpay = () => {
  if (
    !process.env.RAZORPAY_KEY_ID ||
    !process.env.RAZORPAY_KEY_SECRET
  ) {
    throw new Error(
      'Razorpay environment variables missing'
    );
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:
      process.env.RAZORPAY_KEY_SECRET
  });
};


// CREATE PAYMENT ORDER
export const createPaymentOrder =
  async (req, res) => {
    try {
      const { amount } = req.body;

      if (!amount) {
        return res.status(400).json({
          message: 'Amount required'
        });
      }

      const razorpay =
        getRazorpay();

      const options = {
        amount:
          Number(amount) * 100,
        currency: 'INR',
        receipt:
          'receipt_' +
          Date.now()
      };

      const razorpayOrder =
        await razorpay.orders.create(
          options
        );

      res.status(200).json({
        success: true,
        order: razorpayOrder
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };


// VERIFY PAYMENT
export const verifyPayment =
  async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        productId,
        quantity,
        shippingAddress
      } = req.body;

      const expectedSignature =
        crypto
          .createHmac(
            'sha256',
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            razorpay_order_id +
              '|' +
              razorpay_payment_id
          )
          .digest('hex');

      if (
        expectedSignature !==
        razorpay_signature
      ) {
        return res.status(400).json({
          message:
            'Invalid payment signature'
        });
      }

      const product =
        await Product.findById(
          productId
        );

      if (!product) {
        return res.status(404).json({
          message:
            'Product not found'
        });
      }

      if (
        product.stock <
        Number(quantity)
      ) {
        return res.status(400).json({
          message:
            'Insufficient stock'
        });
      }

      const totalAmount =
        product.price *
        Number(quantity);

      const order =
        await Order.create({
          user: req.user._id,

          items: [
            {
              product:
                product._id,
              quantity:
                Number(quantity),
              price:
                product.price
            }
          ],

          totalAmount,

          shippingAddress,

          paymentMethod:
            'ONLINE',

          paymentStatus:
            'Paid',

          status:
            'Processing'
        });

      product.stock =
        product.stock -
        Number(quantity);

      await product.save();

      res.status(201).json({
        success: true,
        message:
          'Payment verified successfully',
        order
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };