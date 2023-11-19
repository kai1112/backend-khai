const Product_order = require("../models/product_order");
const createLogger = require("../middleware/logger");

const create = async (req, res) => {
  try {
    if (!req.body.product)
      return res.json({ status: 404, message: "product is required" });
    if (!req.body.total)
      return res.json({ status: 404, message: "total is required" });
    let newProduct_order = await Product.create({
      product: JSON.stringify(req.body.product),
      total: req.body.total,
      userID: req.user._id,
    });
    if (!newProduct_order)
      return res.json({
        status: 404,
        message: "Create a new newProduct_order failed!",
      });
    return res.json({
      status: 200,
      message: "Create a newProduct_order successfully!!!",
    });
    // }
  } catch (err) {
    createLogger.error(err);
  }
};

const view = async (req, res) => {
  try {
    let product_order = await Product_order.find({ userID: req.user._id });
    if (!product_order || product_order.length === 0)
      return res.json({ status: 404, message: "product_order not found!!!" });
    return res.json({
      status: 200,
      message: "Successfully!!!",
      data: product_order,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const update = async (req, res) => {
  try {
    let product_order = await Product_order.findById(req.params.id);
    if (!product_order)
      return res.json({ status: 404, message: "product_order not found!!!" });
    if (req.body.product) product_order.product = req.body.product;
    if (req.body.status) product_order.status = req.body.status;
    let UpdateProduct_order = await Product_order.findOneAndUpdate(
      product_order
    );
    if (!UpdateProduct_order)
      return res.json({
        stauts: 404,
        message: "Update UpdateProduct_order failed!!!",
      });
    return res.json({
      stauts: 200,
      message: "Update UpdateProduct_order successfully!!!",
      data: UpdateProduct_order,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const remove = async (req, res) => {
  try {
    let product_order = await Product_order.findById(req.params.id);
    if (!product_order)
      return res.json({ status: 404, message: "Product_order not found!!!" });
    if (product_order.status === 4)
      return res.json({
        status: 404,
        message: "Product_order has been canceled!!!",
      });
    product_order.status = 4;
    let UpdateProduct_order = await Product_order.findOneAndUpdate(
      product_order
    );
    if (!UpdateProduct_order)
      return res.json({
        status: 404,
        message: "Canceled product_order failed!",
      });
    return res.json({
      status: 404,
      message: "Canceled product_order successfully!!!",
    });
  } catch (err) {
    createLogger.error(err);
  }
};

// const findProduct = async (req, res) => {
//   try {
//     let product = await Product.find({
//       name: { $regex: req.query.name, $options: "i" },
//       status: { $ne: 3 },
//     }).populate("voucherID");
//     if (!product)
//       return res.json({
//         status: 404,
//         message: "product not found!!!",
//       });
//     return res.json({
//       status: 200,
//       message: "Find product successfully",
//       data: product,
//     });
//   } catch (err) {
//     createLogger.info(err);
//     createLogger.error(err);
//   }
// };
module.exports = { create, update, remove, view };
