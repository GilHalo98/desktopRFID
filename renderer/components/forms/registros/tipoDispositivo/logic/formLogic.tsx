import { ModificarTipoDispositivo, RegistrarTipoDispositivo } from "../../../../../utils/API/interface/tipoDispositivo";

function guardarRegistro(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datosRegistro = new FormData();

    // Recuperamos los datos del registro.
    datosRegistro.append('nombreTipoDispositivo', evento.target[0].value);
    datosRegistro.append('descripcionTipoDispositivo', evento.target[1].value);

    // Registramos el permiso en la base de datos.
    RegistrarTipoDispositivo(datosRegistro);
};

function modificarRegistro(evento, idRegistro: number) {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

    // Recuperamos los datos del registro.
    datosModificaion.append('nombreTipoDispositivo', evento.target[0].value);
    datosModificaion.append('descripcionTipoDispositivo', evento.target[1].value);


    // Registramos el permiso en la base de datos.
    ModificarTipoDispositivo(idRegistro, datosModificaion);
};

export {
    guardarRegistro,
    modificarRegistro
}