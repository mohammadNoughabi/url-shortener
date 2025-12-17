const Url = require("../models/Url");
const nanoid = require("nanoid");

exports.shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ message: "URL is required" });
    }

    try {
      new URL(originalUrl);
    } catch (error) {
      return res.status(400).json({ message: "Invalid URL" });
    }

    let shortId;
    let exists = true;

    while (exists) {
      shortId = nanoid.nanoid(8);
      exists = await Url.findOne({ shortId });
    }

    const url = await Url.create({
      originalUrl,
      shortUrl: `${process.env.BASE_URL}/api/url/${shortId}`,
    });

    return res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/api/url/${shortId}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.getshortUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({
      shortUrl: `${process.env.BASE_URL}/api/url/${shortId}`,
    });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
