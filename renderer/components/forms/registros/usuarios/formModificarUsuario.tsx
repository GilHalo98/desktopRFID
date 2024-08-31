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

import {
    Usuario
} from '../../../../utils/API/modelos/usuario';

// Algoritmos utiles
import {
    buscarRegistroVinculado
} from '../../../../utils/busquedaAcomodo';

export default function FormModificarUsuario(
    props: {
        registro: Usuario,
        elementosOpciones: Empleado[],
        onModificarRegistro: Function,
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
        username,
        setUsername
    ] = React.useState(undefined);

    const [
        password,
        setPassword
    ] = React.useState(undefined);

    const [
        confirmarPassword,
        setConfirmarPassword
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

    const [
        auxConfirmarPassword,
        setAuxConfirmarPassword
    ] = React.useState(undefined);

    const [
        idRegistroVinculado,
        setIdRegistroVinculado
    ] = React.useState(
        props.registro.idRegistroEmpleadoVinculado
    );

    // Use Effect de la autogeneracion del username.
    React.useEffect(() => {
        if(autoGenerarUsername) {
            const registroVinculado = buscarRegistroVinculado(
                idRegistroVinculado,
                props.elementosOpciones
            );

            props.onAutogenerarUsername(
                registroVinculado,
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
            const registroVinculado = buscarRegistroVinculado(
                idRegistroVinculado,
                props.elementosOpciones
            );

            props.onAutogenerarPassword(
                registroVinculado,
                setPassword
            );

            setConfirmarPassword("");

            setAuxPassword(password);

            setAuxConfirmarPassword(confirmarPassword);

        } else {
            setPassword(auxPassword);

            setConfirmarPassword(auxConfirmarPassword)
        }

    }, [
        autoGenerarPassword
    ]);

    // Control para mostrar la contraseña.
    const mostrarPassword = (
        mostrar: boolean
    ) => {
        return mostrar ? "text" : "password";
    };

    return(
        <Form onSubmit={(evento) => {
            evento.preventDefault();
            props.onModificarRegistro(
                evento,
                props.registro,
                props.registro.id
            );
            props.toggleModal();
        }}>
            {/*Input de id de empleado*/}
            <FormGroup>
                <Label for="idEmpleado">
                    Selecciona un usuario al que registrar como usuario
                </Label>

                <Input
                    name="seleccionIdEmpleado"
                    id="idEmpleado"
                    type="select"
                    defaultValue={props.registro.idRegistroEmpleadoVinculado}
                    onChange={(evento) => {setIdRegistroVinculado(parseInt(
                        evento.target.value
                    ))}}
                >
                    {props.elementosOpciones.map((
                        registro: Empleado
                    ) => {
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
                    defaultValue={props.registro.nombreUsuario}
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
                    Cambiar contraseña de usuario
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

            {/*Input de confirmacion de contraseña de usuario.*/}
            <FormGroup>
                <Label for="password">
                    Confirmar nueva contraseña
                </Label>

                <Input
                    id="password"
                    name="campoDeCambioDePassword"
                    type={mostrarPassword(mostrarContra)}
                    disabled={autoGenerarPassword}
                    value={confirmarPassword}
                    onChange={(evento) => {setConfirmarPassword(
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