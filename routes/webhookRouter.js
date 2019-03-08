/**
 * Home routes.
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

const controller = require('../controllers/webhookController')

// GET /
router.post('/webhook', controller.index)

// Exports.
module.exports = router
