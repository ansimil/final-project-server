const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema(
  {
    name: String,
    modules: [{
      type: Schema.Types.ObjectId,
      ref: 'Module'
    }]
  
});

const Wishlist = model("Wishlist", wishlistSchema);

module.exports = Wishlist;