const mongoose = require("mongoose");

const InfoBooksSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },

    infoBook: {
      type: Object,
      auth: {
        type: String,
      },
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
      quantity: {
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
