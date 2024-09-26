'use client'

// Funcionalidad de React.
import React from "react"

// Componentes de reactstrap.
import {
    List,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';

// Componentes propios.
import Paginacion from "../../paginacion/paginacion";
import IndicadorCargaSpinner from "../../cargas/indicadorCargaSpinner";

// Request.
import {
    ReporteHorasTrabajadasDetalleIntentoActividad
} from "./logic/registros";

// Modelo de datos.
import {
    ReporteIntentoActividad
} from "../../../utils/API/respuestas/reporteIntentoActividad";

export default function ListaIntentosActividad(
    props: {
        querry: {
            idEmpleadoVinculado: string
            semanaReporte: string
            dia: number
        }
    }
) {
    // Hooks que indican si el componente esta en carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Hooks para refrescar el componente.
    const [
        refresh,
        setRefresh
    ] = React.useState(false);

    // Hooks de los datos de la lista.
    const [
        registros,
        setRegistros
    ] = React.useState([] as ReporteIntentoActividad []);

    // Hooks de los datos de la paginacion.
    const [
        totalPaginas,
        setTotalPaginas
    ] = React.useState(0);

    const [
        paginaActual,
        setPaginaActual
    ] = React.useState(1);

    const [
        offset,
        setOffset
    ] = React.useState(0);

    const [
        registrosPorPagina,
        setRegistrosPorPagina
    ] = React.useState(5);

    // Consultamos los datos del reporte.
    React.useEffect(() => {
        console.log('refresh COMPONENTE');

        ReporteHorasTrabajadasDetalleIntentoActividad(
            setRegistros,
            setTotalPaginas,
            setEnCarga,
            {
                limit: registrosPorPagina,
                offset: offset,
                idEmpleadoVinculado: props.querry.idEmpleadoVinculado,
                semanaReporte: props.querry.semanaReporte,
                dia: props.querry.dia
            }
        );
    }, [
        refresh,
        paginaActual
    ]);

    return (
        <Card className="text-white" color="dark" style={{
            marginBottom: '10px'
        }}>
            <CardHeader>
                Intentos de inicio de actividad
            </CardHeader>

            <CardBody>
                {enCarga?
                    <>
                        <IndicadorCargaSpinner/>
                    </> : <>
                        <List type="unstyled">
                            {registros.map((registro: ReporteIntentoActividad) => {
                                return <li>
                                    <Card color="warning" style={{
                                        textAlign: 'center',
                                        padding: '10px',
                                        margin: '10px'
                                    }}>
                                        {registro.reporte.descripcionReporte}
                                    </Card>
                                </li>
                            })}
                        </List>

                        <Paginacion
                            totalPaginas={totalPaginas}
                            paginaActual={paginaActual}
                            offset={offset}
                            registrosPorPagina={registrosPorPagina}
                            setPaginaActual={setPaginaActual}
                            setOffset={setOffset}
                        />
                    </>
                }
            </CardBody>
        </Card>
    );
};