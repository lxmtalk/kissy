/*
Copyright (c) 2009, Kissy UI Library. All rights reserved.
MIT Licensed.
http://kissy.googlecode.com/

Date: 2009-12-17 21:11:38
Revision: 317
*/
if(typeof KISSY==="undefined"||!KISSY){function KISSY(b){var a=this;if(!(a instanceof arguments.callee)){return new arguments.callee(b)}a._init();a._config(b);a._setup();return a}}(function(a){var d=window,c="undefined",b=function(g,f,e){if(!f||!g){return g}if(typeof e===c){e=true}var h;if(e||!(h in g)){for(h in f){g[h]=f[h]}}return g};b(a.prototype,{add:function(f,h,e,g){a.Env.mods[f]={name:f,fn:h,version:e,details:g||{}};return this},_init:function(){var e=this;e.version="@VERSION@";e.Env={mods:{},_used:{},_attached:{}};e.config={debug:true}},_config:function(e){b(this.config,e)},_setup:function(){this.use("kissy-base")},use:function(){var h=this,q=Array.prototype.slice.call(arguments,0),t=a.Env.mods,u=h.Env._used,j=q.length,s=q[j-1],n,m,g,e=[];if(typeof s==="function"){q.pop()}else{s=null}if(q[0]==="*"){q=[];for(m in t){q.push(m)}if(s){q.push(s)}return h.use.apply(h,q)}function p(k){if(u[k]){return}var f=t[k],i,o,l;if(f){u[k]=true;l=f.details.submodules}if(l){if(typeof l==="string"){l=[l]}for(i=0,o=l.length;i<o;i++){p(l[i])}}e.push(k)}for(n=0;n<j;n++){p(q[n])}h._attach(e);if(s){s(h)}return h},_attach:function(n){var k=a.Env.mods,j=this.Env._attached,h,f=n.length,g,e;for(h=0;h<f;h++){g=n[h];e=k[g];if(!j[g]&&e){j[g]=true;if(e.fn){e.fn(this)}}}},mix:b,merge:function(){var f=arguments,h={},g,e=f.length;for(g=0;g<e;++g){b(h,f[g],true)}return h},extend:function(i,h,f,l){if(!h||!i){return i}var e=Object.prototype,k=function(n){function m(){}m.prototype=n;return new m()},j=h.prototype,g=k(j);i.prototype=g;g.constructor=i;i.superclass=j;if(h!==Object&&j.constructor===e.constructor){j.constructor=h}if(f){b(g,f)}if(l){b(i,l)}return i},cloneTo:function(e){function f(g){if(!(this instanceof f)){return new f(g)}if(typeof g===c){g=[]}f.superclass.constructor.apply(this,g)}a.extend(f,a,null,a);return(d[e]=f)},namespace:function(){var f=arguments,e=f.length,m=this,h,g,k;if(typeof m==="object"){m=m.constructor}for(h=0;h<e;h++){k=(""+f[h]).split(".");for(g=(d[k[0]]===m)?1:0;g<k.length;g++){m[k[g]]=m[k[g]]||{};m=m[k[g]]}}return m},log:function(g,e,f){var h=this.config;if(h.debug){f&&(g=f+": "+g);if(typeof console!==c&&console.log){console[e&&console[e]?e:"log"](g)}else{if(typeof opera!==c){opera.postError(g)}}}return this}});b(a,a.prototype);a._init()})(KISSY);
