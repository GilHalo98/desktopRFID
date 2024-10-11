'use client'

// React.
import React from "react";

// Componentes propios.
import SideBarLayout from "../../../../components/Layout/sideBarLayout";
import TablaHorasTrabajadas from "../../../../components/tablas/tablaHorasTrabajadas/tablaHorasTrabajadas";

// Componentes de reactstrap.
import {
    Container, Row, Col
} from "reactstrap";

export default function Home() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaHorasTrabajadas/>
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