import '../css/style.scss';

function toDoAdd() {
    const toDoInputElement = document.getElementById("toDoInput");
    const toDoOutputElement = document.getElementById("toDoOutput");

    const toDoInput = toDoInputElement.value.trim();
    if (!toDoInput) return;

    const newLabel = document.createElement("label");
    newLabel.style.display = "flex";
    newLabel.style.alignItems= "center";

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = false;
    newCheckbox.style.marginRight= "1rem";

    newLabel.append(newCheckbox);
    newLabel.append(" " + toDoInput);
    toDoOutputElement.append(newLabel);
    toDoInputElement.value = '';
}

//////////////////////////////////////////////


function displayClear() {
    document.getElementById('display').value = '';
}

function displayAppend(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    let display = document.getElementById("display");
    let result = document.getElementById("result");

    result.textContent = '';
    result.style.display= "flex";

    result.textContent = eval(display.value);

    display.value = '';
}

//////////////////////////////////////////////

const inputElementOne = document.getElementById("compareOne");
const inputElementTwo = document.getElementById("compareTwo");
const check = document.getElementById("check");

let elementOne = inputElementOne.value;
let elementTwo = inputElementTwo.value;

function compareValues() {
    if (elementOne === elementTwo) {
        check.textContent = '✅';
    } else {
        check.textContent = '❌';
    }
}

inputElementOne.addEventListener("input", (event) => {
    elementOne = event.target.value;
    compareValues();
});

inputElementTwo.addEventListener("input", (event) => {
    elementTwo = event.target.value;
    compareValues();
});

//////////////////////////////////////////////

function hideLeft() {
    const element = document.getElementById("left");
    element.style.display = (element.style.display === 'none') ? '' : 'none';
}

function hideRight() {
    const element = document.getElementById("right");
    element.style.display = (element.style.display === 'none') ? '' : 'none';
}