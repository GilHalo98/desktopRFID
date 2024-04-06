import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { modificarRegistro } from './logic/formLogic';
import { Rol } from '../../../../utils/API/modelos/rol';
import { Permiso } from '../../../../utils/API/modelos/permiso';

export default function FormModificarRoles(
    props: {
        registro: Rol,
        elementosOpciones: {
            listaPermisos: Permiso[],
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
            <FormGroup>
                <Label for="nombreRol">
                    Rol
                </Label>

                <Input
                    id="nombreRol"
                    name="campoDescripcionRol"
                    type="text"
                    defaultValue={props.registro.rolTrabajador}
                />
            </FormGroup>

            <FormGroup>
                <Label for="descripcionRol">
                    Descripcion del rol
                </Label>

                <Input
                    id="descripcionRol"
                    name="campoDescripcionRol"
                    type="text"
                    defaultValue={props.registro.descripcionRol}
                />
            </FormGroup>

            <FormGroup>
                <Label for="permisoVinculado">
                    Permiso vinculado del rol
                </Label>

                <Input
                    id="permisoVinculado"
                    type="select"
                    defaultValue={props.registro.idPermisoVinculado}
                >
                    {props.elementosOpciones.listaPermisos.map((registro: Permiso) => {
                        return(
                            <option value={registro.id}>
                                {registro.descripcionPermiso}
                            </option>
                        );
                    })}
                </Input>
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