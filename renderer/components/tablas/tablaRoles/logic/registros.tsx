// Formatea los datos del registro.
import {
    exportarDatosTabla,
    formatearDatos
} from "../../../../utils/formatDataTabla";

// Modelo de permiso
import {
    Permiso
} from "../../../../utils/API/modelos/permiso";

// Importamos la interfaz con la API.
import {
    ConsultaPermiso
} from "../../../../utils/API/interface/permiso";

import {
    ConsultaRol,
    ModificarRol,
    RegistrarRol,
    RemoverRol
} from "../../../../utils/API/interface/rol";

// Registros que se mostraran en la tabla.
const formatearRegistros = (
    listaRegistros: any[]
) => {
    return formatearDatos(
        listaRegistros,
        [
            ['id'],
            ['rolTrabajador'],
            ['descripcionRol'],
            ['fechaRegistroRol'],
            ['fechaModificacionRol']
        ],
        [
            'id',
            'indexRegistro'
        ]
    );
};

// Exportamos los datos a formato excel.
const exportarDatos = (
    exportarDatosEnVista: boolean,
    datosRegistro: Permiso[],
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
        ConsultaRol(
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
        'rolTrabajador',
        evento.target[0].value
    );
    datosRegistro.append(
        'descripcionRol',
        evento.target[1].value
    );
    datosRegistro.append(
        'idPermisoVinculado',
        evento.target[2].value
    );

    // Registramos el permiso en la base de datos.
    RegistrarRol(
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
        'rolTrabajador',
        evento.target[0].value
    );
    datosModificaion.append(
        'descripcionRol',
        evento.target[1].value
    );
    datosModificaion.append(
        'idPermisoVinculado',
        evento.target[2].value
    );

    // Registramos el permiso en la base de datos.
    ModificarRol(
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
    RemoverRol(
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
        id?: number,
        rolTrabajador?: string,
        descripcionRol?: string,
        idPermisoVinculado?: number
    }
) => {
    return ConsultaRol(
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

// Consultamos los registros de las zonas.
const consultarRegistrosPermiso = (
    setListaPermiso: Function,
    setEnCarga: Function
) => {
    return ConsultaPermiso(
        (respuesta: any) => {setListaPermiso(
            respuesta.registros
        )},
        undefined,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaPermiso([]);
            setEnCarga(true);
        },
        () => {setEnCarga(
            false
        )}
    );
};

export {
    formatearRegistros,
    exportarDatos,
    guardarRegistro,
    modificarRegistro,
    eliminarRegistro,
    consultarRegistros,
    consultarRegistrosPermiso
};