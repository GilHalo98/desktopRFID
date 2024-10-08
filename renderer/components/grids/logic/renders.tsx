// Componentes de los renders.
import BarraAccionesGrid from '../../barraBotones/barraAcciones/barraAccionesGrid/barraAccionesGrid';
import Paginacion from "../../paginacion/paginacion";

// Renderiza la paginacion del grid.
const renderPaginacion = (
    paginacion?: {
        paginaActual: number,
        offset: number,
        registrosPorPagina: number,
        totalPaginas: number,
        setPaginaActual: Function,
        setOffset: Function
    }
) => {
    if(typeof paginacion == 'undefined') {
        return null;
    }

    if(paginacion.totalPaginas <= 1) {
        return null;
    }

    return(<Paginacion
        paginaActual={paginacion.paginaActual}
        offset={paginacion.offset}
        registrosPorPagina={paginacion.registrosPorPagina}
        setPaginaActual={paginacion.setPaginaActual}
        setOffset={paginacion.setOffset}
        totalPaginas={paginacion.totalPaginas}
    />);
};

// Renderiza la barra de opciones del grid.
const renderBarraOpciones = (
    toggleModalOpcionesTabla: Function,
    toggleEnCarga?: Function,
    funcionesOpciones?: {
        onAgregarRegistro?: Function,
        onRefrescarGrid?: Function,
        onProbarSerial?: Function,
        onCambiarConfiguracion?: Function
    },
    opcionesGrid?: {
        registrosPorPagina?: number,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function
    }
) => {
    if(typeof funcionesOpciones == 'undefined') {
        return null;
    }

    if(typeof opcionesGrid == 'undefined') {
        return(<BarraAccionesGrid
            onAgregarRegistro={
                funcionesOpciones.onAgregarRegistro
            }
            onRefrescarGrid={
                funcionesOpciones.onRefrescarGrid
            }
        />);
    }

    return(<BarraAccionesGrid
        onAgregarRegistro={
            funcionesOpciones.onAgregarRegistro
        }
        onRefrescarGrid={() => {
            if(typeof toggleEnCarga != 'undefined') {
                toggleEnCarga();
            }

            funcionesOpciones.onRefrescarGrid()
        }}
        onProbarSerial={() => {
            funcionesOpciones.onProbarSerial();
        }}
        onCambiarConfiguracion={() => {
            funcionesOpciones.onCambiarConfiguracion();
            toggleModalOpcionesTabla();
        }}
    />);
};

export {
    renderPaginacion,
    renderBarraOpciones
};