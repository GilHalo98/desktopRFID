'use client'

import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';

import {
    Container, Row, Col
} from 'reactstrap';

import SideBarLayout from '../../../../components/Layout/sideBarLayout';
import TablaReportes from '../../../../components/tablas/tablaReportes/tablaReportes';

export default function ListaReportes() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaReportes/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaReportes.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};