(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1406],{95745:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/home/reportes/historialActividadMaquinas",function(){return i(55970)}])},95843:function(e,n,i){"use strict";i.d(n,{Z:function(){return l}});var t=i(24246),s=(i(27378),i(31804)),o=i(35979),r=i(23438),a=i(89823),c=i.n(a);function l(e){return(0,t.jsxs)(s.Z,{size:"sm",children:[(u=e.onAgregarRegistro,"undefined"==typeof u?null:(0,t.jsx)(o.Z,{className:"botonIcono",outline:!0,color:"success",onClick:function(){u()},children:(0,t.jsx)(c(),{path:r.psO,size:1})})),(l=e.onRefrescarGrid,"undefined"==typeof l?null:(0,t.jsx)(o.Z,{className:"botonIcono",outline:!0,color:"primary",onClick:function(){l()},children:(0,t.jsx)(c(),{path:r.Sxu,size:1})})),(a=e.onExportarDatos,"undefined"==typeof a?null:(0,t.jsx)(o.Z,{className:"botonIcono",outline:!0,color:"warning",onClick:function(){a()},children:(0,t.jsx)(c(),{path:r.Nb2,size:1})})),(i=e.onProbarSerial,"undefined"==typeof i?null:(0,t.jsx)(o.Z,{className:"botonIcono",outline:!0,color:"primary",onClick:function(){i()},children:(0,t.jsx)(c(),{path:r.BbL,size:1})})),(n=e.onCambiarConfiguracion,"undefined"==typeof n?null:(0,t.jsx)(o.Z,{className:"botonIcono",outline:!0,color:"warning",onClick:function(){n()},children:(0,t.jsx)(c(),{path:r.Shd,size:1})}))]});var n,i,a,l,u}},77197:function(e,n,i){"use strict";i.d(n,{Z:function(){return c}});var t=i(24246),s=(i(27378),i(30985)),o=i(74246),r=i(27492),a=i(66444);function c(e){return(0,t.jsx)(s.Z,{fluid:!0,children:(0,t.jsxs)(o.Z,{children:[(0,t.jsx)(r.Z,{}),(0,t.jsx)(r.Z,{xs:"auto",children:(0,t.jsx)(a.Z,{color:"warning",className:"spiinerCarga"})}),(0,t.jsx)(r.Z,{})]})})}},55970:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return T}});var t=i(24246),s=i(27378),o=i(2706),r=i(30985),a=i(74246),c=i(27492),l=i(11355),u=i(26508),d=i(70870),x=i(20787),f=i(80311),p=i(8784);function h(){var e=new Date,n=new Date,i=e.getTimezoneOffset();Math.floor(i/60),Math.floor(i/3600);return e.setDate(e.getDate()-e.getDay()+1),e.setHours(0,0,0),n.setDate(n.getDate()+(6-n.getDay())+1),n.setHours(23,59,59),[e,n]}var j=i(26982);function g(e){var n,i=e.semanaReporte?(0,p.qj)(e.semanaReporte):h();return(0,t.jsxs)(l.Z,{color:"dark",children:[(0,t.jsxs)(u.Z,{className:"text-white",children:["Historial de usos de maquina del d\xeda ",(0,t.jsx)("b",{children:i[0].toLocaleDateString()})," al d\xeda ",(0,t.jsx)("b",{children:i[1].toLocaleDateString()})]}),(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(x.Z,{children:e.registros.map((function(e){var n=e.empleado.nombres+" "+e.empleado.apellidoPaterno+" "+e.empleado.apellidoMaterno,i=new Date(e.fechaRegistroReporteActividad);i.setMinutes(i.getMinutes()+i.getTimezoneOffset());var s="dark";switch(e.reporte.idTipoReporteVinculado){case 12:s="success";break;case 13:s="secondary";break;case 14:s="warning";break;default:s="danger"}return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(l.Z,{color:s,children:(0,t.jsx)(d.Z,{children:(0,t.jsxs)(f.Z,{style:{textAlign:"center"},children:[(0,t.jsx)("b",{children:e.reporte.descripcionReporte})," por empleado ",(0,t.jsx)("b",{children:n})," en el d\xeda ",(0,t.jsxs)("b",{children:[i.toLocaleDateString()," a las ",i.toLocaleTimeString()]})]})})}),(0,t.jsx)("br",{})]})}))}),(n=e.paginacion,"undefined"==typeof n||n.totalPaginas<=1?null:(0,t.jsx)(j.Z,{paginaActual:n.paginaActual,offset:n.offset,registrosPorPagina:n.registrosPorPagina,setPaginaActual:n.setPaginaActual,setOffset:n.setOffset,totalPaginas:n.totalPaginas}))]})]})}var Z=i(63115),m=i(35979),v=i(10798);function R(e){return(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(c.Z,{children:(0,t.jsx)(v.Z,{id:"idDispositivo",placeholder:"ID del dispositivo",type:"text",onChange:function(n){var i=n.target;e.parametrosBusqueda.setIdDispositivo(i.value)}})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(v.Z,{id:"descripcionDispositivo",placeholder:"Descripci\xf3n del dispositivo",type:"text",onChange:function(n){var i=n.target;e.parametrosBusqueda.setDescripcionDispositivo(i.value)}})}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(v.Z,{id:"semana",placeholder:"Semana a generar reporte",type:"week",onChange:function(n){var i=n.target;e.parametrosBusqueda.setSemanaReporte(i.value)}})})]})})}var b=i(95843);function S(e){return(0,t.jsxs)(l.Z,{color:"dark",children:[(0,t.jsx)(u.Z,{className:"text-white",children:(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(c.Z,{children:function(){var n="Cargando...";return e.registros&&e.registros[e.indexRegistro]&&(n="Reporte de "+e.registros[e.indexRegistro].descripcionDispositivo),(0,t.jsx)(t.Fragment,{children:n})}()}),(0,t.jsx)(c.Z,{style:{textAlign:"right"},children:(0,t.jsx)(b.Z,{onRefrescarGrid:e.funcionesOpciones.onRefrescarGrid,onExportarDatos:e.funcionesOpciones.onExportarDatos,onCambiarConfiguracion:e.funcionesOpciones.onCambiarConfiguracion})})]})})}),(0,t.jsx)(d.Z,{children:(0,t.jsxs)(r.Z,{children:[(0,t.jsx)(a.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(R,{parametrosBusqueda:e.parametrosBusqueda})})}),(0,t.jsx)("br",{}),(0,t.jsx)(a.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(Z.Z,{dark:!0,responsive:!0,borderless:!0,children:(0,t.jsx)("tbody",{children:(0,t.jsx)("tr",{children:e.registros.map((function(n,i){return(0,t.jsx)("td",{style:{padding:"0%"},children:(0,t.jsx)(m.Z,{block:!0,outline:!0,color:"warning",style:{border:"0px",borderRadius:"0px",whiteSpace:"nowrap"},active:i==e.indexRegistro,onClick:function(){e.setIndexRegistro(i)},children:n.descripcionDispositivo})})}))})})})})})]})})]})}function D(e){return(0,t.jsx)(r.Z,{children:e.children})}var y=i(49039),C=i(93691),w=i(11123),k=i(10031),P=i(42088),A=i(38011);function E(e){var n=e.semanaReporte?(0,p.qj)(e.semanaReporte):h();return(0,t.jsx)(r.Z,{fluid:!0,children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(c.Z,{sm:2}),(0,t.jsx)(c.Z,{children:(0,t.jsxs)(A.Z,{color:"warning",children:[(0,t.jsx)("h1",{style:{textAlign:"center",fontSize:"24px"},children:(0,t.jsx)("b",{children:e.listaRegistrosDispositivos[e.indexRegistro].descripcionDispositivo.toUpperCase()})}),(0,t.jsx)("p",{style:{textAlign:"center"},children:"SIN REGISTROS PARA GENRAR REPORTE!"}),(0,t.jsx)("hr",{style:{margin:"10px"}}),(0,t.jsxs)("p",{children:["Este dispositivo no cuenta con registros desde el d\xeda ",(0,t.jsx)("b",{children:n[0].toLocaleDateString()})," hasta el d\xeda ",(0,t.jsx)("b",{children:n[1].toLocaleDateString()})," para poder generar un reporte de actividad de maquina."]})]})}),(0,t.jsx)(c.Z,{sm:2})]})})}var N=i(77197);function O(e){var n=(0,o.Z)(s.useState(!0),2),i=(n[0],n[1]),l=(0,o.Z)(s.useState(!1),2),u=l[0],d=l[1],x=(0,o.Z)(s.useState(0),2),f=x[0],p=(x[1],(0,o.Z)(s.useState(5),2)),h=p[0],j=(p[1],(0,o.Z)(s.useState(1),2)),Z=(j[0],j[1],(0,o.Z)(s.useState(1),2)),m=(Z[0],Z[1],(0,o.Z)(s.useState(0),2)),v=m[0],R=m[1],b=(0,o.Z)(s.useState(12),2),A=b[0],O=(b[1],(0,o.Z)(s.useState(1),2)),I=O[0],T=O[1],q=(0,o.Z)(s.useState(1),2),_=q[0],z=q[1],L=(0,o.Z)(s.useState(0),2),M=L[0],B=L[1],G=(0,o.Z)(s.useState(null),2),F=(G[0],G[1],(0,o.Z)(s.useState([]),2)),H=F[0],U=F[1],V=(0,o.Z)(s.useState(null),2),X=(V[0],V[1]),J=(0,o.Z)(s.useState(null),2),K=(J[0],J[1]),Q=(0,o.Z)(s.useState(null),2),W=Q[0],Y=Q[1],$=(0,o.Z)(s.useState(null),2),ee=$[0],ne=$[1],ie=(0,o.Z)(s.useState(null),2),te=ie[0],se=ie[1],oe=(0,o.Z)(s.useState(null),2),re=oe[0],ae=oe[1];s.useEffect((function(){!function(e,n,i){(0,k.O5)((function(n){e(n.registros)}),{idTipoDispositivoVinculado:3},(function(e){console.log(e)}),(function(){e([]),n(!0)}),(function(){i?i():n(!1)}))}(U,i,(function(){}))}),[]),s.useEffect((function(){H&&H.length>0&&function(e,n,i,t){(0,P.Uq)((function(n){e({tiempoActividadTotal:n.tiempoActividadTotal,tiempoInactivoTotal:n.tiempoInactivoTotal})}),i,(function(e){console.log(e)}),(function(){e(null),n(!0)}),(function(){t?t():n(!1)}))}(ne,i,{id:H[M].id,semanaReporte:W},(function(){}))}),[H,M,W,u]),s.useEffect((function(){H&&H.length>0&&function(e,n,i,t){(0,P.JM)((function(n){e(n.registros)}),i,(function(e){console.log(e)}),(function(){e(null),n(!0)}),(function(){t?t():n(!1)}))}(se,i,{offset:f,limit:h,id:H[M].id,semanaReporte:W},(function(){}))}),[H,M,W,u]),s.useEffect((function(){H&&H.length>0&&function(e,n,i,t,s){(0,P.mu)((function(i){e(i.registros),n(Math.ceil(i.totalRegistros/t.limit))}),t,(function(e){console.log(e)}),(function(){e(null),i(!0)}),(function(){s?s():i(!1)}))}(ae,T,i,{limit:A,offset:v,id:H[M].id,semanaReporte:W},(function(){}))}),[H,M,W,_,u]);var ce={setIdDispositivo:X,setDescripcionDispositivo:K,setSemanaReporte:Y},le={onRefrescarGrid:function(){d(!u)},onExportarDatos:function(){},onCambiarConfiguracion:function(){}},ue={paginaActual:_,offset:v,registrosPorPagina:A,totalPaginas:I,setPaginaActual:z,setOffset:R};return(0,t.jsxs)(D,{children:[(0,t.jsx)(a.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(S,{parametrosBusqueda:ce,funcionesOpciones:le,indexRegistro:M,setIndexRegistro:B,registros:H})})}),(0,t.jsx)("br",{}),H&&ee&&te&&re?0==te.length&&0==re.length?(0,t.jsx)(E,{listaRegistrosDispositivos:H,semanaReporte:W,indexRegistro:M}):(0,t.jsxs)(r.Z,{children:[(0,t.jsxs)(a.Z,{children:[(0,t.jsxs)(c.Z,{children:[(0,t.jsx)(a.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(y.Z,{registro:te[0].empleado,indexRegistro:0})})}),(0,t.jsx)("br",{}),(0,t.jsx)(a.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(C.Z,{registros:te.map((function(e){return e.empleado})),limiteOperadores:h})})})]}),(0,t.jsx)(c.Z,{children:(0,t.jsx)(w.Z,{tituloGrafico:"Reporte de "+H[M].descripcionDispositivo+" horas activa vs inactiva",reporte:ee})})]}),(0,t.jsx)("br",{}),(0,t.jsx)(a.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(g,{semanaReporte:W,registros:re,paginacion:ue})})})]}):(0,t.jsx)(N.Z,{})]})}var I=i(6947);function T(){return(0,t.jsx)(s.Fragment,{children:(0,t.jsx)(r.Z,{fluid:!0,children:(0,t.jsx)(a.Z,{children:(0,t.jsx)(c.Z,{children:(0,t.jsx)(O,{})})})})})}T.getLayout=function(e){return(0,t.jsx)(I.Z,{children:e})}}},function(e){e.O(0,[9080,7815,1798,2234,313,6526,8023,924,3494,9774,2888,179],(function(){return n=95745,e(e.s=n);var n}));var n=e.O();_N_E=n}]);