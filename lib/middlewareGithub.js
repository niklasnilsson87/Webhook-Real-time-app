/**
 * Module for middlewareGithub
 *
 * insperation from https://medium.com/chingu/how-to-verify-the-authenticity-of-a-github-apps-webhook-payload-8d63ccc81a24
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const crypto = require('crypto')

/**
 * Creates a sha1 hmac signature based on our .env-token.
 * Calls update to add the payload body to the signature.
 *
 * @returns {String} signature to match the shape.
 */
const createComparisonSignature = (body) => {
  const hmac = crypto.createHmac('sha1', process.env.ACCESS_TOKEN)
  const selfSignature = hmac.update(body).digest('hex')
  return `sha1=${selfSignature}`
}

/**
 * Function that protect us from timing attacks.
 *
 * @param {string} signature
 * @param {string} comparisonSignature
 */
const compareSignatures = (signature, comparisonSignature) => {
  try {
    const source = Buffer.from(signature)
    const comparison = Buffer.from(comparisonSignature)
    return crypto.timingSafeEqual(source, comparison)
  } catch (err) {
    return false
  }
}

/**
 * Middleware function
 *
 * Compares the signature from github and our own to match.
 * Calls next if success or returns a 401 (Unauthorized) if faild.
 */
const verifyGithubPayload = (req, res, next) => {
  const { headers, body } = req

  const signature = headers['x-hub-signature']
  const comparisonSignature = createComparisonSignature(body)

  if (!compareSignatures(signature, comparisonSignature)) {
    return res.status(401).send('Mismatched signatures')
  }
  next()
}

// Exports
module.exports = verifyGithubPayload
