// Componentes de reactstrap.
import {
    Button
} from 'reactstrap';

// Iconos usados.
import {
    mdiCog,
    mdiSyncCircle,
    mdiFileExport
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

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
            <Icon path={mdiSyncCircle} size={1} />
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
            <Icon path={mdiFileExport} size={1} />
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
    renderizarRefrescarTabla,
    renderizarExportarDatos,
    renderizarOpciones
};