// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button, Spinner
} from 'reactstrap';

// Funcionalidad propia.
import {
    renderBarraBotones,
    renderRegistroEmpleado,
    renderRegistroHorario,
    renderRegistroUsuario,
    renderSpinnerCarga
} from './logic/renders';

// Modelo de datos.
import {
    Rol
} from '../../../../utils/API/modelos/rol';
import { consultarRegistros } from './logic/registros';

export default function FormModificarRegistroEmpleadoCompleto(
    props: {
        idRegistro: string,
        elementosOpciones: Rol[],
        onGuardarRegistro: Function,
        onAutogenerarPassword: Function,
        onAutogenerarUsername: Function,
        toggleModal: Function,
    }
) {
    // Hook del numero de form para el registro.
    const [
        numeroForm,
        setNumeroForm
    ] = React.useState(0);

    // Hooks de muestra de forms.
    const [
        mostrarFormEmpleado,
        setMostrarFormEmpleado
    ] = React.useState(false);

    const [
        mostrarFormUsuario,
        setMostrarFormUsuario
    ] = React.useState(false);

    const [
        mostrarFormHorario,
        setMostrarFormHorario
    ] = React.useState(false);

    const [
        mostrarSpinner,
        setMostarSpinner
    ] = React.useState(true);

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

    // Hook de los datos a registrar.
    const [
        listaDiasDescanso,
        setListaDiasDescanso
    ] = React.useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ]);

    // Hook para indicar si todos los dias tendran horario similar.
    const [
        diasSimilares,
        setDiasSimilares
    ] = React.useState(false);

    const [
        refresh,
        setRefresh
    ] = React.useState(false)

    // Datos del registro.
    const [
        datosRegistro,
        setDatosRegistro
    ] = React.useState(undefined);

    // Permite refrescar la vista.
    React.useEffect(() => {
        console.log('refresh');

    }, [refresh]);

    // Cambiamos el form a renderizar.
    React.useEffect(() => {
        switch(numeroForm) {
            case 0:
                setMostrarFormEmpleado(true);
                setMostrarFormUsuario(false);
                setMostrarFormHorario(false);
                break;

            case 1:
                setMostrarFormEmpleado(false);
                setMostrarFormUsuario(true);
                setMostrarFormHorario(false);
                break;

            case 2:
                setMostrarFormEmpleado(false);
                setMostrarFormUsuario(false);
                setMostrarFormHorario(true);
                break;

            default:
                break;
        }
    }, [numeroForm]);

    // Consultamos los datos del empleado completo.
    React.useEffect(() => {
        consultarRegistros(
            setDatosRegistro,
            (enCarga: boolean) => {
                setMostarSpinner(enCarga);
                setMostrarFormEmpleado(!enCarga);
            },
            {
                id: props.idRegistro
            }
        );
    }, []);

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

    // Control de render de form de empleado.
    const controlFormEmpleado = {
        display: (mostrarFormEmpleado? '' : 'none')
    };

    // Control de render de form de usuario.
    const controlFormUsuario = {
        display: (mostrarFormUsuario? '' : 'none')
    };

    // Control de render de form de horario
    const controlFormHorario = {
        display: (mostrarFormHorario? '' : 'none')
    };

    // Control de carga.
    const controlSpinner = {
        display: (mostrarSpinner? '' : 'none')
    };

    // Control de render de boton de registor.
    const controlBotonSiguiente = {
        display: (numeroForm < 2? '' : 'none')
    };

    // Control de render de boton de registor.
    const controlBotonRegistro = {
        display: (numeroForm < 2? 'none' : '')
    };

    // Esperamos a que los datos sean obtenidos del api.
    if(!datosRegistro) {
        // Mostramos el spinner de carga.
        return(
            <Form onSubmit={(evento: SyntheticEvent) => {
                evento.preventDefault();
                props.toggleModal();

                props.onGuardarRegistro(evento);
            }}>
                <Container>
                    {renderSpinnerCarga(controlSpinner)}
                </Container>
            </Form>
        );
    }

    // Una vez recuperados los datos, mostramos los valores default.
    return(
        <Form onSubmit={(evento: SyntheticEvent) => {
            evento.preventDefault();
            props.toggleModal();

            props.onGuardarRegistro(evento);
        }}>
            <Container>
                {renderRegistroEmpleado(
                    props.elementosOpciones,
                    controlFormEmpleado,
                    datosRegistro
                )}

                {renderRegistroUsuario(
                    controlFormUsuario,
                    autoGenerarUsername,
                    username,
                    setUsername,
                    setAutoGenerarUsername,
                    mostrarPassword,
                    mostrarContra,
                    autoGenerarPassword,
                    password,
                    setAutoGenerarPassword,
                    setMostrarContra,
                    setPassword,
                    datosRegistro.usuario
                )}

                {renderRegistroHorario(
                    controlFormHorario,
                    diasSimilares,
                    setDiasSimilares,
                    listaDiasDescanso,
                    setListaDiasDescanso,
                    refresh,
                    setRefresh,
                    datosRegistro.horario
                )}

                {renderBarraBotones(
                    numeroForm,
                    setNumeroForm,
                    props.toggleModal,
                    controlBotonSiguiente,
                    controlBotonRegistro,
                    (evento: SyntheticEvent) => {
                        setMostrarFormEmpleado(true);
                        setMostrarFormUsuario(true);
                        setMostrarFormHorario(true);

                        setRefresh(!refresh);
                    }
                )}
            </Container>
        </Form>
    );
};
