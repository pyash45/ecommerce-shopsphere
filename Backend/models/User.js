import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    pincode: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    country: {
      type: String,
      default: 'India'
    },

    addressLine: {
      type: String,
      required: true
    },

    landmark: {
      type: String
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    otp: String,

    otpExpiry: Date,

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },

    addresses: [addressSchema]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model(
  'User',
  userSchema
);

export default User;