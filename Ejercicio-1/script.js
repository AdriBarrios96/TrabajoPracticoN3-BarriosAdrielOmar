document.addEventListener('DOMContentLoaded', () => {
    // Nos aseguramos que todos los elementos HTML esten disponibles
    // usamos referencias a los HTML usando IDs, esto nos permite manipularlos
    // desde JavaScript
    /*const numero1Input = document.getElementById('numero1');
    const numero2Input = document.getElementById('numero2');
    const operacionSelect = document.getElementById('operacion');
    const botonCalcular = document.getElementById('botonCalcular');
    const resultadoDiv = document.getElementById('resultado');*/

    const numero1Input = document.getElementById('numero1');
    const numero2Input = document.getElementById('numero2');
    const operacionSelect = document.getElementById('operacion');
    const botonCalcular = document.getElementById('botonCalcular');
    const resultadoDiv = document.getElementById('resultado');
    // analizamos si la divios es por cero
    const divisionPorCero = () => {
        const operacion = operacionSelect.value; //obtenemos el valor de la operacion
        const num2 = parseFloat(numero2Input.value); // volvemos flotante el segundo input

        if (operacion === 'division' && num2 === 0) {
            botonCalcular.style.display = 'none'; //si se cumple, ocultamos el boton utilizando display y none.
            resultadoDiv.textContent = "POR CERO IMPOSIBLE!"; // mostramos el mensaje al usuario.
        } else {
            botonCalcular.style.display = 'block'; //si no se cumple, volvemos a mostrar el boton 'block' lo vuelve visible.
            resultadoDiv.textContent = ''; //limpiamos cualquie mensaje que tengamos.
        }
    };

    // colocamos un evento en cada input y el boton
    // actualizamos la funcion 'divisionPorCero' 
    numero1Input.addEventListener('input', divisionPorCero);
    numero2Input.addEventListener('input', divisionPorCero);
    operacionSelect.addEventListener('change', divisionPorCero);

    botonCalcular.addEventListener('click', () => {
        // convertimos los valores del input en numeros
        const num1 = parseFloat(numero1Input.value);
        const num2 = parseFloat(numero2Input.value);
        // obtenemos la operacion que el usuario seleccione
        const operacion = operacionSelect.value;

        console.log('Número 1:', num1);
        console.log('Número 2:', num2);
        console.log('Operación seleccionada:', operacion);
        let resultado; //almacemos el resultado

        if (isNaN(num1) || isNaN(num2)) {
            resultadoDiv.textContent = 'Ingrese numeros validos.';
            return; 
        }

        //creamos un switch para realizar cada operacion
        switch (operacion) {
            case 'suma':
                resultado = num1 + num2;
                break;
            case 'resta':
                resultado = num1 - num2;
                break;
            case 'multipliacion':
                resultado = num1 * num2;
                break;
            case 'division':
            // no es necesario, pero por las dudas hacemos una doble verificacion
            // a la divison por 0    
            if (num2 === 0) {
                    resultadoDiv.textContent = 'ERROR, no es posible dividir por 0.';
                    return; //detiene la ejecucion
                }
                resultado = num1 / num2;
                break;
            default:
                resultadoDiv.textContent = 'Operacion invalida, pruebe de nuevo.';
                return;
        }

        resultadoDiv.textContent = `Resultado: ${resultado}`; //resultado final
    });
    
    divisionPorCero();
});