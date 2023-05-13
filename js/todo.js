let tasks = [];
let editing = false;
let actualIndex = undefined;
// Captura del DOM
let inputText = document.getElementById("input-text");
let btnSave = document.getElementById("btn-save");
let tasksBody = document.querySelector("tbody");
// Eventos
btnSave.addEventListener("click", () => save());
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn__to-complete")) {
    let taskID = e.target.dataset.todoid;
    completeTask(taskID);
  }
  if (e.target.id == "btn__delete") {
    // Aca accedo al elemento, despues al padre de ese elemento, despues al primer hijo de ese padre (que es el boton donde guardo el id) y extraigo el id
    let taskID = e.target.parentNode.firstElementChild.dataset.todoid;
    deleteTask(taskID);
  }
  if (e.target.id == "btn__edit") {
    // Aca accedo al elemento, despues al padre de ese elemento, despues al primer hijo de ese padre (que es el boton donde guardo el id) y extraigo el id
    let taskID = e.target.parentNode.firstElementChild.dataset.todoid;
    editTask(taskID);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  renderTasks();
});

function save() {
  if (inputText.value.length == 0) {
  } else {
    if (editing) {
      if (existTaskByText(inputText.value)) {
        console.log("Ya existe esa tarea");
      } else {
        tasks[actualIndex].text = inputText.value;
      }
    } else {
      if (existTaskByText(inputText.value)) {
        console.log("Ya existe esa tarea");
      } else {
        const newTaskObj = {
          id: Date.now(),
          text: inputText.value,
          complete: false,
        };
        tasks.push(newTaskObj);
      }
    }
    saveData();
    cleanInput();
    renderTasks();
  }
}

function cleanInput() {
  inputText.value = "";
  editing = false;
}

function completeTask(id) {
  actualIndex = findTaskById(id);
  tasks[actualIndex].complete = !tasks[actualIndex].complete;
  saveData();
  renderTasks();
}

function editTask(id) {
  actualIndex = findTaskById(id);
  inputText.value = tasks[actualIndex].text;
  editing = true;
}

function deleteTask(id) {
  actualIndex = findTaskById(id);
  tasks.splice(actualIndex, 1);
  saveData();
  renderTasks();
}

function existTaskByText(text) {
  const findTask = tasks.find((task) => task.text === text);
  return !(findTask === undefined);
}

function findTaskById(id) {
  return tasks.findIndex((task) => task.id === parseInt(id));
}

function renderTasks() {
  tasksBody.innerHTML = "";
  tasks.forEach(
    (task) =>
      (tasksBody.innerHTML += `
        <tr class="task">
        <td class="${task.complete ? "complete" : ""}">${task.text}</td>
            
            <td>
              <button data-todoID="${
                task.id
              }" class="btn__to-complete">Completar</button>
              <button id="btn__edit">Editar</button>
              <button id="btn__delete">Borrar</button>
            </td>
        </tr>`)
  );
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
  tasks = JSON.parse(localStorage.getItem("tasks") || []);
}
