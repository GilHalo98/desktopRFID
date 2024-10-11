// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Input, Label, FormGroup,
    Container, Row, Col
} from 'reactstrap';

// Rutina de autogenerar password y username
import {
    rutinaAutogenerarPassword,
    rutinaAutogenerarUsername
} from '../../../../utils/autogen';

// Modelo de datos.
import {
    Empleado
} from '../../../../utils/API/modelos/empleado';

import {
    Usuario
} from '../../../../utils/API/modelos/usuario';

export default function FormRegistroUsuario(
    props: {
        elementosOpciones?: Empleado
        registro?: Usuario
        registrarUsuario?: boolean
        datosAutogenerar?: {
            nombre: string
            apellidoPaterno: string
            apellidoMaterno: string
        }
    }
) {
    // Hooks de los datos del usuario.
    const[
        registroUsuario,
        setRegistroUsuario
    ] = React.useState(
        !props.registro?
            {} as Usuario : props.registro
    );

    // Hooks del formulario.
    const [
        mostrarPassword,
        setMostrarPassword
    ] = React.useState(false);

    // Hook de autogenear password para usuario.
    const [
        autogenerarPassword,
        setAutogenerarPassword
    ] = React.useState(false);

    // Hook de autogenear username para usuario.
    const [
        autogenerarUsername,
        setAutogenerarUsername
    ] = React.useState(false);

    // Hooks de los datos del formulario.
    const [
        username,
        setUsername
    ] = React.useState(undefined);

    const [
        oldUsername,
        setOldUsername
    ] = React.useState(undefined);

    const [
        password,
        setPassword
    ] = React.useState(undefined);

    const [
        oldUPassword,
        setOldPassword
    ] = React.useState(undefined);

    return(<>
            {/*Input de nombre de usuario.*/}
            <FormGroup>
                <Label for="nombreUsuario">
                    Nombre de usuario
                </Label>

                <Input
                    id="nombreUsuario"
                    name="campoDeNombreUsuario"
                    type="text"
                    disabled={autogenerarUsername || !props.registrarUsuario}
                    value={username}
                    defaultValue={registroUsuario.nombreUsuario}
                    onChange={(evento: SyntheticEvent) => {
                        const input = evento.target as HTMLInputElement;

                        setUsername(input.value);
                    }}
                />
            </FormGroup>

            {/*Input de autogenerar nombre de usuario.*/}
            <FormGroup switch>
                <Input
                    id="autogenerarNombreUsuario"
                    name="checkAutoGenerarUsername"
                    type="switch"
                    disabled={!props.registrarUsuario}
                    onClick={(evento: SyntheticEvent) => {
                        const input = evento.target as HTMLInputElement;

                        if(input.checked) {
                            setOldUsername(username);

                            setUsername(rutinaAutogenerarUsername(`${
                                props.datosAutogenerar.nombre
                            } ${
                                props.datosAutogenerar.apellidoPaterno
                            } ${
                                props.datosAutogenerar.apellidoMaterno
                            }`));


                        } else {
                            setUsername(oldUsername);
                        }

                        setAutogenerarUsername(
                            input.checked
                        );
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
                    id="passwordUsuario"
                    name="campoDePassword"
                    type={mostrarPassword? 'text' : 'password'}
                    disabled={autogenerarPassword || !props.registrarUsuario}
                    value={password}
                    onChange={(evento: SyntheticEvent) => {
                        const input = evento.target as HTMLInputElement;

                        setPassword(input.value);
                    }}
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
                                id="autogenerarPasswordUsuario"
                                name="checkAutoGenerarPassword"
                                type="switch"
                                disabled={!props.registrarUsuario}
                                onClick={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLInputElement;

                                    if(input.checked) {
                                        setOldPassword(password);

                                        setPassword(rutinaAutogenerarPassword(`${
                                            props.datosAutogenerar.nombre
                                        } ${
                                            props.datosAutogenerar.apellidoPaterno
                                        } ${
                                            props.datosAutogenerar.apellidoPaterno
                                        }`));

                                    } else {
                                        setPassword(oldUPassword)
                                    }

                                    setAutogenerarPassword(
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
                                id="mostrarPasswordUsuario"
                                type="checkbox"
                                disabled={!props.registrarUsuario}
                                onClick={(evento: SyntheticEvent) => {
                                    const input = evento.target as HTMLInputElement;
            
                                    setMostrarPassword(
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
    </>);
};