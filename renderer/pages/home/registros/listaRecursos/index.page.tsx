'use client'

import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';

import {
    Container, Row, Col
} from 'reactstrap';

import SideBarLayout from '../../../../components/Layout/sideBarLayout';
import TablaRecursos from '../../../../components/tablas/tablaRecursos/tablaRecursos';

export default function ListaReportes() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaRecursos/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaReportes.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};