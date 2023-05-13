let tasks = [];
let editing = false;
// Captura del DOM
let inputText = document.getElementById("input-text");
let btnSave = document.getElementById("btn-save");
let tasksBody = document.querySelector("tbody");
// Eventos
btnSave.addEventListener("click", () => save());

function save() {
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

function cleanInput() {
  inputText.value = "";
  editing = false;
}

function viewDataByConsole(data) {
  console.log(data);
}

function existTaskByText(text) {
  const findTask = tasks.find((task) => task.text === text);
  return !(findTask === undefined);
}

function renderTasks() {
  tasksBody.innerHTML = "";
  tasks.forEach(
    (task) =>
      (tasksBody.innerHTML += `
        <tr class="task">
            <td>${task.text}</td>
            <td>
              <button>Completar</button>
              <button>Editar</button>
              <button>Borrar</button>
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

loadData();
renderTasks();
