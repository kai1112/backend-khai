const Voucher = require("../models/voucher.model");
const createLogger = require("../middleware/logger")

const create = async (req, res) => { 
    try {
        if(!req.body.name) return res.json({status: 404, message: "Name is required!!!"})
        if(!req.body.startDate) return res.json({status: 404, message: "start date is required!!!"})
        if(!req.body.endDate) return res.json({status: 404, message: "end date is required!!!"})
        let Voucher = await Voucher.findOne({ name: req.body.name })
        if (Voucher) return res.json({ status: 202, message: "Voucher already exists!!!" })
        let newVoucher = await Voucher.create({
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        if (!newVoucher) return res.json({ status: 404, message: "Create Voucher failed!" })
         return res.json({status: 200, message: "Voucher created successfully", data: newVoucher})
    } catch (err) { 
        createLogger.error(err)
    }
}

const view = async (req, res) => { 
    try {
        let listView = await Voucher.find({status: 1})
        if (!listView) return res.json({ status: 404, message: "Voucher not found" })
        return res.json({ status: 200, message: "Find successful", data: listView })
    } catch (err) {
        createLogger.error(err)
    }
}

const update = async (req, res) => { 
    try {
        let Voucher = await Voucher.findById(req.params.id)
        if (!Voucher) return res.json({ status: 202, message: "Voucher is not found!!!" })
        if(req.body.startDate) Voucher.startDate = req.body.startDate
        if(req.body.endDate) Voucher.endDate = req.body.endDate
        let updateVoucher = await Voucher.findOneAndUpdate(Voucher)
        if (!updateVoucher) return res.json({ status: 202, message: "Update Voucher is failed!!!" })
        return res.json({ status: 200, message:"Update Voucher is successfully", data: Voucher })
    } catch (err) { 
        createLogger.error(err)
    }
}

const remove = async (req, res) => { 
    try {
        let Voucher = await Voucher.findOne({ id: req.body._id })
        if (!Voucher) return res.json({ status: 202, message: "Voucher is not found!!!" })
        Voucher.status = 2
        let updateVoucher = await Voucher.findOneAndUpdate(Voucher)
        if (!updateVoucher) return res.json({ status: 202, message: "Remove Voucher is failed!!!" })
        return res.json({ status: 200, message:"Remove Voucher is successfully", data: Voucher })
    } catch (err) { 
        createLogger.error(err)
    }
}



module.exports = {create, update, remove, view}