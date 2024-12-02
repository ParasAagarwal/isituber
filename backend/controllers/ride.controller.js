const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;
  if (!pickup || !destination || !vehicleType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup: pickup,
      destination: destination,
      vehicleType: vehicleType,
    });

    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;
  if (!pickup || !destination) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const fare = await rideService.getFare(pickup, destination);
    res.status(200).json(fare);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}