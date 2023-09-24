const Voucher = require("../models/voucher.model");
const createLogger = require("../middleware/logger");

const create = async (req, res) => {
  try {
    //   if (req.user.roleID.name === "admin" && req.user.roleID.status === 1) {
    let timeNow = getTime(new Date());
    let price = 0;
    if (!req.body.name)
      return res.json({ status: 404, message: "Name is required" });
    if (!req.body.code)
      return res.json({ status: 404, message: "code is required" });
    if (getTime(req.body.StartTime) > getTime(req.body.EndTime))
      return res.json({ status: 404, message: "End time need > start time" });
    if (timeNow > getTime(req.body.EndTime))
      return res.json({ status: 404, message: "End time need > now time" });
    if (req.body.price) price = req.body.price;
    let voucher = await Voucher.findOne({ name: req.body.name });

    if (voucher && product.status === 1)
      return res.json({ status: 404, message: "Voucher has already!!!" });
    let newVoucher = await Voucher.create({
      name: req.body.name,
      code: req.body.code,
      detail: req.body.detail,
      price: req.body.price,
      voucher: req.body.voucher,
      StartTime: getTime(new Date(req.body.StartTime)),
      EndTime: getTime(new Date(req.body.EndTime)),
    });
    if (!newVoucher)
      return res.json({
        status: 404,
        message: "Create a new voucher failed!",
      });
    return res.json({
      status: 200,
      message: "Create a voucher successfully!!!",
    });
    // }
  } catch (err) {
    createLogger.error(err);
  }
};

const view = async (req, res) => {
  try {
    let voucher = await Voucher.find();

    if (!voucher || voucher.length === 0)
      return res.json({ status: 404, message: "Voucher not found!!!" });
    return res.json({
      status: 200,
      message: "Successfully!!!",
      data: voucher,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const update = async (req, res) => {
  try {
    let voucher = await Voucher.findById(req.params.id);
    if (!voucher)
      return res.json({ status: 404, message: "Voucher not found!!!" });
    if (getTime(new Date(req.body.EndTime)) > getTime(new Date())) {
      voucher.EndTime = req.body.EndTime;
      voucher.status = 1;
    }
    let UpdateVoucher = await Voucher.findOneAndUpdate(voucher);
    if (!UpdateVoucher)
      return res.json({ stauts: 404, message: "Update voucher failed!!!" });
    return res.json({
      stauts: 200,
      message: "Update voucher successfully!!!",
      data: voucher,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const remove = async (req, res) => {
  try {
    let voucher = await Voucher.findById(req.params.id);
    if (!voucher)
      return res.json({ status: 404, message: "voucher not found!!!" });
    if (voucher.status === 3)
      return res.json({ status: 404, message: "voucher has been removed!!!" });
    product.status = 3;
    let UpdateVoucher = await Voucher.findOneAndUpdate(voucher);
    if (!UpdateVoucher)
      return res.json({ status: 404, message: "Remove voucher failed!" });
    return res.json({
      status: 404,
      message: "Remove voucher successfully!!!",
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
    });
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
