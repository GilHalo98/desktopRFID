'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card,
    Container, Row, Col, CardHeader, CardBody
} from 'reactstrap';

// Componentes propios.

// Funcionalidad del grid.
// Funcionalidad de la tabla.
import {
    renderPaginacion,
    renderTitulo
} from "./logic/renders";

export default function Grid(
    props: {
        tituloGrid: string,
        enCarga?: boolean,
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
            opcionesRegistros?: boolean,
            tiempoRefrescamiento?: number,
            guardarConfiguracion: Function
        },
        funcionesOpciones?: {
            onAgregarRegistro?: Function,
            onRefrescarGrid?: Function,
            onProbarSerial?: Function,
            onCambiarConfiguracion?: Function
        },
        children?: any
    }
) {
    
    // Estado del modal de opciones de tabla.
    const [
        estadoModalOpcionesGrid,
        setEstadoModalOpcionesGrid
    ] = React.useState(false);

    const controlTabla = {
        display: (props.enCarga? 'none' : '')
    };

    const controlSpinner = {
        display: (props.enCarga? '' : 'none')
    };

    return(
        <Container>
            {/*Titulo y barra de herramientas del grid.*/}
            <Row>
                <Col>
                    {renderTitulo(
                        props.tituloGrid,
                        props.funcionesOpciones
                    )}
                </Col>
            </Row>

            <br/>

            {/*Contenido del grid*/}
            <Row>
                <Col>
                    {props.children}
                </Col>
            </Row>

            <br/>

            {/*Paginacion del grid*/}
            <Row>
                <Col>
                    {/*Paginación del grid.*/}
                    {renderPaginacion(props.paginacion)}
                </Col>
            </Row>
        </Container>
    );
};