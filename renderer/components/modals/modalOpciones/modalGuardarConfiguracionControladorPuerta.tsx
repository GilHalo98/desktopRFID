import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText, Table
} from 'reactstrap';
import Display from '../../displays/display';
import {
    RespuestaConsultaDispositivos
} from '../../../utils/API/respuestas/consultaDispositivo';

export default function ModalGuardarConfiguracionControladorPuerta(
    props: {
        registro: RespuestaConsultaDispositivos,
        headerModal: string,
        tituloModal: string,
        modalActivo: boolean,
        toggleModal: Function,
        onOk: Function,
        onRechazar: Function,
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

                    {/*Mostramos los datos de la configuracion del dispositivo.*/}
                    <Display
                        registro={props.registro}
                        propiedades={[
                            ['id'],
                            ['descripcionDispositivo'],
                            ['zona', 'nombreZona'],
                            ['fechaRegistroIoT'],
                        ]}
                        campos={[
                            'ID',
                            'Descripcion',
                            'Zona donde se encuentra el dispositivo',
                            'Fecha de registro'
                        ]}
                    />

                    {/*Form para establecer el dispositivo y configuracion extra*/}
                    {props.children}
                </CardBody>
            </Card>
        </Modal>
    );
};