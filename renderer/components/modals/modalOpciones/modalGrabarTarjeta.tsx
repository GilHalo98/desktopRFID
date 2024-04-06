import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText, Table
} from 'reactstrap';
import Display from '../../displays/display';
import { RespuestaConsultaEmpleado } from '../../../utils/API/respuestas/consultaEmpleado';

export default function ModalGrabarTarjeta(
    props: {
        registro: RespuestaConsultaEmpleado,
        headerModal: string,
        tituloModal: string,
        modalActivo: boolean,
        toggleModal: Function,
        children: any
    },
) {
    return(
        <Modal isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    {props.headerModal}
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        {props.tituloModal}
                    </CardTitle>

                    {/*Mostramos los datos del registro a guardar en la tarjeta.*/}
                    <Display
                        registro={props.registro}
                        propiedades={[
                            ['id'],
                            ['nombres'],
                            ['apellidoPaterno'],
                            ['apellidoMaterno'],
                            ['fechaRegistroEmpleado'],
                        ]}
                        campos={[
                            'id',
                            'Nombres del empleado',
                            'Apellido paterno',
                            'Apellido paterno',
                            'fecha de registro'
                        ]}
                    />

                    {/*Form para establecer el dispositivo grabador de tarjetas*/}
                    {props.children}
                </CardBody>
            </Card>
        </Modal>
    );
};