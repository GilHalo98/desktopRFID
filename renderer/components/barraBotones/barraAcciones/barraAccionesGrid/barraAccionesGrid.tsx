/**
 * TODO: pasar los renders al logic de renders, agregar los renders que faltan
 */

'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    ButtonGroup
} from 'reactstrap';

// Renders de los botones.
import {
    renderizarAgregarRegistro,
    renderizarExportarDatos,
    renderizarRefrescarGrid,
    renderizarProbarSerial,
    renderizarOpciones
} from "./logic/renders";

export default function BarraAccionesGrid(
    funcionesOpciones?: {
        onAgregarRegistro?: Function,
        onRefrescarGrid?: Function,
        onProbarSerial?: Function,
        onCambiarConfiguracion?: Function,
        onExportarDatos?: Function
    }
) {
    return (
        <ButtonGroup size="sm">
            {renderizarAgregarRegistro(
                funcionesOpciones.onAgregarRegistro
            )}

            {renderizarRefrescarGrid(
                funcionesOpciones.onRefrescarGrid
            )}

            {renderizarExportarDatos(
                funcionesOpciones.onExportarDatos
            )}

            {renderizarProbarSerial(
                funcionesOpciones.onProbarSerial
            )}

            {renderizarOpciones(
                funcionesOpciones.onCambiarConfiguracion
            )}
        </ButtonGroup>
    );
};