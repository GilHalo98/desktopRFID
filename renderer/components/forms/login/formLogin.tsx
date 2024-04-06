'use client'

import React from 'react';

import {
    Container, Row, Col,
    Form, FormGroup, Input, Label, Spinner
} from 'reactstrap';

export default function FormLogin(
    props: {
        setUserName: Function,
        setPassword: Function,
        setRecordarSesion: Function,
        enCarga: boolean
    }
) {

    const [mostrarPassword, setMostrarPassword] = React.useState(false);

    const controlInput = {
        display: (props.enCarga? 'none' : '')
    };
    const controlSpinner = {
        display: (props.enCarga? '' : 'none')
    };

    const controlMostrarPassword = (mostrar: boolean) => {
        return mostrar ? 'text' : 'password';
    }

    return(
        <Container>
            <Row style={controlInput}>
                <Col sm='0' md='2'/>

                <Col sm='12' md='8'>
                    <Form>
                        <FormGroup>
                            <Input
                                className='inputLogin'
                                id="nombreUsuario"
                                name="nombreDeUsuario"
                                placeholder="Nombre de usuario"
                                type="text"
                                onChange={(input) => {
                                    props.setUserName(input.target.value);
                                }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Input
                                className='inputLogin'
                                id="passwordUsuario"
                                name="passwordDeUsuario"
                                placeholder="Contraseña de usuario"
                                type={controlMostrarPassword(mostrarPassword)}
                                onChange={(input) => {
                                    props.setPassword(input.target.value);
                                }}
                            />
                        </FormGroup>

                        <Container>
                            <Row>
                                <Col>
                                    <FormGroup
                                        switch
                                        style={{color: 'white'}}
                                        onChange={(input) => {
                                            props.setRecordarSesion(input.target.checked);
                                        }}
                                    >
                                        <Input
                                            type="switch"
                                        />

                                        <Label switch>
                                            Recordar Sesion
                                        </Label>
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup
                                        check
                                        style={{color: 'white'}}
                                    >
                                        <Input
                                            type="checkbox"
                                            onClick={(evento) => {
                                                setMostrarPassword(evento.target.checked);
                                            }}
                                        />

                                        <Label check>
                                            Mostrar Password
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Col>

                <Col sm='0' md='2'/>
            </Row>

            <Row style={controlSpinner}>
                <Col/>
                <Col xs='auto'>
                    <Spinner
                        color="warning"
                        style={{
                            height: '100px',
                            width: '100px'
                        }}
                    />
                </Col>
                <Col/>
            </Row>

            <br/>
        </Container>
    );
};