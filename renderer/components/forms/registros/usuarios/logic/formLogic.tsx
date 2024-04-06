import { ModificarUsuario, RegistrarUsuario } from "../../../../../utils/API/interface/usuarios";

function guardarRegistro(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datosRegistro = new FormData();

    // Recuperamos los datos del registro.
    datosRegistro.append('nombreUsuario', evento.target[0].value);
    datosRegistro.append('password', evento.target[1].value);
    datosRegistro.append('idRegistroEmpleadoVinculado', evento.target[2].value);

    // Registramos el permiso en la base de datos.
    RegistrarUsuario(datosRegistro);
};

function modificarRegistro(evento, idRegistro: number) {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

    // Recuperamos los datos del registro.
    datosModificaion.append('nombreUsuario', evento.target[0].value);
    datosModificaion.append('password', evento.target[1].value);
    datosModificaion.append('idRegistroEmpleadoVinculado', evento.target[2].value);


    // Registramos el permiso en la base de datos.
    ModificarUsuario(idRegistro, datosModificaion);
};

export {
    guardarRegistro,
    modificarRegistro
};