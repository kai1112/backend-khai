const mongoose = require("./dbConnection");

const Product_orderSchema = mongoose.Schema(
  {
    product: String, // là 1 arr bao gồm [idProduct, quantityProduct, imgAvatar]
    status: { type: Number, enum: [1, 2, 3, 4], default: 1 }, // 1 là đã đặt hàng, 2 là vận chuyển, 3 là thành công, 4 bị huỷ
    total: Number, // là tổng tiền
    userID: String, // là id user mua hàng
  },
  { collection: "Product_order", timestamps: true }
);

const Product_orderModel = mongoose.model("Product_order", Product_orderSchema);

module.exports = Product_orderModel;
