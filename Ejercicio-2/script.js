document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Cargado y script iniciado.");
    const palabrasOriginales = [
        "River",
        "Boca",
        "PSG",
        "Real Madrid",
        "Barcelona",
    ];

    // El script se carga al final del body, por eso el DOM ya esta disponible
    const filtroInput = document.getElementById('filtroInput');
    const botonFiltrar = document.getElementById('botonFiltrar');
    const listaPalabrasUl = document.getElementById('listaPalabras');
    const mensajeErrorDiv = document.getElementById('mensajeError');

    // mostramos la lista de palabras en el HTML.
    const mostrarPalabras = (palabrasAMostrar) => {
        listaPalabrasUl.innerHTML = '';// limpiamos la lista

        if (palabrasAMostrar.lenght === 0) {
            const li = document.createElement('li');
            li.textContent = 'no hay coincidencia.';
            listaPalabrasUl.appendChild(li);
            return;
        }

        palabrasAMostrar.forEach(palabra => {
            const li = document.createElement('li');
            li.textContent = palabra;
            listaPalabrasUl.appendChild(li);
        });
    };

    // filtramos las palabras con las que el usuario ingresa
    const filtrarLista = () => {
        // obtenemos el texto y eliminamos espacion en blanco
        const textoFiltro = filtroInput.value.trim();

        // si el campo de texto esta vacio, mostramos un error
        if (textoFiltro === '') {
            mensajeErrorDiv.textContent = 'INGRESE UN TEXTO PARA FILTRAR';
            mostrarPalabras(palabrasOriginales); // muestra las palabras
            return;
        } else {
            mensajeErrorDiv.textContent = ''; // limpiamos el mensaje de error.
        }

        // volvemos el texto ingresado a minuscula
        const textoFiltrolower = textoFiltro.toLowerCase();

        // Filtramos las palabras originales
        const palabrasFiltradas = palabrasOriginales.filter(palabra => {
            // volvemos minuscula cada palabra para comparar
            return palabra.toLowerCase().includes(textoFiltrolower);
        });

        mostrarPalabras(palabrasFiltradas); // actualizamos la lista
    };

    botonFiltrar.addEventListener('click', filtrarLista);

    // inicializamos y mostramos las palabras al cargar la pagina
    mostrarPalabras(palabrasOriginales);
});