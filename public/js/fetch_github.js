const socket = window.io.connect()

socket.on('editIssue', issue => {
  console.log('conntection to editIssue')
  let changeIssue = document.querySelector(`#issue-${issue.id} .comments`)
  changeIssue.textContent = issue.comments + 1
  console.log(changeIssue)
})

socket.on('newIssue', issue => {
  console.log('Receiving new issue')
  console.log(issue.title)
  writeIssueToDom(issue)
})

socket.on('closed', issue => {
  let changeState = document.querySelector(`issue-${issue.id}`)
  changeState.textContent = issue.state
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
