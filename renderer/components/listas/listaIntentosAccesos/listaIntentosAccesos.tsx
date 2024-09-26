'use client'

// Funcionalidad de React.
import React from "react"

// Componentes de reactstrap-
import {
    List,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';

// Componentes propios.
import Paginacion from "../../paginacion/paginacion";
import IndicadorCargaSpinner from "../../cargas/indicadorCargaSpinner";

// Request
import {
    ReporteHorasTrabajadasDetalleIntentosAccesos
} from "./logic/registros";

// Modelo de datos.
import {
    ReporteIntentoAcceso
} from "../../../utils/API/respuestas/reporteIntentoAcceso";

export default function ListaIntentosAccesos(
    props: {
        querry: {
            idEmpleadoVinculado: string
            semanaReporte: string
            dia: number
        }
    }
) {
    // Hooks para indicar si el contenido del componente esta en carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(
        true
    );

    // Hooks para refrescar el componente.
    const [
        refresh,
        setRefresh
    ] = React.useState(false);

    // Hooks de los datos de la lista.
    const [
        registros,
        setRegistros
    ] = React.useState([] as ReporteIntentoAcceso []);

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

        ReporteHorasTrabajadasDetalleIntentosAccesos(
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
                Intentos de accesos
            </CardHeader>

            <CardBody>
                {enCarga?
                    <>
                        <IndicadorCargaSpinner/>
                    </> : <>
                        <List type="unstyled">
                            {registros.map((registro: ReporteIntentoAcceso) => {
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