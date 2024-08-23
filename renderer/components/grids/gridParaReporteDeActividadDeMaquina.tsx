'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Container
} from 'reactstrap';

// Componentes propios.

// Funcionalidad del grid.

// Modelo de datos.

export default function GridParaReporteDeActividadDeMaquina(
    props: {
        children?: any
    }
) {
    return(
        <Container>
            {/*Renderizamos el contenido del grid.*/}
            {props.children}
        </Container>
    );
};