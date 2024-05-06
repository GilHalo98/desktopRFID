/**
 * TODO: pasar los renders al logic de renders, agregar los renders que faltan
 */

'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button, ButtonGroup
} from 'reactstrap';

// Iconos usados.
import {
    mdiCog,
    mdiDatabaseSync,
    mdiDatabasePlus,
    mdiDatabaseExport
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

export default function BarraAccionesGrid(
    funcionesOpciones?: {
        onAgregarRegistro?: Function,
        onRefrescarGrid?: Function,
        onProbarSerial?: Function,
        onCambiarConfiguracion?: Function
    }
) {

    // Renderiza el boton de agrear registro.
    function renderizarAddRegistro() {
        if(!props.onAddRegistro) {
            return(<></>);
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='warning'
                onClick={() => {
                    props.onAddRegistro();
                }}
            >
                <BsDatabaseFillAdd/>
            </Button>
        );
    };

    // Renderiza el boton de opciones de la tabla.
    function renderizarOpciones() {
        if(!props.onOpciones) {
            return(<></>);
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='warning'
                onClick={() => {
                    props.onOpciones();
                }}
            >
                <FaGear/>
            </Button>
        );
    };

    return (
        <ButtonGroup size="sm">
            {renderizarAddRegistro()}

            {renderizarOpciones()}
        </ButtonGroup>
    );
};