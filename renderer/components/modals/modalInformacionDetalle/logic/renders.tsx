// Componentes de reacstrap.
import { Button } from "reactstrap";

// Modelo de datos.
import {
    HorasTrabajadas
} from "../../../../utils/API/respuestas/horasTrabajadas";

// Funcionalidad.
import {
    fechaStrATiempo,
    numeroDiaANombreDia,
    a12HorasTiempo,
} from "../../../../utils/conversiones";

const renderCeldasDias = (
    fecha: string,
    llegoTarde: boolean,
    salioTarde: boolean
) => {
    /* Renderizamos las celdas de la tabla de dias.*/

    // Si no existe fecha, se retorna un indicador de no hay registro.
    if(!fecha) {
        return <Button color='danger' block size='sm'>
           ¡SIN REGISTRO! 
        </Button>;
    }

    if(llegoTarde) {
        // En caso de que exista fecha, retornamos el indicador del dia y la
        // fecha del registro.
        return <Button color='warning' block size='sm'>
            {fecha}
        </Button>;
    }

    if(salioTarde) {
        // En caso de que exista fecha, retornamos el indicador del dia y la
        // fecha del registro.
        return <Button color='primary' block size='sm'>
            {fecha}
        </Button>;
    }

    // En caso de que exista fecha, retornamos el indicador del dia y la
    // fecha del registro.
    return <Button color='success' block size='sm'>
        {fecha}
    </Button>;
};

// Poblamos el cuerpo de la tabla de dispositivos.
const renderDetalleHorasTrabajadas = (
    registros: HorasTrabajadas[]
) => {
    if(!registros) {
        return <></>;
    }

    return registros.map((registro: HorasTrabajadas) => {
        // Si el dia es marcado como descanso, entonces se retorna un
        // indicador de descanso.
        if(registro.esDescanso
            && !registro.detalle.entrada
            && !registro.detalle.salida
        ) {
            return <tr>
                <td style={{textAlign: 'center'}}>
                    {numeroDiaANombreDia(registro.dia)}
                </td>

                <td colSpan={4} style={{textAlign: 'center'}}>
                    <Button color='secondary' block size='sm'>
                        DESCANSO
                    </Button>
                </td>
            </tr>
        }

        // Si el dia es marcado como falta, entonces se retorna un
        // indicador de falta.
        if(registro.falto) {
            return <tr>
                <td style={{textAlign: 'center'}}>
                    {numeroDiaANombreDia(registro.dia)}
                </td>

                <td colSpan={4} style={{textAlign: 'center'}}>
                    <Button color='danger' block size='sm'>
                        FALTA
                    </Button>
                </td>
            </tr>
        }

        // Si el dia esta fuera de rango.
        if(registro.diaFueraDeRango) {
            return <tr>
                <td style={{textAlign: 'center'}}>
                    {numeroDiaANombreDia(registro.dia)}
                </td>

                <td colSpan={4} style={{textAlign: 'center'}}>
                    <Button color='secondary' block size='sm'>
                        SIN REGISTRO
                    </Button>
                </td>
            </tr>
        }

        // Formateamos las fechas de los registros.
        const entrada = registro.detalle.entrada? a12HorasTiempo(fechaStrATiempo(
             registro.detalle.entrada
        )) : '';

        const salida = registro.detalle.salida? a12HorasTiempo(fechaStrATiempo(
             registro.detalle.salida
        )) : '';

        // Retornamos la fila con los datos de los registros.
        return (
            <tr>
                <td style={{textAlign: 'center'}}>
                    {numeroDiaANombreDia(registro.dia)}
                </td>

                <td style={{textAlign: 'center'}}>
                    {renderCeldasDias(
                        entrada,
                        registro.llegoTarde,
                        false
                    )}
                </td>

                <td style={{textAlign: 'center'}}>
                    {renderCeldasDias(
                        salida,
                        false,
                        registro.salioTarde
                    )}
                </td>

            </tr>
        );
    });
};

export {
    renderDetalleHorasTrabajadas
};