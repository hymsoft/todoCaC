let tasks = [];
let editing = false;
// Captura del DOM
let inputText = document.getElementById("input-text");
let btnSave = document.getElementById("btn-save");

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
  viewDataByConsole(tasks);
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

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
