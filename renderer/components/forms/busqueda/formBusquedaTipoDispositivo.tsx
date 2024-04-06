'use client'


import {
    Container, Row, Col,
    Input, Label
} from 'reactstrap';

export default function FormBusquedaTipoDispositivo(
    props: {
        parametrosBusqueda: {
            setIdTipoDispositivo: Function,
            setNombreTipoDispositivo: Function
        }        
    }
) {
    return(
        <Container>
            <Row>
                <Col>
                    <Input
                        id="idTipoDispositivo"
                        placeholder="ID del tipo de dispositivo"
                        type="number"
                        onChange={(input) => {
                            var id = null;
                            if(input.target.value) {
                                id = parseInt(input.target.value)
                            }
                            props.parametrosBusqueda.setIdTipoDispositivo(id);
                        }}
                    />
                </Col>

                <Col>
                    <Input
                        id="nombreTipoDispositivo"
                        placeholder="Nombre del tipo de dispositivo"
                        type="text"
                        onChange={(input) => {
                            props.parametrosBusqueda.setNombreTipoDispositivo(
                                input.target.value
                            );
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};