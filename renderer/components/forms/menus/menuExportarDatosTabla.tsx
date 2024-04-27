import React from 'react';

import {
    Container, Row, Col,
    Input, Label,
    Form, FormGroup, Button
} from 'reactstrap';

export default function MenuExportarDatosTabla(
    props: {
        exportarDatos: Function,
        toggleModal: Function
    }
) {
    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();

            // Indica si unicamente exportaremos los datos
            // mostrados en la tabla
            const exportarDatosEnVista = evento.target[0].checked;

            props.exportarDatos(exportarDatosEnVista);
            props.toggleModal();
        }}>

            <div>
                Guarda los datos de la tabla en un archivo de hoja de calculo
            </div>

            <br/>

            <FormGroup
                switch
                style={{color: 'white'}}
            >
                <Input
                    type="switch"
                />

                <Label switch>
                    Exportar unicamente datos mostrados en tabla
                </Label>
            </FormGroup>

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
                            Exportar datos
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};