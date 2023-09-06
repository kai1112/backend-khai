const mongoose = require("./dbConnection");

const CategorySchema = mongoose.Schema(
    {
        name: String,
        status: { type: Number, enum: [1, 2], default: 1 }, // 1 là hoạt động, 2 là chưua hoạt động
    },
    { collection: "Category", timestamps: true }
);

const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel