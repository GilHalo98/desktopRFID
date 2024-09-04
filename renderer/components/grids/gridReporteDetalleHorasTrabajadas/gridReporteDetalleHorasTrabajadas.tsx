'use client'

// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Card, Row, Col, Container
} from 'reactstrap';

// Modelo de datos.
import {
    Empleado
} from '../../../utils/API/modelos/empleado';

// DataTest
import {
    contenidoSubNavegacion,
    datosGenerales,
    datosIntentosAccesos,
    datosTracker,
    fechaPrueba,
    registroEmpleado,
    reporteChequeos,
    reporteDescansos,
    reporteResumen
} from './logic/dataTest';

// Componentes propios.
import TrackerDatos from '../../graficos/trackerDatos';
import SubNavegacion from '../../navegacion/subNavegacion';
import CardRegistroEmpleado from '../../cards/cardsRegistros/cardRegistroEmpleado';
import GridParaReporteDetalleHorasTrabajadas from '../gridParaReporteDetalleHorasTrabajadas';
import CardDatosDetalleHorasTrabajadas from '../../cards/cardDetalleHorasTrabajadas/cardDatosGeneralesDetalleHorasTrabajadas/cardDatosDetalleHorasTrabajadas';
import CardResumenDatosDetalleHorasTrabajadas from '../../cards/cardDetalleHorasTrabajadas/cardResumenDatosDetalleHorasTrabajadas/cardResumenDatosDetalleHorasTrabajadas';
import CardReportesChicoDetalleHorasTrabajadas from '../../cards/cardDetalleHorasTrabajadas/cardReportesChicoDetalleHorasTrabajadas/cardReportesChicoDetalleHorasTrabajadas';

// Rutinas
import { formatearDatosTracker } from './logic/rutinas';
import ListaReportes from '../../listas/listaReportes/listaReportes';


export default function GridReporteDetalleHorasTrabajadas(
    props: {}
) {
    // Hooks para refrescar la pagina.
    const [
        refresh,
        setRefresh
    ] = React.useState(false);

    // Hooks que indica si los datos de la pagina estan en carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Hooks que indica la sub-pagina en la que se encuentra el reporte.
    const [
        indexPaginaActual,
        setIndexPaginaActual
    ] = React.useState(1);

    // React useEffect para refrescar la pagina.
    React.useEffect(() => {
        console.log('refresh');
    }, [refresh])

    // Rutinas.
    const seleccionarColorRegistroChequeo = (tipoReporte: number) => {
        return 'success';
    };

    const seleccionarColorRegistroDescanso = (tipoReporte: number) => {
        return 'success';
    };

    return(
        <GridParaReporteDetalleHorasTrabajadas enCarga={enCarga}>
            {/* Datos de cabecera. */}
            <Row>
                {/* Imagen del empelado. */}
                <Col md={12} lg={4}>
                    <CardRegistroEmpleado
                        registro={registroEmpleado}
                        indexRegistro={0}
                    />
                </Col>

                {/* Datos generales. */}
                <Col md={12} lg={8}>
                    <CardDatosDetalleHorasTrabajadas
                        datos={datosGenerales}
                        fechaReporteA={fechaPrueba.toLocaleDateString()}
                        fechaReporteB={fechaPrueba.toLocaleDateString()}
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
                            indexPaginaActual={indexPaginaActual}
                            setIndexPaginaActual={setIndexPaginaActual}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Tracker de reportes. */}
            <Row>
                <Col sm={12}>
                    <Card color='dark' style={{
                        marginBottom: '10px',
                        padding: '10px'
                    }}>
                        <TrackerDatos
                            registros={datosTracker}
                            formaterDatosTracker={formatearDatosTracker}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Registros de reportes. */}
            <Row>
                {/* Resumen de registros de reportes. */}
                <Col md={12} lg={3}>
                    <Row>
                        <Col>
                            <CardReportesChicoDetalleHorasTrabajadas
                                titulo="Chequeo"
                                seleccionarColorBadge={
                                    seleccionarColorRegistroChequeo
                                }
                                datos={
                                    reporteChequeos
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
                                    reporteDescansos
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
                            <ListaReportes datos={datosIntentosAccesos}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Card color='dark'>
                                a
                            </Card>
                        </Col>
                    </Row>
                </Col>

                {/* Regristros de reportes de zonas y maquinas */}
                <Col md={12} lg={9}>
                    <Row>
                        <Col>
                            <Card color='dark'>
                                a
                            </Card>
                        </Col>

                        <Col>
                            <Card color='dark'>
                                a
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </GridParaReporteDetalleHorasTrabajadas>
    );
};