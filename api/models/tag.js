const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

module.exports = model("Tag", tagSchema);
