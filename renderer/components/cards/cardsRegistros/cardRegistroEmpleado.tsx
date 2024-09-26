// Importamos react.
import React from 'react';

// Componente para imagenes.
import Image from 'next/image';

// Componentes de reactstrap.
import {
    List,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardText, CardTitle
} from 'reactstrap';

// Componentes propios.
import IndicadorCargaSpinner from '../../cargas/indicadorCargaSpinner';

// Logica del componente.
import {
    consultarImagenEmpleado,
    consultarRolEmpleado
} from "./logic/registros";

// Renders de componentes.
import {
    renderBarraOpcionesRegistro
} from './logic/renders';

// Modelos de datos.
import {
    Empleado
} from '../../../utils/API/modelos/empleado';

import {
    Recurso
} from '../../../utils/API/modelos/recurso';

import {
    Rol
} from '../../../utils/API/modelos/rol';

export default function CardRegistroEmpleado(
    props: {
        registro: Empleado,
        indexRegistro?: number,
        funcionesRegistros?: {
            onGuardarDatosTarjeta?: Function,
            onVisualizarRegistro?: Function,
            onModificarRegistro?: Function
        }
        mostrarDatosEmpleado?: boolean
    }
) {
    // Hook indicador de componente en carga.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(true);

    // Datos del componente.
    const [
        recurso,
        setRecurso
    ] = React.useState({} as Recurso);

    const [
        registroRol,
        setRegistroRol
    ] = React.useState({} as Rol)

    // Consultamos la imagen del empleado.
    React.useEffect(() => {
        console.log('refresh COMPONENTE');

        if(typeof props.registro.idImagenVinculada != 'undefined') {
            // Consultamos los datos del componente.
            consultarImagenEmpleado(
                setRecurso,
                setEnCarga,
                {
                    limit: 1,
                    id: props.registro.idImagenVinculada
                },
                () => {
                    // Realizamos la consulta concatenada.
                    consultarRolEmpleado(
                        setRegistroRol,
                        setEnCarga,
                        {
                            limit: 1,
                            id: props.registro.idRolVinculado
                        }
                    )
                }
            );
        }

    }, [props.registro]);

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

            {/* Rendrizamos la imagen del empleado. */}
            {enCarga?
                <IndicadorCargaSpinner/> : recurso.data? <img
                    key={
                        'imagen-'
                        + props.registro.id
                    }
                    src={
                        `data:${recurso.tipo}
                        ;base64,${window.btoa(recurso.data)}`
                    }
                    width="100%"
                /> : <></>
            }

            <CardBody>

                {enCarga? <></> : props.mostrarDatosEmpleado?
                    <List>
                        <li>
                            Fecha de registro: {
                                props.registro.fechaRegistroEmpleado
                            }
                        </li>

                        <li>
                            Rol de empleado: {
                                registroRol.rolTrabajador
                            }
                        </li>
                    </List> : <></>
                }

                <Row>
                    <Col style={{
                        textAlign: 'center'
                    }}>
                        {renderBarraOpcionesRegistro(
                            props.registro,
                            props.indexRegistro,
                            props.funcionesRegistros
                        )}
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};