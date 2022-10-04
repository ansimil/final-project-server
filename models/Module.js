const { Schema, model } = require("mongoose");

const moduleSchema = new Schema(
  {
    id: {
      type: String,
      required: false
    },
    sku: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    category: {
        type: String,
        required: false
    },
    price: {
      type: Number,
      required: false
    },
    currency: {
        type: String,
        required: false
    },
    description: {
      type: String,
      required: false,
    },
    shortDescription: {
      type: String,
      required: false,
    },
    tagline: {
      type: String,
      required: false
    },
    inStock: {
        type: Number,
        required: false
      },
    primaryImageUrl: {
        type: String,
        required: false
    },
    secondaryImageUrl: {
        type: Array,
        required: false
    }
    
  },
  {
    timestamps: true,
  }
);

const Module = model("Module", moduleSchema);

module.exports = Module;