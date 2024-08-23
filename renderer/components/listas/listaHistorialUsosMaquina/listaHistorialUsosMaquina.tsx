'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Table, Button, Alert,
    Container, Row, Col,
    Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader,
    List, ListGroupItem, ListGroup,
} from 'reactstrap';

// Funcionalidad propia.
import {
    deserealizarSemana
} from '../../../utils/conversiones';

import {
    rangoSemana
} from '../../../utils/tiempo';

// Modelo de datos.
import {
    ReporteUsoActividadMaquina
} from '../../../utils/API/respuestas/reporteUsosMaquina';
import Paginacion from '../../paginacion/paginacion';

export default function ListaHistorialUsosMaquina(
    props: {
        semanaReporte: string,
        registros: ReporteUsoActividadMaquina[],
        paginacion?: {
            paginaActual: number,
            offset: number,
            registrosPorPagina: number,
            totalPaginas: number,
            setPaginaActual: Function,
            setOffset: Function
        },
    }
) {
    const fechaSemana: Date[] = props.semanaReporte?
        deserealizarSemana(props.semanaReporte) : rangoSemana();

    // Renderiza la paginacion del la tabla.
    const renderPaginacion = (
        paginacion?: {
            paginaActual: number,
            offset: number,
            registrosPorPagina: number,
            totalPaginas: number,
            setPaginaActual: Function,
            setOffset: Function
        }
    ) => {
        if(typeof paginacion == 'undefined') {
            return null;
        }

        if(paginacion.totalPaginas <= 1) {
            return null;
        }

        return(<Paginacion
            paginaActual={paginacion.paginaActual}
            offset={paginacion.offset}
            registrosPorPagina={paginacion.registrosPorPagina}
            setPaginaActual={paginacion.setPaginaActual}
            setOffset={paginacion.setOffset}
            totalPaginas={paginacion.totalPaginas}
        />);
    };

    return(
        <Card color='dark'>
            <CardHeader className='text-white'>
                Historial de usos de maquina del día <b>{
                    fechaSemana[0].toLocaleDateString()
                }</b> al día <b>{
                    fechaSemana[1].toLocaleDateString()
                }</b>
            </CardHeader>

            <CardBody>
                <List>
                    {props.registros.map((registro: ReporteUsoActividadMaquina) => {
                        const nombreCompleto = registro.empleado.nombres
                            + ' ' + registro.empleado.apellidoPaterno
                            + ' ' + registro.empleado.apellidoMaterno;

                        let fechaReporte = new Date(
                            registro.fechaRegistroReporteActividad
                        );



                        // Tomamos en cuenta el timeOffset.
                        fechaReporte.setMinutes(
                            fechaReporte.getMinutes() + fechaReporte.getTimezoneOffset()
                        );

                        let color = 'dark';

                        switch (registro.reporte.idTipoReporteVinculado) {
                            case 12:
                                // Actividad iniciada.
                                color = 'success';

                                break;

                            case 13:
                                // Actividad terminada.
                                color = 'secondary';

                                break;

                            case 14:
                                // Credenciales invalidas.
                                color = 'warning';

                                break;
                        
                            default:
                                // Error.
                                color = 'danger';

                                break;
                        }

                        return(
                            <>
                                <Card color={color}>
                                    <CardBody>
                                        <CardTitle style={{
                                            textAlign: 'center'
                                        }}>
                                            <b>{
                                                registro.reporte.descripcionReporte
                                            }</b> por empleado <b>{
                                                nombreCompleto
                                            }</b> en el día <b>{
                                                fechaReporte.toLocaleDateString()
                                            } a las {
                                                fechaReporte.toLocaleTimeString()
                                            }</b>
                                        </CardTitle>
                                    </CardBody>
                                </Card>

                                <br/>
                            </>
                        );
                    })}
                </List>

                {/* Renderizamos la paginacion de la lista */}
                {renderPaginacion(props.paginacion)}
            </CardBody>
        </Card>
    );
};