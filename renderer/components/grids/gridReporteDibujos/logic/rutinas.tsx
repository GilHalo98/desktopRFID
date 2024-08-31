// Manipulacion de archivos pdf.
import jsPDF from "jspdf";

// Plantilla del documento de salida.
import Plantilla from "../../../plantillasDocumentos/reporte";


// DataTest.
import {
    NoDibujos
} from "./testData";

// Co-rutina que cuenta el numero de operaciones por registros de dibujos.
const contarOperaciones = (paginas: Pagina[], nombreDibujo: string) => {
    // Total de paginas encontradas con ese nombre de dibujo.
    let conteo: number = 0;

    paginas.map((pagina: Pagina) => {
        if(nombreDibujo == pagina.dibujo.nombre) {
            conteo += 1;
        }
    });

    return conteo;
};

// Co-rutina para insertar hojas en el documento de salida.
const insertarPaginas = async (
    paginas: Pagina[],
    documento: jsPDF,
    orientacionHoja: "p" | "portrait" | "l" | "landscape",
    formatoHoja: string,
    index: number,
    paginasRenderizadas: any[],
    conteo: Object,
    setProgresoRenderizado: Function,
    toggleModalGenerarReporte: Function
) => {
    // Clausula de parada, una vez que ya no queden
    // hojas que agregar para renderizar, entonces terminamos la
    // recurcion.
    if(index <= (paginas.length - 1)) {
        setProgresoRenderizado(
            ((index + 1) / paginas.length) * 100
        );

        // Agregamos una hoja nueva al archivo.
        documento.addPage(
            formatoHoja,
            orientacionHoja
        );

        // Agregamos la renderizacion de una nueva hoja a la lista
        // de paginas renderizadas.
        paginasRenderizadas.push(
            await documento.html(Plantilla(
                paginas[index],
                conteo[paginas[index].dibujo.nombre],
                documento
            ), {
                x: 0,
                y: documento.internal.pageSize.getHeight() * index
            }).then((e: jsPDF) => {
                // Una vez renderizada, llamamos a la funcion
                // de manera recursiva.
                insertarPaginas(
                    paginas,
                    documento,
                    orientacionHoja,
                    formatoHoja,
                    index + 1,
                    paginasRenderizadas,
                    conteo,
                    setProgresoRenderizado,
                    toggleModalGenerarReporte
                );
            })
        );

    } else {
        // Establecemos el progreso del renderizado a 0%.
        setProgresoRenderizado(0);

        // Renderizamos todas las hojas, eliminamos la ultima hoja
        // y guardamos el archivo final.
        Promise.all(paginasRenderizadas).then((respuesta) => {
            while(paginas.length - documento.getNumberOfPages() < 0) {
                documento.deletePage(documento.getNumberOfPages());
            }

            documento.save('prueba.pdf');

            toggleModalGenerarReporte();

        }).catch(error => {
            console.log('error ', error);
        });
    }
};

// Rutina para imprimir el arhcivo en un formato PDF.
const onImprimirArchivo = async (
    paginas: Pagina[],
    paginasNoOk: {
        pagina: Pagina,
        numeroPagina: number
    }[],
    setPaginasNoOk: Function,
    orientacionHoja: "p" | "portrait" | "l" | "landscape",
    unidadesHoja: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc",
    formatoHoja: string,
    toggleModalError: Function,
    setProgresoRenderizado: Function,
    toggleModalGenerarReporte: Function
) => {
    // Flusheamos la lista.
    paginasNoOk.splice(0, paginasNoOk.length);

    // Verificamos que los datos de las paginas esten completos para
    // generar el reporte de manera correcta.
    paginas.map((
        registro: Pagina,
        index: number
    ) => {
        if(!registro.dibujo.directorio) {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1)
            });
            return;
        }

        if(!registro.dibujo.tipo) {
            paginasNoOk.push({
                pagina: registro,
                numeroPagina: (index + 1)
            });
            return;
        }
    });

    setPaginasNoOk(paginasNoOk);

    // Verificamos que todas las paginas esten correctas.
    if(paginasNoOk.length > 0) {
        toggleModalError();
        return;
    }

    // Dicicionario de conteo de operaciones por dibujo.
    const conteo: Object = {};

    // Una ves verificado que las paginas tengan los datos completos,
    // realizamos el conteo de operaciones.
    NoDibujos.map((nombreDibujo: string) => {
        conteo[nombreDibujo] = contarOperaciones(paginas, nombreDibujo);
    });

    // Instanciamso el objeto archivo.
    const documento = new jsPDF(
        orientacionHoja,
        unidadesHoja,
        formatoHoja
    );

    // Inicializamos una lista con las promesas de la
    // renderzacion de las paginas..
    const paginasRenderizadas: any[] = [];

    // De manera recursiva renderizamos las paginas en el archivo.
    insertarPaginas(
        paginas,
        documento,
        orientacionHoja,
        formatoHoja,
        0,
        paginasRenderizadas,
        conteo,
        setProgresoRenderizado,
        toggleModalGenerarReporte
    );
};

