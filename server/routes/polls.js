const express = require('express');
const router = express.Router();
const Poll = require('mongoose').model('Poll');

router.post('/newpoll', function(req, res) {
  const pollTemplate = {
    title: req.body.title,
    creator: req.body.creator,
    options: req.body.options,
  }

  const poll = new Poll(pollTemplate);

  poll.save(function(err, poll) {
    if (err) {
      console.log(err)
    } else {
      console.log(poll);
    }
  })
})

router.get('/user/:username', function(req, res) {
  const user = decodeURI(req.params.username);
  console.log(user);
  var query = Poll.find({ creator: user }).sort({ title: 1})

  query.exec(function(err, polls) {
    if (err) {
      console.log(err)
      return res.json({error: err});
    } else {
      console.log(polls)
      return res.json({data: polls});
  }
})
})

module.exports = router;
