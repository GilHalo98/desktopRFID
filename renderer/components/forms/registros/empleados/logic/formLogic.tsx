import { ModificarEmpleado, RegistrarEmpleado } from "../../../../../utils/API/interface/empleado";

function guardarRegistro(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datosRegistro = new FormData();

    // Recuperamos los datos del registro.
    datosRegistro.append('file', evento.target[0].files[0]);
    datosRegistro.append('nombres', evento.target[1].value);
    datosRegistro.append('apellidoPaterno', evento.target[2].value);
    datosRegistro.append('apellidoMaterno', evento.target[3].value);
    datosRegistro.append('numeroTelefonico', evento.target[4].value);
    datosRegistro.append('fechaNacimiento', evento.target[5].value);
    datosRegistro.append('idRolVinculado', evento.target[6].value);

    // Agregamos el check que indica si se generara un registro de
    // usuario a partir del registro del empleado.
    const generarRegistroUsuario = evento.target[7].checked ? undefined : 'true';
    datosRegistro.append('generarRegistroUsuario', generarRegistroUsuario);

    // Registramos el permiso en la base de datos.
    RegistrarEmpleado(datosRegistro);
};

function modificarRegistro(evento, idRegistro: number) {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

    // Recuperamos los datos del registro.
    datosModificaion.append('file', evento.target[0].files[0]);
    datosModificaion.append('nombres', evento.target[1].value);
    datosModificaion.append('apellidoPaterno', evento.target[2].value);
    datosModificaion.append('apellidoMaterno', evento.target[3].value);
    datosModificaion.append('numeroTelefonico', evento.target[4].value);
    datosModificaion.append('fechaNacimiento', evento.target[5].value);
    datosModificaion.append('idRolVinculado', evento.target[6].value);

    // Registramos el permiso en la base de datos.
    ModificarEmpleado(idRegistro, datosModificaion);
};

export {
    guardarRegistro,
    modificarRegistro
}