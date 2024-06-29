'use client'

// React.
import React from 'react';

// Reacstrap.
import { Button, ButtonGroup } from 'reactstrap';

// Iconos de los botones.
import {
    mdiMapMarkerRadius,
    mdiDoorSlidingOpen,
    mdiDoorSliding,
    mdiLock,
    mdiLockOpen
} from '@mdi/js';

// Componente para mostrar el icono.
import Icon from '@mdi/react';


export default function BarraAccionesDispositivoControladorPuerta(
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
                color='info'
                onClick={() => {
                    window.ipc.send('emitir_evento_socket', {
                        evento: 'forzar_accion',
                        parametros: {
                            'accion': 'cerrar_puerta',
                            'idDispositivo': props.idDispositivo
                        }
                    });
                }}
            >
                <Icon path={mdiDoorSliding} size={1}/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='info'
                onClick={() => {
                    window.ipc.send('emitir_evento_socket', {
                        evento: 'forzar_accion',
                        parametros: {
                            'accion': 'abrir_puerta',
                            'idDispositivo': props.idDispositivo
                        }
                    });
                }}
            >
                <Icon path={mdiDoorSlidingOpen} size={1}/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='danger'
                onClick={() => {
                    window.ipc.send('emitir_evento_socket', {
                        evento: 'forzar_accion',
                        parametros: {
                            'accion': 'bloquear_puerta',
                            'idDispositivo': props.idDispositivo
                        }
                    });
                }}
            >
                <Icon path={mdiLock} size={1}/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='success'
                onClick={() => {
                    window.ipc.send('emitir_evento_socket', {
                        evento: 'forzar_accion',
                        parametros: {
                            'accion': 'desbloquear_puerta',
                            'idDispositivo': props.idDispositivo
                        }
                    });
                }}
            >
                <Icon path={mdiLockOpen} size={1}/>
            </Button>

        </ButtonGroup>
    );
};