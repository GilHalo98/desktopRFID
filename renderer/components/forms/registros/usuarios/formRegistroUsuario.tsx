import React from 'react';

import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';
import { guardarRegistro } from './logic/formLogic';
import { Empleado } from '../../../../utils/API/modelos/empleado';
import { generarNombreUsuario, generarPassword } from './logic/utils';

export default function FormRegistroUsuario(
    props: {
        toggleModal: Function,
        toggleRefresh: Function,
        elementosOpciones: {
            listaEmpleados: Empleado[],
        }
    }
) {
    const [autoGenerarUsername, setAutoGenerarUsername] = React.useState(false);
    const [autoGenerarPassword, setAutoGenerarPassword] = React.useState(false);
    const [mostrarContra, setMostrarContra] = React.useState(false);
    const [password, setPassword] = React.useState(undefined);
    const [userName, setUserName] = React.useState(undefined);
    const [registro, setRegistro] = React.useState(undefined);

    // Declaramos el useEffect de react para actualizar el contenido de la vista.
    React.useEffect(() => {
        console.log('refresh');

        setPassword(undefined);
        setUserName(undefined);

        if(autoGenerarUsername) {
            // Se concatena su nombre completo.
            const nombreCompleto = registro.nombres
                + ' ' + registro.apellidoPaterno
                + ' ' + registro.apellidoMaterno;

            setUserName(generarNombreUsuario(nombreCompleto));
        }


        if(autoGenerarPassword) {
            setPassword(generarPassword(registro.fechaRegistroEmpleado));
        }

    }, [autoGenerarUsername, autoGenerarPassword, registro]);

    const mostrarPassword = (mostrar: boolean) => {
        return mostrar ? "text" : "password";
    };

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            guardarRegistro(evento);
            props.toggleModal();
            props.toggleRefresh();
        }}>
            {/*Input de id de empleado*/}
            <FormGroup>
                <Label for="idEmpleado">
                    Selecciona un usuario al que registrar como usuario
                </Label>

                <Input
                    id="idEmpleado"
                    type="select"
                    onChange={(evento) => {
                        props.elementosOpciones.listaEmpleados.map((elemento: Empleado) => {
                            if(parseInt(evento.target.value) == elemento.id) {
                                setRegistro(elemento);
                            }
                        });
                    }}
                >
                    {props.elementosOpciones.listaEmpleados.map((registro: Empleado) => {
                        return(
                            <option value={registro.id}>
                                {   
                                    registro.nombres
                                    + ' ' + registro.apellidoPaterno
                                    + ' ' + registro.apellidoMaterno
                                }
                            </option>
                        );
                    })}
                </Input>
            </FormGroup>

            <FormGroup>
                <Label for="nombreUsuario">
                    Nombre de usuario
                </Label>

                <Input
                    id="nombreUsuario"
                    name="campoDeNombreUsuario"
                    type="text"
                    disabled={autoGenerarUsername}
                    defaultValue={userName}
                />
            </FormGroup>

            <FormGroup switch>
                <Input
                    type="switch"
                    onClick={(evento) => {
                        setAutoGenerarUsername(evento.target.checked);
                    }}
                />

                <Label switch>
                    Auto-Generar nombre de usuario
                </Label>
            </FormGroup>

            <FormGroup>
                <Label for="password">
                    Password de usuario
                </Label>

                <Input
                    id="password"
                    name="campoDePassword"
                    type={mostrarPassword(mostrarContra)}
                    disabled={autoGenerarPassword}
                    defaultValue={password}
                />
            </FormGroup>

            <Container>
                <Row>
                    <Col>
                        <FormGroup switch>
                            <Input
                                type="switch"
                                onClick={(evento) => {
                                    setAutoGenerarPassword(evento.target.checked);
                                }}
                            />

                            <Label switch>
                                Auto-Generar password
                            </Label>
                        </FormGroup>
                    </Col>

                    <Col>
                        <FormGroup check>
                            <Input
                                type="checkbox"
                                onClick={(evento) => {
                                    setMostrarContra(evento.target.checked);
                                }}
                            />

                            <Label check>
                                Mostrar Password
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
            </Container>

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
                            }}
                        >
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
                            Registrar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};