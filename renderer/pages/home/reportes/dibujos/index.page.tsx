'use client'

// React.
import React from "react";

// Reactstrap.
import {
    Container, Row, Col,
} from "reactstrap";

// Componentes propios.
import SideBarLayout from "../../../../components/Layout/sideBarLayout";
import GridReporteDibujos from "../../../../components/grids/gridReporteDibujos/gridReporteDibujos";

// Modelo de datos.

export default function Home() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <GridReporteDibujos/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

Home.getLayout = function(page) {
    return (
        <SideBarLayout>
            {page}
        </SideBarLayout>
    );
};
