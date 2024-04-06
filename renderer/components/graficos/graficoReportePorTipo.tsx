'use client'

// React.
import React from 'react';

import {
    ReportesPorTipo
} from '../../utils/API/interface/dashboard';
import { funcionRefresh } from '../../utils/refresh';

// Componentes de reactstrap.
import {
    Table, Button,
    Container, Row, Col,
    Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, List,
} from 'reactstrap';

import { BarList } from '@tremor/react';

export default function GraficoReportePorTipo(
    props: any
) {
    const [reportesPorTipo, setReportesPorTipo] = React.useState([]);
    const [refresh, setRefresh] = React.useState(true);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(1);

    React.useEffect(() => {
        ReportesPorTipo(setReportesPorTipo);
    }, [refresh]);

    function formatearReporte(rawData: any) {        
        const datosFormateados = [];

        const tiposReportes = Object.keys(rawData);

        for (let i = 0; i < tiposReportes.length; i++) {
            const conteo = rawData[tiposReportes[i]];
            datosFormateados.push({
                name: tiposReportes[i],
                value: conteo
            });
        }

        return datosFormateados;
    };

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*1000);

    return(
        <Card color='dark'>
            <CardHeader className='text-white'>
                Reportes registrados por tipo
            </CardHeader>

            <CardBody>
                <BarList data={formatearReporte(reportesPorTipo)} className="mt-2" />
            </CardBody>
        </Card>
    );
};