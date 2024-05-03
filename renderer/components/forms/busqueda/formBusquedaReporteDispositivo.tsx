'use client'

// React
import React from 'react';

// Conponentes de reactstrap
import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.
import {
    Reporte
} from '../../../utils/API/modelos/reporte';

import {
    DispositivoIoT
} from '../../../utils/API/modelos/dispositivoIoT';

export default function FormBusquedaReporteDispositivo(
    props: {
        parametrosBusqueda: {
            setIdReporteDispositivo: Function,
            setIdReporte: Function,
            setIdDispositivo: Function
        },
        elementosOpciones: {
            listaReportes: Reporte[],
            listaDispositivos: DispositivoIoT[]
        }
    }
) {
    const [
        idReporte,
        setIdReporte
    ] = React.useState("");

    const [
        idDispositivo,
        setIdDispositivo
    ] = React.useState("");

    React.useEffect(() => {
        props.parametrosBusqueda.setIdReporte(idReporte);
    }, [idReporte]);

    React.useEffect(() => {
        props.parametrosBusqueda.setIdDispositivo(idDispositivo);
    }, [idDispositivo]);

    return(
        <Container>
            <Row>
                {/*Input de id de reporte del dispositivo*/}
                <Col>
                    <Input
                        id="idReporteDispositivo"
                        placeholder="ID del reporte del dispositivo"
                        type="text"
                        onChange={(evento) => {
                            var id = null;
                            if(evento.target.value) {
                                id = parseInt(evento.target.value)
                            }
                            props.parametrosBusqueda.setIdReporteDispositivo(
                                id
                            );
                        }}
                    />
                </Col>

                {/*Input de id de reporte*/}
                <Col>
                    <Input
                        id="idReporte"
                        type="select"
                        value={idReporte}
                        onChange={(input) => {
                            setIdReporte(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todos los reportes
                        </option>

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
                </Col>

                {/*Input de id de dispositivo*/}
                <Col>
                    <Input
                        id="idDispositivo"
                        type="select"
                        value={idDispositivo}
                        onChange={(input) => {
                            setIdDispositivo(
                                input.target.value
                            );
                        }}
                    >
                        <option value={''}>
                            Todos los dispositivos
                        </option>

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
                </Col>
            </Row>
        </Container>
    );
};