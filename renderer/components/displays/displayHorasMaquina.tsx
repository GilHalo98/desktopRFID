// React.
import React from 'react';

// Componentes de Reactstrap.
import {
    Container, Row, Col,
    Table
} from 'reactstrap';

// Funcionalidad propia.
import {
    msToTime
} from '../../utils/conversiones';

export default function DisplayHorasMaquina(
    props: {
        tiempoActivo: number,
        tiempoInactivo: number
    }
) {
    return(
        <Table hover dark responsive>
            <thead>
                <tr>
                    <th colSpan={2} style={{textAlign: 'center'}}>
                        Tiempo total.
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Tiempo activo</td>
                    <td>{msToTime(props.tiempoActivo)}</td>
                </tr>

                <tr>
                    <td>Tiempo inactivo</td>
                    <td>{msToTime(props.tiempoInactivo)}</td>
                </tr>
            </tbody>
        </Table>
    );
};
