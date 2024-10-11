'use client'

// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Table, Badge,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';

// Componentes propios
import IndicadorCargaSpinner from '../../../cargas/indicadorCargaSpinner';

// Querrys de la api.
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
    // Si no existen datos, se envia una pantalla de carga.
    if(!props.datos) {
        return(
            <Card className="text-white" color="dark" style={{
                marginBottom: '10px'
            }}>
                <CardHeader>
                    {props.titulo}
                </CardHeader>
    
                <CardBody>
                    <IndicadorCargaSpinner/>
                </CardBody>
            </Card>
        );
    }

    // Desempaquetamos los datos.
    const descripcionA = props.datos.entrada?
        props.datos.entrada.reporte.descripcionReporte : '';

    const descripcionB = props.datos.salida?
        props.datos.salida.reporte.descripcionReporte : '';

    const estatusA = props.datos.entrada?
        props.datos.entrada.reporte.idTipoReporteVinculado : '';

    const estatusB = props.datos.salida?
        props.datos.salida.reporte.idTipoReporteVinculado : '';

    const fechaReporteA = props.datos.entrada?
        a12HorasTiempo(fechaStrATiempo(
            props.datos.entrada.fechaRegistroReporteChequeo
        )) : '';

    const fechaReporteB = props.datos.salida?
        a12HorasTiempo(fechaStrATiempo(
            props.datos.salida.fechaRegistroReporteChequeo
        )) : '';

    const tiempoLaboralTotal: string = !props.datos.tiempoLaboralTotal?
        '' : separarTiempo(msToTime(
            props.datos.tiempoLaboralTotal
        ));

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
                                Tiempo laboral total
                            </td>

                            <td>
                                {tiempoLaboralTotal}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                {descripcionA}
                            </td>

                            <td>
                                {fechaReporteA}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                {descripcionB}
                            </td>

                            <td>
                                {fechaReporteB}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};