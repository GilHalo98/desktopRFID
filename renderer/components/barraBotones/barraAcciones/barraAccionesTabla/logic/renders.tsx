// Componentes de reactstrap.
import {
    Button
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

// Renderiza el boton de agregar registros.
const renderizarAgregarRegistro = (
    onAgregarRegistro?: Function
) => {
    if(typeof onAgregarRegistro == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            outline
            color='success'
            onClick={() => {
                onAgregarRegistro();
            }}
        >
            <Icon path={mdiDatabasePlus} size={1} />
        </Button>
    );
};

// Renderiza el boton de refrescar tabla.
const renderizarRefrescarTabla = (
    onRefrescarTabla?: Function
) => {
    if(typeof onRefrescarTabla == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            outline
            color='primary'
            onClick={() => {
                onRefrescarTabla();
            }}
        >
            <Icon path={mdiDatabaseSync} size={1} />
        </Button>
    );
};

// Renderiza el boton de exportar datos.
const renderizarExportarDatos = (
    onExportarDatos?: Function
) => {
    if(typeof onExportarDatos == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            outline
            color='primary'
            onClick={() => {
                onExportarDatos();
            }}
        >
            <Icon path={mdiDatabaseExport} size={1} />
        </Button>
    );
};

// Renderiza el boton de opciones
const renderizarOpciones = (
    onOpciones?: Function
) => {
    if(typeof onOpciones == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            outline
            color='warning'
            onClick={() => {
                onOpciones();
            }}
        >
            <Icon path={mdiCog} size={1} />
        </Button>
    );
};

export {
    renderizarAgregarRegistro,
    renderizarRefrescarTabla,
    renderizarExportarDatos,
    renderizarOpciones
};