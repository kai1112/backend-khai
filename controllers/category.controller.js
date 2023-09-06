const Category = require("../models/category.model");
const createLogger = require("../middleware/logger");

const create = async (req, res) => {
  try {
    //   if (req.user.roleID.name === "admin" && req.user.roleID.status === 1) {
    let category = await Category.findOne({ name: req.body.name });
    if (category)
      return res.json({ status: 404, message: "Category has already!!!" });
    let newCategory = await Category.create({
      name: req.body.name,
    });
    if (!newCategory)
      return res.json({
        status: 404,
        message: "Create a new category failed!",
      });
    return res.json({
      status: 200,
      message: "Create a category successfully!!!",
    });
    // }
  } catch (err) {
    createLogger.error(err);
  }
};

const view = async (req, res) => {
  try {
    let category = await Category.find();
    console.log(category);

    if (!category || category.length === 0)
      return res.json({ status: 404, message: "Category not found!!!" });
    return res.json({
      status: 200,
      message: "Successfully!!!",
      data: category,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const update = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category)
      return res.json({ status: 404, message: "Category not found!!!" });
    if (req.body.name) category.name = req.body.name;
    category.stauts = req.body.status;
    let UpdateCategory = await Category.findOneAndUpdate(category);
    if (!UpdateCategory)
      return res.json({ stauts: 404, message: "Update category failed!!!" });
    return res.json({
      stauts: 200,
      message: "Update category successfully!!!",
      data: category,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const remove = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category)
      return res.json({ status: 404, message: "Category not found!!!" });
    if (category.status === 2)
      return res.json({ status: 404, message: "Category has been removed!!!" });
    category.status = 2;
    let updateCategory = await Category.findOneAndUpdate(category);
    if (!updateCategory)
      return res.json({ status: 404, message: "Remove category failed!" });
    return res.json({
      status: 404,
      message: "Remove category successfully!!!",
    });
  } catch (err) {
    createLogger.error(err);
  }
};
module.exports = { create, update, remove, view };
