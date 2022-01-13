const mongoose = require("mongoose")
const { Schema } = mongoose

let schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: false, versionKey: false })

module.exports = mongoose.model("City", schema)
