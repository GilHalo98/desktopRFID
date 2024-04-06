import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';
import { TipoReporte } from '../../../../utils/API/modelos/tipoReporte';
import { modificarRegistro } from './logic/formLogic';

export default function FormModificarTipoReporte(
    props: {
        registro: TipoReporte,
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
                <Label for="classificacionTipoReporte">
                    Clasificación del tipo de reporte
                </Label>

                <Input
                    id="classificacionTipoReporte"
                    name="campoClassificacionTipoReporte"
                    type="text"
                    defaultValue={props.registro.clasificacionReporte}
                />
            </FormGroup>

            <FormGroup>
                <Label for="descripcionTipoReporte">
                    Descripción del tipo de reporte
                </Label>

                <Input
                    id="descripcionTipoReporte"
                    name="campoDescripcionTipoReporte"
                    type="text"
                    defaultValue={props.registro.descripcionTipoReporte}
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