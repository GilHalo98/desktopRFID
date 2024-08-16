// Modelo de datos.
import { Button } from "reactstrap";
import {
    Detalle,
    HorasTrabajadas
} from "../../../../utils/API/respuestas/horasTrabajadas";
import { numeroDiaANombreDia } from "../../../../utils/conversiones";

const dateStringToDateObject = (dateString: string) => {
    if(!dateString) {
        return null;
    }

    const fechaFormateada = new Date();

    const componentes = dateString.replaceAll('.000Z', '').split('T');

    const fecha = componentes[0].split('-').map((dato: string) => {
        return parseInt(dato);
    });
    const hora = componentes[1].split(':').map((dato: string) => {
            return parseInt(dato);
    });

    fechaFormateada.setFullYear(fecha[0], fecha[1], fecha[2]);
    fechaFormateada.setHours(hora[0], hora[1], hora[2]);

    return fechaFormateada;
};

const renderCeldasDias = (
    fecha: Date,
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
            {fecha.toLocaleString()}
        </Button>;
    }

    if(salioTarde) {
        // En caso de que exista fecha, retornamos el indicador del dia y la
        // fecha del registro.
        return <Button color='primary' block size='sm'>
            {fecha.toLocaleString()}
        </Button>;
    }

    // En caso de que exista fecha, retornamos el indicador del dia y la
    // fecha del registro.
    return <Button color='success' block size='sm'>
        {fecha.toLocaleString()}
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
        if(registro.esDescanso) {
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

        // Generamos un objeto fecha para cada fecha de registro.
        const entrada = dateStringToDateObject(
            registro.detalle.entrada
        );

        const inicioDescanso = dateStringToDateObject(
            registro.detalle.inicioDescanso
        );

        const finDescanso = dateStringToDateObject(
            registro.detalle.finDescanso
        );

        const salida = dateStringToDateObject(
            registro.detalle.salida
        );

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
                        inicioDescanso,
                        false,
                        false
                    )}
                </td>

                <td style={{textAlign: 'center'}}>
                    {renderCeldasDias(
                        finDescanso,
                        false,
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