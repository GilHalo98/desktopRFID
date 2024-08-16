'use client'

import 'bootstrap/dist/css/bootstrap.css';

// Evento de submit.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap
import {
    Container, Row, Col
} from 'reactstrap';

// Componentes propios.
import SideBarLayout from '../../../../components/Layout/sideBarLayout';
import TablaHorarioEmpelado from '../../../../components/tablas/tablaHorarioEmpleado/tablaHorarioEmpleado';


export default function ListaReportes() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaHorarioEmpelado/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaReportes.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};
