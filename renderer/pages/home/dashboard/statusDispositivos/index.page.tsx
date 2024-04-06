'use client'

import React from "react";

// Componentes de reactstrap.
import {
    Container, Row, Col,
    Card
} from "reactstrap";

// Componentes propios.
import TablaStatusDispositivos from "../../../../components/tablas/tablaStatusDispositivos/tablaStatusDispositivos";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";

export default function StatusDispositvos() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaStatusDispositivos/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

StatusDispositvos.getLayout = function(page) {
    return (
        <SideBarLayout>
            {page}
        </SideBarLayout>
    );
};