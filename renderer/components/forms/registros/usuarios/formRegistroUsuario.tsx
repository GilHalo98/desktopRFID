// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap
import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button
} from 'reactstrap';

// Interfaz con api-
import {
    Empleado
} from '../../../../utils/API/modelos/empleado';

export default function FormRegistroUsuario(
    props: {
        elementosOpciones: Empleado[],
        onGuardarRegistro: Function,
        toggleModal: Function,
        onAutogenerarPassword: Function,
        onAutogenerarUsername: Function
    }
) {
    // Hooks para autogenerar datos.
    const [
        autoGenerarUsername,
        setAutoGenerarUsername
    ] = React.useState(false);

    const [
        autoGenerarPassword,
        setAutoGenerarPassword
    ] = React.useState(false);

    // Hook para mostrar la contraseña.
    const [
        mostrarContra,
        setMostrarContra
    ] = React.useState(false);

    // Hooks de los datos ingresados por el usuario.
    const [
        indexRegistro,
        setIndexRegistro
    ] = React.useState(1);

    const [
        username,
        setUsername
    ] = React.useState(undefined);

    const [
        password,
        setPassword
    ] = React.useState(undefined);

    // Hooks de valores auxiliares de datos ingresados.
    const [
        auxUsername,
        setAuxUsername
    ] = React.useState(undefined);

    const [
        auxPassword,
        setAuxPassword
    ] = React.useState(undefined);

    // Use Effect de la autogeneracion del username.
    React.useEffect(() => {
        if(autoGenerarUsername) {
            props.onAutogenerarUsername(
                props.elementosOpciones[indexRegistro],
                setUsername
            );

            setAuxUsername(username);

        } else {
            setUsername(auxUsername);
        }

    }, [
        autoGenerarUsername
    ]);

    // Use Effect de la autogeneracion del password.
    React.useEffect(() => {
        if(autoGenerarPassword) {
            props.onAutogenerarPassword(
                props.elementosOpciones[indexRegistro],
                setPassword
            );
            setAuxPassword(password);
        } else {
            setPassword(auxPassword);
        }

    }, [
        autoGenerarPassword
    ]);

    // Control para mostrar la contraseña.
    const mostrarPassword = (
        mostrar: boolean
    ) => {return mostrar ?
        "text" : "password";
    };

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onGuardarRegistro(
                evento,
                props.elementosOpciones[indexRegistro]
            );
            props.toggleModal();
        }}>
            {/*Input de id de empleado*/}
            <FormGroup>
                <Label for="idEmpleado">
                    Selecciona un empleado al que registrar como usuario
                </Label>

                <Input
                    name="seleccionIdEmpleado"
                    id="idEmpleado"
                    type="select"
                    onChange={(evento) => {setIndexRegistro(parseInt(
                        evento.target.value
                    ))}}
                >
                    {props.elementosOpciones.map((
                        registro: Empleado,
                        index: number
                    ) => {
                        return(
                            <option value={index}>
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

            {/*Input de nombre de usuario.*/}
            <FormGroup>
                <Label for="nombreUsuario">
                    Nombre de usuario
                </Label>

                <Input
                    id="nombreUsuario"
                    name="campoDeNombreUsuario"
                    type="text"
                    disabled={autoGenerarUsername}
                    value={username}
                    onChange={(evento) => {setUsername(
                        evento.target.value
                    )}}
                />
            </FormGroup>

            {/*Input de autogenerar nombre de usuario.*/}
            <FormGroup switch>
                <Input
                    name="checkAutoGenerarUsername"
                    type="switch"
                    onClick={(evento: SyntheticEvent) => {
                        const input = evento.target as HTMLInputElement;

                        setAutoGenerarUsername(
                            input.checked
                        )
                    }}
                />

                <Label switch>
                    Auto-Generar nombre de usuario
                </Label>
            </FormGroup>

            {/*Input de contraseña de usuario.*/}
            <FormGroup>
                <Label for="password">
                    Password de usuario
                </Label>

                <Input
                    id="password"
                    name="campoDePassword"
                    type={mostrarPassword(mostrarContra)}
                    disabled={autoGenerarPassword}
                    value={password}
                    onChange={(evento) => {setPassword(
                        evento.target.value
                    )}}
                />
            </FormGroup>

            {/*
                Switch de autogenerar contraseña y
                checkbox de mostrar contraseña.
            */}
            <Container>
                <Row>
                    <Col>
                        <FormGroup switch>
                            <Input
                                name="checkAutoGenerarPassword"
                                type="switch"
                                onClick={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLInputElement;

                                    setAutoGenerarPassword(
                                        input.checked
                                    )
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
                                onClick={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLInputElement;

                                    setMostrarContra(
                                        input.checked
                                    )
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