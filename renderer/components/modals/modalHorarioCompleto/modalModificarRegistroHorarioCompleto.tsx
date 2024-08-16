import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

export default function ModalModificarRegistroHorarioCompleto(
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
                    Modificar Horario de empleado
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Modificar Horario de {props.nombreTabla}
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