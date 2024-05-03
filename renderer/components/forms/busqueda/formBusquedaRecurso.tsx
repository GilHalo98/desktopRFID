'use client'


import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

export default function FormBusquedaRecurso(
    props: {
        parametrosBusqueda: {
            setIdRecurso: Function,
            setTipoRecurso: Function,
            setNombreRecurso: Function
        }        
    }
) {
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idRecruso"
                        placeholder="ID del recurso"
                        type="text"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value);
                            }
                            props.parametrosBusqueda.setIdRecurso(id);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="tipoRecurso"
                        placeholder="Tipo de recurso"
                        type="text"
                        onChange={(input) => {
                            props.parametrosBusqueda.setTipoRecurso(
                                input.target.value
                            );
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="nombreRecurso"
                        placeholder="Nombre del recurso"
                        type="text"
                        onChange={(input) => {
                            props.parametrosBusqueda.setNombreRecurso(
                                input.target.value
                            );
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};