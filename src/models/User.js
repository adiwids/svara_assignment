const mongoose = require("mongoose")
const { Types } = mongoose
const validator = require("validator")
const bcrypt = require("bcrypt")
const { Schema } = mongoose

let schema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  address: {
    type: String
  },
  cityId: {
    type: Types.ObjectId,
    ref: "City"
  },
  lastSignIn: {
    type: Date
  }
}, { timestamps: true, versionKey: false })

// Instance methods
schema.methods = {
  validatePassword(plainPassword) {
    // bcrypt-ish plain and hashed password comparison with auto-gen salt
    return bcrypt.compareSync(plainPassword, this.encryptedPassword)
  }
}

// virtual attributes, i.e: user.password = 'value'
schema.virtual("password").set(function(plainPassword) {
  // auto-gen salt and hash
  this.encryptedPassword = bcrypt.hashSync(plainPassword, 12)
})

module.exports = mongoose.model("User", schema)