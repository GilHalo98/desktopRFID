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
    renderizarExportarDatos,
    renderizarOpciones
} from './logic/renders';

export default function BarraAccionesTablaReportesHorasTrabajadas(
    props: {
        onRefrescarTabla?: Function,
        onExportarDatos?: Function,
        onOpciones?: Function,
    }
) {


    return (
        <ButtonGroup size="sm">
            {renderizarRefrescarTabla(props.onRefrescarTabla)}
            {renderizarExportarDatos(props.onExportarDatos)}
            {renderizarOpciones(props.onOpciones)}
        </ButtonGroup>
    );
};