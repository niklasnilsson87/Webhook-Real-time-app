const socket = window.io.connect()

// socket.on('addComment' || 'closed' || 'newIssue' || 'reopened' || 'removeComment' || 'editIssue', issue => {

// })

socket.on('addComment', issue => {
  console.log('adding comment')
  let changeIssue = document.querySelector(`#issue-${issue.id} .issue-comments`)
  changeIssue.textContent = `Comments: ${issue.comments + 1}`
  notification(issue)
})

socket.on('newIssue', issue => {
  console.log('new issue added')
  writeIssueToDom(issue)
  notification(issue)
})

socket.on('closed', issue => {
  let div = document.querySelector(`#issue-${issue.id}`)
  let changeState = document.querySelector(`#issue-${issue.id} .issue-state`)
  console.log('closing issue')
  div.classList.add('red')
  div.classList.remove('blue-grey')
  changeState.textContent = issue.state
  notification(issue)
})

socket.on('reopened', issue => {
  let div = document.querySelector(`#issue-${issue.id}`)
  let changeState = document.querySelector(`#issue-${issue.id} .issue-state`)
  div.classList.add('blue-grey')
  div.classList.remove('red')
  changeState.textContent = issue.state
  notification(issue)
})

socket.on('removeComment', issue => {
  console.log('issue comment removed')
  let changeIssue = document.querySelector(`#issue-${issue.id} .issue-comments`)
  changeIssue.textContent = `Comments: ${issue.comments - 1}`
  notification(issue)
})

socket.on('editIssue', issue => {
  console.log('edited')
  let changeTitle = document.querySelector(`#issue-${issue.id} .issue-title-link`)
  let changeDescription = document.querySelector(`#issue-${issue.id} .issue-description`)
  changeDescription.textContent = issue.description
  changeTitle.textContent = issue.title
  notification(issue)
})

function writeIssueToDom (issue) {
  let mainDiv = document.querySelector('.list-of-issues')
  const issueClone = document.querySelector('.issue')
  let template = document.importNode(issueClone, true)

  template.querySelector('.issue-number').textContent = issue.number
  template.querySelector('.issue-title-link').textContent = issue.title
  template.querySelector('.issue-title-link').setAttribute('href', issue.url)
  template.querySelector('.issue-description').textContent = issue.description
  template.querySelector('.issue-comments').textContent = issue.comments
  template.querySelector('.issue-state').textContent = issue.state
  template.querySelector('.issue-date').textContent = `${issue.createdAt} - ${issue.time}`

  mainDiv.appendChild(template)
}

function notification (issue) {
  console.log('notification')
  const cloneTemplate = document.querySelector('.notification')
  const notdiv = document.querySelector('.notificationdiv')
  const template = document.importNode(cloneTemplate.content, true)

  switch (issue.action) {
    case 'created':
      template.querySelector('.notification-user').textContent = `${issue.user} commented: ${issue.commentsBody} on issue: ${issue.title}`
      break
    case 'closed':
      notificationText(issue, template)
      break
    case 'reopened':
      notificationText(issue, template)
      break
    case 'opened':
      notificationText(issue, template)
      break
    case 'deleted':
      template.querySelector('.notification-user').textContent = `${issue.user} ${issue.action} a comment on issue: ${issue.title}`
      break
  }

  notdiv.appendChild(template)
  setTimeout(() => {
    const removeDiv = document.querySelector('.removeDiv')
    removeDiv.parentNode.removeChild(removeDiv)
  }, 5000)
}

function notificationText (issue, template) {
  let x = template.querySelector('.notification-user').textContent = `${issue.user} ${issue.action} issue: ${issue.title}`
  return x
}
