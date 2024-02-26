const express = require("express");
const router = express.Router();
const {  Types: { ObjectId },} = require("mongoose");
const Event = require("../model/eventModel");
const axios = require("axios");
require("dotenv").config();
const unsplashApiKey = process.env.UNSPLASH_API_KEY;
const unsplashBaseUrl = 'https://api.unsplash.com';

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    const unsplashResponse = await axios.get(`${unsplashBaseUrl}/search/photos`, {
      params: {
          query: events[0].names.english,
          client_id: unsplashApiKey,
          per_page: 30
      }
    });
    const photos = unsplashResponse.data.results;
    const randomIndex = Math.floor(Math.random() * photos.length);
    const photoData = photos[randomIndex];

    // Extract the photo URL
    const photoUrl = photoData.urls.regular;
    res.render("main", { events, lang: "english", photoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// router get change language
router.get("/ru", async (req, res) => {
  try {
    const events = await Event.find();
    const unsplashResponse = await axios.get(`${unsplashBaseUrl}/search/photos`, {
      params: {
          query: events[0].names.english,
          client_id: unsplashApiKey,
          per_page: 30
      }
    });
    const photos = unsplashResponse.data.results;
    const randomIndex = Math.floor(Math.random() * photos.length);
    const photoData = photos[randomIndex];

    // Extract the photo URL
    const photoUrl = photoData.urls.regular;
    res.render("main", { events, lang: "russian", photoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
