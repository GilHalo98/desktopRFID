import React from 'react';

import {
    Container, Row, Col,
    Table
} from 'reactstrap';

import {
    formatearDatos
} from '../../utils/formatDataTabla';

export default function Display(
    props: {
        tituloDisplay: string,
        registro: object,
        nombresCampos: any[],
        campos: any[]
    }
) {
    const registroFormateado = formatearDatos(
        [props.registro],
        props.campos,
        ['id']
    )[0];

    return(
        <Container>
            <Row>
                <Col>
                    {props.tituloDisplay}
                </Col>
            </Row>

            <hr/>

            <Row>
                <Col>
                    <Table hover dark responsive>
                        <tbody>
                            {props.nombresCampos.map(
                                (nombreCampo: string, index: number) => {
                                    return(
                                        <tr>
                                            <th>{nombreCampo}</th>

                                            <td>{
                                                registroFormateado.data[index]
                                            }</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};
