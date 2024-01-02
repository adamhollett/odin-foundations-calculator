let screen = {
  upper: [],
  lower: [],
}

const screenUpper = document.querySelector("#screen-upper");
const screenLower = document.querySelector("#screen-lower");

// Number keys
document.querySelector("#key-1").addEventListener("click", () => updateScreenLower("1"));
document.querySelector("#key-2").addEventListener("click", () => updateScreenLower("2"));
document.querySelector("#key-3").addEventListener("click", () => updateScreenLower("3"));
document.querySelector("#key-4").addEventListener("click", () => updateScreenLower("4"));
document.querySelector("#key-5").addEventListener("click", () => updateScreenLower("5"));
document.querySelector("#key-6").addEventListener("click", () => updateScreenLower("6"));
document.querySelector("#key-7").addEventListener("click", () => updateScreenLower("7"));
document.querySelector("#key-8").addEventListener("click", () => updateScreenLower("8"));
document.querySelector("#key-9").addEventListener("click", () => updateScreenLower("9"));
document.querySelector("#key-0").addEventListener("click", doKey0Press);
document.querySelector("#key-00").addEventListener("click", doKey00Press);
document.querySelector("#key-dot").addEventListener("click", doKeyDotPress);

// Operator keys
document.querySelector("#key-add").addEventListener("click", doKeyAddPress);
document.querySelector("#key-subtract").addEventListener("click", doKeySubtractPress);
document.querySelector("#key-multiply").addEventListener("click", doKeyMultiplyPress);
document.querySelector("#key-divide").addEventListener("click", doKeyDividePress);
document.querySelector("#key-equals").addEventListener("click", doKeyEqualsPress);
document.querySelector("#key-clear").addEventListener("click", doKeyClearPress);

function onlyZeroPresent() {
  return screen.lower[0] === "0" && screen.lower.length === 1 ? true : false;
}

function doKey0Press() {
  if (onlyZeroPresent()) return;
  updateScreenLower("0");
}

function doKey00Press() {
  doKey0Press();
  doKey0Press();
}

function doKeyDotPress() {
  if (!screen.lower.includes(".")) updateScreenLower(".");
}

function doKeyAddPress() {  
  screen.upper.push(screen.lower.join(""));
  screen.upper.push(" + ");
  screenUpper.innerHTML = screen.upper.join("");

  screen.lower = ["0"];
  screenLower.innerHTML = screen.lower.join("");
}

function doKeySubtractPress() {
  screen.upper.push(screen.lower.join(""));
  screen.upper.push(" - ");
  screenUpper.innerHTML = screen.upper.join("");

  screen.lower = ["0"];
  screenLower.innerHTML = screen.lower.join("");
}

function doKeyMultiplyPress() {
  screen.upper.push(screen.lower.join(""));
  screen.upper.push(" * ");
  screenUpper.innerHTML = screen.upper.join("");

  screen.lower = ["0"];
  screenLower.innerHTML = screen.lower.join("");
}

function doKeyDividePress() {
  screen.upper.push(screen.lower.join(""));
  screen.upper.push(" / ");
  screenUpper.innerHTML = screen.upper.join("");

  screen.lower = ["0"];
  screenLower.innerHTML = screen.lower.join("");
}

function doKeyEqualsPress() {
  let operation = screen.upper.concat(screen.lower).join("");

  operation = operation.replace(/\W/, "");

  const operator = operation.match(/[\+\-\*\/]/g).pop();

  const lhs = Number(operation.split(operator)[0]);
  const rhs = Number(operation.split(operator)[1]);
  let result;

  switch (operator) {
    case "+":
      result = lhs + rhs;
      break;
    case "-":
      result = lhs - rhs;
      break;
    case "*":
      result = lhs * rhs;
      break;
    case "/":
      result = lhs / rhs;
      break;
  }

  result = result.toFixed(2);

  // Strip trailing zeroes
  if (result.endsWith(".00")) result = result.replace(".00", "")

  screen.lower = [];
  screenLower.innerHTML = result;

  screen.upper = [];
  screenUpper.innerHTML = "";
}

function doKeyClearPress() {
  screen.upper = []
  screenUpper.innerHTML = screen.upper.join("");

  screen.lower = ["0"];
  screenLower.innerHTML = screen.lower.join("");
}

function updateScreenUpper(str) {
  screen.upper.push(str);

  screenUpper.innerHTML = screen.upper.join("");
}

function updateScreenLower(str) {
  if (onlyZeroPresent() && str !== "0") {
    screen.lower = [];
  }

  screen.lower.push(str);

  screenLower.innerHTML = screen.lower.join("");
}
