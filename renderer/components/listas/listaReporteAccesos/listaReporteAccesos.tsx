'use client'

// Funcionalidad de React.
import React from "react"

// Componentes de reactstrap-
import {
    List, Table, Badge,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';

// Componentes propios.
import Paginacion from "../../paginacion/paginacion";
import IndicadorCargaSpinner from "../../cargas/indicadorCargaSpinner";

// Request.
import {
    ConsultarNombreZona,
    ReporteHorasTrabajadasDetalleAccesosZona
} from "./logic/registros";

// Funcionalidad propia
import {
    fechaStrATiempo,
    msToTime,
    separarTiempo,
    a12HorasTiempo
} from "../../../utils/conversiones";

// Modelo de datos.
import {
    ReporteAccesosDetalle
} from "../../../utils/API/respuestas/reporteAccesosDetalle";

import {
    Zona
} from "../../../utils/API/modelos/zona";

export default function ListaReporteAccesos(
    props: {
        querry: {
            idEmpleadoVinculado: string
            idZonaVinculada: string
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
    ] = React.useState([] as ReporteAccesosDetalle []);

    const [
        registroZona,
        setRegistroZona
    ] = React.useState({} as Zona);

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

        ConsultarNombreZona(
            setRegistroZona,
            setEnCarga,
            {
                limit: 1,
                offset: 0,
                id: parseInt(props.querry.idZonaVinculada)
            },
            () => {
                ReporteHorasTrabajadasDetalleAccesosZona(
                    setRegistros,
                    setTotalPaginas,
                    setEnCarga,
                    {
                        limit: registrosPorPagina,
                        offset: offset,
                        idEmpleadoVinculado: props.querry.idEmpleadoVinculado,
                        idZonaVinculada: props.querry.idZonaVinculada,
                        semanaReporte: props.querry.semanaReporte,
                        dia: props.querry.dia
                    }
                );
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
                {registroZona.nombreZona?
                        registroZona.nombreZona 
                        : 'Tabla de accesos a zona'
                }
            </CardHeader>

            <CardBody>
                {enCarga?
                    <>
                        <IndicadorCargaSpinner/>
                    </> : <>
                        <Table dark responsive>
                            <thead style={{
                                textAlign: 'center'
                            }}>
                                <th>
                                    Entrada
                                </th>

                                <th>
                                    Salida
                                </th>

                                <th>
                                    Tiempo Total
                                </th>
                            </thead>

                            <tbody style={{
                                textAlign: 'center'
                            }}>
                                {registros.map((registro: ReporteAccesosDetalle) => {
                                    return(
                                        <tr>
                                            <td>
                                                {a12HorasTiempo(fechaStrATiempo(
                                                    registro.entrada
                                                ))}
                                            </td>

                                            <td>
                                                {a12HorasTiempo(fechaStrATiempo(
                                                    registro.salida
                                                ))}
                                            </td>

                                            <td>
                                                {separarTiempo(msToTime(registro.tiempoEnZona))}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>

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