import React, { ChangeEventHandler } from 'react';

import {
    Container, Row, Col,
    Input, Label,
    Form, FormGroup, Button
} from 'reactstrap';

export default function MenuProbarSerial(
    props: {
        toggleModal: Function
    }
) {
    // Puerto serial donde se realizara la prueba.
    const [puertoSerial, setPuertoSerial] = React.useState(undefined);

    // Hook del estado de la conexión con el dispositivo.
    const [
        conexionEstablecida, setConexionEstablecida
    ] = React.useState(false);

    // Hook de la lista de baudrates estandar.
    const baudrates = [
        10,
        300,
        600,
        1200,
        2400,
        4800,
        9600,
        14400,
        19200,
        38400,
        57600,
        115200,
        128000,
        256000
    ];

    // Hook de la lista de puertos disponible.
    const [
        listaPuertos,
        setListaPuertos
    ] = React.useState([]);

    // Hook que indica si se deben de listar todos los puertos.
    const [
        mostrarTodosLosPuertos,
        setMostrarTodosLosPuertos
    ] = React.useState(false)

    React.useEffect(() => {
        // Enviamos el evento de explorar los puertos seriales al IPC.
        window.ipc.send(
            "explorar_puertos_serial",
            mostrarTodosLosPuertos
        );

        // Esperamos por la respuesta con los puertos del IPC.
        window.ipc.on("puertos_seriales_encontrados", (puertos: any) => {
            setListaPuertos(puertos);
        });

        // Si no se ha definido un puerto serial.
        if(!puertoSerial) {
            // Si existen puertos disponibles en la lista.
            if(listaPuertos[0]) {
                // Establecemos el puerto serial default.
                setPuertoSerial(listaPuertos[0].path);
            }
        }

    }, [mostrarTodosLosPuertos]);

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.toggleModal();
        }}>

            {/*Campo de seleccion de puerto de comunicaicón*/}
            <FormGroup>
                <Label for="puerto">
                    Puerto de comunicaicón
                </Label>

                <Input
                    id="puerto"
                    type="select"
                >
                    {listaPuertos.map((puerto: any, index: number) => {
                        return(
                            <option value={index}>
                                {puerto.path}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {/*
                Campo para indicar si se deben de mostrar todos
                los puertos seriales
            */}
            <FormGroup check>
                <Input
                    id="listarTodosLosPuerto"
                    type="checkbox"
                    onChange={(evento) => {
                        setMostrarTodosLosPuertos(evento.target.checked);
                    }}
                />

                <Label
                    check
                    for='listarTodosLosPuerto'
                >
                    Listar todos los puertos seriales
                </Label>
            </FormGroup>

            {/*Campo de seleccion de baudRate*/}
            <FormGroup>
                <Label for="baudRate">
                    BaudRate
                </Label>

                <Input
                    id="baudRate"
                    type="select"
                    defaultValue={6}
                >
                    {baudrates.map((baudrate: number, index: number) => {
                        return(
                            <option value={index}>
                                {baudrate}
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            {/*Campo que muestra la información recivida por serial*/}
            <FormGroup>
                <Label for="serialRecivido">
                    Reciviendo de serial...
                </Label>

                <Input
                    id="serialRecivido"
                    type='textarea'
                    disabled
                />
            </FormGroup>

            {/*Campo para mostrar datos a travez de serial*/}
            <FormGroup>
                <Label for="serialEnvio">
                    String a enviar
                </Label>

                <Input
                    id="serialEnvio"
                    type='text'
                />
            </FormGroup>

            {/*Campo De boton para enviar los datos.*/}
            <FormGroup>
                <Button
                    active
                    outline
                    block
                    color='primary'
                >
                    Enviar por serial
                </Button>
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
                            color={conexionEstablecida?
                                "danger" : "success"
                            }
                        >
                            {conexionEstablecida?
                                "Desconectar" : "Conectar"
                            }
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};