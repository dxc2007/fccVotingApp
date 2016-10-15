const mongoose = require('mongoose');

let PollSchema = new mongoose.Schema({
  title: {type: String, index: { unique: true}},
  creator: String,
  options: Array,
  votes: Object
});

module.exports = mongoose.model('Poll', PollSchema);
