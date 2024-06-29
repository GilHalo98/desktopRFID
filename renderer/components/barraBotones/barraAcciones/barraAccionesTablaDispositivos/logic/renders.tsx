// Componentes de reactstrap.
import {
    Button
} from 'reactstrap';

// Iconos usados.
import {
    mdiSyncCircle,
    mdiSerialPort,
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
    renderizarProbarSerial,
    renderizarOpciones
};