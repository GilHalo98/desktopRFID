// Funcionalidad de React.
import React from 'react';

// Componentes de reactstrap.
import {
    Input, Label,
    Form, FormGroup, Container, Button, Col, Row
} from 'reactstrap';

// Interfaz con la API.
import { guardarDatos } from './logic/guardarDatosTarjeta';

// Importamos los modelos de datos.
import { Empleado } from '../../../utils/API/modelos/empleado';

export default function MenuGrabarTarjeta(
    props: {
        registro: Empleado,
        toggleModal: Function
    }
) {
    // Hooks de datos a guardar en la tarjeta.
    const [mostrarTodosLosPuertos, setMostrarTodosLosPuertos] = React.useState(false);
    const [puertoSerial, setPuertoSerial] = React.useState(undefined);

    // Hooks de menu de opciones.
    const [listaPuertosSeriales, setListaPuertosSeriales] = React.useState([]);

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

    }, [mostrarTodosLosPuertos]);

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            guardarDatos(evento, props.registro);
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
                    defaultValue={9600}
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