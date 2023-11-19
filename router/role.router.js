const router = require("express").Router();
const {
  create,
  view,
  update,
  remove,
  viewDetail,
} = require("../controllers/role.controller");
const { checkRoleAdmin, checkToken } = require("../middleware/auth");

router.get("/",  view);
router.get("/:id",  viewDetail);
router.post("/",  create);
router.put("/update/:id",  update);
router.delete("/remove/:id",  remove);

module.exports = router;
