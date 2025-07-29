const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");
const user = require('../models/user');

router.get('/', (req, res) => {
  console.log("✅ /signup GET route hit");  // <-- DEBUG LOG
  staticController.handlerstatic(req, res);
});
router.get('/login', (req, res) => {
  console.log("✅ /login GET route hit");
  res.render('login'); // This should match your `views/login.ejs` file
});



module.exports = router;
