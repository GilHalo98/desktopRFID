'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    ButtonGroup
} from 'reactstrap';

// Logica del componente.
import {
    renderizarRefrescarTabla,
    renderizarModificarRegistro,
    renderizarOpciones
} from './logic/renders';

export default function BarraAccionesTablaHorarioEmpleados(
    props: {
        onModificarRegistro?: Function,
        onRefrescarTabla?: Function,
        onOpciones?: Function,
    }
) {


    return (
        <ButtonGroup size="sm">
            {renderizarRefrescarTabla(props.onRefrescarTabla)}
            {renderizarModificarRegistro(props.onModificarRegistro)}
            {renderizarOpciones(props.onOpciones)}
        </ButtonGroup>
    );
};