const inputTask = document.querySelector("#inputTask");
const outputElement = document.querySelector("#toDoOutput");
const importance = document.querySelector("#importance");
let storedData = JSON.parse(localStorage.getItem("storedData")) || [];

function createItem(itemData) {
    const bgSalad = itemData.done === true ? "bg-salad" : "";
    return `
        <label class="grid-table w-100 gap-1 p-1 ${bgSalad}" id="${itemData.id}">
            <input class="taskCheck" aria-label="Checkbox" type="checkbox" ${itemData.done === true ? "checked" : ""}/>
            <span class="text-center">${itemData.importance}</span>
            <span class="task">${itemData.task}</span>
            <span class="d-flex">
                <button class="btn taskEdit" type="button">✍🏼</button>
                <button class="btn taskDelete" type="button">❌</button>
            </span>
        </label>
    `;
}

function updateList() {
    if (storedData.length === 0) {
        localStorage.setItem("storedData", JSON.stringify([]));
        outputElement.innerHTML = `<h2>Список дел пуст</h2>`;
    } else {
        storedData.forEach((itemData) => {
            outputElement.innerHTML += createItem(itemData);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateList();
});

document.querySelector("#toDoAddBtn").addEventListener("click", function () {
    const toDoInput = inputTask.value.trim();

    if (!toDoInput) return;

    const itemData = {
        id: Math.random().toString(16).slice(2),
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
    const parentLabel = target.closest(".grid-table");
    const task = parentLabel.querySelector(".task");
    const taskId = parentLabel.id;

    if (target.classList.contains("taskEdit")) {
        const taskInput = task.textContent.trim();
        task.innerHTML = `
            <div class="input-group">
                <input class="form-control" id="taskEditInput" placeholder="Добавь меня" required type="text" value="${taskInput}"/>
            </div>
        `;
        target.innerHTML = `✅`;
        target.classList.add("taskEditDone");
        target.classList.remove("taskEdit");
    } else if (target.classList.contains("taskEditDone")) {
        const taskInput = parentLabel.querySelector('#taskEditInput').value;

        task.textContent = taskInput;

        const taskIndex = storedData.findIndex(item => item.id === taskId);
        storedData[taskIndex].task = taskInput;
        localStorage.setItem("storedData", JSON.stringify(storedData));

        target.innerHTML = `✍🏼`;
        target.classList.add("taskEdit");
        target.classList.remove("taskEditDone");
    } else if (target.classList.contains("taskDelete")) {

        parentLabel.remove();
        storedData = storedData.filter(item => item.id !== taskId);
        localStorage.setItem("storedData", JSON.stringify(storedData));
        window.location.reload();
    }
});

outputElement.addEventListener("change", function (event) {
    const target = event.target;
    const parentLabel = target.closest(".grid-table");
    const taskId = parentLabel.id;

    if (target.checked === true) {
        parentLabel.classList.add("bg-salad");
    } else {
        parentLabel.classList.remove("bg-salad");
    }

    const taskIndex = storedData.findIndex(item => item.id === taskId);
    storedData[taskIndex].done = target.checked;
    localStorage.setItem("storedData", JSON.stringify(storedData));
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
