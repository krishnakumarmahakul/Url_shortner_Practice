const mongoose = require('mongoose');
const users = require('./user');

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:users
  },
  createdAt: { type: Date, default: Date.now }
});




const UrlModel = mongoose.model("Allurl", urlSchema);

module.exports = UrlModel;

