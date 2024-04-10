import { Permiso } from "../modelos/permiso"

export interface RespuestaConsultaRol {
    id: number
    rolTrabajador: string
    descripcionRol: string
    bitRol: number
    fechaRegistroRol: string
    fechaModificacionRol: any
    idPermisoVinculado: number
    permiso: Permiso
  }