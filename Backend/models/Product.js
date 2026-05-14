import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    name: {
      type: String
    },

    rating: {
      type: Number,
      required: true
    },

    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    brand: {
      type: String,
      default: 'Generic'
    },

    category: {
      type: String,
      default: 'General'
    },

    stock: {
      type: Number,
      default: 10
    },

    specifications: {
      type: Object,
      default: {}
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      default: 0
    },

    numReviews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model(
  'Product',
  productSchema
);

export default Product;