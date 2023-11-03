const mongoose = require("mongoose");

const InfoBooksSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
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
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    categories: {
      type: Array,
    },

    infoBook: {
      type: Object,
      publisher: {
        type: String,
        required: true,
      },
      supplier: {
        type: String,
        required: true,
      },
      nameSeries: {
        type: String,
      },
      desc: {
        type: String,
        required: true,
      },
      publishingYear: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      size: {
        type: String,
        required: true,
      },
      form: {
        type: String,
      },
      numberPage: {
        type: Number,
        required: true,
      },
    },
    star: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InfoBooks", InfoBooksSchema);
