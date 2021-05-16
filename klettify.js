//klettify
const fs = require('fs')
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const WHITE = "\x1b[37m";
const RESET = "\x1b[0m";
const BLUE = "\x1b[34m"
const MAGENTA = "\x1b[35m"

let myArgs = process.argv.slice(2);
let switches = "";
if (myArgs.length > 2) {
  switches = myArgs.shift();
}
let inputArg = myArgs[0];
let outputArg = myArgs[1];

let inputText = getInput();
console.log(YELLOW, "Running klettify...");
console.log(MAGENTA, "INPUT : \n" + inputText);

let out = stripComments(inputText);
out = makeOneliner(out);
out = minimiseSpaces(out);
out = makeIIFE(out);
out = addNecessaryPrefix(out);

console.log(BLUE, "OUTPUT : \n " + out);
sendOutput(out);

function minimiseSpaces(text) {
  return text.replace(/[\t ]+/g, " ");
}

function makeOneliner(text) {
  return text.replace(/\r?\n/g, " ");
}

//For 2.0
function stripComments(text) {
  return text.replace(/\/[\/\*][^\n]*\n/g, "\n");
}

function addNecessaryPrefix(text) {
  return "javascript:" + text;
}

function makeIIFE(text) {
  return `(function(){${text}}());`
}

function getInput() {
  try {
    const data = fs.readFileSync(inputArg, 'utf8')
    return data;
  } catch (err) {
    console.error(RED, "Could not read contents of input file: " + inputArg + "\n" + err);
  }
}

function sendOutput(out) {
  fs.writeFile(outputArg, out, err => {
    if (err) {
      console.error("Could not write to output file: " + outputArg + "\n" + err);
      console.log(RESET, "");
      return false;
    }
    console.log(GREEN, "\nBookmarklet creation was successful");
    console.log(RESET);
  })
}