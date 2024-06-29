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
    RegistrarEmpleado,
    RemoverEmpleado
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
    evento: any,
    refresh: boolean,
    setRefresh: Function
) => {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datosRegistro = new FormData();

    datosRegistro.append(
        'nombres',
        evento.target[0].value
    );
    datosRegistro.append(
        'apellidoPaterno',
        evento.target[1].value
    );
    datosRegistro.append(
        'apellidoMaterno',
        evento.target[2].value
    );
    datosRegistro.append(
        'numeroTelefonico',
        evento.target[3].value
    );
    datosRegistro.append(
        'fechaNacimiento',
        evento.target[4].value
    );
    datosRegistro.append(
        'idRolVinculado',
        evento.target[5].value
    );

    // Registramos el permiso en la base de datos.
    RegistrarEmpleado(
        datosRegistro,
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

// Modificamos un registro de la base de datos
// y guardamos los cambios realizados.
const modificarRegistro = (
    evento: any,
    idRegistro: number,
    refresh: boolean,
    setRefresh: Function
) => {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

    datosModificaion.append(
        'nombres',
        evento.target[0].value
    );
    datosModificaion.append(
        'apellidoPaterno',
        evento.target[1].value
    );
    datosModificaion.append(
        'apellidoMaterno',
        evento.target[2].value
    );
    datosModificaion.append(
        'numeroTelefonico',
        evento.target[3].value
    );
    datosModificaion.append(
        'fechaNacimiento',
        evento.target[5].value
    );
    datosModificaion.append(
        'idRolVinculado',
        evento.target[6].value
    );
    datosModificaion.append(
        'idImagenVinculado',
        evento.target[7].value
    );

    // Registramos el permiso en la base de datos.
    ModificarEmpleado(
        idRegistro,
        datosModificaion,
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
    }
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
            setListaRegistros([]);
            setEnCarga(true);
        },
        undefined
    );
};

// Consultamos los roles de los empleados.
const consultarRegistrosRoles = (
    setListaRoles: Function,
    setEnCarga: Function
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
            setListaRoles([]);
            setEnCarga(true);
        },
        () => {
            setEnCarga(false);
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
    consultarRegistrosRoles
};