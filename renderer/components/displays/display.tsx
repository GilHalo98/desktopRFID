import React from 'react';

import {
    Table
} from 'reactstrap';
import { formatearDatos } from '../../utils/formatDataTabla';

export default function Display(
    props: {
        registro: object,
        propiedades: any[],
        campos: string[]
    }
) {
    const registroFormateado = formatearDatos(
        [props.registro],
        props.propiedades,
        ['id']
    )[0];

    return(
        <Table hover dark responsive>
            <tbody>
                {props.campos.map((nombreCampo: string, index: number) => {
                    return(
                        <tr>
                            <th>{nombreCampo}</th>
                            <td>{registroFormateado.data[index]}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};