const router = require("express").Router();

const {
  create,
  view,
  update,
  remove,
  viewDetail,
  createBrand,
} = require("../controllers/user.controller");
const { checkRoleAdmin, checkToken } = require("../middleware/auth");
router.get("/", checkToken, view);
router.get("/:id", checkToken, viewDetail);
router.post("/", create);
router.post("/", checkToken, checkRoleAdmin, createBrand);
router.put("/update/:id", checkToken, update);
router.delete("/remove/:id",checkToken, checkRoleAdmin, remove);

module.exports = router;
