const { useState } = React;

function App() {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const [mensajeId, setMensajeId] = useState(null);

    // Cambios en el input peso
    const pesoChange = (e) => {
        setPeso(e.target.value); // actualiza el peso
        // Limpiamos los resultados
        setImc(null);
        setMensaje('');
        setMensajeId(null);
    };

    const alturaChange = (e) => {
        setAltura(e.target.value); // actualiza el peso
        // Limpiamos los resultados
        setImc(null);
        setMensaje('');
        setMensajeId(null);
    };

    // Funcion para calcular el IMC al enviar el formulario
    const calcularImc = (e) => {
        e.preventDefault(); // Evitamos que la pagina se recarge por defecto

        const pesoKg = parseFloat(peso); // convertimos el peso en flotante
        const alturaMetros = parseFloat(altura); // convertimos la altura en flotante

        //validamos los valores
        if (isNaN(pesoKg) || isNaN(alturaMetros) || pesoKg <= 0 || alturaMetros <= 0) {
            setMensaje('Ingrese valores positivos');
            setMensajeId(null); 
            setImc(null);
            return;
        }

        // Calculamos el IMC
        const imcCalculado = pesoKg / (alturaMetros * alturaMetros);
        setImc(imcCalculado.toFixed(2)); // gardamos el IMC solo con 2 decimales

        // vemos el mensaje que mostraremos
        if (imcCalculado < 18.5) {
            setMensaje('Nivel Bajo');
            setMensajeId('mensaje-bajo');
        } else if (imcCalculado >= 18.5 && imcCalculado <= 24.9) {
            setMensaje('Nivel Normal');
            setMensajeId('mensaje-normal');
        } else if (imcCalculado >= 25 && imcCalculado <= 29.9) {
            setMensaje('Sobrepeso');
            setMensajeId('mensaje-sobrepeso');
        } else {
            setMensaje('Obesidad');
            setMensajeId('mensaje-obesidad');
        }
    };

    return (
        <>
            <h1> Calculemos tu IMC (Indice De Masa Corporal)</h1>
            <p> Ingrese peso en kilogramos y altura en metros para calcular de manera exitosa el IMC</p>

            <form onSubmit={calcularImc}>
                <div>
                    <label htmlFor="peso">Peso (kg):</label>
                    <input
                        type="number"
                        id="peso"
                        value={peso}
                        onChange={pesoChange}
                        step="0.1" //permite decimales
                        min="0" // no puede ser negativo
                        placenholder="Ej: 70"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="altura">Altura (m):</label>
                    <input
                        type="number"
                        id="altura"
                        value={altura}
                        onChange={alturaChange}
                        step="0.1" //permite decimales
                        min="0" // no puede ser negativa
                        placenholder="Ej: 1.50"
                        required
                    />
                </div>
                <button type="submit">Calcular IMC</button>
            </form>

            {imc !== null && (
                <div>
                    <h2> Tu IMC es: {imc}</h2>
                    {/*el mensaje contiene un ID dinamico al cual se le aplicara el style correspondiente*/}
                    <p id={mensajeId}>{mensaje}</p>
                </div>
            )}
            {/*Mensaje de error*/}
            {mensajeId === null && mensaje && (
                <p style={{ color: 'red', fontWeight: 'bold'}}>{mensaje}</p>
            )}
        </>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
        