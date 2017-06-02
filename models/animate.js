var mongoose = require('mongoose');
var AnimateSchema = require('../schemas/animate');

var Animate = mongoose.model('Animate', AnimateSchema);

module.exports = Animate