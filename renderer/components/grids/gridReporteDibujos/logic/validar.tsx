// Validamos que las paginas esten correctas para su renderizacion en el
// archiv PDF.
const validarPaginas = async (
    paginas: Pagina[],
    paginasNoOk: PaginaNoOk[],
    setPaginasNoOk: Function,
) => {
    // Flusheamos la lista.
    paginasNoOk.splice(0, paginasNoOk.length);

    // Objeto con lisa de operaciones.
    const operacionesPorDibujo: object = {};

    // Mapeamos el nombre del dibujo en el objecto.
    paginas.map((registro: Pagina) => {
        operacionesPorDibujo[registro.dibujo.nombre] = [];
    });

    // Verificamos que los datos de las paginas esten completos para
    // generar el reporte de manera correcta.
    paginas.map((
        registro: Pagina,
        index: number
    ) => {
        // Verificamos que exista cliente.
        if(registro.cliente == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Cliente no definido'
            });
        }

        // Verificamos que exista proyecto.
        if(registro.proyecto == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Proyecto no definido'
            });
        }

        // Verificamos que exista programador.
        if(registro.programa.programador == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Programador no definido'
            });
        }

        // Verificamos que exista ruta del program.
        if(registro.programa.ruta == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Ruta del programa no definida'
            });
        }

        // Verificamos que exista nombre.
        if(registro.programa.nombre == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Programa no definido'
            });
        }

        // Verificamos que exista tiempo.
        if(registro.programa.tiempo == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Tiempo estimado de programa no definido'
            });
        }

        // Verificamos que exista herramientas.
        if(registro.herramientas.length <= 0) {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Definir por lo menos una herramienta'
            });
        }

        // Lista de numero de herramientas usadas.
        const numeroHerraminetasUsadas: string [] = [];

        // Por cada herramienta verificamos que tenga los datos completos.
        registro.herramientas.forEach((herramienta: Herramienta) => {
            // Buscamos si el numero de herramienta ya se uso.
            const numeroRepetido: boolean = numeroHerraminetasUsadas.includes(
                herramienta.numero
            );
                
            // Verificamos que el numero de herramienta no este repetido.
            if(numeroRepetido) {
                paginasNoOk.push({
                    pagina: registro,
                    numeroPagina: (index + 1),
                    razon: 'Numero de herramienta ' + herramienta.numero + ' repetido'
                });
            }

            // Si no esta repetido, se agrega a la lista.
            numeroHerraminetasUsadas.push(herramienta.numero);

            // Verificamos que exista medida.
            if(herramienta.medida == '') {
                paginasNoOk.push({
                    pagina: registro,
                    numeroPagina: (index + 1),
                    razon: 'Medida para la herramienta ' + herramienta.numero + ' no definido'
                });
            }

            // Verificamos que exista operacion.
            if(herramienta.operacion == '') {
                paginasNoOk.push({
                    pagina: registro,
                    numeroPagina: (index + 1),
                    razon: 'Operacion para la herramienta ' + herramienta.numero + ' no definido'
                });
            }

            // Verificamos que exista tipo.
            if(herramienta.tipo == '') {
                paginasNoOk.push({
                    pagina: registro,
                    numeroPagina: (index + 1),
                    razon: 'Tipo de herramienta para ' + herramienta.numero + ' no definido'
                });
            }
        });

        // Verificamos que exista directorio del dibujo.
        if(!registro.dibujo.directorio) {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Directorio de imagen no proporcionado'
            });
        }

        // Verificamos que exista tipo de archivo de dibujo.
        if(registro.dibujo.tipo == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Nombre de dibujo no definido'
            });
        }

        // Verificamos que exista nombre de dibujo.
        if(registro.dibujo.nombre == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Nombre de dibujo no definido'
            });
        }

        // Buscamos si el registro del numero de operacion ya existe.
        const existeNumeroOperacion: boolean = operacionesPorDibujo[
            registro.dibujo.nombre
        ].includes(
            registro.operacion.actual
        );

        // Verificamos que no exista el numero de operacion registrado
        // mas de una vez por pagina.
        if(existeNumeroOperacion) {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Numero de operacion repetido'
            });
        }

        // Si no existe, se agrega a la memoizacion.
        operacionesPorDibujo[registro.dibujo.nombre].push(
            registro.operacion.actual
        );

        // Verificamos que exista profundidadHerramienta.
        if(registro.referencias.profundidadHerramienta == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Profundidad de dibujo no definido'
            });
        }

       // Verificamos que exista montaje.
       if(registro.referencias.montaje == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Montaje no definido'
            });    
        }

       // Verificamos que exista referenciaX.
       if(registro.referencias.referenciaX == '') {
        paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Referencia X no definido'
            });
        }

       // Verificamos que exista referenciaY.
       if(registro.referencias.referenciaY == '') {
        paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Referencia Y no definido'
            });
        }

       // Verificamos que exista referenciaZ.
       if(registro.referencias.referenciaZ == '') {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1),
                razon: 'Referencia Z no definido'
            });
        }
    });

    // Establecemos las paginas que no se validaron exitosamente.
    setPaginasNoOk(paginasNoOk);

    return paginasNoOk.length <= 0;
};

export {
    validarPaginas
};