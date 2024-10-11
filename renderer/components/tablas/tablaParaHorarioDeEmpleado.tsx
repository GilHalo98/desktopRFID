'use client'

import 'bootstrap/dist/css/bootstrap.css';

// Evento de submit.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap
import {
    Container, Row, Col,
    CardBody, Card, CardHeader,
    Table,
    Badge, Alert, Spinner,
    Button, ButtonGroup
} from 'reactstrap';

// Iconos de los botones.
import Icon from '@mdi/react';

import {
    mdiCalendarEdit,
    mdiRefreshCircle
} from '@mdi/js';

// Componentes propios.
import FormBusquedaEmpleado from '../../components/forms/busqueda/formBusquedaEmpleado';

// Modelos de datos.
import {
    HorarioCompleto
} from '../../utils/API/respuestas/horarioCompleto';

import {
    Rol
} from '../../utils/API/modelos/rol';

import {
    DiaLaboral
} from '../../utils/API/modelos/diaLaboral';

// Funcionalidad
import { numeroDiaANombreDia } from '../../utils/conversiones';
import { HorasTrabajadas } from '../../utils/API/respuestas/horasTrabajadas';

export default function TablaParaHorarioDeEmpleado(
    props: {
        tituloTabla: string,
        registro: HorarioCompleto,
        elementosOpciones: Rol[],
        parametrosBusqueda: {
            setId: Function,
            setNombres: Function,
            setApellidoPaterno: Function,
            setApellidoMaterno: Function,
            setNumeroTelefonico: Function,
            setIdRol: Function
        },
        funcionesOpciones?: {
            onRefrescarTabla?: Function,
            onModificarRegistro?: Function
        },
        children?: any
    },
) {

    // Poblamos la tabla del su contenido.
    const poblarTabla = (registros: DiaLaboral[]) => {
        return registros.map((registro: DiaLaboral) => {
            if(registro.esDescanso) {
                return(
                    <tr>
                        <td  style={{textAlign: 'center'}}>
                            {numeroDiaANombreDia(registro.dia)}
                        </td>

                        <td colSpan={4} style={{textAlign: 'center'}}>
                            <Button color='secondary' block size='sm'>
                                DESCANSO
                            </Button>
                        </td>
                    </tr>
                );
            }

            return(
                <tr>
                    <td  style={{textAlign: 'center'}}>
                        {numeroDiaANombreDia(registro.dia)}
                    </td>

                    <td  style={{textAlign: 'center'}}>
                        <Button color='primary' block size='sm'>
                            {registro.horaEntrada}
                        </Button>
                    </td>

                    <td  style={{textAlign: 'center'}}>
                        <Button color='primary' block size='sm'>
                            {registro.horaSalidaDescanso}
                        </Button>
                    </td>

                    <td  style={{textAlign: 'center'}}>
                        <Button color='primary' block size='sm'>
                            {registro.horaEntradaDescanso}
                        </Button>
                    </td>

                    <td  style={{textAlign: 'center'}}>
                        <Button color='primary' block size='sm'>
                            {registro.horaSalida}
                        </Button>
                    </td>
                </tr>
            );
        });
    };

    // Renderizamos el contenido de la tabla.
    const renderContenido = (registro: HorarioCompleto) => {
        // Si los datos no existen o son invalidos.
        if(!registro) {
            // Mostramos el spinner de carga.
            return(
                <Container>
                    <Row>
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
            );
        }

        return(
            <Table hover dark responsive>
                <thead className='cabeceraTablaRegistros'>
                    <tr key="header">
                        <th>Dia</th>
                        <th>Entrada</th>
                        <th>Inicio de descanso</th>
                        <th>Termino de descanso</th>
                        <th>Salida</th>
                    </tr>
                </thead>

                <tbody>
                    {/*Poblamos la tabla.*/}
                    {poblarTabla(registro.diaLaborals)}
                </tbody>
            </Table>
        );
    };

    return (
        <Card color='dark'>
            <CardHeader className='text-white'>
                {/*
                    Renderizamos el header de la tabla de horario
                    del empleado
                */}
                <Container>
                    <Row>
                        <Col>
                            {props.tituloTabla}
                        </Col>

                        <Col style={{textAlign:'right'}}>
                            <ButtonGroup size="sm">
                                <Button
                                    className='botonIcono'
                                    outline
                                    color='primary'
                                    onClick={() => {
                                        props.funcionesOpciones.onRefrescarTabla();
                                    }}
                                >
                                    <Icon path={mdiRefreshCircle} size={1} />
                                </Button>

                                <Button
                                    className='botonIcono'
                                    outline
                                    color='warning'
                                    onClick={() => {
                                        props.funcionesOpciones.onModificarRegistro();
                                    }}
                                >
                                    <Icon path={mdiCalendarEdit} size={1} />
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </CardHeader>

            <CardBody>
                <Container>
                    {/*
                        Renderizamos la barra de busqueda de la tabla.
                    */}
                    <Row>
                        <FormBusquedaEmpleado
                            parametrosBusqueda={props.parametrosBusqueda}
                            elementosOpciones={props.elementosOpciones}
                        />
                    </Row>

                    <Row>
                        {renderContenido(props.registro)}

                        {/* Renderizamos le contenido hijo del componente */}
                        {props.children}
                    </Row>
                </Container>
            </CardBody>
        </Card>
    );
};