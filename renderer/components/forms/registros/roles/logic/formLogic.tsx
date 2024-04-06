import { ModificarRol, RegistrarRol } from "../../../../../utils/API/interface/rol";

function guardarRegistro(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datosRegistro = new FormData();

    datosRegistro.append('rolTrabajador', evento.target[0].value);
    datosRegistro.append('descripcionRol', evento.target[1].value);
    datosRegistro.append('idPermisoVinculado', evento.target[2].value);

    RegistrarRol(datosRegistro);
};

function modificarRegistro(evento, idRegistro: number) {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

    datosModificaion.append('rolTrabajador', evento.target[0].value);
    datosModificaion.append('descripcionRol', evento.target[1].value);
    datosModificaion.append('idPermisoVinculado', evento.target[2].value);

    ModificarRol(idRegistro, datosModificaion);
};

export {
    guardarRegistro,
    modificarRegistro
}