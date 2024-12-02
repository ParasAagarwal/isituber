const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }

  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    return res.status(200).json({ coordinates });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    if (!origin || !destination) {
      return res
        .status(400)
        .json({ message: "Origin and destination are required" });
    }

    const distanceTime = await mapService.getDistanceTime(origin, destination);
    return res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Distance and time not found" });
  }
};


module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    if (!input) {
      return res.status(400).json({ message: "Input is required" });
    }

    const suggestions = await mapService.getAutoCompleteSuggestions(input);
    
    return res.status(200).json(suggestions);
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "Suggestions not found" });
  }
}