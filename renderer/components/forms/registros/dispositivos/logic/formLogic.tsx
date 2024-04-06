import { ModificarIoT, RegistrarIoT } from "../../../../../utils/API/interface/IoT";


function guardarRegistro(evento) {
    /**
     * Creamos un nuevo registro y lo guardamos en la base de datos.
     */

    const datosRegistro = new FormData();

    datosRegistro.append('descripcionDispositivo', evento.target[0].value);
    datosRegistro.append('idZonaVinculada', evento.target[1].value);
    datosRegistro.append('idTipoDispositivoVinculado', evento.target[2].value);

    RegistrarIoT(datosRegistro);
};

function modificarRegistro(evento, idRegistro: number) {
    /**
     * Modificamos el registro pasado por evento.
     */

    const datosModificaion = new FormData();

    datosModificaion.append('descripcionDispositivo', evento.target[0].value);
    datosModificaion.append('idZonaVinculada', evento.target[1].value);
    datosModificaion.append('idTipoDispositivoVinculado', evento.target[2].value);

    ModificarIoT(idRegistro, datosModificaion);
};

export {
    guardarRegistro,
    modificarRegistro
}