'use client'

import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';

import {
    Container, Row, Col
} from 'reactstrap';

import SideBarLayout from '../../../../components/Layout/sideBarLayout';
import TablaHorarioEmpleado from '../../../../components/tablas/tablaHorarioEmpleado/tablaHorarioEmpleado';

export default function ListaReportes() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaHorarioEmpleado/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaReportes.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};