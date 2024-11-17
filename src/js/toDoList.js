function toDoAdd() {
    const toDoInputElement = document.getElementById("toDoInput");
    const toDoOutputElement = document.getElementById("toDoOutput");

    const toDoInput = toDoInputElement.value.trim();
    if (!toDoInput) return;

    const newLabel = document.createElement("label");
    newLabel.classList.add('grid-table');

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = false;

    const newSpan = document.createElement("span");

    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add('btn');
    newDeleteBtn.classList.add('cell');
    newDeleteBtn.type = "button";
    newDeleteBtn.onclick = function () {
        toDoDelete();
    };
    newDeleteBtn.textContent = '❌';

    newSpan.append(toDoInput);
    newLabel.append(newCheckbox, newSpan, newDeleteBtn);

    // localStorage.setItem('newCheckbox', toDoInput);

    const localItems = localStorage.getItem('newRowTask');

    toDoOutputElement.append(newLabel);
    toDoInputElement.value = '';
}

window.toDoAdd = toDoAdd;

function toDoDelete() {
    const element = this.parentNode;
    element.remove();
}

window.toDoDelete = toDoDelete;

/*function clearLocal() {
    localStorage.clear();
}

window.clearLocal = clearLocal;*/