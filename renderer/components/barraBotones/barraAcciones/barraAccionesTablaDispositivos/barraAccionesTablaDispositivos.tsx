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
    renderizarProbarSerial,
    renderizarOpciones
} from './logic/renders';

export default function BarraAccionesTablaDispositivos(
    props: {
        onProbarSerial?: Function,
        onRefrescarTabla?: Function,
        onOpciones?: Function,
    }
) {


    return (
        <ButtonGroup size="sm">
            {renderizarRefrescarTabla(props.onRefrescarTabla)}
            {renderizarProbarSerial(props.onProbarSerial)}
            {renderizarOpciones(props.onOpciones)}
        </ButtonGroup>
    );
};