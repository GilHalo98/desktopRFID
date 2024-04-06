import React from 'react';

import Image from 'next/image';

import {
    Button,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardText, CardTitle, Spinner
} from 'reactstrap';
import BarraOpcionesRegistroEmpleado from '../../barraBotones/barraOpcionesRegistroEmpleado';
import { RespuestaConsultaEmpleado } from '../../../utils/API/respuestas/consultaEmpleado';
import { ConsultaRecurso } from '../../../utils/API/interface/recurso';
import { Recurso } from '../../../utils/API/modelos/recurso';

export default function CardRegistroEmpleado(
    props: {
        registro: RespuestaConsultaEmpleado,
        datosOperacion: {
            setIdRegistroOperacion: Function
            idRegistro: number,
            setRegistroOperacion: Function,
            indexRegistro: number,
        }
        toggleModals: {
            setEstadoModalRemoverRegistro: Function,
            setEstadoModalModificarRegistro: Function,
            setEstadoModalVisualizarRegistro: Function,
            setEstadoModalGuardarRegistro: Function
        }
    }
) {
    const [enCarga, setEnCarga] = React.useState(true);
    const [recursos, setRecursos ] = React.useState([]);

    React.useEffect(() => {
        ConsultaRecurso(
            1,
            0,
            props.registro.idImagenVinculada,
            null,
            null,
            setRecursos,
            () => {},
            setEnCarga
        );
    }, []);

    const controlImagen = {
        display: (enCarga? 'none' : '')
    };

    const controlSpinner = {
        display: (enCarga? '' : 'none')
    };

    return(
        <Card className='cardEmpleado' color='dark'>
            <CardHeader>
                {props.registro.nombres + ' ' + props.registro.apellidoPaterno + ' ' + props.registro.apellidoMaterno}
            </CardHeader>

            <CardBody>
                <Container>
                    <Row style={controlImagen}>
                        <Col>
                            {recursos.map((imagen: Recurso)=>{
                                const imagenB64 = window.btoa(imagen.data);
                                return(
                                    <img
                                        key={'imagen-' + props.registro.id}
                                        src={
                                            `data:${imagen.tipo};base64,${imagenB64}`
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
                    Fecha de registro: {props.registro.fechaRegistroEmpleado.split('T')[0]}
                </CardTitle>
                
                <CardText style={{textAlign: 'center'}}>
                    Rol del empleado: {props.registro.rol.rolTrabajador}
                </CardText>
            </CardBody>

            <CardBody>
                <Container>
                    <Row>
                        <Col/>
                        <Col>
                            <BarraOpcionesRegistroEmpleado
                                onGuardarDatos={() => {
                                    props.datosOperacion.setIdRegistroOperacion(props.datosOperacion.idRegistro);
                                    props.datosOperacion.setRegistroOperacion(props.datosOperacion.indexRegistro);
                                    props.toggleModals.setEstadoModalGuardarRegistro();
                                }}
                                onEliminar={() => {
                                    props.datosOperacion.setIdRegistroOperacion(props.datosOperacion.idRegistro);
                                    props.datosOperacion.setRegistroOperacion(props.datosOperacion.indexRegistro);
                                    props.toggleModals.setEstadoModalRemoverRegistro();
                                }}
                                onModificar={() => {
                                    props.datosOperacion.setIdRegistroOperacion(props.datosOperacion.idRegistro);
                                    props.datosOperacion.setRegistroOperacion(props.datosOperacion.indexRegistro);
                                    props.toggleModals.setEstadoModalModificarRegistro();
                                }}
                                onVisularizar={() => {
                                    props.datosOperacion.setIdRegistroOperacion(props.datosOperacion.idRegistro);
                                    props.datosOperacion.setRegistroOperacion(props.datosOperacion.indexRegistro);
                                    props.toggleModals.setEstadoModalVisualizarRegistro();
                                }}
                            />
                        </Col>
                        <Col/>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    );
};