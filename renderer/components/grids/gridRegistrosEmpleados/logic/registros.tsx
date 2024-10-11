// Evento regresado por el form.
import { SyntheticEvent } from "react";

// Formatea los datos del registro.
import {
    exportarDatosTabla,
    formatearDatos
} from "../../../../utils/formatDataTabla";

// Busca elementos de cierto tipo en elementos html.
import {
    buscarElementosHTML,
    formatearFormulario
} from "../../../../utils/funcionalidadHTML";

// Cambia el numero del dia al nombre del dia.
import {
    numeroDiaANombreDia
} from "../../../../utils/conversiones";

// Modelo de datos
import {
    Rol
} from "../../../../utils/API/modelos/rol";

import {
    Empleado
} from "../../../../utils/API/modelos/empleado";

// Importamos la interfaz con la API.
import {
    ConsultaRol
} from "../../../../utils/API/interface/rol";

import {
    ConsultaEmpleado,
    ModificarEmpleado,
    RemoverEmpleado,
    RegistrarEmpleadoCompleto,
    ModificarEmpleadoCompleto
} from "../../../../utils/API/interface/empleado";

// Registros que se mostraran en la tabla.
const formatearRegistros = (
    listaRegistros: any[]
) => {
    return formatearDatos(
        listaRegistros,
        [
            ['id'],
            ['nombres'],
            ['apellidoPaterno'],
            ['apellidoMaterno'],
            ['numeroTelefonico'],
            ['edad'],
            ['fechaNacimiento'],
            ['idRolVinculado'],
            ['idImagenVinculada'],
            ['fechaRegistroEmpleado'],
            ['fechaModificacionEmpleado']
        ],
        ['id', 'indexRegistro']
    );
};

// Exportamos los datos a formato excel.
const exportarDatos = (
    exportarDatosEnVista: boolean,
    datosRegistro: Empleado[],
    cabeceras: string[],
    setEnCarga: Function
) => {
    if(exportarDatosEnVista) {
        exportarDatosTabla(
            datosRegistro,
            cabeceras,
            formatearRegistros
        );

    } else {
        ConsultaEmpleado(
            (respuesta: any) => {exportarDatosTabla(
                respuesta.registros,
                cabeceras,
                formatearRegistros
            )},
            {},
            (error) => {
                console.log(error);
                setEnCarga(false);
            }
        );
    }
};

// Guarda un registro en la base de datos.
const guardarRegistro = (
    evento: SyntheticEvent,
    refresh: boolean,
    setRefresh: Function
) => {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
    */

    // Listamos los elementos del formulario.
    const listaElementosFormulario: HTMLInputElement [] = buscarElementosHTML(
        evento.target as HTMLFormElement,
        ['INPUT', 'SELECT']
    );

    // Formateamos los datos del formulario.
    const formulario: any = formatearFormulario(
        listaElementosFormulario,
        {
            Empleado: {},
            Usuario: {},
            Horario: {
                Lunes: {},
                Martes: {},
                Miercoles: {},
                Jueves: {},
                Viernes: {},
                Sabado: {},
                Domingo: {}
            }
        }
    );

    // Registros de formularios.
    const datosRegistro = new FormData();

    // Guardamos el registro de la imagen del empleado.
    datosRegistro.append(
        'file',
        evento.target[0].files[0]
    );

    // Guardamos los datos del registro del empleado.
    datosRegistro.append('nombres', formulario.Empleado.nombreEmpleado);
    datosRegistro.append('apellidoPaterno', formulario.Empleado.apellidoPaternoEmpleado);
    datosRegistro.append('apellidoMaterno', formulario.Empleado.apellidoMaternoEmpleado);
    datosRegistro.append('numeroTelefonico', formulario.Empleado.numeroEmpleado);
    datosRegistro.append('fechaNacimiento', formulario.Empleado.nacimientoEmpleado);
    datosRegistro.append('idRolVinculado', formulario.Empleado.rolEmpleado);

    // Guardamos los datos del registro del usuario.
    datosRegistro.append('nombreUsuario', formulario.Usuario.nombreUsuario);
    datosRegistro.append('password', formulario.Usuario.passwordUsuario);

    // Guardamos los datos del registro del horario.
    datosRegistro.append('tolerancia', formulario.Horario.tiempoToleranciaHorario);
    datosRegistro.append(
        'descripcionHorario',
        `Registro de horario de ${
            formulario.Empleado.nombreEmpleado
        } ${
            formulario.Empleado.apellidoPaternoEmpleado
        } ${
            formulario.Empleado.apellidoMaternoEmpleado
        }`
    );

    // Si los dias de trabajo son distintos.
    for(let i = 0; i < 7; i ++) {
        // Instanciamos el nombre del dia.
        const dia: string = numeroDiaANombreDia(i + 1);

        // Agregamos el valor si el dia es laborado o descanso.
        datosRegistro.append(
            `esDescanso${dia}`,
            formulario.Horario[dia][`esDescansoHorario${dia}`]
        );

        // Agregamos la hora de entrada del empleado.
        datosRegistro.append(
            `horaEntrada${dia}`,
            formulario.Horario.diasSimilaresHorario?
            formulario.Horario[`horaEntradaHorario`] : formulario.Horario[
                dia
            ][`horaEntradaHorario${dia}`]
        );

        // Agregamos la hora de salida del empleado.
        datosRegistro.append(
            `horaSalida${dia}`,
            formulario.Horario.diasSimilaresHorario?
            formulario.Horario[`horaSalidaHorario`] : formulario.Horario[
                dia
            ][`horaSalidaHorario${dia}`]
        );
    }

    // Registramos el permiso en la base de datos.
    RegistrarEmpleadoCompleto(
        datosRegistro,
        (respuesta: any) => {
            console.log(respuesta);
        },
        (error: any) => {console.log(
            error
        )},
        undefined,
        () => {setRefresh(
            !refresh
        )},
    );
};

