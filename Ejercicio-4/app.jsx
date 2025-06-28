const { useState } = React;

function App() {
    //aca controlaremos los botones

    // Al principio solo el boton "Izquiero" estara habilitado
    const [botonActivo, setBotonActivo] = useState('izquierdo');

    // Esta funcion se ejecutara al hacer clic en el boton
    const clickIzquierdo = () => {
        // al hacer clic deshabilitamos "izquierdo"
        // y habilitamos derecho (actualizamos el estado)
        setBotonActivo('derecho');
    };

    // Funcion que se ejecuta al hacer clic en 'Derecho'
    const clickDerecho = () => {
        // es igual que el anterior, solo que al reves
        // al hacer clic, deshabilitamos el 'derecho' y habilitamos 'izquiero'
        setBotonActivo('izquierdo');
    };

    return (
        <>
            <h1> Botones Dependientes </h1>
            <p> Solo un boton puede esta habilitado a la vez.</p>

            <div>
                <button
                    disabled={botonActivo !== 'izquierdo'}
                    onClick={clickIzquierdo}
                >
                    Izquierdo
                </button>
                
                &nbsp; {/*espacio entre botones*/}

                <button
                    disabled={botonActivo !== 'derecho'}
                    onClick={clickDerecho}
                >
                    Derecho
                </button>
            </div>
        </>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App/>);