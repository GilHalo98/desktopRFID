// Componentes de reactstrap.
import {
    Container, Row, Col,
    Card, CardBody, CardTitle, CardSubtitle, CardText, CardHeader,
} from "reactstrap";

// Modelos de datos.
import {
    Rol
} from "../../../../utils/API/modelos/rol";

import {
    Empleado
} from "../../../../utils/API/modelos/empleado";

// Componentes de los renders.
import CardRegistroEmpleado from "../../../cards/cardsRegistros/cardRegistroEmpleado";
import FormBusquedaEmpleado from "../../../forms/busqueda/formBusquedaEmpleado";

// Renderizamos la barra de busqueda.
const renderBarraBusqueda = (
    parametrosBusqueda: {
        setId: Function,
        setNombres: Function,
        setApellidoPaterno: Function,
        setApellidoMaterno: Function,
        setNumeroTelefonico: Function,
        setIdRol: Function
    },
    elementosOpciones: Rol[]
) => {
    return(
        <Card color="dark" style={{marginBottom: 20}}>
            <CardBody>
                <FormBusquedaEmpleado
                    parametrosBusqueda={parametrosBusqueda}
                    elementosOpciones={elementosOpciones}
                />
            </CardBody>
        </Card>
    );
};

// Renderizamos los cards de los registros de los empleados.
const renderizarCardsEmpleados = (
    registros: Empleado[],
    funcionesRegistros?: {
        onGuardarDatosTarjeta?: Function,
        onVisualizarRegistro?: Function,
        onModificarRegistro?: Function
    }
) => {
    return(registros.map((
        registro: Empleado,
        index: number
    ) => {
        return(
            <Col
                sm='6'
                md='6'
                lg='4'
                xl='3'
            >
                <CardRegistroEmpleado
                    registro={registro}
                    indexRegistro={index}
                    funcionesRegistros={funcionesRegistros}
                    mostrarDatosEmpleado={true}
                />
            </Col>
        );
    }));
};

export {
    renderBarraBusqueda,
    renderizarCardsEmpleados
};