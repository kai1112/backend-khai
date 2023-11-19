const router = require("express").Router();

// using router Brand
const Brand = require("./brand.router");
router.use("/brand", Brand);

// using router Category
const Category = require("./category.router");
router.use("/category", Category);

// using router Product
const Product = require("./product.router");
router.use("/product", Product);
const authRoute = require("./auth.router");
router.use("/auth", authRoute);

// using router role
const Role = require("./role.router");
router.use("/role", Role);

// using router User
const User = require("./user.router");
router.use("/user", User);

// using router Voucher
const Voucher = require("./voucher.router");
router.use("/voucher", Voucher);

module.exports = router;
