const { Schema, model } = require("mongoose");

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    image_url: {
      type: String,
    },
    favorited: {
      type: Boolean,
      default: false,
    },
    is_adopted: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Cat", catSchema);
