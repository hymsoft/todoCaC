# Administrador de tareas

Este proyecto es un administrador de tareas simple que te permite crear, editar, completar y eliminar tareas. También incluye citas motivacionales para mantenerte inspirado.
Es un proyecto pequeño, para poner en práctica lo aprendido en el curso FullStack NodeJS de Codo a Codo(2023), dictado por el profesor Jean Paul Ferreira.

## Uso

1. Ingresa una tarea en el campo de texto.
2. Haz clic en "Guardar" para agregar la tarea a la lista.
3. Para marcar una tarea como completada, haz clic en el botón de verificación correspondiente.
4. Para editar una tarea existente, haz clic en el botón de edición y modifica el texto de la tarea.
5. Para eliminar una tarea, haz clic en el botón de eliminación.

## Citas motivacionales

El administrador de tareas incluye una selección de citas motivacionales para inspirarte. Estas citas se muestran cuando no hay tareas pendientes. Cada vez que cargues la página, se mostrará una cita aleatoria.

## Funcionalidades adicionales

- Ordenamiento de tareas: Las tareas se ordenan alfabéticamente de forma ascendente.
- Mensajes emergentes: Se muestran mensajes de error y confirmación utilizando mensajes emergentes en la interfaz.
- Cambio de tema: Puedes alternar entre temas de claro y oscuro haciendo clic en el ícono correspondiente.

## Configuración y personalización

Puedes personalizar el administrador de tareas realizando las siguientes modificaciones:

- Añadir más citas motivacionales: Puedes agregar citas adicionales en el array `motivationaltext` del archivo JavaScript.
- Modificar estilos: Puedes editar los estilos CSS para personalizar la apariencia del administrador de tareas.
- Añadir más funcionalidades: Si deseas ampliar la funcionalidad, puedes agregar más características al código existente.

## Contribuir

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, puedes seguir los pasos a continuación:

1. Realiza un fork del repositorio.
2. Crea una rama para tu contribución.
3. Realiza los cambios en tu rama.
4. Realiza un pull request indicando los cambios realizados.

## Licencia

Este proyecto está bajo la Licencia [MIT](LICENSE).

# Descripción de las funciones

## Función `saveTask()`

Guarda una nueva tarea o actualiza una existente en la lista de tareas.

### Parámetros

Ninguno

### Comportamiento

- Verifica si el campo de texto está vacío. Si es así, no realiza ninguna acción.
- Si el modo de edición está activado:
  - Verifica si existe una tarea con el mismo texto en la lista de tareas:
    - Si el texto de la tarea no ha cambiado, muestra un mensaje de error indicando que no se realizaron cambios.
    - Si el texto de la tarea ha cambiado, muestra un mensaje de error indicando que ya existe una tarea con ese texto.
  - Si no existe una tarea con el mismo texto, actualiza el texto de la tarea existente en la posición `actualIndex`.
- Si el modo de edición no está activado:
  - Verifica si existe una tarea con el mismo texto en la lista de tareas:
    - Si existe, muestra un mensaje de error indicando que ya existe esa tarea.
    - Si no existe, crea un nuevo objeto de tarea con un ID generado con `Date.now()`, el texto ingresado y el estado de completitud establecido en `false`. Luego, agrega el objeto de tarea a la lista de tareas.
- Guarda los cambios en el almacenamiento local utilizando la función `saveData()`.
- Limpia el campo de entrada de texto llamando a la función `cleanInput()`.
- Vuelve a renderizar las tareas en el DOM llamando a la función `renderTasks()`.

#

## Función `completeTask(id)`

Marca una tarea como completada o incompleta en la lista de tareas.

### Parámetros

- `id`: El ID de la tarea que se debe marcar como completada o incompleta.

### Comportamiento

- Busca el índice de la tarea en la lista de tareas utilizando la función `findTaskById(id)`.
- Cambia el estado de completitud de la tarea en la posición `actualIndex` invirtiendo su valor actual utilizando el operador `!`.
- Guarda los cambios en el almacenamiento local utilizando la función `saveData()`.
- Vuelve a renderizar las tareas en el DOM llamando a la función `renderTasks()`.

#

## Función `editTask(id)`

Permite editar una tarea existente en la lista de tareas.

### Parámetros

- `id`: El ID de la tarea que se desea editar.

### Comportamiento

- Busca el índice de la tarea en la lista de tareas utilizando la función `findTaskById(id)`.
- Establece el valor del campo de entrada de texto (`inputText`) con el texto de la tarea en la posición `actualIndex`.
- Activa el modo de edición estableciendo la variable `editing` en `true`.
- Enfoca el campo de entrada de texto utilizando la función `focus()`.

#

## Función `deleteTask(id)`

Elimina una tarea de la lista de tareas.

### Parámetros

- `id`: El ID de la tarea que se desea eliminar.

### Comportamiento

- Busca el índice de la tarea en la lista de tareas utilizando la función `findTaskById(id)`.
- Utiliza el método `splice()` para eliminar la tarea en la posición `actualIndex` de la lista de tareas.
- Guarda los cambios en el almacenamiento local utilizando la función `saveData()`.
- Vuelve a renderizar las tareas en el DOM llamando a la función `renderTasks()`.

#

