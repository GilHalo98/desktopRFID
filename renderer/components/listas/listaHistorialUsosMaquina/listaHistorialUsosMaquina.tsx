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

// Modelo de datos.
import {
    ReporteUsoActividadMaquina
} from '../../../utils/API/respuestas/reporteUsosMaquina';
import { ReporteActividad } from '../../../utils/API/modelos/reporteActividad';

export default function ListaHistorialUsosMaquina(
    props: {
        tituloLista: string,
        registros: ReporteUsoActividadMaquina[]
    }
) {
    return(
        <Card color='dark'>
            <CardHeader className='text-white'>
                {props.tituloLista}
            </CardHeader>

            <CardBody>
                <List>
                    {props.registros.map((registro: ReporteUsoActividadMaquina) => {
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

                        return <Button block color={color}>
                            {registro.reporte.descripcionReporte}
                        </Button>;
                    })}
                </List>
            </CardBody>
        </Card>
    );
};