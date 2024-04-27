'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Button, ButtonGroup
} from 'reactstrap';

// Iconos usados.
import {
    mdiCog,
    mdiDatabaseSync,
    mdiDatabasePlus,
    mdiDatabaseExport
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

export default function BarraAccionesTabla(
    props: {
        onAgregarRegistro?: Function,
        onRefrescarTabla?: Function,
        onExportarDatos?: Function,
        onOpciones?: Function,
    }
) {
    // Renderiza el boton de agregar registros.
    const renderizarAgregarRegistro = () => {
        if(typeof props.onAgregarRegistro == 'undefined') {
            return null;
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='success'
                onClick={() => {
                    props.onAgregarRegistro();
                }}
            >
                <Icon path={mdiDatabasePlus} size={1} />
            </Button>
        );
    };

    // Renderiza el boton de refrescar tabla.
    const renderizarRefrescarTabla = () => {
        if(typeof props.onRefrescarTabla == 'undefined') {
            return null;
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='primary'
                onClick={() => {
                    props.onRefrescarTabla();
                }}
            >
                <Icon path={mdiDatabaseSync} size={1} />
            </Button>
        );
    };

    // Renderiza el boton de exportar datos.
    const renderizarExportarDatos = () => {
        if(typeof props.onExportarDatos == 'undefined') {
            return null;
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='primary'
                onClick={() => {
                    props.onExportarDatos();
                }}
            >
                <Icon path={mdiDatabaseExport} size={1} />
            </Button>
        );
    };

    // Renderiza el boton de opciones
    const renderizarOpciones = () => {
        if(typeof props.onOpciones == 'undefined') {
            return null;
        }

        return(
            <Button
                className='botonIcono'
                outline
                color='warning'
                onClick={() => {
                    props.onOpciones();
                }}
            >
                <Icon path={mdiCog} size={1} />
            </Button>
        );
    };

    return (
        <ButtonGroup size="sm">
            {renderizarAgregarRegistro()}
            {renderizarRefrescarTabla()}
            {renderizarExportarDatos()}
            {renderizarOpciones()}
        </ButtonGroup>
    );
};