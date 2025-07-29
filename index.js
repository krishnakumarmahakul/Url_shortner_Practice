const express = require('express');
const connectDB = require("./config/db");
require("dotenv").config(); 
const path = require('path');
const cookieParser = require("cookie-parser");
const authMiddleware=require("./middleware/auth")


const userRoute = require("./routes/userRoute");
const staticRoute = require("./routes/staticRouter");
const urlRoutes = require('./routes/urlRoutes');

const app = express();


connectDB();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.request = req;
  next();
});

app.use('/signup', staticRoute);
app.use('/', staticRoute);     
app.use('/', userRoute);        
app.use('/',authMiddleware.ensureAuth, urlRoutes);           

app.use((req, res) => {
  console.log("❌ Route not found: " + req.url);
  res.status(404).send("Page Not Found");
});


app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
