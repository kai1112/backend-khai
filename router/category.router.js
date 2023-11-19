const router = require("express").Router();

const {
  create,
  view,
  update,
  remove,
  viewDetail,
} = require("../controllers/category.controller");
const { checkRoleAdmin, checkToken } = require("../middleware/auth");

router.get("/", view);
router.post("/",checkToken, checkRoleAdmin, create);
router.post("/:id",checkToken, checkRoleAdmin, viewDetail);
router.put("/update/:id",checkToken, checkRoleAdmin, update);
router.delete("/remove/:id",checkToken, checkRoleAdmin, remove);

module.exports = router;
