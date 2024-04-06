import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

export default function ModalModificarRegistro(
    props: {
        idRegistro: string,
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
                    Modificar Registro
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Modifica el registro con id {props.idRegistro}
                    </CardTitle>

                    {/*aqui va el form del registro.*/}
                    {props.children}
                </CardBody>
            </Card>
        </Modal>
    );
};