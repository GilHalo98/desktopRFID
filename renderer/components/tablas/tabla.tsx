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
import ModalOpcionesTabla from '../modals/modalOpciones/modalOpcionesTabla';
import BarraAccionesTabla from '../barraBotones/barraAccionesTabla';

export default function Tabla(
    props: {
        tituloTabla: string,
        paginacion: {
            paginaActual: number,
            offset: number,
            elementos: number,
            totalPaginas: number,
            setPaginaActual: Function,
            setOffset: Function
        },
        funcionesOpciones: {
            onExportarArchivo: Function | undefined,
            onGenerarReporte: Function | undefined,
            onAddRegistro: Function | undefined
        },
        funcionesRegistros: {
            onEliminar: Function,
            onModificar: Function,
            onVisualizar: Function,
            onGuardarConfiguracion: Function | undefined
        },
        opcionesTabla: {
            elementos: number,
            opcionesRegistros: boolean,
            tiempoRefresh: number,
            setElementos: Function,
            setOpcionesRegistros: Function,
            setTiempoRefresh: Function
        },
        enCarga: boolean,
        cabeceras: any,
        registros: any,
        formatoEspecial: any | undefined,
        children: any
    }
) {
    // Estado del modal de opciones de la tabla.
    const [estadoModalOpcionesTabla, setEstadoModalOpcionesTabla] = React.useState(false);

    // Renderiza la barra de opciones de la tabla.
    function renderBarraOpciones() {
        if(!props.funcionesOpciones) {
            return(<></>);
        }

        return(
            <BarraAccionesTabla
                onExportarArchivo={props.funcionesOpciones.onExportarArchivo}
                onGenerarReporte={props.funcionesOpciones.onGenerarReporte}
                onAddRegistro={props.funcionesOpciones.onAddRegistro}
                onOpciones={() => {
                    setEstadoModalOpcionesTabla(!estadoModalOpcionesTabla);
                }}
            />
        )
    };

    // Renderiza la paginacion del la tabla.
    function renderPaginacion() {
        if(props.paginacion.totalPaginas > 1) {
            return(
                <Paginacion
                    paginaActual={props.paginacion.paginaActual}
                    offset={props.paginacion.offset}
                    elementos={props.paginacion.elementos}
                    setPaginaActual={props.paginacion.setPaginaActual}
                    setOffset={props.paginacion.setOffset}
                    totalPaginas={props.paginacion.totalPaginas}
                />
            );
        }

        return(<></>);
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
                                    {props.cabeceras.map((cabecera: string) => {
                                        return(
                                            <th key={cabecera}>
                                                {cabecera}
                                            </th>
                                        );
                                    })}

                                    {thOpciones(props.opcionesTabla.opcionesRegistros)}
                                </tr>
                            </thead>

                            <tbody>
                                {props.registros.map((registro: any) => {
                                    const keyTR = registro.metadata.id;

                                    return(
                                        <tr key={keyTR}>
                                            {registro.data.map((dato: any, index: number) => {
                                                const keyTD = registro.metadata.id + '-' + props.cabeceras[index];
                                                if(props.formatoEspecial) {
                                                    if(props.formatoEspecial[props.cabeceras[index]]) {
                                                        return(
                                                            <td key={keyTD}>
                                                                {props.formatoEspecial[props.cabeceras[index]](registro)}
                                                            </td>
                                                        )
                                                    }
                                                }

                                                return(
                                                    <td key={keyTD}>
                                                        {dato}
                                                    </td>
                                                );
                                            })}

                                            {tdOpciones(
                                                props.opcionesTabla.opcionesRegistros,
                                                parseInt(registro.metadata.id),
                                                registro.metadata.indexRegistro,
                                                props.funcionesRegistros
                                            )}
                                        </tr>
                                    );
                                })}
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

                {/*Modal de opciones de tabla*/}
                <ModalOpcionesTabla
                    nombreTabla={props.tituloTabla}
                    propiedadesTabla={{
                        elementos: props.opcionesTabla.elementos,
                        opcionesRegistros: props.opcionesTabla.opcionesRegistros,
                        tiempoRefresh: props.opcionesTabla.tiempoRefresh
                    }}
                    modalActivo={estadoModalOpcionesTabla}
                    toggleModal={() => {setEstadoModalOpcionesTabla(!estadoModalOpcionesTabla)}}
                    onOk={(
                        elementos: number,
                        opcionesRegistros: boolean,
                        tiempoRefresh: number
                    ) => {
                        props.opcionesTabla.setElementos(elementos);
                        props.opcionesTabla.setOpcionesRegistros(opcionesRegistros);
                        props.opcionesTabla.setTiempoRefresh(tiempoRefresh);
                    }}
                    onRechazar={() => {}}
                />

                {/*Paginación de la tabla.*/}
                {renderPaginacion()}
            </CardBody>
        </Card>
    );
};