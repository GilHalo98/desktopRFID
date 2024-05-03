// Componentes de reactstrap.
import {
    Container,
    Row,
    Col
} from "reactstrap";

// Componentes de los renders.
import ModalExportarDatosTabla from "../../modals/modalTabla/modalExportarDatosTabla";
import BarraOpcionesRegistros from "../../barraBotones/barraOpcionesRegistros";
import ModalOpcionesTabla from "../../modals/modalTabla/modalOpcionesTabla";
import BarraAccionesTabla from "../../barraBotones/barraAccionesTabla";
import Paginacion from "../../paginacion/paginacion";

// Funcion que aplica el formato especial al registro.
const renderFormatoEspecial = (
    dato: any,
    index: number,
    keyTD: string,
    cabeceras: string[],
    formatoEspecial: Object
) => {
    return(
        <td key={keyTD}>
            {formatoEspecial[
                cabeceras[index]
            ](dato)}
        </td>
    )
};

// Renderizamos las opciones por registro.
const renderOpcionesRegistro = (
    registro: {
        data: any[],
        metadata: any
    },
    opcionesTabla?: {
        registrosPorPagina?: number,
        opcionesRegistros?: boolean,
        tiempoRefrescamiento?: number,
        guardarConfiguracion?: Function
    },
    funcionesRegistros?: {
        onEliminar?: Function,
        onModificar?: Function,
    }
) => {
    if(typeof opcionesTabla == 'undefined') {
        return null;
    }

    if(typeof opcionesTabla.opcionesRegistros == 'undefined') {
        return null;
    }

    if(typeof funcionesRegistros == 'undefined') {
        return null;
    }

    if(opcionesTabla.opcionesRegistros) {
        const keyTD = registro.data[0] + '-' + 'opciones';

        return(<td key={keyTD}>
            <Container>
                <Row>
                    <Col/>
                    <Col>
                        <BarraOpcionesRegistros
                            idRegistro={
                                parseInt(registro.metadata.id)
                            }
                            indexRegistro={
                                registro.metadata.indexRegistro
                            }
                            onEliminar={
                                funcionesRegistros.onEliminar
                            }
                            onModificar={
                                funcionesRegistros.onModificar
                            }
                        />
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </td>);
    }
};

// Renderiza la barra de opciones de la tabla.
const renderBarraOpciones = (
    toggleModalExportarDatos: Function,
    toggleModalOpcionesTabla: Function,
    toggleEnCarga?: Function,
    funcionesOpciones?: {
        onAgregarRegistro?: Function,
        onRefrescarTabla?: Function,
        onExportarDatos?: Function,
        onCambiarConfiguracion?: Function
    },
    opcionesTabla?: {
        registrosPorPagina?: number,
        opcionesRegistros?: boolean,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function
    }
) => {
    if(typeof funcionesOpciones == 'undefined') {
        return null;
    }

    if(typeof opcionesTabla == 'undefined') {
        return(<BarraAccionesTabla
            onAgregarRegistro={
                funcionesOpciones.onAgregarRegistro
            }
            onRefrescarTabla={
                funcionesOpciones.onRefrescarTabla
            }
        />);
    }

    return(<BarraAccionesTabla
        onAgregarRegistro={
            funcionesOpciones.onAgregarRegistro
        }
        onRefrescarTabla={() => {
            if(typeof toggleEnCarga != 'undefined') {
                toggleEnCarga();
            }

            funcionesOpciones.onRefrescarTabla()
        }}
        onExportarDatos={() => {
            funcionesOpciones.onExportarDatos();
            toggleModalExportarDatos();
        }}
        onOpciones={() => {
            funcionesOpciones.onCambiarConfiguracion();
            toggleModalOpcionesTabla();
        }}
    />);
};

// Renderiza la paginacion del la tabla.
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

