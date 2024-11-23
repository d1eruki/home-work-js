const inputTask = document.querySelector("#inputTask");
const outputElement = document.querySelector("#toDoOutput");
const importance = document.querySelector("#importance");
let storedData = JSON.parse(localStorage.getItem("storedData")) || [];

function createItem(itemData) {
    return `
        <label class="grid-table w-100" id="${itemData.id}">
            <input class="taskCheck" aria-label="Checkbox" type="checkbox" ${itemData.done === true ? "checked" : ""}/>
            <span class="text-center">${itemData.importance}</span>
            <span>${itemData.task}</span>
            <span class="d-flex">
                <button class="btn cell taskEdit" type="button">✍🏼</button>
                <button class="btn cell taskDelete" type="button">❌</button>
            </span>
        </label>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    if (storedData.length === 0) {
        localStorage.setItem("storedData", JSON.stringify([]));
        outputElement.innerHTML = `<h2>Список дел пуст</h2>`;
    } else {
        storedData.forEach((itemData) => {
            outputElement.innerHTML += createItem(itemData);
        });
    }
});

document.querySelector("#toDoAddBtn").addEventListener("click", function () {
    const toDoInput = inputTask.value.trim();

    if (!toDoInput) return;

    const id = Math.random().toString(16).slice(2);

    const itemData = {
        id: id,
        done: false,
        importance: Array.from(importance.textContent.trim())[0],
        task: toDoInput,
    };

    outputElement.innerHTML += createItem(itemData);

    storedData.push(itemData);
    localStorage.setItem("storedData", JSON.stringify(storedData));

    inputTask.value = "";
    importance.textContent = "🟢 Совсем не важно";
    window.location.reload();
});

outputElement.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("taskEdit")) {
        alert("Функция редактирования пока не реализована.");
    }

    if (target.classList.contains("taskDelete")) {
        const parentLabel = target.closest(".grid-table");
        const taskId = parentLabel.id;

        parentLabel.remove();

        storedData = storedData.filter((item) => item.id !== taskId);
        localStorage.setItem("storedData", JSON.stringify(storedData));
        window.location.reload();
    }
});

document.querySelectorAll(".importance-btn").forEach((btn) => {
    btn.addEventListener("click", function (event) {
        importance.textContent = event.target.textContent.trim();
    });
});

document.querySelector("#clearStorage").addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
});
