import { RespuestaConsultaRol } from "./consultaRol"

export interface RespuestaConsultaEmpleado {
    id: number
    nombres: string
    apellidoPaterno: string
    apellidoMaterno: string
    numeroTelefonico: string
    edad: number
    fechaNacimiento: string
    fechaRegistroEmpleado: string
    fechaModificacionEmpleado: any
    idRolVinculado: number
    idImagenVinculada: number
    rol: RespuestaConsultaRol
  }