const toDoInputElement = document.querySelector("#toDoInput");
const toDoOutputElement = document.querySelector("#toDoOutput");

document.addEventListener("DOMContentLoaded", function () {
    const storedDataAppend = JSON.parse(localStorage.getItem('storedData'));

    if (storedDataAppend == null) {
        return
    }

    for (let i = 0; i < storedDataAppend.length; i++) {
        const itemData = storedDataAppend[i];

        const item = document.createElement('label');
        item.classList.add('grid-table');

        item.innerHTML = `
                <input aria-label="Checkbox" type="checkbox" ${itemData.done === 'Yes' ? 'checked' : ''}/>
                <span class="text-center">${itemData.importance}</span>
                <span>${itemData.task}</span>
                <span class="d-flex">
                    <button class="btn cell" id="toDoDelete" type="button">✍🏼</button>
                    <button class="btn cell" id="toDoEdit" type="button">❌</button>
                </span>
            `;

        toDoOutputElement.append(item);
    }
});

document.querySelector("#toDoAddBtn").addEventListener('click', function () {
    const toDoInput = toDoInputElement.value.trim();

    const newLabel = document.createElement("label");
    newLabel.classList.add('grid-table');
    newLabel.id = Math.random().toString(16).slice(2);

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = false;

    const getImportance = document.querySelector("#importance");
    const newImportance = document.createElement("span");
    newImportance.classList.add('text-center');
    newImportance.textContent = Array.from(getImportance.textContent.trim())[0];

    const newSpan = document.createElement("span");

    const newBtnSpan = document.createElement("span");

    const newBtnDel = document.createElement("button");
    newBtnDel.classList.add('btn');
    newBtnDel.classList.add('cell');
    newBtnDel.id = 'toDoDelete';
    newBtnDel.type = "button";
    newBtnDel.textContent = '❌';

    const newBtnEdit = document.createElement("button");
    newBtnEdit.classList.add('btn');
    newBtnEdit.classList.add('cell');
    newBtnDel.id = 'toDoEdit';
    newBtnEdit.type = "button";
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

    toDoInputElement.value = '';
    getImportance.textContent = 'Важность';
});


document.querySelector("#toDoDelete").addEventListener('click', function () {
    const element = this.parentNode;
    element.localStorage.removeItem('storedData');
});

document.querySelector("#toDoEdit").addEventListener('click', function () {
    const element = this.parentNode;
    element.remove();
});

document.querySelectorAll('.js-importance-btn').forEach(btn => {
    btn.addEventListener('click', function (event) {
        document.querySelector("#importance").textContent = event.target.textContent.trim();
    });
});

document.querySelector("#clearStorage").addEventListener('click', function () {
    localStorage.clear();
    window.location.reload();
});