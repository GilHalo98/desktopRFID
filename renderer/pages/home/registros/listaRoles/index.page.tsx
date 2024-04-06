'use client'

// Componentes de reactstrap.
import { Container, Row, Col } from "reactstrap";

// Componentes propios.
import TablaRoles from "../../../../components/tablas/tablaRoles/tablaRoles";
import React from "react";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";

export default function ListaRoles() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaRoles/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaRoles.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};