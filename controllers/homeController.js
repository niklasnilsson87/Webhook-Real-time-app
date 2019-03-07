/**
 * Module for homeController
 *
 * @author Niklas Nilsson
 * @version 1.0
 */
const github = require('octonode')

require('dotenv').load()
const client = github.client(process.env.ACCESS_TOKEN)
const ghrepo = client.repo('1dv023/nn222ia-examination-3')

const homeController = {}

/**
 * index GET
 */
homeController.index = async (req, res, next) => {
  try {
    let result = await ghrepo.issuesAsync()

    result = result[0].map(issue => ({
      title: issue.title,
      description: issue.body,
      url: issue.html_url,
      id: issue.number,
      state: issue.state,
      comments: issue.comments,
      createdAt: issue.created_at.substr(0, 10),
      time: issue.created_at.substr(11, 5)
    }))
    console.log(result)
    res.render('home/index', { issues: result })
  } catch (err) {
    console.log(err)
  }
}

// Exports.
module.exports = homeController
