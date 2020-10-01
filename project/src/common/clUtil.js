const readline = require('readline');
const util = require('util');
const messages = require('../resources/messages.js');

async function readFromCL() {
  // process.stdin.resume();
  // process.stdin.setEncoding('utf-8');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const it = rl[Symbol.asyncIterator]();
  const line1 = await it.next();

  const question = util.promisify(rl.question.p);
  return rl.question(messages.askForTextToEncode);
}

module.exports = {
  readFromCL
};
