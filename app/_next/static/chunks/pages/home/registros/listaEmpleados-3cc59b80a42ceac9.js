(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4601],{92516:function(e,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/home/registros/listaEmpleados",function(){return o(82797)}])},61914:function(e,n,o){"use strict";o.d(n,{Z:function(){return d}});var t=o(24246),i=(o(27378),o(30985)),r=o(74246),a=o(27492),l=o(63115),c=o(7863);function d(e){var n=(0,c.jg)([e.registro],e.campos,["id"])[0];return(0,t.jsxs)(i.Z,{children:[(0,t.jsx)(r.Z,{children:(0,t.jsx)(a.Z,{children:e.tituloDisplay})}),(0,t.jsx)("hr",{}),(0,t.jsx)(r.Z,{children:(0,t.jsx)(a.Z,{children:(0,t.jsx)(l.Z,{hover:!0,dark:!0,responsive:!0,children:(0,t.jsx)("tbody",{children:e.nombresCampos.map((function(e,o){return(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:e}),(0,t.jsx)("td",{children:n.data[o]})]})}))})})})})]})}},75245:function(e,n,o){"use strict";o.d(n,{Z:function(){return u}});var t=o(2706),i=o(24246),r=o(27378),a=o(30985),l=o(74246),c=o(27492),d=o(10798);function u(e){var n=(0,t.Z)(r.useState(""),2),o=n[0],u=n[1];return r.useEffect((function(){e.parametrosBusqueda.setIdRol(o)}),[o]),(0,i.jsxs)(a.Z,{children:[(0,i.jsxs)(l.Z,{children:[(0,i.jsx)(c.Z,{children:(0,i.jsx)(d.Z,{id:"idEmpleado",placeholder:"ID del empleado",type:"text",onChange:function(n){var o=n.target;e.parametrosBusqueda.setId(o.value)}})}),(0,i.jsx)(c.Z,{children:(0,i.jsx)(d.Z,{id:"numeroEmpleado",placeholder:"Numero telefonico del empleado",type:"text",onChange:function(n){var o=n.target;e.parametrosBusqueda.setNumeroTelefonico(o.value)}})}),(0,i.jsx)(c.Z,{children:(0,i.jsxs)(d.Z,{id:"rolEmpleado",type:"select",value:o,onChange:function(e){var n=e.target;u(n.value)},children:[(0,i.jsx)("option",{value:"",children:"Todos los roles"}),e.elementosOpciones.map((function(e){return(0,i.jsx)("option",{value:e.id,children:e.rolTrabajador})}))]})})]}),(0,i.jsx)("br",{}),(0,i.jsxs)(l.Z,{children:[(0,i.jsx)(c.Z,{children:(0,i.jsx)(d.Z,{id:"nombresEmpleado",placeholder:"Nombres de empleado",type:"text",onChange:function(n){var o=n.target;e.parametrosBusqueda.setNombres(o.value)}})}),(0,i.jsx)(c.Z,{children:(0,i.jsx)(d.Z,{id:"apellidoPaterno",placeholder:"Apellido paterno del empleado",type:"text",onChange:function(n){var o=n.target;e.parametrosBusqueda.setApellidoPaterno(o.value)}})}),(0,i.jsx)(c.Z,{children:(0,i.jsx)(d.Z,{id:"apellidoMaterno",placeholder:"Apellido materno del empleado",type:"text",onChange:function(n){var o=n.target;e.parametrosBusqueda.setApellidoMaterno(o.value)}})})]}),(0,i.jsx)("br",{})]})}},59622:function(e,n,o){"use strict";o.d(n,{Z:function(){return O}});var t=o(24246),i=o(27378),r=o(8208),a=o(11355),l=o(26508),c=o(70870),d=o(80311),u=o(96129),s=o(23615),f=o.n(s),p=o(60042),m=o.n(p),h=o(75133),g=["className","cssModule","tag"];function x(){return x=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])}return e},x.apply(this,arguments)}function Z(e,n){if(null==e)return{};var o,t,i=function(e,n){if(null==e)return{};var o,t,i={},r=Object.keys(e);for(t=0;t<r.length;t++)o=r[t],n.indexOf(o)>=0||(i[o]=e[o]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)o=r[t],n.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}var j={className:f().string,cssModule:f().object,tag:h.iC};function v(e){var n=e.className,o=e.cssModule,t=e.tag,r=void 0===t?"div":t,a=Z(e,g),l=(0,h.mx)(m()(n,"card-footer"),o);return i.createElement(r,x({},a,{className:l}))}v.propTypes=j;var y=v,b=o(30985),E=o(74246),M=o(27492),R=o(35979);function O(e){return(0,t.jsx)(r.Z,{isOpen:e.modalActivo,toggle:function(){e.toggleModal()},children:(0,t.jsxs)(a.Z,{className:"cardModalAlerta",color:"danger",children:[(0,t.jsx)(l.Z,{children:"Eliminar Registro"}),(0,t.jsxs)(c.Z,{children:[(0,t.jsxs)(d.Z,{className:"tituloModalAlerta",children:["\xbfEstas seguro de que deseas eliminar el registro con id ",e.idRegistro,"?"]}),(0,t.jsx)("br",{}),e.children,(0,t.jsx)("br",{}),(0,t.jsx)(u.Z,{children:"Se removera el registro de manera permanente y no habra forma de recuperarlo al finalizar la operaci\xf3n."})]}),(0,t.jsx)(y,{children:(0,t.jsx)(b.Z,{children:(0,t.jsxs)(E.Z,{children:[(0,t.jsx)(M.Z,{children:(0,t.jsx)(R.Z,{active:!0,outline:!0,block:!0,color:"primary",onClick:function(){"undefined"!=typeof e.onRechazar&&e.onRechazar(),e.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(M.Z,{children:(0,t.jsx)(R.Z,{active:!0,outline:!0,block:!0,onClick:function(){e.onOk(e.idRegistro),e.toggleModal()},children:"Aceptar"})})]})})})]})})}},15174:function(e,n,o){"use strict";o.d(n,{Z:function(){return d}});var t=o(24246),i=(o(27378),o(8208)),r=o(11355),a=o(26508),l=o(70870),c=o(80311);function d(e){return(0,t.jsx)(i.Z,{isOpen:e.modalActivo,toggle:function(){e.toggleModal()},children:(0,t.jsxs)(r.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(a.Z,{children:"Agregar Registro"}),(0,t.jsxs)(l.Z,{children:[(0,t.jsxs)(c.Z,{className:"tituloModalOpcionesTabla",children:["Agregar registro de ",e.nombreTabla]}),e.children]})]})})}},38718:function(e,n,o){"use strict";o.d(n,{Z:function(){return d}});var t=o(24246),i=(o(27378),o(8208)),r=o(11355),a=o(26508),l=o(70870),c=o(80311);function d(e){return(0,t.jsx)(i.Z,{isOpen:e.modalActivo,toggle:function(){e.toggleModal()},children:(0,t.jsxs)(r.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(a.Z,{children:"Modificar Registro"}),(0,t.jsxs)(l.Z,{children:[(0,t.jsxs)(c.Z,{className:"tituloModalOpcionesTabla",children:["Modifica el registro con id ",e.idRegistro]}),e.children]})]})})}},86480:function(e,n,o){"use strict";o.d(n,{Z:function(){return g}});var t=o(2706),i=o(24246),r=o(27378),a=o(11355),l=o(26508),c=o(30985),d=o(74246),u=o(27492),s=o(70870),f=o(80311),p=o(63115),m=o(66444),h=o(16427);function g(e){var n=(0,t.Z)(r.useState(!1),2),o=n[0],g=n[1],x=(0,t.Z)(r.useState(!1),2),Z=x[0],j=x[1],v={display:e.enCarga?"none":""},y={display:e.enCarga?"":"none"};return(0,i.jsxs)(a.Z,{color:"dark",children:[(0,i.jsx)(l.Z,{className:"text-white",children:(0,i.jsx)(c.Z,{children:(0,i.jsxs)(d.Z,{children:[(0,i.jsx)(u.Z,{children:e.tituloTabla}),(0,i.jsx)(u.Z,{style:{textAlign:"right"},children:(0,h.cr)((function(){j(!Z)}),(function(){g(!o)}),(function(){e.setEnCarga(!e.enCarga)}),e.funcionesOpciones,e.opcionesTabla)})]})})}),(0,i.jsxs)(s.Z,{children:[(0,i.jsx)(f.Z,{children:e.children}),(0,i.jsxs)(c.Z,{children:[(0,i.jsxs)(d.Z,{style:v,children:[(0,i.jsxs)(p.Z,{hover:!0,dark:!0,responsive:!0,children:[(0,i.jsx)("thead",{className:"cabeceraTablaRegistros",children:(0,i.jsxs)("tr",{children:[(0,h.R3)(e.cabeceras),(0,h.FY)(e.funcionesRegistros,e.opcionesTabla)]},"header")}),(0,i.jsx)("tbody",{children:(0,h.oC)(e.cabeceras,e.registros,e.formatoEspecial,e.opcionesTabla,e.funcionesRegistros)})]}),(0,h.DY)(e.paginacion)]}),(0,i.jsxs)(d.Z,{style:y,children:[(0,i.jsx)(u.Z,{}),(0,i.jsx)(u.Z,{xs:"auto",children:(0,i.jsx)(m.Z,{color:"warning",style:{height:"100px",width:"100px"}})}),(0,i.jsx)(u.Z,{})]})]})]}),(0,h.LN)(e.tituloTabla,o,(function(){g(!o)}),e.opcionesTabla,e.funcionesOpciones),(0,h.W3)(e.tituloTabla,Z,(function(){j(!Z)}),e.exportarDatos)]})}},82797:function(e,n,o){"use strict";o.r(n),o.d(n,{default:function(){return N}});var t=o(24246),i=(o(48697),o(27378)),r=o(30985),a=o(74246),l=o(27492),c=o(6947),d=o(2706),u=o(43532),s=o(43636),f=o(51838),p=o(10798),m=o(35979);function h(e){return(0,t.jsxs)(u.Z,{onSubmit:function(n){n.preventDefault(),e.onModificarRegistro(n,e.registro.id),e.toggleModal()},children:[(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"nombreEmpleado",children:"Nombres del empleado"}),(0,t.jsx)(p.Z,{id:"nombreEmpleado",name:"campoNombreEmpleado",type:"text",defaultValue:e.registro.nombres})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"apellidoPaternoEmpelado",children:"Apellido paterno del empleado"}),(0,t.jsx)(p.Z,{id:"apellidoPaternoEmpelado",name:"campoApellidoPaternoEmpelado",type:"text",defaultValue:e.registro.apellidoPaterno})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"apellidoMaternoEmpelado",children:"Apellido paterno del empleado"}),(0,t.jsx)(p.Z,{id:"apellidoMaternoEmpelado",name:"campoApellidoMaternoEmpelado",type:"text",defaultValue:e.registro.apellidoMaterno})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"numeroEmpleado",children:"Numero telef\xf3nico del empleado"}),(0,t.jsx)(p.Z,{id:"numeroEmpleado",name:"campoNumeroEmpleado",type:"tel",defaultValue:e.registro.numeroTelefonico})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"nacimientoEmpleado",children:"Fecha de nacimiento del empleado"}),(0,t.jsx)(p.Z,{id:"nacimientoEmpleado",name:"campoNacimientoEmpleado",type:"date",defaultValue:e.registro.fechaNacimiento})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"rolEmpleado",children:"Rol del empleado"}),(0,t.jsx)(p.Z,{id:"rolEmpleado",type:"select",defaultValue:e.registro.idRolVinculado,children:e.elementosOpciones.map((function(e){return(0,t.jsx)("option",{value:e.id,children:e.rolTrabajador})}))})]}),(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(l.Z,{children:(0,t.jsx)(m.Z,{active:!0,outline:!0,block:!0,onClick:function(){e.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(l.Z,{children:(0,t.jsx)(m.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Guardar Cambios"})})]})})]})}function g(e){return(0,t.jsxs)(u.Z,{onSubmit:function(n){n.preventDefault(),e.onGuardarRegistro(n),e.toggleModal()},children:[(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"nombreEmpleado",children:"Nombres del empleado"}),(0,t.jsx)(p.Z,{id:"nombreEmpleado",name:"campoNombreEmpleado",type:"text"})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"apellidoPaternoEmpelado",children:"Apellido paterno del empleado"}),(0,t.jsx)(p.Z,{id:"apellidoPaternoEmpelado",name:"campoApellidoPaternoEmpelado",type:"text"})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"apellidoMaternoEmpelado",children:"Apellido paterno del empleado"}),(0,t.jsx)(p.Z,{id:"apellidoMaternoEmpelado",name:"campoApellidoMaternoEmpelado",type:"text"})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"numeroEmpleado",children:"Numero telef\xf3nico del empleado"}),(0,t.jsx)(p.Z,{id:"numeroEmpleado",name:"campoNumeroEmpleado",type:"tel"})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"nacimientoEmpleado",children:"Fecha de nacimiento del empleado"}),(0,t.jsx)(p.Z,{id:"nacimientoEmpleado",name:"campoNacimientoEmpleado",type:"date"})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(f.Z,{for:"rolEmpleado",children:"Rol del empleado"}),(0,t.jsx)(p.Z,{id:"rolEmpleado",type:"select",children:e.elementosOpciones.map((function(e){return(0,t.jsx)("option",{value:e.id,children:e.rolTrabajador})}))})]}),(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(l.Z,{children:(0,t.jsx)(m.Z,{active:!0,outline:!0,block:!0,onClick:function(){e.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(l.Z,{children:(0,t.jsx)(m.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Registrar"})})]})})]})}var x=o(38718),Z=o(15174),j=o(59622),v=o(75245),y=o(61914),b=o(86480),E=o(7863),M=o(15586),R=o(73181),O=function(e){return(0,E.jg)(e,[["id"],["nombres"],["apellidoPaterno"],["apellidoMaterno"],["numeroTelefonico"],["edad"],["fechaNacimiento"],["idRolVinculado"],["idImagenVinculada"],["fechaRegistroEmpleado"],["fechaModificacionEmpleado"]],["id","indexRegistro"])};function A(e){var n=(0,d.Z)(i.useState(!1),2),o=n[0],r=n[1],a=(0,d.Z)(i.useState([]),2),l=a[0],c=a[1],u=(0,d.Z)(i.useState(0),2),s=u[0],f=u[1],p=(0,d.Z)(i.useState(1),2),m=p[0],A=p[1],N=(0,d.Z)(i.useState(1),2),T=N[0],C=N[1],_=(0,d.Z)(i.useState(void 0),2),P=_[0],S=_[1],I=(0,d.Z)(i.useState(void 0),2),D=I[0],k=I[1],L=(0,d.Z)(i.useState(void 0),2),V=L[0],w=L[1],F=(0,d.Z)(i.useState(void 0),2),q=F[0],B=F[1],X=(0,d.Z)(i.useState(void 0),2),G=X[0],U=X[1],z=(0,d.Z)(i.useState(void 0),2),Y=z[0],$=z[1],W=(0,d.Z)(i.useState(12),2),H=W[0],J=W[1],K=(0,d.Z)(i.useState(!1),2),Q=K[0],ee=K[1],ne=(0,d.Z)(i.useState(!0),2),oe=ne[0],te=ne[1],ie=(0,d.Z)(i.useState(!1),2),re=ie[0],ae=ie[1],le=(0,d.Z)(i.useState(!1),2),ce=le[0],de=le[1],ue=(0,d.Z)(i.useState(!1),2),se=ue[0],fe=ue[1],pe=(0,d.Z)(i.useState(void 0),2),me=pe[0],he=pe[1],ge=(0,d.Z)(i.useState(void 0),2),xe=ge[0],Ze=ge[1],je=(0,d.Z)(i.useState([]),2),ve=(je[0],je[1],(0,d.Z)(i.useState([]),2)),ye=ve[0],be=ve[1];i.useEffect((function(){console.log("refresh"),function(e,n,o,t){(0,R.EX)((function(o){e(o.registros),n(Math.ceil(o.totalRegistros/t.limit))}),t,(function(e){console.log(e),o(!1)}),(function(){e([]),o(!0)}),void 0)}(c,A,r,{limit:H,offset:s,id:P,nombres:V,numeroTelefonico:q,apellidoPaterno:G,apellidoMaterno:Y,idRolVinculado:D}),function(e,n){(0,M.Op)((function(n){e(n.registros)}),void 0,(function(e){console.log(e),n(!1)}),(function(){e([]),n(!0)}),(function(){n(!1)}))}(be,r)}),[H,T,P,V,q,G,Y,D,oe]);var Ee="Tabla de Empleados",Me=["ID","Nombres","Apellido parterno","Apellido materno","Contacto","edad","Fecha de nacimiento","ID de rol vinculado","ID de imagen de empleado","Fecha de registro","Ultima modificacion"],Re={onEliminar:function(e,n){he(e),Ze(l[n]),de(!ce)},onModificar:function(e,n){he(e),Ze(l[n]),ae(!re)}},Oe={registrosPorPagina:H,opcionesRegistros:Q,guardarConfiguracion:function(e){J(e.target[0].value?parseInt(e.target[0].value):0),ee(e.target[1].checked),C(1),f(0)}},Ae={onAgregarRegistro:function(){fe(!se)},onRefrescarTabla:function(){te(!oe)},onExportarDatos:function(){console.log("datos exportados")},onCambiarConfiguracion:function(){console.log("configuracion cambiada")}},Ne={paginaActual:T,offset:s,registrosPorPagina:H,totalPaginas:m,setPaginaActual:C,setOffset:f},Te={setId:S,setNombres:w,setApellidoPaterno:B,setApellidoMaterno:U,setNumeroTelefonico:$,setIdRol:k};return(0,t.jsxs)(b.Z,{tituloTabla:Ee,cabeceras:Me,registros:O(l),enCarga:o,setEnCarga:r,exportarDatos:function(e,n){!function(e,n,o,t){e?(0,E.R$)(n,o,O):(0,R.EX)((function(e){(0,E.R$)(e.registros,o,O)}),{},(function(e){console.log(e),t(!1)}))}(e,n,Me,r)},formatoEspecial:{"Fecha de nacimiento":function(e){return e?e.replace("T"," ").slice(0,19):""},"Fecha de registro":function(e){return e?e.replace("T"," ").slice(0,19):""},"Ultima modificacion":function(e){return e?e.replace("T"," ").slice(0,19):""}},funcionesOpciones:Ae,opcionesTabla:Oe,funcionesRegistros:Re,paginacion:Ne,children:[(0,t.jsx)(Z.Z,{nombreTabla:Ee,modalActivo:se,toggleModal:function(){fe(!se)},children:(0,t.jsx)(g,{elementosOpciones:ye,toggleModal:function(){fe(!se)},onGuardarRegistro:function(e){!function(e,n,o){var t=new FormData;t.append("nombres",e.target[0].value),t.append("apellidoPaterno",e.target[1].value),t.append("apellidoMaterno",e.target[2].value),t.append("numeroTelefonico",e.target[3].value),t.append("fechaNacimiento",e.target[4].value),t.append("idRolVinculado",e.target[5].value),(0,R.b9)(t,void 0,(function(e){console.log(e)}),void 0,(function(){o(!n)}))}(e,oe,te)}})}),(0,t.jsx)(x.Z,{idRegistro:me,modalActivo:re,toggleModal:function(){ae(!re)},children:(0,t.jsx)(h,{elementosOpciones:ye,registro:xe,onModificarRegistro:function(e,n){!function(e,n,o,t){var i=new FormData;i.append("nombres",e.target[0].value),i.append("apellidoPaterno",e.target[1].value),i.append("apellidoMaterno",e.target[2].value),i.append("numeroTelefonico",e.target[3].value),i.append("fechaNacimiento",e.target[5].value),i.append("idRolVinculado",e.target[6].value),i.append("idImagenVinculado",e.target[7].value),(0,R.Xi)(n,i,void 0,(function(e){console.log(e)}),void 0,(function(){t(!o)}))}(e,n,oe,te)},toggleModal:function(){ae(!re)}})}),(0,t.jsx)(j.Z,{idRegistro:me,modalActivo:ce,toggleModal:function(){de(!ce)},onOk:function(e){!function(e,n,o){(0,R.nV)(e,void 0,(function(e){console.log(e)}),void 0,(function(){o(!n)}))}(e,oe,te)},children:(0,t.jsx)(y.Z,{tituloDisplay:"nose",registro:xe,campos:[["id"],["nombres"],["apellidoPaterno"],["apellidoMaterno"],["numeroTelefonico"],["edad"],["fechaNacimiento"],["idRolVinculado"],["idImagenVinculada"],["fechaRegistroEmpleado"],["fechaModificacionEmpleado"]],nombresCampos:["ID","Nombres","Apellido parterno","Apellido materno","Contacto","edad","Fecha de nacimiento","ID de rol vinculado","ID de imagen de empleado","Fecha de registro","Ultima modificacion"]})}),(0,t.jsx)(v.Z,{parametrosBusqueda:Te,elementosOpciones:ye})]})}function N(){return(0,t.jsx)(i.Fragment,{children:(0,t.jsx)(r.Z,{fluid:!0,children:(0,t.jsx)(a.Z,{children:(0,t.jsx)(l.Z,{children:(0,t.jsx)(A,{})})})})})}N.getLayout=function(e){return(0,t.jsx)(c.Z,{children:e})}},73181:function(e,n,o){"use strict";o.d(n,{EX:function(){return p},xw:function(){return Z},Xi:function(){return h},Ak:function(){return j},b9:function(){return m},v6:function(){return x},nV:function(){return g}});var t=o(29132),i=o(85556),r=o(89458),a=function(){var e=(0,t.Z)((function(e){return(0,i.__generator)(this,(function(n){return[2,r.b.EMPLEADO.CONSULTA(e)]}))}));return function(n){return e.apply(this,arguments)}}(),l=function(){var e=(0,t.Z)((function(e){return(0,i.__generator)(this,(function(n){return[2,r.b.EMPLEADO.REGISTRAR(e)]}))}));return function(n){return e.apply(this,arguments)}}(),c=function(){var e=(0,t.Z)((function(e,n){return(0,i.__generator)(this,(function(o){return[2,r.b.EMPLEADO.MODIFICAR(e,n)]}))}));return function(n,o){return e.apply(this,arguments)}}(),d=function(){var e=(0,t.Z)((function(e){return(0,i.__generator)(this,(function(n){return[2,r.b.EMPLEADO.ELIMINAR(e)]}))}));return function(n){return e.apply(this,arguments)}}(),u=function(){var e=(0,t.Z)((function(e){return(0,i.__generator)(this,(function(n){return[2,r.b.EMPLEADO.REGISTRAR_COMPLETO(e)]}))}));return function(n){return e.apply(this,arguments)}}(),s=function(){var e=(0,t.Z)((function(e){return(0,i.__generator)(this,(function(n){return[2,r.b.EMPLEADO.CONSULTA_COMPLETO(e)]}))}));return function(n){return e.apply(this,arguments)}}(),f=function(){var e=(0,t.Z)((function(e,n){return(0,i.__generator)(this,(function(o){return[2,r.b.EMPLEADO.MODIFICAR_COMPLETO(e,n)]}))}));return function(n,o){return e.apply(this,arguments)}}();function p(e,n,o,t,i){"undefined"!=typeof t&&t(),a(n).then((function(n){e(n.data)})).catch((function(e){"undefined"!=typeof o&&o(e)})).finally((function(){"undefined"!=typeof i&&i()}))}function m(e,n,o,t,i){"undefined"!=typeof t&&t(),l(e).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof o&&o(e)})).finally((function(){"undefined"!=typeof i&&i()}))}function h(e,n,o,t,i,r){var a={id:e};"undefined"!=typeof i&&i(),c(a,n).then((function(e){"undefined"!=typeof o&&o(e.data)})).catch((function(e){"undefined"!=typeof t&&t(e)})).finally((function(){"undefined"!=typeof r&&r()}))}function g(e,n,o,t,i){var r={id:e};"undefined"!=typeof t&&t(),d(r).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof o&&o(e)})).finally((function(){"undefined"!=typeof i&&i()}))}function x(e,n,o,t,i){"undefined"!=typeof t&&t(),u(e).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof o&&o(e)})).finally((function(){"undefined"!=typeof i&&i()}))}function Z(e,n,o,t,i){"undefined"!=typeof t&&t(),s(n).then((function(n){e(n.data)})).catch((function(e){"undefined"!=typeof o&&o(e)})).finally((function(){"undefined"!=typeof i&&i()}))}function j(e,n,o,t,i,r){var a={id:e};"undefined"!=typeof i&&i(),f(a,n).then((function(e){"undefined"!=typeof o&&o(e.data)})).catch((function(e){"undefined"!=typeof t&&t(e)})).finally((function(){"undefined"!=typeof r&&r()}))}},15586:function(e,n,o){"use strict";o.d(n,{Op:function(){return u},i2:function(){return f},pm:function(){return s},uN:function(){return p}});var t=o(29132),i=o(85556),r=o(89458),a=function(){var e=(0,t.Z)((function(e){return(0,i.__generator)(this,(function(n){return[2,r.b.ROL.CONSULTA(e)]}))}));return function(n){return e.apply(this,arguments)}}(),l=function(){var e=(0,t.Z)((function(e){return(0,i.__generator)(this,(function(n){return[2,r.b.ROL.REGISTRAR(e)]}))}));return function(n){return e.apply(this,arguments)}}(),c=function(){var e=(0,t.Z)((function(e,n){return(0,i.__generator)(this,(function(o){return[2,r.b.ROL.MODIFICAR(e,n)]}))}));return function(n,o){return e.apply(this,arguments)}}(),d=function(){var e=(0,t.Z)((function(e){return(0,i.__generator)(this,(function(n){return[2,r.b.ROL.ELIMINAR(e)]}))}));return function(n){return e.apply(this,arguments)}}();function u(e,n,o,t,i){"undefined"!=typeof t&&t(),a(n).then((function(n){e(n.data)})).catch((function(e){"undefined"!=typeof o&&o(e)})).finally((function(){"undefined"!=typeof i&&i()}))}function s(e,n,o,t,i){"undefined"!=typeof t&&t(),l(e).then((function(e){console.log(e),"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof o&&o(e)})).finally((function(){"undefined"!=typeof i&&i()}))}function f(e,n,o,t,i,r){var a={id:e};"undefined"!=typeof i&&i(),c(a,n).then((function(e){"undefined"!=typeof o&&o(e.data)})).catch((function(e){"undefined"!=typeof t&&t(e)})).finally((function(){"undefined"!=typeof r&&r()}))}function p(e,n,o,t,i){var r={id:e};"undefined"!=typeof t&&t(),d(r).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof o&&o(e)})).finally((function(){"undefined"!=typeof i&&i()}))}}},function(e){e.O(0,[9080,9556,7815,1798,2234,6062,6399,8023,924,5573,9774,2888,179],(function(){return n=92516,e(e.s=n);var n}));var n=e.O();_N_E=n}]);