// Componentes propios.
import BarraOpcionesRegistroEmpleado from "../../../barraBotones/barraOpciones/BarraOpcionesRegistrosEmpleado/barraOpcionesRegistroEmpleado";

// Modelo de datos.
import {
    Empleado
} from "../../../../utils/API/modelos/empleado";

// Renderizamos la barra de opciones del registro en el card.
const renderBarraOpcionesRegistro = (
    registro: Empleado,
    indexRegistro?: number,
    funcionesRegistros?: {
        onGuardarDatosTarjeta?: Function,
        onVisualizarRegistro?: Function,
        onModificarRegistro?: Function
    }
) => {
    // Verifiamos que existan los parametros necesarios para renderizar
    // la barra de acciones del card de empleado.
    if(typeof funcionesRegistros == 'undefined') {
        return <></>;
    }

    if(typeof indexRegistro == 'undefined') {
        return <></>;
    }

    return <BarraOpcionesRegistroEmpleado
        registro={registro}
        indexRegistro={indexRegistro}
        onGuardarDatosTarjeta={
            funcionesRegistros.onGuardarDatosTarjeta
        }
        onVisualizarRegistro={
            funcionesRegistros.onVisualizarRegistro
        }
        onModificarRegistro={
            funcionesRegistros.onModificarRegistro
        }
    />;
}

export {
    renderBarraOpcionesRegistro
};