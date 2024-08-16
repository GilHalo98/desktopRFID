// React.
import { SyntheticEvent } from "react";

// Formatea los datos del registro.
import {
    exportarDatosTabla,
    formatearDatos
} from "../../../../utils/formatDataTabla";

// Modelo de datos
import {
    Horario
} from "../../../../utils/API/modelos/horario";

// Importamos la interfaz con la API.
import {
    ConsultaRol
} from "../../../../utils/API/interface/rol";

import {
    ConsultaHorario,
    ConsultaHorarioCompleto,
    ModificarHorarioCompleto
} from "../../../../utils/API/interface/horario";


// Registros que se mostraran en la tabla.
const formatearRegistros = (
    listaRegistros: any[]
) => {
    console.log(listaRegistros);
    return formatearDatos(
        listaRegistros,
        [
            ['id'],
            ['fechaRegistroHorario'],
            ['fechaModificacionHorario'],
            ['fechaRegistroHorario'],
            ['fechaModificacionHorario'],
        ],
        ['id', 'indexRegistro']
    );
};

// Exportamos los datos a formato excel.
const exportarDatos = (
    exportarDatosEnVista: boolean,
    datosRegistro: Horario[],
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
        ConsultaHorario(
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

// Consulta los registros de los permisos filtrados.
const consultarRegistros = (
    setListaRegistros: Function,
    setEnCarga: Function,
    querry: {
        id?: number,
        numeroTelefonico?: string,
        nombres?: string,
        apellidoPaterno?: string,
        apellidoMaterno?: string,
        idRolVinculado?: number
    },
    consultaConcatenada?: Function
) => {
    return ConsultaHorarioCompleto(
        (respuesta: any) => {
            setListaRegistros(respuesta.registro);
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

// Consultamos los registros de las empleados.
const consultarRegistrosVinculados = (
    setListaEmpleados: Function,
    setEnCarga: Function,
    querry: {
        limit?: number,
        offset?: number,
        id?: number,
        rolTrabajador?: string,
        descripcionRol?: string,
        idPermisoVinculado?: number
    },
    consultaConcatenada?: Function
) => {
    return ConsultaRol(
        (respuesta: any) => {setListaEmpleados(
            respuesta.registros
        )},
        querry,
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

// Modificamos un registro del horario.
const modificarRegistro = (
    evento: SyntheticEvent,
    id: number
) => {
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

    // Guardamos los datos del registro del horario.
    /**
     * RECURDA CAMBIAR LA DESCRIPCION DEL HORARIO.
     */
    datosModificaion.append(
        'descripcionHorario',
        'Prueba de registro de horarios'
    );

    datosModificaion.append(
        'tolerancia',
        evento.target[0].value
    );

    // Si las horas de entrada, salida y descanso son similares para
    // toda la semana.
    if (evento.target[1].checked) {
        // Recuperamos los datos que seran similares para todos los dias
        // de la semana.
        const horaEntrada = evento.target[2].value;
        const horaSalidaDescanso = evento.target[3].value;
        const horaEntradaDescanso = evento.target[4].value;
        const HoraSalida = evento.target[5].value;

        // Esto nos permite iterar entre los nombres de los dias.
        let indexDia = 0;

        // Los campos para identificar los dias empiezan en el index
        // 18 hasta el 24, iteramos entre cada uno de ellos.
        for (let index = 6; index <= 12; index++) {
            // Agregamos el valor si el dia es laborado o descanso.
            datosModificaion.append(
                evento.target[index].id,
                evento.target[index].checked?
                    1 : 0
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
        for (let index = 2; index <= 36; index++) {
            // Si el campo es de tipo check.
            if (evento.target[index].className == 'form-check-input') {
                // Agregamos el valor del campo.
                datosModificaion.append(
                    evento.target[index].id,
                    evento.target[index].checked?
                        1 : 0
                );

                // Si el dia es dia descansado,
                // entonces saltamos los proximos 4
                // campos que indican hora de
                // entrada, salida y hora de descanso.
                if(evento.target[index].checked) {
                    index += 4;
                }

            } else {
                // Si no es un check, agregamos el
                // valor almacenado en el campo.
                datosModificaion.append(
                    evento.target[index].id,
                    evento.target[index].value
                );
            }
        }
    }

    ModificarHorarioCompleto(
        id,
        datosModificaion,
        (respuesta) => {
            console.log(respuesta);
        },
        (error) => {
            console.log(error);
        }
    );
};

export {
    formatearRegistros,
    exportarDatos,
    consultarRegistros,
    consultarRegistrosVinculados,
    modificarRegistro
};