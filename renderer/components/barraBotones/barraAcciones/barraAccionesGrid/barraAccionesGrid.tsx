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
    renderizarRefrescarGrid,
    renderizarProbarSerial,
    renderizarOpciones
} from "./logic/renders";

export default function BarraAccionesGrid(
    funcionesOpciones?: {
        onAgregarRegistro?: Function,
        onRefrescarGrid?: Function,
        onProbarSerial?: Function,
        onCambiarConfiguracion?: Function
    }
) {
    return (
        <ButtonGroup size="sm">
            {renderizarAgregarRegistro(
                funcionesOpciones.onAgregarRegistro
            )}

            {renderizarProbarSerial(
                funcionesOpciones.onProbarSerial
            )}

            {renderizarRefrescarGrid(
                funcionesOpciones.onRefrescarGrid
            )}

            {renderizarOpciones(
                funcionesOpciones.onCambiarConfiguracion
            )}
        </ButtonGroup>
    );
};