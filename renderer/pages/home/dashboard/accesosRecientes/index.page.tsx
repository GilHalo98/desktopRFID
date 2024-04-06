'use client'

import React from "react";

// Componentes de reactstrap.
import {
    Container, Row, Col,
    Card
} from "reactstrap";

// Componentes propios.
import ListaAccesosRecientes from "../../../../components/listas/listaAccesosRecientes/listaAccesosRecientes";
import SideBarLayout from "../../../../components/Layout/sideBarLayout";

export default function AccesosRecientes() {
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <ListaAccesosRecientes/>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

AccesosRecientes.getLayout = function(page) {
    return (
        <SideBarLayout>
            {page}
        </SideBarLayout>
    );
};