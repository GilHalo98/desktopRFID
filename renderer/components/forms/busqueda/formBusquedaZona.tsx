'use client'


import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

export default function FormBusquedaZona(
    props: {
        parametrosBusqueda: {
            setIdZona: Function,
            setNombreZona: Function,
            setDescripcionZona: Function,
            setBitZona: Function
        }        
    }
) {
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idZona"
                        placeholder="ID de la zona"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setIdZona(id);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="nombreZona"
                        placeholder="Nombre de la zona"
                        type="text"
                        onChange={(input) => {
                            props.parametrosBusqueda.setNombreZona(
                                input.target.value
                            );
                        }}
                    />
                </Col>
            </Row>

            <br/>

            <Row>
                <Col>
                    <Input
                        id="descripcionZona"
                        placeholder="Descripcion de la zona"
                        type="text"
                        onChange={(input) => {
                            props.parametrosBusqueda.setDescripcionZona(
                                input.target.value
                            );
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="bitZona"
                        placeholder="Bit de acceso de la zona"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setBitZona(id);
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};