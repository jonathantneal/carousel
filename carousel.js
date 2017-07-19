var Carousel=function(){"use strict";var t=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},e=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),i=function(){function i(e,s){function a(){clearTimeout(h),h=setTimeout(u,0,event)}var n=this;t(this,i);var r=Object(s);for(var l in i.defaults)this[l]=l in r?r[l]:i.defaults[l];var o=this.target=e instanceof Element?e:document.querySelector(e);o.classList.add(this.prefix),o.id=o.id||this.prefix;var c=function(t,e){var i=n[t+"Control"]=document.createElement("button");i.className=n.prefix+"-immediate-control "+n.prefix+"-"+t+"-control",i.addEventListener("click",function(){n.setSlideByIndex(n.currentIndex+e)}),i.appendChild(document.createElement("span")).appendChild(document.createTextNode(n.lang[t]+" "+n.lang.slide))};c("previous",-1),c("next",1),o.insertBefore(this.previousControl,o.firstElementChild),o.appendChild(this.nextControl);var d=this.paginationControls=document.createElement("nav");d.className=this.prefix+"-pagination-controls",d.setAttribute("role","navigation"),d.setAttribute("aria-labelledby",o.id),o.appendChild(d),this.paginationControl=[],this.slides=[].map.call(Object(this.slides)===this.slides&&"number"==typeof this.slides.length?this.slides:o.querySelectorAll(this.slides),function(t,e){t.id=t.id||n.prefix+"-slide-"+e,t.classList.add(n.prefix+"-slide"),t.classList.add(n.prefix+"-slide-"+e),t.classList.add(n.prefix+"-inactive-slide"),t.setAttribute("aria-hidden",!0);var i=n.paginationControl[e]=d.appendChild(document.createElement("button"));return i.className=n.prefix+"-pagination-control "+n.prefix+"-inactive-control",i.addEventListener("click",function(){n.setSlideByIndex(e)}),i.appendChild(document.createElement("span")).appendChild(document.createTextNode(n.lang.slide+" "+(e+1))),{target:t,control:i}}),this.isVisible=!0,this.isMouseInteractive=!1,this.isFocusInteractive=!1,this.isInputInteractive=!1;var u=function(t){var e="visibilitychange"===t.type?"visible"===o.ownerDocument.visibilityState:n.isVisible,i="mouseenter"===t.type||"mouseleave"!==t.type&&n.isMouseInteractive,s="focusin"===t.type||"focusout"!==t.type&&n.isFocusInteractive,a=i||s;e!==n.isVisible&&(n.isVisible=e,n.autoplay&&n[e?"play":"pause"](),n.dispatch(e?"visibilityvisible":"visibilityhidden",t.target),n.dispatch("visibilitychange",t.target)),i!==n.isMouseInteractive&&(n.isMouseInteractive=i,n.dispatch(i?"mouseenter":"mouseleave",t.target),n.dispatch("mousechange",t.target)),s!==n.isFocusInteractive&&(n.isFocusInteractive=s,n.autoplay&&n[s?"pause":"play"](),n.dispatch(s?"focusenter":"focusleave",t.target),n.dispatch("focuschange",t.target)),a!==n.isInputInteractive&&(n.isInputInteractive=a,n.dispatch(a?"inputenter":"inputleave",t.target),n.dispatch("inputchange",t.target))};o.ownerDocument.addEventListener("visibilitychange",u),o.addEventListener("mouseenter",u),o.addEventListener("mouseleave",u),o.addEventListener("focusout",a),o.addEventListener("focusin",a);var h=void 0,p=this.currentIndex||0;this.currentIndex=null,this.setSlideByIndex(p),this.dispatch("loaded",o),this.autoplay&&this.play()}return e(i,[{key:"setSlideByIndex",value:function(t){if(this.currentIndex!==t){var e=this.slides.length,i=this.lastIndex=this.currentIndex,s=this.currentIndex=(e+t%e)%e,a=this.slides[i],n=this.slides[s];a&&(a.target.classList.remove(this.prefix+"-active-slide"),a.target.classList.add(this.prefix+"-inactive-slide"),a.target.setAttribute("aria-hidden",!0),a.control.classList.remove(this.prefix+"-active-control"),a.control.classList.add(this.prefix+"-inactive-control"),a.control.removeAttribute("aria-current"),a.control.removeAttribute("aria-controls"),this.dispatch("slideleave",a.target)),n.target.classList.add(this.prefix+"-active-slide"),n.target.classList.remove(this.prefix+"-inactive-slide"),n.target.removeAttribute("aria-hidden"),n.control.classList.add(this.prefix+"-active-control"),n.control.classList.remove(this.prefix+"-inactive-control"),n.control.setAttribute("aria-current",!0),n.control.setAttribute("aria-controls",n.target.id),this.dispatch("slideenter",n.target),this.dispatch("slidechange",n.target)}}},{key:"dispatch",value:function(t,e){var i=document.createEvent("CustomEvent");i.initCustomEvent(this.prefix+":"+t,!0,!1,this),e.dispatchEvent(i)}},{key:"play",value:function(){var t=this;this._interval||(!function e(){var i=t.slides[t.currentIndex].duration||t.duration;t._interval=setTimeout(function(){t.setSlideByIndex(t.currentIndex+1),t._interval&&(t._interval=clearTimeout(t._interval),e())},i)}(),this.dispatch("play",this.target),this.dispatch("playpause",this.target))}},{key:"pause",value:function(){this._interval&&(this._interval=clearTimeout(this._interval),this.dispatch("pause",this.target),this.dispatch("playpause",this.target))}}]),i}();return i.defaults={prefix:"carousel",slides:"li",currentIndex:0,duration:8e3,autoplay:!1,lang:{next:"Next",previous:"Previous",slide:"Slide"}},i}();
//# sourceMappingURL=carousel.js.map