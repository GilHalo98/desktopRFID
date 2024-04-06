import { ModificarTipoReporte, RegistrarTipoReporte } from "../../../../../utils/API/interface/tipoReporte";
import { formatearDatos } from "../../../../../utils/formatDataTabla";

function guardarRegistro(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datosRegistro = new FormData();

    // Recuperamos los datos del registro.
    datosRegistro.append('clasificacionReporte', evento.target[0].value);
    datosRegistro.append('descripcionTipoReporte', evento.target[1].value);

    // Registramos el permiso en la base de datos.
    RegistrarTipoReporte(datosRegistro);
};

function modificarRegistro(evento, idRegistro: number) {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

    // Recuperamos los datos del registro.
    datosModificaion.append('clasificacionReporte', evento.target[0].value);
    datosModificaion.append('descripcionTipoReporte', evento.target[1].value);


    // Registramos el permiso en la base de datos.
    ModificarTipoReporte(idRegistro, datosModificaion);
};

export {
    guardarRegistro,
    modificarRegistro
}