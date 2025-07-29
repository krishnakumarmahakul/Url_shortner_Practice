const User = require("../models/user");
const Url = require("../models/url");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");
async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).render("badreq");
  }

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    const allUrls = await Url.find().sort({ createdAt: -1 });
    res.status(200).render("login", { allUrls });
  } catch (error) {
    console.log(error);
    return res.status(500).render("badreq");
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).render("badreq");
  }

  try {
    const validUser = await User.findOne({ email, password });
    if (!validUser) {
      res.status(400).render("badreq");
    }

    const uid = uuidv4();
    setUser(uid, validUser);

    validUser.uid = uid;

    res.cookie("uid", uid, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    const allUrls = await Url.find({ createdBy: validUser._id }).sort({
      createdAt: -1,
    });
    return res.status(200).render("index", { allUrls });
  } catch (error) {
    console.log(error);
    return res.render("login", { error: "Invalid credentials" });
  }
}

module.exports = { handleUserSignup, handleUserLogin };
