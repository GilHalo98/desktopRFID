'use client'

import React from 'react';

import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

import { Rol } from '../../../utils/API/modelos/rol';

export default function FormBusquedaEmpleado(
    props: {
        parametrosBusqueda: {
            setIdEmpleado: Function,
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
                        onChange={(evento) => {
                            var id = null;
                            if(evento.target.value) {
                                id = evento.target.value;
                            }
                            props.parametrosBusqueda.setIdEmpleado(id);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="numeroEmpleado"
                        placeholder="Numero telefonico del empleado"
                        type="text"
                        onChange={(evento) => {
                            var numeroEmpleado = null;
                            if(evento.target.value) {
                                numeroEmpleado = evento.target.value;
                            }
                            props.parametrosBusqueda.setNumeroTelefonico(
                                numeroEmpleado
                            );
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="rolEmpleado"
                        type="select"
                        value={idRol}
                        onChange={(evento) => {
                            setIdRol(evento.target.value);
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
                        onChange={(evento) => {
                            var nombresEmpleado = null;
                            if(evento.target.value) {
                                nombresEmpleado = evento.target.value;
                            }
                            props.parametrosBusqueda.setNombres(
                                nombresEmpleado
                            );
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="apellidoPaterno"
                        placeholder="Apellido paterno del empleado"
                        type="text"
                        onChange={(evento) => {
                            var apellidoPaterno = null;
                            if(evento.target.value) {
                                apellidoPaterno = evento.target.value;
                            }
                            props.parametrosBusqueda.setApellidoPaterno(
                                apellidoPaterno
                            );
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="apellidoMaterno"
                        placeholder="Apellido materno del empleado"
                        type="text"
                        onChange={(evento) => {
                            var apellidoMaterno = null;
                            if(evento.target.value) {
                                apellidoMaterno = evento.target.value;
                            }
                            props.parametrosBusqueda.setApellidoMaterno(
                                apellidoMaterno
                            );
                        }}
                    />
                </Col>
            </Row>
            
            <br/>
        </Container>
    );
};