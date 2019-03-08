/**
 * Module for homeController
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const webhookController = {}

/**
 * index post
 */
webhookController.index = (req, res) => {
  res.sendStatus(200)
}

module.exports = webhookController
