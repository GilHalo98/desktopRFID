'use client'

import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';

import {
    Container, Row, Col
} from 'reactstrap';

import SideBarLayout from '../../../../components/Layout/sideBarLayout';
import TablaReportesChequeos from '../../../../components/tablas/tablaReportesChequeos/tablaReporteChequeos';

export default function ListaReportes() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaReportesChequeos/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaReportes.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};