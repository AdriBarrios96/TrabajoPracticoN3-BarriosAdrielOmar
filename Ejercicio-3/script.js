// obtenemos todas las tareas de la api
const todosEndpoint = "https://jsonplaceholder.typicode.com/todos?_limit=15";

// Referencias a los elementos del DOM
const todosListDiv = document.getElementById("todos-list");
const errorMessageDiv = document.getElementById("error-message");
const loadingDiv = document.getElementById("loading");

// funciona que carga y muestra las tareas
const cargarTareasCompletadas = async () => {
    todosListDiv.innerHTML = ""; // limpia resultado anterior
    errorMessageDiv.textContent = ""; // Limpia mensaje de error previo
    loadingDiv.textContent = "Cargando tareas.."; // Solo muestra el mensaje

    try {
        //Realiza la peticion HTTP (metodo GET por defecto)
        const response = await fetch(todosEndpoint);

        loadingDiv.textContent = ""; //oculta el mensaje "cargando.."

        // Verificamos si la peticion no fue exitosa
        if (!response.ok) {
            errorMessageDiv.textContent = `Tenemos un problema: ${response.status} - ${response.statusText}`;
            return; // Se detiene la ejecucion
        }

        // Convertimos a format JSON
        const data = await response.json();

        // filtramos las tareas 'completed' en 'true'
        const completedTasks = data.filter((todo) => todo.completed);

        // Verificamos si hay tareas completadas
        if (completedTasks && completedTasks.length > 0) {
            const ulElement = document.createElement("ul"); //creamos un elemento

            // Iteramos sobre las tareas completadas
            completedTasks.forEach((todo) => {
                const liElement = document.createElement("li"); //Creamos un nuevo elemento

                // Asignamos el texto al <li> con el ID
                liElement.textContent = `ID: ${todo.id} - Titulo: ${todo.title}`;
                ulElement.appendChild(liElement); // añadimos el <LI> al <UL>
            });
            todosListDiv.appendChild(ulElement); // añadimos el <UL> completo al div 'todo-list
        } else {
            todosListDiv.innerHTML = "<p> No se encontraron tareas completadas.</p>";
        }
    } catch (error) {
        // manejamos cualquier error durante la peticion GET
        loadingDiv.textContent = ""; // Oculta el mensaje de carga
        // muestra el mensaje de error
        errorMessageDiv.textContent = `ERROR DE CONEXION: ${error.message}`;
    }
};
// llamado a la funcion
cargarTareasCompletadas();