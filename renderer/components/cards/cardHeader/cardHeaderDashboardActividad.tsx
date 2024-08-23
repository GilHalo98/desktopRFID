'use client'

// React.
import React from 'react';

// Componentes de reactstrap.
import {
    Card, CardHeader, CardBody,
    Container, Row, Col,
    Button,
    Nav, NavItem, NavLink, ButtonGroup, Table
} from 'reactstrap';

// Componentes propios.
import FormBusquedaDashboardActividad from '../../forms/busqueda/formBusquedaDashboardActividad';

// Funcionalidad del grid.
import {
    funcionRefresh
} from '../../../utils/refresh';

// Enumeradores.
import { ESTATUS_DISPOSITIVOS } from '../../../utils/statusDispositivos';

// Modelo de datos.
import { DispositivoIoT } from '../../../utils/API/modelos/dispositivoIoT';

export default function CardHeaderDashboardActividad(
    props: {
        indexRegistro: number,
        setIndexRegistro: Function,
        registros: DispositivoIoT[],
        parametrosBusqueda: {
            setIdDispositivo: Function,
            setDescripcionDispositivo: Function
        },
        children?: any,
    }
) {
    // Hook del estatus actual del dispositiv0.
    const [
        estatusDispositivo,
        setEstatusDispositivo
    ] = React.useState(ESTATUS_DISPOSITIVOS.DESCONECTADO);

    // Hooks de las opciones del componente.
    const [
        refresh,
        setRefresh
    ] = React.useState(true);

    const [
        tiempoRefresh,
        setTiempoRefresh
    ] = React.useState(1);

    // Consulta de datos para el componente.
    React.useEffect(() => {
        if(props.registros) {
            window.ipc.send('emitir_evento_socket', {
                evento: 'peticion_estatus',
                parametros: props.registros[props.indexRegistro].id
            });

            setEstatusDispositivo(window.ipc.sendSync(
                'estatus_dispositivo', null
            ));
        }
    }, [props.registros, refresh]);

    // El componente se refresca cada tiempo dado.
    setTimeout(() => {
        funcionRefresh(refresh, setRefresh);
    }, tiempoRefresh*1000);

    const seleccionarColor = (index: number) => {
        let color = 'warning';

        if(index == props.indexRegistro) {
            console.log(estatusDispositivo);
            switch (estatusDispositivo) {
                case (ESTATUS_DISPOSITIVOS.BLOQUEADO):
                    color = 'danger';
                    break;

                case (ESTATUS_DISPOSITIVOS.CONECTADO):
                    color = 'success';
                    break;

                case (ESTATUS_DISPOSITIVOS.DESCONECTADO):
                    color = 'secondary';
                    break;

                case (ESTATUS_DISPOSITIVOS.OCUPADO):
                    color = 'warning';
                    break;

                case (ESTATUS_DISPOSITIVOS.LIBRE):
                    color = 'info';
                    break;

                default:
                    color = 'danger';
                    break;

            }
        }
        return color;
    };

    const renderHeader = () => {
        let texto = 'Cargando...';

        if (props.registros[props.indexRegistro]) {
            texto = 'Reporte de '+ props.registros[
                props.indexRegistro
            ].descripcionDispositivo;
        }

        return(
            <CardHeader className='text-white'>
                {texto}
            </CardHeader>
        );
    };

    return(
        <Card color="dark">
            {renderHeader()}

            <CardBody>
                <Container>
                    <Row>
                        <Col>
                            <FormBusquedaDashboardActividad
                                parametrosBusqueda={props.parametrosBusqueda}
                            />
                        </Col>
                    </Row>

                    <br/>

                    <Row>
                        <Col>
                            <Table dark responsive borderless>
                                <tbody>
                                    <tr>
                                    {
                                        props.registros.map((
                                                registro: DispositivoIoT,
                                                index: number
                                            ) => {                                
                                            return(
                                                <td
                                                    style={{
                                                        padding: '0%'
                                                    }}
                                                >
                                                    <Button
                                                        block
                                                        outline
                                                        color={
                                                            seleccionarColor(
                                                                index
                                                            )
                                                        }
                                                        style={{
                                                            border: '0px',
                                                            borderRadius: '0px',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                        active={
                                                            index == props.indexRegistro?
                                                                true : false
                                                        }
                                                        onClick={() => {
                                                            props.setIndexRegistro(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        {registro.descripcionDispositivo}
                                                    </Button>
                                                </td>
                                            );
                                        })
                                    }
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </CardBody>
        </Card>
    );
};