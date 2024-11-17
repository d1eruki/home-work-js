const toDoInputElement = document.getElementById("toDoInput");
const toDoOutputElement = document.getElementById("toDoOutput");

window.onload = () => {
    const storedData = localStorage.getItem('storedData');

    toDoOutputElement.append(storedData);
};

function toDoAdd() {
    const toDoInput = toDoInputElement.value.trim();
    if (!toDoInput) return;

    const newLabel = document.createElement("label");
    newLabel.classList.add('grid-table');
    newLabel.id = Math.random().toString(16).slice(2);

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = false;

    const newSpan = document.createElement("span");

    const newBtnSpan = document.createElement("span");

    const newBtnDel = document.createElement("button");
    newBtnDel.classList.add('btn');
    newBtnDel.classList.add('cell');
    newBtnDel.type = "button";
    newBtnDel.onclick = function () {
        toDoDelete();
    };
    newBtnDel.textContent = '❌';

    const newBtnEdit = document.createElement("button");
    newBtnEdit.classList.add('btn');
    newBtnEdit.classList.add('cell');
    newBtnEdit.type = "button";
    newBtnEdit.onclick = function () {
        toDoEdit();
    };
    newBtnEdit.textContent = '✍🏼';

    newSpan.append(toDoInput);
    newBtnSpan.append(newBtnEdit, newBtnDel);
    newLabel.append(newCheckbox, newSpan, newBtnSpan);

    toDoOutputElement.append(newLabel);

    const storedData = {
        id: newLabel.id,
        done: newCheckbox.checked,
        task: toDoInput,
    };

    localStorage.setItem("storedData", JSON.stringify(storedData));

    toDoInputElement.value = '';
}

window.toDoAdd = toDoAdd;

function toDoDelete() {
    const element = this.parentNode;
    element.localStorage.removeItem('storedData');
}

window.toDoDelete = toDoDelete;

function toDoEdit() {
    const element = this.parentNode;
    element.remove();
}

window.toDoEdit = toDoEdit;