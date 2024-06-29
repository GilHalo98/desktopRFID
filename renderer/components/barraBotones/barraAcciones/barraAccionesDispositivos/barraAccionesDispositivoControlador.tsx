'use client'

// React.
import React from 'react';

// Reacstrap.
import { Button, ButtonGroup } from 'reactstrap';

// Iconos de los botones.
import {
    mdiMapMarkerRadius,
    mdiPause,
    mdiPlay
} from '@mdi/js';

// Componente para mostrar el icono.
import Icon from '@mdi/react';

export default function BarraAccionesDispositivoControlador(
    props: {
        idDispositivo: number | string
    }
) {
    return(
        <ButtonGroup size="sm">
            <Button
                className='botonIcono'
                outline
                color='warning'
                onClick={() => {
                    window.ipc.send('emitir_evento_socket', {
                        evento: 'forzar_accion',
                        parametros: {
                            'accion': 'toggle_identificarse',
                            'idDispositivo': props.idDispositivo
                        }
                    });
                }}
            >
                <Icon path={mdiMapMarkerRadius} size={1}/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='success'
                onClick={() => {
                    window.ipc.send('emitir_evento_socket', {
                        evento: 'forzar_accion',
                        parametros: {
                            'accion': 'activar',
                            'idDispositivo': props.idDispositivo
                        }
                    });
                }}
            >
                <Icon path={mdiPlay} size={1}/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='danger'
                onClick={() => {
                    window.ipc.send('emitir_evento_socket', {
                        evento: 'forzar_accion',
                        parametros: {
                            'accion': 'desactivar',
                            'idDispositivo': props.idDispositivo
                        }
                    });
                }}
            >
                <Icon path={mdiPause} size={1}/>
            </Button>
        </ButtonGroup>
    );
};