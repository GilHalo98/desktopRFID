'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card,
    Container, Row, Col, CardHeader, CardBody, Spinner
} from 'reactstrap';

// Componentes propios.
import CardHeaderRegistroEmpleado from '../cards/cardHeader/cardHeaderRegistroEmpleado';
import { renderPaginacion } from './logic/renders';
import ModalOpcionesGrid from '../modals/modalGrid/modalOpcionesGrid';
import { Rol } from '../../utils/API/modelos/rol';

// Funcionalidad del grid.

export default function GridParaRegistrosDeEmpleados(
    props: {
        tituloGrid: string,
        elementosOpciones: Rol[],
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
        },
        parametrosBusqueda: {
            setId: Function,
            setNombres: Function,
            setApellidoPaterno: Function,
            setApellidoMaterno: Function,
            setNumeroTelefonico: Function,
            setIdRol: Function
        },
        children?: any
    }
) {
    const [
        estadoModalOpcionesGrid,
        setEstadoModalOpcionesGrid
    ] = React.useState(false);

    return(
        <Container>
            {/*Header del grid.*/}
            <Row>
                <Col>
                    <CardHeaderRegistroEmpleado
                        tituloGrid={props.tituloGrid}
                        parametrosBusqueda={props.parametrosBusqueda}
                        elementosOpciones={props.elementosOpciones}
                        funcionesOpciones={props.funcionesOpciones}
                        toggleModalOpcionesGrid={() => {
                            setEstadoModalOpcionesGrid(
                                !estadoModalOpcionesGrid
                            );
                        }}
                    />
                </Col>
            </Row>

            <br/>

            {/*Renderizamos el contenido del grid.*/}
            <Row>
                {props.children}
            </Row>

            {/*Paginacion del grid*/}
            <Row>
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