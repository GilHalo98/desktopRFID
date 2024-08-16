'use client'

// React.
import React from "react";

// Componentes propios.
import GridReporteActividadMaquina from "../../../../components/grids/gridReporteActividadMaquina/gridReporteActividadMaquina";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";

// Componentes de reactstrap.
import { Container, Row, Col } from "reactstrap";

export default function HistorialActividadMaquinas() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <GridReporteActividadMaquina/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

HistorialActividadMaquinas.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};