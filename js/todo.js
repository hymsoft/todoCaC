let tasks = [];
let editing = false;
// Captura del DOM
let inputText = document.getElementById("input-text");
let btnSave = document.getElementById("btn-save");
let tasksBody = document.querySelector("tbody");
// Eventos
btnSave.addEventListener("click", () => save());
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn__to-complete")) {
    completeTask(e.target.dataset.todoid);
  }
  if (e.target.id == "btn__delete") {
    deleteTask(e.target.dataset.todoid);
  }
  //   console.log(e.target.id.contains("hugo"));
});
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  renderTasks();
});

function save() {
  if (inputText.value.length == 0) {
  } else {
    if (editing) {
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
  let searchId = findTaskById(id);
  tasks[searchId].complete = !tasks[searchId].complete;
  saveData();
  renderTasks();
}

function deleteTask(id) {
  let searchId = findTaskById(id);
  tasks.splice(searchId, 1);
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
              <button>Editar</button>
              <button data-todoID="${task.id}" id="btn__delete">Borrar</button>
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
