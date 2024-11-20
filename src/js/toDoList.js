const toDoInputElement = document.getElementById("toDoInput");
const toDoOutputElement = document.getElementById("toDoOutput");

document.addEventListener("DOMContentLoaded", function () {
    const storedDataAppend = JSON.parse(localStorage.getItem('storedData'));
    console.log(storedDataAppend);

    if (storedDataAppend !== null) {
        for (let i = 0; i < storedDataAppend.length; i++) {
            const itemData = storedDataAppend[i];

            const item = document.createElement('label');
            item.classList.add('grid-table');

            item.innerHTML = `
                <input aria-label="Checkbox" type="checkbox" ${itemData.done === 'Yes' ? 'checked' : ''}/>
                <span class="text-center">${itemData.importance}</span>
                <span>${itemData.task}</span>
                <span class="d-flex">
                    <button class="btn cell" onclick="toDoDelete()" type="button">✍🏼</button>
                    <button class="btn cell" onclick="toDoEdit()" type="button">❌</button>
                </span>
            `;

            toDoOutputElement.append(item);
        }
    }
});

function toDoAdd() {
    const toDoInput = toDoInputElement.value.trim();

    const newLabel = document.createElement("label");
    newLabel.classList.add('grid-table');
    newLabel.id = Math.random().toString(16).slice(2);

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = false;

    const getImportance = document.getElementById("importance");
    const newImportance = document.createElement("span");
    newImportance.classList.add('text-center');
    newImportance.textContent = Array.from(getImportance.textContent.trim())[0];

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
    newLabel.append(newCheckbox, newImportance, newSpan, newBtnSpan);

    toDoOutputElement.append(newLabel);

    let storedData = JSON.parse(localStorage.getItem('storedData'));

    const newData = {
        id: newLabel.id,
        done: newCheckbox.checked,
        importance: newImportance.textContent,
        task: toDoInput,
    };

    if (storedData !== null) {
        storedData.push(newData);
    } else {
        storedData = [];
    }

    localStorage.setItem("storedData", JSON.stringify(storedData));
    console.log(storedData);

    toDoInputElement.value = '';
    getImportance.textContent = 'Важность';
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

function selectImportance() {
    let importance = this.textContent.trim();
    const importantOutput = document.getElementById("importance");

    importantOutput.textContent = importance;
}

window.selectImportance = selectImportance;

function clearStorage() {
    localStorage.clear();
    window.location.reload();
}

window.clearStorage = clearStorage;