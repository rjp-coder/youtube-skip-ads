//klettify
let myArgs = process.argv.slice(2);
let switches="";
if (myArgs.length>2){
  switches = myArgs.shift();
} 
let inputArg=myArgs[0];
let outputArg=myArgs[1];
let inputText = getInput();

let out = stripComments(inputText);
out = makeOneliner(out);
out = minimiseSpaces(out);
out = makeIIFE(out);
out = addNecessaryPrefix(out);

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
  return `
var thisIsATest=3;
//to see if javascript can be turned into bookmarklets
console.log(thisIsATest**3);

function something(x){
  return x**2 + 2*x + 1
};

console.log(something(12));

`;
}

function sendOutput(out) {
  console.log(out);
}