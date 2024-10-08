import { Category } from "../Category/Category.model.js";
import { Product } from "./Product.models.js";
import { SearchData } from "../Searching/Search.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/Cloudinary.js";

const addProduct = async (req, res) => {
  try {
    if (!req.body) {
      throw new ApiError(400, "Request body is missing or empty");
    }

    const {
      productTitle,
      description,
      oneTimePrice,
      subscriptionPrice,
      categoryName,
      productShortDescription,
      discountPercentage,
      rating,
      stock,
      status,
      visibility,
      productTags,
    } = req.body;

    if (
      ![
        productTitle,
        description,
        oneTimePrice,
        subscriptionPrice,
        categoryName,
        productShortDescription,
        discountPercentage,
        rating,
        stock,
        status,
        visibility,
        productTags,
      ].every((field) => field?.trim())
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existingProduct = await Product.findOne({ productTitle });
    if (existingProduct) {
      throw new ApiError(409, "Product with the same title already exists");
    }

    // Fetch the category by ID
    const category = await Category.findOne({ title: categoryName });
    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    const imageLocalPath = req.files?.image[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    if (!imageLocalPath || !thumbnailLocalPath) {
      throw new ApiError(400, "Image and Thumbnail files are required");
    }

    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!uploadedImage || !uploadedThumbnail) {
      throw new ApiError(400, "Failed to upload image or thumbnail");
    }

    const newProduct = await Product.create({
      productTitle,
      image: uploadedImage.url,
      thumbnail: uploadedThumbnail.url,
      brand,
      description,
      oneTimePrice,
      attribute,
      variation,
      subscriptionPrice,
      discountPercentage,
      rating,
      stock,
      category: category.title,
      subCategory,
      status,
      visibility,
      type,
      itemType,
      IsApproved
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: {
        ...newProduct.toObject(), // Convert Mongoose object to plain object
        category: category.title, // Include category name instead of ID
      },
    });
  } catch (error) {
    console.error("Error during product creation:", error);

    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }

    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.query; // Assuming the product ID is passed in the URL parameter

  // Check if product exists
  const product = await Product.findById(id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  // Delete the product
  await Product.findByIdAndDelete(id);

  return res.json({
    success: true,
    message: "Product deleted successfully",
  });
});

const getAllProducts = asyncHandler(async (req, res) => {
  // Retrieve all products
  const products = await Product.find();
  return res.json({
    success: true,
    data: products,
    message: "All products retrieved successfully",
  });
});
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.query; // Assuming the product ID is passed in the URL parameter

  // Find the product by ID
  const product = await Product.findById(id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  return res.json({
    success: true,
    data: product,
    message: "Product retrieved successfully",
  });
});
const updateProduct = asyncHandler(async (req, res) => {
  const {
    id
  } = req.body;

  // Check if ID is provided
  if (!id) {
    throw new ApiError(400, "Product ID is required");
  }

  const updateFields = {};

  // List of fields to update
  const fieldsToUpdate = [
    "productTitle",
    "description",
    "oneTimePrice",
    "subscriptionPrice",
    "categoryId",
    "productShortDescription",
    "discountPercentage",
    "rating",
    "stock",
    "status",
    "visibility",
    "productTags",
    "type",
    "itemType"
  ];

  // Iterate over fields and add to updateFields if provided
  fieldsToUpdate.forEach((field) => {
    if (req.body[field]) {
      updateFields[field] = req.body[field];
    }
  });

  // If images are being updated
  const imageLocalPath = req.files?.image?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  if (imageLocalPath && thumbnailLocalPath) {
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if (!uploadedImage || !uploadedThumbnail) {
      throw new ApiError(400, "Failed to upload image or thumbnail");
    }

    updateFields.image = uploadedImage.url;
    updateFields.thumbnail = uploadedThumbnail.url;
  }

  // Find and update the product
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: updateFields },
    { new: true }
  );

  if (!updatedProduct) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});
const buildQuery = (params) => {
  const query = {};

  if (params.productTitle) {
    query.productTitle = { $regex: params.productTitle, $options: 'i' }; // Case-insensitive regex
  }
  if (params.description) {
    query.description = { $regex: params.description, $options: 'i' };
  }
  if (params.oneTimePrice) {
    query.oneTimePrice = params.oneTimePrice;
  }
  if (params.subscriptionPrice) {
    query.subscriptionPrice = params.subscriptionPrice;
  }
  if (params.category) {
    query.category = params.category;
  }
  if (params.subCategory) {
    query.subCategory = params.subCategory;
  }
  if (params.discountPercentage) {
    query.discountPercentage = params.discountPercentage;
  }
  if (params.rating) {
    query.rating = params.rating;
  }
  if (params.stock) {
    query.stock = params.stock;
  }
  if (params.status) {
    query.status = params.status;
  }
  if (params.visibility) {
    query.visibility = params.visibility;
  }
  if (params.productTags) {
    query.productTags = { $in: params.productTags };
  }
  if (params.productShortDescription) {
    query.productShortDescription = { $regex: params.productShortDescription, $options: 'i' };
  }
  if (params.IsApproved) {
    query.IsApproved = params.IsApproved;
  }
  if (params.type) {
    query.type = params.type;
  }
  if (params.itemType) {
    query.itemType = params.itemType;
  }

  return query;
};

const searchProducts = asyncHandler(async (req, res) => {
  try {
    let searchParams = req.query.query;

    if (!searchParams) {
      return res.status(400).json(new ApiResponse(400, null, "Search params are required."));
    }

    const searchTerms = searchParams.split(' ');

    const query = {
      $and: searchTerms.map(term => ({
        $or: [
          { title: { $regex: term, $options: 'i' } },
          { description: { $regex: term, $options: 'i' } },
          { shortDescription: { $regex: term, $options: 'i' } },
          { categories: { $regex: term, $options: 'i' } },
          { stocks: { $regex: term, $options: 'i' } },
          { brand: { $regex: term, $options: 'i' } },
          { productTags: { $regex: term, $options: 'i' } },
          { type: { $regex: term, $options: 'i' } },
          { itemType: { $regex: term, $options: 'i' } },
          { tags: { $regex: term, $options: 'i' } },
        ],
      })),
    };

    const products = await Product.find(query);

    if (products.length === 0) {
      await SearchData.create({ searchParam: searchParams });

      // Throw a 404 error if no products are found
      throw new ApiError(404, "No products found matching the criteria.");
    }

    // Return the found products
    return res.json(new ApiResponse(200, products, "Products retrieved successfully"));

  } catch (error) {
    // Handle unexpected errors
    return res.status(error.statusCode || 500).json({
      status: 'error',
      message: error.message || 'An unexpected error occurred',
    });
  }
});
const approveProduct = asyncHandler(async (req, res) => {
  const Id =req.query.id;

  // Find the product
  const product = await Product.findById(Id);
  if (!product) {
    throw new ApiError(404, "product not found");
  }

  // Update the IsApproved field to true
  product.IsApproved = true;
  await product.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, { isApproved: product.IsApproved }, "product approval status updated successfully"));
});


export {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  searchProducts,
  approveProduct
};
