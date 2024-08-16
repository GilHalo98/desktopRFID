'use client'

// React.
import React, { ChangeEvent } from "react";

// Componentes de reacstrap.
import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

// Modelo de datos.

export default function FormBusquedaDashboardActividad(
    props: {
        parametrosBusqueda: {
            setIdDispositivo: Function,
            setDescripcionDispositivo: Function
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
            </Row>
        </Container>
    );
};