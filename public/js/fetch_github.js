const socket = window.io.connect()

socket.on('addComment', issue => {
  let changeIssue = document.querySelector(`#issue-${issue.id} .issue-comments`)
  changeIssue.textContent = issue.comments + 1
})

socket.on('newIssue', issue => {
  writeIssueToDom(issue)
})

socket.on('closed', issue => {
  let div = document.querySelector(`#issue-${issue.id}`)
  let changeState = document.querySelector(`#issue-${issue.id} .issue-state`)
  console.log(changeState)
  div.classList.add('red')
  div.classList.remove('blue-grey')
  changeState.textContent = issue.state
})

socket.on('removeComment', issue => {
  console.log(issue)
  let changeIssue = document.querySelector(`#issue-${issue.id} .issue-comments`)
  console.log(changeIssue)
  changeIssue.textContent = issue.comments - 1
})

socket.on('editIssue', issue => {
  let changeTitle = document.querySelector(`#issue-${issue.id} .issue-title-link`)
  let changeDescription = document.querySelector(`#issue-${issue.id} .issue-description`)
  changeDescription.textContent = issue.description
  changeTitle.textContent = issue.title
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

  mainDiv.insertBefore(template, issueClone)
}
