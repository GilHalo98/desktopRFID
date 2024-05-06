'use client'

// React.
import React from 'react';

// Reacstrap.
import { Button, ButtonGroup } from 'reactstrap';

// Iconos de los botones.
import { IoMdLocate } from "react-icons/io";


export default function BarraAccionesDispositivoChecador(
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
        </ButtonGroup>
    );
};