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

import {
    Reporte
} from "../../../../utils/API/modelos/reporte";

export default function FormModificarReportes(
    props: {
        registro: Reporte,
        elementosOpciones: TipoReporte[],
        onModificarRegistro: Function,
        toggleModal: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onModificarRegistro(
                evento,
                props.registro.id
            );
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
                    defaultValue={props.registro.descripcionReporte}
                />
            </FormGroup>

            <FormGroup>
                <Label for="tipoReporteVinculado">
                    Tipo de reporte
                </Label>

                <Input
                    id="tipoReporteVinculado"
                    type="select"
                    defaultValue={props.registro.idTipoReporteVinculado}
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