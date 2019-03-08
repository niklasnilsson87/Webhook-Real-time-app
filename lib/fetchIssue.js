const fetch = require('node-fetch')

async function fetchIssue (url) {
  let result = await fetch(url, {
    headers: {
      Authorization: 'token ' + process.env.ACCESS_TOKEN
    }
  })

  return result.json()
}

module.exports = fetchIssue
