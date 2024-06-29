// funcionalidad de React.
import React from 'react';

// Componentes de reacstrap.
import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

// Modelo de datos.
import { Rol } from '../../../../utils/API/modelos/rol';

export default function FormRegistroEmpleadoCompleto(
    props: {
        elementosOpciones: Rol[],
        onGuardarRegistro: Function,
        toggleModal: Function,
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onGuardarRegistro(evento);
            props.toggleModal();
        }}>
            {/*Campo de imagen del empleado*/}
            <FormGroup>
                <Label for='imagenEmpleado'>
                    Foto del empleado
                </Label>

                <Input
                    id='imagenEmpleado'
                    name='campoImagenEmpleado'
                    type='file'
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
                    {props.elementosOpciones.map((registro: Rol) => {
                        return(
                            <option value={registro.id}>
                                {registro.rolTrabajador}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>
        </Form>
    );
};