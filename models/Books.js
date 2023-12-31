const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      path: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },

    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    categories: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Books", BooksSchema);
