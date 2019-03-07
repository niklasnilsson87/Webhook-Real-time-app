/**
 * Home routes.
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const express = require('express')
const router = express.Router()

const controller = require('../controllers/homeController')

// GET /
router.get('/', controller.index)
  .post('/', async (res, req) => {
    let push = await JSON.parse(req.body)
    console.log(push)
  })

// Exports.
module.exports = router
