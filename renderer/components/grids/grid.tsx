'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card,
    Container, Row, Col, CardHeader, CardBody
} from 'reactstrap';

import Paginacion from '../paginacion/paginacion';
import BarraAccionesGrid from '../barraBotones/barraAccionesGrid';
import ModalOpcionesGrid from '../modals/modalOpciones/modalOpcionesGrid';

export default function Grid(
    props: {
        tituloGrid: string,
        paginacion: {
            paginaActual: number,
            offset: number,
            elementos: number,
            totalPaginas: number,
            setPaginaActual: Function,
            setOffset: Function
        },
        opcionesGrid: {
            elementos: number,
            tiempoRefresh: number,
            setElementos: Function,
            setTiempoRefresh: Function
        },
        barraOpciones: {
            toggleModalRegistro: Function
        },
        children: any
    }
) {
    
    // Estado de los modals.
    const [estadoModalOpcionesGrid, setEstadoModalOpcionesGrid] = React.useState(false);

    function renderizarPaginacion() {
        if(!props.paginacion) {
            return(<div></div>);
        }

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

    return(
        <Card style={{border: 'none'}}>
            <CardHeader style={{border: 'none'}}>
                <Card color='dark'>
                    <CardHeader className='text-white'>
                        <Container>
                                <Row>
                                    <Col>
                                        {props.tituloGrid}
                                    </Col>
                                    <Col sm='auto'>
                                        { /*Barra de acciones del grid*/ }
                                        <BarraAccionesGrid
                                            onAddRegistro={() => {
                                                props.barraOpciones.toggleModalRegistro();
                                            }}
                                            onOpciones={() => {
                                                setEstadoModalOpcionesGrid(!estadoModalOpcionesGrid);
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                    </CardHeader>
                </Card>
            </CardHeader>

            <CardBody style={{border: 'none'}}>
                <Container fluid>
                    <Row>
                        {props.children}
                    </Row>
                </Container>
            </CardBody>

            {/*Modal de opciones de tabla*/}
            <ModalOpcionesGrid
                nombreGrid="Registro de empleados"
                propiedadesGrid={{
                    elementos: props.paginacion.elementos,
                    tiempoRefresh: props.opcionesGrid.tiempoRefresh
                }}
                modalActivo={estadoModalOpcionesGrid}
                toggleModal={() => {
                    setEstadoModalOpcionesGrid(!estadoModalOpcionesGrid);
                }}
                onOk={(
                    elementos: number,
                    tiempoRefresh: number
                ) => {
                    props.opcionesGrid.setElementos(elementos);
                    props.opcionesGrid.setTiempoRefresh(tiempoRefresh);
                }}
                onRechazar={() => {}}
            />

            {/*Paginación de la tabla.*/}
            {renderizarPaginacion()}
        </Card>
    );
};