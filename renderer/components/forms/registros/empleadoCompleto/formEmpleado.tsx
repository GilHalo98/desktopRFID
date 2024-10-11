// funcionalidad de React.
import React, { SyntheticEvent } from 'react';

// Componentes de reacstrap.
import {
    Input, Label, FormGroup,
    Container, Row, Col
} from 'reactstrap';

// Componentes propios.
import IndicadorCargaSpinner from '../../../cargas/indicadorCargaSpinner';

// Modelo de datos.
import {
    Rol
} from '../../../../utils/API/modelos/rol';

import {
    EmpleadoCompleto
} from '../../../../utils/API/respuestas/empleadoCompleto';

import {
    Empleado
} from '../../../../utils/API/modelos/empleado';

export default function FormRegistroEmpleado(
    props: {
        elementosOpciones: Rol[]
        registro?: Empleado | EmpleadoCompleto
        registrarUsuario?: boolean
        setRegistrarUsuario?: Function
        setDatosAutogenerar?: Function
        datosAutogenerar?: {
            nombre: string
            apellidoPaterno: string
            apellidoMaterno: string
        }
        mostrarRegistrarUsuario?: boolean
    }
) {
    // Hooks para indicar la carga de datos.
    const [
        enCarga,
        setEnCarga
    ] = React.useState(false);

    // Hooks de la imagen binaria.
    const [
        imagenB64,
        setImagenB64
    ] = React.useState(undefined);

    // Hooks de los datos del empleado.
    const[
        registroEmpleado,
        setRegistroEmpleado
    ] = React.useState(
        !props.registro?
            {} as Empleado : props.registro as Empleado
    );

    const [
        imagen,
        setImagen
    ] = React.useState(undefined);

    // Si se carga la imagen, entonces desactiva el indicador de carga.
    React.useEffect(() => {
        if(typeof imagenB64 != 'undefined') {
            setEnCarga(false);
        }
    }, [imagenB64]);

    // Cargamos la imagen.
    React.useEffect(() => {
        if(typeof imagen != 'undefined') {
            // Establecemos la imagen a indefinido.
            setImagenB64(undefined);

            // Cargamos la imagen.
            cargarImagen();
        }
    }, [imagen]);

    // Cargamos el dibujo en memoria.
    const cargarImagen = async () => {
        // Mostramos el indicador de carga
        setEnCarga(true);

        // Cargamos el archivo como binarios.
        const dataImagen = window.ipc.sendSync(
            'cargar_imagen',
            {
                path: imagen.path
            }
        );

        // Establecemos los binarios del archivo.
        setImagenB64(dataImagen);
    };

    // Renderizamos la imagen del empleado..
    const renderizarImagen = () => {
        if(!imagen) {
            return <></>;
        }

        if(enCarga) {
            return <IndicadorCargaSpinner/>
        }

        if(typeof imagenB64 != 'undefined') {
            // Retornamos el elemento renderizado.
            return (
                <img
                    key={'dibjo'}
                    src={
                        `data:${imagen.type}
                        ;base64,${imagenB64}`
                    }
                />
            );
        }
    };

    return(<>
        <Container>
            <Row>
                <Col/>

                <Col>
                    {renderizarImagen()}
                </Col>

                <Col/>
            </Row>
        </Container>

        {/*Campo de imagen del empleado*/}
        <FormGroup>
            <Label for='imagenEmpleado'>
                Foto del empleado
            </Label>

            <Input
                id='imagenEmpleado'
                name='campoImagenEmpleado'
                type='file'
                accept="image/png, image/jpeg"
                onChange={(evento: SyntheticEvent) => {
                    const input = evento.target as HTMLInputElement;
                    setImagen(input.files[0]);
                }}
            />
        </FormGroup>

        {/*Campo de nombres del empleado*/}
        <FormGroup>
            <Label for="nombreEmpleado">
                Nombres del empleado
            </Label>

            <Input
                id="nombreEmpleado"
                name="campoNombreEmpleado"
                type="text"
                defaultValue={registroEmpleado.nombres}
                onChange={(evento: SyntheticEvent) => {
                    const input = evento.target as HTMLInputElement;

                    props.datosAutogenerar.nombre = input.value;

                    props.setDatosAutogenerar(props.datosAutogenerar);
                }}
            />
        </FormGroup>

        {/*Campo de apellido paterno del empleado*/}
        <FormGroup>
            <Label for="apellidoPaternoEmpleado">
                Apellido paterno del empleado
            </Label>

            <Input
                id="apellidoPaternoEmpleado"
                name="campoApellidoPaternoEmpleado"
                type="text"
                defaultValue={registroEmpleado.apellidoPaterno}
                onChange={(evento: SyntheticEvent) => {
                    const input = evento.target as HTMLInputElement;

                    props.datosAutogenerar.apellidoPaterno = input.value;

                    props.setDatosAutogenerar(props.datosAutogenerar);
                }}
            />
        </FormGroup>

        {/*Campo de apellido materno del empleado*/}
        <FormGroup>
            <Label for="apellidoMaternoEmpleado">
                Apellido materno del empleado
            </Label>

            <Input
                id="apellidoMaternoEmpleado"
                name="campoApellidoMaternoEmpleado"
                type="text"
                defaultValue={registroEmpleado.apellidoMaterno}
                onChange={(evento: SyntheticEvent) => {
                    const input = evento.target as HTMLInputElement;

                    props.datosAutogenerar.apellidoMaterno = input.value;

                    props.setDatosAutogenerar(props.datosAutogenerar);
                }}
            />
        </FormGroup>

        {/*Campo de numero telefónico del empleado*/}
        <FormGroup>
            <Label for="numeroEmpleado">
                Numero telefónico del empleado
            </Label>

            <Input
                id="numeroEmpleado"
                name="campoNumeroEmpleado"
                type="tel"
                defaultValue={registroEmpleado.numeroTelefonico}
            />
        </FormGroup>

        {/*Campo de fecha de nacimiento del empleado*/}
        <FormGroup>
            <Label for="nacimientoEmpleado">
                Fecha de nacimiento del empleado
            </Label>

            <Input
                id="nacimientoEmpleado"
                name="campoNacimientoEmpleado"
                type="date"
                defaultValue={registroEmpleado.fechaNacimiento}
            />
        </FormGroup>

        {/*Campo de rol del empleado*/}
        <FormGroup>
            <Label for="rolEmpleado">
                Rol del empleado
            </Label>

            <Input
                id="rolEmpleado"
                type="select"
                defaultValue={registroEmpleado.idRolVinculado}
            >
                {props.elementosOpciones.map((registroVinculado: Rol) => {
                    return(
                        <option value={registroVinculado.id}>
                            {registroVinculado.rolTrabajador}
                        </option>
                    );
                })}
            </Input>
        </FormGroup>

        {/* Campo para seleccinar el registro de un usuario */}
        {!props.mostrarRegistrarUsuario? <></> : <>
            <FormGroup check>
                <Input
                    id="registrarUsuario"
                    type="checkbox"
                    defaultChecked={props.registrarUsuario}
                    onChange={(evento: SyntheticEvent) => {
                        const input = evento.target  as HTMLInputElement;

                        if(typeof props.setRegistrarUsuario != 'undefined') {
                            props.setRegistrarUsuario(input.checked);
                        }
                    }}
                />

                <Label check>
                    Registrar usuario vinculado al empleado
                </Label>
            </FormGroup>

            <br/>
        </>}
    </>);
};