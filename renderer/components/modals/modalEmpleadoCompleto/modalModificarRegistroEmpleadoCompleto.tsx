import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

export default function ModalModificarRegistroEmpleadoCompleto(
    props: {
        nombreTabla: string,
        modalActivo: boolean,
        toggleModal: Function,
        children?: any
    }
) {
    return(
        <Modal
            size='lg'
            isOpen={props.modalActivo}
            toggle={() => {
                props.toggleModal();
            }}
        >
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Modificar Registro de empleado
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Modifcar el registro de {props.nombreTabla}
                    </CardTitle>

                    {/*
                        Renderizamos el form en el
                        que se encuentra actualmente.
                    */}
                    {props.children}
                </CardBody>
            </Card>
        </Modal>
    );
};