const motivationaltext = [
  {
    text: "El único modo de hacer un gran trabajo es amar lo que haces.",
    author: "Steve Jobs",
  },
  {
    text: "Nunca pienso en las consecuencias de fallar un gran tiro… cuando se piensa en las consecuencias se está pensando en un resultado negativo.",
    author: "Michael Jordan",
  },
  {
    text: "El dinero no es la clave del éxito; la libertad para poder crear lo es.",
    author: "Nelson Mandela",
  },
  {
    text: "La inteligencia consiste no sólo en el conocimiento, sino también en la destreza de aplicar los conocimientos en la práctica.",
    author: "Aristóteles",
  },
  {
    text: "Cuando algo es lo suficientemente importante, lo haces incluso si las probabilidades de que salga bien no te acompañan.",
    author: "Elon Musk",
  },
  {
    text: "La lógica te llevará de la a a la z. la imaginación te llevará a cualquier lugar.",
    author: "Albert Einstein",
  },
  {
    text: "El 80% del éxito se basa simplemente en insistir.",
    author: "Woody Allen",
  },
  {
    text: "Trabajar duro por algo que no te importa se llama estrés. Trabajar duro por algo que te importa de verdad se llama pasión.",
    author: "Simon Sinek",
  },
];

let tasks = [];
let editing = false;
let actualIndex = undefined;
// Captura del DOM
const inputText = document.getElementById("input-text");
const btnSaveTask = document.getElementById("btn-saveTask");
const tasksBody = document.querySelector("tbody");
// Eventos
btnSaveTask.addEventListener("click", () => saveTask());
document.addEventListener("DOMContentLoaded", () => {
  inputText.focus();
  loadData();
  renderTasks();
});

inputText.addEventListener("input", () => {
  if (inputText.value.trim().length > 0) {
    btnSaveTask.disabled = false;
  } else {
    btnSaveTask.disabled = true;
  }
});

/**
 * Guarda una tarea en la lista de tareas.
 * Si se está editando una tarea existente, se actualiza su texto.
 * Si se está creando una nueva tarea, se agrega a la lista de tareas.
 * Finalmente, se guarda la lista de tareas, se limpia el campo de entrada y se muestra la lista actualizada.
 */
