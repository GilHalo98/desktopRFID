'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card,
    Container, Row, Col, CardHeader
} from 'reactstrap';

// Componentes propios.
import GridParaDashboardDeActividadDeMaquina from '../gridParaDashboardDeActividadDeMaquina';
import CardRegistroEmpleado from '../../cards/cardsRegistros/cardRegistroEmpleado';
import DisplayOperadoresMaquina from '../../displays/displayOperadoresMaquina';
import GraficoActividadMaquina from '../../graficos/graficoActividadMaquina';

// Funcionalidad.
import {
    consultarRegistrosDispositivos,
    consultarReporteActividadMaquina,
    consultarReporteOperadoresMaquina,
} from './logic/registros';

// Modelo de datos.
import {
    ReporteOperadoresMaquina
} from '../../../utils/API/respuestas/reporteOperadoresMaquina';

export default function GridDashboardActividadMaquina(
    props: {}
) {
    // Hook que indcia si la pagina esta cargando contenido.
    const [
        enCarga, setEnCarga
    ] = React.useState(true);

    // Hooks de registro de operaciones.
    const [
        indexRegistro,
        setIndexRegistro
    ] = React.useState(0);

    const [
        registroOperaciones,
        setRegistroOperaciones
    ] = React.useState(null);

    const [
        limiteOperadores,
        setLimiteOperadores
    ] = React.useState(5);

    // Hooks de los datos del filtro.
    const [
        listaRegistrosDispositivos,
        setListaRegistrosDispositivos
    ] = React.useState(null);

    // Hooks de los datos de la vista.
    const [ 
        reporteActividadMaquina,
        setReporteActivdadMaquina
    ] = React.useState(null);

    const [ 
        reporteOperadoresMaquina,
        setReporteOperadoresMaquina
    ] = React.useState(null);

    // Consulta de datos para la vista.
    React.useEffect(() => {
        consultarRegistrosDispositivos(
            setListaRegistrosDispositivos,
            setEnCarga,
            () => {
            }
        );
    }, [indexRegistro]);

    React.useEffect(() => {
        if(listaRegistrosDispositivos) {
            consultarReporteActividadMaquina(
                setReporteActivdadMaquina,
                setEnCarga,
                {
                    id: listaRegistrosDispositivos[
                        indexRegistro
                    ].id
                },
                () => {
                    consultarReporteOperadoresMaquina(
                        setReporteOperadoresMaquina,
                        setEnCarga,
                        {
                            offset: 0,
                            limit: 5,
                            id: listaRegistrosDispositivos[
                                indexRegistro
                            ].id
                        }
                    );
                }
            );
        }
    }, [
        listaRegistrosDispositivos
    ]);

    const parametrosBusqueda = {
        setIdDispositivo: () => {},
        setDescripcionDispositivo: () => {},
        setSemanaReporte: () => {}
    };

    const elementosOpciones = {
        indexRegistro: indexRegistro,
        setIndexRegistro: setIndexRegistro,
        listaRegistrosDispositivos: listaRegistrosDispositivos
    };

    if(
        enCarga
        || !listaRegistrosDispositivos
        || !reporteActividadMaquina
        || !reporteOperadoresMaquina
    ) {
        return "";
    }

    return(
        <GridParaDashboardDeActividadDeMaquina
            tituloGrid={
                'Actividad de '
                + listaRegistrosDispositivos[
                    indexRegistro
                ].descripcionDispositivo
            }
            parametrosBusqueda={parametrosBusqueda}
            elementosOpciones={elementosOpciones}
        >
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <CardRegistroEmpleado
                                    registro={
                                        reporteOperadoresMaquina[0].empleado
                                    }
                                    indexRegistro={0}
                                />
                            </Col>
                        </Row>

                        <br/>

                        <Row>
                            <Col>
                                <DisplayOperadoresMaquina
                                    registros={reporteOperadoresMaquina.map(
                                        (registro: ReporteOperadoresMaquina) => {
                                            return registro.empleado;
                                        })
                                    }
                                    limiteOperadores={limiteOperadores}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col>
                        <GraficoActividadMaquina
                            tituloGrafico={
                                'Reporte de '
                                + listaRegistrosDispositivos[
                                    indexRegistro
                                ].descripcionDispositivo
                                + ' horas activa vs inactiva'
                            }
                            reporte={reporteActividadMaquina}
                        />
                    </Col>
                </Row>
            </Container>
        </GridParaDashboardDeActividadDeMaquina>
    );
};