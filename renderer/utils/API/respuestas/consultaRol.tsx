import { Permiso } from "../modelos/permiso"

export interface RespuestaConsultaRol {
    id: number
    rolTrabajador: string
    descripcionRol: string
    fechaRegistroRol: string
    fechaModificacionRol: any
    idPermisoVinculado: number
    permiso: Permiso
  }