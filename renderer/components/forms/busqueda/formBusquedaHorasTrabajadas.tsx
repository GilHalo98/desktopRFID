'use client'

import React, { ChangeEvent, SyntheticEvent } from "react";

import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.
import {
    Rol
} from "../../../utils/API/modelos/rol";

export default function FormBusquedaHorasTrabajadas(
    props: {
        parametrosBusqueda: {
            setIdEmpleado: Function,
            setNombres: Function,
            setIdRolVinculado: Function,
            setSemanaReporte: Function
        },
        elementosOpciones: Rol[]
    }
) {
    const [
        idRolEmpleado,
        setIdRolEmpleado
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdRolVinculado(idRolEmpleado);
    }, [
        idRolEmpleado
    ]);
    
    return(
        <Container>
            <Row>
                {/*ID del empleado*/}
                <Col>
                    <Input
                        id="idEmpleado"
                        placeholder="ID del empleado"
                        type="text"
                        onChange={(evento: ChangeEvent) => {
                            const input = evento.target as HTMLTextAreaElement;

                            props.parametrosBusqueda.setIdEmpleado(
                                input.value
                            );
                        }}
                    />
                </Col>

                {/*Nombre del empleado*/}
                <Col>
                    <Input
                        id="nombreEmpleado"
                        type="text"
                        placeholder="Nombres del empleado"
                        onChange={(evento: ChangeEvent) => {
                            const input = evento.target as HTMLTextAreaElement;

                            props.parametrosBusqueda.setNombres(input.value);
                        }}
                    />
                </Col>

                {/*Rol del empleado*/}
                <Col>
                    <Input
                        id="idRolEmpleado"
                        type="select"
                        value={idRolEmpleado}
                        onChange={(evento: ChangeEvent) => {
                            const input = evento.target as HTMLSelectElement;

                            setIdRolEmpleado(
                                input.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todos los roles
                        </option>

                        {props.elementosOpciones.map(
                            (registro: Rol) => {
                                return(
                                    <option value={registro.id}>
                                        {
                                            registro.descripcionRol
                                        }
                                    </option>
                                );
                            }
                        )}
                    </Input>
                </Col>

                {/*Rango de fechas*/}
                <Col>
                    <Input
                        id="semana"
                        placeholder="Semana a generar reporte"
                        type="week"
                        onChange={(evento: ChangeEvent) => {
                            const input = evento.target as HTMLInputElement;

                            props.parametrosBusqueda.setSemanaReporte(
                                input.value
                            );
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};