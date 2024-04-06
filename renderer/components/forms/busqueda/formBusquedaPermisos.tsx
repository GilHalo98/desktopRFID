'use client'


import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

export default function FormBusquedaPermisos(
    props: {
        parametrosBusqueda: {
            setIdPermiso: Function,
            setDescripcionPermiso: Function
        }
    }
) {
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idPermiso"
                        placeholder="ID del permiso"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setIdPermiso(id);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="descripcionPermiso"
                        placeholder="Descripción del permiso"
                        type="text"
                        onChange={(input) => {
                            props.parametrosBusqueda.setDescripcionPermiso(
                                input.target.value
                            );
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};