'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button, ButtonGroup, UncontrolledTooltip
} from 'reactstrap';

// Iconos usados.
import {
    mdiEye,
    mdiTableClock,
    mdiDatabaseEdit,
    mdiDatabaseRemove,
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

export default function BarraOpcionesRegistros(
    props: {
        idRegistro: number,
        indexRegistro: number,
        onEliminar?: Function,
        onModificar?: Function,
        onVisualizar?: Function,
        onVisualizarDetalles?: Function
    }
) {
    const renderBotonModificar = () => {
        if(typeof props.onModificar != 'undefined') {
            return (
                <>
                    <Button
                        id={`botonModiciar-${props.indexRegistro}`}
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

                    <UncontrolledTooltip
                        placement="bottom"
                        target={`botonModiciar-${props.indexRegistro}`}
                    >
                        Modificar registro
                    </UncontrolledTooltip>
                </>
            );
        }

        return "";
    };

    const renderBotonEliminar = () => {
        if(typeof props.onModificar != 'undefined') {
            return (
                <>
                    <Button
                        id={`botonEliminar-${props.indexRegistro}`}
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

                    <UncontrolledTooltip
                        placement="bottom"
                        target={`botonEliminar-${props.indexRegistro}`}
                    >
                        Eliminar registro
                    </UncontrolledTooltip>
                </>
            );
        }

        return "";
    };

    const renderBotonVisualizar = () => {
        if(typeof props.onVisualizar != 'undefined') {
            return (
                <>
                    <Button
                        id={`botonVisualizar-${props.indexRegistro}`}
                        className='botonIcono'
                        color='info'
                        outline
                        onClick={() => {
                            props.onVisualizar(
                                props.idRegistro,
                                props.indexRegistro
                            );
                        }}
                    >
                        <Icon path={mdiTableClock} size={1} />
                    </Button>

                    <UncontrolledTooltip
                        placement="bottom"
                        target={`botonVisualizar-${props.indexRegistro}`}
                    >
                        Visualizar registro
                    </UncontrolledTooltip>
                </>
            );
        }

        return "";
    };

    const renderBotonVisualizarDetalle = () => {
        if(typeof props.onVisualizarDetalles != 'undefined') {
            return (
                <>
                    <Button
                        id={`botonDetalle-${props.indexRegistro}`}
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

                    <UncontrolledTooltip
                        placement="bottom"
                        target={`botonDetalle-${props.indexRegistro}`}
                    >
                        Visualizar detalle del registro
                    </UncontrolledTooltip>
                </>
            );
        }

        return "";
    };

    return (
        <ButtonGroup size="sm">
            {renderBotonModificar()}
            {renderBotonEliminar()}
            {renderBotonVisualizar()}
            {renderBotonVisualizarDetalle()}
        </ButtonGroup>
    );
};