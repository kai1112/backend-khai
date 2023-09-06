const mongoose = require("./dbConnection");

const ProductSchema = mongoose.Schema(
  {
    name: String,
    status: { type: Number, enum: [1, 2] }, // 1 là còn hàng, 2 là hết hàng
    code: String,
    detail: String,
    img: String,
    amount: Number,
    price: Number,
  },
  { collection: "Product", timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
