'use client'

// React.
import React from 'react';

import {
    AccesosPorDia
} from '../../utils/API/interface/dashboard';
import { funcionRefresh } from '../../utils/refresh';

// Componentes de reactstrap.
import {
    Table, Button,
    Container, Row, Col,
    Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader, List,
} from 'reactstrap';

import { BarChart } from '@tremor/react';

export default function GraficoAccesos(
    props: any
) {
    const [reporteAccesosPorDia, setReporteAccesosPorDia] = React.useState([]);
    const [refresh, setRefresh] = React.useState(true);
    const [tiempoRefresh, setTiempoRefresh] = React.useState(1);

    React.useEffect(() => {
        AccesosPorDia(setReporteAccesosPorDia);
    }, [refresh]);

    function formatearReporte(rawData: any) {        
        const datosFormateados = [
            {
                name: "Accesos Garantizados",
                "Total de accesos": rawData.accesosGarantizados,
              },
              {
                name: "Accesos Negados",
                "Total de accesos": rawData.accesosNegados,
              },
        ];

        return datosFormateados;
    };

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*1000);

    return(
        <Card color='dark'>
            <CardHeader className='text-white'>
                Accesos registrados
            </CardHeader>

            <CardBody>
                <BarChart
                    className="mt-6"
                    data={formatearReporte(reporteAccesosPorDia)}
                    index="name"
                    categories={["Total de accesos"]}
                    colors={["blue"]}
                    yAxisWidth={48}
                />
            </CardBody>
        </Card>
    );
};