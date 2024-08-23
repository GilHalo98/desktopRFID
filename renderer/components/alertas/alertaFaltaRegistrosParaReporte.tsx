// Importamos react.
import React from 'react';

// Componentes de reactstrap.
import {
    Container, Row, Col,
    Alert
} from 'reactstrap';

// Componentes propios.

// Logica del componente.

// Importando modelo de datos.
import { DispositivoIoT } from '../../utils/API/modelos/dispositivoIoT';
import { deserealizarSemana } from '../../utils/conversiones';
import { rangoSemana } from '../../utils/tiempo';

export default function AlertaFaltaRegistrosParaReporte(
    props: {
        listaRegistrosDispositivos: DispositivoIoT[]
        indexRegistro: number,
        semanaReporte?: string
    }
) {
    const fechaSemana: Date[] = props.semanaReporte?
        deserealizarSemana(props.semanaReporte) : rangoSemana();

    return(
        <Container fluid>
            <Row>
                <Col sm={2}/>
                <Col>
                    <Alert color='warning'>
                        <h1 style={{textAlign: 'center', fontSize: '24px'}}><b>{
                            props.listaRegistrosDispositivos[
                            props.indexRegistro
                            ].descripcionDispositivo.toUpperCase()
                        }</b></h1>

                        <p style={{textAlign: 'center'}}>SIN REGISTROS PARA GENRAR REPORTE!</p>

                        <hr style={{margin: '10px'}}/>

                        <p>
                            Este dispositivo no cuenta con registros
                            desde el día <b>{
                                fechaSemana[0].toLocaleDateString()
                            }</b> hasta el día <b>{
                                fechaSemana[1].toLocaleDateString()
                            }</b> para poder generar un reporte de
                            actividad de maquina.
                        </p>
                    </Alert>
                </Col>
                <Col sm={2}/>
            </Row>
        </Container>
    );
};