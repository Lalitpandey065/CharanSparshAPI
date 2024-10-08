import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import

import adminrouter from "../src/Modules/Admin/Admin.routes.js";
import userrouter from "../src/Modules/User/user.routes.js";
import tax from "../src/Modules/Tax/tax.routes.js";
import coupon from "../src/Modules/Coupon/coupon.routes.js";
import deliverycharg from "../src/Modules/Delivery/Delivercharg.routes.js";
import category from "../src/Modules/Category/Category.routes.js";
import Banner from "../src/Modules/Banner/Banner.routes.js";
import Product from "../src/Modules/Product/Product.routes.js";
import cart from "../src/Modules/Cart/cart.routes.js";
import Order from "../src/Modules/Order/Order.routes.js";
import paymentRoutes from "../src/Modules/Payment/Payments.routes.js";
import privacy from "../src/Modules/Privacypolicy/Privacypolicy.routes.js";
import termscondtion from "../src/Modules/TermAndConditions/Termscondition.routes.js";
import blogs from "../src/Modules/Blog/Blog.routes.js";
import subcategory from "../src/Modules/SubCategory/Subcaegory.routes.js";
import addon from "../src/Modules/Addon/Addon.routes.js";
import Sliders from "../src/Modules/Slider/Slider.routes.js";
import ReturnPolicy from "../src/Modules/ReturnPolicy/ReturnPolicy.routes.js";
import faqs from "../src/Modules/FAQS/Faq.routes.js";
import testimonials from "../src/Modules/Testimonial/Testimonial.routes.js";
import Employee from "../src/Modules/Employee/Employee.routes.js";
import Notification from "../src/Modules/Notification/Notification.routes.js";
import EmployeeRole from "../src/Modules/EmployeeRole/EmployeeRole.routes.js";
import wishlist from "../src/Modules/Wishlist/Wishlist.routes.js";
import Dashboard from "../src/Modules/DashBoard/DashBoard.routes.js";

//routes declearetion
app.use("/api/v1/admin", adminrouter);
app.use("/api/v1/user", userrouter);
app.use("/api/v1/tax", tax);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/deliverycharg", deliverycharg);
app.use("/api/v1/category", category);
app.use("/api/v1/Banner", Banner);
app.use("/api/v1/Product", Product);
app.use("/api/v1/cart", cart);
app.use("/api/v1/order", Order);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/privacy", privacy);
app.use("/api/v1/terms", termscondtion);
app.use("/api/v1/blog", blogs);
app.use("/api/v1/subcategory", subcategory);
app.use("/api/v1/addons", addon);
app.use("/api/v1/slider", Sliders);
app.use("/api/v1/Returnpolicy", ReturnPolicy);
app.use("/api/v1/faq", faqs);
app.use("/api/v1/testimonial", testimonials);
app.use("/api/v1/Employee", Employee);
app.use("/api/v1/Notification", Notification);
app.use("/api/v1/EmployeeRole", EmployeeRole);
app.use("/api/v1/wishlist", wishlist);
app.use("/api/v1/Dashboard", Dashboard);
export { app };


// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// const app = express();
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));
// app.use(cookieParser());

// // Routes import

// import adminrouter from "./Modules/Admin/Admin.routes.js";
// import userrouter from "./Modules/User/user.routes.js";
// import tax from "./Modules/Tax/Tax.routes.js";
// import coupon from "./Modules/Coupon/coupon.routes.js";
// import deliverycharg from "./Modules/Delivery/Delivercharg.routes.js";
// import category from "./Modules/Category/Category.routes.js";
// import Banner from "./Modules/Banner/Banner.routes.js";
// import Product from "./Modules/Product/Product.routes.js";
// import cart from "./Modules/Cart/cart.routes.js";
// import Order from "./Modules/Order/Order.routes.js";
// import paymentRoutes from "./Modules/Payment/Payments.routes.js";
// //routes declearetion

// app.use("/api/v1/admin", adminrouter);
// app.use("/api/v1/user", userrouter);
// app.use("/api/v1/tax", tax);
// app.use("/api/v1/coupon", coupon);
// app.use("/api/v1/deliverycharg", deliverycharg);
// app.use("/api/v1/category", category);
// app.use("/api/v1/Banner", Banner);
// app.use("/api/v1/Product", Product);
// app.use("/api/v1/cart", cart);
// app.use("/api/v1/order", Order);
// app.use("/api/v1/payments", paymentRoutes);
// export { app };
