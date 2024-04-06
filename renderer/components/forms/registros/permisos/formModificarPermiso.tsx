import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { Permiso } from '../../../../utils/API/modelos/permiso';
import { Zona } from '../../../../utils/API/modelos/zona';
import { modificarRegistro } from './logic/formLogic';

export default function FormModificarPermiso(
    props: {
        registro: Permiso,
        elementosOpciones: Zona[],
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
                <Label for="descripcionPermiso">
                    Descripcion del permiso
                </Label>

                <Input
                    id="descripcionPermiso"
                    name="campoDescripcionPermiso"
                    type="text"
                    defaultValue={props.registro.descripcionPermiso}
                />
            </FormGroup>

            <Label>
                Autorización
            </Label>

            <Container>
                <Row>
                    {props.elementosOpciones.map((registroZona: Zona, index: number) => {
                        return(
                            <Col sm={6}>
                                <FormGroup check>
                                    <Input
                                        type="checkbox"
                                        value={registroZona.bitZona}
                                        defaultChecked={props.registro.autorizacion & registroZona.bitZona ? true : false}
                                    />

                                    <Label check>
                                        {registroZona.nombreZona}
                                    </Label>
                                </FormGroup>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

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