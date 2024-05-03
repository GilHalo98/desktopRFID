import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

// Modelo de datos
import {
    Reporte
} from "../../../../utils/API/modelos/reporte";

import {
    DispositivoIoT
} from '../../../../utils/API/modelos/dispositivoIoT';

export default function FormRegistroReportesDispositivo(
    props: {
        elementosOpciones:  {
            listaReportes: Reporte[],
            listaDispositivos: DispositivoIoT[]
        },
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
            {/*Input de id de reporte*/}
            <FormGroup>
                <Label for="idReporte">
                    Reporte vinculado
                </Label>

                <Input
                    id="idReporte"
                    type="select"
                >
                    {props.elementosOpciones.listaReportes.map(
                        (registro: Reporte) => {
                            return(
                                <option value={registro.id}>
                                    {registro.descripcionReporte}
                                </option>
                            );
                        }
                    )}
                </Input>
            </FormGroup>

            {/*Input de id de dispositivo*/}
            <FormGroup>
                <Label for="idDispositivo">
                    Dispositivo vinculado al reporte del dispositivo
                </Label>

                <Input
                    id="idDispositivo"
                    type="select"
                >
                    {props.elementosOpciones.listaDispositivos.map(
                        (registro: DispositivoIoT) => {
                            return(
                                <option value={registro.id}>
                                    {registro.descripcionDispositivo}
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