(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.StickyScroller=t():e.StickyScroller=t()}(window,function(){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t){e.exports=class{constructor(e,t){if(this.newScrollPosition=0,this.oldScrollPositon=0,this.ticking=!1,"string"==typeof e)this.element=document.querySelector(e);else{if(!(e instanceof HTMLElement))return void console.error("StickyScroller: element is required.");this.element=e}this.element.style.overflowY="hidden",window.addEventListener("scroll",this.onWindowScroll.bind(this))}onWindowScroll(){this.newScrollPosition=window.scrollY,this.ticking||(window.requestAnimationFrame(()=>{this.translate(),this.ticking=!1,this.oldScrollPositon=this.newScrollPosition}),this.ticking=!0)}translate(){const e=this.element.parentElement.getBoundingClientRect(),t=this.newScrollPosition-this.oldScrollPositon;e.top>0&&t>0||e.bottom<window.innerHeight&&t<0||(this.element.scrollTop=this.element.scrollTop+t)}}}])});
},{}],2:[function(require,module,exports){
const StickyScroller = require("sticky-scroller");

const toc = document.getElementById("toc");

if (toc) {
  new StickyScroller(toc); // scroll with the page magically

  const headings = document.querySelectorAll(
    ".toc-scope h2, .toc-scope h3, .toc-scope h4, .toc-scope h5, .toc-scope h6"
  );
}

},{"sticky-scroller":1}]},{},[2])

//# sourceMappingURL=toc.js.map
