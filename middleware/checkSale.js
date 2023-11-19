const Product = require("../models/product.model");
const VoucherModel = require("../models/voucher.model");
async function checkVoucher() {
  let Voucher = await VoucherModel.find({ status: 1 });
  if (!Voucher || Voucher.length === 0) return;
  for (let i = 0; i < Voucher.length; i++) {
    let time = new Date().getTime();
    if (Voucher[i].endDate < time) {
      await VoucherModel.findOneAndUpdate(Voucher[i].id, { status: 2 });
      await Product.updateMany(
        { VoucherID: Voucher[i].id },
        { VoucherID: null }
      );
    }
  }
}
module.exports = { checkVoucher };
