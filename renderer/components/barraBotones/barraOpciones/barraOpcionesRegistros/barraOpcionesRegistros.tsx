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
    mdiDatabaseRemove,
    mdiEye
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

export default function BarraOpcionesRegistros(
    props: {
        idRegistro: number,
        indexRegistro: number,
        onEliminar?: Function,
        onModificar?: Function,
        onVisualizarDetalles?: Function
    }
) {
    const renderBotonModificar = () => {
        if(typeof props.onModificar != 'undefined') {
            return (
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
            );
        }

        return "";
    };

    const renderBotonEliminar = () => {
        if(typeof props.onModificar != 'undefined') {
            return (
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
            );
        }

        return "";
    };

    const renderBotonVisualizar = () => {
        if(typeof props.onVisualizarDetalles != 'undefined') {
            return (
                <Button
                    className='botonIcono'
                    color='info'
                    outline
                    onClick={() => {
                        props.onVisualizarDetalles(
                            props.idRegistro,
                            props.indexRegistro
                        );
                    }}
                >
                    <Icon path={mdiEye} size={1} />
                </Button>
            );
        }

        return "";
    };

    return (
        <ButtonGroup size="sm">
            {renderBotonModificar()}
            {renderBotonEliminar()}
            {renderBotonVisualizar()}
        </ButtonGroup>
    );
};