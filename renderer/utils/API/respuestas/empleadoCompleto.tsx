// Modelo de datos.
import {
    Empleado
} from "../modelos/empleado";

import {
    Usuario
} from "../modelos/usuario";

import {
    HorarioCompleto
} from "./horarioCompleto";

export interface EmpleadoCompleto extends Empleado {
    usuario: Usuario
    horario: HorarioCompleto
};
