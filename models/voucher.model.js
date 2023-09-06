const mongoose = require("./dbConnection");
import role from require("./role.model");

const VoucherSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        status: { type: Number, enum: [1, 2, 3] }, // 1 là hoạt động, 2 là hết hạn, 3 là đã sử dụng
        code: String,
        StartTime: Number,
        EndTime: Number,
        type: { type: Number, enum: [1, 2] }, // 1 là giảm %, 2 là giảm tiền
        price: Number
    },
    { collection: "Voucher", timestamps: true }
);

const VoucherModel = mongoose.model('Voucher', VoucherSchema);

module.exports = VoucherModel