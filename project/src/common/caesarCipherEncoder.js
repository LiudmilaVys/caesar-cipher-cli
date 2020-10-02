const stream = require('stream');
const util = require('util');
const caesarShift = require('./caesarShift.js');

function CaesarCipherEncoder(shift) {
  this.shift = shift || 0;
  stream.Transform.call(this);
}
util.inherits(CaesarCipherEncoder, stream.Transform);

CaesarCipherEncoder.prototype._transform = function(chunk, enc, cb) {
  const text = chunk.toString();
  const encodedText = caesarShift(text, this.shift);
  this.push(encodedText);
  cb();
};

module.exports = CaesarCipherEncoder;
