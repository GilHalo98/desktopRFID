'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card,
    Container, Row, Col, CardHeader
} from 'reactstrap';

// Modelo de datos.
import {
    Empleado
} from '../../../utils/API/modelos/empleado';

import {
    DispositivoIoT
} from '../../../utils/API/modelos/dispositivoIoT';

// Componentes propios.
import GridParaReporteDeActividadDeMaquina from '../gridParaReporteDeActividadDeMaquina';
import GraficoActividadMaquina from '../../graficos/graficoActividadMaquina';
import CardRegistroEmpleado from '../../cards/cardsRegistros/cardRegistroEmpleado';
import DisplayOperadoresMaquina from '../../displays/displayOperadoresMaquina';
import ListaHistorialUsosMaquina from '../../listas/listaHistorialUsosMaquina/listaHistorialUsosMaquina';

// Funcionalidad.
import {
    consultarRegistrosDispositivos,
    consultarReporteActividadMaquina,
    consultarReporteOperadoresMaquina,
    consultarReporteUsosMaquina
} from './logic/registros';
import { ReporteOperadoresMaquina } from '../../../utils/API/respuestas/reporteOperadoresMaquina';

export default function GridReporteActividadMaquina(
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
    
    const [ 
        reporteUsosMaquina,
        setReporteUsosMaquina
    ] = React.useState(null);

    React.useEffect(() => {
        consultarRegistrosDispositivos(
            setListaRegistrosDispositivos,
            setEnCarga,
            () => {
            }
        );
    }, [indexRegistro]);

    /// React effect.
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
                        },
                        () => {
                            consultarReporteUsosMaquina(
                                setReporteUsosMaquina,
                                setEnCarga,
                                {
                                    id: listaRegistrosDispositivos[
                                        indexRegistro
                                    ].id
                                },
                            );
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
        || !reporteUsosMaquina
    ) {
        return "";
    }

    return(
        <GridParaReporteDeActividadDeMaquina
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

                <br/>

                <Row>
                    <Col>
                        <ListaHistorialUsosMaquina
                            tituloLista={
                                'Historial de usos de '
                                + listaRegistrosDispositivos[
                                    indexRegistro
                                ].descripcionDispositivo
                                + ' del DD/MM/AA al DD/MM/AA'
                            }
                            registros={reporteUsosMaquina}
                        />
                    </Col>
                </Row>
            </Container>

        </GridParaReporteDeActividadDeMaquina>
    );
};