// Evento regresado por el form.
import { SyntheticEvent } from "react";

// Formatea los datos del registro.
import {
    exportarDatosTabla,
    formatearDatos
} from "../../../../utils/formatDataTabla";

// Modelo de permiso
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
            (respuesta) => {exportarDatosTabla(
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

    // Lista de dias.
    const listaDias = [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo'
    ];

    // Registros de formularios.
    const datosRegistro = new FormData();

    // Guardamos el registro de la imagen del empleado.
    datosRegistro.append(
        'file',
        evento.target[0].files[0]
    );

    // Guardamos los datos del registro del empleado.
    datosRegistro.append('nombres', evento.target[1].value);
    datosRegistro.append('apellidoPaterno', evento.target[2].value);
    datosRegistro.append('apellidoMaterno', evento.target[3].value);
    datosRegistro.append('numeroTelefonico', evento.target[4].value);
    datosRegistro.append('fechaNacimiento', evento.target[5].value);
    datosRegistro.append('idRolVinculado', evento.target[6].value);

    // Guardamos los datos del registro del usuario.
    datosRegistro.append('nombreUsuario', evento.target[7].value);
    datosRegistro.append('password', evento.target[9].value);

    // Guardamos los datos del registro del horario.
    datosRegistro.append('descripcionHorario', "Prueba de registro de horarios");
    datosRegistro.append('tolerancia', evento.target[12].value);

    // Si las horas de entrada, salida y descanso son similares para
    // toda la semana.
    if (evento.target[13].checked) {
        // Recuperamos los datos que seran similares para todos los dias
        // de la semana.
        const horaEntrada = evento.target[14].value;
        const horaSalidaDescanso = evento.target[15].value;
        const horaEntradaDescanso = evento.target[16].value;
        const HoraSalida = evento.target[17].value;

        // Esto nos permite iterar entre los nombres de los dias.
        let indexDia = 0;

        // Los campos para identificar los dias empiezan en el index
        // 18 hasta el 24, iteramos entre cada uno de ellos.
        for (let index = 18; index <= 24; index++) {
            // Desempaquetamos los datos.
            const id: string = evento.target[index].id;
            const checked: string = evento.target[index].checked? '1' : '0';

            // Agregamos el valor si el dia es laborado o descanso.
            datosRegistro.append(
                id,
                checked
            );

            // Si el dia es laborado, mandamos la hora de entrada
            // y salida, asi como la hora de descanso
            if(!evento.target[index].checked) {
                datosRegistro.append(
                    'horaEntrada' + listaDias[indexDia],
                    horaEntrada
                );
                datosRegistro.append(
                    'horaSalidaDescanso' + listaDias[indexDia],
                    horaSalidaDescanso
                );
                datosRegistro.append(
                    'horaEntradaDescanso' + listaDias[indexDia],
                    horaEntradaDescanso
                );
                datosRegistro.append(
                    'horaSalida' + listaDias[indexDia],
                    HoraSalida
                );
            }

            // Cambiamos de dia.
            indexDia++;
        }

    // Si son diferentes, iteramos por todos los campos que representen
    // la semana y los agregamos al form.
    } else {
        // Los campos del dia, si es descanso, entrada, salida y
        // hora de descanso empiezan en el index 14 hasta el 48.
        for (let index = 14; index <= 48; index++) {
            // Si el campo es de tipo check.
            if (evento.target[index].className == 'form-check-input') {
                // Desempaquetamos los datos.
                const id: string = evento.target[index].id;
                const checked: string = evento.target[index].checked? '1' : '0';

                // Agregamos el valor si el dia es laborado o descanso.
                datosRegistro.append(
                    id,
                    checked
                );

                // Si el dia es dia descansado, entonces
                // saltamos los proximos 4 campos que indican hora de
                // entrada, salida y hora de descanso.
                if(evento.target[index].checked) {
                    index += 4;
                }

            } else {
                // Si no es un check, agregamos el valor almacenado en
                // el campo.
                datosRegistro.append(
                    evento.target[index].id,
                    evento.target[index].value
                );
            }
        }
    }

    console.log('hola');

    // Enviamos el registro al api.
    RegistrarEmpleadoCompleto(
        datosRegistro,
        (respuesta: any) => {
            console.log('hola');
            console.log(respuesta);
        }
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

    console.log(evento);

    // Lista de dias.
    const listaDias = [
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado',
        'Domingo'
    ];

    // Registros de formularios.
    const datosModificaion = new FormData();

    // Guardamos el registro de la imagen del empleado.
    datosModificaion.append(
        'file',
        evento.target[0].files[0]
    );

    // Guardamos los datos del registro del empleado.
    datosModificaion.append('nombres', evento.target[1].value);
    datosModificaion.append('apellidoPaterno', evento.target[2].value);
    datosModificaion.append('apellidoMaterno', evento.target[3].value);
    datosModificaion.append('numeroTelefonico', evento.target[4].value);
    datosModificaion.append('fechaNacimiento', evento.target[5].value);
    datosModificaion.append('idRolVinculado', evento.target[6].value);

    // Guardamos los datos del registro del usuario.
    datosModificaion.append('nombreUsuario', evento.target[7].value);
    datosModificaion.append('password', evento.target[9].value);

    // Guardamos los datos del registro del horario.
    datosModificaion.append('descripcionHorario', "Prueba de registro de horarios");
    datosModificaion.append('tolerancia', evento.target[12].value);

    // Si las horas de entrada, salida y descanso son similares para
    // toda la semana.
    if (evento.target[13].checked) {
        // Recuperamos los datos que seran similares para todos los dias
        // de la semana.
        const horaEntrada = evento.target[14].value;
        const horaSalidaDescanso = evento.target[15].value;
        const horaEntradaDescanso = evento.target[16].value;
        const HoraSalida = evento.target[17].value;

        // Esto nos permite iterar entre los nombres de los dias.
        let indexDia = 0;

        // Los campos para identificar los dias empiezan en el index
        // 18 hasta el 24, iteramos entre cada uno de ellos.
        for (let index = 18; index <= 24; index++) {
            // Desempaquetamos los datos.
            const id: string = evento.target[index].id;
            const checked: string = evento.target[index].checked? '1' : '0';

            // Agregamos el valor si el dia es laborado o descanso.
            datosModificaion.append(
                id,
                checked
            );

            // Si el dia es laborado, mandamos la hora de entrada
            // y salida, asi como la hora de descanso
            if(!evento.target[index].checked) {
                datosModificaion.append(
                    'horaEntrada' + listaDias[indexDia],
                    horaEntrada
                );
                datosModificaion.append(
                    'horaSalidaDescanso' + listaDias[indexDia],
                    horaSalidaDescanso
                );
                datosModificaion.append(
                    'horaEntradaDescanso' + listaDias[indexDia],
                    horaEntradaDescanso
                );
                datosModificaion.append(
                    'horaSalida' + listaDias[indexDia],
                    HoraSalida
                );
            }

            // Cambiamos de dia.
            indexDia++;
        }

    // Si son diferentes, iteramos por todos los campos que representen
    // la semana y los agregamos al form.
    } else {
        // Los campos del dia, si es descanso, entrada, salida y
        // hora de descanso empiezan en el index 14 hasta el 48.
        for (let index = 14; index <= 48; index++) {
            // Si el campo es de tipo check.
            if (evento.target[index].className == 'form-check-input') {
                // Desempaquetamos los datos.
                const id: string = evento.target[index].id;
                const checked: string = evento.target[index].checked? '1' : '0';

                // Agregamos el valor si el dia es laborado o descanso.
                datosModificaion.append(
                    id,
                    checked
                );
                // Si el dia es dia descansado, entonces
                // saltamos los proximos 4 campos que indican hora de
                // entrada, salida y hora de descanso.
                if(evento.target[index].checked) {
                    index += 4;
                }

            } else {
                // Si no es un check, agregamos el valor almacenado en
                // el campo.
                datosModificaion.append(
                    evento.target[index].id,
                    evento.target[index].value
                );
            }
        }
    }

    // Registramos el permiso en la base de datos.
    ModificarEmpleadoCompleto(
        idRegistro,
        datosModificaion,
        (resp) => {
            console.log(resp)

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
