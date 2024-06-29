// Componentes de reactstrap.
import {
    Button
} from 'reactstrap';

// Iconos usados.
import {
    mdiCog,
    mdiAccountPlus,
    mdiSerialPort,
    mdiRefreshCircle
} from '@mdi/js';

// Componente para mostrar los iconos.
import Icon from '@mdi/react';

// Renderiza el boton de opciones
const renderizarOpciones = (
    onCambiarConfiguracion?: Function
) => {
    if(typeof onCambiarConfiguracion == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            outline
            color='warning'
            onClick={() => {
                onCambiarConfiguracion();
            }}
        >
            <Icon path={mdiCog} size={1} />
        </Button>
    );
};

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
            <Icon path={mdiAccountPlus} size={1} />
        </Button>
    );
};

// Renderiza el boton de refrescar el grid.
const renderizarRefrescarGrid = (
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
            <Icon path={mdiRefreshCircle} size={1} />
        </Button>
    );
};

// Renderiza el boton para probar el serial.
const renderizarProbarSerial = (
    onProbarSerial?: Function
) => {
    if(typeof onProbarSerial == 'undefined') {
        return null;
    }

    return(
        <Button
            className='botonIcono'
            outline
            color='primary'
            onClick={() => {
                onProbarSerial();
            }}
        >
            <Icon path={mdiSerialPort} size={1} />
        </Button>
    );
};

export {
    renderizarAgregarRegistro,
    renderizarRefrescarGrid,
    renderizarProbarSerial,
    renderizarOpciones
};