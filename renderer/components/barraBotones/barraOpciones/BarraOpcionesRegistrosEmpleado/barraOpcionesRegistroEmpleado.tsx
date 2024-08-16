'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    ButtonGroup
} from 'reactstrap';

// Logica del componente
import {
    renderizarGuardarDatosTarjeta,
    renderizarVisualizarRegistro,
    renderizarModificarRegistro
} from './logic/renders';

// Importando modelo de datos.
import { Empleado } from '../../../../utils/API/modelos/empleado';

export default function BarraOpcionesRegistroEmpleado(
    props: {
        registro: Empleado,
        indexRegistro: number,
        onGuardarDatosTarjeta?: Function,
        onVisualizarRegistro?: Function,
        onModificarRegistro?: Function
    }
) {
    return (
        <ButtonGroup>
            {renderizarGuardarDatosTarjeta(
                props.onGuardarDatosTarjeta,
                props.registro.id,
                props.indexRegistro
            )}
            {renderizarVisualizarRegistro(
                props.onVisualizarRegistro,
                props.registro.id,
                props.indexRegistro
            )}
            {renderizarModificarRegistro(
                props.onModificarRegistro,
                props.registro.id,
                props.indexRegistro
            )}
        </ButtonGroup>
    );
};