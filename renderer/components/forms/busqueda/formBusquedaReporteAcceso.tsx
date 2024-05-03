'use client'

// React
import React from 'react';

// Conponentes de reactstrap
import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.
import {
    Reporte
} from '../../../utils/API/modelos/reporte';

import {
    Empleado
} from '../../../utils/API/modelos/empleado';

import {
    Zona
} from '../../../utils/API/modelos/zona';

export default function FormBusquedaReporteAcceso(
    props: {
        parametrosBusqueda: {
            setIdReporteAcceso: Function,
            setIdReporte: Function,
            setIdEmpleado: Function,
            setIdZona: Function
        },
        elementosOpciones: {
            listaReportes: Reporte[],
            listaEmpleados: Empleado[],
            listaZonas: Zona[]
        }
    }
) {
    const [
        idReporte,
        setIdReporte
    ] = React.useState("");

    const [
        idZona,
        setIdZona
    ] = React.useState("");

    const [
        idEmpleado,
        setIdEmpleado
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdReporte(idReporte);
    }, [idReporte]);

    React.useEffect(() => {
        props.parametrosBusqueda.setIdEmpleado(idEmpleado);
    }, [idEmpleado]);

    React.useEffect(() => {
        props.parametrosBusqueda.setIdZona(idZona);
    }, [idZona]);

    return(
        <Container>
            <Row>
                {/*Input de id de reporte de acceso*/}
                <Col>
                    <Input
                        id="idReporteAcceso"
                        placeholder="ID del reporte de acceso"
                        type="text"
                        onChange={(evento) => {
                            var id = null;
                            if(evento.target.value) {
                                id = parseInt(evento.target.value)
                            }
                            props.parametrosBusqueda.setIdReporteAcceso(id);
                        }}
                    />
                </Col>

                {/*Input de id de reporte*/}
                <Col>
                    <Input
                        id="idReporte"
                        type="select"
                        value={idReporte}
                        onChange={(input) => {
                            setIdReporte(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todos los reportes
                        </option>

                        {props.elementosOpciones.listaReportes.map(
                            (registro: Reporte) => {
                                return(
                                    <option value={registro.id}>
                                        {registro.descripcionReporte}
                                    </option>
                                );
                            }
                        )}
                    </Input>
                </Col>

                {/*Input de id de empleado*/}
                <Col>
                    <Input
                        id="idEmpelado"
                        type="select"
                        value={idEmpleado}
                        onChange={(input) => {
                            setIdEmpleado(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todos los empleados
                        </option>

                        {props.elementosOpciones.listaEmpleados.map(
                            (registro: Empleado) => {
                                return(
                                    <option value={registro.id}>
                                        {
                                            registro.nombres
                                            + " "
                                            + registro.apellidoPaterno
                                            + " "
                                            + registro.apellidoMaterno
                                        }
                                    </option>
                                );
                            }
                        )}
                    </Input>
                </Col>

                {/*Input de id de zona*/}
                <Col>
                    <Input
                        id="idZona"
                        type="select"
                        value={idZona}
                        onChange={(input) => {
                            setIdZona(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todas las zonas
                        </option>

                        {props.elementosOpciones.listaZonas.map(
                            (registro: Zona) => {
                                return(
                                    <option value={registro.id}>
                                        {registro.nombreZona}
                                    </option>
                                );
                            }
                        )}
                    </Input>
                </Col>
            </Row>
        </Container>
    );
};