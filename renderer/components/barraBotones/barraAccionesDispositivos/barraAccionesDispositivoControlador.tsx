'use client'

// React.
import React from 'react';

// Reacstrap.
import { Button, ButtonGroup } from 'reactstrap';

// Iconos de los botones.
import { IoMdLocate } from "react-icons/io";
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';


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
                            'accion': 'activar',
                            'idDispositivo': props.idDispositivo
                        }
                    });
                }}
            >
                <FaPlayCircle/>
            </Button>

            <Button
                className='botonIcono'
                outline
                color='warning'
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
                <FaPauseCircle/>
            </Button>
        </ButtonGroup>
    );
};