(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1523],{76816:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/home/dashboard/statusDispositivos",function(){return i(63816)}])},28899:function(e,n,i){"use strict";i.d(n,{Z:function(){return y}});var t=i(24246),o=i(27378),r=i(8208),a=i(11355),s=i(26508),c=i(70870),d=i(80311),u=i(2706),l=i(43532),f=i(43636),p=i(51838),h=i(10798),x=i(35979),Z=i(30985),j=i(74246),v=i(27492);function g(e){var n=(0,u.Z)(o.useState(void 0),2),i=n[0],r=n[1],a=(0,u.Z)(o.useState(!1),2),s=a[0],c=(a[1],(0,u.Z)(o.useState([]),2)),d=c[0],g=c[1],y=(0,u.Z)(o.useState(!1),2),m=y[0],b=y[1];return o.useEffect((function(){window.ipc.send("explorar_puertos_serial",m),window.ipc.on("puertos_seriales_encontrados",(function(e){g(e)})),i||d[0]&&r(d[0].path)}),[m]),(0,t.jsxs)(l.Z,{onSubmit:function(n){n.preventDefault(),e.toggleModal()},children:[(0,t.jsxs)(f.Z,{children:[(0,t.jsx)(p.Z,{for:"puerto",children:"Puerto de comunicaic\xf3n"}),(0,t.jsx)(h.Z,{id:"puerto",type:"select",children:d.map((function(e,n){return(0,t.jsx)("option",{value:n,children:e.path})}))})]}),(0,t.jsxs)(f.Z,{check:!0,children:[(0,t.jsx)(h.Z,{id:"listarTodosLosPuerto",type:"checkbox",onChange:function(e){b(e.target.checked)}}),(0,t.jsx)(p.Z,{check:!0,for:"listarTodosLosPuerto",children:"Listar todos los puertos seriales"})]}),(0,t.jsxs)(f.Z,{children:[(0,t.jsx)(p.Z,{for:"baudRate",children:"BaudRate"}),(0,t.jsx)(h.Z,{id:"baudRate",type:"select",defaultValue:6,children:[10,300,600,1200,2400,4800,9600,14400,19200,38400,57600,115200,128e3,256e3].map((function(e,n){return(0,t.jsx)("option",{value:n,children:e})}))})]}),(0,t.jsxs)(f.Z,{children:[(0,t.jsx)(p.Z,{for:"serialRecivido",children:"Reciviendo de serial..."}),(0,t.jsx)(h.Z,{id:"serialRecivido",type:"textarea",disabled:!0})]}),(0,t.jsxs)(f.Z,{children:[(0,t.jsx)(p.Z,{for:"serialEnvio",children:"String a enviar"}),(0,t.jsx)(h.Z,{id:"serialEnvio",type:"text"})]}),(0,t.jsx)(f.Z,{children:(0,t.jsx)(x.Z,{active:!0,outline:!0,block:!0,color:"primary",children:"Enviar por serial"})}),(0,t.jsx)("br",{}),(0,t.jsx)(Z.Z,{children:(0,t.jsxs)(j.Z,{children:[(0,t.jsx)(v.Z,{children:(0,t.jsx)(x.Z,{active:!0,outline:!0,block:!0,onClick:function(){e.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(v.Z,{children:(0,t.jsx)(x.Z,{active:!0,outline:!0,block:!0,color:s?"danger":"success",children:s?"Desconectar":"Conectar"})})]})})]})}function y(e){return(0,t.jsx)(r.Z,{isOpen:e.modalActivo,toggle:function(){e.toggleModal()},children:(0,t.jsxs)(a.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(s.Z,{children:"Probar conexi\xf3n de dispositivo"}),(0,t.jsxs)(c.Z,{children:[(0,t.jsx)(d.Z,{className:"tituloModalOpcionesTabla",children:"Consola de prueba de dispositivo por medio de communicaci\xf3n serial."}),(0,t.jsx)(g,{toggleModal:e.toggleModal})]})]})})}},63816:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return X}});var t=i(24246),o=i(27378),r=i(30985),a=i(74246),s=i(27492),c=i(2706),d=i(42871),u=i(7863),l=i(91787),f=i(50010),p=i(73990),h=i(4294),x=i(11355),Z=i(26508),j=i(70870),v=i(80311),g=i(63115),y=i(66444),m=i(16427);function b(e){var n=(0,c.Z)(o.useState(!1),2),i=n[0],d=n[1],u=(0,c.Z)(o.useState(!1),2),l=u[0],f=u[1],p={display:e.enCarga?"none":""},h={display:e.enCarga?"":"none"};return(0,t.jsxs)(x.Z,{color:"dark",children:[(0,t.jsx)(Z.Z,{className:"text-white",children:(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(s.Z,{children:e.tituloTabla}),(0,t.jsx)(s.Z,{style:{textAlign:"right"},children:(0,m.zU)((function(){f(!l)}),(function(){d(!i)}),(function(){e.setEnCarga(!e.enCarga)}),e.funcionesOpciones,e.opcionesTabla)})]})})}),(0,t.jsxs)(j.Z,{children:[(0,t.jsx)(v.Z,{children:e.children}),(0,t.jsxs)(r.Z,{children:[(0,t.jsxs)(a.Z,{style:p,children:[(0,t.jsxs)(g.Z,{hover:!0,dark:!0,responsive:!0,children:[(0,t.jsx)("thead",{className:"cabeceraTablaRegistros",children:(0,t.jsxs)("tr",{children:[(0,m.R3)(e.cabeceras),(0,m.NL)(e.funcionesRegistros,e.opcionesTabla)]},"header")}),(0,t.jsx)("tbody",{children:(0,m._U)(e.cabeceras,e.registros,e.formatoEspecial,e.opcionesTabla,e.funcionesRegistros)})]}),(0,m.DY)(e.paginacion)]}),(0,t.jsxs)(a.Z,{style:h,children:[(0,t.jsx)(s.Z,{}),(0,t.jsx)(s.Z,{xs:"auto",children:(0,t.jsx)(y.Z,{color:"warning",style:{height:"100px",width:"100px"}})}),(0,t.jsx)(s.Z,{})]})]})]}),(0,m.LN)(e.tituloTabla,i,(function(){d(!i)}),e.opcionesTabla,e.funcionesOpciones),(0,m.W3)(e.tituloTabla,l,(function(){f(!l)}),e.exportarDatos)]})}var _=i(28899),I=i(43532),S=i(43636),A=i(51838),k=i(10798),D=i(35979),O=i(10031);function w(e){console.log(e.registro);var n=(0,c.Z)(o.useState(!1),2),i=n[0],d=n[1],u=(0,c.Z)(o.useState(void 0),2),f=u[0],p=u[1],h=(0,c.Z)(o.useState(void 0),2),x=h[0],Z=h[1],j=(0,c.Z)(o.useState([]),2),v=j[0],g=j[1],y=(0,c.Z)(o.useState(!1),2),m=y[0],b=y[1],_=(0,c.Z)(o.useState(!1),2),w=_[0],C=_[1];return o.useEffect((function(){console.log("refresh"),window.ipc.send("explorar_puertos_serial",i),window.ipc.on("puertos_seriales_encontrados",(function(e){g(e)})),f||v[0]&&p(v[0].path)}),[i,w]),o.useEffect((function(){(0,O.B2)(e.registro.id,(function(e){Z(e.authorization)}),(function(){}),(function(){Z(void 0)}),(function(){}))}),[]),setTimeout((function(){(0,l.I)(w,C)}),500),(0,t.jsxs)(I.Z,{onSubmit:function(n){n.preventDefault(),function(e){var n="0";e.target[2].checked?n="1":e.target[3].checked&&(n="2");var i={datosDispositivo:{path:e.target[4].value,baudRate:parseInt(e.target[6].value)},configuracion:{ssid:e.target[7].value,password:e.target[8].value,puertoApi:e.target[10].value,ipApi:e.target[11].value,versionApi:e.target[12].value,apiKey:e.target[13].value,bitPermiso:e.target[0].value,accionOpcional:n}};window.ipc.send("guardar_configuracion_lector",i)}(n),e.toggleModal()},children:[(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"bitZona",children:"Zona a la que da acceso el dispositivo."}),(0,t.jsx)(k.Z,{id:"bitZona",name:"campoBitZona",type:"select",defaultValue:e.registro.bitZona,children:e.elementosOpciones.listaZonas.map((function(e){return(0,t.jsx)("option",{value:e.bitZona,children:e.nombreZona})}))})]}),(0,t.jsx)(A.Z,{children:"Acciones opcionales del lector"}),(0,t.jsx)(S.Z,{check:!0,children:(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(A.Z,{check:!0,children:"Ninguna"}),(0,t.jsx)(k.Z,{id:"noAccionOpcional",name:"accionesOpcionales",type:"radio",defaultChecked:!0,onChange:function(e){d(e.target.checked)}})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(A.Z,{check:!0,children:"Bloquear puerta al cerrar"}),(0,t.jsx)(k.Z,{id:"bloquearPuertaAlCerrar",name:"accionesOpcionales",type:"radio",onChange:function(e){d(e.target.checked)}})]}),(0,t.jsxs)(s.Z,{children:[(0,t.jsx)(A.Z,{check:!0,children:"Desbloquear puerta al abrir"}),(0,t.jsx)(k.Z,{id:"desbloquearPuertaAlAbrir",name:"accionesOpcionales",type:"radio",onChange:function(e){d(e.target.checked)}})]})]})})}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"puertoSerial",children:"Puerto Serial del dispositivo grabador de tarjetas."}),(0,t.jsx)(k.Z,{id:"puertoSerial",type:"select",defaultValue:f,children:v.map((function(e){return(0,t.jsx)("option",{value:e.path,children:e.path})}))})]}),(0,t.jsxs)(S.Z,{check:!0,children:[(0,t.jsx)(A.Z,{check:!0,children:"Listar todos los puertos serial"}),(0,t.jsx)(k.Z,{type:"checkbox",onChange:function(e){d(e.target.checked)}})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"baudRate",children:"baudRate"}),(0,t.jsx)(k.Z,{id:"baudRate",type:"select",defaultValue:115200,children:[300,600,1200,2400,4800,9600,19200,38400,57600,92160,115200,230400,460800].map((function(e){return(0,t.jsx)("option",{value:e,children:e})}))})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"ssid",children:"SSID de red"}),(0,t.jsx)(k.Z,{id:"ssid",name:"campoSsid",type:"text",defaultValue:"AC Automatizacion 2.4"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"password",children:"Password de red"}),(0,t.jsx)(k.Z,{id:"password",name:"campoPassword",type:m?"text":"password",defaultValue:"Aau190410ry2@"})]}),(0,t.jsxs)(S.Z,{check:!0,children:[(0,t.jsx)(A.Z,{check:!0,children:"Mostrar contrasenia de la red"}),(0,t.jsx)(k.Z,{type:"checkbox",onChange:function(e){b(e.target.checked)}})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiPort",children:"Puerto de API"}),(0,t.jsx)(k.Z,{id:"apiPort",name:"campoApiPort",type:"text",defaultValue:"3001"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiIp",children:"IP del API"}),(0,t.jsx)(k.Z,{id:"apiIp",name:"campoApiIp",type:"text",defaultValue:"127.0.0.1"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiVersion",children:"Version del API"}),(0,t.jsx)(k.Z,{id:"apiVersion",type:"select",defaultValue:"/apiv0.1.0/",children:["/apiV0.1.0/"].map((function(e){return(0,t.jsx)("option",{value:e,children:e})}))})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiKeyDispositivo",children:"API KEY del dispositivo"}),(0,t.jsx)(k.Z,{id:"apiKeyDispositivo",name:"campoApiKeyDispositivo",type:"text",defaultValue:x})]}),(0,t.jsx)("br",{}),(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(s.Z,{children:(0,t.jsx)(D.Z,{active:!0,outline:!0,block:!0,onClick:function(){e.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(s.Z,{children:(0,t.jsx)(D.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Guardar Datos"})})]})})]})}function C(e){var n=(0,c.Z)(o.useState(!1),2),i=n[0],d=n[1],u=(0,c.Z)(o.useState(void 0),2),f=u[0],p=u[1],h=(0,c.Z)(o.useState(void 0),2),x=h[0],Z=h[1],j=(0,c.Z)(o.useState([]),2),v=j[0],g=j[1],y=(0,c.Z)(o.useState(!1),2),m=y[0],b=y[1],_=(0,c.Z)(o.useState(!1),2),w=_[0],C=_[1];return o.useEffect((function(){console.log("refresh"),window.ipc.send("explorar_puertos_serial",i),window.ipc.on("puertos_seriales_encontrados",(function(e){g(e)})),f||v[0]&&p(v[0].path)}),[i,w]),o.useEffect((function(){(0,O.B2)(e.registro.id,(function(e){Z(e.authorization)}),(function(){}),(function(){Z(void 0)}),(function(){}))}),[]),setTimeout((function(){(0,l.I)(w,C)}),500),(0,t.jsxs)(I.Z,{onSubmit:function(n){n.preventDefault(),function(e){var n={datosDispositivo:{path:e.target[0].value,baudRate:parseInt(e.target[2].value)},configuracion:{ssid:e.target[3].value,password:e.target[4].value,puertoApi:e.target[6].value,ipApi:e.target[7].value,versionApi:e.target[8].value,apiKey:e.target[9].value}};window.ipc.send("guardar_configuracion_checador",n)}(n),e.toggleModal()},children:[(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"puertoSerial",children:"Puerto Serial del dispositivo grabador de tarjetas."}),(0,t.jsx)(k.Z,{id:"puertoSerial",type:"select",defaultValue:f,children:v.map((function(e){return(0,t.jsx)("option",{value:e.path,children:e.path})}))})]}),(0,t.jsxs)(S.Z,{check:!0,children:[(0,t.jsx)(A.Z,{check:!0,children:"Listar todos los puertos serial"}),(0,t.jsx)(k.Z,{type:"checkbox",onChange:function(e){d(e.target.checked)}})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"baudRate",children:"baudRate"}),(0,t.jsx)(k.Z,{id:"baudRate",type:"select",defaultValue:115200,children:[300,600,1200,2400,4800,9600,19200,38400,57600,92160,115200,230400,460800].map((function(e){return(0,t.jsx)("option",{value:e,children:e})}))})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"ssid",children:"SSID de red"}),(0,t.jsx)(k.Z,{id:"ssid",name:"campoSsid",type:"text",defaultValue:"AC Automatizacion 2.4"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"password",children:"Password de red"}),(0,t.jsx)(k.Z,{id:"password",name:"campoPassword",type:m?"text":"password",defaultValue:"Aau190410ry2@"})]}),(0,t.jsxs)(S.Z,{check:!0,children:[(0,t.jsx)(A.Z,{check:!0,children:"Mostrar contrasenia de la red"}),(0,t.jsx)(k.Z,{type:"checkbox",onChange:function(e){b(e.target.checked)}})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiPort",children:"Puerto de API"}),(0,t.jsx)(k.Z,{id:"apiPort",name:"campoApiPort",type:"text",defaultValue:"3001"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiIp",children:"IP del API"}),(0,t.jsx)(k.Z,{id:"apiIp",name:"campoApiIp",type:"text",defaultValue:"127.0.0.1"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiVersion",children:"Version del API"}),(0,t.jsx)(k.Z,{id:"apiVersion",type:"select",defaultValue:"/apiv0.1.0/",children:["/apiV0.1.0/"].map((function(e){return(0,t.jsx)("option",{value:e,children:e})}))})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiKeyDispositivo",children:"API KEY del dispositivo"}),(0,t.jsx)(k.Z,{id:"apiKeyDispositivo",name:"campoApiKeyDispositivo",type:"text",defaultValue:x})]}),(0,t.jsx)("br",{}),(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(s.Z,{children:(0,t.jsx)(D.Z,{active:!0,outline:!0,block:!0,onClick:function(){e.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(s.Z,{children:(0,t.jsx)(D.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Guardar Datos"})})]})})]})}function P(e){var n=(0,c.Z)(o.useState(!1),2),i=n[0],d=n[1],u=(0,c.Z)(o.useState(void 0),2),f=u[0],p=u[1],h=(0,c.Z)(o.useState(void 0),2),x=h[0],Z=h[1],j=(0,c.Z)(o.useState([]),2),v=j[0],g=j[1],y=(0,c.Z)(o.useState(!1),2),m=y[0],b=y[1],_=(0,c.Z)(o.useState(!1),2),w=_[0],C=_[1];return o.useEffect((function(){console.log("refresh"),window.ipc.send("explorar_puertos_serial",i),window.ipc.on("puertos_seriales_encontrados",(function(e){g(e)})),f||v[0]&&p(v[0].path)}),[i,w]),o.useEffect((function(){(0,O.B2)(e.registro.id,(function(e){Z(e.authorization)}),(function(){}),(function(){Z(void 0)}),(function(){}))}),[]),setTimeout((function(){(0,l.I)(w,C)}),500),(0,t.jsxs)(I.Z,{onSubmit:function(n){n.preventDefault(),function(e){var n={datosDispositivo:{path:e.target[1].value,baudRate:parseInt(e.target[3].value)},configuracion:{ssid:e.target[4].value,password:e.target[5].value,puertoApi:e.target[7].value,ipApi:e.target[8].value,versionApi:e.target[9].value,apiKey:e.target[10].value,bitRol:e.target[0].value}};console.log(n),window.ipc.send("guardar_configuracion_controlador",n)}(n),e.toggleModal()},children:[(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"bitRol",children:"Rol con permiso de uso de dispositivo"}),(0,t.jsx)(k.Z,{id:"bitRol",type:"select",children:e.elementosOpciones.listaRoles.map((function(e){return(0,t.jsx)("option",{value:e.bitRol,children:e.descripcionRol})}))})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"puertoSerial",children:"Puerto Serial del dispositivo grabador de tarjetas."}),(0,t.jsx)(k.Z,{id:"puertoSerial",type:"select",defaultValue:f,children:v.map((function(e){return(0,t.jsx)("option",{value:e.path,children:e.path})}))})]}),(0,t.jsxs)(S.Z,{check:!0,children:[(0,t.jsx)(A.Z,{check:!0,children:"Listar todos los puertos serial"}),(0,t.jsx)(k.Z,{type:"checkbox",onChange:function(e){d(e.target.checked)}})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"baudRate",children:"baudRate"}),(0,t.jsx)(k.Z,{id:"baudRate",type:"select",defaultValue:115200,children:[300,600,1200,2400,4800,9600,19200,38400,57600,92160,115200,230400,460800].map((function(e){return(0,t.jsx)("option",{value:e,children:e})}))})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"ssid",children:"SSID de red"}),(0,t.jsx)(k.Z,{id:"ssid",name:"campoSsid",type:"text",defaultValue:"AC Automatizacion 2.4"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"password",children:"Password de red"}),(0,t.jsx)(k.Z,{id:"password",name:"campoPassword",type:m?"text":"password",defaultValue:"Aau190410ry2@"})]}),(0,t.jsxs)(S.Z,{check:!0,children:[(0,t.jsx)(A.Z,{check:!0,children:"Mostrar contrasenia de la red"}),(0,t.jsx)(k.Z,{type:"checkbox",onChange:function(e){b(e.target.checked)}})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiPort",children:"Puerto de API"}),(0,t.jsx)(k.Z,{id:"apiPort",name:"campoApiPort",type:"text",defaultValue:"3001"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiIp",children:"IP del API"}),(0,t.jsx)(k.Z,{id:"apiIp",name:"campoApiIp",type:"text",defaultValue:"127.0.0.1"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiVersion",children:"Version del API"}),(0,t.jsx)(k.Z,{id:"apiVersion",type:"select",defaultValue:"/apiv0.1.0/",children:["/apiV0.1.0/"].map((function(e){return(0,t.jsx)("option",{value:e,children:e})}))})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiKeyDispositivo",children:"API KEY del dispositivo"}),(0,t.jsx)(k.Z,{id:"apiKeyDispositivo",name:"campoApiKeyDispositivo",type:"text",defaultValue:x})]}),(0,t.jsx)("br",{}),(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(s.Z,{children:(0,t.jsx)(D.Z,{active:!0,outline:!0,block:!0,onClick:function(){e.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(s.Z,{children:(0,t.jsx)(D.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Guardar Datos"})})]})})]})}var R=i(8208);function E(e){return(0,t.jsx)(R.Z,{isOpen:e.modalActivo,toggle:function(){e.toggleModal()},children:(0,t.jsxs)(x.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(Z.Z,{children:e.headerModal}),(0,t.jsxs)(j.Z,{children:[(0,t.jsx)(v.Z,{className:"tituloModalOpcionesTabla",children:e.tituloModal}),e.children]})]})})}function M(e){return(0,t.jsx)(R.Z,{isOpen:e.modalActivo,toggle:function(){e.toggleModal()},children:(0,t.jsxs)(x.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(Z.Z,{children:e.headerModal}),(0,t.jsxs)(j.Z,{children:[(0,t.jsx)(v.Z,{className:"tituloModalOpcionesTabla",children:e.tituloModal}),e.children]})]})})}function N(e){return(0,t.jsx)(R.Z,{isOpen:e.modalActivo,toggle:function(){e.toggleModal()},children:(0,t.jsxs)(x.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(Z.Z,{children:e.headerModal}),(0,t.jsxs)(j.Z,{children:[(0,t.jsx)(v.Z,{className:"tituloModalOpcionesTabla",children:e.tituloModal}),e.children]})]})})}function T(e){var n=(0,c.Z)(o.useState(!1),2),i=n[0],d=n[1],u=(0,c.Z)(o.useState(void 0),2),f=u[0],p=u[1],h=(0,c.Z)(o.useState(void 0),2),x=h[0],Z=h[1],j=(0,c.Z)(o.useState([]),2),v=j[0],g=j[1],y=(0,c.Z)(o.useState(!1),2),m=y[0],b=y[1],_=(0,c.Z)(o.useState(!1),2),w=_[0],C=_[1];return o.useEffect((function(){console.log("refresh"),window.ipc.send("explorar_puertos_serial",i),window.ipc.on("puertos_seriales_encontrados",(function(e){g(e)})),f||v[0]&&p(v[0].path)}),[i,w]),o.useEffect((function(){(0,O.B2)(e.registro.id,(function(e){Z(e.authorization)}),(function(){}),(function(){Z(void 0)}),(function(){}))}),[]),setTimeout((function(){(0,l.I)(w,C)}),500),(0,t.jsxs)(I.Z,{onSubmit:function(n){n.preventDefault(),function(e){var n={datosDispositivo:{path:e.target[0].value,baudRate:parseInt(e.target[2].value)},configuracion:{ssid:e.target[3].value,password:e.target[4].value,puertoApi:e.target[6].value,ipApi:e.target[7].value,apiKey:e.target[8].value}};window.ipc.send("guardar_configuracion_controlador_puerta",n)}(n),e.toggleModal()},children:[(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"puertoSerial",children:"Puerto Serial del dispositivo grabador de tarjetas."}),(0,t.jsx)(k.Z,{id:"puertoSerial",type:"select",defaultValue:f,children:v.map((function(e){return(0,t.jsx)("option",{value:e.path,children:e.path})}))})]}),(0,t.jsxs)(S.Z,{check:!0,children:[(0,t.jsx)(A.Z,{check:!0,children:"Listar todos los puertos serial"}),(0,t.jsx)(k.Z,{type:"checkbox",onChange:function(e){d(e.target.checked)}})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"baudRate",children:"baudRate"}),(0,t.jsx)(k.Z,{id:"baudRate",type:"select",defaultValue:115200,children:[300,600,1200,2400,4800,9600,19200,38400,57600,92160,115200,230400,460800].map((function(e){return(0,t.jsx)("option",{value:e,children:e})}))})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"ssid",children:"SSID de red"}),(0,t.jsx)(k.Z,{id:"ssid",name:"campoSsid",type:"text",defaultValue:"AC Automatizacion 2.4"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"password",children:"Password de red"}),(0,t.jsx)(k.Z,{id:"password",name:"campoPassword",type:m?"text":"password",defaultValue:"Aau190410ry2@"})]}),(0,t.jsxs)(S.Z,{check:!0,children:[(0,t.jsx)(A.Z,{check:!0,children:"Mostrar contrasenia de la red"}),(0,t.jsx)(k.Z,{type:"checkbox",onChange:function(e){b(e.target.checked)}})]}),(0,t.jsx)("br",{}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiPort",children:"Puerto de API"}),(0,t.jsx)(k.Z,{id:"apiPort",name:"campoApiPort",type:"text",defaultValue:"3001"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiIp",children:"IP del API"}),(0,t.jsx)(k.Z,{id:"apiIp",name:"campoApiIp",type:"text",defaultValue:"127.0.0.1"})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(A.Z,{for:"apiKeyDispositivo",children:"API KEY del dispositivo"}),(0,t.jsx)(k.Z,{id:"apiKeyDispositivo",name:"campoApiKeyDispositivo",type:"text",defaultValue:x})]}),(0,t.jsx)("br",{}),(0,t.jsx)(r.Z,{children:(0,t.jsxs)(a.Z,{children:[(0,t.jsx)(s.Z,{children:(0,t.jsx)(D.Z,{active:!0,outline:!0,block:!0,onClick:function(){e.toggleModal()},children:"Cancelar"})}),(0,t.jsx)(s.Z,{children:(0,t.jsx)(D.Z,{active:!0,outline:!0,block:!0,color:"success",children:"Guardar Datos"})})]})})]})}function V(e){return(0,t.jsx)(R.Z,{isOpen:e.modalActivo,toggle:function(){e.toggleModal()},children:(0,t.jsxs)(x.Z,{className:"cardModalAlerta",color:"dark",children:[(0,t.jsx)(Z.Z,{children:e.headerModal}),(0,t.jsxs)(j.Z,{children:[(0,t.jsx)(v.Z,{className:"tituloModalOpcionesTabla",children:e.tituloModal}),e.children]})]})})}var z=i(31804),L=i(23438),K=i(89823),B=i.n(K);function G(e){return(0,t.jsx)(z.Z,{size:"sm",children:(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"warning",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"toggle_identificarse",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.OBx,size:1})})})}function F(e){return(0,t.jsx)(z.Z,{size:"sm",children:(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"warning",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"toggle_identificarse",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.OBx,size:1})})})}function U(e){return(0,t.jsxs)(z.Z,{size:"sm",children:[(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"warning",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"toggle_identificarse",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.OBx,size:1})}),(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"success",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"activar",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L._86,size:1})}),(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"danger",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"desactivar",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.Wa1,size:1})}),(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"danger",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"bloquear",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.d5D,size:1})}),(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"success",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"desbloquear",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.CE0,size:1})})]})}function q(e){return(0,t.jsxs)(z.Z,{size:"sm",children:[(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"warning",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"toggle_identificarse",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.OBx,size:1})}),(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"info",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"cerrar_puerta",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.zFE,size:1})}),(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"info",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"abrir_puerta",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.LnW,size:1})}),(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"danger",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"bloquear_puerta",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.d5D,size:1})}),(0,t.jsx)(D.Z,{className:"botonIcono",outline:!0,color:"success",onClick:function(){window.ipc.send("emitir_evento_socket",{evento:"forzar_accion",parametros:{accion:"desbloquear_puerta",idDispositivo:e.idDispositivo}})},children:(0,t.jsx)(B(),{path:L.CE0,size:1})})]})}var Y=i(15586);function W(e){var n=(0,c.Z)(o.useState(!1),2),i=n[0],r=n[1],a=(0,c.Z)(o.useState(0),2),s=a[0],x=a[1],Z=(0,c.Z)(o.useState(1),2),j=Z[0],v=(Z[1],(0,c.Z)(o.useState(1),2)),g=v[0],y=v[1],m=(0,c.Z)(o.useState([]),2),I=m[0],S=m[1],A=(0,c.Z)(o.useState(),2),k=A[0],D=(A[1],(0,c.Z)(o.useState(),2)),O=D[0],R=(D[1],(0,c.Z)(o.useState(),2)),z=R[0],L=(R[1],(0,c.Z)(o.useState(12),2)),K=L[0],B=L[1],W=(0,c.Z)(o.useState(!0),2),Q=W[0],X=W[1],H=(0,c.Z)(o.useState(!0),2),J=H[0],$=H[1],ee=(0,c.Z)(o.useState(!1),2),ne=ee[0],ie=ee[1],te=(0,c.Z)(o.useState(60),2),oe=te[0],re=te[1],ae=(0,c.Z)(o.useState([]),2),se=ae[0],ce=ae[1],de=(0,c.Z)(o.useState([]),2),ue=(de[0],de[1]),le=(0,c.Z)(o.useState([]),2),fe=le[0],pe=le[1],he=(0,c.Z)(o.useState(!1),2),xe=he[0],Ze=he[1],je=(0,c.Z)(o.useState(!1),2),ve=je[0],ge=je[1],ye=(0,c.Z)(o.useState(!1),2),me=ye[0],be=ye[1],_e=(0,c.Z)(o.useState(!1),2),Ie=_e[0],Se=_e[1],Ae=(0,c.Z)(o.useState(!1),2),ke=Ae[0],De=Ae[1],Oe=(0,c.Z)(o.useState(void 0),2),we=Oe[0],Ce=Oe[1],Pe=(0,c.Z)(o.useState(void 0),2);Pe[0],Pe[1];o.useEffect((function(){window.ipc.send("emitir_evento_socket",{evento:"listar_clientes"}),(0,p.hF)((function(e){var n=e.registros;ce(n)}),void 0,(function(){r(!1)}),(function(){ce([]),r(!0)}),(function(){})),(0,h.nk)((function(e){var n=e.registros;ue(n)}),void 0,(function(){r(!1)}),(function(){pe([])}),(function(){})),(0,Y.Op)((function(e){var n=e.registros;pe(n)}),void 0,(function(){r(!1)}),(function(){pe([])}),(function(){r(!1)}))}),[ne]),o.useEffect((function(){console.log("refresh"),S([]),S(window.ipc.sendSync("listar_clientes",null))}),[ne,J,k,O,z]),setTimeout((function(){(0,l.I)(J,$)}),1e3*oe);var Re="Lista de estatus de dispositivos",Ee={registrosPorPagina:K,opcionesRegistros:Q,tiempoRefrescamiento:oe,guardarConfiguracion:function(e){console.log(e),B(e.target[0].value?parseInt(e.target[0].value):0),re(e.target[1].value?parseInt(e.target[1].value):0),X(e.target[2].checked),y(1),x(0)}},Me={onRefrescarTabla:function(){ie(!ne)},onProbarSerial:function(){Ze(!xe)},onCambiarConfiguracion:function(){console.log("configuracion cambiada")}},Ne={paginaActual:g,offset:s,registrosPorPagina:K,totalPaginas:j,setPaginaActual:y,setOffset:x},Te={onGuardarConfiguracionDispositivo:function(e,n){switch(Ce(n),I[n].idTipoDispositivo){case 1:ge(!ve);break;case 2:Se(!Ie);break;case 3:be(!me);break;case 4:De(!ke)}}},Ve={Status:function(e){var n="",i="";switch(e){case f.Z.DESCONECTADO:n="secondary",i="DESCONECTADO";break;case f.Z.CONECTADO:n="success",i="CONECTADO";break;case f.Z.LIBRE:n="info",i="EN ESPERA";break;case f.Z.PERIFERICOS_NO_INICIALIZADOS:n="danger",i="ERROR";break;case f.Z.OCUPADO:n="warning",i="OCUPADO";break;case f.Z.BLOQUEADO:n="danger",i="BLOQUEADO"}return(0,t.jsx)(d.Z,{color:n,pill:!0,children:i})},Acciones:function(e){var n=void 0;if(I.map((function(i){i.id==e&&(n=i)})),"undefined"!==typeof n&&n.status!==f.Z.DESCONECTADO)switch(n.idTipoDispositivo){case 1:return(0,t.jsx)(F,{idDispositivo:n.id});case 2:return(0,t.jsx)(G,{idDispositivo:n.id});case 3:return(0,t.jsx)(U,{idDispositivo:n.id});case 4:return(0,t.jsx)(q,{idDispositivo:n.id});default:return(0,t.jsx)(t.Fragment,{})}return(0,t.jsx)(t.Fragment,{})}};return(0,t.jsxs)(b,{tituloTabla:Re,funcionesRegistros:Te,opcionesTabla:Ee,funcionesOpciones:Me,paginacion:Ne,cabeceras:["ID","Descripci\xf3n de dispositivo","Tipo de dispostivio","Zona","Status","Acciones"],registros:function(e){return(0,u.jg)(e,[["id"],["descripcionDispositivo"],["tipoDispositivo"],["zona"],["status"],["id"]],["id","indexRegistro"])}(I),formatoEspecial:Ve,enCarga:i,setEnCarga:r,children:[(0,t.jsx)(_.Z,{nombreGrid:Re,onConectarPorSerial:function(){},modalActivo:xe,toggleModal:function(){Ze(!xe)}}),(0,t.jsx)(M,{registro:void 0,headerModal:"Configurar Dispositivo",tituloModal:"Guardar la configuraci\xf3n del dispositivo",modalActivo:ve,toggleModal:function(){ge(!ve)},onOk:void 0,onRechazar:void 0,children:(0,t.jsx)(C,{registro:I[we],toggleModal:void 0})}),(0,t.jsx)(N,{registro:void 0,headerModal:"Configurar Dispositivo",tituloModal:"Guardar la configuraci\xf3n del dispositivo",modalActivo:me,toggleModal:function(){be(!me)},onOk:void 0,onRechazar:void 0,children:(0,t.jsx)(P,{elementosOpciones:{listaRoles:fe},registro:I[we],toggleModal:void 0})}),(0,t.jsx)(E,{registro:void 0,headerModal:"Configurar Dispositivo",tituloModal:"Guardar la configuraci\xf3n del dispositivo",modalActivo:Ie,toggleModal:function(){Se(!Ie)},onOk:void 0,onRechazar:void 0,children:(0,t.jsx)(w,{elementosOpciones:{listaZonas:se},registro:I[we],toggleModal:void 0})}),(0,t.jsx)(V,{registro:void 0,headerModal:"Configurar Dispositivo",tituloModal:"Guardar la configuraci\xf3n del dispositivo",modalActivo:ke,toggleModal:function(){De(!ke)},onOk:void 0,onRechazar:void 0,children:(0,t.jsx)(T,{registro:I[we],toggleModal:void 0})})]})}var Q=i(6947);function X(){return(0,t.jsx)(o.Fragment,{children:(0,t.jsx)(r.Z,{fluid:!0,children:(0,t.jsx)(a.Z,{children:(0,t.jsx)(s.Z,{children:(0,t.jsx)(W,{})})})})})}X.getLayout=function(e){return(0,t.jsx)(Q.Z,{children:e})}},10031:function(e,n,i){"use strict";i.d(n,{O5:function(){return l},B2:function(){return x},C7:function(){return p},GW:function(){return f},h3:function(){return h}});var t=i(29132),o=i(85556),r=i(89458),a=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.DISPOSITIVO.CONSULTA(e)]}))}));return function(n){return e.apply(this,arguments)}}(),s=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.DISPOSITIVO.REGISTRAR(e)]}))}));return function(n){return e.apply(this,arguments)}}(),c=function(){var e=(0,t.Z)((function(e,n){return(0,o.__generator)(this,(function(i){return[2,r.b.DISPOSITIVO.MODIFICAR(e,n)]}))}));return function(n,i){return e.apply(this,arguments)}}(),d=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.DISPOSITIVO.ELIMINAR(e)]}))}));return function(n){return e.apply(this,arguments)}}(),u=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.DISPOSITIVO.GENERAR_TOKEN(e)]}))}));return function(n){return e.apply(this,arguments)}}();function l(e,n,i,t,o){"undefined"!=typeof t&&t(),a(n).then((function(n){e(n.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function f(e,n,i,t,o){"undefined"!=typeof t&&t(),s(e).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function p(e,n,i,t,o,r){var a={id:e};"undefined"!=typeof o&&o(),c(a,n).then((function(e){"undefined"!=typeof i&&i(e.data)})).catch((function(e){"undefined"!=typeof t&&t(e)})).finally((function(){"undefined"!=typeof r&&r()}))}function h(e,n,i,t,o){var r={id:e};"undefined"!=typeof t&&t(),d(r).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function x(e,n,i,t,o){var r={id:e};"undefined"!=typeof t&&t(),u(r).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}},15586:function(e,n,i){"use strict";i.d(n,{Op:function(){return u},i2:function(){return f},pm:function(){return l},uN:function(){return p}});var t=i(29132),o=i(85556),r=i(89458),a=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.ROL.CONSULTA(e)]}))}));return function(n){return e.apply(this,arguments)}}(),s=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.ROL.REGISTRAR(e)]}))}));return function(n){return e.apply(this,arguments)}}(),c=function(){var e=(0,t.Z)((function(e,n){return(0,o.__generator)(this,(function(i){return[2,r.b.ROL.MODIFICAR(e,n)]}))}));return function(n,i){return e.apply(this,arguments)}}(),d=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.ROL.ELIMINAR(e)]}))}));return function(n){return e.apply(this,arguments)}}();function u(e,n,i,t,o){"undefined"!=typeof t&&t(),a(n).then((function(n){e(n.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function l(e,n,i,t,o){"undefined"!=typeof t&&t(),s(e).then((function(e){console.log(e),"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function f(e,n,i,t,o,r){var a={id:e};"undefined"!=typeof o&&o(),c(a,n).then((function(e){"undefined"!=typeof i&&i(e.data)})).catch((function(e){"undefined"!=typeof t&&t(e)})).finally((function(){"undefined"!=typeof r&&r()}))}function p(e,n,i,t,o){var r={id:e};"undefined"!=typeof t&&t(),d(r).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}},4294:function(e,n,i){"use strict";i.d(n,{nk:function(){return u},w7:function(){return f},l1:function(){return l},uw:function(){return p}});var t=i(29132),o=i(85556),r=i(89458),a=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.TIPO_DISPOSITIVO.CONSULTA(e)]}))}));return function(n){return e.apply(this,arguments)}}(),s=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.TIPO_DISPOSITIVO.REGISTRAR(e)]}))}));return function(n){return e.apply(this,arguments)}}(),c=function(){var e=(0,t.Z)((function(e,n){return(0,o.__generator)(this,(function(i){return[2,r.b.TIPO_DISPOSITIVO.MODIFICAR(e,n)]}))}));return function(n,i){return e.apply(this,arguments)}}(),d=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.TIPO_DISPOSITIVO.ELIMINAR(e)]}))}));return function(n){return e.apply(this,arguments)}}();function u(e,n,i,t,o){"undefined"!=typeof t&&t(),a(n).then((function(n){e(n.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function l(e,n,i,t,o){"undefined"!=typeof t&&t(),s(e).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function f(e,n,i,t,o,r){var a={id:e};"undefined"!=typeof o&&o(),c(a,n).then((function(e){"undefined"!=typeof i&&i(e.data)})).catch((function(e){"undefined"!=typeof t&&t(e)})).finally((function(){"undefined"!=typeof r&&r()}))}function p(e,n,i,t,o){var r={id:e};"undefined"!=typeof t&&t(),d(r).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}},73990:function(e,n,i){"use strict";i.d(n,{hF:function(){return u},fu:function(){return p},DS:function(){return l},Mf:function(){return f}});var t=i(29132),o=i(85556),r=i(89458),a=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.ZONA.CONSULTA(e)]}))}));return function(n){return e.apply(this,arguments)}}(),s=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.ZONA.REGISTRAR(e)]}))}));return function(n){return e.apply(this,arguments)}}(),c=function(){var e=(0,t.Z)((function(e,n){return(0,o.__generator)(this,(function(i){return[2,r.b.ZONA.MODIFICAR(e,n)]}))}));return function(n,i){return e.apply(this,arguments)}}(),d=function(){var e=(0,t.Z)((function(e){return(0,o.__generator)(this,(function(n){return[2,r.b.ZONA.ELIMINAR(e)]}))}));return function(n){return e.apply(this,arguments)}}();function u(e,n,i,t,o){"undefined"!=typeof t&&t(),a(n).then((function(n){e(n.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function l(e,n,i,t,o){"undefined"!=typeof t&&t(),s(e).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function f(e,n,i,t,o){var r={id:e};"undefined"!=typeof t&&t(),d(r).then((function(e){"undefined"!=typeof n&&n(e.data)})).catch((function(e){"undefined"!=typeof i&&i(e)})).finally((function(){"undefined"!=typeof o&&o()}))}function p(e,n,i,t,o,r){var a={id:e};"undefined"!=typeof o&&o(),c(a,n).then((function(e){"undefined"!=typeof i&&i(e.data)})).catch((function(e){"undefined"!=typeof t&&t(e)})).finally((function(){"undefined"!=typeof r&&r()}))}},91787:function(e,n,i){"use strict";function t(e,n){n(!e)}i.d(n,{I:function(){return t}})},50010:function(e,n,i){"use strict";i.d(n,{Z:function(){return t}});var t={DESCONECTADO:0,CONECTADO:1,LIBRE:2,PERIFERICOS_NO_INICIALIZADOS:4,OCUPADO:8,BLOQUEADO:16,LIBRE_3:32,LIBRE_4:64,LIBRE_5:128}}},function(e){e.O(0,[9080,9556,7815,1798,2234,6062,81,8023,924,5573,9774,2888,179],(function(){return n=76816,e(e.s=n);var n}));var n=e.O();_N_E=n}]);