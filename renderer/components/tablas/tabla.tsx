'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Spinner,
    Table, Button,
    Container, Row, Col,
    Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, List,
} from 'reactstrap';

// Paginacion de la tabla.
import Paginacion from '../paginacion/paginacion';

// Funcionalidad de la tabla.
import {
    thOpciones, tdOpciones
} from './logic/columnaOpciones';

// Componentes usados.
import ModalOpcionesTabla from '../modals/modalTabla/modalOpcionesTabla';
import BarraAccionesTabla from '../barraBotones/barraAccionesTabla';
import ModalExportarDatosTabla from '../modals/modalTabla/modalExportarDatosTabla';

export default function Tabla(
    props: {
        tituloTabla: string,
        cabeceras: string[],
        registros: any[],
        enCarga?: boolean,
        setEnCarga?: Function,
        exportarDatos?: Function,
        formatoEspecial?: Object,
        paginacion?: {
            paginaActual: number,
            offset: number,
            registrosPorPagina: number,
            totalPaginas: number,
            setPaginaActual: Function,
            setOffset: Function
        },
        funcionesOpciones?: {
            onAgregarRegistro?: Function,
            onRefrescarTabla?: Function,
            onExportarDatos?: Function,
            onCambiarConfiguracion?: Function
        },
        funcionesRegistros?: {
            onEliminar: Function,
            onModificar: Function,
        },
        opcionesTabla?: {
            registrosPorPagina?: number,
            opcionesRegistros?: boolean,
            tiempoRefrescamiento?: number,
            guardarConfiguracion: Function
        },
        children?: any
    }
) {
    // Estado del modal de opciones de la tabla.
    const [
        estadoModalOpcionesTabla,
        setEstadoModalOpcionesTabla
    ] = React.useState(false);

    // Estado del modal de exportar datos de la tabla.
    const [
        estadoModalExportarDatosTabla,
        setEstadoModalExportarDatosTabla
    ] = React.useState(false);

    // Renderiza la barra de opciones de la tabla.
    const renderBarraOpciones = () => {
        if(typeof props.funcionesOpciones == 'undefined') {
            return null;
        }

        if(typeof props.opcionesTabla == 'undefined') {
            return(
                <BarraAccionesTabla
                    onAgregarRegistro={
                        props.funcionesOpciones.onAgregarRegistro
                    }
                    onRefrescarTabla={
                        props.funcionesOpciones.onRefrescarTabla
                    }
                />
            );
        }

        return(
            <BarraAccionesTabla
                onAgregarRegistro={
                    props.funcionesOpciones.onAgregarRegistro
                }
                onRefrescarTabla={() => {
                    if(typeof props.setEnCarga != 'undefined') {
                        props.setEnCarga(!props.enCarga);
                    }

                    props.funcionesOpciones.onRefrescarTabla()
                }}
                onExportarDatos={() => {
                    props.funcionesOpciones.onExportarDatos();
                    setEstadoModalExportarDatosTabla(!estadoModalExportarDatosTabla);
                }}
                onOpciones={() => {
                    props.funcionesOpciones.onCambiarConfiguracion();
                    setEstadoModalOpcionesTabla(!estadoModalOpcionesTabla);
                }}
            />
        );
    };

    // Renderiza la paginacion del la tabla.
    const renderPaginacion = () => {
        if(typeof props.paginacion == 'undefined') {
            return null;
        }

        if(props.paginacion.totalPaginas <= 1) {
            return null;
        }

        return(
            <Paginacion
                paginaActual={props.paginacion.paginaActual}
                offset={props.paginacion.offset}
                registrosPorPagina={props.paginacion.registrosPorPagina}
                setPaginaActual={props.paginacion.setPaginaActual}
                setOffset={props.paginacion.setOffset}
                totalPaginas={props.paginacion.totalPaginas}
            />
        );
    };

    // Renderizamos la cabecera de las opciones de la tabla.
    const renderHeaderOpciones = () => {
        if(typeof props.opcionesTabla == 'undefined') {
            return null;
        }

        if(typeof props.opcionesTabla.opcionesRegistros == 'undefined') {
            return null;
        }

        if(typeof props.funcionesRegistros == 'undefined') {
            return null;
        }

        return thOpciones(props.opcionesTabla.opcionesRegistros);
    };

    // Renderizamos las opciones por registro.
    const renderOpcionesRegistro = (registro: {
        data: any[],
        metadata: any
    }) => {
        if(typeof props.opcionesTabla == 'undefined') {
            return null;
        }

        if(typeof props.opcionesTabla.opcionesRegistros == 'undefined') {
            return null;
        }

        if(typeof props.funcionesRegistros == 'undefined') {
            return null;
        }

        return tdOpciones(
            props.opcionesTabla.opcionesRegistros,
            parseInt(registro.metadata.id),
            registro.metadata.indexRegistro,
            props.funcionesRegistros
        );
    };

    // Renderizamos el modal con las opciones de la tabla.
    const renderModalOpcionesTabla = () => {
        if(typeof props.funcionesOpciones == 'undefined') {
            return null;
        }

        if(typeof props.opcionesTabla == 'undefined') {
            return null;
        }

        return(
            <ModalOpcionesTabla
                nombreTabla={props.tituloTabla}
                propiedadesTabla={props.opcionesTabla}
                modalActivo={estadoModalOpcionesTabla}
                toggleModal={() => {
                    setEstadoModalOpcionesTabla(!estadoModalOpcionesTabla);
                }}
            />
        );
    };

    // Renderizamos el modal de exportar datos de la tabla.
    const renderModalExportarDatosTabla = () => {
        if(typeof props.exportarDatos == 'undefined') {
            return null;
        }

        return(
            <ModalExportarDatosTabla
                nombreTabla={props.tituloTabla}
                exportarDatos={props.exportarDatos}
                modalActivo={estadoModalExportarDatosTabla}
                toggleModal={() => {
                    setEstadoModalExportarDatosTabla(
                        !estadoModalExportarDatosTabla
                    );
                }}
            />
        )
    };

    // Poblamos el cuerpo de la tabla.
    const poblarTabla = () => {
        return props.registros.map((registro: any) => {
            const keyTR = registro.metadata.id;

            return(
                <tr key={keyTR}>
                    {registro.data.map((dato: any, index: number) => {
                        const keyTD = registro.metadata.id
                            + '-'
                            + props.cabeceras[index];

                        if(typeof props.formatoEspecial != 'undefined') {
                            if(typeof props.formatoEspecial[
                                props.cabeceras[index]
                            ] != 'undefined') {
                                return aplicarFormatoEspecial(
                                    dato,
                                    index,
                                    keyTD
                                );
                            }
                        }

                        return(
                            <td key={keyTD}>
                                {dato}
                            </td>
                        );

                    })}

                    {renderOpcionesRegistro(registro)}
                </tr>
            );
        });
    };

    // Funcion que aplica el formato especial al registro.
    const aplicarFormatoEspecial = (
        dato: any,
        index: number,
        keyTD: string
    ) => {
        return(
            <td key={keyTD}>
                {props.formatoEspecial[
                    props.cabeceras[index]
                ](dato)}
            </td>
        )
    };

    // Poblamos la cabecera de la tabla.
    const poblarCabecera = () => {
        return props.cabeceras.map((cabecera: string) => {
            return(
                <th key={cabecera}>
                    {cabecera}
                </th>
            );
        });
    };

    const controlTabla = {
        display: (props.enCarga? 'none' : '')
    };

    const controlSpinner = {
        display: (props.enCarga? '' : 'none')
    };

    return(
        <Card color='dark'>
            <CardHeader className='text-white'>
                <Container>
                    <Row>
                        <Col>
                            {props.tituloTabla}
                        </Col>

                        <Col style={{textAlign:'right'}}>
                            {   /*
                                    Esta barra de acciones permite acceder a las opciones
                                    de la tabla, agrear un registro, exportar los datos a archivos o generar
                                    un reporte en archivo.
                                */
                                renderBarraOpciones()
                            }
                        </Col>
                    </Row>
                </Container>
            </CardHeader>

            <CardBody>
                <CardTitle>
                    {props.children}
                </CardTitle>

                <Container>
                    <Row style={controlTabla}>
                        <Table hover dark responsive>
                            <thead className='cabeceraTablaRegistros'>
                                <tr key="header">
                                    {poblarCabecera()}

                                    {renderHeaderOpciones()}
                                </tr>
                            </thead>

                            <tbody>
                                {poblarTabla()}
                            </tbody>
                        </Table>
                    </Row>

                    <Row style={controlSpinner}>
                        <Col/>
                            <Col xs='auto'>
                                <Spinner
                                    color="warning"
                                    style={{
                                        height: '100px',
                                        width: '100px'
                                    }}
                                />
                            </Col>
                        <Col/>
                    </Row>
                </Container>

                {   /*Modal de opciones de tabla*/
                    renderModalOpcionesTabla()
                }

                {   /*Modal de opciones de tabla*/
                    renderModalExportarDatosTabla()
                }


                {   /*Paginación de la tabla.*/
                    renderPaginacion()
                }
            </CardBody>
        </Card>
    );
};