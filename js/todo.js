let tasks = [];
tasks = [
  {
    id: Date.now(),
    text: "Tarea 1",
    complete: false,
  },
  {
    id: Date.now(),
    text: "Tarea 2",
    complete: false,
  },
  {
    id: Date.now(),
    text: "Tarea 3",
    complete: false,
  },
];
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
