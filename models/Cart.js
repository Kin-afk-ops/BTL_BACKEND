const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        quality: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);