const mongoose = require("mongoose");

require("dotenv").config(); // ✅ Correct way to load .env variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // ✅ Now this will work
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
};
module.exports = connectDB;
