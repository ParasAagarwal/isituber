const axios = require("axios");
const captainModel = require("../models/captain.model");
const client = require("../redis");

module.exports.getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  // Check Redis cache
  const cacheKey = `address:${address}`;
  const cachedCoordinates = await client.get(cacheKey);
  if (cachedCoordinates) {
    return JSON.parse(cachedCoordinates);
  }

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      const coordinates = {
        ltd: location.lat,
        lng: location.lng,
      };

      // Store coordinates in Redis cache
      await client.set(cacheKey, JSON.stringify(coordinates), "EX", 3600);

      return coordinates;
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  // Generate cache key
  const cacheKey = `distance:${origin}:${destination}`;

  // Check Redis cache
  const cachedData = await client.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }

      // Store result in Redis cache
      await client.set(
        cacheKey,
        JSON.stringify(response.data.rows[0].elements[0]),
        "EX",
        3600
      );

      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction) => prediction.description)
        .filter((value) => value);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  //created by mongo
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371], //in km
      },
    },
  });

  return captains;
};
