const router = require("express").Router();

const {
  create,
  view,
  update,
  remove,
  viewDetail,
} = require("../controllers/brand.controller");
const { checkRoleAdmin, checkToken } = require("../middleware/auth");

router.get("/", view);
router.get("/:id", viewDetail);
router.post("/", checkToken, checkRoleAdmin, create);
router.put("/update/:id", checkToken, checkRoleAdmin, update);
router.delete("/remove/:id", checkToken, checkRoleAdmin, remove);

module.exports = router;
