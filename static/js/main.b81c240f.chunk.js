(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(43)},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),i=n.n(c),o=n(16),l=n(1),s=n(2),u=n(4),d=n(3),p=n(5),h=n(15),m=n.n(h),f=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("g",{className:"year","data-id":this.props.id,"data-year":this.props.year},this.props.content)}}]),t}(a.Component),g=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("g",{className:"prizesList","data-id":this.props.id},this.props.content)}}]),t}(a.Component),y=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("g",{className:"category","data-id":this.props.id},this.props.content)}}]),t}(a.Component),b=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return this.props.content}}]),t}(a.Component),v=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).stick=function(){return window.onmousemove=function(e){n.setState({pos:{x:e.clientX+10,y:e.clientY-100}})}},n.componentDidMount=function(){return n.stick()},n.state={pos:{x:window.innerWidth/2,y:window.innerHeight/2}},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"Pop",style:{top:"".concat(this.state.pos.y,"px"),left:"".concat(this.state.pos.x,"px")}},r.a.createElement("p",null,"Age: ",r.a.createElement("span",null,this.props.data.age)),r.a.createElement("p",null,"Field: ",r.a.createElement("span",null,this.props.data.field)),r.a.createElement("p",null,"Gender: ",r.a.createElement("span",null,1===parseInt(this.props.data.gender)?"Woman":"Man")))}}]),t}(a.Component),O=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).generatePriceWinners=function(e,t,a){return e.map(function(e,c){return n.dot.y+=n.state.dot.inc,n.rect.x=n.dot.x-4,n.rect.y=n.state.svg.h-n.dot.y-4,n.prizeWinnersArr.push(r.a.createElement(b,{key:"".concat(t).concat(a).concat(c),content:e.data.gender?r.a.createElement("circle",{className:"dot","data-id":"".concat(t).concat(a).concat(c),"data-age":e.data.age,"data-coutry":e.data.coutry,"data-field":e.data.field,"data-gender":e.data.gender,cx:n.dot.x,cy:n.state.svg.h-n.dot.y,r:n.state.dot.scaleOut,onMouseOver:function(e){return n.dotMouseOver(e)},onMouseOut:function(e){return n.dotMouseOut(e)}}):r.a.createElement("rect",{className:"dot","data-id":"".concat(t).concat(a).concat(c),"data-age":e.data.age,"data-coutry":e.data.coutry,"data-field":e.data.field,"data-gender":e.data.gender,width:"8",height:"8",x:n.rect.x,y:n.rect.y,onMouseOver:function(e){return n.dotMouseOver(e)},onMouseOut:function(e){return n.dotMouseOut(e)}})}))})},n.generateCategories=function(e,t){return e.prizeList.map(function(e,a){return 0!==e.length&&(n.totalLength+=e.length,n.dot.y+=n.state.dot.inc,n.prizeWinnersArr=[],n.generatePriceWinners(e,t,a)),n.CategoriesArr.push(0!==e.length?r.a.createElement(y,{key:"".concat(t).concat(a),id:"".concat(t).concat(a),content:n.prizeWinnersArr}):null)})},n.generatePrizes=function(e,t){n.totalLength=0,n.line.x+=n.state.line.inc,n.dot.x=n.line.x,n.dot.y=0,n.CategoriesArr=[],n.generateCategories(e,t),n.line.y=n.state.svg.h-n.totalLength*n.state.line.multiplier,n.prizesArr.push(r.a.createElement(g,{key:t,id:t,content:n.CategoriesArr}))},n.generateTimeline=function(){return n.props.data.map(function(e,t){return n.prizesArr=[],n.generatePrizes(e,t),r.a.createElement(f,{key:t,"data-id":t,year:e.year,content:r.a.createElement(a.Fragment,null,r.a.createElement("line",{"data-id":t,x1:n.line.x,y1:n.line.y,x2:n.line.x,y2:n.state.svg.h}),n.prizesArr)})})},n.resetTlParams=function(){n.line={x:0,y:0}},n.dotMouse=function(e,t,a,r){var c=e.target;n.setState({infos:{age:c.dataset.age,country:c.dataset.country,field:c.dataset.field,gender:c.dataset.gender}});var i=c.parentNode.parentNode.parentNode.querySelectorAll(".category"),o=[];if(Array.from(i).map(function(e){return Array.from(e.childNodes).map(function(e){return o.push(e)})}),"circle"===c.tagName)c.setAttribute("r",t);else{var l=function(e){return r?parseInt(c.getAttribute(e))-4:parseInt(c.getAttribute(e))+4},s={x:l("x"),y:l("y"),width:a,height:a};for(var u in s)c.setAttribute(u,s[u])}Array.from(o).map(function(e){var t=c.dataset.id,a=e.dataset.id,i=parseInt(e.getAttribute("cy")),o=parseInt(e.getAttribute("y"));return t>a?(r?i+=n.state.dot.hover:i-=n.state.dot.hover,r?o+=n.state.dot.hover:o-=n.state.dot.hover):t<a&&(r?i-=n.state.dot.hover:i+=n.state.dot.hover,r?o-=n.state.dot.hover:o+=n.state.dot.hover),e.setAttribute("cy",i),e.setAttribute("y",o),null})},n.dotMouseOver=function(e){return n.dotMouse(e,n.state.dot.scaleIn,n.state.rect.scaleIn,1)},n.dotMouseOut=function(e){return n.dotMouse(e,n.state.dot.scaleOut,n.state.rect.scaleOut,0)},n.state={svg:{w:500,h:400},line:{inc:20,multiplier:20},dot:{inc:10,hover:10,scaleIn:10,scaleOut:5},rect:{scaleIn:16,scaleOut:8},infos:{}},n.totalLength=0,n.prizesArr=[],n.CategoriesArr=[],n.prizeWinnersArr=[],n.line={x:0,y:0},n.dot={x:n.line.x,y:0},n.rect={x:n.dot.x-4,y:n.state.svg.h-n.dot.y-4},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(a.Fragment,null,r.a.createElement("svg",{id:"Timeline",width:this.state.svg.w,height:this.state.svg.h},this.resetTlParams(),this.generateTimeline()),r.a.createElement(v,{data:this.state.infos}))}}]),t}(a.Component),j=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).renderAge=function(e){return e?r.a.createElement("input",{type:"number",min:"20",max:"72",placeholder:"30",onChange:function(e){return n.props.setAge(e)}}):null},n.onChangeDisplay=function(e){n.setState({display:e.target.checked,value:null})},n.state={display:!1,value:null},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"FilterAge"},r.a.createElement("h2",null,"FilterAge"),r.a.createElement("input",{type:"checkbox",onChange:function(t){return e.onChangeDisplay(t)}}),this.renderAge(this.state.display))}}]),t}(a.Component),E=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).renderField=function(e){return e?r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"fl1",value:"fl1"}),"Field 1",r.a.createElement("input",{type:"checkbox",name:"fl2",value:"fl2"}),"Field 2",r.a.createElement("input",{type:"checkbox",name:"fl3",value:"fl3"}),"Field 3",r.a.createElement("input",{type:"checkbox",name:"fl4",value:"fl4"}),"Field 4",r.a.createElement("input",{type:"checkbox",name:"fl5",value:"fl5"}),"Field 5",r.a.createElement("input",{type:"checkbox",name:"fl6",value:"fl6"}),"Field 6")):null},n.state={display:!1},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"FilterFields"},r.a.createElement("h2",null,"FilterFields"),r.a.createElement("input",{type:"checkbox",onChange:function(t){return e.setState({display:t.target.checked})}}),this.renderField(this.state.display))}}]),t}(a.Component),x=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).renderField=function(e){return e?r.a.createElement("div",null,r.a.createElement("label",null,r.a.createElement("input",{type:"checkbox",name:"gd1",value:"gd1"}),"Man",r.a.createElement("input",{type:"checkbox",name:"gd2",value:"gd2"}),"Woman")):null},n.state={display:!1},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"FilterGender"},r.a.createElement("h2",null,"FilterGender"),r.a.createElement("input",{type:"checkbox",onChange:function(t){return e.setState({display:t.target.checked})}}),this.renderField(this.state.display))}}]),t}(a.Component),A=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={age:{display:!1}},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"Filters"},r.a.createElement("h2",null,"filters"),r.a.createElement(j,{setAge:function(t){return e.props.setAge(t)}}),r.a.createElement(E,null),r.a.createElement(x,null))}}]),t}(a.Component),k=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).fetchData=function(){m.a.get("./timeline.json",{params:{year:1934},headers:{"Access-Control-Allow-Origin":"*"},proxy:{host:" http://172.19.120.186",port:3e3}}).then(function(e){return n.setState({timeline:e.data})}).catch(function(e){return console.log(e)})},n.UNSAFE_componentWillMount=function(){return n.fetchData()},n.setAge=function(e){var t=Object(o.a)({},n.state.params);t.age=e.target.value,n.setState({params:t},function(){return console.log("ddd")})},n.setFields=function(e){},n.setGender=function(e){},n.state={timeline:[],params:{age:null,field:null,gender:null}},n}return Object(p.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement(O,{data:this.state.timeline}),r.a.createElement(A,{setAge:function(t){return e.setAge(t)},setFields:function(t){return e.setFields(t)},setGender:function(t){return e.setGender(t)}}))}}]),t}(a.Component);n(42),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.b81c240f.chunk.js.map