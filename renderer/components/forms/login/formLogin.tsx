'use client'

import React, { SyntheticEvent } from 'react';

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

    const [
        mostrarPassword,
        setMostrarPassword
    ] = React.useState(false);

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
                                onChange={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLTextAreaElement;

                                    props.setUserName(input.value);
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
                                onChange={(evento: SyntheticEvent)=> {
                                    const input = evento.target as HTMLTextAreaElement;

                                    props.setPassword(input.value);
                                }}
                            />
                        </FormGroup>

                        <Container>
                            <Row>
                                <Col>
                                    <FormGroup
                                        switch
                                        style={{color: 'white'}}
                                        onChange={(evento: SyntheticEvent) => {
                                            const input = evento.target as HTMLInputElement;

                                            props.setRecordarSesion(
                                                input.checked
                                            );
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
                                            onClick={(evento: SyntheticEvent) => {
                                                const input = evento.target as HTMLInputElement;

                                                setMostrarPassword(
                                                    input.checked
                                                );
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