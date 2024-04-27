import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

import MenuExportarDatosTabla from '../../forms/menus/menuExportarDatosTabla';

export default function ModalExportarDatosTabla(
    props: {
        nombreTabla: string,
        exportarDatos: Function,
        modalActivo: boolean,
        toggleModal: Function
    }
) {    return(
        <Modal isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Exportar datos de tabla
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Exportar datos de tabla de {props.nombreTabla}
                    </CardTitle>

                    {/*aqui va el form de las opciones de la tabla.*/}
                    <MenuExportarDatosTabla
                        toggleModal={props.toggleModal}
                        exportarDatos={props.exportarDatos}
                    />
                </CardBody>
            </Card>
        </Modal>
    );
};