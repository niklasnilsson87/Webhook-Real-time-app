/**
 * Home routes.
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

const controller = require('../controllers/webhookController')
const verifyGithub = require('../lib/middlewareGithub')

// GET /
router.post('/', verifyGithub, controller.index)

// Exports.
module.exports = router
