'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button, ButtonGroup
} from 'reactstrap';

// Iconos usados.
import {
    mdiMemoryArrowDown
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

export default function BarraOpcionesHorarioEmpleado(
    props: {
        idRegistro: number,
        indexRegistro: number,
        onGuardarConfiguracionDispositivo: Function
    }
) {
    return (
        <ButtonGroup size="sm">
            <Button
                className='botonIcono'
                color='primary'
                outline
                onClick={() => {
                    props.onGuardarConfiguracionDispositivo(
                        props.idRegistro,
                        props.indexRegistro
                    );
                }}
            >
                <Icon path={mdiMemoryArrowDown} size={1} />
            </Button>
        </ButtonGroup>
    );
};