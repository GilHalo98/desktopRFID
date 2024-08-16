'use client'

// React.
import React, { SyntheticEvent } from 'react';

// Componentes propios.
import FormModificarRegistroHorarioCompleto from '../../forms/registros/horarioCompleto/formModificarRegistroHorarioCompleto';
import ModalModificarRegistroHorarioCompleto from '../../modals/modalHorarioCompleto/modalModificarRegistroHorarioCompleto';
import TablaParaHorarioDeEmpleado from '../tablaParaHorarioDeEmpleado';

// Importamos la funcionalidad de la tabla.
import {
    formatearRegistros,
    exportarDatos,
    consultarRegistros,
    consultarRegistrosVinculados,
    modificarRegistro
} from './logic/registros';

// Modelo de datos.
import {
    Horario
} from "../../../utils/API/modelos/horario";

export default function TablaHorarioEmpelado(
    props: {}
) {
    // Hooks de la lista de los registros.
    const [
        registro,
        setRegistros
    ] = React.useState(null);

    const [
        listaRegistrosVinculados,
        setListaRegistrosVinculados
    ] = React.useState([]);

    // Hooks de la barra de busqueda.
    const [
        id,
        setId
    ] = React.useState(undefined);

    const [
        nombres,
        setNombres
    ] = React.useState(undefined);

    const [
        apellidoPaterno,
        setApellidoPaterno
    ] = React.useState(undefined);

    const [
        apellidoMaterno,
        setApellidoMaterno
    ] = React.useState(undefined);

    const [
        numeroTelefonico,
        setNumeroTelefonico
    ] = React.useState(undefined);

    const [
        idRol,
        setIdRol
    ] = React.useState(undefined);

    // Hooks de las opciones de la tabla.
    const [
        refresh,
        setRefresh
    ] = React.useState(true);

    // Hooks del modal.
    const [
        estadoModalModificarRegistro,
        setEstadoModalModificarRegistro
    ] = React.useState(false);

    // Hook del id del registro para operaciones
    const [
        idRegistroOperacion,
        setIdRegistroOperacion
    ] = React.useState(undefined);

    const [
        registroOperacion,
        setRegistroOperacion
    ] = React.useState(undefined);

    // Hooks de indicacion.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    React.useEffect(() => {
        console.log('refresh');
        setRegistros(null);

        consultarRegistrosVinculados(
            setListaRegistrosVinculados,
            setEnCarga,
            {},
            () => {
            }
        );

    }, [refresh]);

    // Declaramos el useEffect de react para actualizar
    // el contenido de la vista.
    React.useEffect(() => {
        consultarRegistros(
            setRegistros,
            setEnCarga,
            {
                id: id,
                numeroTelefonico: numeroTelefonico,
                nombres: nombres,
                apellidoPaterno: apellidoPaterno,
                apellidoMaterno: apellidoMaterno,
                idRolVinculado: idRol
            }
        );
    }, [
        listaRegistrosVinculados,
        id,
        numeroTelefonico,
        nombres,
        apellidoPaterno,
        apellidoMaterno,
        idRol
    ]);

    // Parametros de la barra de busqueda.
    const parametrosBusqueda = {
        setId: setId,
        setNombres: setNombres,
        setApellidoPaterno: setApellidoPaterno,
        setApellidoMaterno: setApellidoMaterno,
        setNumeroTelefonico: setNumeroTelefonico,
        setIdRol: setIdRol
    };

    // Funciones de la barra de acciones de la tabla.
    const funcionesOpciones = {
        onRefrescarTabla: () => {
            setRefresh(!refresh);
        },
        onModificarRegistro: () => {
            setEstadoModalModificarRegistro(!estadoModalModificarRegistro);
        }
    };

    return(
        <TablaParaHorarioDeEmpleado
            tituloTabla={registro?
                registro.descripcionHorario : 'Registro de horario cargando...'
            }
            registro={registro}
            parametrosBusqueda={parametrosBusqueda}
            elementosOpciones={listaRegistrosVinculados}
            funcionesOpciones={funcionesOpciones}
        >
            {/* Modal para modificar el registor del horario del empleado */}
            <ModalModificarRegistroHorarioCompleto
                nombreTabla={registro?
                    registro.descripcionHorario : 'Cargando...'
                }
                modalActivo={estadoModalModificarRegistro}
                toggleModal={() => {setEstadoModalModificarRegistro(
                    !estadoModalModificarRegistro
                )}}
            >
                <FormModificarRegistroHorarioCompleto
                    registro={registro}
                    onGuardarRegistro={(evento: SyntheticEvent) => {
                        modificarRegistro(evento, id);
                        setRefresh(!refresh);
                    }}
                    toggleModal={() => {setEstadoModalModificarRegistro(
                        !estadoModalModificarRegistro
                    )}}
                />
            </ModalModificarRegistroHorarioCompleto>
        </TablaParaHorarioDeEmpleado>
    );
};