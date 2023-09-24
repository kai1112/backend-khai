const Product = require("../models/product.model");
const createLogger = require("../middleware/logger");

const create = async (req, res) => {
  try {
    //   if (req.user.roleID.name === "admin" && req.user.roleID.status === 1) {
    let product = await Product.findOne({ name: req.body.name });
    if (product && product.status !== 3)
      return res.json({ status: 404, message: "Product has already!!!" });
    if (req.files["avatar"] == undefined) {
      res.json({
        message: "product need description avatar",
        status: 404,
      });
    }
    if (req.files["backgroud_avatar"] == undefined) {
      res.json({
        message: "product has no backgroud-avatar",
        status: 404,
      });
    }
    let img = [];
    for (let i = 0; i < req.files["backgroud_avatar"].length; i++) {
      img.push("/" + req.files["backgroud_avatar"][i].path);
    }
    let newProduct = await Product.create({
      name: req.body.name,
      code: req.body.code,
      detail: req.body.detail,
      amount: req.body.amount,
      price: req.body.price,
      voucher: req.body.voucher,
      brandID: req.body.brandID,
      avatar: "/" + req.files["avatar"][0].path,
      backgroud_avatar: JSON.stringify(img),
    });
    if (!newProduct)
      return res.json({
        status: 404,
        message: "Create a new product failed!",
      });
    return res.json({
      status: 200,
      message: "Create a product successfully!!!",
    });
    // }
  } catch (err) {
    createLogger.error(err);
  }
};

const view = async (req, res) => {
  try {
    let product = await Product.find({ status: { $ne: 3 } }).populate(
      "voucherID"
    );
    if (!product || product.length === 0)
      return res.json({ status: 404, message: "Product not found!!!" });
    return res.json({
      status: 200,
      message: "Successfully!!!",
      data: product,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const update = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.json({ status: 404, message: "Product not found!!!" });
    if (req.body.name) product.name = req.body.name;
    if (req.body.amount) product.amount = req.body.amount;
    if (req.body.price) product.price = req.body.price;
    if (req.body.status || req.body.amount == 0 || product.amount)
      product.status = 2;
    if (req.body.voucher) product.vocherID = req.body.voucher;
    let UpdateProduct = await Product.findOneAndUpdate(product);
    if (!UpdateProduct)
      return res.json({ stauts: 404, message: "Update product failed!!!" });
    return res.json({
      stauts: 200,
      message: "Update product successfully!!!",
      data: product,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const remove = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.json({ status: 404, message: "Product not found!!!" });
    if (product.status === 2)
      return res.json({ status: 404, message: "Product has been removed!!!" });
    product.status = 2;
    let UpdateProduct = await Product.findOneAndUpdate(product);
    if (!UpdateProduct)
      return res.json({ status: 404, message: "Remove product failed!" });
    return res.json({
      status: 404,
      message: "Remove product successfully!!!",
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const findProduct = async (req, res) => {
  try {
    let product = await Product.find({
      name: { $regex: req.query.name, $options: "i" },
      status: { $ne: 3 },
    }).populate("voucherID");
    if (!product)
      return res.json({
        status: 404,
        message: "product not found!!!",
      });
    return res.json({
      status: 200,
      message: "Find product successfully",
      data: product,
    });
  } catch (err) {
    createLogger.info(err);
    createLogger.error(err);
  }
};
module.exports = { create, update, remove, view, findProduct };
