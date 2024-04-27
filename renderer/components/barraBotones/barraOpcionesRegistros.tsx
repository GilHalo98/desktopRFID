'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button, ButtonGroup
} from 'reactstrap';

// Iconos usados.
import {
    mdiDatabaseEdit,
    mdiDatabaseRemove
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

export default function BarraOpcionesRegistros(
    props: {
        idRegistro: number,
        indexRegistro: number,
        onEliminar: Function,
        onModificar: Function
    }
) {
    return (
        <ButtonGroup size="sm">
            <Button
                className='botonIcono'
                color='warning'
                outline
                onClick={() => {
                    props.onModificar(
                        props.idRegistro,
                        props.indexRegistro
                    );
                }}
            >
                <Icon path={mdiDatabaseEdit} size={1} />
            </Button>

            <Button
                className='botonIcono'
                color='danger'
                outline
                onClick={() => {
                    props.onEliminar(
                        props.idRegistro,
                        props.indexRegistro
                    );
                }}
            >
                <Icon path={mdiDatabaseRemove} size={1} />
            </Button>
        </ButtonGroup>
    );
};