(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(7),i=n.n(r),o=n(1),s=n(2),u=n(4),l=n(3),h=n(5),p=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("g",{className:"year","data-id":this.props.id},this.props.content)}}]),t}(c.Component),d=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("g",{className:"prizesList","data-id":this.props.id},this.props.content)}}]),t}(c.Component),m=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("g",{className:"category","data-id":this.props.id},this.props.content)}}]),t}(c.Component),f=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return this.props.content}}]),t}(c.Component),b=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(u.a)(this,Object(l.a)(t).call(this,e))).componentDidMount=function(){return n.fetchData()},n.fetchData=function(){fetch(n.state.json).then(function(e){return e.json()}).then(function(e){return n.setState({timeline:e})}).catch(function(e){return console.log(e)})},n.generate=function(){return n.state.timeline.map(function(e,t){n.yearPosY+=n.state.year.inc;var r=0,i=[],o=[],s={x:n.yearPosY,y:0};return e.prizesList.map(function(e,c){r+=e.length,s.y+=n.state.circle.inc;var i=[];return e.map(function(e,r){return console.log(e),s.y+=n.state.circle.inc,i.push(a.a.createElement(f,{key:"".concat(t).concat(c).concat(r),content:a.a.createElement("circle",{className:"dot","data-id":"".concat(t).concat(c).concat(r),"data-label":e.category,cx:s.x,r:"5",cy:n.state.svg.h-s.y,onMouseOver:function(e){return n.circleMouseOver(e)},onMouseOut:function(e){return n.circleMouseOut(e)}})}))}),o.push(a.a.createElement(m,{key:"".concat(t).concat(c),id:"".concat(t).concat(c),content:i}))}),i.push(a.a.createElement(d,{key:t,id:t,content:o})),a.a.createElement(p,{key:t,"data-id":t,content:a.a.createElement(c.Fragment,null,a.a.createElement("line",{"data-id":t,x1:n.yearPosY,y1:n.state.svg.h-r*n.state.line.multiplier,x2:n.yearPosY,y2:n.state.svg.h}),i)})})},n.circleMouse=function(e,t,c){var a=e.target,r=a.parentNode.parentNode.parentNode.querySelectorAll("circle");a.setAttribute("r",t),Array.from(r).map(function(e){var t=a.dataset.id,r=e.dataset.id,i=parseInt(e.getAttribute("cy"));return 1===c?t>r?i+=n.state.circle.hover:t<r&&(i-=n.state.circle.hover):0===c&&(t<r?i+=n.state.circle.hover:t>r&&(i-=n.state.circle.hover)),e.setAttribute("cy",i)})},n.circleMouseOver=function(e){return n.circleMouse(e,n.state.circle.scale1,1)},n.circleMouseOut=function(e){return n.circleMouse(e,n.state.circle.scale0,0)},n.state={json:"https://gist.githubusercontent.com/blyndusk/d789375e1a6309f82745bcfa3477f64f/raw/e1b9fdd086530e370775d95351019e4c1c6a2db8/timeline.json",timeline:[],svg:{w:500,h:200},year:{inc:20},line:{multiplier:20},circle:{inc:10,hover:10,scale0:5,scale1:10}},n.yearPosY=0,n}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("svg",{id:"Timeline",width:this.state.svg.w,height:this.state.svg.h},this.generate())}}]),t}(c.Component),y=function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement(b,null),a.a.createElement(b,null),a.a.createElement(b,null))}}]),t}(c.Component);n(14),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.bb814a67.chunk.js.map