import { Router } from "express";
import { upload } from "../../middlewares/FileUpload.middlwares.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  searchProducts,
  approveProduct
} from "./product.controler.js";

const router = Router();
router.route("/add").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  addProduct
);
router.route("/delete").delete(deleteProduct);
router.route("/products").get(getAllProducts);
router.route("/product").get(getSingleProduct);
router.route("/approveproduct").patch(approveProduct);
router.route("/searchproduct").get(searchProducts);
router.route("/update").patch(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  updateProduct
);

export default router;
