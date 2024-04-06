'use client'

// Componentes de reactstrap.
import { Container, Row, Col } from "reactstrap";

// Componentes propios.
import TablaPermisos from "../../../../components/tablas/tablaPermisos/tablaPermisos";
import React from "react";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";

export default function ListaPermisos() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaPermisos/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaPermisos.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};