// Modificamos un registro de la base de datos
// y guardamos los cambios realizados.
const modificarRegistro = (
    evento: SyntheticEvent,
    idRegistro: number,
    refresh: boolean,
    setRefresh: Function
) => {
    /**
     * Modificamos el registro pasado por evento.
     */

    // Listamos los elementos del formulario.
    const listaElementosFormulario: HTMLInputElement [] = buscarElementosHTML(
        evento.target as HTMLFormElement,
        ['INPUT', 'SELECT']
    );

    // Formateamos los datos del formulario.
    const formulario: any = formatearFormulario(
        listaElementosFormulario,
        {
            Empleado: {},
            Usuario: {},
            Horario: {
                Lunes: {},
                Martes: {},
                Miercoles: {},
                Jueves: {},
                Viernes: {},
                Sabado: {},
                Domingo: {}
            }
        }
    );

    // Registros de formularios.
    const datosModificaion = new FormData();

    // Guardamos el registro de la imagen del empleado.
    datosModificaion.append(
        'file',
        evento.target[0].files[0]
    );

    // Guardamos los datos del registro del empleado.
    datosModificaion.append('idEmpleado', idRegistro.toString());
    datosModificaion.append('nombres', formulario.Empleado.nombreEmpleado);
    datosModificaion.append('apellidoPaterno', formulario.Empleado.apellidoPaternoEmpleado);
    datosModificaion.append('apellidoMaterno', formulario.Empleado.apellidoMaternoEmpleado);
    datosModificaion.append('numeroTelefonico', formulario.Empleado.numeroEmpleado);
    datosModificaion.append('fechaNacimiento', formulario.Empleado.nacimientoEmpleado);
    datosModificaion.append('idRolVinculado', formulario.Empleado.rolEmpleado);

    // Guardamos los datos del registro del usuario.
    datosModificaion.append('nombreUsuario', formulario.Usuario.nombreUsuario);
    datosModificaion.append('password', formulario.Usuario.passwordUsuario);

    // Guardamos los datos del registro del horario.
    datosModificaion.append('tolerancia', formulario.Horario.tiempoToleranciaHorario);
    datosModificaion.append(
        'descripcionHorario',
        `Registro de horario de ${
            formulario.Empleado.nombreEmpleado
        } ${
            formulario.Empleado.apellidoPaternoEmpleado
        } ${
            formulario.Empleado.apellidoMaternoEmpleado
        }`
    );

    // Si los dias de trabajo son distintos.
    for(let i = 0; i < 7; i ++) {
        // Instanciamos el nombre del dia.
        const dia: string = numeroDiaANombreDia(i + 1);

        // Agregamos el valor si el dia es laborado o descanso.
        datosModificaion.append(
            `esDescanso${dia}`,
            formulario.Horario[dia][`esDescansoHorario${dia}`]
        );

        // Agregamos la hora de entrada del empleado.
        datosModificaion.append(
            `horaEntrada${dia}`,
            formulario.Horario.diasSimilaresHorario?
            formulario.Horario[`horaEntradaHorario`] : formulario.Horario[
                dia
            ][`horaEntradaHorario${dia}`]
        );

        // Agregamos la hora de salida del empleado.
        datosModificaion.append(
            `horaSalida${dia}`,
            formulario.Horario.diasSimilaresHorario?
            formulario.Horario[`horaSalidaHorario`] : formulario.Horario[
                dia
            ][`horaSalidaHorario${dia}`]
        );
    }

    // Registramos el permiso en la base de datos.
    ModificarEmpleadoCompleto(
        idRegistro,
        datosModificaion,
        (respuesta: any) => {
            console.log(respuesta);
        },
        (error: any) => {console.log(
            error
        )},
        undefined,
        () => {setRefresh(
            !refresh
        )},
    );
};

// Eliminamos un registro de la base de datos.
const eliminarRegistro = (
    idRegistro: number,
    refresh: boolean,
    setRefresh: Function
) => {
    RemoverEmpleado(
        idRegistro,
        undefined,
        (error: any) => {console.log(
            error
        )},
        undefined,
        () => {setRefresh(
            !refresh
        )},
    );
};

// Consulta los registros de los permisos filtrados.
const consultarRegistros = (
    setListaRegistros: Function,
    setTotalPaginas: Function,
    setEnCarga: Function,
    querry: {
        limit?: number,
        offset?: number,
        id?: string,
        nombres?: string,
        numeroTelefonico?: string,
        apellidoPaterno?: string,
        apellidoMaterno?: string,
        idRolVinculado?: number
    },
    consultaConcatenada?: Function
) => {
    return ConsultaEmpleado(
        (respuesta: any) => {
            setListaRegistros(respuesta.registros);
            setTotalPaginas(Math.ceil(
                respuesta.totalRegistros / querry.limit
            ));
        },
        querry,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaRegistros(null);
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

// Consultamos los roles de los empleados.
const consultarRegistrosVinculados = (
    setListaRoles: Function,
    setEnCarga: Function,
    consultaConcatenada?: Function
) => {
    return ConsultaRol(
        (respuesta: any) => {setListaRoles(
            respuesta.registros
        )},
        undefined,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setEnCarga(true);
        },
        () => {
            if(!consultaConcatenada) {
                setEnCarga(false);
            } else {
                consultaConcatenada();
            }
        }
    );
};

export {
    formatearRegistros,
    exportarDatos,
    guardarRegistro,
    modificarRegistro,
    eliminarRegistro,
    consultarRegistros,
    consultarRegistrosVinculados
};
