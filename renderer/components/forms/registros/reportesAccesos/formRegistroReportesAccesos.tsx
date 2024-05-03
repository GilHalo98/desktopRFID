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
    Zona
} from '../../../../utils/API/modelos/zona';

import {
    Empleado
} from '../../../../utils/API/modelos/empleado';

export default function FormRegistroReportesAccesos(
    props: {
        elementosOpciones:  {
            listaReportes: Reporte[],
            listaEmpleados: Empleado[],
            listaZonas: Zona[]
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

            {/*Input de id de empleado*/}
            <FormGroup>
                <Label for="idEmpelado">
                    Empleado vinculado al reporte de actividad
                </Label>

                <Input
                    id="idEmpelado"
                    type="select"
                >
                    {props.elementosOpciones.listaEmpleados.map(
                        (registro: Empleado) => {
                            return(
                                <option value={registro.id}>
                                    {
                                        registro.nombres
                                        + " "
                                        + registro.apellidoPaterno
                                        + " "
                                        + registro.apellidoMaterno
                                    }
                                </option>
                            );
                        }
                    )}
                </Input>
            </FormGroup>

            {/*Input de id de dispositivo*/}
            <FormGroup>
                <Label for="idZona">
                    Zona vinculada al reporte
                </Label>

                <Input
                    id="idZona"
                    type="select"
                >
                    {props.elementosOpciones.listaZonas.map(
                        (registro: Zona) => {
                            return(
                                <option value={registro.id}>
                                    {registro.nombreZona}
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