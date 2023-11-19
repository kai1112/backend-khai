const router = require("express").Router();

const {
  create,
  view,
  update,
  remove,
  viewDetail,
  createBrand,
} = require("../controllers/user.controller");
router.get("/",  view);
router.get("/:id",  viewDetail);
router.post("/", create);
router.post("/",   createBrand);
router.put("/update/:id",  update);
router.delete("/remove/:id",  remove);

module.exports = router;
