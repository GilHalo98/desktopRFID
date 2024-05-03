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
    ConsultaZona
} from "../../../../utils/API/interface/zona";

import {
    ConsultaPermiso,
    ModificarPermiso,
    RegistrarPermiso,
    RemoverPermiso
} from "../../../../utils/API/interface/permiso";

// Registros que se mostraran en la tabla.
const formatearRegistros = (
    listaRegistros: any[]
) => {
    return formatearDatos(
        listaRegistros,
        [
            ['id'],
            ['descripcionPermiso'],
            ['autorizacion'],
            ['fechaRegistroPermiso'],
            ['fechaModificacionPermiso']
        ],
        ['id', 'indexRegistro']
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
        ConsultaPermiso(
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

    // Generamos el permiso a partir de los bits de acceso seleccionados.
    let permisos = 0;

    for (let index = 1; index < evento.target.length - 2; index++) {
        // Por cada campo, a excepcion del primero y los ultimos dos
        // instanciamos el elemento.
        const elemento = evento.target[index];

        // Si el campo esta seleccionado.
        if(elemento.checked) {
            // Acumulamos el bit en el permiso.
            permisos += parseInt(elemento.value);
        }
    }

    datosRegistro.append(
        'descripcionPermiso',
        evento.target[0].value
    );

    datosRegistro.append(
        'autorizacion',
        permisos.toString()
    );

    // Registramos el permiso en la base de datos.
    RegistrarPermiso(
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

    // Generamos el permiso a partir de los
    // bits de acceso seleccionados.
    let permisos = 0;

    for (let index = 1; index < evento.target.length - 2; index++) {
        // Por cada campo, a excepcion del primero y los ultimos dos
        // instanciamos el elemento.
        const elemento = evento.target[index];

        // Si el campo esta seleccionado.
        if(elemento.checked) {
            // Acumulamos el bit en el permiso.
            permisos += parseInt(elemento.value);
        }
    }

    datosModificaion.append(
        'descripcionPermiso',
        evento.target[0].value
    );

    datosModificaion.append(
        'autorizacion',
        permisos.toString()
    );

    // Registramos el permiso en la base de datos.
    ModificarPermiso(
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
    RemoverPermiso(
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
        descripcionPermiso?: string
    }
) => {
    return ConsultaPermiso(
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
const consultarRegistrosZonas = (
    setListaZonas: Function,
    setEnCarga: Function
) => {
    return ConsultaZona(
        (respuesta: any) => {setListaZonas(
            respuesta.registros
        )},
        undefined,
        (error: any) => {
            console.log(error);
            setEnCarga(false);
        },
        () => {
            setListaZonas([]);
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
    consultarRegistrosZonas
};