import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

// Modelo de datos
import {
    TipoReporte
} from '../../../../utils/API/modelos/tipoReporte';

export default function FormRegistroReportes(
    props: {
        elementosOpciones: TipoReporte[],
        onGuardarRegistro: Function,
        toggleModal: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            evento.preventDefault();
            props.onGuardarRegistro(evento);
            props.toggleModal();
        }}>
            <FormGroup>
                <Label for="descripcionReporte">
                    Descripcion del reporte
                </Label>

                <Input
                    id="descripcionReporte"
                    name="campodescripcionReporte"
                    type="text"
                />
            </FormGroup>

            <FormGroup>
                <Label for="tipoReporteVinculado">
                    Tipo de reporte
                </Label>

                <Input
                    id="tipoReporteVinculado"
                    type="select"
                >
                    {props.elementosOpciones.map(
                        (registro: TipoReporte) => {
                            return(
                                <option value={registro.id}>
                                    {registro.descripcionTipoReporte}
                                </option>
                            );
                        }
                    )}
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