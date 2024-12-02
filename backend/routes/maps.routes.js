const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require("../controllers/map.controller");
const {query} = require('express-validator');

router.get('/get-coordinates',
  query('address').isString().isLength({min: 3}).withMessage('Address should be at least 3 characters long'),
  authMiddleware.authUser, mapController.getCoordinates);

router.get('/get-distance-time',
  query('origin').isString().isLength({min: 3}).withMessage('Origin should be at least 3 characters long'),
  query('destination').isString().isLength({min: 3}).withMessage('Destination should be at least 3 characters long'),
  authMiddleware.authUser, mapController.getDistanceTime);

router.get('/get-suggestions',
  query('input').isString().isLength({min: 3}).withMessage('Input should be at least 3 characters long'),
  authMiddleware.authUser, mapController.getAutoCompleteSuggestions);


module.exports = router;