'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card,
    Container, Row, Col, CardHeader, CardBody, Spinner
} from 'reactstrap';

// Componentes propios.
import ModalOpcionesGrid from '../modals/modalGrid/modalOpcionesGrid';

// Funcionalidad del grid.
import {
    renderPaginacion,
    renderTitulo
} from "./logic/renders";

export default function Grid(
    props: {
        tituloGrid: string,
        enCarga?: boolean,
        setEnCarga?: Function,
        renderBarraBusqueda?: Function,
        paginacion?: {
            paginaActual: number,
            offset: number,
            registrosPorPagina: number,
            totalPaginas: number,
            setPaginaActual: Function,
            setOffset: Function
        },
        opcionesGrid?: {
            registrosPorPagina?: number,
            tiempoRefrescamiento?: number,
            guardarConfiguracion: Function
        },
        funcionesOpciones?: {
            onAgregarRegistro?: Function,
            onRefrescarGrid?: Function,
            onProbarSerial?: Function,
            onCambiarConfiguracion?: Function
        },
        funcionesRegistros?: {
            onGuardarDatosTarjeta?: Function,
            onVisualizarRegistro?: Function,
            onModificarRegistro?: Function
        }
        children?: any
    }
) {
    
    // Estado del modal de opciones de tabla.
    const [
        estadoModalOpcionesGrid,
        setEstadoModalOpcionesGrid
    ] = React.useState(false);

    const controlGrid = {
        display: (props.enCarga? 'none' : '')
    };

    const controlSpinner = {
        display: (props.enCarga? '' : 'none')
    };

    const renderBarraBusqueda = () => {
        if(typeof props.renderBarraBusqueda == 'undefined') {
            return <></>;
        }

        return(<>
            <br/>
            {props.renderBarraBusqueda()}
        </>);
    };

    return(
        <Container>
            {/*Titulo y barra de herramientas del grid.*/}
            <Row>
                <Col>
                    {renderTitulo(
                        props.tituloGrid,
                        () => {setEstadoModalOpcionesGrid(
                            !estadoModalOpcionesGrid
                        )},
                        undefined,
                        props.funcionesOpciones,
                        props.opcionesGrid
                    )}
                </Col>
            </Row>

            {renderBarraBusqueda()}

            <br/>

            {/*Contenido del grid*/}
            <Row style={controlGrid} className='contenidoGridEmpleados'>
                {props.children}
            </Row>

            {/*Spinner del contenido del grid*/}
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

            <br/>

            {/*Paginacion del grid*/}
            <Row style={controlGrid}>
                <Col>
                    {/*Paginación del grid.*/}
                    {renderPaginacion(props.paginacion)}
                </Col>
            </Row>

            {/*Modal de opciones del grid*/}
            <ModalOpcionesGrid
                nombreGrid={props.tituloGrid}
                opcionesGrid={props.opcionesGrid}
                modalActivo={estadoModalOpcionesGrid}
                toggleModal={() => {setEstadoModalOpcionesGrid(
                    !estadoModalOpcionesGrid
                )}}
            />
        </Container>
    );
};