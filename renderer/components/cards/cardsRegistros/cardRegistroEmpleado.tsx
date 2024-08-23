// Importamos react.
import React from 'react';

// Componente para imagenes.
import Image from 'next/image';

// Componentes de reactstrap.
import {
    Button,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardText, CardTitle, Spinner
} from 'reactstrap';

// Componentes propios.
import BarraOpcionesRegistroEmpleado from '../../barraBotones/barraOpciones/BarraOpcionesRegistrosEmpleado/barraOpcionesRegistroEmpleado';

// Logica del componente.
import {
    consultarImagenEmpleado
} from "./logic/registros";

// Importando modelo de datos.
import { Empleado } from '../../../utils/API/modelos/empleado';

import {
    Recurso
} from '../../../utils/API/modelos/recurso';

export default function CardRegistroEmpleado(
    props: {
        registro: Empleado,
        indexRegistro: number,
        funcionesRegistros?: {
            onGuardarDatosTarjeta?: Function,
            onVisualizarRegistro?: Function,
            onModificarRegistro?: Function
        }
    }
) {
    // Hook indicador de componente en carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(true);

    // Imagen del empleado.
    const [
        recursos,
        setRecursos
    ] = React.useState([]);

    // Consultamos la imagen del empleado.
    React.useEffect(() => {
        consultarImagenEmpleado(
            setRecursos,
            () => {},
            setEnCarga,
            {
                id:props.registro.idImagenVinculada
            }
        );
    }, []);

    const controlImagen = {
        display: (enCarga? 'none' : '')
    };

    const controlSpinner = {
        display: (enCarga? '' : 'none')
    };

    // Renderizamos la barra de opciones del registro en el card.
    function renderBarraOpcionesRegistro() {
        if(typeof props.funcionesRegistros == 'undefined') {
            return <></>;
        }

        return <BarraOpcionesRegistroEmpleado
            registro={props.registro}
            indexRegistro={props.indexRegistro}
            onGuardarDatosTarjeta={
                props.funcionesRegistros.onGuardarDatosTarjeta
            }
            onVisualizarRegistro={
                props.funcionesRegistros.onVisualizarRegistro
            }
            onModificarRegistro={
                props.funcionesRegistros.onModificarRegistro
            }
        />;
    }

    return(
        <Card className='cardEmpleado' color='dark'>
            <CardHeader style={{textAlign: 'center'}}>
                {
                    props.registro.nombres
                    + ' '
                    + props.registro.apellidoPaterno
                    + ' '
                    + props.registro.apellidoMaterno
                }
            </CardHeader>

            <CardBody>
                <Container>
                    <Row style={controlImagen}>
                        <Col>
                            {recursos.map((imagen: Recurso) => {
                                const imagenB64 = window.btoa(imagen.data);
                                return(
                                    <img
                                        key={
                                            'imagen-'
                                            + props.registro.id
                                        }
                                        src={
                                            `data:${imagen.tipo}
                                            ;base64,${imagenB64}`
                                        }
                                    />
                                );
                            })}
                        </Col>
                    </Row>

                    <Row style={controlSpinner}>
                        <Col/>
                            <Col xs='auto'>
                                <Spinner
                                    color="warning"
                                    style={{
                                        height: '100px',
                                        width: '100px'
                                    }}
                                />
                            </Col>
                        <Col/>
                    </Row>
                </Container>
            </CardBody>

            <CardBody>
                <CardTitle style={{textAlign: 'center'}}>
                    Fecha de registro: {
                        props.registro.fechaRegistroEmpleado.split('T')[0]
                    }
                </CardTitle>

                <CardText style={{textAlign: 'center'}}>
                    Rol del empleado: {props.registro.idRolVinculado}
                </CardText>
            </CardBody>

            <CardBody>
                <Row>
                    <Col/>
                    <Col>
                        {renderBarraOpcionesRegistro()}
                    </Col>
                    <Col/>
                </Row>
            </CardBody>
        </Card>
    );
};