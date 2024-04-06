'use client'

import logo from '../public/images/logo.png'

// Componentes de reactstrap.
import {
    Card,
    Button,
    Container, Row, Col
} from "reactstrap";

// Componentes propios.
import React from "react";
import Image from 'next/image';
import Router from 'next/router';

import FormLogin from '../components/forms/login/formLogin';

import RootLayout from '../components/Layout/rootLayout';
import { LoginUsuario } from '../utils/API/interface/usuarios';

export default function Login() {
    // Hooks para los datos del login.
    const [userName, setUserName] = React.useState(undefined);
    const [password, setPassword] = React.useState(undefined);
    const [recordarSesion, setRecordarSesion] = React.useState(undefined);

    // Hook para el estado del indicador de carga.
    const [enCarga, setEnCarga] = React.useState(false);

    // Hook para la alerta temporal.
    const [mostrarAlerta, setMostrarAlerta] = React.useState(false);

    return (
        <React.Fragment>
            <Card className='cardLogin' color='dark'>
                <Container fluid>
                    <Row>
                        <Col/>
                        <Col xs="auto">
                            <h1 className='tituloLogin'>
                                <Image
                                    src={logo}
                                    height={120}
                                    width={162}
                                />
                                <br/>
                                AC Automatización
                                <div className='separadorTituloLogin'/>
                            </h1>
                        </Col>
                        <Col/>
                    </Row>
                    <br/>
                    <Row>
                        <FormLogin
                            setUserName={setUserName}
                            setPassword={setPassword}
                            setRecordarSesion={setRecordarSesion}
                            enCarga={enCarga}
                        />
                    </Row>
                    <Row>
                        <Col sm='0' md='2'/>

                        <Col sm='12' md='8' >
                            <Button
                                block
                                outline
                                color='success'
                                onClick={() => {
                                    const cambioPagina = () => {
                                        Router.push('/home');
                                    };

                                    LoginUsuario(
                                        {
                                            nombreUsuario: userName,
                                            password: password,
                                            alwaysOn: recordarSesion
                                        },
                                        cambioPagina,
                                        setEnCarga
                                    );
                                }}
                            >
                                Iniciar sesión
                            </Button>
                        </Col>

                        <Col sm='0' md='2'/>
                    </Row>
                </Container>
            </Card>
        </React.Fragment>
    );
};

Login.getLayout = function(page) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    );
};