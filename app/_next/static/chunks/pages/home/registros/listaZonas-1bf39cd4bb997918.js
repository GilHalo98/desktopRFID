(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1941],{87580:function(n,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/home/registros/listaZonas",function(){return o(13865)}])},61914:function(n,e,o){"use strict";o.d(e,{Z:function(){return l}});var t=o(24246),i=(o(27378),o(30985)),r=o(74246),a=o(27492),c=o(63115),s=o(7863);function l(n){var e=(0,s.jg)([n.registro],n.campos,["id"])[0];return(0,t.jsxs)(i.Z,{children:[(0,t.jsx)(r.Z,{children:(0,t.jsx)(a.Z,{children:n.tituloDisplay})}),(0,t.jsx)("hr",{}),(0,t.jsx)(r.Z,{children:(0,t.jsx)(a.Z,{children:(0,t.jsx)(c.Z,{hover:!0,dark:!0,responsive:!0,children:(0,t.jsx)("tbody",{children:n.nombresCampos.map((function(n,o){return(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:n}),(0,t.jsx)("td",{children:e.data[o]})]})}))})})})})]})}},59622:function(n,e,o){"use strict";o.d(e,{Z:function(){return O}});var t=o(24246),i=o(27378),r=o(8208),a=o(11355),c=o(26508),s=o(70870),l=o(80311),d=o(96129),u=o(23615),f=o.n(u),Z=o(60042),h=o.n(Z),g=o(75133),p=["className","cssModule","tag"];function x(){return x=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(n[t]=o[t])}return n},x.apply(this,arguments)}function j(n,e){if(null==n)return{};var o,t,i=function(n,e){if(null==n)return{};var o,t,i={},r=Object.keys(n);for(t=0;t<r.length;t++)o=r[t],e.indexOf(o)>=0||(i[o]=n[o]);return i}(n,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);for(t=0;t<r.length;t++)o=r[t],e.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(n,o)&&(i[o]=n[o])}return i}var m={className:f().string,cssModule:f().object,tag:g.iC};function b(n){var e=n.className,o=n.cssModule,t=n.tag,r=void 0===t?"div":t,a=j(n,p),c=(0,g.mx)(h()(e,"card-footer"),o);return i.createElement(r,x({},a,{className:c}))}b.propTypes=m;var v=b,y=o(30985),R=o(74246),M=o(27492),N=o(35979);function O(n){return(0,t.jsx)(r.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,t.jsxs)(a.Z,{className:"cardModalAlerta",color:"danger",children:[(0,t.jsx)(c.Z,{children:"Eliminar Registro"}),(0,t.jsxs)(s.Z,{children:[(0,t.jsxs)(l.Z,{className:"tituloModalAlerta",children:["\xbfEstas seguro de que deseas eliminar el registro con id ",n.idRegistro,"?"]}),(0,t.jsx)("br",{}),n.children,(0,t.jsx)("br",{}),(0,t.jsx)(d.Z,{children:"Se removera el registro de manera permanente y no habra forma de recuperarlo al finalizar la operaci\xf3n."})]}),(0,t.jsx)(v,{children:(0,t.jsx)(y.Z,{children:(0,t.jsxs)(R.Z,{children:[(0,t.jsx)(M.Z,{children:(0,t.jsx)(N.Z,{active:!0,outline:!0,block:!0,color:"primary",onClick:function(){"undefined"!=typeof n.onRechazar&&n.onRechazar(),n.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(M.Z,{children:(0,t.jsx)(N.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.onOk(n.idRegistro),n.toggleModal()},children:"Aceptar"})})]})})})]})})}},15174:function(n,e,o){"use strict";o.d(e,{Z:function(){return l}});var t=o(24246),i=(o(27378),o(8208)),r=o(11355),a=o(26508),c=o(70870),s=o(80311);function l(n){return(0,t.jsx)(i.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,t.jsxs)(r.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(a.Z,{children:"Agregar Registro"}),(0,t.jsxs)(c.Z,{children:[(0,t.jsxs)(s.Z,{className:"tituloModalOpcionesTabla",children:["Agregar registro de ",n.nombreTabla]}),n.children]})]})})}},38718:function(n,e,o){"use strict";o.d(e,{Z:function(){return l}});var t=o(24246),i=(o(27378),o(8208)),r=o(11355),a=o(26508),c=o(70870),s=o(80311);function l(n){return(0,t.jsx)(i.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,t.jsxs)(r.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(a.Z,{children:"Modificar Registro"}),(0,t.jsxs)(c.Z,{children:[(0,t.jsxs)(s.Z,{className:"tituloModalOpcionesTabla",children:["Modifica el registro con id ",n.idRegistro]}),n.children]})]})})}},86480:function(n,e,o){"use strict";o.d(e,{Z:function(){return p}});var t=o(2706),i=o(24246),r=o(27378),a=o(11355),c=o(26508),s=o(30985),l=o(74246),d=o(27492),u=o(70870),f=o(80311),Z=o(63115),h=o(66444),g=o(16427);function p(n){var e=(0,t.Z)(r.useState(!1),2),o=e[0],p=e[1],x=(0,t.Z)(r.useState(!1),2),j=x[0],m=x[1],b={display:n.enCarga?"none":""},v={display:n.enCarga?"":"none"};return(0,i.jsxs)(a.Z,{color:"dark",children:[(0,i.jsx)(c.Z,{className:"text-white",children:(0,i.jsx)(s.Z,{children:(0,i.jsxs)(l.Z,{children:[(0,i.jsx)(d.Z,{children:n.tituloTabla}),(0,i.jsx)(d.Z,{style:{textAlign:"right"},children:(0,g.cr)((function(){m(!j)}),(function(){p(!o)}),(function(){n.setEnCarga(!n.enCarga)}),n.funcionesOpciones,n.opcionesTabla)})]})})}),(0,i.jsxs)(u.Z,{children:[(0,i.jsx)(f.Z,{children:n.children}),(0,i.jsxs)(s.Z,{children:[(0,i.jsxs)(l.Z,{style:b,children:[(0,i.jsxs)(Z.Z,{hover:!0,dark:!0,responsive:!0,children:[(0,i.jsx)("thead",{className:"cabeceraTablaRegistros",children:(0,i.jsxs)("tr",{children:[(0,g.R3)(n.cabeceras),(0,g.FY)(n.funcionesRegistros,n.opcionesTabla)]},"header")}),(0,i.jsx)("tbody",{children:(0,g.oC)(n.cabeceras,n.registros,n.formatoEspecial,n.opcionesTabla,n.funcionesRegistros)})]}),(0,g.DY)(n.paginacion)]}),(0,i.jsxs)(l.Z,{style:v,children:[(0,i.jsx)(d.Z,{}),(0,i.jsx)(d.Z,{xs:"auto",children:(0,i.jsx)(h.Z,{color:"warning",style:{height:"100px",width:"100px"}})}),(0,i.jsx)(d.Z,{})]})]})]}),(0,g.LN)(n.tituloTabla,o,(function(){p(!o)}),n.opcionesTabla,n.funcionesOpciones),(0,g.W3)(n.tituloTabla,j,(function(){m(!j)}),n.exportarDatos)]})}},13865:function(n,e,o){"use strict";o.r(e),o.d(e,{default:function(){return C}});var t=o(24246),i=o(27378),r=o(30985),a=o(74246),c=o(27492),s=o(2706),l=o(38718),d=o(15174),u=o(59622),f=o(43532),Z=o(43636),h=o(51838),g=o(10798),p=o(35979);function x(n){return(0,t.jsxs)(f.Z,{onSubmit:function(e){e.preventDefault(),n.onModificarRegistro(e,n.registro.id),n.toggleModal()},children:[(0,t.jsxs)(Z.Z,{children:[(0,t.jsx)(h.Z,{for:"nombreZona",children:"Nombre de la zona"}),(0,t.jsx)(g.Z,{id:"nombreZona",name:"campoNombreZona",type:"text",defaultValue:n.registro.nombreZona})]}),(0,t.jsxs)(Z.Z,{children:[(0,t.jsx)(h.Z,{for:"descripcionZona",children:"Descripci\xf3n de la zona"}),(0,t.jsx)(g.Z,{id:"descripcionZona",name:"campoDescripcionZona",type:"text",defaultValue:n.registro.descripcionZona})]}),(0,t.jsxs)(Z.Z,{children:[(0,t.jsx)(h.Z,{for:"bitZona",children:"Bit de acceso de la zona"}),(0,t.jsx)(g.Z,{id:"bitZona",name:"campoBitZona",type:"text",defaultValue:n.registro.bitZona})]}),(0,t.jsx)("br",{}),(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(p.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(p.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Guardar Cambios"})})]})})]})}function j(n){return(0,t.jsxs)(f.Z,{onSubmit:function(e){e.preventDefault(),n.onGuardarRegistro(e),n.toggleModal()},children:[(0,t.jsxs)(Z.Z,{children:[(0,t.jsx)(h.Z,{for:"nombreZona",children:"Nombre de la zona"}),(0,t.jsx)(g.Z,{id:"nombreZona",name:"campoNombreZona",type:"text"})]}),(0,t.jsxs)(Z.Z,{children:[(0,t.jsx)(h.Z,{for:"descripcionZona",children:"Descripci\xf3n de la zona"}),(0,t.jsx)(g.Z,{id:"descripcionZona",name:"campoDescripcionZona",type:"text"})]}),(0,t.jsxs)(Z.Z,{children:[(0,t.jsx)(h.Z,{for:"bitZona",children:"Bit de acceso de la zona"}),(0,t.jsx)(g.Z,{id:"bitZona",name:"campoBitZona",type:"text"})]}),(0,t.jsx)("br",{}),(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(p.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(p.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Registrar"})})]})})]})}function m(n){return(0,t.jsxs)(r.Z,{children:[(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(g.Z,{id:"idZona",placeholder:"ID de la zona",type:"text",onChange:function(e){var o=null;e.target.value&&(o=parseInt(e.target.value)),n.parametrosBusqueda.setIdZona(o)}})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(g.Z,{id:"nombreZona",placeholder:"Nombre de la zona",type:"text",onChange:function(e){n.parametrosBusqueda.setNombreZona(e.target.value)}})})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(g.Z,{id:"descripcionZona",placeholder:"Descripcion de la zona",type:"text",onChange:function(e){n.parametrosBusqueda.setDescripcionZona(e.target.value)}})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(g.Z,{id:"bitZona",placeholder:"Bit de acceso de la zona",type:"text",onChange:function(e){var o=null;e.target.value&&(o=parseInt(e.target.value)),n.parametrosBusqueda.setBitZona(o)}})})]})]})}var b=o(61914),v=o(86480),y=o(7863),R=o(73990),M=function(n){return(0,y.jg)(n,[["id"],["nombreZona"],["descripcionZona"],["bitZona"],["fechaRegistroZona"],["fechaModificacionZona"]],["id","indexRegistro"])};function N(n){var e=(0,s.Z)(i.useState(!1),2),o=e[0],r=e[1],a=(0,s.Z)(i.useState([]),2),c=a[0],f=a[1],Z=(0,s.Z)(i.useState(0),2),h=Z[0],g=Z[1],p=(0,s.Z)(i.useState(1),2),N=p[0],O=p[1],C=(0,s.Z)(i.useState(1),2),S=C[0],A=C[1],D=(0,s.Z)(i.useState(void 0),2),T=D[0],k=D[1],_=(0,s.Z)(i.useState(void 0),2),z=_[0],E=_[1],w=(0,s.Z)(i.useState(void 0),2),B=w[0],I=w[1],F=(0,s.Z)(i.useState(void 0),2),P=F[0],q=F[1],G=(0,s.Z)(i.useState(12),2),L=G[0],U=G[1],V=(0,s.Z)(i.useState(!1),2),X=V[0],Y=V[1],$=(0,s.Z)(i.useState(!0),2),W=$[0],H=$[1],J=(0,s.Z)(i.useState(!1),2),K=J[0],Q=J[1],nn=(0,s.Z)(i.useState(!1),2),en=nn[0],on=nn[1],tn=(0,s.Z)(i.useState(!1),2),rn=tn[0],an=tn[1],cn=(0,s.Z)(i.useState(!1),2),sn=(cn[0],cn[1],(0,s.Z)(i.useState(void 0),2)),ln=sn[0],dn=sn[1],un=(0,s.Z)(i.useState(void 0),2),fn=un[0],Zn=un[1];i.useEffect((function(){console.log("refresh"),function(n,e,o,t){(0,R.hF)((function(o){n(o.registros),e(Math.ceil(o.totalRegistros/t.limit))}),t,(function(n){console.log(n),o(!1)}),(function(){n([]),o(!0)}),(function(){o(!1)}))}(f,O,r,{limit:L,offset:h,id:T,nombreZona:z,descripcionZona:B,bitZona:P})}),[L,S,T,z,B,P,W]);var hn="Tabla de Zonas",gn=["ID","Nombre de zona","Descripcion","Bit de accezo a zona","Fecha de registro","Ultima modificacion"],pn={onEliminar:function(n,e){dn(n),Zn(c[e]),Q(!K)},onModificar:function(n,e){dn(n),Zn(c[e]),on(!en)}},xn={registrosPorPagina:L,opcionesRegistros:X,guardarConfiguracion:function(n){U(n.target[0].value?parseInt(n.target[0].value):0),Y(n.target[1].checked),A(1),g(0)}},jn={onAgregarRegistro:function(){an(!rn)},onRefrescarTabla:function(){H(!W)},onExportarDatos:function(){console.log("datos exportados")},onCambiarConfiguracion:function(){console.log("configuracion cambiada")}},mn={paginaActual:S,offset:h,registrosPorPagina:L,totalPaginas:N,setPaginaActual:A,setOffset:g},bn={setIdZona:k,setNombreZona:E,setDescripcionZona:I,setBitZona:q};return(0,t.jsxs)(v.Z,{tituloTabla:hn,cabeceras:gn,registros:M(c),enCarga:o,setEnCarga:r,exportarDatos:function(n,e){!function(n,e,o,t){n?(0,y.R$)(e,o,M):(0,R.hF)((function(n){(0,y.R$)(n.registros,o,M)}),{},(function(n){console.log(n),t(!1)}))}(n,e,gn,r)},formatoEspecial:{"Fecha de registro":function(n){return n?n.replace("T"," ").slice(0,19):""},"Ultima modificacion":function(n){return n?n.replace("T"," ").slice(0,19):""}},funcionesOpciones:jn,opcionesTabla:xn,funcionesRegistros:pn,paginacion:mn,children:[(0,t.jsx)(d.Z,{nombreTabla:hn,modalActivo:rn,toggleModal:function(){an(!rn)},children:(0,t.jsx)(j,{toggleModal:function(){an(!rn)},onGuardarRegistro:function(n){!function(n,e,o){var t=new FormData;t.append("nombreZona",n.target[0].value),t.append("descripcionZona",n.target[1].value),t.append("bitZona",n.target[2].value),(0,R.DS)(t,void 0,(function(n){console.log(n)}),void 0,(function(){o(!e)}))}(n,W,H)}})}),(0,t.jsx)(l.Z,{idRegistro:ln,modalActivo:en,toggleModal:function(){on(!en)},children:(0,t.jsx)(x,{registro:fn,onModificarRegistro:function(n,e){!function(n,e,o,t){var i=new FormData;i.append("nombreZona",n.target[0].value),i.append("descripcionZona",n.target[1].value),i.append("bitZona",n.target[2].value),(0,R.fu)(e,i,void 0,(function(n){console.log(n)}),void 0,(function(){t(!o)}))}(n,e,W,H)},toggleModal:function(){on(!en)}})}),(0,t.jsx)(u.Z,{idRegistro:ln,modalActivo:K,toggleModal:function(){Q(!K)},onOk:function(n){!function(n,e,o){(0,R.Mf)(n,void 0,(function(n){console.log(n)}),void 0,(function(){o(!e)}))}(n,W,H)},children:(0,t.jsx)(b.Z,{tituloDisplay:"nose",registro:fn,campos:[["id"],["nombreZona"],["descripcionZona"],["bitZona"],["fechaRegistroTipoReporte"]],nombresCampos:["ID","Nombre de zona","Descripcion","Bit de accezo a zona","Fecha de registro"]})}),(0,t.jsx)(m,{parametrosBusqueda:bn})]})}var O=o(6947);function C(){return(0,t.jsx)(i.Fragment,{children:(0,t.jsx)(r.Z,{fluid:!0,children:(0,t.jsx)(a.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(N,{})})})})})}C.getLayout=function(n){return(0,t.jsx)(O.Z,{children:n})}},73990:function(n,e,o){"use strict";o.d(e,{hF:function(){return d},fu:function(){return Z},DS:function(){return u},Mf:function(){return f}});var t=o(29132),i=o(85556),r=o(89458),a=function(){var n=(0,t.Z)((function(n){return(0,i.__generator)(this,(function(e){return[2,r.b.ZONA.CONSULTA(n)]}))}));return function(e){return n.apply(this,arguments)}}(),c=function(){var n=(0,t.Z)((function(n){return(0,i.__generator)(this,(function(e){return[2,r.b.ZONA.REGISTRAR(n)]}))}));return function(e){return n.apply(this,arguments)}}(),s=function(){var n=(0,t.Z)((function(n,e){return(0,i.__generator)(this,(function(o){return[2,r.b.ZONA.MODIFICAR(n,e)]}))}));return function(e,o){return n.apply(this,arguments)}}(),l=function(){var n=(0,t.Z)((function(n){return(0,i.__generator)(this,(function(e){return[2,r.b.ZONA.ELIMINAR(n)]}))}));return function(e){return n.apply(this,arguments)}}();function d(n,e,o,t,i){"undefined"!=typeof t&&t(),a(e).then((function(e){n(e.data)})).catch((function(n){"undefined"!=typeof o&&o(n)})).finally((function(){"undefined"!=typeof i&&i()}))}function u(n,e,o,t,i){"undefined"!=typeof t&&t(),c(n).then((function(n){"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof o&&o(n)})).finally((function(){"undefined"!=typeof i&&i()}))}function f(n,e,o,t,i){var r={id:n};"undefined"!=typeof t&&t(),l(r).then((function(n){"undefined"!=typeof e&&e(n.data)})).catch((function(n){"undefined"!=typeof o&&o(n)})).finally((function(){"undefined"!=typeof i&&i()}))}function Z(n,e,o,t,i,r){var a={id:n};"undefined"!=typeof i&&i(),s(a,e).then((function(n){"undefined"!=typeof o&&o(n.data)})).catch((function(n){"undefined"!=typeof t&&t(n)})).finally((function(){"undefined"!=typeof r&&r()}))}}},function(n){n.O(0,[9080,9556,7815,1798,2234,6062,6399,8023,924,5573,9774,2888,179],(function(){return e=87580,n(n.s=e);var e}));var e=n.O();_N_E=e}]);