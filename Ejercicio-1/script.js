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
        botonCalcular.disabled = true; //deshabilita el boton
        resultadoDiv.textContent = "POR CERO IMPOSIBLE!"; // mostramos el mensaje al usuario.
    } else {
        botonCalcular.disabled = false; //si no se cumple, habilita el boton.
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

    resultadoDiv.textContent = ''; // Limpiamos errores o mensajes

    if (isNaN(num1) || isNaN(num2)) {
        resultadoDiv.textContent = 'Ingrese numeros validos.';
        return; 
    }

    let resultado; // almacen el resulado

    //creamos un switch para realizar cada operacion
    switch (operacion) {
        case 'suma':
            resultado = num1 + num2;
            break;
        case 'resta':
            resultado = num1 - num2;
            break;
        case 'multiplicacion':
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