'use client'

// React.
import React from 'react';

// Reacstrap.
import { Button, ButtonGroup } from 'reactstrap';

// Iconos de los botones.
import {
    mdiMapMarkerRadius
} from '@mdi/js';

// Componente para mostrar el icono.
import Icon from '@mdi/react';

export default function BarraAccionesDispositivoLector(
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
        </ButtonGroup>
    );
};