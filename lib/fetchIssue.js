const fetch = require('node-fetch')
require('dotenv').config()

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
