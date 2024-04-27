import React from 'react';

import {
    Button,
    Modal,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardFooter, CardTitle, CardText
} from 'reactstrap';

import MenuOpcionesTabla from '../../forms/menus/menuOpcionesTabla';

export default function ModalOpcionesTabla(
    props: {
        nombreTabla: string,
        propiedadesTabla: {
            registrosPorPagina?: number,
            opcionesRegistros?: boolean,
            tiempoRefrescamiento?: number,
            guardarConfiguracion: Function
        },
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
                    Opciones de tabla
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Opciones de tabla de {props.nombreTabla}
                    </CardTitle>

                    {/*aqui va el form de las opciones de la tabla.*/}
                    <MenuOpcionesTabla
                        registrosPorPagina={
                            props.propiedadesTabla.registrosPorPagina
                        }
                        opcionesRegistros={
                            props.propiedadesTabla.opcionesRegistros
                        }
                        tiempoRefrescamiento={
                            props.propiedadesTabla.tiempoRefrescamiento
                        }
                        toggleModal={props.toggleModal}
                        guardarConfiguracion={
                            props.propiedadesTabla.guardarConfiguracion
                        }
                    />
                </CardBody>
            </Card>
        </Modal>
    );
};