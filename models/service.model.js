const mongoose = require("./dbConnection");

const ServiceSchema = mongoose.Schema(
  {
    name: String,
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 là ddang cho duyet, 2 là da duyet
    detail: String,
        date: Number,
    userID: String
  },
  { collection: "Service", timestamps: true }
);

const ServiceModel = mongoose.model("Service", ServiceSchema);

module.exports = ServiceModel;
