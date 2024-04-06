'use client'

// React.
import React from "react";

// Componentes de reactstrap.
import { Container, Row, Col } from "reactstrap";

// Componentes propios.
import TablaZonas from "../../../../components/tablas/tablaZonas/tablaZonas";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";

export default function ListaZonas() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaZonas/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaZonas.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};