function saveTask() {
  if (inputText.value.length == 0) {
  } else {
    if (editing) {
      if (existTaskByText(inputText.value)) {
        if (tasks[actualIndex].text == inputText.value) {
          createToast("Error", "No hubo modificación. No se aplicaron cambios");
        } else {
          createToast("Error", "Ya existe esa tarea. No se aplicaron cambios");
        }
      } else {
        tasks[actualIndex].text = inputText.value;
      }
    } else {
      if (existTaskByText(inputText.value)) {
        createToast("Error", "Ya existe esa tarea.");
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

/**
 * Marca una tarea como completada o incompleta según su ID.
 *
 * @param {number} id - El ID de la tarea a marcar.
 */
function completeTask(id) {
  actualIndex = findTaskById(id);
  tasks[actualIndex].complete = !tasks[actualIndex].complete;
  saveData();
  renderTasks();
}

/**
 * Permite editar una tarea existente según su ID.
 *
 * @param {number} id - El ID de la tarea a editar.
 */
function editTask(id) {
  actualIndex = findTaskById(id);
  inputText.value = tasks[actualIndex].text;
  editing = true;
  inputText.focus();
}

/**
 * Elimina una tarea de la lista según su ID.
 *
 * @param {number} id - El ID de la tarea a eliminar.
 */
function deleteTask(id) {
  actualIndex = findTaskById(id);
  tasks.splice(actualIndex, 1);
  saveData();
  renderTasks();
}

/**
 * Renderiza las tareas en la interfaz de usuario.
 * Limpia el contenido del elemento `tasksBody` y luego agrega las filas de tabla correspondientes a cada tarea.
 * Si no hay tareas, se muestra un mensaje motivacional en su lugar.
 */
function renderTasks() {
  tasksBody.innerHTML = "";
  if (tasks.length != 0) {
    tasks.forEach(
      (task) =>
        (tasksBody.innerHTML += `
          <tr class="task">
          <td class="${task.complete ? "complete" : ""}">${task.text}</td>
              
              <td class="d-flex justify-content-end">
                <button class="btn__to-completeTask btn btn-success me-2" onclick="completeTask(${
                  task.id
                })">
                ${
                  task.complete
                    ? '<i class="bi bi-arrow-repeat"></i>'
                    : '<i class="bi bi-check-circle"></i>'
                }
                </button>
                <button id="btn__edit" class="btn btn-info me-2" ${
                  task.complete ? "disabled" : ""
                } onclick="editTask(${
          task.id
        })"><i class="bi bi-pencil"></i></button>
                <button id="btn__delete" class="btn btn-danger" onclick="deleteTask(${
                  task.id
                })"><i class="bi bi-trash"></i></button>
              </td>
          </tr>`)
    );
  } else {
    let getMotivationalIndex = randomNumberBetween(
      0,
      motivationaltext.length - 1
    );
    tasksBody.innerHTML += `
    <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">No tienes tareas pendientes.</h4>
      <figure>
        <blockquote class="blockquote">
          <p>${motivationaltext[getMotivationalIndex].text}</p>
        </blockquote>
        <figcaption class="blockquote-footer">
          <cite title="${motivationaltext[getMotivationalIndex].author}">${motivationaltext[getMotivationalIndex].author}</cite>
        </figcaption>
      </figure>
      <hr>
      <p class="mb-0">Que tengas un lindo día ♥</p>
    </div>`;
  }
}

/**
 * Verifica si existe una tarea con el texto especificado en la lista de tareas.
 *
 * @param {string} text - El texto de la tarea a buscar.
 * @returns {boolean} - `true` si se encuentra una tarea con el texto especificado, de lo contrario, `false`.
 */
function existTaskByText(text) {
  const findTask = tasks.find((task) => task.text === text);
  return !(findTask === undefined);
}

/**
 * Busca una tarea por su ID en la lista de tareas y devuelve el índice de la tarea encontrada.
 *
 * @param {number} id - El ID de la tarea a buscar.
 * @returns {number} - El índice de la tarea encontrada en la lista, o -1 si no se encuentra.
 */
function findTaskById(id) {
  return tasks.findIndex((task) => task.id === parseInt(id));
}

/**
 * Guarda los datos de la lista de tareas en el almacenamiento local.
 * Ordena las tareas por orden alfabético ascendente antes de guardar.
 * Deshabilita el botón btnSaveTask y establece el foco en el campo de entrada inputText.
 */
function saveData() {
  orderByTaskAsc();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  btnSaveTask.disabled = true;
  inputText.focus();
}

/**
 * Carga los datos de la lista de tareas desde el almacenamiento local.
 * Si no hay datos guardados, se asigna una lista vacía al arreglo tasks.
 * Obtiene el tema actual del almacenamiento local y aplica el tema correspondiente.
 */
function loadData() {
  tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  let actualTheme = localStorage.getItem("theme") || "light";
  actualTheme === "light" ? lightTheme() : darkTheme();
}

/**
 * Limpia el campo de entrada inputText.
 * Restablece el valor del campo a una cadena vacía y establece la variable editing en falso.
 */
function cleanInput() {
  inputText.value = "";
  editing = false;
}

/**
 * Ordena las tareas en orden alfabético ascendente según su texto.
 */
function orderByTaskAsc() {
  tasks.sort((a, b) => {
    if (a.text < b.text) {
      return -1;
    }
    if (a.text > b.text) {
      return 1;
    }
    return 0;
  });
}

/**
 * Crea y muestra un mensaje de notificación (toast) en la interfaz de usuario.
 *
 * @param {string} titulo - El título del toast.
 * @param {string} mensaje - El contenido del mensaje del toast.
 */
const createToast = (titulo, mensaje) => {
  // Crear el elemento HTML del toast
  const toastElement = document.createElement("div");
  toastElement.classList.add("toast");
  toastElement.classList.add("text-bg-danger");
  toastElement.setAttribute("role", "alert");
  toastElement.setAttribute("aria-live", "assertive");
  toastElement.setAttribute("aria-atomic", "true");
  toastElement.setAttribute("data-bs-autohide", "true");
  toastElement.innerHTML = `
  <div class="toast-header">
    <strong class="me-auto">${titulo}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Cerrar"></button>
  </div>
  <div class="toast-body">
    ${mensaje}
  </div>
`;

  // Agregar el elemento HTML al contenedor de toasts
  document.getElementById("toastContainer").appendChild(toastElement);

  // Crear una instancia del objeto Toast y mostrarlo
  const myToast = new bootstrap.Toast(toastElement);
  myToast.show();

  // Eliminar el toast después de un tiempo
  setTimeout(() => {
    myToast.hide();
    toastElement.remove();
  }, 5000);
};

/**
 * Genera un número aleatorio entre dos valores dados, ambos inclusivos.
 *
 * @param {number} minValue - El valor mínimo del rango.
 * @param {number} maxValue - El valor máximo del rango.
 * @returns {number} - Un número aleatorio entre el valor mínimo y máximo, ambos inclusivos.
 */
const randomNumberBetween = (minValue, maxValue) => {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

/**
 * Aplica el tema oscuro a la interfaz de usuario.
 * Establece el atributo "data-bs-theme" del elemento body en "dark".
 * Actualiza la clase del icono de cambio de tema a "bi bi-sun-fill".
 */
const darkTheme = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "dark");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill");
};

/**
 * Aplica el tema claro a la interfaz de usuario.
 * Establece el atributo "data-bs-theme" del elemento body en "light".
 * Actualiza la clase del icono de cambio de tema a "bi bi-moon-fill".
 */
const lightTheme = () => {
  document.querySelector("body").setAttribute("data-bs-theme", "light");
  document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon-fill");
};

/**
 * Cambia entre el tema oscuro y el tema claro en la interfaz de usuario.
 * Si el tema actual es "light", se aplica el tema oscuro llamando a la función darkTheme().
 * Si el tema actual es "dark", se aplica el tema claro llamando a la función lightTheme().
 * Se guarda el tema actual en el almacenamiento local.
 */
const changeTheme = () => {
  document.querySelector("body").getAttribute("data-bs-theme") === "light"
    ? darkTheme()
    : lightTheme();
  localStorage.setItem(
    "theme",
    document.querySelector("body").getAttribute("data-bs-theme")
  );
};
