// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button
} from 'reactstrap';

// Iconos usados.
import {
    mdiAccountCard,
    mdiAccountEye,
    mdiAccountEdit
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

const renderizarGuardarDatosTarjeta = (
    onGuardarDatosTarjeta?: Function,
    idRegistro?: number,
    indexRegistro?: number,
) => {
    if(typeof onGuardarDatosTarjeta == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            color='primary'
            outline
            onClick={() => {
                onGuardarDatosTarjeta(idRegistro, indexRegistro);
            }}
        >
            <Icon path={mdiAccountCard} size={1} />
        </Button>
    )
};

const renderizarVisualizarRegistro = (
    onVisualizarRegistro?: Function,
    idRegistro?: number,
    indexRegistro?: number,
) => {
    if(typeof onVisualizarRegistro == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            color='info'
            outline
            onClick={() => {
                onVisualizarRegistro(idRegistro, indexRegistro);
            }}
        >
            <Icon path={mdiAccountEye} size={1} />
        </Button>
    )
};

const renderizarModificarRegistro = (
    onModificarRegistro?: Function,
    idRegistro?: number,
    indexRegistro?: number,
) => {
    if(typeof onModificarRegistro == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            color='warning'
            outline
            onClick={() => {
                onModificarRegistro(idRegistro, indexRegistro);
            }}
        >
            <Icon path={mdiAccountEdit} size={1} />
        </Button>
    )
};

export {
    renderizarGuardarDatosTarjeta,
    renderizarVisualizarRegistro,
    renderizarModificarRegistro
};