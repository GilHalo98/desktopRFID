import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { Empleado } from '../../../../utils/API/modelos/empleado';
import { Rol } from '../../../../utils/API/modelos/rol';
import { modificarRegistro } from './logic/formLogic';

export default function FormModificarEmpleado(
    props: {
        registro: Empleado,
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
            modificarRegistro(evento, props.registro.id);
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
                    defaultValue={props.registro.nombres}
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
                    defaultValue={props.registro.apellidoPaterno}
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
                    defaultValue={props.registro.apellidoMaterno}
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
                    defaultValue={props.registro.numeroTelefonico}
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
                    defaultValue={props.registro.fechaNacimiento.split('T')[0]}
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
                    defaultValue={props.registro.idRolVinculado}
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

            <Container>
                <Row>
                    <Col>
                        <Button
                            active
                            outline
                            block
                            onClick={() => {
                                props.toggleModal();
                            }}>
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
                            Guardar Cambios
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};