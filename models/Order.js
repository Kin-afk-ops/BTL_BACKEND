const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    clientName: {
      type: String,
      required: true,
    },
    books: [
      {
        bookId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          require: true,
        },
        image: {
          type: String,
          require: true,
        },
        currentPrice: {
          type: Number,
          require: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    phone: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    collected: {
      type: Number,
      required: true,
      default: 0,
    },
    address: {
      type: Object,
      require: true,
    },
    status: {
      type: String,
      default: "Đang chuẩn bị hàng",
    },
    requestDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
