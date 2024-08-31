'use client'

// React
import React from "react";

// Componente de next para renerizar img.
import Image from 'next/image';

// Logo o membrete de la compañia
import logo from '../../../public/images/logo.png'

// Componentes de reactstrap.
import {
    Card,
    Button,
    Container, Row, Col
} from "reactstrap";

// Componentes propios.
import FormLogin from '../../forms/login/formLogin';

// Funcionalidad propia.
import {
    iniciarSesion
} from "./logic/registros";

export default function CardLogin() {
    // Hooks para los datos del login.
    const [
        userName,
        setUserName
    ] = React.useState(undefined);

    const [
        password,
        setPassword
    ] = React.useState(undefined);

    const [
        recordarSesion,
        setRecordarSesion
    ] = React.useState(undefined);

    // Hook para el estado del indicador de carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Hook para la alerta temporal.
    const [
        mostrarAlerta,
        setMostrarAlerta
    ] = React.useState(false);

    return (
        <Card className='cardLogin'>
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
                                iniciarSesion(
                                    {
                                        nombreUsuario: userName,
                                        password: password,
                                        alwaysOn: recordarSesion
                                    },
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
    );
}