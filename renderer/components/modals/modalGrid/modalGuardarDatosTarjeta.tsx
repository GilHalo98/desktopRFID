// Funcionalidad de React.
import React from 'react';

// Componentes de reacstrap.
import {
    Modal,
    Spinner,
    Container, Row, Col,
    Card, CardBody, CardHeader, CardTitle
} from 'reactstrap';

// Componentes propios.
import MenuGrabarTarjeta from '../../forms/menus/menuGrabarTarjeta';

// Importamos los modelos de datos.
import {
    Empleado
} from '../../../utils/API/modelos/empleado';

import {
    Permiso
} from '../../../utils/API/modelos/permiso';

import {
    Rol
} from '../../../utils/API/modelos/rol';

// Funcionalidad
import {
    renderDatosEmpleado,
    renderDatosRol,
    renderDatosPermiso
} from './logic/renders';

import {
    consultarDatosVinculados
} from './logic/registros';

export default function ModalGuardarDatosTarjeta(
    props: {
        nombreGrid: string,
        onConectarPorSerial: Function,
        modalActivo: boolean,
        toggleModal: Function,
        registro: Empleado
    }
) {
    // Hook de carga de datos.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(true);

    // Hooks de los registros vinculados.
    const [
        rolVinculado,
        setRolVinculado
    ] = React.useState(undefined);

    const [
        permisoVinculado,
        setPermisoVinculado
    ] = React.useState(undefined);

    // Realizamos una busqueda del rol y el permiso vinculado.
    React.useEffect(() => {
        if(typeof(props.registro) != 'undefined') {
            consultarDatosVinculados(
                props.registro.idRolVinculado,
                setRolVinculado,
                setPermisoVinculado,
                (nuevoEstado: boolean) => {
                    setEnCarga(nuevoEstado);
                }
            );
        }
    }, [props.registro]);

    // Control de estado de carga
    const controlModal = {
        display: (enCarga? 'none' : '')
    };

    const controlSpinner = {
        display: (enCarga? '' : 'none')
    };

    return(
        <Modal isOpen={props.modalActivo} toggle={() => {
            props.toggleModal();
        }}>
            <Card
                className='cardModalAlerta'
                color="dark"
            >
                <CardHeader>
                    Guardar datos en tarjeta
                </CardHeader>

                <CardBody>
                    <CardTitle className='tituloModalOpcionesTabla'>
                        Guardar datos de acceso del empleado en
                        la tarjeta
                    </CardTitle>

                    {/*Renders de los displays de la información*/}
                    <Container>
                        <Row style={controlModal}>
                            <Row>
                                <Col>
                                    {renderDatosEmpleado(props.registro)}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    {renderDatosRol(rolVinculado)}
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    {renderDatosPermiso(permisoVinculado)}
                                </Col>
                            </Row>
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

                            <br/>
                        </Row>
                    </Container>

                    {/*aqui va el form del menu de grabar tarjeta.*/}
                    <MenuGrabarTarjeta
                        registro={props.registro}
                        registrosVinculados={{
                            rol: rolVinculado,
                            permiso: permisoVinculado
                        }}
                        toggleModal={props.toggleModal}
                    />
                </CardBody>
            </Card>
        </Modal>
    );
};
