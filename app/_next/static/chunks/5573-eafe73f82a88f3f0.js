(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5573],{16427:function(n,e,o){"use strict";o.d(e,{cr:function(){return E},zU:function(){return S},Ds:function(){return _},R3:function(){return H},oC:function(){return B},_U:function(){return F},FY:function(){return V},NL:function(){return U},W3:function(){return q},LN:function(){return L},DY:function(){return G}});var i=o(24246),r=o(30985),t=o(74246),a=o(27492),s=o(27378),c=o(89823),l=o.n(c);var d=o(31804),u=o(35979),f=o(23438);function p(n){return(0,i.jsx)(d.Z,{size:"sm",children:(0,i.jsx)(u.Z,{className:"botonIcono",color:"primary",outline:!0,onClick:function(){n.onGuardarConfiguracionDispositivo(n.idRegistro,n.indexRegistro)},children:(0,i.jsx)(l(),{path:f.Uc0,size:1})})})}function x(n){return(0,i.jsxs)(d.Z,{size:"sm",children:[(r=n.onRefrescarTabla,"undefined"==typeof r?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"primary",onClick:function(){r()},children:(0,i.jsx)(l(),{path:f.vqH,size:1})})),(o=n.onProbarSerial,"undefined"==typeof o?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"primary",onClick:function(){o()},children:(0,i.jsx)(l(),{path:f.BbL,size:1})})),(e=n.onOpciones,"undefined"==typeof e?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"warning",onClick:function(){e()},children:(0,i.jsx)(l(),{path:f.Shd,size:1})}))]});var e,o,r}function g(n){return(0,i.jsxs)(d.Z,{size:"sm",children:["undefined"!=typeof n.onModificar?(0,i.jsx)(u.Z,{className:"botonIcono",color:"warning",outline:!0,onClick:function(){n.onModificar(n.idRegistro,n.indexRegistro)},children:(0,i.jsx)(l(),{path:f.TnX,size:1})}):"","undefined"!=typeof n.onModificar?(0,i.jsx)(u.Z,{className:"botonIcono",color:"danger",outline:!0,onClick:function(){n.onEliminar(n.idRegistro,n.indexRegistro)},children:(0,i.jsx)(l(),{path:f.byr,size:1})}):"","undefined"!=typeof n.onVisualizarDetalles?(0,i.jsx)(u.Z,{className:"botonIcono",color:"info",outline:!0,onClick:function(){n.onVisualizarDetalles(n.idRegistro,n.indexRegistro)},children:(0,i.jsx)(l(),{path:f.rgx,size:1})}):""]})}function h(n){return(0,i.jsxs)(d.Z,{size:"sm",children:[(t=n.onAgregarRegistro,"undefined"==typeof t?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"success",onClick:function(){t()},children:(0,i.jsx)(l(),{path:f.jmz,size:1})})),(r=n.onRefrescarTabla,"undefined"==typeof r?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"primary",onClick:function(){r()},children:(0,i.jsx)(l(),{path:f.MPt,size:1})})),(o=n.onExportarDatos,"undefined"==typeof o?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"primary",onClick:function(){o()},children:(0,i.jsx)(l(),{path:f.zeu,size:1})})),(e=n.onOpciones,"undefined"==typeof e?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"warning",onClick:function(){e()},children:(0,i.jsx)(l(),{path:f.Shd,size:1})}))]});var e,o,r,t}var j=o(8208),m=o(11355),b=o(26508),Z=o(70870),y=o(80311),R=o(43532),v=o(43636),C=o(10798),T=o(51838);function k(n){return(0,i.jsxs)(R.Z,{onSubmit:function(e){e.preventDefault();var o=e.target[0].checked;n.exportarDatos(o),n.toggleModal()},children:[(0,i.jsx)("div",{children:"Guarda los datos de la tabla en un archivo de hoja de calculo"}),(0,i.jsx)("br",{}),(0,i.jsxs)(v.Z,{switch:!0,style:{color:"white"},children:[(0,i.jsx)(C.Z,{type:"switch"}),(0,i.jsx)(T.Z,{switch:!0,children:"Exportar unicamente datos mostrados en tabla"})]}),(0,i.jsx)("br",{}),(0,i.jsx)(r.Z,{children:(0,i.jsxs)(t.Z,{children:[(0,i.jsx)(a.Z,{children:(0,i.jsx)(u.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.toggleModal()},children:"Cancelar"})}),(0,i.jsx)(a.Z,{children:(0,i.jsx)(u.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Exportar datos"})})]})})]})}function z(n){return(0,i.jsx)(j.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,i.jsxs)(m.Z,{className:"cardModalAlerta",color:"dark",children:[(0,i.jsx)(b.Z,{children:"Exportar datos de tabla"}),(0,i.jsxs)(Z.Z,{children:[(0,i.jsxs)(y.Z,{className:"tituloModalOpcionesTabla",children:["Exportar datos de tabla de ",n.nombreTabla]}),(0,i.jsx)(k,{toggleModal:n.toggleModal,exportarDatos:n.exportarDatos})]})]})})}var P=o(2706);function D(n){var e=(0,P.Z)(s.useState(n.tiempoRefrescamiento),2),o=e[0],c=e[1];return(0,i.jsxs)(R.Z,{onSubmit:function(e){e.preventDefault(),n.guardarConfiguracion(e),n.toggleModal()},children:["undefined"==typeof n.registrosPorPagina?null:(0,i.jsxs)(v.Z,{children:[(0,i.jsx)(T.Z,{for:"registrosPagina",children:"Cantidad de registros por pagina"}),(0,i.jsx)(C.Z,{id:"registrosPagina",name:"registrosPorPagina",defaultValue:n.registrosPorPagina,type:"number"})]}),"undefined"==typeof n.tiempoRefrescamiento?null:(0,i.jsxs)(v.Z,{children:[(0,i.jsxs)(T.Z,{for:"tiempoRefrescamiento",children:["Tiempo de refrescamiento de la pagina: ",o," segundos"]}),(0,i.jsx)(C.Z,{id:"tiempoRefrescamiento",name:"tiempoDeRefrescamiento",type:"range",defaultValue:n.tiempoRefrescamiento,onChange:function(n){var e=n.target.value?parseInt(n.target.value):0;c(e)}})]}),"undefined"==typeof n.opcionesRegistros?null:(0,i.jsxs)(v.Z,{switch:!0,style:{color:"white"},children:[(0,i.jsx)(C.Z,{id:"opcionesRegistros",name:"opcionesDeRegistros",type:"switch",defaultChecked:n.opcionesRegistros}),(0,i.jsx)(T.Z,{switch:!0,children:"Mostrar las opciones de los registros"})]}),(0,i.jsx)("br",{}),(0,i.jsx)(r.Z,{children:(0,i.jsxs)(t.Z,{children:[(0,i.jsx)(a.Z,{children:(0,i.jsx)(u.Z,{active:!0,outline:!0,block:!0,onClick:function(){n.toggleModal()},children:"Cancelar"})}),(0,i.jsx)(a.Z,{children:(0,i.jsx)(u.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Guardar Configuracion"})})]})})]})}function N(n){return(0,i.jsx)(j.Z,{isOpen:n.modalActivo,toggle:function(){n.toggleModal()},children:(0,i.jsxs)(m.Z,{className:"cardModalAlerta",color:"dark",children:[(0,i.jsx)(b.Z,{children:"Opciones de tabla"}),(0,i.jsxs)(Z.Z,{children:[(0,i.jsxs)(y.Z,{className:"tituloModalOpcionesTabla",children:["Opciones de tabla de ",n.nombreTabla]}),(0,i.jsx)(D,{registrosPorPagina:n.propiedadesTabla.registrosPorPagina,opcionesRegistros:n.propiedadesTabla.opcionesRegistros,tiempoRefrescamiento:n.propiedadesTabla.tiempoRefrescamiento,toggleModal:n.toggleModal,guardarConfiguracion:n.propiedadesTabla.guardarConfiguracion})]})]})})}var M=o(26982);function O(n){return(0,i.jsxs)(d.Z,{size:"sm",children:[(r=n.onRefrescarTabla,"undefined"==typeof r?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"primary",onClick:function(){r()},children:(0,i.jsx)(l(),{path:f.vqH,size:1})})),(o=n.onExportarDatos,"undefined"==typeof o?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"primary",onClick:function(){o()},children:(0,i.jsx)(l(),{path:f.Nb2,size:1})})),(e=n.onOpciones,"undefined"==typeof e?null:(0,i.jsx)(u.Z,{className:"botonIcono",outline:!0,color:"warning",onClick:function(){e()},children:(0,i.jsx)(l(),{path:f.Shd,size:1})}))]});var e,o,r}var I=function(n,e,o,r,t){return(0,i.jsx)("td",{children:t[r[e]](n)},o)},A=function(n,e,o){if("undefined"==typeof e)return null;if("undefined"==typeof e.opcionesRegistros)return null;if("undefined"==typeof o)return null;if(e.opcionesRegistros){var s=n.data[0]+"-opciones";return(0,i.jsx)("td",{children:(0,i.jsx)(r.Z,{children:(0,i.jsxs)(t.Z,{children:[(0,i.jsx)(a.Z,{}),(0,i.jsx)(a.Z,{children:(0,i.jsx)(g,{idRegistro:parseInt(n.metadata.id),indexRegistro:n.metadata.indexRegistro,onEliminar:o.onEliminar,onModificar:o.onModificar,onVisualizarDetalles:o.onVisualizarDetalles})}),(0,i.jsx)(a.Z,{})]})})},s)}},w=function(n,e,o){if("undefined"==typeof e)return null;if("undefined"==typeof e.opcionesRegistros)return null;if("undefined"==typeof o)return null;if(e.opcionesRegistros){var s=n.data[0]+"-opciones";return(0,i.jsx)("td",{children:(0,i.jsx)(r.Z,{children:(0,i.jsxs)(t.Z,{children:[(0,i.jsx)(a.Z,{}),(0,i.jsx)(a.Z,{children:(0,i.jsx)(p,{idRegistro:parseInt(n.metadata.id),indexRegistro:n.metadata.indexRegistro,onGuardarConfiguracionDispositivo:o.onGuardarConfiguracionDispositivo})}),(0,i.jsx)(a.Z,{})]})})},s)}},E=function(n,e,o,r,t){return"undefined"==typeof r?null:"undefined"==typeof t?(0,i.jsx)(h,{onAgregarRegistro:r.onAgregarRegistro,onRefrescarTabla:r.onRefrescarTabla}):(0,i.jsx)(h,{onAgregarRegistro:r.onAgregarRegistro,onRefrescarTabla:function(){"undefined"!=typeof o&&o(),r.onRefrescarTabla()},onExportarDatos:function(){r.onExportarDatos(),n()},onOpciones:function(){r.onCambiarConfiguracion(),e()}})},S=function(n,e,o,r,t){return"undefined"==typeof r?null:"undefined"==typeof t?(0,i.jsx)(x,{onRefrescarTabla:r.onRefrescarTabla}):(0,i.jsx)(x,{onRefrescarTabla:function(){"undefined"!=typeof o&&o(),r.onRefrescarTabla()},onProbarSerial:function(){r.onProbarSerial(),n()},onOpciones:function(){r.onCambiarConfiguracion(),e()}})},_=function(n,e,o,r,t){return"undefined"==typeof r?null:"undefined"==typeof t?(0,i.jsx)(O,{onRefrescarTabla:r.onRefrescarTabla}):(0,i.jsx)(O,{onRefrescarTabla:function(){"undefined"!=typeof o&&o(),r.onRefrescarTabla()},onExportarDatos:function(){r.onExportarDatos(),n()},onOpciones:function(){r.onCambiarConfiguracion(),e()}})},G=function(n){return"undefined"==typeof n||n.totalPaginas<=1?null:(0,i.jsx)(M.Z,{paginaActual:n.paginaActual,offset:n.offset,registrosPorPagina:n.registrosPorPagina,setPaginaActual:n.setPaginaActual,setOffset:n.setOffset,totalPaginas:n.totalPaginas})},V=function(n,e){return"undefined"==typeof e||"undefined"==typeof e.opcionesRegistros||"undefined"==typeof n?null:e.opcionesRegistros?(0,i.jsx)("th",{children:"Opciones"},"opciones"):void 0},U=function(n,e){return"undefined"==typeof n||"undefined"==typeof n.onGuardarConfiguracionDispositivo?null:e.opcionesRegistros?(0,i.jsx)("th",{children:"Opciones"},"opciones"):void 0},L=function(n,e,o,r,t){return"undefined"==typeof t||"undefined"==typeof r?null:(0,i.jsx)(N,{nombreTabla:n,propiedadesTabla:r,modalActivo:e,toggleModal:o})},q=function(n,e,o,r){return"undefined"==typeof r?null:(0,i.jsx)(z,{nombreTabla:n,exportarDatos:r,modalActivo:e,toggleModal:o})},B=function(n,e,o,r,t){return e.map((function(e){var a=e.metadata.id;return(0,i.jsxs)("tr",{children:[e.data.map((function(r,t){var a=e.metadata.id+"-"+n[t];return"undefined"!=typeof o&&"undefined"!=typeof o[n[t]]?I(r,t,a,n,o):(0,i.jsx)("td",{children:r},a)})),A(e,r,t)]},a)}))},F=function(n,e,o,r,t){return e.map((function(e){var a=e.metadata.id;return(0,i.jsxs)("tr",{children:[e.data.map((function(r,t){var a=e.metadata.id+"-"+n[t];return"undefined"!=typeof o&&"undefined"!=typeof o[n[t]]?I(r,t,a,n,o):(0,i.jsx)("td",{children:r},a)})),w(e,r,t)]},a)}))},H=function(n){return n.map((function(n){return(0,i.jsx)("th",{children:n},n)}))}},7863:function(n,e,o){"use strict";o.d(e,{R$:function(){return s},jg:function(){return a}});var i=o(2926),r=o.n(i),t=o(34522);function a(n,e,o){var i=[];if(!n)return i;for(var r=0;r<n.length;r++){for(var t=n[r],a=[],s=Object(),c=0;c<e.length;c++){var l=t[e[c]],d=e[c][0];if(e[c].length>1)for(var u=t[e[c][0]],f=1;f<e[c].length;f++)l=u[e[c][f]],d=e[c][f];-1!==o.indexOf(d)&&(s[d]=l),a.push(l)}i.push({data:a,metadata:s})}return i.map((function(n,e){n.metadata.indexRegistro=e})),i}function s(n,e,o){var i=function(n,e){return e.map((function(e,o){var i={};return n.map((function(n,o){i[n]=e.data[o]})),i}))}(e,o(n)),a={Sheets:{data:t.P6.json_to_sheet(i)},SheetNames:["data"]},s=(0,t.cW)(a,{bookType:"xlsx",type:"array"}),c=new Blob([s],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});r().saveAs(c,"prueba.xlsx")}},36786:function(){},43197:function(){}}]);