import {
    Alert
} from 'reactstrap';

import React from 'react';

export default function AlertaTemporal(
    props: {
        titulo: string,
        contenido: string,
        disparar: boolean,
        tiempoOff: number
    }
) {
    const [visible, setVisible] = React.useState(false);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        setVisible(false);
    }, props.tiempoOff*1000);

    React.useEffect(() => {
        setVisible(true);
    }, [
        props.disparar
    ]);

    return(
        <Alert
            className='componenteAlerta'
            color='danger'
            isOpen={visible}
        >
            <h4 className="tituloAlerta">
                {props.titulo}
            </h4>
            <hr />
            <p className="contenidoAlerta">
                {props.contenido}
            </p>
        </Alert>
    );
};