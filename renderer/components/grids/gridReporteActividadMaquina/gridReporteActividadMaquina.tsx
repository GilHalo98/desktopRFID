'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Container, Row, Col
} from 'reactstrap';

// Componentes propios.
import IndicadorCargaSpinner from '../../cargas/indicadorCargaSpinner';
import GraficoActividadMaquina from '../../graficos/graficoActividadMaquina';
import DisplayOperadoresMaquina from '../../displays/displayOperadoresMaquina';
import CardRegistroEmpleado from '../../cards/cardsRegistros/cardRegistroEmpleado';
import GridParaReporteDeActividadDeMaquina from '../gridParaReporteDeActividadDeMaquina';
import AlertaFaltaRegistrosParaReporte from '../../alertas/alertaFaltaRegistrosParaReporte';
import CardHeaderHistorialActividad from '../../cards/cardHeader/cardHeaderHistorialActividad';
import ListaHistorialUsosMaquina from '../../listas/listaHistorialUsosMaquina/listaHistorialUsosMaquina';

// Funcionalidad.
import {
    consultarRegistrosDispositivos,
    consultarReporteActividadMaquina,
    consultarReporteOperadoresMaquina,
    consultarReporteUsosMaquina
} from './logic/registros';

// Modelo de datos.
import {
    ReporteOperadoresMaquina
} from '../../../utils/API/respuestas/reporteOperadoresMaquina';

