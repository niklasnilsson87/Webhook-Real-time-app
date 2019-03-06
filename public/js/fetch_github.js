const github = require('octonode')

require('dotenv').config()

const client = github.client(process.env.ACCESS_TOKEN)
const ghrepo = client.repo('1dv023/nn222ia-examination-3')

ghrepo.issues((callback, body, header) => {
  console.log(body)
})
