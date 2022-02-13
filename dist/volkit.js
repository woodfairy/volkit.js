!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["volkit.js"]=e():t["volkit.js"]=e()}(this,(function(){return t={706:()=>{var t,e,r=r||function(t,e){var r={},i=r.lib={},n=function(){},o=i.Base={extend:function(t){n.prototype=this;var e=new n;return t&&e.mixIn(t),e.hasOwnProperty("init")||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},s=i.WordArray=o.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||a).stringify(this)},concat:function(t){var e=this.words,r=t.words,i=this.sigBytes;if(t=t.sigBytes,this.clamp(),i%4)for(var n=0;n<t;n++)e[i+n>>>2]|=(r[n>>>2]>>>24-n%4*8&255)<<24-(i+n)%4*8;else if(65535<r.length)for(n=0;n<t;n+=4)e[i+n>>>2]=r[n>>>2];else e.push.apply(e,r);return this.sigBytes+=t,this},clamp:function(){var e=this.words,r=this.sigBytes;e[r>>>2]&=4294967295<<32-r%4*8,e.length=t.ceil(r/4)},clone:function(){var t=o.clone.call(this);return t.words=this.words.slice(0),t},random:function(e){for(var r=[],i=0;i<e;i+=4)r.push(4294967296*t.random()|0);return new s.init(r,e)}}),c=r.enc={},a=c.Hex={stringify:function(t){var e=t.words;t=t.sigBytes;for(var r=[],i=0;i<t;i++){var n=e[i>>>2]>>>24-i%4*8&255;r.push((n>>>4).toString(16)),r.push((15&n).toString(16))}return r.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i+=2)r[i>>>3]|=parseInt(t.substr(i,2),16)<<24-i%8*4;return new s.init(r,e/2)}},f=c.Latin1={stringify:function(t){var e=t.words;t=t.sigBytes;for(var r=[],i=0;i<t;i++)r.push(String.fromCharCode(e[i>>>2]>>>24-i%4*8&255));return r.join("")},parse:function(t){for(var e=t.length,r=[],i=0;i<e;i++)r[i>>>2]|=(255&t.charCodeAt(i))<<24-i%4*8;return new s.init(r,e)}},h=c.Utf8={stringify:function(t){try{return decodeURIComponent(escape(f.stringify(t)))}catch(t){throw Error("Malformed UTF-8 data")}},parse:function(t){return f.parse(unescape(encodeURIComponent(t)))}},u=i.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=h.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var r=this._data,i=r.words,n=r.sigBytes,o=this.blockSize,c=n/(4*o);if(e=(c=e?t.ceil(c):t.max((0|c)-this._minBufferSize,0))*o,n=t.min(4*e,n),e){for(var a=0;a<e;a+=o)this._doProcessBlock(i,a);a=i.splice(0,e),r.sigBytes-=n}return new s.init(a,n)},clone:function(){var t=o.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});i.Hasher=u.extend({cfg:o.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){u.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,r){return new t.init(r).finalize(e)}},_createHmacHelper:function(t){return function(e,r){return new p.HMAC.init(t,r).finalize(e)}}});var p=r.algo={};return r}(Math);e=(t=r).lib.WordArray,t.enc.Base64={stringify:function(t){var e=t.words,r=t.sigBytes,i=this._map;t.clamp(),t=[];for(var n=0;n<r;n+=3)for(var o=(e[n>>>2]>>>24-n%4*8&255)<<16|(e[n+1>>>2]>>>24-(n+1)%4*8&255)<<8|e[n+2>>>2]>>>24-(n+2)%4*8&255,s=0;4>s&&n+.75*s<r;s++)t.push(i.charAt(o>>>6*(3-s)&63));if(e=i.charAt(64))for(;t.length%4;)t.push(e);return t.join("")},parse:function(t){var r=t.length,i=this._map;(n=i.charAt(64))&&-1!=(n=t.indexOf(n))&&(r=n);for(var n=[],o=0,s=0;s<r;s++)if(s%4){var c=i.indexOf(t.charAt(s-1))<<s%4*2,a=i.indexOf(t.charAt(s))>>>6-s%4*2;n[o>>>2]|=(c|a)<<24-o%4*8,o++}return e.create(n,o)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},function(t){function e(t,e,r,i,n,o,s){return((t=t+(e&r|~e&i)+n+s)<<o|t>>>32-o)+e}function i(t,e,r,i,n,o,s){return((t=t+(e&i|r&~i)+n+s)<<o|t>>>32-o)+e}function n(t,e,r,i,n,o,s){return((t=t+(e^r^i)+n+s)<<o|t>>>32-o)+e}function o(t,e,r,i,n,o,s){return((t=t+(r^(e|~i))+n+s)<<o|t>>>32-o)+e}for(var s=r,c=(f=s.lib).WordArray,a=f.Hasher,f=s.algo,h=[],u=0;64>u;u++)h[u]=4294967296*t.abs(t.sin(u+1))|0;f=f.MD5=a.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,r){for(var s=0;16>s;s++){var c=t[a=r+s];t[a]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}s=this._hash.words;var a=t[r+0],f=(c=t[r+1],t[r+2]),u=t[r+3],p=t[r+4],d=t[r+5],l=t[r+6],y=t[r+7],_=t[r+8],v=t[r+9],g=t[r+10],x=t[r+11],m=t[r+12],B=t[r+13],k=t[r+14],S=t[r+15],z=e(z=s[0],E=s[1],C=s[2],w=s[3],a,7,h[0]),w=e(w,z,E,C,c,12,h[1]),C=e(C,w,z,E,f,17,h[2]),E=e(E,C,w,z,u,22,h[3]);z=e(z,E,C,w,p,7,h[4]),w=e(w,z,E,C,d,12,h[5]),C=e(C,w,z,E,l,17,h[6]),E=e(E,C,w,z,y,22,h[7]),z=e(z,E,C,w,_,7,h[8]),w=e(w,z,E,C,v,12,h[9]),C=e(C,w,z,E,g,17,h[10]),E=e(E,C,w,z,x,22,h[11]),z=e(z,E,C,w,m,7,h[12]),w=e(w,z,E,C,B,12,h[13]),C=e(C,w,z,E,k,17,h[14]),z=i(z,E=e(E,C,w,z,S,22,h[15]),C,w,c,5,h[16]),w=i(w,z,E,C,l,9,h[17]),C=i(C,w,z,E,x,14,h[18]),E=i(E,C,w,z,a,20,h[19]),z=i(z,E,C,w,d,5,h[20]),w=i(w,z,E,C,g,9,h[21]),C=i(C,w,z,E,S,14,h[22]),E=i(E,C,w,z,p,20,h[23]),z=i(z,E,C,w,v,5,h[24]),w=i(w,z,E,C,k,9,h[25]),C=i(C,w,z,E,u,14,h[26]),E=i(E,C,w,z,_,20,h[27]),z=i(z,E,C,w,B,5,h[28]),w=i(w,z,E,C,f,9,h[29]),C=i(C,w,z,E,y,14,h[30]),z=n(z,E=i(E,C,w,z,m,20,h[31]),C,w,d,4,h[32]),w=n(w,z,E,C,_,11,h[33]),C=n(C,w,z,E,x,16,h[34]),E=n(E,C,w,z,k,23,h[35]),z=n(z,E,C,w,c,4,h[36]),w=n(w,z,E,C,p,11,h[37]),C=n(C,w,z,E,y,16,h[38]),E=n(E,C,w,z,g,23,h[39]),z=n(z,E,C,w,B,4,h[40]),w=n(w,z,E,C,a,11,h[41]),C=n(C,w,z,E,u,16,h[42]),E=n(E,C,w,z,l,23,h[43]),z=n(z,E,C,w,v,4,h[44]),w=n(w,z,E,C,m,11,h[45]),C=n(C,w,z,E,S,16,h[46]),z=o(z,E=n(E,C,w,z,f,23,h[47]),C,w,a,6,h[48]),w=o(w,z,E,C,y,10,h[49]),C=o(C,w,z,E,k,15,h[50]),E=o(E,C,w,z,d,21,h[51]),z=o(z,E,C,w,m,6,h[52]),w=o(w,z,E,C,u,10,h[53]),C=o(C,w,z,E,g,15,h[54]),E=o(E,C,w,z,c,21,h[55]),z=o(z,E,C,w,_,6,h[56]),w=o(w,z,E,C,S,10,h[57]),C=o(C,w,z,E,l,15,h[58]),E=o(E,C,w,z,B,21,h[59]),z=o(z,E,C,w,p,6,h[60]),w=o(w,z,E,C,x,10,h[61]),C=o(C,w,z,E,f,15,h[62]),E=o(E,C,w,z,v,21,h[63]),s[0]=s[0]+z|0,s[1]=s[1]+E|0,s[2]=s[2]+C|0,s[3]=s[3]+w|0},_doFinalize:function(){var e=this._data,r=e.words,i=8*this._nDataBytes,n=8*e.sigBytes;r[n>>>5]|=128<<24-n%32;var o=t.floor(i/4294967296);for(r[15+(n+64>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),r[14+(n+64>>>9<<4)]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8),e.sigBytes=4*(r.length+1),this._process(),r=(e=this._hash).words,i=0;4>i;i++)n=r[i],r[i]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8);return e},clone:function(){var t=a.clone.call(this);return t._hash=this._hash.clone(),t}}),s.MD5=a._createHelper(f),s.HmacMD5=a._createHmacHelper(f)}(Math),function(){var t,e=r,i=(t=e.lib).Base,n=t.WordArray,o=(t=e.algo).EvpKDF=i.extend({cfg:i.extend({keySize:4,hasher:t.MD5,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var r=(c=this.cfg).hasher.create(),i=n.create(),o=i.words,s=c.keySize,c=c.iterations;o.length<s;){a&&r.update(a);var a=r.update(t).finalize(e);r.reset();for(var f=1;f<c;f++)a=r.finalize(a),r.reset();i.concat(a)}return i.sigBytes=4*s,i}});e.EvpKDF=function(t,e,r){return o.create(r).compute(t,e)}}(),r.lib.Cipher||function(t){var e=(l=r).lib,i=e.Base,n=e.WordArray,o=e.BufferedBlockAlgorithm,s=l.enc.Base64,c=l.algo.EvpKDF,a=e.Cipher=o.extend({cfg:i.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,r){this.cfg=this.cfg.extend(r),this._xformMode=t,this._key=e,this.reset()},reset:function(){o.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(t){return{encrypt:function(e,r,i){return("string"==typeof r?y:d).encrypt(t,e,r,i)},decrypt:function(e,r,i){return("string"==typeof r?y:d).decrypt(t,e,r,i)}}}});e.StreamCipher=a.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var f=l.mode={},h=function(t,e,r){var i=this._iv;i?this._iv=void 0:i=this._prevBlock;for(var n=0;n<r;n++)t[e+n]^=i[n]},u=(e.BlockCipherMode=i.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}})).extend();u.Encryptor=u.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize;h.call(this,t,e,i),r.encryptBlock(t,e),this._prevBlock=t.slice(e,e+i)}}),u.Decryptor=u.extend({processBlock:function(t,e){var r=this._cipher,i=r.blockSize,n=t.slice(e,e+i);r.decryptBlock(t,e),h.call(this,t,e,i),this._prevBlock=n}}),f=f.CBC=u,u=(l.pad={}).Pkcs7={pad:function(t,e){for(var r,i=(r=(r=4*e)-t.sigBytes%r)<<24|r<<16|r<<8|r,o=[],s=0;s<r;s+=4)o.push(i);r=n.create(o,r),t.concat(r)},unpad:function(t){t.sigBytes-=255&t.words[t.sigBytes-1>>>2]}},e.BlockCipher=a.extend({cfg:a.cfg.extend({mode:f,padding:u}),reset:function(){a.reset.call(this);var t=(e=this.cfg).iv,e=e.mode;if(this._xformMode==this._ENC_XFORM_MODE)var r=e.createEncryptor;else r=e.createDecryptor,this._minBufferSize=1;this._mode=r.call(e,this,t&&t.words)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){t.pad(this._data,this.blockSize);var e=this._process(!0)}else e=this._process(!0),t.unpad(e);return e},blockSize:4});var p=e.CipherParams=i.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}}),d=(f=(l.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext;return((t=t.salt)?n.create([1398893684,1701076831]).concat(t).concat(e):e).toString(s)},parse:function(t){var e=(t=s.parse(t)).words;if(1398893684==e[0]&&1701076831==e[1]){var r=n.create(e.slice(2,4));e.splice(0,4),t.sigBytes-=16}return p.create({ciphertext:t,salt:r})}},e.SerializableCipher=i.extend({cfg:i.extend({format:f}),encrypt:function(t,e,r,i){i=this.cfg.extend(i);var n=t.createEncryptor(r,i);return e=n.finalize(e),n=n.cfg,p.create({ciphertext:e,key:r,iv:n.iv,algorithm:t,mode:n.mode,padding:n.padding,blockSize:t.blockSize,formatter:i.format})},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),t.createDecryptor(r,i).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}})),l=(l.kdf={}).OpenSSL={execute:function(t,e,r,i){return i||(i=n.random(8)),t=c.create({keySize:e+r}).compute(t,i),r=n.create(t.words.slice(e),4*r),t.sigBytes=4*e,p.create({key:t,iv:r,salt:i})}},y=e.PasswordBasedCipher=d.extend({cfg:d.cfg.extend({kdf:l}),encrypt:function(t,e,r,i){return r=(i=this.cfg.extend(i)).kdf.execute(r,t.keySize,t.ivSize),i.iv=r.iv,(t=d.encrypt.call(this,t,e,r.key,i)).mixIn(r),t},decrypt:function(t,e,r,i){return i=this.cfg.extend(i),e=this._parse(e,i.format),r=i.kdf.execute(r,t.keySize,t.ivSize,e.salt),i.iv=r.iv,d.decrypt.call(this,t,e,r.key,i)}})}(),function(){for(var t=r,e=t.lib.BlockCipher,i=t.algo,n=[],o=[],s=[],c=[],a=[],f=[],h=[],u=[],p=[],d=[],l=[],y=0;256>y;y++)l[y]=128>y?y<<1:y<<1^283;var _=0,v=0;for(y=0;256>y;y++){var g=(g=v^v<<1^v<<2^v<<3^v<<4)>>>8^255&g^99;n[_]=g,o[g]=_;var x=l[_],m=l[x],B=l[m],k=257*l[g]^16843008*g;s[_]=k<<24|k>>>8,c[_]=k<<16|k>>>16,a[_]=k<<8|k>>>24,f[_]=k,k=16843009*B^65537*m^257*x^16843008*_,h[g]=k<<24|k>>>8,u[g]=k<<16|k>>>16,p[g]=k<<8|k>>>24,d[g]=k,_?(_=x^l[l[l[B^x]]],v^=l[l[v]]):_=v=1}var S=[0,1,2,4,8,16,32,64,128,27,54];i=i.AES=e.extend({_doReset:function(){for(var t=(r=this._key).words,e=r.sigBytes/4,r=4*((this._nRounds=e+6)+1),i=this._keySchedule=[],o=0;o<r;o++)if(o<e)i[o]=t[o];else{var s=i[o-1];o%e?6<e&&4==o%e&&(s=n[s>>>24]<<24|n[s>>>16&255]<<16|n[s>>>8&255]<<8|n[255&s]):(s=n[(s=s<<8|s>>>24)>>>24]<<24|n[s>>>16&255]<<16|n[s>>>8&255]<<8|n[255&s],s^=S[o/e|0]<<24),i[o]=i[o-e]^s}for(t=this._invKeySchedule=[],e=0;e<r;e++)o=r-e,s=e%4?i[o]:i[o-4],t[e]=4>e||4>=o?s:h[n[s>>>24]]^u[n[s>>>16&255]]^p[n[s>>>8&255]]^d[n[255&s]]},encryptBlock:function(t,e){this._doCryptBlock(t,e,this._keySchedule,s,c,a,f,n)},decryptBlock:function(t,e){var r=t[e+1];t[e+1]=t[e+3],t[e+3]=r,this._doCryptBlock(t,e,this._invKeySchedule,h,u,p,d,o),r=t[e+1],t[e+1]=t[e+3],t[e+3]=r},_doCryptBlock:function(t,e,r,i,n,o,s,c){for(var a=this._nRounds,f=t[e]^r[0],h=t[e+1]^r[1],u=t[e+2]^r[2],p=t[e+3]^r[3],d=4,l=1;l<a;l++){var y=i[f>>>24]^n[h>>>16&255]^o[u>>>8&255]^s[255&p]^r[d++],_=i[h>>>24]^n[u>>>16&255]^o[p>>>8&255]^s[255&f]^r[d++],v=i[u>>>24]^n[p>>>16&255]^o[f>>>8&255]^s[255&h]^r[d++];p=i[p>>>24]^n[f>>>16&255]^o[h>>>8&255]^s[255&u]^r[d++],f=y,h=_,u=v}y=(c[f>>>24]<<24|c[h>>>16&255]<<16|c[u>>>8&255]<<8|c[255&p])^r[d++],_=(c[h>>>24]<<24|c[u>>>16&255]<<16|c[p>>>8&255]<<8|c[255&f])^r[d++],v=(c[u>>>24]<<24|c[p>>>16&255]<<16|c[f>>>8&255]<<8|c[255&h])^r[d++],p=(c[p>>>24]<<24|c[f>>>16&255]<<16|c[h>>>8&255]<<8|c[255&u])^r[d++],t[e]=y,t[e+1]=_,t[e+2]=v,t[e+3]=p},keySize:8}),t.AES=e._createHelper(i)}()},138:(t,e,r)=>{r(706),t.exports=t=>(console.log(`volkit.js - base URL ${t}`),{getRandomString:t=>{const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?@:;+-_ß";let r=new Uint16Array(t);return crypto.getRandomValues(r),r=r.map((t=>e.charCodeAt(t%e.length))),String.fromCharCode.apply(null,r)},encrypt:(t,e)=>{const r=CryptoJS.AES(t,e);return console.log(r),r},test:function(){console.log("test")}})}},e={},function r(i){var n=e[i];if(void 0!==n)return n.exports;var o=e[i]={exports:{}};return t[i](o,o.exports,r),o.exports}(138);var t,e}));