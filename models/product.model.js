const mongoose = require("./dbConnection");

const ProductSchema = mongoose.Schema(
  {
    name: String,
    status: { type: Number, enum: [1, 2, 3], default: 1 }, // 1 là còn hàng, 2 là hết hàng, 3 là đã bị xoá
    code: String,
    detail: String,
    img: String,
    amount: Number,
    price: Number,
    brandID: String,
    voucherID: { type: String, default: null },
  },
  { collection: "Product", timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
