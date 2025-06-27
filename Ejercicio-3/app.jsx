/* Esta linea no es necesaria, y funciona sin ella, pero por buenas practicas me gusto incorporarla
import React, { useState, useEffect} from 'react'; */

const { useState, useEffect } = React;

function App() {
    const [todos, setTodos] = useState([]); //almacena todas las tareas
    const [completedTodos, setCompletedTodos] = useState([]); // almacena SOLO las tareas completadas
    const [error, setError] = useState(null); // manejo de errores
    const [loading, setLoading] = useState(true); // verifica si la primera carga finalizo

    // useEffect se ejecuta cada vez que cambien sus dependencias, y usamos
    // un array vacio ([]) para ejecutarlo solo una vez
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos') //peticion GET a la api
            .then(response => {
                if (!response.ok) { // verificamos si la respuesta a la peticion fue correcta
                    throw new Error(`Error HTTP! Estado: ${response.status}`); // si no es correcta, da error
                }
                return response.json(); // si es correcta parsea la respuesta
            })
            .then(data => {
                setTodos(data); //guardamos los datos obtenidos en todos.
                setLoading(false); //termina la carga
            })
            .catch(error => {
                console.error("Problemas al obtener las tareas. ", 'error'); // capturamos cualquier
                setError(error.message); // guardamos el error
                setLoading(false); // terminamos la carga.
            });
        
    }, []); // aseguramos que se ejecute con el array vacio

    // ejecutamos useEffect una vez que el estado de "todos" cambia
    useEffect(() => {
        const tareasTemporales = []; //array temporal para las tareas completadas
        todos.forEach(todo => {
            if (todo.completed) { // si completed es true añadimos la tarea
                tareasTemporales.push(todo);
            }
        });

        // filtramos el array temporal para que solo tenga tareas completadas
        const tareasFiltradas = tareasTemporales.filter(todo => todo.completed);

        // actualizamos completedTodos con las tareas terminadas
        setCompletedTodos(tareasFiltradas);
    }, [todos]); //esto reejucta cada que el array cambia.

    if (error) { //mostramos un mensaje de error
        return <div>Erro al cargar tarea: {error}</div>;
    }

    if (loading) { // mensaje de carga (si todavia no hay cargadas)
        return <div>Cargando tareas... </div>;
    }

    return (
        <>
            <h1>Tareas Completadas</h1>
            <ul>
                {/* uso map para iterar en 'completedTodo"*/}
                {completedTodos.map(todo => (
                    // saque el 'key' de la pagina de react
                    // nos ayuda a identificar elementos de una lista
                    <li key={todo.id}>
                        {todo.title}
                    </li>
                ))}
            </ul>
            {completedTodos.length === 0 && !loading && (
                // si no hay tareas completadas despues de cargarlas veremos esto
                <p>No hay tareas completadas</p>
            )}
        </>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);