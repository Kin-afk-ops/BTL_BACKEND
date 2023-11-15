const mongoose = require("mongoose");

const BooksSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
      unique: true,
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
      type: String
    },

    star: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Books", BooksSchema);
