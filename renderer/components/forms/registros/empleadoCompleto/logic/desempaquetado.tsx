// Modelo de datos.
import {
    DiaLaboral
} from "../../../../../utils/API/modelos/diaLaboral";

function desempaquetarDiasDescanso(registro: DiaLaboral []) {
    const listaDias: boolean [] = [
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ];

    if(!registro) {
        return listaDias;
    }

    registro.forEach((dia: DiaLaboral) => {
        listaDias[dia.dia - 1] = dia.esDescanso;
    });

    return listaDias;
};

export {
    desempaquetarDiasDescanso
};