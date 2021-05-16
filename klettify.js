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
if (myArgs.length > 1) {
  switches = myArgs.shift();
}
let inputArg = myArgs[0];
if (inputArg.search(".js") == -1) {
  inputArg = inputArg + ".js";
}

if (config("h")) {
  let helpText = `
  "Klettify: turns javascript into bookmarklets.
  Usage: node klettify.js [args] filename [outputFilename]

  args:
  i:show input
  o:show output
  h|help:print help text and exit
  v:verbose
  n:no IIFE (do not wrap code in an Immediately Invoked Function Expression)
  d:dry run (do not write to file)
  f:specify output file name
  q:quiet (minimal logging/information)

  Examples: 
  //Runs klettify and prints the contents of the input file
      node klettify.js i file.js
  //Runs klettify but stops before executing the file write
      node klettify.js d file.js
  //Runs klettify but specifies the name of the output file
      node klettify.js r file.js outputFile.bkmk.js
  
  `;
  print(helpText);
  process.exit();
};

print(YELLOW, "Running klettify...");

let inputText = getInput();
if (!inputText) {
  process.exit(1)
}

if (config("i") || config("v")) {
  //i:show input v:verbose
  print(MAGENTA, "INPUT : \n" + inputText);
}

let out = stripComments(inputText);
out = makeOneliner(out);
out = minimiseSpaces(out);
if (!config("n")) {
  out = makeIIFE(out); //n: No IIFE
}
out = addNecessaryPrefix(out);

if (config("o") || config("v") || config("d")) {
  //o: show output v:verbose
  print(BLUE, "OUTPUT : \n " + out);
}
sendOutput(out);

function config(str) {
  return switches.search(str) !== -1
}

function minimiseSpaces(text) {
  return text.replace(/[\t ]+/g, " ");
}

function makeOneliner(text) {
  return text.replace(/\r?\n/g, " ");
}

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
  if (config("d")) {
    return;
  }
  let file = inputArg.split(".js")[0] + ".bkmk.js";
  if (config("f")) {
    file = myArgs[2];
  }
  fs.writeFile(file, out, err => {
    if (err) {
      console.error(RED, "Could not write to output file: " + file + "\n" + err, RESET);
      return false;
    }
    console.info(GREEN, "\nBookmarklet creation was successful", RESET);
  })
}

function print() {
  if (config("q")) {
    return;
  } else {
    console.log(...arguments);
  }
}