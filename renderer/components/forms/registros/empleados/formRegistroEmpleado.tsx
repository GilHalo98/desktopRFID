import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';
import { Rol } from '../../../../utils/API/modelos/rol';
import { guardarRegistro } from './logic/formLogic';

export default function FormRegistroEmpleado(
    props: {
        elementosOpciones: {
            listaRoles: Rol[]
        },
        toggleModal: Function,
        toggleRefresh: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            guardarRegistro(evento);
            props.toggleModal();
            props.toggleRefresh();
        }}>
            {/*Campo de carga de imagen del empleado*/}
            <FormGroup>
                <Label for="imagenEmpleado">
                    Foto del empleado
                </Label>
                <Input
                    id="imagenEmpleado"
                    name="file"
                    type="file"
                />
            </FormGroup>

            {/*Campo de nombres del empleado*/}
            <FormGroup>
                <Label for="nombreEmpleado">
                    Nombres del empleado
                </Label>

                <Input
                    id="nombreEmpleado"
                    name="campoNombreEmpleado"
                    type="text"
                />
            </FormGroup>

            {/*Campo de apellido paterno del empleado*/}
            <FormGroup>
                <Label for="apellidoPaternoEmpelado">
                    Apellido paterno del empleado
                </Label>

                <Input
                    id="apellidoPaternoEmpelado"
                    name="campoApellidoPaternoEmpelado"
                    type="text"
                />
            </FormGroup>

            {/*Campo de apellido materno del empleado*/}
            <FormGroup>
                <Label for="apellidoMaternoEmpelado">
                    Apellido paterno del empleado
                </Label>

                <Input
                    id="apellidoMaternoEmpelado"
                    name="campoApellidoMaternoEmpelado"
                    type="text"
                />
            </FormGroup>

            {/*Campo de numero telefónico del empleado*/}
            <FormGroup>
                <Label for="numeroEmpleado">
                    Numero telefónico del empleado
                </Label>

                <Input
                    id="numeroEmpleado"
                    name="campoNumeroEmpleado"
                    type="tel"
                />
            </FormGroup>

            {/*Campo de fecha de nacimiento del empleado*/}
            <FormGroup>
                <Label for="nacimientoEmpleado">
                    Fecha de nacimiento del empleado
                </Label>

                <Input
                    id="nacimientoEmpleado"
                    name="campoNacimientoEmpleado"
                    type="date"
                />
            </FormGroup>

            {/*Campo de rol del empleado*/}
            <FormGroup>
                <Label for="rolEmpleado">
                    Rol del empleado
                </Label>

                <Input
                    id="rolEmpleado"
                    type="select"
                >
                    {props.elementosOpciones.listaRoles.map((registro: Rol) => {
                        return(
                            <option value={registro.id}>
                                {registro.rolTrabajador}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {/*Check para crear un registro de usuario del mismo registro de empleado*/}
            <FormGroup switch>
                <Label for="crearUsuario" switch>
                    Crear registro de usuario a partir del registro de empleado
                </Label>

                <Input
                    id="crearUsuario"
                    name="campoCrearUsuario"
                    type="switch"
                />
            </FormGroup>

            <br/>

            <Container>
                <Row>
                    <Col>
                        <Button
                            active
                            outline
                            block
                            onClick={() => {
                                props.toggleModal();
                            }}
                        >
                            Cancelar
                        </Button>
                    </Col>

                    <Col>
                        <Button
                            active
                            outline
                            block
                            color='success'
                        >
                            Registrar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};