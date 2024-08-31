'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card, CardHeader, CardBody,
    Container, Row, Col,
} from 'reactstrap';

// Componentes propios.
import FormBusquedaEmpleado from '../../forms/busqueda/formBusquedaEmpleado';
import BarraAccionesGrid from '../../barraBotones/barraAcciones/barraAccionesGrid/barraAccionesGrid';

// Funcionalidad del grid.

// Enumeradores.

// Modelo de datos.
import {
    Rol
} from '../../../utils/API/modelos/rol';

export default function CardHeaderRegistroEmpleado(
    props: {
        tituloGrid: string,
        toggleModalOpcionesGrid: Function,
        elementosOpciones: Rol[],
        parametrosBusqueda: {
            setId: Function,
            setNombres: Function,
            setApellidoPaterno: Function,
            setApellidoMaterno: Function,
            setNumeroTelefonico: Function,
            setIdRol: Function
        },
        opcionesTabla?: {
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
        }
        children?: any,
    }
) {

    return(
        <Card color="dark">
            <CardHeader className='text-white'>
                <Container>
                    <Row>
                        <Col>
                            {props.tituloGrid}
                        </Col>

                        <Col style={{textAlign:'right'}}>
                            {/*Renderizamos la barra de opciones del grid*/}
                            <BarraAccionesGrid
                                onAgregarRegistro={
                                    props.funcionesOpciones.onAgregarRegistro
                                }
                                onRefrescarGrid={() => {
                                    props.funcionesOpciones.onRefrescarGrid()
                                }}
                                onProbarSerial={() => {
                                    props.funcionesOpciones.onProbarSerial();
                                }}
                                onCambiarConfiguracion={() => {
                                    props.funcionesOpciones.onCambiarConfiguracion();
                                    props.toggleModalOpcionesGrid();
                                }}
                            />
                        </Col>
                    </Row>
                </Container>
            </CardHeader>

            <CardBody>
                <FormBusquedaEmpleado
                    parametrosBusqueda={props.parametrosBusqueda}
                    elementosOpciones={props.elementosOpciones}
                />
            </CardBody>
        </Card>
    );
};