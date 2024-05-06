'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    ButtonGroup
} from 'reactstrap';

// Logica del componente.
import {
    renderizarAgregarRegistro,
    renderizarRefrescarTabla,
    renderizarExportarDatos,
    renderizarOpciones
} from './logic/renders';

export default function BarraAccionesTabla(
    props: {
        onAgregarRegistro?: Function,
        onRefrescarTabla?: Function,
        onExportarDatos?: Function,
        onOpciones?: Function,
    }
) {


    return (
        <ButtonGroup size="sm">
            {renderizarAgregarRegistro(props.onAgregarRegistro)}
            {renderizarRefrescarTabla(props.onRefrescarTabla)}
            {renderizarExportarDatos(props.onExportarDatos)}
            {renderizarOpciones(props.onOpciones)}
        </ButtonGroup>
    );
};