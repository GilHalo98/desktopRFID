'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card, CardHeader, CardBody,
    Container, Row, Col,
    Button,
    Nav, NavItem, NavLink, ButtonGroup, Table
} from 'reactstrap';

// Componentes propios.
import FormBusquedaDashboardActividad from '../../forms/busqueda/formBusquedaDashboardActividad';

// Funcionalidad del grid.
import {
    funcionRefresh
} from '../../../utils/refresh';

// Enumeradores.
import { ESTATUS_DISPOSITIVOS } from '../../../utils/statusDispositivos';

// Modelo de datos.
import { DispositivoIoT } from '../../../utils/API/modelos/dispositivoIoT';
import { renderBarraOpciones } from '../../tablas/logic/renders';
import FormBusquedaEmpleado from '../../forms/busqueda/formBusquedaEmpleado';
import { Rol } from '../../../utils/API/modelos/rol';
import BarraAccionesTabla from '../../barraBotones/barraAcciones/barraAccionesTabla/barraAccionesTabla';
import BarraAccionesGrid from '../../barraBotones/barraAcciones/barraAccionesGrid/barraAccionesGrid';

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