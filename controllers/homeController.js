/**
 * Module for homeController
 *
 * @author Niklas Nilsson
 * @version 1.0
 */
const fetchIssues = require('../lib/fetchIssue')

const homeController = {}

/**
 * index GET
 */
homeController.index = async (req, res) => {
  let result = await fetchIssues('https://api.github.com/repos/1dv023/nn222ia-examination-3/issues')

  let issues = result.map(issue => ({
    title: issue.title,
    description: issue.body,
    user: issue.user.login,
    url: issue.html_url,
    id: issue.id,
    number: issue.number,
    state: issue.state,
    comments: issue.comments,
    createdAt: issue.created_at.substr(0, 10),
    time: issue.created_at.substr(11, 5)
  }))
  res.render('home/index', { issues })
}

// Exports.
module.exports = homeController
