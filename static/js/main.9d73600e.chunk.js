(this.webpackJsonpspesa=this.webpackJsonpspesa||[]).push([[0],{171:function(e,t,a){e.exports=a.p+"static/media/banner_donazione.e146b080.svg"},172:function(e,t,a){e.exports=a.p+"static/media/logo.285086bb.svg"},186:function(e,t,a){e.exports=a(436)},191:function(e,t,a){},192:function(e,t,a){},436:function(e,t,a){"use strict";a.r(t);var o=a(0),n=a.n(o),i=a(13),r=a.n(i),l=(a(191),a(42)),s=a(98),c=a(99),u=a(104),d=a(105),m=a(161),p=a(46),h=(a(192),a(3)),g=a(62),v=a(163),b=a.n(v),f=(a(437),a(201),a(100)),E=a(165),y=a(101),w=a(71),C=a(103),x=a(182),k=a(170),G=a(70),O=a(465),A=a(475),I=a(468),S=a(471),j=a(470),D=a(472),z=a(473),B=a(466),P=a(469),M=a(181),R=a(476),U=a(464),H=a(474),W=a(177),F=a.n(W),N=a(180),q=a.n(N),J=a(467),K=a(175),L=a.n(K),V=a(179),_=a.n(V),T=a(178),Y=a.n(T),Z=a(174),Q=a.n(Z),$=a(176),X=a.n($),ee=a(171),te=a.n(ee),ae=a(172),oe=a.n(ae),ne=[45.4642,9.19];h.initializeApp({apiKey:"AIzaSyADxgU6pKy-sqxGhPHkqAoW_VqG85VsQB8",authDomain:"spesa-2de52.firebaseapp.com",databaseURL:"https://spesa-2de52.firebaseio.com",projectId:"spesa-2de52",storageBucket:"spesa-2de52.appspot.com",messagingSenderId:"232880545893",appId:"1:232880545893:web:57cbf0ac1e002b3625a68c",measurementId:"G-K5TC2JJMH8"}),h.analytics();var ie=Object(M.a)({palette:{background:{default:"#315190"},primary:{main:"#315190"},secondary:{main:"#40bd47"}},status:{danger:"orange"},typography:{h2:{color:"#fed111"},h1:{color:"#fed111"},h5:{color:"white"},fontFamily:"'Baloo Da 2', cursive"}});ie=Object(R.a)(ie);var re=Object(U.a)((function(e){return{text:{padding:e.spacing(2,2,0)},paper:{paddingBottom:50},list:{marginBottom:e.spacing(2),width:250},subheader:{backgroundColor:e.palette.background.paper},appBar:{top:"auto",bottom:0},grow:{flexGrow:1},fabButton:{position:"absolute",zIndex:1,top:-30,left:0,right:0,margin:"0 auto"},fullList:{width:"auto"},media:{height:140},footer:{top:"auto",bottom:0,shadows:["none"]},root:{display:"flex","& > *":{margin:e.spacing(1)}}}}));function le(e){var t="Anonimo";h.auth().currentUser.displayName&&(t=h.auth().currentUser.displayName);var a=void 0;return h.auth().currentUser.photoURL&&(a=h.auth().currentUser.photoURL),n.a.createElement(O.a,{position:"fixed",color:"primary",className:re().appBar},n.a.createElement(B.a,null,n.a.createElement(J.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){e.handleChange()}},n.a.createElement(Q.a,null)),n.a.createElement(I.a,{onClick:function(){window.open("https://donazioni.cri.it/donazioni/dona-per-emergenza-coronavirus")},color:"inherit",style:{left:20}},n.a.createElement(P.a,null,"Dona ora!")),n.a.createElement("div",{className:re().grow}),n.a.createElement(A.a,{alt:t,src:a},"A"),n.a.createElement(J.a,{color:"inherit","aria-label":"logout",onClick:function(){h.auth().signOut()}},n.a.createElement(L.a,null))))}function se(e){var t,a,o="Salvataggio completato.";e.isGeolocationAvailable&&e.isGeolocationEnabled||(o="Salvataggio completato, abilita il gps per salvare il disegno nella tua posizione sul murales."),null==e.coords?(t=ne[0],a=ne[1]):(t=e.coords.latitude,a=e.coords.longitude),localStorage.setItem("arteInsiemeSalvataggio",e.saveableCanvas.getSaveData());var i=h.firestore();return new f.GeoFirestore(i).collection("disegni").doc(h.auth().currentUser.uid).set({disegno:e.saveableCanvas.getSaveData(),base64:e.saveableCanvas.canvasContainer.children[1].toDataURL(),coordinates:new h.firestore.GeoPoint(t,a),timestamp:+new Date}),n.a.createElement(P.a,{color:"textPrimary",style:{textTransform:"lowercase"}},o,n.a.createElement(j.a,{style:{backgroundColor:"transparent"},elevation:0},n.a.createElement(S.a,{style:{height:100,backgroundColor:"transparent"},image:te.a,title:"Contemplative Reptile",component:"img"})))}function ce(){var e=Object(o.useState)([]),t=Object(p.a)(e,2),a=t[0],i=t[1],r=h.firestore().collection("disegno grande").orderBy("lat","desc");return 0===a.length&&r.get().then((function(e){i(e.docs.map((function(e){return{src:"data:image/png;base64,"+e.data().base64.ci}})))})).catch((function(e){console.log("Error getting documents",e)})),n.a.createElement("div",{style:{overflow:"auto",height:"100vh",display:"block",position:"relative",marginBottom:"700px"}},n.a.createElement(y.a,{photos:a}))}function ue(e){var t,a=h.firestore(),i=new f.GeoFirestore(a),r=Object(o.useState)([]),l=Object(p.a)(r,2),s=l[0],c=l[1],u=Object(o.useState)(0),d=Object(p.a)(u,2),g=d[0],v=d[1],b=Object(o.useState)(!1),E=Object(p.a)(b,2),C=E[0],x=E[1],k=Object(o.useCallback)((function(e,t){t.photo;var a=t.index;v(a),x(!0)}),[]),O=window.innerHeight,A=G.isMobile?void 0:window.innerWidth;return t=e.isGeolocationAvailable&&e.isGeolocationEnabled&&null!=e.coords?i.collection("disegni").near({center:new h.firestore.GeoPoint(e.coords.latitude,e.coords.longitude),radius:1e3}).limit(30):i.collection("disegni").near({center:new h.firestore.GeoPoint(ne[0],ne[1]),radius:1e3}).limit(30),0===s.length&&t.get().then((function(e){c(e.docs.map((function(e){return{src:e.data().base64,height:O,width:A}})))})),s.lenght<1?n.a.createElement("p",null,"Ancora non ci sono immagini in questa zona, aggiungi tu la prima!"):n.a.createElement("div",{style:{overflow:"auto",height:"100vh",display:"block",position:"relative",marginBottom:"700px"}},n.a.createElement(y.a,{photos:s,onClick:k}),n.a.createElement(w.b,null,C?n.a.createElement(w.a,{onClose:function(){v(0),x(!1)}},n.a.createElement(w.c,{currentIndex:g,views:s.map((function(e){return Object(m.a)({},e,{srcset:e.srcSet,caption:e.title})}))})):null))}function de(e){return e.vistaMappa?n.a.createElement(ce,null):n.a.createElement(ue,{isGeolocationAvailable:e.isGeolocationAvailable,isGeolocationEnabled:e.isGeolocationEnabled,coords:e.coords})}var me=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var o=arguments.length,n=new Array(o),i=0;i<o;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).state={color:"#444",datiDisegno:null,giaFatto:!1,vistaMappa:!1},e.handleChangeComplete=function(t,a){e.setState({color:t.hex})},e.handleChange=function(){e.setState({vistaMappa:!e.state.vistaMappa})},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=localStorage.getItem("arteInsiemeSalvataggio");h.firestore().collection("disegni").doc(h.auth().currentUser.uid).get().then((function(t){if(t.exists){var a=t.data().d.disegno;void 0!==a&&e.setState({datiDisegno:a}).catch((function(e){}))}})).catch((function(a){null!=t&&e.setState({datiDisegno:t})}))}},{key:"render",value:function(){var e=this;return this.props.vistaDisegni?n.a.createElement("div",null,n.a.createElement(D.a,{color:"secondary","aria-label":"colore",style:{margin:0,zIndex:1,top:"auto",right:20,bottom:80,left:"auto",position:"fixed"}},n.a.createElement(X.a,{style:{color:"white"},onClick:function(){return e.handleChange()}})),n.a.createElement(de,{isGeolocationAvailable:this.props.isGeolocationAvailable,isGeolocationEnabled:this.props.isGeolocationEnabled,coords:this.props.coords,vistaMappa:this.state.vistaMappa})):n.a.createElement("div",null,n.a.createElement(D.a,{color:"secondary","aria-label":"colore",style:{margin:0,zIndex:1,top:"auto",right:20,bottom:260,left:"auto",position:"fixed"}},n.a.createElement(C.a,{trigger:n.a.createElement(F.a,{style:{color:"white"}}),position:"left center"},n.a.createElement(k.GithubPicker,{color:this.state.color,onChangeComplete:this.handleChangeComplete,disableAlpha:!0}))),n.a.createElement(D.a,{color:"secondary","aria-label":"save",style:{margin:0,zIndex:1,top:"auto",right:20,bottom:200,left:"auto",position:"fixed"}},n.a.createElement(C.a,{trigger:n.a.createElement(Y.a,{style:{color:"white"}}),position:"left center"},n.a.createElement(se,{isGeolocationAvailable:this.props.isGeolocationAvailable,isGeolocationEnabled:this.props.isGeolocationEnabled,coords:this.props.coords,saveableCanvas:this.saveableCanvas}))),n.a.createElement(D.a,{color:"secondary","aria-label":"undo",style:{margin:0,zIndex:1,right:20,bottom:140,left:"auto",position:"fixed"}},n.a.createElement(_.a,{onClick:function(){e.saveableCanvas.undo()},style:{color:"white"}})),n.a.createElement(D.a,{color:"secondary","aria-label":"clear",style:{margin:0,zIndex:1,top:"auto",right:20,bottom:80,left:"auto",position:"fixed"}},n.a.createElement(q.a,{onClick:function(){e.saveableCanvas.clear()},style:{color:"white"}})),n.a.createElement(x.a,{hideInterface:!!G.isMobile,ref:function(t){e.saveableCanvas=t},lazyRadius:0,brushRadius:G.isMobile?3:7,saveData:this.state.datiDisegno,brushColor:this.state.color,style:{width:window.innerWidth,height:window.innerHeight-65,zIndex:-1,position:"absolute"}}))}}]),a}(n.a.Component);function pe(){return n.a.createElement(O.a,{position:"fixed",color:"primary",className:re().footer,elevation:0},n.a.createElement(B.a,null,n.a.createElement(I.a,{color:"secondary",onClick:function(){return window.open("https://www.privacypolicygenerator.info/live.php?token=bOaq2FxZvBZ3mJY3PESMHOe27PREKKjp")}},"Privacy policy"),n.a.createElement("div",{className:re().grow}),n.a.createElement(P.a,null,"Sponsorizzato da:"),n.a.createElement(I.a,{color:"secondary",onClick:function(){return window.open("https://www.morocolor.it/")}},"Primo")))}var he=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var o=arguments.length,n=new Array(o),i=0;i<o;i++)n[i]=arguments[i];return(e=t.call.apply(t,[this].concat(n))).state={isSignedIn:!1},e.uiConfig={signInFlow:"popup",signInOptions:[h.auth.GoogleAuthProvider.PROVIDER_ID,g.auth.AnonymousAuthProvider.PROVIDER_ID],callbacks:{signInSuccessWithAuthResult:function(){return!1}}},e.handleChange=function(){e.setState({vistaDisegni:!e.state.vistaDisegni})},e}return Object(c.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.unregisterAuthObserver=h.auth().onAuthStateChanged((function(t){return e.setState({isSignedIn:!!t})}))}},{key:"componentWillUnmount",value:function(){this.unregisterAuthObserver()}},{key:"render",value:function(){var e;return this.state.isSignedIn?n.a.createElement("div",null,n.a.createElement(le,{vistaDisegni:this.state.vistaDisegni,handleChange:this.handleChange}),n.a.createElement(me,{isGeolocationAvailable:this.props.isGeolocationAvailable,isGeolocationEnabled:this.props.isGeolocationEnabled,coords:this.props.coords,vistaDisegni:this.state.vistaDisegni})):n.a.createElement("div",null,n.a.createElement("div",{style:{backgroundColor:"#315190"}},n.a.createElement(z.a,(e={container:!0,spacing:5,direction:"column",alignItems:"center",justify:"center"},Object(l.a)(e,"spacing",1),Object(l.a)(e,"style",{minHeight:"100vh",overflowY:"scroll"}),e),n.a.createElement(z.a,{item:!0,xs:12},n.a.createElement(j.a,{style:{maxWidth:345,backgroundColor:"transparent",marginBottom:"-50px"},elevation:0},n.a.createElement(S.a,{style:{height:170,backgroundColor:"transparent"},image:oe.a,title:"Contemplative Reptile",component:"img"}))),n.a.createElement(z.a,{item:!0,xs:12},n.a.createElement(P.a,{variant:"h1",component:"h2"},"Art@Hack")),n.a.createElement(z.a,{item:!0,xs:12},n.a.createElement(P.a,{variant:"h5",component:"h5"},"Una grande opera d'arte collettiva.")),n.a.createElement(z.a,{item:!0,xs:12},n.a.createElement(b.a,{uiConfig:this.uiConfig,firebaseAuth:h.auth()})))),n.a.createElement(pe,null))}}]),a}(n.a.Component);var ge=Object(E.geolocated)({positionOptions:{enableHighAccuracy:!1},watchPosition:!0,userDecisionTimeout:5e3})((function(e){return n.a.createElement("div",null,n.a.createElement(H.a,{theme:ie},n.a.createElement(he,{isGeolocationAvailable:e.isGeolocationAvailable,isGeolocationEnabled:e.isGeolocationEnabled,coords:e.coords})))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(ge,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[186,1,2]]]);
//# sourceMappingURL=main.9d73600e.chunk.js.map