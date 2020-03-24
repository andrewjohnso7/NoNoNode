exports.homePage = (req, res) => {
  console.log(req.name)
  res.render('index')
}

exports.addStore = (req, res) => {
  res.render('editStore', {title: 'Add Store' })
}

exports.createStore = (req, res) => {
  // To test this you can console log the request body
  res.json(req.body);
}