'use client'

import React from "react";

import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.
import {
    Empleado
} from "../../../utils/API/modelos/empleado";

export default function FormBusquedaHorario(
    props: {
        parametrosBusqueda: {
            setIdHorario: Function,
            setDescripcionHorario: Function,
            setIdEmpleadoVinculado: Function
        },
        elementosOpciones: Empleado[]
    }
) {
    const [
        idEmpleado,
        setIdEmpleado
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdEmpleadoVinculado(idEmpleado);
    }, [
        idEmpleado
    ]);
    
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idHorario"
                        placeholder="ID del horario"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setIdHorario(id);
                        }}
                    />
                </Col>

                {/*Input de dia*/}
                <Col>
                    <Input
                        id="descripcionHorario"
                        type="text"
                        placeholder="Descripcion del horario"
                        onChange={(evento) => {
                            props.parametrosBusqueda.setDescripcionHorario(
                                evento.target.value
                            );
                        }}
                    />
                </Col>

                {/*Input de id del empleado*/}
                <Col>
                    <Input
                        id="idEmpleado"
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

                        {props.elementosOpciones.map(
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