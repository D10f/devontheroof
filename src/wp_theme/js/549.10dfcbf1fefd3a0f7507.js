(self.webpackChunkwebpack_v5_dom_typescript=self.webpackChunkwebpack_v5_dom_typescript||[]).push([[549],{549:function(e,a,n){var t=function(e){var a=/\blang(?:uage)?-([\w-]+)\b/i,n=0,t={},r={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(a){return a instanceof s?new s(a.type,e(a.content),a.alias):Array.isArray(a)?a.map(e):a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(a,n){var t,s;switch(n=n||{},r.util.type(a)){case"Object":if(s=r.util.objId(a),n[s])return n[s];for(var i in t={},n[s]=t,a)a.hasOwnProperty(i)&&(t[i]=e(a[i],n));return t;case"Array":return s=r.util.objId(a),n[s]?n[s]:(t=[],n[s]=t,a.forEach((function(a,r){t[r]=e(a,n)})),t);default:return a}},getLanguage:function(e){for(;e&&!a.test(e.className);)e=e.parentElement;return e?(e.className.match(a)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(t){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(t.stack)||[])[1];if(e){var a=document.getElementsByTagName("script");for(var n in a)if(a[n].src==e)return a[n]}return null}},isActive:function(e,a,n){for(var t="no-"+a;e;){var r=e.classList;if(r.contains(a))return!0;if(r.contains(t))return!1;e=e.parentElement}return!!n}},languages:{plain:t,plaintext:t,text:t,txt:t,extend:function(e,a){var n=r.util.clone(r.languages[e]);for(var t in a)n[t]=a[t];return n},insertBefore:function(e,a,n,t){var s=(t=t||r.languages)[e],i={};for(var l in s)if(s.hasOwnProperty(l)){if(l==a)for(var o in n)n.hasOwnProperty(o)&&(i[o]=n[o]);n.hasOwnProperty(l)||(i[l]=s[l])}var u=t[e];return t[e]=i,r.languages.DFS(r.languages,(function(a,n){n===u&&a!=e&&(this[a]=i)})),i},DFS:function e(a,n,t,s){s=s||{};var i=r.util.objId;for(var l in a)if(a.hasOwnProperty(l)){n.call(a,l,a[l],t||l);var o=a[l],u=r.util.type(o);"Object"!==u||s[i(o)]?"Array"!==u||s[i(o)]||(s[i(o)]=!0,e(o,n,l,s)):(s[i(o)]=!0,e(o,n,null,s))}}},plugins:{},highlightAll:function(e,a){r.highlightAllUnder(document,e,a)},highlightAllUnder:function(e,a,n){var t={callback:n,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};r.hooks.run("before-highlightall",t),t.elements=Array.prototype.slice.apply(t.container.querySelectorAll(t.selector)),r.hooks.run("before-all-elements-highlight",t);for(var s,i=0;s=t.elements[i++];)r.highlightElement(s,!0===a,t.callback)},highlightElement:function(n,t,s){var i=r.util.getLanguage(n),l=r.languages[i];n.className=n.className.replace(a,"").replace(/\s+/g," ")+" language-"+i;var o=n.parentElement;o&&"pre"===o.nodeName.toLowerCase()&&(o.className=o.className.replace(a,"").replace(/\s+/g," ")+" language-"+i);var u={element:n,language:i,grammar:l,code:n.textContent};function c(e){u.highlightedCode=e,r.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r.hooks.run("after-highlight",u),r.hooks.run("complete",u),s&&s.call(u.element)}if(r.hooks.run("before-sanity-check",u),(o=u.element.parentElement)&&"pre"===o.nodeName.toLowerCase()&&!o.hasAttribute("tabindex")&&o.setAttribute("tabindex","0"),!u.code)return r.hooks.run("complete",u),void(s&&s.call(u.element));if(r.hooks.run("before-highlight",u),u.grammar)if(t&&e.Worker){var g=new Worker(r.filename);g.onmessage=function(e){c(e.data)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else c(r.highlight(u.code,u.grammar,u.language));else c(r.util.encode(u.code))},highlight:function(e,a,n){var t={code:e,grammar:a,language:n};return r.hooks.run("before-tokenize",t),t.tokens=r.tokenize(t.code,t.grammar),r.hooks.run("after-tokenize",t),s.stringify(r.util.encode(t.tokens),t.language)},tokenize:function(e,a){var n=a.rest;if(n){for(var t in n)a[t]=n[t];delete a.rest}var c=new l;return o(c,c.head,e),function e(a,n,t,l,c,g){for(var d in t)if(t.hasOwnProperty(d)&&t[d]){var p=t[d];p=Array.isArray(p)?p:[p];for(var f=0;f<p.length;++f){if(g&&g.cause==d+","+f)return;var h=p[f],m=h.inside,b=!!h.lookbehind,v=!!h.greedy,y=h.alias;if(v&&!h.pattern.global){var k=h.pattern.toString().match(/[imsuy]*$/)[0];h.pattern=RegExp(h.pattern.source,k+"g")}for(var F=h.pattern||h,x=l.next,w=c;x!==n.tail&&!(g&&w>=g.reach);w+=x.value.length,x=x.next){var A=x.value;if(n.length>a.length)return;if(!(A instanceof s)){var $,_=1;if(v){if(!($=i(F,w,a,b)))break;var S=$.index,j=$.index+$[0].length,E=w;for(E+=x.value.length;E<=S;)E+=(x=x.next).value.length;if(w=E-=x.value.length,x.value instanceof s)continue;for(var C=x;C!==n.tail&&(E<j||"string"==typeof C.value);C=C.next)_++,E+=C.value.length;_--,A=a.slice(w,E),$.index-=w}else if(!($=i(F,0,A,b)))continue;S=$.index;var z=$[0],O=A.slice(0,S),P=A.slice(S+z.length),N=w+A.length;g&&N>g.reach&&(g.reach=N);var T=x.prev;if(O&&(T=o(n,T,O),w+=O.length),u(n,T,_),x=o(n,T,new s(d,m?r.tokenize(z,m):z,y,z)),P&&o(n,x,P),1<_){var D={cause:d+","+f,reach:N};e(a,n,t,x.prev,w,D),g&&D.reach>g.reach&&(g.reach=D.reach)}}}}}}(e,c,a,c.head,0),function(e){for(var a=[],n=e.head.next;n!==e.tail;)a.push(n.value),n=n.next;return a}(c)},hooks:{all:{},add:function(e,a){var n=r.hooks.all;n[e]=n[e]||[],n[e].push(a)},run:function(e,a){var n=r.hooks.all[e];if(n&&n.length)for(var t,s=0;t=n[s++];)t(a)}},Token:s};function s(e,a,n,t){this.type=e,this.content=a,this.alias=n,this.length=0|(t||"").length}function i(e,a,n,t){e.lastIndex=a;var r=e.exec(n);if(r&&t&&r[1]){var s=r[1].length;r.index+=s,r[0]=r[0].slice(s)}return r}function l(){var e={value:null,prev:null,next:null},a={value:null,prev:e,next:null};e.next=a,this.head=e,this.tail=a,this.length=0}function o(e,a,n){var t=a.next,r={value:n,prev:a,next:t};return a.next=r,t.prev=r,e.length++,r}function u(e,a,n){for(var t=a.next,r=0;r<n&&t!==e.tail;r++)t=t.next;(a.next=t).prev=a,e.length-=r}if(e.Prism=r,s.stringify=function e(a,n){if("string"==typeof a)return a;if(Array.isArray(a)){var t="";return a.forEach((function(a){t+=e(a,n)})),t}var s={type:a.type,content:e(a.content,n),tag:"span",classes:["token",a.type],attributes:{},language:n},i=a.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(s.classes,i):s.classes.push(i)),r.hooks.run("wrap",s);var l="";for(var o in s.attributes)l+=" "+o+'="'+(s.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'"'+l+">"+s.content+"</"+s.tag+">"},!e.document)return e.addEventListener&&(r.disableWorkerMessageHandler||e.addEventListener("message",(function(a){var n=JSON.parse(a.data),t=n.language,s=n.code,i=n.immediateClose;e.postMessage(r.highlight(s,r.languages[t],t)),i&&e.close()}),!1)),r;var c=r.util.currentScript();function g(){r.manual||r.highlightAll()}if(c&&(r.filename=c.src,c.hasAttribute("data-manual")&&(r.manual=!0)),!r.manual){var d=document.readyState;"loading"===d||"interactive"===d&&c&&c.defer?document.addEventListener("DOMContentLoaded",g):window.requestAnimationFrame?window.requestAnimationFrame(g):window.setTimeout(g,16)}return r}("undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{});e.exports&&(e.exports=t),void 0!==n.g&&(n.g.Prism=t),t.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/,name:/[^\s<>'"]+/}},cdata:/<!\[CDATA\[[\s\S]*?\]\]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",(function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))})),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(e,a){var n={};n["language-"+a]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[a]},n.cdata=/^<!\[CDATA\[|\]\]>$/i;var r={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:n}};r["language-"+a]={pattern:/[\s\S]+/,inside:t.languages[a]};var s={};s[e]={pattern:RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,(function(){return e})),"i"),lookbehind:!0,greedy:!0,inside:r},t.languages.insertBefore("markup","cdata",s)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(e,a){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp("(^|[\"'\\s])(?:"+e+")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))","i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[a,"language-"+a],inside:t.languages[a]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,function(e){var a=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+a.source+"|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+a.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+a.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:a,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var n=e.languages.markup;n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))}(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)","javascript")),t.languages.js=t.languages.javascript,t.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:true|false)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},t.languages.webmanifest=t.languages.json}}]);