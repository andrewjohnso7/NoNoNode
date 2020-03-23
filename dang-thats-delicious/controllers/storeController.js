exports.homePage = (req, res) => {
  console.log(req.name)
  res.render('index')
}

exports.reverse =  (req, res) => {
  const reverse = [...req.params.name].reverse().join("");
  res.send(reverse)
}

exports.myMiddleware = (req, res, next) => {
  req.name = 'Andrew';
  res.cookie('name', 'Pay attention', {maxAge: 300000})
  next();
}