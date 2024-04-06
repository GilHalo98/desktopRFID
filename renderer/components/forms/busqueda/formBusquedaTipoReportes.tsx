'use client'


import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

export default function FormBusquedaTipoReportes(
    props: {
        parametrosBusqueda: {
            setIdTipoReporte: Function,
            setClasificacionReporte: Function
        }        
    }
) {
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idTipoReporte"
                        placeholder="ID del tipo de reporte"
                        type="number"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setIdTipoReporte(id);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="clasificacionReporte"
                        placeholder="Clasificacion del tipo de reporte"
                        type="text"
                        onChange={(input) => {
                            props.parametrosBusqueda.setClasificacionReporte(
                                input.target.value
                            );
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};