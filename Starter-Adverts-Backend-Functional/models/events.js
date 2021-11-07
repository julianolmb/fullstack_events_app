const mongoose = require('mongoose');

const eventsSchema = mongoose.Schema({
  name: String,
  location: String,
  description: String,
  date: String,
  time: String
})

module.exports.Events = mongoose.model('events', eventsSchema,'events')