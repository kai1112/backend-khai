const Brand = require("../models/brand.model");
const createLogger = require("../middleware/logger");

const create = async (req, res) => {
  try {
    //   if (req.user.roleID.name === "admin" && req.user.roleID.status === 1) {
    let brand = await Brand.findOne({ name: req.body.name });
    if (brand)
      return res.json({ status: 404, message: "Brand has already!!!" });
    let newBrand = await Brand.create({
      name: req.body.name,
      categoryID: req.body.categoryID,
    });
    if (!newBrand)
      return res.json({ status: 404, message: "Create a new brand failed!" });
    return res.json({ status: 200, message: "Create a brand successfully!!!" });
    // }
  } catch (err) {
    createLogger.error(err);
  }
};

const view = async (req, res) => {
  try {
    let brand = await Brand.find();
    if (!brand || brand.length == 0)
      return res.json({ status: 404, message: "Brand not found!!!" });
    return res.json({ status: 200, message: "Successfully!!!", data: brand });
  } catch (err) {
    createLogger.error(err);
  }
};

const update = async (req, res) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) return res.json({ status: 404, message: "Brand not found!!!" });
    if (req.body.name) brand.name = req.body.name;
    brand.stauts = 1;
    if (req.body.categoryID) brand.categoryID = req.body.categoryID;
    let UpdateBrand = await Brand.findOneAndUpdate(brand);
    if (!UpdateBrand)
      return res.json({ stauts: 404, message: "Update brand failed!!!" });
    return res.json({
      stauts: 200,
      message: "Update brand successfully!!!",
      data: UpdateBrand,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const remove = async (req, res) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) return res.json({ status: 404, message: "Brand not found!!!" });
    if (brand.status == 2)
      return res.json({ status: 404, message: "brand has removed!" });
    brand.status = 2;
    let updateBrand = await Brand.findOneAndUpdate(brand);
    if (!updateBrand)
      return res.json({ status: 404, message: "Remove brand failed!" });
    return res.json({ status: 404, message: "Remove brand successfully!!!" });
  } catch (err) {
    createLogger.error(err);
  }
};
module.exports = { create, update, remove, view };
