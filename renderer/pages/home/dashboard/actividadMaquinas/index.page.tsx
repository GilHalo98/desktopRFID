'use client'

import 'bootstrap/dist/css/bootstrap.css';

// React.
import React from 'react';

// Componentes de reacstrap.
import {
    Container, Row, Col
} from 'reactstrap';

// Componentes propios.
import SideBarLayout from '../../../../components/Layout/sideBarLayout';
import GridDashboardActividadMaquina from '../../../../components/grids/gridDashboardActividadMaquina/gridDashboardActividadMaquina';

export default function ListaReportes() {
    return (
        <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col>
                            <GridDashboardActividadMaquina/>
                        </Col>
                    </Row>
                </Container>
        </React.Fragment>
    );
};

ListaReportes.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};