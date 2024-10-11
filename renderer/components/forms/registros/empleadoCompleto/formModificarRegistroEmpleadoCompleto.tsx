// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Form, Container
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

import {
    EmpleadoCompleto
} from '../../../../utils/API/respuestas/empleadoCompleto';
import { consultarRegistros } from './logic/registros';
import IndicadorCargaSpinner from '../../../cargas/indicadorCargaSpinner';

export default function FormModificarRegistroEmpleadoCompleto(
    props: {
        idRegistro: number
        elementosOpciones: Rol[],
        onGuardarRegistro: Function,
        onAutogenerarPassword: Function,
        onAutogenerarUsername: Function,
        toggleModal: Function,
    }
) {
    // Hook de los datos del registro del empleado.
    const [
        registroEmpleado,
        setRegistroEmpleado
    ] = React.useState({} as EmpleadoCompleto);

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

    // Hook que indica si los datos estan en carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(true);

    // Permite refrescar la vista.
    React.useEffect(() => {
        console.log('refresh COMPONENTE');

        // Consultamos los datos del registro del empleado.
        consultarRegistros(
            setRegistroEmpleado,
            setRegistrarUsuario,
            setEnCarga,
            {
                id: props.idRegistro.toString()
            }
        );
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

                {enCarga? <IndicadorCargaSpinner/> : <>
                    <div style={{display: mostrarFormEmpleado? '' : 'none'}}>
                        <FormRegistroEmpleado
                            registro={registroEmpleado}
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
                            registro={registroEmpleado.usuario}
                            registrarUsuario={registrarUsuario}
                            datosAutogenerar={datosAutogenerar}
                        />
                    </div>

                    <div style={{display: mostrarFormHorario? '' : 'none'}}>
                        <FormRegistroHorario
                            registro={registroEmpleado.horario}
                        />
                    </div>
                </>}

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