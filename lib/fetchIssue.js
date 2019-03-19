/**
 * Module for fetchIssue
 *
 * @author Niklas Nilsson
 * @version 1.0
 */

const fetch = require('node-fetch')
require('dotenv').config()

/**
 * Async function that fetches issues from niklasnilsson87 repository.
 *
 * @param {String} url to repo.
 * @returns Json data.
 */
async function fetchIssue (url) {
  let result = await fetch(url, {
    headers: {
      'user-agent': 'niklasnilsson87',
      Authorization: 'token ' + process.env.ACCESS_TOKEN
    }
  })

  return result.json()
}

module.exports = fetchIssue
