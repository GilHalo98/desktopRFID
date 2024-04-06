function formatearDatos(
    rawData: any[],
    camposSeleccionados: any[],
    metadataAgregada: any[]
) {
    // Generamos una lista auxiliar para darle formato al registro de roles.
    const registros: any = [];

    // Si no hay datos que formatear.
    if(!rawData) {
        // Retorna una lista vacia.
        return registros;
    }

    // Por cada registro de rol.
    for (let i = 0; i < rawData.length; i++) {
        // Recuperamos el rol.
        const registro = rawData[i];

        // Campos seleccionados.
        const campos = [];

        // Metadata guardada.
        const metadatos = Object();

        // Datos requeridos del registro.
        for(let j = 0; j < camposSeleccionados.length; j++) {
            // Agregamos el campo.
            var campo = registro[camposSeleccionados[j]];

            // Nombre del campo.
            var nombreCampo = camposSeleccionados[j][0];

            // Si hay sub-campos, se toman en cuenta para mostrarlos en la lista.
            if(camposSeleccionados[j].length > 1) {
                // Se recupera el sub-campo.
                const subRegistro = registro[camposSeleccionados[j][0]];

                // Se agregan los campos.
                for (let k = 1; k < camposSeleccionados[j].length; k++) {
                    campo = subRegistro[camposSeleccionados[j][k]];
                    // Nombre del campo.
                    nombreCampo = camposSeleccionados[j][k];
                }
            }

            // Si el nombre del campo del metadata coincide, se agrega.
            if(metadataAgregada.indexOf(nombreCampo) !== -1) {
                metadatos[nombreCampo] = campo;
            }

            // Incluimos el dato del registro.
            campos.push(campo);
        }

        // Reformateamos los datos y lo guardamos en la lista de roles.
        registros.push({
            data: campos,
            metadata: metadatos
        });
    }

    registros.map((registro: any, index: number) => {
        registro.metadata.indexRegistro = index;
    });

    return registros;
};

function selectorColorReporteAccesos(metadata: any) {
    const enumReporte = (
        !metadata.idTipoReporteVinculado ? metadata.idTipoReporteVinculado : parseInt(metadata.idTipoReporteVinculado)
    );
    var colorColumna = '';
    switch(enumReporte) {
        case 1:
            colorColumna = 'table-info';
            break;

        case 2:
            colorColumna = 'table-success';
            break;

        case 3:
            colorColumna = 'table-danger';
            break;

        default:
            break;
    }
    return colorColumna;
};

export {
    formatearDatos,
    selectorColorReporteAccesos
};