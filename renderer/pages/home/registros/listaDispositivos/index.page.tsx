'use client'

// React.
import React from "react";

// Componentes de reactstrap.
import { Container, Row, Col } from "reactstrap";

// Componentes propios.
import TablaDispositivos from "../../../../components/tablas/tablaDispositivos/tablaDispositivos";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";

export default function ListaDispositivos() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaDispositivos/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaDispositivos.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};