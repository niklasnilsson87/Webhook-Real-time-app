const socket = io.connect()

socket.on('issue', issues => {
  issues = issues.issue.map(issue => ({
    title: issue.title,
    description: issue.body,
    url: issue.html_url,
    id: issue.number,
    state: issue.state,
    comments: issue.comments,
    createdAt: issue.created_at.substr(0, 10),
    time: issue.created_at.substr(11, 5)
  }))
  console.log(issues)
})
