import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as r,c as o,b as t,d as e,e as c,a}from"./app-BPFsuHku.js";const d={},s=a(`<h1 id="atom" tabindex="-1"><a class="header-anchor" href="#atom"><span>Atom</span></a></h1><p>在 JavaScript 中，Atom 级的元素有以下几种：</p><ul><li>直接量 Literal</li><li>变量 Variable</li><li>关键字 Keywords</li><li>空格 Whitespace</li><li>换行符 Line Terminator</li></ul><h2 id="types" tabindex="-1"><a class="header-anchor" href="#types"><span>Types</span></a></h2><p>JavaScript 的类型包含以下几种：</p><ul><li>Number</li><li>String</li><li>Boolean</li><li>Null</li><li>Undefined</li><li>Symbol</li><li>BigInt</li><li>Object</li></ul><h3 id="number" tabindex="-1"><a class="header-anchor" href="#number"><span>Number</span></a></h3><p>Number 的语法：</p><ul><li>十进制 DecimalLiteral：0, 0.1,1e3</li><li>二进制 BinaryIntegerLiteral：0b111</li><li>八进制 OctalIntegerLiteral：0o10</li><li>十六进制 HexIntegerLiteral：0xff</li></ul><p>在运行时，JavaScript 采用 IEEE 754 标准存储一个 Number。Number 是一个双精度浮点数，它由以下几个部分组成：</p><div class="language-text" data-ext="text" data-title="text"><pre class="language-text"><code>1  个符号位
11 个指数位
52 个精度位
</code></pre></div><h3 id="string" tabindex="-1"><a class="header-anchor" href="#string"><span>String</span></a></h3><p>String 的语法：</p><ul><li>单引号：<code>&#39;abc&#39;</code></li><li>双引号：<code>&quot;abc&quot;</code></li><li>反引号模板字符串</li></ul><p>常见的字符集是 ascii unicode，常见的编码方式有 utf-8、utf-16。字符集的码点 ( code point ) 对应一个个字符，编码方式表示字符在内存中的保存方式。</p><h3 id="boolean" tabindex="-1"><a class="header-anchor" href="#boolean"><span>Boolean</span></a></h3><p>有 true 和 false 两种值。</p><h3 id="null" tabindex="-1"><a class="header-anchor" href="#null"><span>Null</span></a></h3><p>值得注意的是 <code>typeof null === &#39;object&#39;</code>， 这是一个设计缺陷且不会被修复。</p><h3 id="undefined" tabindex="-1"><a class="header-anchor" href="#undefined"><span>Undefined</span></a></h3><p>undefined 表示声明但未被定义的值，而且它不是关键字，而是一个全局变量，这是另一个设计缺陷。</p><p>最简洁的得到 undefined 的值的方法：<code>void 0</code>，void 运算符不管后面跟什么，都返回 undefined。</p><h3 id="symbol" tabindex="-1"><a class="header-anchor" href="#symbol"><span>Symbol</span></a></h3><p><code>Symbol()</code> 返回一个唯一值，symbol 通常用作对象属性的 key，用于控制对属性的访问。</p><h3 id="object" tabindex="-1"><a class="header-anchor" href="#object"><span>Object</span></a></h3><p>对象是属性的集合，JavaScript 的对象由两部分组成：</p><ul><li>property</li><li>[[prototype]]</li></ul><p>property 是一个 key-value 对，其中 key 可以是 string 或 symbol。</p><p>property 有两种：数据属性、访问器属性。</p><table><thead><tr><th style="text-align:center;">Attribute Name</th><th style="text-align:center;">Types</th><th style="text-align:center;">Default Value</th></tr></thead><tbody><tr><td style="text-align:center;">[[value]]</td><td style="text-align:center;">data property</td><td style="text-align:center;">undefined</td></tr><tr><td style="text-align:center;">[[writable]]</td><td style="text-align:center;">data property</td><td style="text-align:center;">false</td></tr><tr><td style="text-align:center;">[[enumable]]</td><td style="text-align:center;">data property or accessor property</td><td style="text-align:center;">false</td></tr><tr><td style="text-align:center;">[[configurable]]</td><td style="text-align:center;">data property or accessor property</td><td style="text-align:center;">false</td></tr><tr><td style="text-align:center;">[[Get]]</td><td style="text-align:center;">accessor property</td><td style="text-align:center;">undefined</td></tr><tr><td style="text-align:center;">[[Set]]</td><td style="text-align:center;">accessor property</td><td style="text-align:center;">undefined</td></tr></tbody></table>`,30),p={href:"https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-property-attributes",target:"_blank",rel:"noopener noreferrer"},h=a('<p>JavaScript 中面向对象的方式有两种：基于原型的、基于类的。</p><p>基于原型的 API：<code>Object.create</code>、<code>Object.setPrototypeOf</code>、<code>Object.getPrototypeOf</code></p><p>基于类的 API：<code>new, class, extends</code></p><h4 id="function" tabindex="-1"><a class="header-anchor" href="#function"><span>Function</span></a></h4><p>function 就是拥有 [[call]] 和 [[construct]] 两种内部属性的特殊对象。[[call]] 使得函数可以被调用，[[construct]] 使得函数可以使用 new 操作符。</p><h3 id="bigint" tabindex="-1"><a class="header-anchor" href="#bigint"><span>BigInt</span></a></h3>',6);function m(u,y){const l=i("ExternalLinkIcon");return r(),o("div",null,[s,t("p",null,[e("关于 Object 的 property 参考"),t("a",p,[e("文档"),c(l)]),e("。")]),h])}const f=n(d,[["render",m],["__file","2.Atom.html.vue"]]),x=JSON.parse('{"path":"/ECMAScript/2.Atom.html","title":"Atom","lang":"zh-CN","frontmatter":{"description":"Atom 在 JavaScript 中，Atom 级的元素有以下几种： 直接量 Literal 变量 Variable 关键字 Keywords 空格 Whitespace 换行符 Line Terminator Types JavaScript 的类型包含以下几种： Number String Boolean Null Undefined Symbo...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/ECMAScript/2.Atom.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"Atom"}],["meta",{"property":"og:description","content":"Atom 在 JavaScript 中，Atom 级的元素有以下几种： 直接量 Literal 变量 Variable 关键字 Keywords 空格 Whitespace 换行符 Line Terminator Types JavaScript 的类型包含以下几种： Number String Boolean Null Undefined Symbo..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Atom\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Types","slug":"types","link":"#types","children":[{"level":3,"title":"Number","slug":"number","link":"#number","children":[]},{"level":3,"title":"String","slug":"string","link":"#string","children":[]},{"level":3,"title":"Boolean","slug":"boolean","link":"#boolean","children":[]},{"level":3,"title":"Null","slug":"null","link":"#null","children":[]},{"level":3,"title":"Undefined","slug":"undefined","link":"#undefined","children":[]},{"level":3,"title":"Symbol","slug":"symbol","link":"#symbol","children":[]},{"level":3,"title":"Object","slug":"object","link":"#object","children":[]},{"level":3,"title":"BigInt","slug":"bigint","link":"#bigint","children":[]}]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.73,"words":519},"filePathRelative":"ECMAScript/2.Atom.md","localizedDate":"2024年4月12日","autoDesc":true}');export{f as comp,x as data};