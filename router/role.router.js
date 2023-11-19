const router = require("express").Router();
const {
  create,
  view,
  update,
  remove,
  viewDetail,
} = require("../controllers/role.controller");
const { checkRoleAdmin, checkToken } = require("../middleware/auth");

router.get("/", checkRoleAdmin, view);
router.get("/:id", checkRoleAdmin, viewDetail);
router.post("/", checkRoleAdmin, create);
router.put("/update/:id", checkRoleAdmin, update);
router.delete("/remove/:id", checkRoleAdmin, remove);

module.exports = router;
