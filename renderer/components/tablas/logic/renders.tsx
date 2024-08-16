// Componentes de reactstrap.
import {
    Container,
    Row,
    Col
} from "reactstrap";

// Componentes de los renders.
import BarraAccionesTablaHorarioEmpleados from "../../barraBotones/barraAcciones/barraAccionesTablaHorarioEmpleados/barraAccionesTablaHorarioEmpleados";
import BarraOpcionesEstatusDispositivos from "../../barraBotones/barraOpciones/barraOpcionesEstatusDispositivos/barraOpcionesEstatusDispositivos";
import BarraAccionesTablaDispositivos from "../../barraBotones/barraAcciones/barraAccionesTablaDispositivos/barraAccionesTablaDispositivos";
import BarraOpcionesRegistros from "../../barraBotones/barraOpciones/barraOpcionesRegistros/barraOpcionesRegistros";
import BarraAccionesTabla from "../../barraBotones/barraAcciones/barraAccionesTabla/barraAccionesTabla";
import ModalExportarDatosTabla from "../../modals/modalTabla/modalExportarDatosTabla";
import ModalOpcionesTabla from "../../modals/modalTabla/modalOpcionesTabla";
import Paginacion from "../../paginacion/paginacion";
import BarraAccionesTablaReportesHorasTrabajadas from "../../barraBotones/barraAcciones/barraAccionesTablaReportesHorasTrabajadas.tsx/barraAccionesTablaReportesHorasTrabajadas.tsx";

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
        onVisualizarDetalles?: Function
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
                            onVisualizarDetalles={
                                funcionesRegistros.onVisualizarDetalles
                            }
                        />
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </td>);
    }
};

// Renderizamos las opciones por registro de la tabla de dispositivos.
const renderOpcionesRegistroDispositivo = (
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
        onGuardarConfiguracionDispositivo?: Function
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
                        <BarraOpcionesEstatusDispositivos
                            idRegistro={
                                parseInt(registro.metadata.id)
                            }
                            indexRegistro={
                                registro.metadata.indexRegistro
                            }
                            onGuardarConfiguracionDispositivo={
                                funcionesRegistros.onGuardarConfiguracionDispositivo
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

// Renderiza la barra de opciones de la tabla de dispositivos.
const renderBarraOpcionesDispositivos = (
    toggleModalProbarSerial: Function,
    toggleModalOpcionesTabla: Function,
    toggleEnCarga?: Function,
    funcionesOpciones?: {
        onRefrescarTabla?: Function,
        onProbarSerial?: Function,
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
        return(<BarraAccionesTablaDispositivos
            onRefrescarTabla={
                funcionesOpciones.onRefrescarTabla
            }
        />);
    }

    return(<BarraAccionesTablaDispositivos
        onRefrescarTabla={() => {
            if(typeof toggleEnCarga != 'undefined') {
                toggleEnCarga();
            }

            funcionesOpciones.onRefrescarTabla()
        }}
        onProbarSerial={() => {
            funcionesOpciones.onProbarSerial();
            toggleModalProbarSerial();
        }}
        onOpciones={() => {
            funcionesOpciones.onCambiarConfiguracion();
            toggleModalOpcionesTabla();
        }}
    />);
};

// Renderiza la barra de opciones de la tabla de horario de empleados.
const renderBarraOpcionesHorarioEmpleados = (
    toggleModalModificarRegistro?: Function,
    toggleModalOpcionesTabla?: Function,
    toggleEnCarga?: Function,
    funcionesOpciones?: {
        onRefrescarTabla?: Function,
        onModificarRegistro?: Function,
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
        return(<BarraAccionesTablaDispositivos
            onRefrescarTabla={
                funcionesOpciones.onRefrescarTabla
            }
        />);
    }

    return(<BarraAccionesTablaHorarioEmpleados
        onRefrescarTabla={() => {
            if(typeof toggleEnCarga != 'undefined') {
                toggleEnCarga();
            }

            funcionesOpciones.onRefrescarTabla()
        }}
        onModificarRegistro={() => {
            funcionesOpciones.onModificarRegistro();
            toggleModalModificarRegistro();
        }}
        onOpciones={() => {
            funcionesOpciones.onCambiarConfiguracion();
            toggleModalOpcionesTabla();
        }}
    />);
};

// Renderiza la barra de opciones de la tabla de reporte de horas trabajadas.
const renderBarraOpcionesReporteHorasTrabajadas = (
    toggleModalExportarDatos: Function,
    toggleModalOpcionesTabla: Function,
    toggleEnCarga?: Function,
    funcionesOpciones?: {
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
        return(<BarraAccionesTablaReportesHorasTrabajadas
            onRefrescarTabla={
                funcionesOpciones.onRefrescarTabla
            }
        />);
    }

    return(<BarraAccionesTablaReportesHorasTrabajadas
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
        onEliminar?: Function,
        onModificar?: Function,
        onVisualizarDetalles?: Function
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

// Renderizamos la cabecera de las opciones de la
// tabla para los dispositivos.
const renderHeaderOpcionesDispositivos = (
    funcionesRegistros?: {
        onGuardarConfiguracionDispositivo?: Function
    },
    opcionesTabla?: {
        registrosPorPagina?: number,
        opcionesRegistros?: boolean,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function
    }
) => {
    if(typeof funcionesRegistros == 'undefined') {
        return null;
    }

    if(typeof funcionesRegistros.onGuardarConfiguracionDispositivo == 'undefined') {
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
        onVisualizarDetalles?: Function
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

// Poblamos el cuerpo de la tabla de dispositivos.
const renderContenidoTablaDispositivos = (
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
        onGuardarConfiguracionDispositivo?: Function
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

                {renderOpcionesRegistroDispositivo(
                    registro,
                    opcionesTabla,
                    funcionesRegistros
                )}
            </tr>
        );
    });
};

// Poblamos el cuerpo de la tabla de dispositivos.
const renderContenidoTablaHorarioEmpleados = (
    cabeceras: string[],
    registros: any[],
    formatoEspecial?: Object,
    opcionesTabla?: {
        registrosPorPagina?: number,
        opcionesRegistros?: boolean,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function
    },
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
    renderBarraOpcionesReporteHorasTrabajadas,
    renderContenidoTablaHorarioEmpleados,
    renderBarraOpcionesHorarioEmpleados,
    renderContenidoTablaDispositivos,
    renderHeaderOpcionesDispositivos,
    renderBarraOpcionesDispositivos,
    renderModalExportarDatosTabla,
    renderModalOpcionesTabla,
    renderHeaderOpciones,
    renderContenidoTabla,
    renderBarraOpciones,
    renderPaginacion,
    renderCabecera
};