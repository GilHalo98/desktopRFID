import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { guardarRegistro } from './logic/formLogic';
import { Permiso } from '../../../../utils/API/modelos/permiso';

export default function FormRegistroRoles(
    props: {
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
            guardarRegistro(evento);
            props.toggleModal();
            props.toggleRefresh();
        }}>
            <FormGroup>
                <Label for="descripcionRol">
                    Rol
                </Label>

                <Input
                    id="descripcionRol"
                    name="campoDescripcionRol"
                    type="text"
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
                />
            </FormGroup>

            <FormGroup>
                <Label for="permisoVinculado">
                    Permiso vinculado del rol
                </Label>

                <Input
                    id="permisoVinculado"
                    type="select"
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