<template><div><h1 id="强制类型转换" tabindex="-1"><a class="header-anchor" href="#强制类型转换"><span>强制类型转换</span></a></h1>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>理解JavaScript的强制类型转换是非常有用的。</p>
<p>本章旨在全面介绍强制类型转换的优缺点，让你能够在开发中合理地运用它。</p>
</div>
<h2 id="值类型转换" tabindex="-1"><a class="header-anchor" href="#值类型转换"><span>值类型转换</span></a></h2>
<p>JavaScript的类型转换分为：</p>
<ul>
<li>显式强制类型转换</li>
<li>隐式强制类型转换</li>
</ul>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> num <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> str <span class="token operator">=</span> num <span class="token operator">+</span> <span class="token string">''</span><span class="token punctuation">;</span> <span class="token comment">// 隐式强制类型转换</span>
<span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token function">String</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 隐式强制类型转换</span>
</code></pre></div><h2 id="字符串、数字和布尔值之间的类型转换规则" tabindex="-1"><a class="header-anchor" href="#字符串、数字和布尔值之间的类型转换规则"><span>字符串、数字和布尔值之间的类型转换规则</span></a></h2>
<blockquote>
<p>ES5 规范第 9 节中定义了一些“抽象操作”(即“仅供内部使用的操作”)和转换规则。</p>
<p>本节着重介绍 ToString、ToNumber 和 ToBoolean，附带讲一讲 ToPrimitive。</p>
</blockquote>
<h3 id="tostring" tabindex="-1"><a class="header-anchor" href="#tostring"><span>ToString</span></a></h3>
<p>抽象操作 ToString 负责处理非字符串到字符串的强制类型转换。</p>
<p>转换规则：</p>
<ul>
<li><code v-pre>null =&gt; 'null'</code></li>
<li><code v-pre>undefined =&gt; 'undefined'</code></li>
<li><code v-pre>true =&gt; 'true'</code></li>
<li><code v-pre>42 =&gt; '42'</code>，极大极小的值会使用指数形式，比如<code v-pre>1.07 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 * 1000 =&gt; 1.07e21</code></li>
<li>普通对象的toString函数(<code v-pre>Object.prototype.toString</code>)返回内部属性 [[Class]] 的值，比如<code v-pre>[object Object]</code></li>
<li>数组的默认 toString() 方法经过了重新定义，<code v-pre>[1,2,3] =&gt; '1,2,3'</code></li>
</ul>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// null 和 undefined 原型链上没有 toString 方法</span>
<span class="token comment">// null => 'null'</span>
<span class="token comment">// undefined => 'undefined'</span>
<span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 'false'</span>
<span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '42'</span>
<span class="token punctuation">(</span><span class="token number">1.07</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1.07e21</span>
<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '[object Object]'</span>
<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '1,2,3'</span>
</code></pre></div><h3 id="tonumber" tabindex="-1"><a class="header-anchor" href="#tonumber"><span>ToNumber</span></a></h3>
<p><code v-pre>抽象操作 ToNumber</code> 可以将非数字值转为数字使用。</p>
<p>转换规则：</p>
<ul>
<li>
<p><code v-pre>true =&gt; 1, false =&gt; 0</code></p>
</li>
<li>
<p><code v-pre>undefined =&gt; NaN</code></p>
</li>
<li>
<p><code v-pre>null =&gt; 0</code></p>
</li>
<li>
<p>字符串的处理基本遵循数字字面量的相关规则，失败时返回 NaN。<code v-pre>'42' =&gt; 42, 'str' =&gt; NaN</code></p>
</li>
<li>
<p>对象</p>
<ol>
<li>
<p>检查该值是否有 valueOf() 方法。</p>
</li>
<li>
<p>如果有并且返回基本类型值，就使用该值进行强制类型转换。</p>
</li>
<li>
<p>如果没有就使用 toString()的返回值(如果存在)来进行强制类型转换。</p>
</li>
<li>
<p>如果 valueOf() 和 toString() 均不返回基本类型值，会产生 TypeError 错误。</p>
</li>
</ol>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">"42"</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token string">"42"</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
c<span class="token punctuation">.</span><span class="token function-variable function">toString</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span> <span class="token string">""</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "42"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">Number</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
<span class="token function">Number</span><span class="token punctuation">(</span> b <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
<span class="token function">Number</span><span class="token punctuation">(</span> c <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>
<span class="token function">Number</span><span class="token punctuation">(</span> <span class="token string">""</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token function">Number</span><span class="token punctuation">(</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0</span>
<span class="token function">Number</span><span class="token punctuation">(</span> <span class="token punctuation">[</span> <span class="token string">"abc"</span> <span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// NaN</span>
</code></pre></div></li>
</ul>
<h3 id="toboolean" tabindex="-1"><a class="header-anchor" href="#toboolean"><span>ToBoolean</span></a></h3>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>关于布尔值的类型转换存在很多误解，需要特别注意。</p>
</div>
<p>首先也是最重要的一点是，在JavaScript中，有两个关键字<code v-pre>true</code>和<code v-pre>false</code>，分别代表真和假。</p>
<p>有些语言中可能有数值 1 和 0 分别等同于 true 和 false。</p>
<p>在 JavaScript 中布尔值和数字是不一样的，虽然有强制类型转换<code v-pre>true &lt;=&gt; 1</code>、<code v-pre>false &lt;=&gt; 0</code>，但是它们不是一回事。</p>
<h4 id="假值" tabindex="-1"><a class="header-anchor" href="#假值"><span>假值</span></a></h4>
<p>以下这些是假值:</p>
<ul>
<li>undefined</li>
<li>null</li>
<li>false</li>
<li>+0、-0 和 NaN</li>
<li>&quot;&quot;</li>
</ul>
<p><strong>可以认为假值列表以外的值都是真值。</strong></p>
<h3 id="json-字符串化" tabindex="-1"><a class="header-anchor" href="#json-字符串化"><span>JSON 字符串化</span></a></h3>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>JSON 字符串化并非严格意义上的强制类型转换，但是其中涉及 <code v-pre>ToString</code>的相关规则。</p>
</div>
<p>对大多数简单值来说，JSON 字符串化和 toString() 的效果基本相同，只不过序列化的结果总是字符串:</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> <span class="token number">42</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "42"</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> <span class="token string">'42'</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '42"'(含有双引号的字符串)</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "null"</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> <span class="token boolean">true</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "true"</span>
</code></pre></div><h4 id="json安全-json-safe" tabindex="-1"><a class="header-anchor" href="#json安全-json-safe"><span>JSON安全（JSON-safe）</span></a></h4>
<p>安全的 JSON 值是指能够呈现为有效 JSON 格式的值。</p>
<p>以下值不符合 JSON 结构标准，支持 JSON 的语言无法处理它们：</p>
<ul>
<li>undefined</li>
<li>function</li>
<li>symbol</li>
<li>包含循环引用的对象</li>
</ul>
<p>JSON.stringify 在对象中遇到 <code v-pre>undefined、function 、symbol</code> 时会自动将其忽略，在数组中则会返回 <code v-pre>null</code> (以保证单元位置不变)。</p>
<p>对包含循环引用的对象执行 JSON.stringify 会出错。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 注意这两个是忽略，然后返回的是undefined，不是undefined字符串</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> <span class="token keyword">undefined</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>
  <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token keyword">undefined</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '[1,null, null,4]'</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token function-variable function">b</span><span class="token operator">:</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '{"a":2}'</span>
</code></pre></div><h4 id="tojson方法" tabindex="-1"><a class="header-anchor" href="#tojson方法"><span>toJSON方法</span></a></h4>
<p>如果要对含有非法 JSON 值的对象做字符串化，或者有某些值无法被序列化时，就需要定义 toJSON 来<strong>返回一个安全的 JSON 值</strong>。</p>
<p>如果对象中定义了 toJSON 方法，JSON 字符串化时会首先调用该方法，然后<strong>用它的返回值来进行序列化</strong>。</p>
<p>也就是说，toJSON 应该“返回一个能够被字符串化的安全的 JSON 值”，而不是“返回一个 JSON 字符串”。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 正确，对数组进行JSON化</span>
  <span class="token function">toJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>val<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 错误，对toJSON 返回的字符串做字符串化，而非数组本身</span>
  <span class="token function-variable function">toJSON</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"["</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>val<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span><span class="token string">"]"</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "[2,3]"</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> b <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ""[2,3]""</span>
</code></pre></div><h4 id="replacer参数" tabindex="-1"><a class="header-anchor" href="#replacer参数"><span>replacer参数</span></a></h4>
<p><code v-pre>replacer</code>参数可以是字符串数组或者函数，用来指定对象序列化过程中哪些属性应该被处理。</p>
<p>如果 replacer 是一个数组，其中包含序列化要处理的对象的属性名称，除此之外其他的属性则被忽略。</p>
<p>如果 replacer 是一个函数，它会对对象本身调用一次，然后对对象中的每个属性各调用一次，每次传递两个参数，键和值。如果要忽略某个键就返回 undefined，否则返回指定的值。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token string">"42"</span><span class="token punctuation">,</span>
  <span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> a<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"b"</span><span class="token punctuation">,</span><span class="token string">"c"</span><span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "{"b":42,"c":"42"}"</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> a<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">key<span class="token punctuation">,</span>value</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">!==</span> <span class="token string">"c"</span><span class="token punctuation">)</span> <span class="token keyword">return</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "{"b":42,"d":[1,2,3]}"</span>
</code></pre></div><h4 id="space参数-不常用" tabindex="-1"><a class="header-anchor" href="#space参数-不常用"><span>space参数（不常用）</span></a></h4>
<p>space用来指定输出的缩进格式。</p>
<p>space 为正整数时是指定每一级缩进的字符数，它还可以是字符串，此时最前面的十个字符被用于每一级的缩进。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
<span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token string">"42"</span><span class="token punctuation">,</span>
<span class="token literal-property property">d</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> a<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> a<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">'-'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// "{</span>
<span class="token comment">// -"b": 42,</span>
<span class="token comment">// -"c": "42",</span>
<span class="token comment">// -"d": [</span>
<span class="token comment">// --1,</span>
<span class="token comment">// --2</span>
<span class="token comment">// -]</span>
<span class="token comment">// }"</span>
</code></pre></div><h4 id="json小结" tabindex="-1"><a class="header-anchor" href="#json小结"><span>JSON小结</span></a></h4>
<p>请记住，JSON.stringify 并不是强制类型转换。在这里介绍是因为它涉及 ToString 强制类型转换，具体表现在以下两点。</p>
<ol>
<li>字符串、数字、布尔值和 null 的 JSON.stringify 规则与 ToString 基本相同。</li>
<li>如果传递给 JSON.stringify 的对象中定义了 toJSON 方法，那么该方法会在字符串化前调用，以便将对象转换为安全的 JSON 值。</li>
</ol>
<h2 id="显式强制类型转换" tabindex="-1"><a class="header-anchor" href="#显式强制类型转换"><span>显式强制类型转换</span></a></h2>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>对显式强制类型转换几乎不存在非议，它类似于静态语言中的类型转换，已被广泛接受， 不会有什么坑。</p>
</div>
<p>我们的目的是让代码更清晰、更易懂，而非适得其反。</p>
<p><strong>在使用显式强制类型转换时，建议使用<code v-pre>String()</code>、<code v-pre>Number（）</code>、<code v-pre>Boolean()</code>，这种形式最为明显，易于理解。</strong></p>
<h3 id="string-与-number-的显式转换" tabindex="-1"><a class="header-anchor" href="#string-与-number-的显式转换"><span>String 与 Number 的显式转换</span></a></h3>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span> <span class="token comment">// '42'</span>
<span class="token punctuation">(</span><span class="token number">42</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// '42'</span>

<span class="token function">Number</span><span class="token punctuation">(</span><span class="token string">'3.14'</span><span class="token punctuation">)</span> <span class="token comment">// 3.14</span>
<span class="token operator">+</span><span class="token string">'3.14'</span> <span class="token comment">// 3.14</span>
</code></pre></div><div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>书中介绍了<code v-pre>～</code>、<code v-pre>～～</code>、<code v-pre>|</code>等运算符，但是晦涩难懂，这里暂不记录。</p>
</div>
<h4 id="parseint-解析数字字符串" tabindex="-1"><a class="header-anchor" href="#parseint-解析数字字符串"><span><code v-pre>parseInt</code> 解析数字字符串</span></a></h4>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>书中介绍了parseInt的一些功能，需要深入理解其中的工作原理才能用好，否则会有很多“坑”。</p>
<p>这里暂不记录。</p>
</div>
<h3 id="显式转换为布尔值" tabindex="-1"><a class="header-anchor" href="#显式转换为布尔值"><span>显式转换为布尔值</span></a></h3>
<p>建议使用 <code v-pre>Boolean(a)</code> 和<code v-pre> !!a</code> 来进行显式强制类型转换。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">Boolean</span><span class="token punctuation">(</span> <span class="token string">'0'</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token function">Boolean</span><span class="token punctuation">(</span> <span class="token string">''</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span> <span class="token number">0</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span> <span class="token keyword">null</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
<span class="token function">Boolean</span><span class="token punctuation">(</span> <span class="token keyword">undefined</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre></div><p>双重取反：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token operator">!</span><span class="token operator">!</span><span class="token string">'0'</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token operator">!</span><span class="token operator">!</span><span class="token string">''</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre></div><h2 id="隐式强制类型转换" tabindex="-1"><a class="header-anchor" href="#隐式强制类型转换"><span>隐式强制类型转换</span></a></h2>
<p>对强制类型转换的诟病大多是针对隐式强制类型转换。</p>
<p>隐式强制类型转换的作用是减少冗余，让代码更简洁。但也会带来一些负面影响，有时甚至是弊大于利。</p>
<p>个人推荐还是使用显示类型转换，隐式类型转换不详细介绍。</p>
<p>以下简单记录隐式强制类型转换的例子：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token number">42</span> <span class="token operator">+</span> <span class="token string">''</span><span class="token punctuation">;</span> <span class="token comment">// '42'</span>
<span class="token string">'42'</span> <span class="token operator">-</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 42</span>

<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"foo"</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>a <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>b <span class="token operator">||</span> c<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"yep"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">String</span><span class="token punctuation">(</span> <span class="token function">Symbol</span><span class="token punctuation">(</span> <span class="token string">"cool"</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// "Symbol(cool)"</span>
<span class="token function">Symbol</span><span class="token punctuation">(</span> <span class="token string">"not cool"</span> <span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">""</span><span class="token punctuation">;</span>      <span class="token comment">// TypeError</span>
</code></pre></div><h2 id="宽松相等-和严格相等" tabindex="-1"><a class="header-anchor" href="#宽松相等-和严格相等"><span>宽松相等（==）和严格相等（===）</span></a></h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>书中详细介绍了ES5 规范中<code v-pre>==</code>具体判断过程的细节，这里暂不记录。</p>
<p>建议全部使用<code v-pre>===</code></p>
</div>
<p>常见的误区是：== 检查值是否相等，=== 检查值和类型是否相等。</p>
<p>听起来蛮有道理，然而还不够准确。</p>
<p>== 和 === 都会检查操作数的类型。区别在于操作数类型不同时它们的处理方式不同。</p>
<p>正确的解释是：<strong>== 允许在相等比较中进行强制类型转换，而 === 不允许。</strong></p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<ul>
<li>
<p>JavaScript 的数据类型之间的转换包括 <strong>显式强制类型转换</strong> 和 <strong>隐式强制类型转换</strong>。</p>
</li>
<li>
<p>强制类型转换常常为人诟病，但实际上很多时候它们是非常有用的。</p>
</li>
<li>
<p>显式强制类型转换明确告诉我们哪里发生了类型转换，有助于提高代码可读性和可维护性。</p>
</li>
<li>
<p>隐式强制类型转换则没有那么明显，是其他操作的副作用。</p>
</li>
<li>
<p>在处理强制类型转换的时候要十分小心，尤其是隐式强制类型转换。</p>
</li>
</ul>
</div></template>


