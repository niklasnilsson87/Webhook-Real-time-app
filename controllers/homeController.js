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
  let openIssues = await fetchIssues('https://api.github.com/repos/1dv023/nn222ia-examination-3/issues?state=open')
  let closedIssues = await fetchIssues('https://api.github.com/repos/1dv023/nn222ia-examination-3/issues?state=closed')

  let merged = openIssues.concat(closedIssues)

  merged.sort(function (a, b) {
    return b.number - a.number
  })

  let issues = merged.map(issue => ({
    title: issue.title,
    description: issue.body,
    user: issue.user.login,
    avatarUrl: issue.user.avatar_url,
    url: issue.html_url,
    id: issue.id,
    number: issue.number,
    state: issue.state,
    comments: issue.comments,
    createdAt: issue.created_at.substr(0, 10),
    time: issue.created_at.substr(11, 5),
    closeOpen: issue.state === 'closed'
  }))

  res.render('home/index', { issues })
}

// Exports.
module.exports = homeController
