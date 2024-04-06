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
            setNumeroTelefonico: Function,
            setNombresEmpleado: Function,
            setApellidoPaterno: Function,
            setApellidoMaterno: Function,
            setRolEmpleado: Function
        },
        elementosOpciones: {
            listaRoles: Rol[]
        },
    }
) {
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idEmpleado"
                        placeholder="ID del empleado"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = input.target.value;
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
                        onChange={(input) => {
                            var numeroEmpleado = null;
                            if(input.target.value) {
                                numeroEmpleado = input.target.value;
                            }
                            props.parametrosBusqueda.setNumeroTelefonico(numeroEmpleado);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="rolEmpleado"
                        type="select"
                        onChange={(input) => {
                            props.parametrosBusqueda.setRolEmpleado(input.target.value);
                        }}
                    >
                        <option value={''}>
                            Todos
                        </option>

                        {props.elementosOpciones.listaRoles.map((registro: Rol) => {
                            return(
                                <option value={registro.id}>
                                    {registro.rolTrabajador}
                                </option>
                            );
                        })}
                    </Input>
                </Col>
            </Row><br/>

            <Row>
                <Col>
                    <Input
                        id="nombresEmpleado"
                        placeholder="Nombres de empleado"
                        type="text"
                        onChange={(input) => {
                            var nombresEmpleado = null;
                            if(input.target.value) {
                                nombresEmpleado = input.target.value;
                            }
                            props.parametrosBusqueda.setNombresEmpleado(nombresEmpleado);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="apellidoPaterno"
                        placeholder="Apellido paterno del empleado"
                        type="text"
                        onChange={(input) => {
                            var apellidoPaterno = null;
                            if(input.target.value) {
                                apellidoPaterno = input.target.value;
                            }
                            props.parametrosBusqueda.setApellidoPaterno(apellidoPaterno);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="apellidoMaterno"
                        placeholder="Apellido materno del empleado"
                        type="text"
                        onChange={(input) => {
                            var apellidoMaterno = null;
                            if(input.target.value) {
                                apellidoMaterno = input.target.value;
                            }
                            props.parametrosBusqueda.setApellidoMaterno(apellidoMaterno);
                        }}
                    />
                </Col>
            </Row><br/>
        </Container>
    );
};