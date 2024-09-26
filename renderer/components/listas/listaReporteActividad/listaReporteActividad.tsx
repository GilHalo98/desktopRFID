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

// Request
import {
    ReporteHorasTrabajadasDetalleActividadDispositivo,
    ConsultarNombreDispositivo
} from "./logic/registros";

// Funcionalidad propia
import {
    a12HorasTiempo,
    fechaStrATiempo,
    msToTime,
    separarTiempo
} from "../../../utils/conversiones";

// Modelo de datos.
import {
    ReporteActividadDetalle
} from "../../../utils/API/respuestas/reporteActividadDetalle";

import {
    DispositivoIoT
} from "../../../utils/API/modelos/dispositivoIoT";

export default function ListaReporteActividad(
    props: {
        querry: {
            idEmpleadoVinculado: string
            idDispositivoVinculado: string
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
    ] = React.useState([] as ReporteActividadDetalle []);

    const [
        registroDispositivo,
        setRegistroDispositivo
    ] = React.useState({} as DispositivoIoT);

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

        ConsultarNombreDispositivo(
            setRegistroDispositivo,
            setEnCarga,
            {
                limit: 1,
                offset: 0,
                id: parseInt(props.querry.idDispositivoVinculado)
            },
            () => {

                ReporteHorasTrabajadasDetalleActividadDispositivo(
                    setRegistros,
                    setTotalPaginas,
                    setEnCarga,
                    {
                        limit: registrosPorPagina,
                        offset: offset,
                        idEmpleadoVinculado: props.querry.idEmpleadoVinculado,
                        idDispositivoVinculado: props.querry.idDispositivoVinculado,
                        semanaReporte: props.querry.semanaReporte,
                        dia: props.querry.dia
                    }
                );
            }
        )
    }, [
        refresh,
        paginaActual
    ]);

    return (
        <Card className="text-white" color="dark" style={{
            marginBottom: '10px'
        }}>
            <CardHeader>
                {registroDispositivo.nombreDispositivo?
                        registroDispositivo.nombreDispositivo 
                        : 'Tabla de actividades de dispositivo'
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
                                    Inicio
                                </th>

                                <th>
                                    Fin
                                </th>

                                <th>
                                    Tiempo Total
                                </th>
                            </thead>

                            <tbody style={{
                                textAlign: 'center'
                            }}>
                                {registros.map((registro: ReporteActividadDetalle) => {
                                    return(
                                        <tr>
                                            <td>
                                                {a12HorasTiempo(fechaStrATiempo(
                                                    registro.inicio
                                                ))}
                                            </td>

                                            <td>
                                                {a12HorasTiempo(fechaStrATiempo(
                                                    registro.fin
                                                ))}
                                            </td>

                                            <td>
                                                {separarTiempo(msToTime(
                                                    registro.tiempoEnActividad
                                                ))}
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