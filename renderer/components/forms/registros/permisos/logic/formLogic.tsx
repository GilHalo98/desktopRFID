import { ModificarPermiso, RegistrarPermiso } from "../../../../../utils/API/interface/permiso";
import { formatearDatos } from "../../../../../utils/formatDataTabla";

function guardarRegistro(evento) {
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

    datosRegistro.append('descripcionPermiso', evento.target[0].value);
    datosRegistro.append('autorizacion', permisos.toString());

    // Registramos el permiso en la base de datos.
    RegistrarPermiso(datosRegistro);
};

function modificarRegistro(evento, idRegistro: number) {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

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

    datosModificaion.append('descripcionPermiso', evento.target[0].value);
    datosModificaion.append('autorizacion', permisos.toString());

    // Registramos el permiso en la base de datos.
    ModificarPermiso(idRegistro, datosModificaion);
};

export {
    guardarRegistro,
    modificarRegistro
}