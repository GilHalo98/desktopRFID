import React from 'react';

import {
    Container, Row, Col,
    Input, Label,
    Form, FormGroup, Button
} from 'reactstrap';

export default function MenuOpcionesGrid(
    props: {
        registrosPorPagina?: number,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function,
        toggleModal: Function
    }
) {
    // Hook del tiempo de refrescamiento.
    const [
        tiempoRefrescamiento,
        setTiempoRefrescamiento
    ] = React.useState(props.tiempoRefrescamiento);

    // Renderizamos la opcion de registros por pagina.
    const renderRegistrosPorPagina = () => {
        if(typeof props.registrosPorPagina == 'undefined') {
            return null;
        }

        return(
            <FormGroup>
                <Label for="registrosPagina">
                    Cantidad de registros por pagina
                </Label>

                <Input
                    id="registrosPagina"
                    name="registrosPorPagina"
                    defaultValue={props.registrosPorPagina}
                    type="number"
                />
            </FormGroup>
        );
    };

    // Renderizamos la opcion de registros por pagina.
    const renderTiempoRefrescamiento = () => {
        if(typeof props.tiempoRefrescamiento == 'undefined') {
            return null;
        }

        return(
            <FormGroup>
                <Label for="tiempoRefrescamiento">
                    Tiempo de refrescamiento de la pagina: {
                        tiempoRefrescamiento
                    } segundos
                </Label>

                <Input
                    id="tiempoRefrescamiento"
                    name="tiempoDeRefrescamiento"
                    type="range"
                    defaultValue={props.tiempoRefrescamiento}
                    onChange={(evento) => {
                        // Convertimos el tipo de dato a number.
                        const valor = (
                            !evento.target.value ?
                                0 : parseInt(
                                    evento.target.value
                                )
                        );

                        setTiempoRefrescamiento(
                            valor
                        );
                    }}
                />
            </FormGroup>
        );
    };

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.guardarConfiguracion(evento);
            props.toggleModal();
        }}>
            {renderRegistrosPorPagina()}
            {renderTiempoRefrescamiento()}

            <br/>

            <Container>
                <Row>
                    <Col>
                        <Button
                            active
                            outline
                            block
                            onClick={() => {
                                props.toggleModal();
                            }}>
                            Cancelar
                        </Button>
                    </Col>

                    <Col>
                        <Button
                            active
                            outline
                            block
                            color='success'
                        >
                            Guardar Configuracion
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};