import Cart from '../models/Cart.js';
import Product from '../models/Product.js';


// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity || 1
      });
    }

    await cart.save();

    res.status(200).json({
      message: 'Product added to cart',
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET CART
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    }).populate('items.product');

    if (!cart) {
      return res.status(200).json({
        items: []
      });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE CART
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: 'Item not found'
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: 'Cart updated',
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// REMOVE ITEM
export const removeCartItem = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: 'Item removed',
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// CLEAR CART
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id
    });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      message: 'Cart cleared'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};