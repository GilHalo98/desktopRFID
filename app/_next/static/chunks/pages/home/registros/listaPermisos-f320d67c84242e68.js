(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3876],{87586:function(n,e,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/home/registros/listaPermisos",function(){return i(25618)}])},61914:function(n,e,i){"use strict";i.d(e,{Z:function(){return u}});var t=i(24246),o=(i(27378),i(30985)),r=i(74246),c=i(27492),s=i(63115),a=i(7863);function u(n){var e=(0,a.jg)([n.registro],n.campos,["id"])[0];return(0,t.jsxs)(o.Z,{children:[(0,t.jsx)(r.Z,{children:(0,t.jsx)(c.Z,{children:n.tituloDisplay})}),(0,t.jsx)("hr",{}),(0,t.jsx)(r.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(s.Z,{hover:!0,dark:!0,responsive:!0,children:(0,t.jsx)("tbody",{children:n.nombresCampos.map((function(n,i){return(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:n}),(0,t.jsx)("td",{children:e.data[i]})]})}))})})})})]})}},59622:function(n,e,i){"use strict";i.d(e,{Z:function(){return P}});var t=i(24246),o=i(27378),r=i(8208),c=i(11355),s=i(26508),a=i(70870),u=i(80311),l=i(96129),d=i(23615),f=i.n(d),h=i(60042),p=i.n(h),g=i(75133),Z=["className","cssModule","tag"];function x(){return x=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var t in i)Object.prototype.hasOwnProperty.call(i,t)&&(n[t]=i[t])}return n},x.apply(this,arguments)}function j(n,e){if(null==n)return{};var i,t,o=function(n,e){if(null==n)return{};var i,t,o={},r=Object.keys(n);for(t=0;t<r.length;t++)i=r[t],e.indexOf(i)>=0||(o[i]=n[i]);return o}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(t=0;t<r.length;t++)i=r[t],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(n,i)&&(o[i]=n[i])}return o}var m={className:f().string,cssModule:f().object,tag:g.iC};function v(n){var e=n.className,i=n.cssModule,t=n.tag,r=void 0===t?"div":t,c=j(n,Z),s=(0,g.mx)(p()(e,"card-footer"),i);return o.createElement(r,x({},c,{className:s}))}v.propTypes=m;var y=v,b=i(30985),O=i(74246),R=i(27492),M=i(35979);function P(n){return(0,t.jsx)(r.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,t.jsxs)(c.Z,{className:"cardModalAlerta",color:"danger",children:[(0,t.jsx)(s.Z,{children:"Eliminar Registro"}),(0,t.jsxs)(a.Z,{children:[(0,t.jsxs)(u.Z,{className:"tituloModalAlerta",children:["\xbfEstas seguro de que deseas eliminar el registro con id ",n.idRegistro,"?"]}),(0,t.jsx)("br",{}),n.children,(0,t.jsx)("br",{}),(0,t.jsx)(l.Z,{children:"Se removera el registro de manera permanente y no habra forma de recuperarlo al finalizar la operaci\xf3n."})]}),(0,t.jsx)(y,{children:(0,t.jsx)(b.Z,{children:(0,t.jsxs)(O.Z,{children:[(0,t.jsx)(R.Z,{children:(0,t.jsx)(M.Z,{active:!0,outline:!0,block:!0,color:"primary",onClick:function(){"undefined"!=typeof n.onRechazar&&n.onRechazar(),n.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(R.Z,{children:(0,t.jsx)(M.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.onOk(n.idRegistro),n.toggleModal()},children:"Aceptar"})})]})})})]})})}},15174:function(n,e,i){"use strict";i.d(e,{Z:function(){return u}});var t=i(24246),o=(i(27378),i(8208)),r=i(11355),c=i(26508),s=i(70870),a=i(80311);function u(n){return(0,t.jsx)(o.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,t.jsxs)(r.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(c.Z,{children:"Agregar Registro"}),(0,t.jsxs)(s.Z,{children:[(0,t.jsxs)(a.Z,{className:"tituloModalOpcionesTabla",children:["Agregar registro de ",n.nombreTabla]}),n.children]})]})})}},38718:function(n,e,i){"use strict";i.d(e,{Z:function(){return u}});var t=i(24246),o=(i(27378),i(8208)),r=i(11355),c=i(26508),s=i(70870),a=i(80311);function u(n){return(0,t.jsx)(o.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,t.jsxs)(r.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(c.Z,{children:"Modificar Registro"}),(0,t.jsxs)(s.Z,{children:[(0,t.jsxs)(a.Z,{className:"tituloModalOpcionesTabla",children:["Modifica el registro con id ",n.idRegistro]}),n.children]})]})})}},86480:function(n,e,i){"use strict";i.d(e,{Z:function(){return Z}});var t=i(2706),o=i(24246),r=i(27378),c=i(11355),s=i(26508),a=i(30985),u=i(74246),l=i(27492),d=i(70870),f=i(80311),h=i(63115),p=i(66444),g=i(16427);function Z(n){var e=(0,t.Z)(r.useState(!1),2),i=e[0],Z=e[1],x=(0,t.Z)(r.useState(!1),2),j=x[0],m=x[1],v={display:n.enCarga?"none":""},y={display:n.enCarga?"":"none"};return(0,o.jsxs)(c.Z,{color:"dark",children:[(0,o.jsx)(s.Z,{className:"text-white",children:(0,o.jsx)(a.Z,{children:(0,o.jsxs)(u.Z,{children:[(0,o.jsx)(l.Z,{children:n.tituloTabla}),(0,o.jsx)(l.Z,{style:{textAlign:"right"},children:(0,g.cr)((function(){m(!j)}),(function(){Z(!i)}),(function(){n.setEnCarga(!n.enCarga)}),n.funcionesOpciones,n.opcionesTabla)})]})})}),(0,o.jsxs)(d.Z,{children:[(0,o.jsx)(f.Z,{children:n.children}),(0,o.jsxs)(a.Z,{children:[(0,o.jsxs)(u.Z,{style:v,children:[(0,o.jsxs)(h.Z,{hover:!0,dark:!0,responsive:!0,children:[(0,o.jsx)("thead",{className:"cabeceraTablaRegistros",children:(0,o.jsxs)("tr",{children:[(0,g.R3)(n.cabeceras),(0,g.FY)(n.funcionesRegistros,n.opcionesTabla)]},"header")}),(0,o.jsx)("tbody",{children:(0,g.oC)(n.cabeceras,n.registros,n.formatoEspecial,n.opcionesTabla,n.funcionesRegistros)})]}),(0,g.DY)(n.paginacion)]}),(0,o.jsxs)(u.Z,{style:y,children:[(0,o.jsx)(l.Z,{}),(0,o.jsx)(l.Z,{xs:"auto",children:(0,o.jsx)(p.Z,{color:"warning",style:{height:"100px",width:"100px"}})}),(0,o.jsx)(l.Z,{})]})]})]}),(0,g.LN)(n.tituloTabla,i,(function(){Z(!i)}),n.opcionesTabla,n.funcionesOpciones),(0,g.W3)(n.tituloTabla,j,(function(){m(!j)}),n.exportarDatos)]})}},25618:function(n,e,i){"use strict";i.r(e),i.d(e,{default:function(){return k}});var t=i(24246),o=i(30985),r=i(74246),c=i(27492),s=i(2706),a=i(27378),u=i(38718),l=i(43532),d=i(43636),f=i(51838),h=i(10798),p=i(35979);function g(n){return(0,t.jsxs)(l.Z,{onSubmit:function(e){e.preventDefault(),n.onModificarRegistro(e,n.registro.id),n.toggleModal()},children:[(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(f.Z,{for:"descripcionPermiso",children:"Descripcion del permiso"}),(0,t.jsx)(h.Z,{id:"descripcionPermiso",name:"campoDescripcionPermiso",type:"text",defaultValue:n.registro.descripcionPermiso})]}),(0,t.jsx)(f.Z,{children:"Autorizaci\xf3n"}),(0,t.jsx)(o.Z,{children:(0,t.jsx)(r.Z,{children:n.elementosOpciones.map((function(e,i){return(0,t.jsx)(c.Z,{sm:6,children:(0,t.jsxs)(d.Z,{check:!0,children:[(0,t.jsx)(h.Z,{type:"checkbox",value:e.bitZona,defaultChecked:!!(n.registro.autorizacion&e.bitZona)}),(0,t.jsx)(f.Z,{check:!0,children:e.nombreZona})]})})}))})}),(0,t.jsx)("br",{}),(0,t.jsx)(o.Z,{children:(0,t.jsxs)(r.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(p.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(p.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Guardar Cambios"})})]})})]})}function Z(n){return(0,t.jsxs)(l.Z,{onSubmit:function(e){e.preventDefault(),n.onGuardarRegistro(e),n.toggleModal()},children:[(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(f.Z,{for:"descripcionPermiso",children:"Descripcion del permiso"}),(0,t.jsx)(h.Z,{id:"descripcionPermiso",name:"campoDescripcionPermiso",type:"text"})]}),(0,t.jsx)(f.Z,{children:"Autorizaci\xf3n"}),(0,t.jsx)(o.Z,{children:(0,t.jsx)(r.Z,{children:n.elementosOpciones.map((function(n,e){return(0,t.jsx)(c.Z,{sm:6,children:(0,t.jsxs)(d.Z,{check:!0,children:[(0,t.jsx)(h.Z,{type:"checkbox",value:n.bitZona}),(0,t.jsx)(f.Z,{check:!0,children:n.nombreZona})]})})}))})}),(0,t.jsx)("br",{}),(0,t.jsx)(o.Z,{children:(0,t.jsxs)(r.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(p.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(p.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Registrar"})})]})})]})}var x=i(15174),j=i(59622);function m(n){return(0,t.jsx)(o.Z,{children:(0,t.jsxs)(r.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(h.Z,{id:"idPermiso",placeholder:"ID del permiso",type:"text",onChange:function(e){var i=null;e.target.value&&(i=parseInt(e.target.value)),n.parametrosBusqueda.setIdPermiso(i)}})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(h.Z,{id:"descripcionPermiso",placeholder:"Descripci\xf3n del permiso",type:"text",onChange:function(e){n.parametrosBusqueda.setDescripcionPermiso(e.target.value)}})})]})})}var v=i(61914),y=i(86480),b=i(7863),O=i(73990),R=i(76972),M=function(n){return(0,b.jg)(n,[["id"],["descripcionPermiso"],["autorizacion"],["fechaRegistroPermiso"],["fechaModificacionPermiso"]],["id","indexRegistro"])};function P(n){var e=(0,s.Z)(a.useState(!1),2),i=e[0],o=e[1],r=(0,s.Z)(a.useState([]),2),c=r[0],l=r[1],d=(0,s.Z)(a.useState(1),2),f=d[0],h=d[1],p=(0,s.Z)(a.useState(1),2),P=p[0],S=p[1],k=(0,s.Z)(a.useState(0),2),A=k[0],C=k[1],_=(0,s.Z)(a.useState(void 0),2),N=_[0],T=_[1],E=(0,s.Z)(a.useState(void 0),2),D=E[0],I=E[1],w=(0,s.Z)(a.useState(12),2),z=w[0],F=w[1],q=(0,s.Z)(a.useState(!1),2),G=q[0],L=q[1],U=(0,s.Z)(a.useState(!0),2),B=U[0],W=U[1],X=(0,s.Z)(a.useState(!1),2),Y=X[0],$=X[1],V=(0,s.Z)(a.useState(!1),2),H=V[0],J=V[1],K=(0,s.Z)(a.useState(!1),2),Q=K[0],nn=K[1],en=(0,s.Z)(a.useState(void 0),2),tn=en[0],on=en[1],rn=(0,s.Z)(a.useState(void 0),2),cn=rn[0],sn=rn[1],an=(0,s.Z)(a.useState([]),2),un=an[0],ln=an[1];a.useEffect((function(){console.log("refresh"),function(n,e,i,t){(0,R.zq)((function(i){n(i.registros),e(Math.ceil(i.totalRegistros/t.limit))}),t,(function(n){console.log(n),i(!1)}),(function(){n([]),i(!0)}),void 0)}(l,h,o,{limit:z,offset:A,id:D,descripcionPermiso:N}),function(n,e){(0,O.hF)((function(e){n(e.registros)}),void 0,(function(n){console.log(n),e(!1)}),(function(){n([]),e(!0)}),(function(){e(!1)}))}(ln,o)}),[z,P,D,N,B]);var dn="Tabla de Permisos",fn=["ID","Descripci\xf3n del permiso","Accesos del permiso","Fecha de registro","Ultima modificacion"],hn={onEliminar:function(n,e){on(n),sn(c[e]),$(!Y)},onModificar:function(n,e){on(n),sn(c[e]),J(!H)}},pn={registrosPorPagina:z,opcionesRegistros:G,guardarConfiguracion:function(n){F(n.target[0].value?parseInt(n.target[0].value):0),L(n.target[1].checked),S(1),C(0)}},gn={onAgregarRegistro:function(){nn(!Q)},onRefrescarTabla:function(){W(!B)},onExportarDatos:function(){console.log("datos exportados")},onCambiarConfiguracion:function(){console.log("configuracion cambiada")}},Zn={paginaActual:P,offset:A,registrosPorPagina:z,totalPaginas:f,setPaginaActual:S,setOffset:C},xn={setIdPermiso:I,setDescripcionPermiso:T};return(0,t.jsxs)(y.Z,{tituloTabla:dn,cabeceras:fn,registros:M(c),enCarga:i,setEnCarga:o,exportarDatos:function(n,e){!function(n,e,i,t){n?(0,b.R$)(e,i,M):(0,R.zq)((function(n){(0,b.R$)(n.registros,i,M)}),{},(function(n){console.log(n),t(!1)}))}(n,e,fn,o)},formatoEspecial:{"Fecha de registro":function(n){return n?n.replace("T"," ").slice(0,19):""},"Ultima modificacion":function(n){return n?n.replace("T"," ").slice(0,19):""}},funcionesOpciones:gn,opcionesTabla:pn,funcionesRegistros:hn,paginacion:Zn,children:[(0,t.jsx)(x.Z,{nombreTabla:dn,modalActivo:Q,toggleModal:function(){nn(!Q)},children:(0,t.jsx)(Z,{elementosOpciones:un,toggleModal:function(){nn(!Q)},onGuardarRegistro:function(n){!function(n,e,i){for(var t=new FormData,o=0,r=1;r<n.target.length-2;r++){var c=n.target[r];c.checked&&(o+=parseInt(c.value))}t.append("descripcionPermiso",n.target[0].value),t.append("autorizacion",o.toString()),(0,R.Wi)(t,void 0,(function(n){console.log(n)}),void 0,(function(){i(!e)}))}(n,B,W)}})}),(0,t.jsx)(u.Z,{idRegistro:tn,modalActivo:H,toggleModal:function(){J(!H)},children:(0,t.jsx)(g,{registro:cn,elementosOpciones:un,onModificarRegistro:function(n,e){!function(n,e,i,t){for(var o=new FormData,r=0,c=1;c<n.target.length-2;c++){var s=n.target[c];s.checked&&(r+=parseInt(s.value))}o.append("descripcionPermiso",n.target[0].value),o.append("autorizacion",r.toString()),(0,R.hn)(e,o,void 0,(function(n){console.log(n)}),void 0,(function(){t(!i)}))}(n,e,B,W)},toggleModal:function(){J(!H)}})}),(0,t.jsx)(j.Z,{idRegistro:tn,modalActivo:Y,toggleModal:function(){$(!Y)},onOk:function(n){!function(n,e,i){(0,R.GO)(n,void 0,(function(n){console.log(n)}),void 0,(function(){i(!e)}))}(n,B,W)},children:(0,t.jsx)(v.Z,{tituloDisplay:"nose",registro:cn,campos:[["id"],["descripcionPermiso"],["autorizacion"],["fechaRegistroPermiso"]],nombresCampos:["id","descripcion del permiso","autorizacion del permiso","fecha de registro"]})}),(0,t.jsx)(m,{parametrosBusqueda:xn})]})}var S=i(6947);function k(){return(0,t.jsx)(a.Fragment,{children:(0,t.jsx)(o.Z,{fluid:!0,children:(0,t.jsx)(r.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(P,{})})})})})}k.getLayout=function(n){return(0,t.jsx)(S.Z,{children:n})}},76972:function(n,e,i){"use strict";i.d(e,{zq:function(){return l},hn:function(){return f},Wi:function(){return d},GO:function(){return h}});var t=i(29132),o=i(85556),r=i(89458),c=function(){var n=(0,t.Z)((function(n){return(0,o.__generator)(this,(function(e){return[2,r.b.PERMISO.CONSULTA(n)]}))}));return function(e){return n.apply(this,arguments)}}(),s=function(){var n=(0,t.Z)((function(n){return(0,o.__generator)(this,(function(e){return[2,r.b.PERMISO.REGISTRAR(n)]}))}));return function(e){return n.apply(this,arguments)}}(),a=function(){var n=(0,t.Z)((function(n,e){return(0,o.__generator)(this,(function(i){return[2,r.b.PERMISO.MODIFICAR(n,e)]}))}));return function(e,i){return n.apply(this,arguments)}}(),u=function(){var n=(0,t.Z)((function(n){return(0,o.__generator)(this,(function(e){return[2,r.b.PERMISO.ELIMINAR(n)]}))}));return function(e){return n.apply(this,arguments)}}();function l(n,e,i,t,o){"undefined"!=typeof t&&t(),c(e).then((function(e){n(e.data)})).catch((function(n){"undefined"!=typeof i&&i(n)})).finally((function(){"undefined"!=typeof o&&o()}))}function d(n,e,i,t,o){"undefined"!=typeof t&&t(),s(n).then((function(n){"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof i&&i(n)})).finally((function(){"undefined"!=typeof o&&o()}))}function f(n,e,i,t,o,r){var c={id:n};"undefined"!=typeof o&&o(),a(c,e).then((function(n){"undefined"!=typeof i&&i(n.data)})).catch((function(n){"undefined"!=typeof t&&t(n)})).finally((function(){"undefined"!=typeof r&&r()}))}function h(n,e,i,t,o){var r={id:n};"undefined"!=typeof t&&t(),u(r).then((function(n){"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof i&&i(n)})).finally((function(){"undefined"!=typeof o&&o()}))}},73990:function(n,e,i){"use strict";i.d(e,{hF:function(){return l},fu:function(){return h},DS:function(){return d},Mf:function(){return f}});var t=i(29132),o=i(85556),r=i(89458),c=function(){var n=(0,t.Z)((function(n){return(0,o.__generator)(this,(function(e){return[2,r.b.ZONA.CONSULTA(n)]}))}));return function(e){return n.apply(this,arguments)}}(),s=function(){var n=(0,t.Z)((function(n){return(0,o.__generator)(this,(function(e){return[2,r.b.ZONA.REGISTRAR(n)]}))}));return function(e){return n.apply(this,arguments)}}(),a=function(){var n=(0,t.Z)((function(n,e){return(0,o.__generator)(this,(function(i){return[2,r.b.ZONA.MODIFICAR(n,e)]}))}));return function(e,i){return n.apply(this,arguments)}}(),u=function(){var n=(0,t.Z)((function(n){return(0,o.__generator)(this,(function(e){return[2,r.b.ZONA.ELIMINAR(n)]}))}));return function(e){return n.apply(this,arguments)}}();function l(n,e,i,t,o){"undefined"!=typeof t&&t(),c(e).then((function(e){n(e.data)})).catch((function(n){"undefined"!=typeof i&&i(n)})).finally((function(){"undefined"!=typeof o&&o()}))}function d(n,e,i,t,o){"undefined"!=typeof t&&t(),s(n).then((function(n){"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof i&&i(n)})).finally((function(){"undefined"!=typeof o&&o()}))}function f(n,e,i,t,o){var r={id:n};"undefined"!=typeof t&&t(),u(r).then((function(n){"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof i&&i(n)})).finally((function(){"undefined"!=typeof o&&o()}))}function h(n,e,i,t,o,r){var c={id:n};"undefined"!=typeof o&&o(),a(c,e).then((function(n){"undefined"!=typeof i&&i(n.data)})).catch((function(n){"undefined"!=typeof t&&t(n)})).finally((function(){"undefined"!=typeof r&&r()}))}}},function(n){n.O(0,[9080,9556,7815,1798,2234,6062,6399,8023,924,5573,9774,2888,179],(function(){return e=87586,n(n.s=e);var e}));var e=n.O();_N_E=e}]);