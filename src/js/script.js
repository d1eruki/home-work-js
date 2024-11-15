import '../css/style.scss';

function toDoAdd(key) {
    const toDoInputElement = document.getElementById("toDoInput");
    const toDoOutputElement = document.getElementById("toDoOutput");

    const toDoInput = toDoInputElement.value.trim();
    if (!toDoInput) return;

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = false;

    const newRowCheckbox = document.createElement("div");
    newRowCheckbox.classList.add('cell-input');

    const newRowTask = document.createElement("div");
    newRowTask.classList.add('cell');

    newRowCheckbox.append(newCheckbox);
    newRowTask.append(toDoInput);

    localStorage.setItem('newCheckbox', 'toDoInput');

    const localItems = localStorage.getItem('newRowTask');

    toDoOutputElement.append(localItems, newRowCheckbox, newRowTask);
    toDoInputElement.value = '';
}

window.toDoAdd = toDoAdd;

//////////////////////////////////////////////

function clearLocal() {
    localStorage.clear();
}

window.clearLocal = clearLocal;

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
    result.style.display = "flex";

    result.textContent = eval(display.value);

    display.value = '';
}

window.displayClear = displayClear;
window.displayAppend = displayAppend;
window.calculate = calculate;

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

window.compareValues = compareValues;