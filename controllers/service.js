const Service = require("../models/service.model");
const createLogger = require("../middleware/logger");

const create = async (req, res) => {
  try {
    if (!req.body.name)
      return res.json({ status: 404, message: "name is required" });
    if (!req.body.date)
      return res.json({ status: 404, message: "date is required" });
    let service = Service.create({
      name: req.body.name,
      status: 1,
      detail: req.body.detail,
      date: new Date(req.body.date).getTime(),
      userID: req.user.id,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const view = async (req, res) => {
  try {
    let listView = await Service.find();
    if (!listView)
      return res.json({ status: 404, message: "service not found" });
    return res.json({
      status: 200,
      message: "Find successful",
      data: listView,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const viewDetail = async (req, res) => {
  try {
    let listView = await Service.findOne({ id: req.params._id });
    if (!listView) return res.json({ status: 404, message: "Role not found" });
    return res.json({
      status: 200,
      message: "Find successful",
      data: listView,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const update = async (req, res) => {
  try {
    let Service = await Service.findOne({ id: req.params._id });
    if (!Service)
      return res.json({ status: 202, message: "Service is not found!!!" });
    if (req.body.status) Service.status = 2;
    let updateService = await Service.findOneAndUpdate(Service);
    if (!updateService)
      return res.json({ status: 202, message: "Update Service is failed!!!" });
    return res.json({
      status: 200,
      message: "Update Service is successfully",
      data: Service,
    });
  } catch (err) {
    createLogger.error(err);
  }
};


module.exports = { create, update,view, viewDetail };
