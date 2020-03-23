const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const wes = {name: 'Andrew', age: 100, cool:true }
  // res.json(wes);
  // res.send('Hey! It works!');
  // res.send(req.query);
  res.render('hello', {
    name: req.query.name,
    dog: req.query.dog,
  });
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join("");
  res.send(reverse)
});

module.exports = router;
