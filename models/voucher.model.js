const mongoose = require("./dbConnection");

const VoucherSchema = mongoose.Schema(
    {
        name: String,
        detail: String,
        status: { type: Number, enum: [1, 2, 3], default: 1 }, // 1 là hoạt động, 2 là hết hạn, 3 là đã sử dụng
        code: String,
        StartTime: Number,
        EndTime: Number,
        type: { type: Number, enum: [1, 2], default: 1 }, // 1 là giảm %, 2 là giảm tiền
        price: Number
    },
    { collection: "Voucher", timestamps: true }
);

const VoucherModel = mongoose.model('Voucher', VoucherSchema);

module.exports = VoucherModel