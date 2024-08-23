'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card,
    Container, Row, Col, CardHeader, Spinner, CardBody, CardText, Alert
} from 'reactstrap';

export default function IndicadorCargaSpinner(
    props: {}
) {
    return(
        <Container fluid>
            <Row>
                <Col/>

                <Col xs='auto'>
                    <Spinner
                        color="warning"
                        className='spiinerCarga'
                    />
                </Col>

                <Col/>
            </Row>
        </Container>
    );
};