// Renderizamos la cabecera de las opciones de la tabla.
const renderHeaderOpciones = (
    funcionesRegistros?: {
        onEliminar: Function,
        onModificar: Function,
    },
    opcionesTabla?: {
        registrosPorPagina?: number,
        opcionesRegistros?: boolean,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function
    }
) => {
    if(typeof opcionesTabla == 'undefined') {
        return null;
    }

    if(typeof opcionesTabla.opcionesRegistros == 'undefined') {
        return null;
    }

    if(typeof funcionesRegistros == 'undefined') {
        return null;
    }

    if(opcionesTabla.opcionesRegistros) {
        return(
            <th key={'opciones'}>
                Opciones
            </th>
        );
    }
};

// Renderizamos el modal con las opciones de la tabla.
const renderModalOpcionesTabla = (
    tituloTabla: string,
    estadoModalOpcionesTabla: boolean,
    toggleModalOpcionesTabla: Function,
    opcionesTabla?: {
        registrosPorPagina?: number,
        opcionesRegistros?: boolean,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function
    },
    funcionesOpciones?: {
        onAgregarRegistro?: Function,
        onRefrescarTabla?: Function,
        onExportarDatos?: Function,
        onCambiarConfiguracion?: Function
    }
) => {
    if(typeof funcionesOpciones == 'undefined') {
        return null;
    }

    if(typeof opcionesTabla == 'undefined') {
        return null;
    }

    return(
        <ModalOpcionesTabla
            nombreTabla={tituloTabla}
            propiedadesTabla={opcionesTabla}
            modalActivo={estadoModalOpcionesTabla}
            toggleModal={toggleModalOpcionesTabla}
        />
    );
};

// Renderizamos el modal de exportar datos de la tabla.
const renderModalExportarDatosTabla = (
    tituloTabla: string,
    estadoModalExportarDatosTabla: boolean,
    toggleModalExportarDatos: Function,
    exportarDatos?: Function,
) => {
    if(typeof exportarDatos == 'undefined') {
        return null;
    }

    return(
        <ModalExportarDatosTabla
            nombreTabla={tituloTabla}
            exportarDatos={exportarDatos}
            modalActivo={estadoModalExportarDatosTabla}
            toggleModal={toggleModalExportarDatos}
        />
    )
};

// Poblamos el cuerpo de la tabla.
const renderContenidoTabla = (
    cabeceras: string[],
    registros: any[],
    formatoEspecial?: Object,
    opcionesTabla?: {
        registrosPorPagina?: number,
        opcionesRegistros?: boolean,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function
    },
    funcionesRegistros?: {
        onEliminar?: Function,
        onModificar?: Function,
    }
) => {
    return registros.map((registro: any) => {
        const keyTR = registro.metadata.id;

        return(
            <tr key={keyTR}>
                {registro.data.map((dato: any, index: number) => {
                    const keyTD = registro.metadata.id
                        + '-'
                        + cabeceras[index];

                    if(typeof formatoEspecial != 'undefined') {
                        if(typeof formatoEspecial[
                            cabeceras[index]
                        ] != 'undefined') {
                            return renderFormatoEspecial(
                                dato,
                                index,
                                keyTD,
                                cabeceras,
                                formatoEspecial
                            );
                        }
                    }

                    return(
                        <td key={keyTD}>
                            {dato}
                        </td>
                    );

                })}

                {renderOpcionesRegistro(
                    registro,
                    opcionesTabla,
                    funcionesRegistros
                )}
            </tr>
        );
    });
};

// Poblamos la cabecera de la tabla.
const renderCabecera = (
    cabeceras: string[]
) => {
    return cabeceras.map((cabecera: string) => {
        return(
            <th key={cabecera}>
                {cabecera}
            </th>
        );
    });
};

export {
    renderBarraOpciones,
    renderPaginacion,
    renderHeaderOpciones,
    renderModalOpcionesTabla,
    renderModalExportarDatosTabla,
    renderContenidoTabla,
    renderCabecera
};