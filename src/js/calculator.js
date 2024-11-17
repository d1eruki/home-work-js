function displayClear() {
    document.getElementById('display').value = '';
}

function displayAppend(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    let display = document.getElementById("display");
    let result = eval(display.value);

    display.append('=' + result);
}

window.displayClear = displayClear;
window.displayAppend = displayAppend;
window.calculate = calculate;