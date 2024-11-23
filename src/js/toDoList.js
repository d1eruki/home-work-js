const inputTask = document.querySelector("#inputTask");
const outputElement = document.querySelector("#toDoOutput");
const importance = document.querySelector("#importance")
let storedData = JSON.parse(localStorage.getItem('storedData')) || [];

function createItem(itemData) {
    return `
        <label class="grid-table w-100" id="${itemData.id}">
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
        outputElement.innerHTML = `
        <h1>Список дел пуст</h1>
    `}

    storedData.forEach(itemData => {
        outputElement.innerHTML += createItem(itemData);
    })
});

document.querySelector("#toDoAddBtn").addEventListener('click', function () {
    const toDoInput = inputTask.value.trim();

    const id = Math.random().toString(16).slice(2);

    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.checked = false;

    const itemData = {
        id: id,
        done: newCheckbox.checked,
        importance: Array.from(importance.textContent.trim())[0],
        task: toDoInput,
    };

    outputElement.innerHTML += createItem(itemData);

    storedData.push(itemData);

    localStorage.setItem("storedData", JSON.stringify(storedData));

    inputTask.value = '';
    importance.textContent = '🟢 Совсем не важно';

    document.querySelector("#toDoDelete").addEventListener('click', function () {
        const element = this.parentNode;
        element.localStorage.removeItem('storedData');
    });

    document.querySelector("#toDoEdit").addEventListener('click', function () {
        const element = this.parentNode;
        element.remove();
    });

    window.location.reload();
});

document.querySelectorAll('.importance-btn').forEach(btn => {
    btn.addEventListener('click', function (event) {
        importance.textContent = event.target.textContent.trim();
    });
});

document.querySelector("#clearStorage").addEventListener('click', function () {
    localStorage.clear();
    window.location.reload();
});