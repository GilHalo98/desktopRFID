'use client'

import React, { SyntheticEvent } from 'react';

import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

import { Rol } from '../../../utils/API/modelos/rol';

export default function FormBusquedaEmpleado(
    props: {
        parametrosBusqueda: {
            setId: Function,
            setNombres: Function,
            setApellidoPaterno: Function,
            setApellidoMaterno: Function,
            setNumeroTelefonico: Function,
            setIdRol: Function
        },
        elementosOpciones: Rol[]
    }
) {
    const [
        idRol,
        setIdRol
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdRol(idRol);
    }, [
        idRol
    ]);

    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idEmpleado"
                        placeholder="ID del empleado"
                        type="text"
                        onChange={(evento: SyntheticEvent) => {
                            const input = evento.target as HTMLTextAreaElement;
                            props.parametrosBusqueda.setId(input.value);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="numeroEmpleado"
                        placeholder="Numero telefonico del empleado"
                        type="text"
                        onChange={(evento: SyntheticEvent) => {
                            const input = evento.target as HTMLTextAreaElement;
                            props.parametrosBusqueda.setNumeroTelefonico(
                                input.value
                            );
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="rolEmpleado"
                        type="select"
                        value={idRol}
                        onChange={(evento: SyntheticEvent) => {
                            const input = evento.target as HTMLSelectElement;
                            setIdRol(input.value);
                        }}
                    >
                        <option value={''}>
                            Todos los roles
                        </option>

                        {props.elementosOpciones.map(
                            (registro: Rol) => {
                                return(
                                    <option value={registro.id}>
                                        {registro.rolTrabajador}
                                    </option>
                                );
                            }
                        )}
                    </Input>
                </Col>
            </Row>
            
            <br/>

            <Row>
                <Col>
                    <Input
                        id="nombresEmpleado"
                        placeholder="Nombres de empleado"
                        type="text"
                        onChange={(evento: SyntheticEvent) => {
                            const input = evento.target as HTMLTextAreaElement;
                            props.parametrosBusqueda.setNombres(
                                input.value
                            );
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="apellidoPaterno"
                        placeholder="Apellido paterno del empleado"
                        type="text"
                        onChange={(evento: SyntheticEvent) => {
                            const input = evento.target as HTMLTextAreaElement;
                            props.parametrosBusqueda.setApellidoPaterno(
                                input.value
                            );
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="apellidoMaterno"
                        placeholder="Apellido materno del empleado"
                        type="text"
                        onChange={(evento: SyntheticEvent) => {
                            const input = evento.target as HTMLTextAreaElement;
                            props.parametrosBusqueda.setApellidoMaterno(
                                input.value
                            );
                        }}
                    />
                </Col>
            </Row>
            
            <br/>
        </Container>
    );
};