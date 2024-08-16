'use client'

// React.
import React, { ChangeEvent } from "react";

// Componentes de reacstrap.
import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.

export default function FormBusquedaHistorialActividad(
    props: {
        parametrosBusqueda: {
            setIdDispositivo: Function,
            setDescripcionDispositivo: Function,
            setSemanaReporte: Function
        }
    }
) {    
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idDispositivo"
                        placeholder="ID del dispositivo"
                        type="text"
                        onChange={(evento: ChangeEvent) => {
                            const input = evento.target as HTMLTextAreaElement;

                            props.parametrosBusqueda.setIdDispositivo(
                                input.value
                            );
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="descripcionDispositivo"
                        placeholder="Descripción del dispositivo"
                        type="text"
                        onChange={(evento: ChangeEvent) => {
                            const input = evento.target as HTMLTextAreaElement;

                            props.parametrosBusqueda.setDescripcionDispositivo(
                                input.value
                            );
                        }}
                    />
                </Col>

                {/*Rango de fechas*/}
                <Col>
                    <Input
                        id="semana"
                        placeholder="Semana a generar reporte"
                        type="week"
                        onChange={(evento: ChangeEvent) => {
                            const input = evento.target as HTMLInputElement;

                            props.parametrosBusqueda.setSemanaReporte(
                                input.value
                            );
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};