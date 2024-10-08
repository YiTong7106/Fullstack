/**
 * Express module for handling user signup, login, and routing for drivers and packages.
 * @module routes/Yi
 */

const express = require('express');

/**
 * Express router to define routes.
 * @const
 */
const router = express.Router();


/**
 * API router module.
 * @const
 */
const apiRouter = require("./api");

/**
 * Firestore database instance.
 * @const
 */
const db = require('../app');
/**
 * Renders the signup page.
 * @route GET /signup
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @async
 */
router.use("/api", apiRouter);
module.exports = router;