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

import {
    Empleado
} from '../../../../utils/API/modelos/empleado';

import {
    ReporteActividad
} from '../../../../utils/API/modelos/reporteActividad';

export default function FormModificarReportesActividad(
    props: {
        registro: ReporteActividad,
        elementosOpciones:  {
            listaReportes: Reporte[],
            listaEmpleados: Empleado[],
            listaDispositivos: DispositivoIoT[]
        },
        onModificarRegistro: Function,
        toggleModal: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onModificarRegistro(evento);
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
                    defaultValue={props.registro.idReporteVinculado}
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
                    defaultValue={props.registro.idEmpleadoVinculado}
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
                <Label for="idDispositivo">
                    Dispositivo vinculado al reporte de actividad
                </Label>

                <Input
                    id="idDispositivo"
                    type="select"
                    defaultValue={props.registro.idDispositivoVinculado}
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