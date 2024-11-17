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

function handleInputOne(event) {
    elementOne = event.target.value;
    compareValues();
}

function handleInputTwo(event) {
    elementTwo = event.target.value;
    compareValues();
}

inputElementOne.addEventListener("input", handleInputOne);
inputElementTwo.addEventListener("input", handleInputTwo);

window.compareValues = compareValues;