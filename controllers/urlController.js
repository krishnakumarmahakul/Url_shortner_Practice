const shortid = require("shortid");
const Url = require("../models/url");

exports.renderHome = async (req, res) => {
  const userId = req.user._id;
  const allUrls = await Url.find({createdBy: userId}).sort({ createdAt: -1 }); // Latest first
  res.render("index", { allUrls });
};

exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortId = shortid.generate();
  const userId = req.user._id;

  await Url.create({ originalUrl, shortId,createdBy:userId });

  res.render("result", { shortUrl: `${req.headers.host}/${shortId}` });
};

exports.redirectToOriginal = async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });

  if (url) {
    url.clicks++;
    await url.save();
    return res.redirect(url.originalUrl);
  }

  res.status(404).send("URL not found");
};
