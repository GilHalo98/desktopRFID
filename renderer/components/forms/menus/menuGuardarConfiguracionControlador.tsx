// Funcionalidad de React.
import React from 'react';

// Variables del entorno.
const API_PORT = process.env.API_PORT;
const API_HOST = process.env.API_HOST;
const API_URL = process.env.API_URL;

// Componentes de reactstrap.
import {
    Input, Label,
    Form, FormGroup, Button, Col, Container, Row
} from 'reactstrap';

// Interfaz de modelos.
import {
    RespuestaConsultaDispositivos
} from '../../../utils/API/respuestas/consultaDispositivo';
import { Rol } from '../../../utils/API/modelos/rol';

// Interfaz con la API.
import {
    GenerarTokenDispositivo
} from '../../../utils/API/interface/dispositivo';

// Funciones del form.
import {
    guardarConfiguracionControlador
} from './logic/guardarConfiguracionIoT';

// Funciones extra.
import {
    funcionRefresh
} from '../../../utils/refresh';


export default function MenuGuardarConfiguracionIoT(
    props: {
        elementosOpciones: {
            listaRoles:  Rol[]
        }
        registro: RespuestaConsultaDispositivos,
        toggleModal: Function
    }
) {
    // Hooks de datos a guardar en la tarjeta.
    const [mostrarTodosLosPuertos, setMostrarTodosLosPuertos] = React.useState(false);
    const [puertoSerial, setPuertoSerial] = React.useState(undefined);
    const [token, setToken] = React.useState(undefined);

    // Hooks de menu de opciones.
    const [listaPuertosSeriales, setListaPuertosSeriales] = React.useState([]);

    // Hook para el refrescamiento del componente.
    const [refresh, setRefresh] = React.useState(false);

    // Versiones del api soportadas.
    const versionesApi = [
        '/apiV0.1.0/'
    ];

    // baudRate soportados.
    const baudRateSoportados = [
        300,
        600,
        1200,
        2400,
        4800,
        9600,
        19200,
        38400,
        57600,
        92160,
        115200,
        230400,
        460800,
    ];

    // Consultamos los datos del menu de opciones.
    React.useEffect(() => {
        console.log('refresh');

        // Enviamos el evento de explorar los puertos seriales al IPC.
        window.ipc.send('explorar_puertos_serial', mostrarTodosLosPuertos);

        // Esperamos por la respuesta con los puertos del IPC.
        window.ipc.on('puertos_seriales_encontrados', (puertos: any[]) => {
            setListaPuertosSeriales(puertos)
        });

        // Si no se ha definido un puerto serial.
        if(!puertoSerial) {
            // Si existen puertos disponibles en la lista.
            if(listaPuertosSeriales[0]) {
                // Establecemos el puerto serial default.
                setPuertoSerial(listaPuertosSeriales[0].path);
            }
        }

    }, [mostrarTodosLosPuertos, refresh]);

    // Generamos la API KEY del dispositivo.
    React.useEffect(() => {
        GenerarTokenDispositivo(
            props.registro.id,
            setToken
        );
    }, []);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, 500);

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            guardarConfiguracionControlador(evento);
            props.toggleModal();
        }}>
            {/*Listamos los puertos serial disponibles al dispositivo*/}
            <FormGroup>
                <Label for="puertoSerial">
                    Puerto Serial del dispositivo grabador de tarjetas.
                </Label>

                <Input
                    id="puertoSerial"
                    type="select"
                    defaultValue={puertoSerial}
                >
                    {listaPuertosSeriales.map((registro: any) => {
                        return(
                            <option value={registro.path}>
                                {registro.path}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {/*Indicamos que se listaran todos los puertos seriales*/}
            <FormGroup check>
                <Label check>
                    Listar todos los puertos serial
                </Label>

                <Input type="checkbox" onChange={(input) => {
                    setMostrarTodosLosPuertos(input.target.checked);
                }}/>
            </FormGroup>

            {/*Mostramos los baudrate disponibles*/}
            <FormGroup>
                <Label for="baudRate">
                    baudRate
                </Label>

                <Input
                    id="baudRate"
                    type="select"
                    defaultValue={115200}
                >
                    {baudRateSoportados.map((baudRate: number) => {
                        return(
                            <option value={baudRate}>
                                {baudRate}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {/*SSID de la red donde se conectara el dispositivo.*/}
            <FormGroup>
                <Label for="ssid">
                    SSID de red
                </Label>

                <Input
                    id="ssid"
                    name="campoSsid"
                    type="text"
                    defaultValue={"AC Automatizacion 2.4"}
                />
            </FormGroup>

            {/*PASSWORD de la red donde se conectara el dispositivo.*/}
            <FormGroup>
                <Label for="password">
                    Password de red
                </Label>

                <Input
                    id="password"
                    name="campoPassword"
                    type="password"
                    defaultValue={"Aau190410ry2@"}
                />
            </FormGroup>

            {/*Puerto del servidor API*/}
            <FormGroup>
                <Label for="apiPort">
                    Puerto de API
                </Label>

                <Input
                    id="apiPort"
                    name="campoApiPort"
                    type="text"
                    defaultValue={API_PORT}
                />
            </FormGroup>

            {/*IP del servidor API*/}
            <FormGroup>
                <Label for="apiIp">
                    IP del API
                </Label>

                <Input
                    id="apiIp"
                    name="campoApiIp"
                    type="text"
                    defaultValue={API_HOST}
                />
            </FormGroup>

            {/*Version del servidor API esto no se muestra si no es un lector, checador o controlador*/}
            <FormGroup>
                <Label for="apiVersion">
                    Version del API
                </Label>

                <Input
                    id="apiVersion"
                    type="select"
                    defaultValue={API_URL}
                >
                    {versionesApi.map((version: string) => {
                        return(
                            <option value={version}>
                                {version}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {/*Api key del dispositivo*/}
            <FormGroup>
                <Label for="apiKeyDispositivo">
                    API KEY del dispositivo
                </Label>

                <Input
                    id="apiKeyDispositivo"
                    name="campoApiKeyDispositivo"
                    type="text"
                    defaultValue={token}
                />
            </FormGroup>

            {/*Rol que puede hacer uso del dispositivo*/}
            <FormGroup>
                <Label for="bitRol">
                    Rol con permiso de uso de dispositivo
                </Label>

                <Input
                    id="bitRol"
                    type="select"
                >
                    {props.elementosOpciones.listaRoles.map((rol: Rol) => {
                        return(
                            <option value={rol.bitRol}>
                                {rol.descripcionRol}
                            </option>
                        );
                    })}
                </Input>
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
                            Guardar Datos
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};