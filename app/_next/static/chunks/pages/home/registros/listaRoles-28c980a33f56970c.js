(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9015],{54920:function(n,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/home/registros/listaRoles",function(){return o(65865)}])},61914:function(n,e,o){"use strict";o.d(e,{Z:function(){return l}});var t=o(24246),i=(o(27378),o(30985)),r=o(74246),c=o(27492),a=o(63115),s=o(7863);function l(n){var e=(0,s.jg)([n.registro],n.campos,["id"])[0];return(0,t.jsxs)(i.Z,{children:[(0,t.jsx)(r.Z,{children:(0,t.jsx)(c.Z,{children:n.tituloDisplay})}),(0,t.jsx)("hr",{}),(0,t.jsx)(r.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(a.Z,{hover:!0,dark:!0,responsive:!0,children:(0,t.jsx)("tbody",{children:n.nombresCampos.map((function(n,o){return(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:n}),(0,t.jsx)("td",{children:e.data[o]})]})}))})})})})]})}},59622:function(n,e,o){"use strict";o.d(e,{Z:function(){return T}});var t=o(24246),i=o(27378),r=o(8208),c=o(11355),a=o(26508),s=o(70870),l=o(80311),u=o(96129),d=o(23615),f=o.n(d),p=o(60042),h=o.n(p),g=o(75133),j=["className","cssModule","tag"];function x(){return x=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(n[t]=o[t])}return n},x.apply(this,arguments)}function Z(n,e){if(null==n)return{};var o,t,i=function(n,e){if(null==n)return{};var o,t,i={},r=Object.keys(n);for(t=0;t<r.length;t++)o=r[t],e.indexOf(o)>=0||(i[o]=n[o]);return i}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(t=0;t<r.length;t++)o=r[t],e.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(n,o)&&(i[o]=n[o])}return i}var m={className:f().string,cssModule:f().object,tag:g.iC};function v(n){var e=n.className,o=n.cssModule,t=n.tag,r=void 0===t?"div":t,c=Z(n,j),a=(0,g.mx)(h()(e,"card-footer"),o);return i.createElement(r,x({},c,{className:a}))}v.propTypes=m;var R=v,b=o(30985),y=o(74246),O=o(27492),M=o(35979);function T(n){return(0,t.jsx)(r.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,t.jsxs)(c.Z,{className:"cardModalAlerta",color:"danger",children:[(0,t.jsx)(a.Z,{children:"Eliminar Registro"}),(0,t.jsxs)(s.Z,{children:[(0,t.jsxs)(l.Z,{className:"tituloModalAlerta",children:["\xbfEstas seguro de que deseas eliminar el registro con id ",n.idRegistro,"?"]}),(0,t.jsx)("br",{}),n.children,(0,t.jsx)("br",{}),(0,t.jsx)(u.Z,{children:"Se removera el registro de manera permanente y no habra forma de recuperarlo al finalizar la operaci\xf3n."})]}),(0,t.jsx)(R,{children:(0,t.jsx)(b.Z,{children:(0,t.jsxs)(y.Z,{children:[(0,t.jsx)(O.Z,{children:(0,t.jsx)(M.Z,{active:!0,outline:!0,block:!0,color:"primary",onClick:function(){"undefined"!=typeof n.onRechazar&&n.onRechazar(),n.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(O.Z,{children:(0,t.jsx)(M.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.onOk(n.idRegistro),n.toggleModal()},children:"Aceptar"})})]})})})]})})}},15174:function(n,e,o){"use strict";o.d(e,{Z:function(){return l}});var t=o(24246),i=(o(27378),o(8208)),r=o(11355),c=o(26508),a=o(70870),s=o(80311);function l(n){return(0,t.jsx)(i.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,t.jsxs)(r.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(c.Z,{children:"Agregar Registro"}),(0,t.jsxs)(a.Z,{children:[(0,t.jsxs)(s.Z,{className:"tituloModalOpcionesTabla",children:["Agregar registro de ",n.nombreTabla]}),n.children]})]})})}},38718:function(n,e,o){"use strict";o.d(e,{Z:function(){return l}});var t=o(24246),i=(o(27378),o(8208)),r=o(11355),c=o(26508),a=o(70870),s=o(80311);function l(n){return(0,t.jsx)(i.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,t.jsxs)(r.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(c.Z,{children:"Modificar Registro"}),(0,t.jsxs)(a.Z,{children:[(0,t.jsxs)(s.Z,{className:"tituloModalOpcionesTabla",children:["Modifica el registro con id ",n.idRegistro]}),n.children]})]})})}},86480:function(n,e,o){"use strict";o.d(e,{Z:function(){return j}});var t=o(2706),i=o(24246),r=o(27378),c=o(11355),a=o(26508),s=o(30985),l=o(74246),u=o(27492),d=o(70870),f=o(80311),p=o(63115),h=o(66444),g=o(16427);function j(n){var e=(0,t.Z)(r.useState(!1),2),o=e[0],j=e[1],x=(0,t.Z)(r.useState(!1),2),Z=x[0],m=x[1],v={display:n.enCarga?"none":""},R={display:n.enCarga?"":"none"};return(0,i.jsxs)(c.Z,{color:"dark",children:[(0,i.jsx)(a.Z,{className:"text-white",children:(0,i.jsx)(s.Z,{children:(0,i.jsxs)(l.Z,{children:[(0,i.jsx)(u.Z,{children:n.tituloTabla}),(0,i.jsx)(u.Z,{style:{textAlign:"right"},children:(0,g.cr)((function(){m(!Z)}),(function(){j(!o)}),(function(){n.setEnCarga(!n.enCarga)}),n.funcionesOpciones,n.opcionesTabla)})]})})}),(0,i.jsxs)(d.Z,{children:[(0,i.jsx)(f.Z,{children:n.children}),(0,i.jsxs)(s.Z,{children:[(0,i.jsxs)(l.Z,{style:v,children:[(0,i.jsxs)(p.Z,{hover:!0,dark:!0,responsive:!0,children:[(0,i.jsx)("thead",{className:"cabeceraTablaRegistros",children:(0,i.jsxs)("tr",{children:[(0,g.R3)(n.cabeceras),(0,g.FY)(n.funcionesRegistros,n.opcionesTabla)]},"header")}),(0,i.jsx)("tbody",{children:(0,g.oC)(n.cabeceras,n.registros,n.formatoEspecial,n.opcionesTabla,n.funcionesRegistros)})]}),(0,g.DY)(n.paginacion)]}),(0,i.jsxs)(l.Z,{style:R,children:[(0,i.jsx)(u.Z,{}),(0,i.jsx)(u.Z,{xs:"auto",children:(0,i.jsx)(h.Z,{color:"warning",style:{height:"100px",width:"100px"}})}),(0,i.jsx)(u.Z,{})]})]})]}),(0,g.LN)(n.tituloTabla,o,(function(){j(!o)}),n.opcionesTabla,n.funcionesOpciones),(0,g.W3)(n.tituloTabla,Z,(function(){m(!Z)}),n.exportarDatos)]})}},65865:function(n,e,o){"use strict";o.r(e),o.d(e,{default:function(){return C}});var t=o(24246),i=o(30985),r=o(74246),c=o(27492),a=o(2706),s=o(27378),l=o(38718),u=o(15174),d=o(59622),f=o(43532),p=o(43636),h=o(51838),g=o(10798),j=o(35979);function x(n){return(0,t.jsxs)(f.Z,{onSubmit:function(e){e.preventDefault(),n.onModificarRegistro(e,n.registro.id),n.toggleModal()},children:[(0,t.jsxs)(p.Z,{children:[(0,t.jsx)(h.Z,{for:"nombreRol",children:"Rol"}),(0,t.jsx)(g.Z,{id:"nombreRol",name:"campoDescripcionRol",type:"text",defaultValue:n.registro.rolTrabajador})]}),(0,t.jsxs)(p.Z,{children:[(0,t.jsx)(h.Z,{for:"descripcionRol",children:"Descripcion del rol"}),(0,t.jsx)(g.Z,{id:"descripcionRol",name:"campoDescripcionRol",type:"text",defaultValue:n.registro.descripcionRol})]}),(0,t.jsxs)(p.Z,{children:[(0,t.jsx)(h.Z,{for:"permisoVinculado",children:"Permiso vinculado del rol"}),(0,t.jsx)(g.Z,{id:"permisoVinculado",type:"select",defaultValue:n.registro.idPermisoVinculado,children:n.elementosOpciones.map((function(n){return(0,t.jsx)("option",{value:n.id,children:n.descripcionPermiso})}))})]}),(0,t.jsx)("br",{}),(0,t.jsx)(i.Z,{children:(0,t.jsxs)(r.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(j.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(j.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Guardar Cambios"})})]})})]})}function Z(n){return(0,t.jsxs)(f.Z,{onSubmit:function(e){e.preventDefault(),n.onGuardarRegistro(e),n.toggleModal()},children:[(0,t.jsxs)(p.Z,{children:[(0,t.jsx)(h.Z,{for:"descripcionRol",children:"Rol"}),(0,t.jsx)(g.Z,{id:"descripcionRol",name:"campoDescripcionRol",type:"text"})]}),(0,t.jsxs)(p.Z,{children:[(0,t.jsx)(h.Z,{for:"descripcionRol",children:"Descripcion del rol"}),(0,t.jsx)(g.Z,{id:"descripcionRol",name:"campoDescripcionRol",type:"text"})]}),(0,t.jsxs)(p.Z,{children:[(0,t.jsx)(h.Z,{for:"permisoVinculado",children:"Permiso vinculado del rol"}),(0,t.jsx)(g.Z,{id:"permisoVinculado",type:"select",children:n.elementosOpciones.map((function(n){return(0,t.jsx)("option",{value:n.id,children:n.descripcionPermiso})}))})]}),(0,t.jsxs)(p.Z,{children:[(0,t.jsx)(h.Z,{for:"bitRol",children:"Bit de rol"}),(0,t.jsx)(g.Z,{id:"descripcionRol",name:"campoBitRol",type:"number"})]}),(0,t.jsx)("br",{}),(0,t.jsx)(i.Z,{children:(0,t.jsxs)(r.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(j.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(j.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Registrar"})})]})})]})}function m(n){var e=(0,a.Z)(s.useState(""),2),o=e[0],l=e[1];return s.useEffect((function(){n.parametrosBusqueda.setIdPermiso(o)}),[o]),(0,t.jsx)(i.Z,{children:(0,t.jsxs)(r.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(g.Z,{id:"idRol",placeholder:"ID del rol",type:"text",onChange:function(e){var o=null;e.target.value&&(o=parseInt(e.target.value)),n.parametrosBusqueda.setIdRol(o)}})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(g.Z,{id:"rolTrabajador",placeholder:"Nombre del Rol",type:"text",onChange:function(e){n.parametrosBusqueda.setRolTrabajador(e.target.value)}})}),(0,t.jsx)(c.Z,{children:(0,t.jsxs)(g.Z,{id:"idPermiso",type:"select",value:o,onChange:function(n){l(n.target.value)},children:[(0,t.jsx)("option",{value:"",children:"Todos los permisos"}),n.elementosOpciones.map((function(n){return(0,t.jsx)("option",{value:n.id,children:n.descripcionPermiso})}))]})})]})})}var v=o(61914),R=o(86480),b=o(7863),y=o(76972),O=o(15586),M=function(n){return(0,b.jg)(n,[["id"],["rolTrabajador"],["bitRol"],["descripcionRol"],["fechaRegistroRol"],["fechaModificacionRol"]],["id","indexRegistro"])};function T(n){var e=(0,a.Z)(s.useState(!1),2),o=e[0],i=e[1],r=(0,a.Z)(s.useState([]),2),c=r[0],f=r[1],p=(0,a.Z)(s.useState(0),2),h=p[0],g=p[1],j=(0,a.Z)(s.useState(1),2),T=j[0],S=j[1],C=(0,a.Z)(s.useState(1),2),_=C[0],P=C[1],A=(0,a.Z)(s.useState(),2),E=A[0],N=A[1],k=(0,a.Z)(s.useState(),2),I=k[0],D=k[1],w=(0,a.Z)(s.useState(),2),V=w[0],L=w[1],B=(0,a.Z)(s.useState(12),2),F=B[0],q=B[1],G=(0,a.Z)(s.useState(!1),2),z=G[0],U=G[1],W=(0,a.Z)(s.useState(!0),2),X=W[0],Y=W[1],$=(0,a.Z)(s.useState(!1),2),H=$[0],J=$[1],K=(0,a.Z)(s.useState(!1),2),Q=K[0],nn=K[1],en=(0,a.Z)(s.useState(!1),2),on=en[0],tn=en[1],rn=(0,a.Z)(s.useState(!1),2),cn=(rn[0],rn[1],(0,a.Z)(s.useState(void 0),2)),an=cn[0],sn=cn[1],ln=(0,a.Z)(s.useState(void 0),2),un=ln[0],dn=ln[1],fn=(0,a.Z)(s.useState([]),2),pn=fn[0],hn=fn[1];s.useEffect((function(){console.log("refresh"),function(n,e,o,t){(0,O.Op)((function(o){n(o.registros),e(Math.ceil(o.totalRegistros/t.limit))}),t,(function(n){console.log(n),o(!1)}),(function(){n([]),o(!0)}),void 0)}(f,S,i,{limit:F,offset:h,id:I,rolTrabajador:E,idPermisoVinculado:V}),function(n,e){(0,y.zq)((function(e){n(e.registros)}),void 0,(function(n){console.log(n),e(!1)}),(function(){n([]),e(!0)}),(function(){e(!1)}))}(hn,i)}),[F,_,I,E,V,X]);var gn="Tabla de Roles",jn=["ID","Rol","Bit de Rol","Descripci\xf3n del Rol","Fecha de registro","Ultima modificacion"],xn={onEliminar:function(n,e){sn(n),dn(c[e]),J(!H)},onModificar:function(n,e){sn(n),dn(c[e]),nn(!Q)}},Zn={registrosPorPagina:F,opcionesRegistros:z,guardarConfiguracion:function(n){q(n.target[0].value?parseInt(n.target[0].value):0),U(n.target[1].checked),P(1),g(0)}},mn={onAgregarRegistro:function(){tn(!on)},onRefrescarTabla:function(){Y(!X)},onExportarDatos:function(){console.log("datos exportados")},onCambiarConfiguracion:function(){console.log("configuracion cambiada")}},vn={paginaActual:_,offset:h,registrosPorPagina:F,totalPaginas:T,setPaginaActual:P,setOffset:g},Rn={setIdRol:D,setRolTrabajador:N,setIdPermiso:L};return(0,t.jsxs)(R.Z,{tituloTabla:gn,cabeceras:jn,registros:M(c),enCarga:o,setEnCarga:i,exportarDatos:function(n,e){!function(n,e,o,t){n?(0,b.R$)(e,o,M):(0,O.Op)((function(n){(0,b.R$)(n.registros,o,M)}),{},(function(n){console.log(n),t(!1)}))}(n,e,jn,i)},formatoEspecial:{"Fecha de registro":function(n){return n?n.replace("T"," ").slice(0,19):""},"Ultima modificacion":function(n){return n?n.replace("T"," ").slice(0,19):""}},funcionesOpciones:mn,opcionesTabla:Zn,funcionesRegistros:xn,paginacion:vn,children:[(0,t.jsx)(u.Z,{nombreTabla:gn,modalActivo:on,toggleModal:function(){tn(!on)},children:(0,t.jsx)(Z,{elementosOpciones:pn,toggleModal:function(){tn(!on)},onGuardarRegistro:function(n){!function(n,e,o){var t=new FormData;t.append("rolTrabajador",n.target[0].value),t.append("descripcionRol",n.target[1].value),t.append("idPermisoVinculado",n.target[2].value),t.append("bitRol",n.target[3].value),(0,O.pm)(t,void 0,(function(n){console.log(n)}),void 0,(function(){o(!e)}))}(n,X,Y)}})}),(0,t.jsx)(l.Z,{idRegistro:an,modalActivo:Q,toggleModal:function(){nn(!Q)},children:(0,t.jsx)(x,{registro:un,elementosOpciones:pn,onModificarRegistro:function(n,e){!function(n,e,o,t){var i=new FormData;i.append("rolTrabajador",n.target[0].value),i.append("descripcionRol",n.target[1].value),i.append("idPermisoVinculado",n.target[2].value),i.append("bitRol",n.target[3].value),(0,O.i2)(e,i,void 0,(function(n){console.log(n)}),void 0,(function(){t(!o)}))}(n,e,X,Y)},toggleModal:function(){nn(!Q)}})}),(0,t.jsx)(d.Z,{idRegistro:an,modalActivo:H,toggleModal:function(){J(!H)},onOk:function(n){!function(n,e,o){(0,O.uN)(n,void 0,(function(n){console.log(n)}),void 0,(function(){o(!e)}))}(n,X,Y)},children:(0,t.jsx)(v.Z,{tituloDisplay:"nose",registro:un,campos:[["id"],["rolTrabajador"],["descripcionRol"],["bitRol"],["fechaRegistroRol"]],nombresCampos:["id","Rol","Descripcion del Rol","Bit de Rol","fecha de registro"]})}),(0,t.jsx)(m,{parametrosBusqueda:Rn,elementosOpciones:pn})]})}var S=o(6947);function C(){return(0,t.jsx)(s.Fragment,{children:(0,t.jsx)(i.Z,{fluid:!0,children:(0,t.jsx)(r.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(T,{})})})})})}C.getLayout=function(n){return(0,t.jsx)(S.Z,{children:n})}},76972:function(n,e,o){"use strict";o.d(e,{zq:function(){return u},hn:function(){return f},Wi:function(){return d},GO:function(){return p}});var t=o(29132),i=o(85556),r=o(89458),c=function(){var n=(0,t.Z)((function(n){return(0,i.__generator)(this,(function(e){return[2,r.b.PERMISO.CONSULTA(n)]}))}));return function(e){return n.apply(this,arguments)}}(),a=function(){var n=(0,t.Z)((function(n){return(0,i.__generator)(this,(function(e){return[2,r.b.PERMISO.REGISTRAR(n)]}))}));return function(e){return n.apply(this,arguments)}}(),s=function(){var n=(0,t.Z)((function(n,e){return(0,i.__generator)(this,(function(o){return[2,r.b.PERMISO.MODIFICAR(n,e)]}))}));return function(e,o){return n.apply(this,arguments)}}(),l=function(){var n=(0,t.Z)((function(n){return(0,i.__generator)(this,(function(e){return[2,r.b.PERMISO.ELIMINAR(n)]}))}));return function(e){return n.apply(this,arguments)}}();function u(n,e,o,t,i){"undefined"!=typeof t&&t(),c(e).then((function(e){n(e.data)})).catch((function(n){"undefined"!=typeof o&&o(n)})).finally((function(){"undefined"!=typeof i&&i()}))}function d(n,e,o,t,i){"undefined"!=typeof t&&t(),a(n).then((function(n){"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof o&&o(n)})).finally((function(){"undefined"!=typeof i&&i()}))}function f(n,e,o,t,i,r){var c={id:n};"undefined"!=typeof i&&i(),s(c,e).then((function(n){"undefined"!=typeof o&&o(n.data)})).catch((function(n){"undefined"!=typeof t&&t(n)})).finally((function(){"undefined"!=typeof r&&r()}))}function p(n,e,o,t,i){var r={id:n};"undefined"!=typeof t&&t(),l(r).then((function(n){"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof o&&o(n)})).finally((function(){"undefined"!=typeof i&&i()}))}},15586:function(n,e,o){"use strict";o.d(e,{Op:function(){return u},i2:function(){return f},pm:function(){return d},uN:function(){return p}});var t=o(29132),i=o(85556),r=o(89458),c=function(){var n=(0,t.Z)((function(n){return(0,i.__generator)(this,(function(e){return[2,r.b.ROL.CONSULTA(n)]}))}));return function(e){return n.apply(this,arguments)}}(),a=function(){var n=(0,t.Z)((function(n){return(0,i.__generator)(this,(function(e){return[2,r.b.ROL.REGISTRAR(n)]}))}));return function(e){return n.apply(this,arguments)}}(),s=function(){var n=(0,t.Z)((function(n,e){return(0,i.__generator)(this,(function(o){return[2,r.b.ROL.MODIFICAR(n,e)]}))}));return function(e,o){return n.apply(this,arguments)}}(),l=function(){var n=(0,t.Z)((function(n){return(0,i.__generator)(this,(function(e){return[2,r.b.ROL.ELIMINAR(n)]}))}));return function(e){return n.apply(this,arguments)}}();function u(n,e,o,t,i){"undefined"!=typeof t&&t(),c(e).then((function(e){n(e.data)})).catch((function(n){"undefined"!=typeof o&&o(n)})).finally((function(){"undefined"!=typeof i&&i()}))}function d(n,e,o,t,i){"undefined"!=typeof t&&t(),a(n).then((function(n){console.log(n),"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof o&&o(n)})).finally((function(){"undefined"!=typeof i&&i()}))}function f(n,e,o,t,i,r){var c={id:n};"undefined"!=typeof i&&i(),s(c,e).then((function(n){"undefined"!=typeof o&&o(n.data)})).catch((function(n){"undefined"!=typeof t&&t(n)})).finally((function(){"undefined"!=typeof r&&r()}))}function p(n,e,o,t,i){var r={id:n};"undefined"!=typeof t&&t(),l(r).then((function(n){"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof o&&o(n)})).finally((function(){"undefined"!=typeof i&&i()}))}}},function(n){n.O(0,[9080,9556,7815,1798,2234,6062,6399,8023,924,5573,9774,2888,179],(function(){return e=54920,n(n.s=e);var e}));var e=n.O();_N_E=e}]);