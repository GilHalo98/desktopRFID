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

export default function FormBusquedaReporteChequeo(
    props: {
        parametrosBusqueda: {
            setIdReporteChequeo: Function,
            setIdReporte: Function,
            setIdEmpleado: Function
        },
        elementosOpciones: {
            listaReportes: Reporte[],
            listaEmpleados: Empleado[]
        }
    }
) {
    const [
        idReporte,
        setIdReporte
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

    return(
        <Container>
            <Row>
                {/*Input de id de reporte de actividad*/}
                <Col>
                    <Input
                        id="idReporteChequeo"
                        placeholder="ID del reporte de chequeo"
                        type="text"
                        onChange={(evento) => {
                            var id = null;
                            if(evento.target.value) {
                                id = parseInt(evento.target.value)
                            }
                            props.parametrosBusqueda.setIdReporteChequeo(id);
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
            </Row>
        </Container>
    );
};