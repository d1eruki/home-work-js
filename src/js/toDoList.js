const toDoInputElement = document.querySelector("#toDoInput");
const toDoOutputElement = document.querySelector("#toDoOutput");
let storedData = JSON.parse(localStorage.getItem('storedData')) || [];

function createItem(itemData) {
    return `
        <label class="grid-table" id="${itemData.id}">
            <input aria-label="Checkbox" type="checkbox" ${itemData.done === 'Yes' ? 'checked' : ''}/>
            <span class="text-center">${itemData.importance}</span>
            <span>${itemData.task}</span>
            <span class="d-flex">
                <button class="btn cell" id="toDoDelete" type="button">✍🏼</button>
                <button class="btn cell" id="toDoEdit" type="button">❌</button>
            </span>
        </label>
    `;
}

document.addEventListener("DOMContentLoaded", function () {

    if (storedData.length === 0) {
        localStorage.setItem("storedData", JSON.stringify([]));
    }

    for (let i = 0; i < storedData.length; i++) {
        const itemData = storedData[i];

        toDoOutputElement.innerHTML += createItem(itemData);
    }
});

document.querySelector("#toDoAddBtn").addEventListener('click', function () {
    const toDoInput = toDoInputElement.value.trim();

    const id = Math.random().toString(16).slice(2);

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = false;

    const Importance = document.querySelector("#importance")

    const itemData = {
        id: id,
        done: newCheckbox.checked,
        importance: Importance.textContent.trim()[0],
        task: toDoInput,
    };

    toDoOutputElement.innerHTML += createItem(itemData);

    storedData.push(itemData);

    localStorage.setItem("storedData", JSON.stringify(storedData));

    toDoInputElement.value = '';
    Importance.textContent = 'Важность';
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