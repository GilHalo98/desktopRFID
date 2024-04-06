import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

export default function ModalAgregarRegistro(
    props: {
        nombreTabla: string,
        modalActivo: boolean,
        toggleModal: Function,
        children: any
    }
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
                    Agregar Registro
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Agregar registro de {props.nombreTabla}
                    </CardTitle>

                    {props.children}
                </CardBody>
            </Card>
        </Modal>
    );
};