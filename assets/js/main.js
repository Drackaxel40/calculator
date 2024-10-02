let clean = document.getElementById('btn-c');
let percent = document.getElementById('btn-perc');
let backspack = document.getElementById('btn-backspace');
let minus = document.getElementById('btn-minus');
let plus = document.getElementById('btn-plus');
let div = document.getElementById('btn-div');
let mult = document.getElementById('btn-mult');
let sign = document.getElementById('btn-sign');
let comma = document.getElementById('btn-comma');
let result = document.getElementById('btn-result');
let zero = document.getElementById('btn-0');
let one = document.getElementById('btn-1');
let two = document.getElementById('btn-2');
let three = document.getElementById('btn-3');
let four = document.getElementById('btn-4');
let five = document.getElementById('btn-5');
let six = document.getElementById('btn-6');
let seven = document.getElementById('btn-7');
let eight = document.getElementById('btn-8');
let nine = document.getElementById('btn-9');
let total = document.getElementById('total');
let display = document.getElementById('display-op');
let op = [];

// Initiating with zéro
total.innerText = "0";

// Function to update the display
function updateDisplay() {
    display.innerText = op.join("");
}

// Function to calculate the result
function calculate() {

    if (op.length === 0) {
        return;
    }

    let result = eval(op.join(""));
    total.innerText = result;
    op = [];
    updateDisplay();
}

// Function to add numbers
function addNumber(number) {

    if (['+', '-', '*', '/'].includes(number)) {

        // If the operation is empty, we do nothing
        if (op.length === 0 && total.innerText === "0") {
            return;
        }

        // If we have a previous result, we add it to the operation
        if (total.innerText !== "0") {
            op.push(total.innerText);
            total.innerText = "0";
        }

        // Si le dernier élément est déjà un opérateur, le remplace par le nouvel opérateur
        if (['+', '-', '*', '/'].includes(op[op.length - 1])) {
            op.pop(); // Retire l'opérateur précédent
        }
    }


    op.push(number);
    updateDisplay();
}

// Event listeners
zero.onclick = () => addNumber('0');
one.onclick = () => addNumber('1');
two.onclick = () => addNumber('2');
three.onclick = () => addNumber('3');
four.onclick = () => addNumber('4');
five.onclick = () => addNumber('5');
six.onclick = () => addNumber('6');
seven.onclick = () => addNumber('7');
eight.onclick = () => addNumber('8');
nine.onclick = () => addNumber('9');
minus.onclick = () => addNumber('-');
plus.onclick = () => addNumber('+');
mult.onclick = () => addNumber('*');
div.onclick = () => addNumber('/');
comma.onclick = () => addNumber('.');

clean.onclick = function () {
    op = [];
    total.innerText = "0";
    updateDisplay();
}

backspack.onclick = function () {
    op.pop();
    updateDisplay();
}

// Percentage
percent.onclick = function () {
    // If the operation is empty, we do nothing
    if (op.length === 0) {
        return;
    }

    // Get the complete last number in the expression
    let lastNumber = "";
    while (op.length > 0 && !isNaN(op[op.length - 1]) || op[op.length - 1] === '.') {
        lastNumber = op.pop() + lastNumber;
    }

    // If we have a previous number, we need to get this number to adjust the percentage
    let previousNumber = "";
    let operator = "";

    // We go back in the operation to get the operator and the previous number
    while (op.length > 0 && isNaN(op[op.length - 1]) && op[op.length - 1] !== '.') {
        operator = op.pop(); // We get the last operator
    }

    while (op.length > 0 && !isNaN(op[op.length - 1]) || op[op.length - 1] === '.') {
        previousNumber = op.pop() + previousNumber;
    }

    // If we have a last number, we calculate the percentage of the previous number
    if (previousNumber) {
        // Calculate the percentage of the previous number
        let result = parseFloat(previousNumber) * (parseFloat(lastNumber) / 100);

        // Reinsert the operator and the percentage result in the operation
        op.push(previousNumber); // Reinsert the previous number
        op.push(operator);       // Réinsert the operator
        op.push(result.toString());
    } else {
        // If we don't have a previous number, we calculate the percentage of the last number
        let percentage = parseFloat(lastNumber) / 100;
        op.push(percentage.toString());
    }

    // Update the display
    updateDisplay();
}

// Function to change the sign of the last number
sign.onclick = function () {
    // If the operation is empty, we do nothing
    if (op.length === 0) {
        return;
    }

    // Get the last complete number in the expression
    let lastNumber = "";
    while (op.length > 0 && (!isNaN(op[op.length - 1]) || op[op.length - 1] === '.')) {
        lastNumber = op.pop() + lastNumber;
    }

    // If we get a number, we change the sign
    if (lastNumber !== "") {
        // Calculate the inverse of the number
        let invertedNumber = (-parseFloat(lastNumber)).toString();

        // Add the inverted number to the operation
        op.push(invertedNumber);
    }

    // Update the display
    updateDisplay();
}

result.onclick = () => calculate();