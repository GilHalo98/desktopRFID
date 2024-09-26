'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Container, Col, Row
} from 'reactstrap';

// Componentes propios.
import IndicadorCargaSpinner from '../cargas/indicadorCargaSpinner';

// Funcionalidad del grid.

// Modelo de datos.

export default function GridParaReporteDetalleHorasTrabajadas(
    props: {
        children?: any
    }
) {
    return(
        <Container fluid>
            {/*Renderizamos el contenido del grid.*/}
            {props.children}
        </Container>
    );
};