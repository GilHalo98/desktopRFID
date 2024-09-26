'use client'

// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Table, Badge,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';

import {
    ReporteChequeoResumen
} from '../../../../utils/API/respuestas/reporteChequeoResumen';

// Funcionalidad propia
import {
    a12HorasTiempo,
    fechaStrATiempo,
    msToTime,
    separarTiempo
} from '../../../../utils/conversiones';

export default function CardReportesChicoDetalleHorasTrabajadas(
    props: {
        titulo: string
        datos: ReporteChequeoResumen
        seleccionarColorBadge?: Function
    }
) {
    // Desempaquetamos los datos.
    const descripcionA = props.datos.a?
        props.datos.a.reporte.descripcionReporte : '';

    const descripcionB = props.datos.b?
        props.datos.b.reporte.descripcionReporte : '';

    const estatusA = props.datos.a?
        props.datos.a.reporte.idTipoReporteVinculado : '';

    const estatusB = props.datos.b?
        props.datos.b.reporte.idTipoReporteVinculado : '';

    const fechaReporteA = props.datos.a?
        a12HorasTiempo(fechaStrATiempo(
            props.datos.a.fechaRegistroReporteChequeo
        )) : '';

    const fechaReporteB = props.datos.b?
        a12HorasTiempo(fechaStrATiempo(
            props.datos.b.fechaRegistroReporteChequeo
        )) : '';

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
                                {descripcionA}
                            </td>

                            <td>
                                <Badge
                                    color={props.seleccionarColorBadge?
                                        props.seleccionarColorBadge(
                                            estatusA
                                        ) : ''
                                    }
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    {fechaReporteA}
                                </Badge>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                {descripcionB}
                            </td>

                            <td>
                                <Badge
                                    color={props.seleccionarColorBadge?
                                        props.seleccionarColorBadge(
                                            estatusB
                                        ) : ''
                                    }
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    {fechaReporteB}
                                </Badge>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};