// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Input, Label,
    Form, FormGroup,
    Container, Row, Col, Button, Spinner
} from 'reactstrap';

// Componentes propios.
import FormRegistroUsuario from './formUsuario';
import FormRegistroHorario from './formHorario';
import FormRegistroEmpleado from './formEmpleado';

// Funcionalidad propia.
import {
    renderBarraBotones,
} from './logic/renders';

// Modelo de datos.
import {
    Rol
} from '../../../../utils/API/modelos/rol';

export default function FormRegistroEmpleadoCompleto(
    props: {
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
    ] = React.useState(true);

    const [
        mostrarFormUsuario,
        setMostrarFormUsuario
    ] = React.useState(false);

    const [
        mostrarFormHorario,
        setMostrarFormHorario
    ] = React.useState(false);

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

    // Hook que indica si se registra un usuario.
    const [
        registrarUsuario,
        setRegistrarUsuario
    ] = React.useState(false);

    // Hooks para autogenerar los datos del usuario.
    const [
        datosAutogenerar,
        setDatosAutogenerar
    ] = React.useState({
        nombre: undefined,
        apellidoPaterno: undefined,
        apellidoMaterno: undefined
    });

    // Permite refrescar la vista.
    React.useEffect(() => {
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

    // Control de render de boton de registor.
    const controlBotonSiguiente = {
        display: (numeroForm < 2? '' : 'none')
    };

    // Control de render de boton de registor.
    const controlBotonRegistro = {
        display: (numeroForm < 2? 'none' : '')
    };

    return(
        <Form onSubmit={(evento: SyntheticEvent) => {
            evento.preventDefault();
            props.toggleModal();

            props.onGuardarRegistro(evento);
        }}>
            <Container>

                <div style={{display: mostrarFormEmpleado? '' : 'none'}}>
                    <FormRegistroEmpleado
                        elementosOpciones={props.elementosOpciones}
                        registrarUsuario={registrarUsuario}
                        setRegistrarUsuario={setRegistrarUsuario}
                        datosAutogenerar={datosAutogenerar}
                        setDatosAutogenerar={setDatosAutogenerar}
                        mostrarRegistrarUsuario
                    />
                </div>

                <div style={{display: mostrarFormUsuario? '' : 'none'}}>
                    <FormRegistroUsuario
                        registrarUsuario={registrarUsuario}
                        datosAutogenerar={datosAutogenerar}
                    />
                </div>

                <div style={{display: mostrarFormHorario? '' : 'none'}}>
                    <FormRegistroHorario/>
                </div>

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