## Función `renderTasks()`

Renderiza las tareas en el DOM.

### Comportamiento

- Limpia el contenido actual del contenedor `tasksBody` para asegurarse de que esté vacío.
- Verifica si hay tareas en la lista `tasks`.
  - Si hay tareas, itera sobre cada tarea utilizando el método `forEach()` y genera el HTML correspondiente para cada una de ellas.
    - Para cada tarea, se crea una fila (`<tr>`) con la clase `task`.
    - El texto de la tarea se coloca en una celda (`<td>`) con la clase `complete` si la tarea está marcada como completada.
    - Se crea una celda (`<td>`) con la clase `d-flex justify-content-end` para contener los botones de acción.
      - Se genera el botón de completar tarea (`<button>`) con la clase `btn__to-completeTask btn btn-success` y se establece su acción `onclick` para llamar a la función `completeTask()` con el ID de la tarea.
      - Se utiliza un icono diferente dependiendo del estado de completado de la tarea.
      - Se genera el botón de editar tarea (`<button>`) con la clase `btn btn-info` y se establece su acción `onclick` para llamar a la función `editTask()` con el ID de la tarea.
      - El botón de editar tarea está desactivado (`disabled`) si la tarea está completada.
      - Se genera el botón de eliminar tarea (`<button>`) con la clase `btn btn-danger` y se establece su acción `onclick` para llamar a la función `deleteTask()` con el ID de la tarea.
  - Si no hay tareas, se muestra un mensaje de "No tienes tareas pendientes" junto con una cita motivacional aleatoria.
    - La cita motivacional se selecciona aleatoriamente utilizando la función `randomNumberBetween()` y se muestra el texto y el autor en el HTML.

#

## Función `existTaskByText(text)`

Verifica si existe una tarea con un texto específico en la lista de tareas.

### Parámetros

- `text` (string): El texto de la tarea a buscar.

### Valor de retorno

- `true` si se encuentra una tarea con el texto especificado.
- `false` si no se encuentra ninguna tarea con el texto especificado.

### Comportamiento

- Utiliza el método `find()` de la lista `tasks` para buscar una tarea cuyo texto sea igual al parámetro `text`.
- Retorna `true` si se encuentra una tarea con el texto especificado, lo que indica que la tarea ya existe.
- Retorna `false` si no se encuentra ninguna tarea con el texto especificado, lo que indica que la tarea no existe.

#

## Función `findTaskById(id)`

Encuentra una tarea por su ID en la lista de tareas.

### Parámetros

- `id`: El ID de la tarea que se desea buscar.

### Comportamiento

- Utiliza el método `findIndex()` en la lista de tareas para encontrar la tarea que coincide con el ID proporcionado.
- Compara el ID de cada tarea con el ID proporcionado utilizando `task.id === parseInt(id)`.
- Devuelve el índice de la tarea encontrada en la lista de tareas.

#

## Función `saveData()`

Guarda los datos de las tareas en el almacenamiento local.

### Comportamiento

- Ordena las tareas en orden ascendente utilizando la función `orderByTaskAsc()`.
- Convierte las tareas en formato JSON utilizando `JSON.stringify(tasks)`.
- Guarda las tareas en el almacenamiento local utilizando `localStorage.setItem("tasks", ...)`.
- Deshabilita el botón de guardar tarea llamado `btnSaveTask` estableciendo su propiedad `disabled` en `true`.
- Establece el foco en el campo de texto de entrada llamado `inputText` utilizando `inputText.focus()`.

#

## Función `loadData()`

Carga los datos de las tareas y el tema actual desde el almacenamiento local.

### Comportamiento

- Recupera los datos de las tareas almacenadas en formato JSON utilizando `localStorage.getItem("tasks")`. Si no hay datos almacenados, se asigna un array vacío como valor predeterminado.
- Recupera el tema actual almacenado en `localStorage.getItem("theme")`. Si no hay tema almacenado, se asigna el tema "light" como valor predeterminado.
- Si el tema actual es "light", se llama a la función `lightTheme()`. De lo contrario, se llama a la función `darkTheme()`.

#

## Función `cleanInput()`

Limpia el campo de entrada y restablece la bandera de edición.

### Comportamiento

- Establece el valor del campo de entrada `inputText` como una cadena vacía.
- Establece la variable `editing` como `false`.

#

## Función `orderByTaskAsc()`

Ordena las tareas en orden ascendente según el texto de la tarea.

### Comportamiento

- Utiliza el método `sort()` para ordenar las tareas en función del texto de la tarea.
- Compara el texto de dos tareas `a` y `b` y determina su orden relativo:
  - Si el texto de `a` es menor que el texto de `b`, se devuelve `-1`.
  - Si el texto de `a` es mayor que el texto de `b`, se devuelve `1`.
  - Si el texto de `a` es igual al texto de `b`, se devuelve `0`.

#

## Función `randomNumberBetween(minValue, maxValue)`

Genera un número aleatorio entre un valor mínimo y un valor máximo (ambos inclusive).

### Parámetros

- `minValue`: El valor mínimo del rango.
- `maxValue`: El valor máximo del rango.

### Valor de retorno

- Devuelve un número entero aleatorio entre `minValue` y `maxValue`.
