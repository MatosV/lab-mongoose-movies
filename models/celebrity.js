//name - String (like Tom Cruise, Beyoncé, Daffy Duck, etc.).
//occupation - String (what the celebrity does, why they are famous. For example actor, singer,
//comedian, or you can put unknown if your celebrity is someone like Kim Kardashian).
//catchPhrase - String (every celebrity needs a good catch phrase. Well maybe not all of them have one in real life,
//but all of our celebrities will have a catch phrase. This can be pretty much anything).

const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: {
    type: String
  },
  occupation: {
    type: String
  },
  catchPhrase: {
    type: String
  }
});

const celebrities = mongoose.model('Celebrity', celebritySchema);

module.exports = celebrities;
