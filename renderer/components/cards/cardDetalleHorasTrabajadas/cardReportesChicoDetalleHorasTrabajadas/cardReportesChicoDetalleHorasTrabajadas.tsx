'use client'

// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Table, Badge,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';

export default function CardReportesChicoDetalleHorasTrabajadas(
    props: {
        titulo: string,
        datos: {
            a: {
                nombre: string,
                hora: string,
                estatus: number
            }
            b: {
                nombre: string,
                hora: string,
                estatus: number
            }
        }
        seleccionarColorBadge?: Function
    }
) {
    return(
        <Card className="text-white" color="dark" style={{
            marginBottom: '10px'
        }}>
            <CardHeader>
                {props.titulo}
            </CardHeader>

            <CardBody>
                <Table responsive dark>
                    <tbody>
                        <tr>
                            <td>
                                {props.datos.a.nombre}
                            </td>

                            <td>
                                <Badge
                                    color={props.seleccionarColorBadge?
                                        props.seleccionarColorBadge(
                                            props.datos.a.estatus
                                        ) : ''
                                    }
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    {props.datos.a.hora}
                                </Badge>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                {props.datos.b.nombre}
                            </td>

                            <td>
                                <Badge
                                    color={props.seleccionarColorBadge?
                                        props.seleccionarColorBadge(
                                            props.datos.b.estatus
                                        ) : ''
                                    }
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    {props.datos.b.hora}
                                </Badge>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};