'use client'

// Componentes de reactstrap.
import { Container, Row, Col } from "reactstrap";

// Componentes propios.
import TablaTiposReportes from "../../../../components/tablas/tablaTiposReportes/tablaTiposReportes";
import React from "react";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";

export default function ListaTiposReportes() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <TablaTiposReportes/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

ListaTiposReportes.getLayout = function(page) {
    return <SideBarLayout>{page}</SideBarLayout>;
};