import {
    DiaLaboral
} from "../modelos/diaLaboral";

import {
    Horario
} from "../modelos/horario";

export interface HorarioCompleto extends Horario {
    diaLaborals: DiaLaboral[]
};