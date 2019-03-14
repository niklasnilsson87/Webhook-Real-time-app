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
    action: data.action,
    title: data.issue.title,
    description: data.issue.body,
    user: data.issue.user.login,
    avatarUrl: data.issue.user.avatar_url,
    url: data.issue.html_url,
    number: data.issue.number,
    id: data.issue.id.toString(),
    state: data.issue.state,
    comments: data.issue.comments,
    createdAt: data.issue.created_at.substr(0, 10),
    time: data.issue.created_at.substr(11, 5),
    closeOpen: data.issue.state === 'closed'
  }

  if (data.comment) {
    issue.commentsBody = data.comment.body
  }

  console.log(issue)

  switch (data.action) {
    case 'created':
      io.emit('addComment', issue)
      break
    case 'opened':
      io.emit('newIssue', issue)
      break
    case 'reopened':
      io.emit('reopened', issue)
      break
    case 'closed':
      io.emit('closed', issue)
      break
    case 'edited':
      io.emit('editIssue', issue)
      break
    case 'deleted':
      io.emit('removeComment', issue)
      break
    default:
      console.log('faild to listen on action')
  }

  res.sendStatus(200)
}

module.exports = webhookController
