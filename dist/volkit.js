!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["volkit.js"]=e():t["volkit.js"]=e()}(this,(function(){return(t={}).volkit={getRandomString:t=>{const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@:;+-_ß";let o=new Uint16Array(t);return crypto.getRandomValues(o),o=o.map((t=>e.charCodeAt(t%e.length))),String.fromCharCode.apply(null,o)}},t;var t}));