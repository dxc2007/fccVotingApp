const express = require('express');
const router = express.Router();
const Poll = require('mongoose').model('Poll');

router.post('/newpoll', function(req, res) {
  const pollTemplate = {
    title: req.body.title,
    creator: req.body.creator,
    options: req.body.options.split(","),
    votes: {},
  }
  //need to get the options done!
  console.log(pollTemplate.options);

  const poll = new Poll(pollTemplate);

  poll.save(function(err, poll) {
    if (err) {
      console.log(err)
    } else {
      console.log(poll);
    }
  })
})

router.post('/newvote', function(req, res) {
  const option = req.body.option;
  const title = req.body.title;
  const inc = {};
  inc["votes." + option] = 1;
  console.log(option, title);
  let update = Poll.update({ title: title}, {$inc: inc},
    function(err, object) {
    if (err) {
      console.log(err)
    } else {
      console.log(object);
    }
  })
})

router.get('/showall', function(req, res) {
  var query = Poll.find({}).sort({ title: 1})

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

router.get('/details/:formname', function(req, res) {
  const form = decodeURI(req.params.formname);
  console.log(form);
  var query = Poll.findOne({ title: form})

  query.exec(function(err, form) {
    if (err) {
      console.log(err)
      return res.json({error: err});
    } else {
      console.log(form)
      return res.json({data: form});
  }
})
})

module.exports = router;
