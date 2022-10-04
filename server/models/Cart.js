const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    name: String,
    modules: [{
      type: Schema.Types.ObjectId,
      ref: 'Module'
    }]
  
});

const Cart = model("Cart", cartSchema);

module.exports = Cart;