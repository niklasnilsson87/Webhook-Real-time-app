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
webhookController.index = async (req, res) => {
  let io = req.app.get('socket.io')
  let data = JSON.parse(req.body)

  const issue = {
    title: data.issue.title,
    description: data.issue.body,
    user: data.issue.user.login,
    url: data.issue.html_url,
    number: data.issue.number,
    id: data.issue.id.toString(),
    state: data.issue.state,
    comments: data.issue.comments,
    createdAt: data.issue.created_at.substr(0, 10),
    time: data.issue.created_at.substr(11, 5)
  }

  if (data.action === 'created') {
    io.emit('addComment', { id: issue.id, title: issue.title, comments: issue.comments })
  }

  if (data.action === 'opened' || data.action === 'reopened') {
    io.emit('newIssue', issue)
  }

  if (data.action === 'closed') {
    io.emit('closed', issue)
  }

  if (data.action === 'edited') {
    io.emit('editIssue', issue)
  }

  if (data.action === 'deleted') {
    io.emit('removeComment', issue)
  }

  res.sendStatus(200)
}

module.exports = webhookController
