import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as t,a as s}from"./app-BPFsuHku.js";const e={},o=s(`<h1 id="runtime" tabindex="-1"><a class="header-anchor" href="#runtime"><span>Runtime</span></a></h1><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/image-20221122224608513.png" alt="image-20221122224608513" style="zoom:50%;"><h2 id="macrotask-job" tabindex="-1"><a class="header-anchor" href="#macrotask-job"><span>MacroTask ( Job )</span></a></h2><p>事件循环概念来自于 Node，它是一个队列，不停地接受任务入队以及出队，出队的任务会被传递给 JavaScript 引擎，这是一个宏任务。</p><p>可见，事件循环是存在于在 JavaScript 引擎之外的，ECMAScript 的标准文档中并没有关于事件循环的内容。</p><p>对于 JavaScript 引擎来说，宏任务称为 Job。</p><h2 id="execution-context" tabindex="-1"><a class="header-anchor" href="#execution-context"><span>Execution Context</span></a></h2><p>执行上下文是对 JavaScript 代码执行环境的抽象，执行上下文有三种：</p><ul><li>全局执行上下文 ( Global Execution Context )：执行全局代码时创建</li><li>函数执行上下文 ( Functional Execution Context )：执行函数时创建</li><li>eval 执行上下文 ( Eval Execution Context )：用 eval 函数执行一段代码时创建</li></ul><p>JavaScript 的整个执行过程都用一个执行上下文栈 ( execution context stack ) 维护。</p><p>执行上下文有 8 个字段，通常一个执行上下文不会同时包含这 8 个字段。</p><table><thead><tr><th style="text-align:center;">Component</th><th style="text-align:center;">Purpose</th></tr></thead><tbody><tr><td style="text-align:center;">code evaluation state</td><td style="text-align:center;">执行、挂起和恢复与此执行上下文相关的代码求值所需的任何状态。主要用于 async 和 generator 函数，记录代码执行的位置</td></tr><tr><td style="text-align:center;">Function</td><td style="text-align:center;">执行函数而创建执行上下文时，值为该函数对象，如果是 Script 或 Module 而创建上下文时，该值为 null</td></tr><tr><td style="text-align:center;">Realm</td><td style="text-align:center;">ECMAScript 标准的全部内置对象</td></tr><tr><td style="text-align:center;">Script Or Module</td><td style="text-align:center;">执行 Script 代码或 Module 代码时的上下文</td></tr><tr><td style="text-align:center;">LexicalEnvironment</td><td style="text-align:center;">词法环境，主要用于记录查找变量以及 this 等值</td></tr><tr><td style="text-align:center;">VariableEnvironment</td><td style="text-align:center;">用于 var 声明语句</td></tr><tr><td style="text-align:center;">PrivateEnvironment</td><td style="text-align:center;">用于 class 的私有变量</td></tr><tr><td style="text-align:center;">Generator</td><td style="text-align:center;">用于 Generator 函数执行</td></tr></tbody></table><h3 id="创建执行上下文的过程" tabindex="-1"><a class="header-anchor" href="#创建执行上下文的过程"><span>创建执行上下文的过程</span></a></h3><p>执行上下文的创建可以分为：</p><ul><li>创建阶段 ( creation phase )</li><li>执行阶段 ( execution phase )</li></ul><p>创建阶段：</p><ul><li><p>创建全局对象 global object 和 Realm 对象</p></li><li><p>绑定 this ( resolveThisBinding )</p><ul><li>全局执行上下文中，this 指向全局对象；函数执行上下文中，this 的值取决于函数的调用方式。</li><li>resolveThisBinding 的返回值是一个 normal 类型或 throw 类型的 Completion Record。</li></ul></li><li><p>创建 Lexical Environment</p></li><li><p>创建 Variable Environment</p></li></ul><p>执行阶段：</p><p>一行一行执行 JavaScript 代码，如果有函数调用，则创建一个新的函数执行上下文并入栈。</p><h2 id="realm" tabindex="-1"><a class="header-anchor" href="#realm"><span>Realm</span></a></h2><p>浏览器的 window 对象中，包含了宿主环境提供的各种 API，以及 ECMAScript 标注的各种内置对象，比如 <code>Object, Array</code> 等，这些内置对象就来自于 Realm。</p><p>此外，JS 中创建对象的原型也来自 Realm，比如两个 iframe 中创建的对象的原型 ( <code>Object.prototype</code> ) 是不同的。</p><h2 id="lexicalenvironment" tabindex="-1"><a class="header-anchor" href="#lexicalenvironment"><span>LexicalEnvironment</span></a></h2><p>Lexical Environment 是一个 Environment Record 链，运行时的变量都是在 Lexical Environment 中查找的。</p><h3 id="environment-record" tabindex="-1"><a class="header-anchor" href="#environment-record"><span>Environment Record</span></a></h3><p>Environment Record 是一个基类，它的派生关系如下图：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/环境记录类型.svg" style="zoom:80%;"><p>它们可能存在的字段如下图：</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/环境记录-值.svg" alt=""></p><p>以 Function Environment Record 为例，它的数据结构如下：</p><table><thead><tr><th>Field Name</th><th>Meaning</th></tr></thead><tbody><tr><td>[[ThisValue]]</td><td>函数调用的 this 值</td></tr><tr><td>[[ThisBindingStatus]]</td><td>函数为箭头函数时，此值为 lexical</td></tr><tr><td>[[FunctionObject]]</td><td>函数对象本身</td></tr><tr><td>[[NewTarget]]</td><td>用 new 调用函数时，此值为 [[Construct]] 的 newTarget 参数，否则为 undefined</td></tr></tbody></table><h2 id="宏任务例子" tabindex="-1"><a class="header-anchor" href="#宏任务例子"><span>宏任务例子</span></a></h2><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>foo 函数执行前的状态：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwddeo24scj31kx0u0gnv.jpg" style="zoom:33%;"><p>执行 foo 函数时，会创建 foo 函数的执行上下文并入栈，然后 setTimeout 会将 foo 函数封装成一个宏任务并入队：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwdderrgk5j31rg0tego8.jpg" style="zoom:33%;"><p>foo 函数执行结束后，当前的宏任务也就结束了，调用栈也会被清空。</p><p>一个宏任务结束后，继续执行队列中的其他任务，直到某一刻轮到 setTimeout 函数创建的宏任务：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwddeoeomyj31rg0tl40p.jpg" style="zoom:33%;"><p>最后，foo 函数再次被执行。这个过程会一直循环下去，但由于每次宏任务都使 “foo 函数执行上下文” 出栈，因此不会栈溢出。</p><h2 id="微任务例子" tabindex="-1"><a class="header-anchor" href="#微任务例子"><span>微任务例子</span></a></h2><p><strong>微任务会在当前宏任务快要结束时执行</strong>。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;foo&#39;</span><span class="token punctuation">)</span>
  Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  	<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;micro-foo&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;macro-foo&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;bar&#39;</span><span class="token punctuation">)</span>
  Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  	<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;micro-bar&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;macro-bar&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;global&#39;</span><span class="token punctuation">)</span>
Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;micro-global&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;macro-global&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre></div><p>执行结果：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code>foo
bar
global
micro<span class="token operator">-</span>foo
micro<span class="token operator">-</span>bar
micro<span class="token operator">-</span>global
macro<span class="token operator">-</span>foo
macro<span class="token operator">-</span>bar
macro<span class="token operator">-</span>global
</code></pre></div><p>初始状态下，调用栈中包含全局执行上下文，微任务队列为空：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwddera1zvj31mj0u00wl.jpg" style="zoom:33%;"><p>调用 foo 函数，会创建微任务 micro-foo 和 宏任务 macro-foo，微任务进入微任务队列，宏任务进入事件循环队列。</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwddepub29j31l90u0q76.jpg" style="zoom:33%;"><p>foo 函数调用 bar 函数，bar 函数中创建了微任务 micro-bar 和 宏任务 macro-bar。</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwddeqepfdj31ks0u0n1m.jpg" style="zoom:33%;"><p>接下来，bar 函数执行完毕退出，bar 函数的执行上下文出栈，紧接着 foo 函数也结束，foo 函数的上下文也出栈。</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwddeqz73qj31nf0u0gps.jpg" style="zoom:33%;"><p>foo 函数执行完毕后，会执行全局环境的代码，这里会创建微任务 micro-global 和 宏任务 macro-global。</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwddeoyh4sj31ny0u00x7.jpg" style="zoom:33%;"><p>然后重点来了，此时需要销毁全局执行上下文，在销毁之前，需要依次执行微任务队列中的任务，即 micro-foo、micro-bar、micro-global。</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/008i3skNgy1gwddes9rngj31o00u0dkp.jpg" style="zoom:33%;"><p>微任务队列清空后，当前宏任务也要结束了，然后依次执行宏任务 macro-foo、macro-bar、macro-global。</p><h3 id="微任务中触发微任务" tabindex="-1"><a class="header-anchor" href="#微任务中触发微任务"><span>微任务中触发微任务</span></a></h3><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>这段代码中，foo 函数会创建微任务 foo，每次 foo 函数执行完之前会执行微任务，又会继续创建微任务。如此循环，当前宏任务便无法退出，意味着其他宏任务无法执行，比如鼠标、键盘事件，页面无法响应事件。</p><h2 id="lexicalenvironment-例子" tabindex="-1"><a class="header-anchor" href="#lexicalenvironment-例子"><span>LexicalEnvironment 例子</span></a></h2><p>观察以下这段代码。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span>

<span class="token keyword">const</span> <span class="token function-variable function">func1</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">2</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">3</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> func2 <span class="token operator">=</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token function">func2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>这段代码执行到 func2 时的执行上下文相关信息如下图：</p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/执行上下文.svg" style="zoom:80%;">`,67),p=[o];function c(i,l){return a(),t("div",null,p)}const k=n(e,[["render",c],["__file","7.Runtime.html.vue"]]),d=JSON.parse('{"path":"/ECMAScript/7.Runtime.html","title":"Runtime","lang":"zh-CN","frontmatter":{"description":"Runtime image-20221122224608513 MacroTask ( Job ) 事件循环概念来自于 Node，它是一个队列，不停地接受任务入队以及出队，出队的任务会被传递给 JavaScript 引擎，这是一个宏任务。 可见，事件循环是存在于在 JavaScript 引擎之外的，ECMAScript 的标准文档中并没有关于事件循环的...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/ECMAScript/7.Runtime.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"Runtime"}],["meta",{"property":"og:description","content":"Runtime image-20221122224608513 MacroTask ( Job ) 事件循环概念来自于 Node，它是一个队列，不停地接受任务入队以及出队，出队的任务会被传递给 JavaScript 引擎，这是一个宏任务。 可见，事件循环是存在于在 JavaScript 引擎之外的，ECMAScript 的标准文档中并没有关于事件循环的..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/%E7%8E%AF%E5%A2%83%E8%AE%B0%E5%BD%95-%E5%80%BC.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Runtime\\",\\"image\\":[\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/%E7%8E%AF%E5%A2%83%E8%AE%B0%E5%BD%95-%E5%80%BC.svg\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"MacroTask ( Job )","slug":"macrotask-job","link":"#macrotask-job","children":[]},{"level":2,"title":"Execution Context","slug":"execution-context","link":"#execution-context","children":[{"level":3,"title":"创建执行上下文的过程","slug":"创建执行上下文的过程","link":"#创建执行上下文的过程","children":[]}]},{"level":2,"title":"Realm","slug":"realm","link":"#realm","children":[]},{"level":2,"title":"LexicalEnvironment","slug":"lexicalenvironment","link":"#lexicalenvironment","children":[{"level":3,"title":"Environment Record","slug":"environment-record","link":"#environment-record","children":[]}]},{"level":2,"title":"宏任务例子","slug":"宏任务例子","link":"#宏任务例子","children":[]},{"level":2,"title":"微任务例子","slug":"微任务例子","link":"#微任务例子","children":[{"level":3,"title":"微任务中触发微任务","slug":"微任务中触发微任务","link":"#微任务中触发微任务","children":[]}]},{"level":2,"title":"LexicalEnvironment 例子","slug":"lexicalenvironment-例子","link":"#lexicalenvironment-例子","children":[]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":5.25,"words":1576},"filePathRelative":"ECMAScript/7.Runtime.md","localizedDate":"2024年4月12日","autoDesc":true}');export{k as comp,d as data};