import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as n,a}from"./app-BPFsuHku.js";const o={},s=a(`<h1 id="expression" tabindex="-1"><a class="header-anchor" href="#expression"><span>Expression</span></a></h1><h2 id="left-hand-side-expression" tabindex="-1"><a class="header-anchor" href="#left-hand-side-expression"><span>Left-Hand-Side Expression</span></a></h2><ul><li>Property Accessors: <code>obj.prop</code></li><li>new Operator: <code>new</code></li><li>Function Calls: <code>func()</code></li><li>Optional Chains: <code>a?.b?.c</code></li><li>...</li></ul><h2 id="right-hand-side-expression" tabindex="-1"><a class="header-anchor" href="#right-hand-side-expression"><span>Right-Hand-Side Expression</span></a></h2><ul><li>Update Expressions: <code>a++, a--, --a, ++a</code></li><li>Unary Expressions: <code>delete a.b, typeof a, +a, -a, ~a, !a, await a...</code></li><li>Exponentiation Operator: <code>3 ** 2 ** 3 === 3 ** ( 2 ** 3 )</code></li><li>Multiplicative Operators: <code>*, /, %</code></li><li>Additive Operators: <code>+, -</code></li><li>Bitwise Shift Operators: <code>&lt;&lt;, &gt;&gt;, &gt;&gt;&gt;</code></li><li>Relational Operators: <code>&lt;, &gt;, &lt;=, &gt;=, instanceof, in</code></li><li>Equality Operators: <code>==, !=, ===, !==</code></li><li>Binary Bitwise Operators: <code>&amp;, ^, |</code></li><li>Binary Logical Operators: <code>&amp;&amp;, ||</code></li><li>Conditional Operator: <code>condition ? a : b</code></li><li>Assignment Operators: <code>=</code></li><li>Comma Operator: <code>,</code></li></ul><p>值得注意的是，大部分运算符是左结合的，而 Exponentiation Operator 是右结合的。</p><h2 id="type-convertion" tabindex="-1"><a class="header-anchor" href="#type-convertion"><span>Type Convertion</span></a></h2><p>类型转换规则表：</p><table><thead><tr><th></th><th>Number</th><th>String</th><th>Boolean</th><th>Undefined</th><th>Null</th><th>Object</th><th>Symbol</th></tr></thead><tbody><tr><td>Number</td><td>X</td><td>1 =&gt; &#39;1&#39;</td><td>0 =&gt; false</td><td>X</td><td></td><td>Boxing</td><td></td></tr><tr><td>String</td><td>&#39;1&#39; =&gt; 1</td><td>X</td><td>&quot;&quot; =&gt; false</td><td></td><td></td><td>Boxing</td><td>X</td></tr><tr><td>Boolean</td><td>true =&gt;1,false =&gt; 0</td><td>true =&gt; &#39;true&#39;, false =&gt; &#39;false&#39;</td><td>X</td><td>X</td><td>X</td><td>Boxing</td><td>X</td></tr><tr><td>Undefined</td><td>NaN</td><td>&#39;Undefined&#39;</td><td>false</td><td>X</td><td>X</td><td>X</td><td>X</td></tr><tr><td>Null</td><td>0</td><td>&#39;null&#39;</td><td>false</td><td>X</td><td>X</td><td>X</td><td>X</td></tr><tr><td>Object</td><td>valueOf</td><td>valueOf, toString</td><td>true</td><td>X</td><td>X</td><td>X</td><td>X</td></tr><tr><td>Symbol</td><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>Boxing</td><td>X</td></tr></tbody></table><h3 id="boxing" tabindex="-1"><a class="header-anchor" href="#boxing"><span>boxing</span></a></h3><p>boxing 操作的规则举例：</p><table><thead><tr><th>type</th><th>value</th><th>Object</th></tr></thead><tbody><tr><td>Number</td><td>1</td><td>new Number(1)</td></tr><tr><td>String</td><td>&#39;str&#39;</td><td>new String(&#39;str&#39;)</td></tr><tr><td>Boolean</td><td>true</td><td>new Boolean(true)</td></tr><tr><td>Symbol</td><td>Symbol(&#39;text&#39;)</td><td>new Object(Symbol(&#39;text&#39;))</td></tr></tbody></table><p>Undefined 和 Null 没有 boxing 操作。</p><h3 id="unboxing" tabindex="-1"><a class="header-anchor" href="#unboxing"><span>unboxing</span></a></h3><p>unboxing 就是把一个 object 转换为基本类型。</p><p>unboxing 主要由 ToPrimitive 完成，这是一个引用内部函数。有 3 个函数可以影响 ToPrimitive 的执行结果：</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">&#39;1&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">2</span> <span class="token punctuation">}</span>
  <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>toPrimitive<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">3</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果对象内提供了 <code>Symbol.toPrimitive</code> 方法，则使用它的返回值作为 unboxing 的结果，否则根据实际情况选择 toString 或 valueOf，比如两个对象相加，则优先使用 valueOf 函数。</p>`,18),d=[s];function i(r,p){return e(),n("div",null,d)}const u=t(o,[["render",i],["__file","3.Expression.html.vue"]]),h=JSON.parse('{"path":"/ECMAScript/3.Expression.html","title":"Expression","lang":"zh-CN","frontmatter":{"description":"Expression Left-Hand-Side Expression Property Accessors: obj.prop new Operator: new Function Calls: func() Optional Chains: a?.b?.c ... Right-Hand-Side Expression Update Express...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/ECMAScript/3.Expression.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"Expression"}],["meta",{"property":"og:description","content":"Expression Left-Hand-Side Expression Property Accessors: obj.prop new Operator: new Function Calls: func() Optional Chains: a?.b?.c ... Right-Hand-Side Expression Update Express..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Expression\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Left-Hand-Side Expression","slug":"left-hand-side-expression","link":"#left-hand-side-expression","children":[]},{"level":2,"title":"Right-Hand-Side Expression","slug":"right-hand-side-expression","link":"#right-hand-side-expression","children":[]},{"level":2,"title":"Type Convertion","slug":"type-convertion","link":"#type-convertion","children":[{"level":3,"title":"boxing","slug":"boxing","link":"#boxing","children":[]},{"level":3,"title":"unboxing","slug":"unboxing","link":"#unboxing","children":[]}]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.12,"words":337},"filePathRelative":"ECMAScript/3.Expression.md","localizedDate":"2024年4月12日","autoDesc":true}');export{u as comp,h as data};