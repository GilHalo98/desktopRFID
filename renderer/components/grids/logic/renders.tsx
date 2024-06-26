// Componentes de reactstrap.
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader,
} from "reactstrap";

// Componentes de los renders.
import BarraAccionesGrid from '../../barraBotones/barraAcciones/barraAccionesGrid/barraAccionesGrid';
import ModalOpcionesGrid from '../../modals/modalOpciones/modalOpcionesGrid';
import BarraAccionesTabla from "../../barraBotones/barraAcciones/barraAccionesTabla/barraAccionesTabla";
import Paginacion from "../../paginacion/paginacion";

// Renderiza la paginacion del grid.
const renderPaginacion = (
    paginacion?: {
        paginaActual: number,
        offset: number,
        registrosPorPagina: number,
        totalPaginas: number,
        setPaginaActual: Function,
        setOffset: Function
    }
) => {
    if(typeof paginacion == 'undefined') {
        return null;
    }

    if(paginacion.totalPaginas <= 1) {
        return null;
    }

    return(<Paginacion
        paginaActual={paginacion.paginaActual}
        offset={paginacion.offset}
        registrosPorPagina={paginacion.registrosPorPagina}
        setPaginaActual={paginacion.setPaginaActual}
        setOffset={paginacion.setOffset}
        totalPaginas={paginacion.totalPaginas}
    />);
};

// Renderiza la barra de opciones del grid.
const renderBarraOpciones = (
    toggleModalOpcionesTabla: Function,
    toggleEnCarga?: Function,
    funcionesOpciones?: {
        onAgregarRegistro?: Function,
        onRefrescarGrid?: Function,
        onProbarSerial?: Function,
        onCambiarConfiguracion?: Function
    },
    opcionesTabla?: {
        registrosPorPagina?: number,
        opcionesRegistros?: boolean,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function
    }
) => {
    if(typeof funcionesOpciones == 'undefined') {
        return null;
    }

    if(typeof opcionesTabla == 'undefined') {
        return(<BarraAccionesGrid
            onAgregarRegistro={
                funcionesOpciones.onAgregarRegistro
            }
            onRefrescarGrid={
                funcionesOpciones.onRefrescarGrid
            }
        />);
    }

    return(<BarraAccionesGrid
        onAgregarRegistro={
            funcionesOpciones.onAgregarRegistro
        }
        onRefrescarGrid={() => {
            if(typeof toggleEnCarga != 'undefined') {
                toggleEnCarga();
            }

            funcionesOpciones.onRefrescarGrid()
        }}
        onProbarSerial={() => {
            funcionesOpciones.onProbarSerial();
        }}
        onOpciones={() => {
            funcionesOpciones.onCambiarConfiguracion();
            toggleModalOpcionesTabla();
        }}
    />);
};

// Renerizamos el titulo y la barra de acciones del grid.
const renderTitulo = (
    tituloGrid: string,
    toggleModalOpcionesTabla: Function,
    toggleEnCarga?: Function,
    funcionesOpciones?: {
        onAgregarRegistro?: Function,
        onRefrescarGrid?: Function,
        onProbarSerial?: Function,
        onCambiarConfiguracion?: Function
    },
    opcionesTabla?: {
        registrosPorPagina?: number,
        opcionesRegistros?: boolean,
        tiempoRefrescamiento?: number,
        guardarConfiguracion: Function
    }
) => {
    return(
        <Card color="dark">
            <Container>
                <Row>
                    <Col>
                        <CardHeader className='text-white'>
                            {tituloGrid}
                        </CardHeader>
                    </Col>

                    {/*Renderizamos la barra de opciones del grid*/}
                    {renderBarraOpciones()}
                </Row>
            </Container>
        </Card>
    );
};

export {
    renderPaginacion,
    renderTitulo
};