import Product from '../models/Product.js';


// GET ALL PRODUCTS
export const getProducts = async (
  req,
  res
) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      rating,
      inStock,
      sort
    } = req.query;

    let query = {};

    // SEARCH
    if (search) {
      query.name = {
        $regex: search,
        $options: 'i'
      };
    }

    // CATEGORY
    if (category) {
      query.category = category;
    }

    // PRICE
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte =
          Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte =
          Number(maxPrice);
      }
    }

    // RATING
    if (rating) {
      query.rating = {
        $gte: Number(rating)
      };
    }

    // STOCK
    if (inStock === 'true') {
      query.stock = {
        $gt: 0
      };
    }

    let sortOption = {
      createdAt: -1
    };

    // SORTING
    if (sort === 'low-high') {
      sortOption = {
        price: 1
      };
    }

    if (sort === 'high-low') {
      sortOption = {
        price: -1
      };
    }

    if (sort === 'top-rated') {
      sortOption = {
        rating: -1
      };
    }

    if (sort === 'newest') {
      sortOption = {
        createdAt: -1
      };
    }

    const products =
      await Product.find(query)
        .sort(sortOption);

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message:
        error.message
    });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            'Product not found'
        });
      }

      res.status(200).json(product);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };


// CREATE PRODUCT
export const createProduct =
  async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        brand,
        category,
        stock,
        specifications
      } = req.body;

      const product =
        await Product.create({
          name,
          description,
          price,
          brand,
          category,
          stock,
          specifications,
          image: req.file.path
        });

      res.status(201).json({
        message:
          'Product created successfully',
        product
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };


// UPDATE PRODUCT
export const updateProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            'Product not found'
        });
      }

      product.name =
        req.body.name || product.name;

      product.description =
        req.body.description ||
        product.description;

      product.price =
        req.body.price || product.price;

      product.brand =
        req.body.brand || product.brand;

      product.category =
        req.body.category ||
        product.category;

      product.stock =
        req.body.stock || product.stock;

      product.specifications =
        req.body.specifications ||
        product.specifications;

      if (req.file) {
        product.image = req.file.path;
      }

      await product.save();

      res.status(200).json({
        message:
          'Product updated successfully',
        product
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };


// DELETE PRODUCT
export const deleteProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            'Product not found'
        });
      }

      await product.deleteOne();

      res.status(200).json({
        message:
          'Product deleted successfully'
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };


// ADD REVIEW
export const addReview = async (
  req,
  res
) => {
  try {
    const {
      rating,
      comment
    } = req.body;

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          'Product not found'
      });
    }

    const alreadyReviewed =
      product.reviews.find(
        (review) =>
          review.user.toString() ===
          req.user._id.toString()
      );

    if (alreadyReviewed) {
      return res.status(400).json({
        message:
          'Product already reviewed'
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);

    product.numReviews =
      product.reviews.length;

    product.rating =
      product.reviews.reduce(
        (sum, item) =>
          sum + item.rating,
        0
      ) / product.reviews.length;

    await product.save();

    res.status(201).json({
      message: 'Review added'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// RELATED PRODUCTS
export const getRelatedProducts =
  async (req, res) => {
    try {
      const product =
        await Product.findById(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            'Product not found'
        });
      }

      const related =
        await Product.find({
          category: product.category,
          _id: {
            $ne: product._id
          }
        }).limit(4);

      res.status(200).json(related);

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };