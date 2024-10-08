'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Container, Row, Col
} from 'reactstrap';

// Componentes propios.
import CardHeaderDashboardActividad from '../cards/cardHeader/cardHeaderDashboardActividad';

// Modelo de datos.
import {
    DispositivoIoT
} from '../../utils/API/modelos/dispositivoIoT';

export default function GridParaDashboardDeActividadDeMaquina(
    props: {
        tituloGrid: string,
        parametrosBusqueda: {
            setIdDispositivo: Function,
            setDescripcionDispositivo: Function,
            setSemanaReporte: Function,
        },
        elementosOpciones: {
            indexRegistro: number,
            setIndexRegistro: Function,
            listaRegistrosDispositivos: DispositivoIoT[]
        };
        children?: any
    }
) {
    return(
        <Container>
            {/*Cabecera del grid con barra de busqueda.*/}
            <Row>
                <Col>
                    <CardHeaderDashboardActividad
                        parametrosBusqueda={
                            props.parametrosBusqueda
                        }
                        indexRegistro={
                            props.elementosOpciones.indexRegistro
                        }
                        setIndexRegistro={
                            props.elementosOpciones.setIndexRegistro
                        }
                        registros={
                            props.elementosOpciones.listaRegistrosDispositivos
                        }
                    />
                </Col>
            </Row>

            <br/>

            {/*Renderizamos el contenido del grid.*/}
            {props.children}
        </Container>
    );
};