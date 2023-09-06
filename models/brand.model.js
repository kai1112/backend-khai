const mongoose = require("./dbConnection");

const BrandSchema = mongoose.Schema(
  {
    name: String,
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 là hoạt động, 2 là chưua hoạt động
    categoryID: String,
  },
  { collection: "Brand", timestamps: true }
);

const BrandModel = mongoose.model("Brand", BrandSchema);

module.exports = BrandModel;