export default function GridReporteActividadMaquina(
    props: {}
) {
    // Hook que indcia si la pagina esta cargando contenido.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(true);

    // Hooks para refrescar la vista.
    const [
        refresh,
        setRefresh
    ] = React.useState(false);

    // Hooks de opciones de vista.
    const [
        offsetUltimosOperadores,
        setOffsetUltimosOperadores
    ] = React.useState(0);

    const [
        limitUltimosOperadores,
        setLimitUltimosOperadores
    ] = React.useState(5);

    const [
        totalPaginasUltimosOperadores,
        setTotalPaginasUltimosOperadores
    ] = React.useState(1);

    const [
        paginaActualUltimosOperadores,
        setPaginaActualUltimosOperadores
    ] = React.useState(1);

    const [
        offsetUsosMaquina,
        setOffsetUsosMaquina
    ] = React.useState(0);

    const [
        limitUsosMaquina,
        setLimitUsosMaquina
    ] = React.useState(12);

    const [
        totalPaginasUsosMaquina,
        setTotalPaginasUsosMaquina
    ] = React.useState(1);

    const [
        paginaActualUsosMaquina,
        setPaginaActualUsosMaquina
    ] = React.useState(1);

    // Hooks de registro de operaciones.
    const [
        indexRegistro,
        setIndexRegistro
    ] = React.useState(0);

    const [
        registroOperaciones,
        setRegistroOperaciones
    ] = React.useState(null);

    // Hooks de los datos del filtro.
    const [
        listaRegistrosDispositivos,
        setListaRegistrosDispositivos
    ] = React.useState([]);

    const [
        idDispositivo,
        setIdDispositivo
    ] = React.useState(null);

    const [
        descripcionDispositivo,
        setDescripcionDispositivo
    ] = React.useState(null);

    const [
        semanaReporte,
        setSemanaReporte
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

    /// React effect de consulta de dispostivos controladores.
    // Poner aquí el filtro para los dispositivos.
    React.useEffect(() => {
        consultarRegistrosDispositivos(
            setListaRegistrosDispositivos,
            setEnCarga,
            () => {
            }
        );
    }, []);

    // Consultamos los datos de las graficas.
    React.useEffect(() => {
        if(listaRegistrosDispositivos) {
            if(listaRegistrosDispositivos.length > 0) {
                consultarReporteActividadMaquina(
                    setReporteActivdadMaquina,
                    setEnCarga,
                    {
                        id: listaRegistrosDispositivos[
                            indexRegistro
                        ].id,
                        semanaReporte: semanaReporte
                    },
                    () => {}
                );
            }
        }

    }, [
        listaRegistrosDispositivos,
        indexRegistro,
        semanaReporte
    ,refresh]);

    // Consultamos la lista de los ultimos operadores.
    React.useEffect(() => {
        if(listaRegistrosDispositivos) {
            if(listaRegistrosDispositivos.length > 0) {
                consultarReporteOperadoresMaquina(
                    setReporteOperadoresMaquina,
                    setEnCarga,
                    {
                        offset: offsetUltimosOperadores,
                        limit: limitUltimosOperadores,
                        id: listaRegistrosDispositivos[
                            indexRegistro
                        ].id,
                        semanaReporte: semanaReporte
                    },
                    () => {}
                );
            }
        }

    }, [
        listaRegistrosDispositivos,
        indexRegistro,
        semanaReporte
    ,refresh]);

    // Consultamos la lista de los ultimos usos de la maquina.
    React.useEffect(() => {
        if(listaRegistrosDispositivos) {
            if(listaRegistrosDispositivos.length > 0) {
                consultarReporteUsosMaquina(
                    setReporteUsosMaquina,
                    setTotalPaginasUsosMaquina,
                    setEnCarga,
                    {
                        limit: limitUsosMaquina,
                        offset: offsetUsosMaquina,
                        id: listaRegistrosDispositivos[
                            indexRegistro
                        ].id,
                        semanaReporte: semanaReporte
                    },
                    () => {}
                );
            }
        }

    }, [
        listaRegistrosDispositivos,
        indexRegistro,
        semanaReporte,
        paginaActualUsosMaquina
    ,refresh]);

    // Parametros de busqueda de la barra de filtros.
    const parametrosBusqueda = {
        setIdDispositivo: setIdDispositivo,
        setDescripcionDispositivo: setDescripcionDispositivo,
        setSemanaReporte: setSemanaReporte
    };

    // Funciones de opciones del grid.
    const funcionesOpciones = {
        onRefrescarGrid: () => {
            setRefresh(!refresh);
        },
        onExportarDatos: () => {
        },
        onCambiarConfiguracion: () => {
        },
    };

    // Paginacion de la tabla de usos de la maquina.
    const paginacionUsosMaquina = {
        paginaActual: paginaActualUsosMaquina,
        offset: offsetUsosMaquina,
        registrosPorPagina: limitUsosMaquina,
        totalPaginas: totalPaginasUsosMaquina,
        setPaginaActual: setPaginaActualUsosMaquina,
        setOffset: setOffsetUsosMaquina,
    };

    // Render de contenido del grid.
    const renderContenido = () => {
        if(
            !listaRegistrosDispositivos
            || !reporteActividadMaquina
            || !reporteOperadoresMaquina
            || !reporteUsosMaquina
        ) {
            // Renderizamos el spinner de carga.
            return <IndicadorCargaSpinner/>;
        }

        // Si no existen reportes para mostrar.
        if(
            reporteOperadoresMaquina.length == 0
            && reporteUsosMaquina.length == 0
        ) {
            // Mostramos un card que indique que no existen registros
            // para generar un reporte de actividad de maquina.
            return <AlertaFaltaRegistrosParaReporte
                listaRegistrosDispositivos={listaRegistrosDispositivos}
                semanaReporte={semanaReporte}
                indexRegistro={indexRegistro}
            />;
        }

        // Renderizamos el contenido de la vista.
        return(
            <Container>
                <Row>
                    <Col>
                        {/* Renderizamos el card con la imagen y los datos del ultimo operador. */}
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
                        
                        {/* Renderizamos la lista de los ultimos N operadores.. */}
                        <Row>
                            <Col>
                                <DisplayOperadoresMaquina
                                    registros={reporteOperadoresMaquina.map(
                                        (registro: ReporteOperadoresMaquina) => {
                                            return registro.empleado;
                                        })
                                    }
                                    limiteOperadores={limitUltimosOperadores}
                                />
                            </Col>
                        </Row>
                    </Col>

                    {/* Renderizamos el grafico del reporte. */}
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

                {/* Renderizamos el hisotrial de usos de la maquina. */}
                <Row>
                    <Col>
                        <ListaHistorialUsosMaquina
                            semanaReporte={semanaReporte}
                            registros={reporteUsosMaquina}
                            paginacion={paginacionUsosMaquina}
                        />
                    </Col>
                </Row>
            </Container>
        );
    };

    return(
        <GridParaReporteDeActividadDeMaquina>
            {/* Cabecera del grid con barra de busqueda. */}
            <Row>
                <Col>
                    <CardHeaderHistorialActividad
                        parametrosBusqueda={
                            parametrosBusqueda
                        }
                        funcionesOpciones={
                            funcionesOpciones
                        }
                        indexRegistro={
                            indexRegistro
                        }
                        setIndexRegistro={
                            setIndexRegistro
                        }
                        registros={
                            listaRegistrosDispositivos
                        }
                    />
                </Col>
            </Row>

            <br/>

            {/* Renderizamos el contenido del grid. */}
            {renderContenido()}

        </GridParaReporteDeActividadDeMaquina>
    );
};