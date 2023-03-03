const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  phone: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chearedAt: {
    type: Date,
    default: Date.now,
  },
});

contactSchema.index({ fullname: "text" });

module.exports = mongoose.model("Contact", contactSchema);