// Rutina para crear un nuevo registro de una pagina.
const onAgregarNuevaPagina = (
    paginas: Pagina[],
    setPaginas: Function
) => {
    // Inicializamos el contenido de la pagina.
    const nuevaPagina = {} as Pagina;

    nuevaPagina.programa = {} as Programa;

    nuevaPagina.programa.nombre = '';
    nuevaPagina.programa.programador = '';
    nuevaPagina.programa.ruta = '';
    nuevaPagina.programa.tiempo = '';

    nuevaPagina.dibujo = {} as Dibujo;

    nuevaPagina.dibujo.nombre ='';
    nuevaPagina.dibujo.directorio = '';
    nuevaPagina.dibujo.tipo = '';

    nuevaPagina.herramientas = [] as Herramienta[];

    nuevaPagina.referencias = {} as Referencia;

    nuevaPagina.referencias.montaje = '';
    nuevaPagina.referencias.profundidadHerramienta = '';
    nuevaPagina.referencias.referenciaX = '';
    nuevaPagina.referencias.referenciaY = '';
    nuevaPagina.referencias.referenciaZ = '';

    nuevaPagina.operacion = {} as Operacion;

    nuevaPagina.operacion.actual = '';

    nuevaPagina.notas = '';
    nuevaPagina.cliente = '';
    nuevaPagina.proyecto = '';

    paginas.push(nuevaPagina)

    setPaginas([...paginas]);
};

// Rutina para eliminar el registro de la pagina.
const onEliminarPagina = (
    paginas: Pagina[],
    setPaginas: Function,
    indexPaginaActual: number,
    setIndexPaginaActual: Function
) => {
    paginas.splice(indexPaginaActual, 1);

    if(indexPaginaActual > (paginas.length - 1)) {
        setIndexPaginaActual(paginas.length - 1);
    }

    setPaginas([...paginas]);
};

// Funciones de opciones de los registro.
const onGuardarCambios = (
    pagina: Pagina,
    setPaginas: Function,
    paginas: Pagina[],
    datoNuevo: any,
    dirA?: string | number,
    dirB?: string | number,
    dirC?: string | number
) => {
    // Verificamos que la direccion A en el registro de la pagina
    // se haya pasado para su modificaicon.
    if(typeof dirA != 'undefined') {
        // Verificamos que la direccion B en el registro de la pagina
        // se haya pasado para su modificaicon.
        if(typeof dirB != 'undefined') {
            // Verificamos que la direccion C en el registro de la pagina
            // se haya pasado para su modificaicon.
            if(typeof dirC != 'undefined') {
                // Si la primera, la segunda y tercera direccion
                // fue pasada entonces guardamos los cambios.
                pagina[dirA][dirB][dirC] = datoNuevo;

                // Guardamos los cambios en la lista de paginas.
                setPaginas([...paginas]);

                return;

            }

            // Si la primera y la segunda direccion fue pasada
            // entonces guardamos los cambios.
            pagina[dirA][dirB] = datoNuevo;

            // Guardamos los cambios en la lista de paginas.
            setPaginas([...paginas]);

            return;
        }

        // Si unicamente la primera direccion fue pasada, entonces
        // guardamos los cambios.
        pagina[dirA] = datoNuevo;
    }

    // Guardamos los cambios en la lista de paginas.
    setPaginas([...paginas]);
};

// Rutina para agregar un registro de una herramienta.
const onAgregarHerramienta = (
    pagina: Pagina,
    setPaginas: Function,
    paginas: Pagina[]
) => {
    // Inicializamos el contenido del registro de la herramienta.
    const herramienta = {} as Herramienta;

    herramienta.medida = '';
    herramienta.numero = 'T' + (pagina.herramientas.length + 1);
    herramienta.operacion = '';
    herramienta.tipo = '';

    pagina.herramientas.push(herramienta);

    setPaginas([...paginas]);
};

// Rutina para eliminar un registro de una herramienta.
const onRemoverHerramienta = (
    pagina: Pagina,
    setPaginas: Function,
    paginas: Pagina[],
    index: number
) => {
    pagina.herramientas.splice(index, 1);

    setPaginas([...paginas]);
};

// Duplicamos el contenido de una pagina a otra.
const onDuplicarContenido = (
    index: number,
    indexPaginaActual: number,
    setPaginas: Function,
    paginas: Pagina[],
) => {
    const pagina: Pagina = paginas[index];

    paginas[indexPaginaActual] = structuredClone(pagina);

    setPaginas([...paginas]);
};

export {
    onGuardarCambios,
    onEliminarPagina,
    onImprimirArchivo,
    onDuplicarContenido,
    onAgregarNuevaPagina,
    onAgregarHerramienta,
    onRemoverHerramienta
}
