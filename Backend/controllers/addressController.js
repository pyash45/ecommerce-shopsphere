import User from '../models/User.js';


// GET ADDRESSES
export const getAddresses =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      res.status(200).json(
        user.addresses
      );

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };


// ADD ADDRESS
export const addAddress =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      const address =
        req.body;

      if (
        user.addresses.length ===
        0
      ) {
        address.isDefault =
          true;
      }

      user.addresses.push(
        address
      );

      await user.save();

      res.status(201).json({
        message:
          'Address added successfully',
        addresses:
          user.addresses
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };


// UPDATE ADDRESS
export const updateAddress =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      const address =
        user.addresses.id(
          req.params.id
        );

      if (!address) {
        return res
          .status(404)
          .json({
            message:
              'Address not found'
          });
      }

      Object.assign(
        address,
        req.body
      );

      await user.save();

      res.status(200).json({
        message:
          'Address updated',
        addresses:
          user.addresses
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };


// DELETE ADDRESS
export const deleteAddress =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      const address =
        user.addresses.id(
          req.params.id
        );

      if (!address) {
        return res
          .status(404)
          .json({
            message:
              'Address not found'
          });
      }

      address.deleteOne();

      if (
        address.isDefault &&
        user.addresses.length >
          1
      ) {
        user.addresses[0].isDefault =
          true;
      }

      await user.save();

      res.status(200).json({
        message:
          'Address deleted',
        addresses:
          user.addresses
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };


// SET DEFAULT
export const setDefaultAddress =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      user.addresses.forEach(
        (addr) => {
          addr.isDefault =
            false;
        }
      );

      const address =
        user.addresses.id(
          req.params.id
        );

      if (!address) {
        return res
          .status(404)
          .json({
            message:
              'Address not found'
          });
      }

      address.isDefault =
        true;

      await user.save();

      res.status(200).json({
        message:
          'Default address updated',
        addresses:
          user.addresses
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  };