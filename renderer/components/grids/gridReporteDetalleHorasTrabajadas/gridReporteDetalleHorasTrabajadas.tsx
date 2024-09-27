'use client'

// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Card, Row, Col, Container
} from 'reactstrap';

// Interfaz de datos pasados como querry.
import {
    ParsedUrlQuery
} from "querystring";

// DataTest
import {
    contenidoSubNavegacion
} from './logic/dataTest';

// Componentes propios.
import TrackerDatos from '../../graficos/trackerDatos';
import SubNavegacion from '../../navegacion/subNavegacion';
import IndicadorCargaSpinner from '../../cargas/indicadorCargaSpinner';
import CardRegistroEmpleado from '../../cards/cardsRegistros/cardRegistroEmpleado';
import ListaReporteAccesos from '../../listas/listaReporteAccesos/listaReporteAccesos';
import ListaIntentosAccesos from '../../listas/listaIntentosAccesos/listaIntentosAccesos';
import GridParaReporteDetalleHorasTrabajadas from '../gridParaReporteDetalleHorasTrabajadas';
import ListaReporteActividad from '../../listas/listaReporteActividad/listaReporteActividad';
import ListaIntentosActividad from '../../listas/listaIntentosActividad/listaIntentosActividad';
import CardDatosDetalleHorasTrabajadas from '../../cards/cardDetalleHorasTrabajadas/cardDatosGeneralesDetalleHorasTrabajadas/cardDatosDetalleHorasTrabajadas';
import CardResumenDatosDetalleHorasTrabajadas from '../../cards/cardDetalleHorasTrabajadas/cardResumenDatosDetalleHorasTrabajadas/cardResumenDatosDetalleHorasTrabajadas';
import CardReportesChicoDetalleHorasTrabajadas from '../../cards/cardDetalleHorasTrabajadas/cardReportesChicoDetalleHorasTrabajadas/cardReportesChicoDetalleHorasTrabajadas';

// Rutinas
import {
    formatearDatosTracker,
    onGenerarDocumento
} from './logic/rutinas';

// Funciones de tiempo.
import {
    msToTime,
    separarTiempo
} from '../../../utils/conversiones';

// Consulta de datos de la API.
import {
    ConsultaRegistroEmpleado,
    ReporteHorasTrabajadasDetalleGeneral,
    ReporteHorasTrabajadasDetalleTracker,
    ReporteHorasTrabajadasDetalleResumen,
    ReporteHorasTrabajadasDetalleChequeo,
    ReporteHorasTrabajadasDetalleRegistrosReporte
} from './logic/registros';

// Modelo de datos.
import {
    Empleado
} from '../../../utils/API/modelos/empleado';

import {
    ReporteGeneral
} from '../../../utils/API/respuestas/reporteGeneral';

import {
    Reporte
} from '../../../utils/API/modelos/reporte';

import {
    ReporteResumen
} from '../../../utils/API/respuestas/reporteResumen';

import {
    ReporteChequeoResumen
} from '../../../utils/API/respuestas/reporteChequeoResumen';

