'use client'

// React.
import React from 'react';

// Reacstrap.
import { Button, ButtonGroup } from 'reactstrap';

// Iconos de los botones.
import { IoMdLocate } from "react-icons/io";
import { FaDoorClosed, FaDoorOpen, FaLock, FaLockOpen } from 'react-icons/fa';


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
                <IoMdLocate/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='warning'
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
                <FaDoorClosed/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='warning'
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
                <FaDoorOpen/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='warning'
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
                <FaLock/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='warning'
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
                <FaLockOpen/>
            </Button>

        </ButtonGroup>
    );
};