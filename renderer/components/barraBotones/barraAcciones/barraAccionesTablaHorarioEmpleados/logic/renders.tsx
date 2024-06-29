// Componentes de reactstrap.
import {
    Button
} from 'reactstrap';

// Iconos usados.
import {
    mdiSyncCircle,
    mdiCalendarEdit,
    mdiCog,
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

// Renderiza el boton para modificar el registro.
const renderizarModificarRegistro = (
    onModificarRegistro?: Function
) => {
    if(typeof onModificarRegistro == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            outline
            color='warning'
            onClick={() => {
                onModificarRegistro();
            }}
        >
            <Icon path={mdiCalendarEdit} size={1} />
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
    renderizarModificarRegistro,
    renderizarOpciones
};