export default function GridReporteDetalleHorasTrabajadas(
    props: {
        datosReporte: ParsedUrlQuery
    }
) {
    // Hooks de los filtros de datos.
    const [
        idEmpleado,
        setIdEmpleado
    ] = React.useState(props.datosReporte.id as string);

    const [
        diaSemana,
        setDiaSemana
    ] = React.useState(1);

    const [
        semanaReporte,
        setSemanaReporte
    ] = React.useState(props.datosReporte.semanaReporte as string);

    // Hooks de los registros de datos de la pagina.
    const [
        registroEmpleado,
        setRegistroEmpleado
    ] = React.useState({} as Empleado);

    const [
        reporteGeneral,
        setReporteGeneral
    ] = React.useState({} as ReporteGeneral);

    const [
        reporteTracker,
        setReporteTracker
    ] = React.useState([] as Reporte[]);

    const [
        reporteResumenChequeo,
        setReporteResumenChequeo
    ] = React.useState({} as ReporteChequeoResumen);

    const [
        reporteResumenDescanso,
        setReporteResumenDescanso
    ] = React.useState({} as ReporteChequeoResumen);

    const [
        reporteResumen,
        setReporteResumen
    ] = React.useState({} as ReporteResumen);

    const [
        listaIDZonas,
        setListaIDZonas
    ] = React.useState([] as number []);

    const [
        listaIDDispositivos,
        setListaIDDispositivos
    ] = React.useState([] as number []);

    // Hooks para refrescar la pagina.
    const [
        refresh,
        setRefresh
    ] = React.useState(false);

    // Hooks que indica si los datos de la pagina estan en carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(true);

    // Refrescamos la pagina y su contenido, consulta los datos de la
    // base de datos.
    React.useEffect(() => {
        console.log('refresh MAIN');

        // Consultamos el registor del empleado.
        ConsultaRegistroEmpleado(
            setRegistroEmpleado,
            setEnCarga,
            {
                id: idEmpleado,
            },
            () => {}
        );

        // Realizamos la consulta del reporte general.
        ReporteHorasTrabajadasDetalleGeneral(
            setReporteGeneral,
            setEnCarga,
            {
                idEmpleadoVinculado: idEmpleado,
                semanaReporte: semanaReporte
            },
            () => {}
        );
    }, [
    ]);

    // Refrescamos los compoentes y su contenido que dependen del dia
    // del reporte.
    React.useEffect(() => {
        console.log('refresh COMPONENTES');

        // Consultamos el reporte para poblar el tracker.
        ReporteHorasTrabajadasDetalleTracker(
            setReporteTracker,
            setEnCarga,
            {
                idEmpleadoVinculado: idEmpleado,
                semanaReporte: semanaReporte,
                dia: diaSemana
            }
        );

        // Consultamos el reporte para poblar el tracker.
        ReporteHorasTrabajadasDetalleChequeo(
            setReporteResumenChequeo,
            setReporteResumenDescanso,
            setEnCarga,
            {
                idEmpleadoVinculado: idEmpleado,
                semanaReporte: semanaReporte,
                dia: diaSemana
            }
        );

        // Consultamos el reporte para poblar el tracker.
        ReporteHorasTrabajadasDetalleResumen(
            setReporteResumen,
            setEnCarga,
            {
                idEmpleadoVinculado: idEmpleado,
                semanaReporte: semanaReporte,
                dia: diaSemana
            }
        );

        // Consultamos las zonas y dispositivos que cuentan con reportes
        // del empleado.
        ReporteHorasTrabajadasDetalleRegistrosReporte(
            setListaIDZonas,
            setListaIDDispositivos,
            setEnCarga,
            {
                idEmpleadoVinculado: idEmpleado,
                semanaReporte: semanaReporte,
                dia: diaSemana
            }
        );
    }, [
        refresh,
        diaSemana
    ]);

    // Rutinas.
    const seleccionarColorRegistroChequeo = (tipoReporte: number) => {
        return 'success';
    };

    const seleccionarColorRegistroDescanso = (tipoReporte: number) => {
        return 'success';
    };

    return(
        <GridParaReporteDetalleHorasTrabajadas>
            {/* Datos de cabecera. */}
            <Row>
                {/* Imagen del empelado. */}
                <Col md={12} lg={3}>
                    <CardRegistroEmpleado
                        registro={registroEmpleado}
                    />
                </Col>

                {/* Datos generales. */}
                <Col md={12} lg={9}>
                    <CardDatosDetalleHorasTrabajadas
                        datos={reporteGeneral}
                        semanaReporte={semanaReporte}
                        href={'/home/reportes/horasTrabajadas'}
                        funcionesOpciones={{
                            onGoBack: () => {},
                            onRefresh: () => {
                                setRefresh(!refresh);
                            },
                            onGenerarDocumento: () => {
                                onGenerarDocumento(
                                    idEmpleado,
                                    semanaReporte,
                                    "portrait",
                                    "pt",
                                    "letter"
                                );
                            }
                        }}
                    />
                </Col>
            </Row>

            {/* Barra de navegación. */}
            <Row>
                <Col sm={12}>
                    <Card color='dark' style={{
                        marginBottom: '10px'
                    }}>
                        <SubNavegacion
                            paginas={contenidoSubNavegacion}
                            indexPaginaActual={diaSemana}
                            setIndexPaginaActual={(nuevoDia) => {
                                setDiaSemana(nuevoDia);
                            }}
                        />
                    </Card>
                </Col>
            </Row>

            {enCarga? <IndicadorCargaSpinner/> : <>
                {/* Tracker de reportes. */}
                <Row>
                    <Col sm={12}>
                        <Card color='dark' style={{
                            marginBottom: '10px',
                            padding: '10px'
                        }}>
                            <TrackerDatos
                                registros={reporteTracker}
                                formaterDatosTracker={formatearDatosTracker}
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Registros de reportes. */}
                <Row>
                    {/* Resumen de registros de reportes. */}
                    <Col md={12} lg={4}>
                        <Row>
                            <Col>
                                <CardReportesChicoDetalleHorasTrabajadas
                                    titulo="Chequeo"
                                    seleccionarColorBadge={
                                        seleccionarColorRegistroChequeo
                                    }
                                    datos={
                                        reporteResumenChequeo
                                    }
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <CardReportesChicoDetalleHorasTrabajadas
                                    titulo="Descanso"
                                    seleccionarColorBadge={
                                        seleccionarColorRegistroDescanso
                                    }
                                    datos={
                                        reporteResumenDescanso
                                    }
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <CardResumenDatosDetalleHorasTrabajadas
                                    datos={reporteResumen}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <ListaIntentosAccesos
                                    querry={{
                                        idEmpleadoVinculado: idEmpleado,
                                        semanaReporte: semanaReporte,
                                        dia: diaSemana
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <ListaIntentosActividad
                                    querry={{
                                        idEmpleadoVinculado: idEmpleado,
                                        semanaReporte: semanaReporte,
                                        dia: diaSemana
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>

                    {/* Regristros de reportes de zonas y maquinas */}
                    <Col md={12} lg={8}>
                        <Row>
                            {listaIDZonas? listaIDZonas.map((idZona: number) => {
                                return(
                                    <Col md={12} lg={6}>
                                        <ListaReporteAccesos
                                            querry={{
                                                idEmpleadoVinculado: idEmpleado,
                                                idZonaVinculada: idZona.toString(),
                                                semanaReporte: semanaReporte,
                                                dia: diaSemana
                                            }}
                                        />
                                    </Col>
                                );
                            }) : <></>}

                            {listaIDDispositivos? listaIDDispositivos.map((idDispositivo: number) => {
                                return(
                                    <Col md={12} lg={6}>
                                        <ListaReporteActividad
                                            querry={{
                                                idEmpleadoVinculado: idEmpleado,
                                                idDispositivoVinculado: idDispositivo.toString(),
                                                semanaReporte: semanaReporte,
                                                dia: diaSemana
                                            }}
                                        />
                                    </Col>
                                );
                            }) : <></>}
                        </Row>
                    </Col>
                </Row>
            </>}
        </GridParaReporteDetalleHorasTrabajadas>
    );
};