import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

import { modificarRegistro } from './logic/formLogic';
import { TipoDispositivo } from '../../../../utils/API/modelos/tipoDispositivo';

export default function FormModificarTipoDispositivo(
    props: {
        registro: TipoDispositivo,
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
                <Label for="nombreTipoReporte">
                    Nombre del tipo de dispositivo
                </Label>

                <Input
                    id="nombreTipoDispositivo"
                    name="camponombreTipoDispositivo"
                    type="text"
                    defaultValue={props.registro.nombreTipoDispositivo}
                />
            </FormGroup>

            <FormGroup>
                <Label for="descripcionTipoDispositivo">
                    Descripción del tipo de dispositivo
                </Label>

                <Input
                    id="descripcionTipoDispositivo"
                    name="campoDescripcionTipoDispositivo"
                    type="text"
                    defaultValue={props.registro.descripcionTipoDispositivo}
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