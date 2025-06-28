const { useState } = React;

function App() {
    const [numero1, setNumero1] = useState(0);
    const [numero2, setNumero2] = useState(0);
    const [operacion, setOperacion] = useState('suma');
    const [resultado, setResultado] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    // Se ejecuta cuando cambia el valor del input numero1.
    // Actualizamos el estado de 'numero1'
    const numero1Change = (e) => {
        setNumero1(Number(e.target.value));
        // Limpiamos el resultado y los errores
        setResultado('');
        setMensajeError('');
    };

    const numero2Change = (e) => {
        setNumero2(Number(e.target.value));
        // Limpiamos el resultado y los errores
        setResultado('');
        setMensajeError('');
    };

    // Se ejecuta cuando cambia la operacion seleccionada en el <select></select>
    // Actualizamos 'operacion'
    const operacionChange = (e) => {
        setOperacion(e.target.value);
        setResultado('');
        setMensajeError('');
    };

    // Se ejecuta al hacer clic en el boton "calcular".
    const calcularResultado = () => {
        let res; // variable que almacena el resultado
        let errorEnCalculo = false; // bandera que indica si hubo errores

        if (isNaN(numero1) || isNaN(numero2)){
            setMensajeError('ingrese numeros validos');
            return;
        }
    
        switch (operacion) {
            case 'suma':
                res = numero1 + numero2;
                break;
            case 'resta':
                res = numero1 - numero2;
                break;
            case 'multiplicacion':
                res = numero1 * numero2;
                break;
            case 'division':
                //CONDICION: si en la division el segundo numero es 0
                if (numero2 === 0 ) {
                    setMensajeError('ERROR: no se puede dividir por cero.');
                    errorEnCalculo = true;
                } else {
                    res = numero1 / numero2;
                }
                break;
            default:
                setMensajeError('Operacion invalida.');
                errorEnCalculo = true;
        }
        
        if (!errorEnCalculo) {
            setResultado(`Resultado: ${res}`);
            setMensajeError('');
        } else {
            setResultado('');
        }
    };

    const deshabilitarBoton = operacion === 'division' && numero2 === 0;

    return (
        <>
            <h1>Calculadora React</h1>

            <div>
                <input
                    type="number"
                    value={numero1}
                    onChange={numero1Change}
                    placeholder="Primer numero"
                />
            </div>
            <br/>
            <div>
                <select value={operacion} onChange={operacionChange}>
                    <option value="suma">Suma (+)</option>
                    <option value="resta">Resta (-)</option>
                    <option value="multiplicacion">Multiplicación (*)</option>
                    <option value="division">División (/)</option>
                </select>
            </div>
            <br/>
            <div>
                <input
                    type="number"
                    value={numero2}
                    onChange={numero2Change}
                    placeholder="Segundo numero"
                />
            </div>
            <br/>
            <div>
                <button onClick={calcularResultado} disabled={deshabilitarBoton}>
                    Calcular
                </button>
            </div>
            {/* mostramos un mensaje de error, si hubiera */}
            {mensajeError && <p>{mensajeError}</p>}
            {/* mostramos el resultado de la operacion */} 
            {resultado && <p>{resultado}</p>}
        </>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);