import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import transporter from '../config/email.js';

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d'
    }
  );
};

const generateOTP = () => {
  return Math.floor(
    100000 +
    Math.random() * 900000
  ).toString();
};

export const registerUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password
      } = req.body;

      const existingUser =
        await User.findOne({
          email
        });

      if (existingUser) {
        return res
          .status(400)
          .json({
            message:
              'User already exists'
          });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const otp =
        generateOTP();

      await User.create({
        name,
        email,
        password:
          hashedPassword,
        otp,
        otpExpiry:
          Date.now() +
          10 * 60 * 1000
      });

      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,
        to: email,
        subject:
          'Verify Your Account',
        html: `
          <h2>Email Verification</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>Valid for 10 minutes</p>
        `
      });

      res.status(201).json({
        message:
          'OTP sent to email'
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const verifyOTP =
  async (req, res) => {
    try {
      const {
        email,
        otp
      } = req.body;

      const user =
        await User.findOne({
          email
        });

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              'User not found'
          });
      }

      if (
        user.otp !== otp ||
        user.otpExpiry <
          Date.now()
      ) {
        return res
          .status(400)
          .json({
            message:
              'Invalid or expired OTP'
          });
      }

      user.isVerified = true;
      user.otp = null;
      user.otpExpiry = null;

      await user.save();

      res.status(200).json({
        message:
          'Account verified successfully'
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const loginUser =
  async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;

      const user =
        await User.findOne({
          email
        });

      if (!user) {
        return res
          .status(401)
          .json({
            message:
              'Invalid credentials'
          });
      }

      if (
        !user.isVerified
      ) {
        return res
          .status(401)
          .json({
            message:
              'Please verify your email first'
          });
      }

      const match =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!match) {
        return res
          .status(401)
          .json({
            message:
              'Invalid credentials'
          });
      }

      res.status(200).json({
        token:
          generateToken(
            user._id
          ),
        user
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const adminLogin =
  async (req, res) => {
    try {
      const {
        email,
        password
      } = req.body;

      const user =
        await User.findOne({
          email
        });

      if (!user) {
        return res
          .status(401)
          .json({
            message:
              'Invalid credentials'
          });
      }

      if (
        user.role !==
        'admin'
      ) {
        return res
          .status(403)
          .json({
            message:
              'Not an admin account'
          });
      }

      const match =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!match) {
        return res
          .status(401)
          .json({
            message:
              'Invalid credentials'
          });
      }

      res.status(200).json({
        token:
          generateToken(
            user._id
          ),
        user
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const getProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).select(
          '-password'
        );

      res.status(200).json(
        user
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const getMe =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).select(
          '-password -otp -otpExpiry'
        );

      res.status(200).json(
        user
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const updateProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      user.name =
        req.body.name ||
        user.name;

      user.email =
        req.body.email ||
        user.email;

      await user.save();

      res.status(200).json({
        message:
          'Profile updated',
        user
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };

export const changePassword =
  async (req, res) => {
    try {
      const {
        currentPassword,
        newPassword
      } = req.body;

      const user =
        await User.findById(
          req.user._id
        );

      const match =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!match) {
        return res
          .status(400)
          .json({
            message:
              'Current password incorrect'
          });
      }

      user.password =
        await bcrypt.hash(
          newPassword,
          10
        );

      await user.save();

      res.status(200).json({
        message:
          'Password changed successfully'
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };