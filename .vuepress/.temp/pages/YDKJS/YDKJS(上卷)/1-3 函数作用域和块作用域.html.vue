<template><div><h1 id="函数作用域与块作用域" tabindex="-1"><a class="header-anchor" href="#函数作用域与块作用域"><span>函数作用域与块作用域</span></a></h1>
<h2 id="函数作用域" tabindex="-1"><a class="header-anchor" href="#函数作用域"><span>函数作用域</span></a></h2>
<p>正如第 2 章所说，作用域包含了一系列的“气泡”，每一个都可以作为容器，其中包含了标识符(变量、函数)的定义。</p>
<p>这些气泡互相嵌套并且整齐地排列成蜂窝型，排列的结构是在写代码时定义的。</p>
<h3 id="函数作用域的应用" tabindex="-1"><a class="header-anchor" href="#函数作用域的应用"><span>函数作用域的应用</span></a></h3>
<ul>
<li>
<p>隐藏内部实现</p>
<blockquote>
<p>最小暴露原则：在软件设计中，应该最小限度地暴露必要内容，而将其他内容都“隐藏”起来。</p>
</blockquote>
<p>根据最小暴露原则，可以用一个函数将一段代码包裹起来，从而隐藏内部实现。</p>
</li>
<li>
<p>规避命名冲突</p>
<p>隐藏”作用域中的变量和函数，可以避免同名标识符之间的冲突。</p>
<p>其他一些规避命名冲突的方法：</p>
<ul>
<li>
<p>全局命名空间</p>
<p>当加载多个第三方库时，很容易引起命名冲突。这时候可以在全局作用域中声明一个名字足够独特的变量，通常是一个对象，称作<strong>命名空间</strong>。比如<code v-pre>Vue.createComponent()</code>、<code v-pre>React.createComponent()</code>。</p>
</li>
<li>
<p>模块管理</p>
<p>运用<code v-pre>CommonJs</code>或<code v-pre>ES6 Module</code>可以很好的解决命名冲突问题。</p>
</li>
</ul>
</li>
</ul>
<h3 id="匿名、具名函数和立即执行函数表达式" tabindex="-1"><a class="header-anchor" href="#匿名、具名函数和立即执行函数表达式"><span>匿名、具名函数和立即执行函数表达式</span></a></h3>
<p>参考以下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"I waited 1 second!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>这里的回调函数就是一个匿名函数表达式，匿名函数的缺点如下：</p>
<ol>
<li>
<p>匿名函数在栈追踪中不会显示出有意义的函数名，使得调试很困难。</p>
</li>
<li>
<p>如果没有函数名，当函数需要引用自身时只能使用已经过期的 <code v-pre>arguments.callee</code> 引用。</p>
<p>比如在<strong>递归</strong>中，或者<strong>事件触发后事件监听器需要解绑自身</strong>。</p>
</li>
<li>
<p>匿名函数省略了对于代码可读性/可理解性很重要的函数名。一个描述性的名称可以让代码不言自明。</p>
</li>
</ol>
<p>所以，<strong>始终给函数表达式命名是一个最佳实践</strong>。</p>
<p><strong>立即执行函数表达式(IIFE)</strong>：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token constant">IIFE</span><span class="token punctuation">(</span> <span class="token parameter">global</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3 console.log( global.a ); // 2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span> window <span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre></div><h2 id="块作用域" tabindex="-1"><a class="header-anchor" href="#块作用域"><span>块作用域</span></a></h2>
<p>在JavaScript具有块级作用域之前，一些变量或函数声明很容易“泄漏”。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// window</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> globalVar <span class="token operator">=</span> <span class="token string">'globalVar'</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">globalFun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// var </span>
  <span class="token comment">// function</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token comment">// 10</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>globalVar<span class="token punctuation">)</span> <span class="token comment">// 'globalVar'</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>globalFun<span class="token punctuation">)</span> <span class="token comment">// function globalFun () {}</span>
</code></pre></div><p>这些“泄漏”现象不符合人们的预期，很容易引发意外。</p>
<ul>
<li>
<p>用一对花括号可以创建块级作用域</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">let</span> innerVar <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>innerVar<span class="token punctuation">)</span> <span class="token comment">// ReferenceError: innerVar is not defined</span>
</code></pre></div></li>
<li>
<p>try/catch的catch分句会创建一个块级作用域</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">undefined</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 执行一个非法操作来强制制造一个异常</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> err <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 能够正常执行! </span>
<span class="token punctuation">}</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> err <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ReferenceError: err not found</span>
</code></pre></div></li>
<li>
<p>const</p>
</li>
<li>
<p>let</p>
<ul>
<li>
<p>let与垃圾回收</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 在这里做点有趣的事情</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> bigData <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 一个大大的对象</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token function">process</span><span class="token punctuation">(</span> bigData <span class="token punctuation">)</span><span class="token punctuation">;</span>

document
  <span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span> <span class="token string">"my_button"</span> <span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span> <span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token function">click</span><span class="token punctuation">(</span><span class="token parameter">evt</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 实际上不需要访问bigData，但是可以访问到</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">/*capturingPhase=*/</span><span class="token boolean">false</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>click 函数的点击回调并不需要 bigData 变量。</p>
<p>理论上这意味着当 process 执行后，在内存中占用大量空间的数据结构就可以被垃圾回收了。但是，由于 click 函数形成了一个覆盖整个作用域的闭包，JavaScript 引擎极有可能依然保存着这个结构(取决于具体实现)。</p>
<p>因此，可以写成：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">process</span><span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在这里做点有趣的事情</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> bigData <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 一个大大的对象</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token function">process</span><span class="token punctuation">(</span> bigData <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 块作用域可以打消这种顾虑，可以让引擎清楚地知道没有必要继续保存 bigData 了</span>
<span class="token comment">// addEventListener()</span>
</code></pre></div><p><strong>为变量显式声明块作用域，并对变量进行本地绑定是非常有用的工具，可以把它添加到你的代码工具箱中了。</strong></p>
</li>
<li>
<p>let 循环</p>
<p><strong>for 循环头部的 let 不仅将 i 绑定到了 for 循环的块中，事实上它将其重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值。</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> i <span class="token punctuation">)</span><span class="token punctuation">;</span>
  btns<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0,1,2,...,9</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div></li>
</ul>
</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<ul>
<li>
<p>函数是 JavaScript 中最常见的作用域单元。</p>
</li>
<li>
<p>本质上，声明在一个函数内部的变量或函数会在所处的作用域中“隐藏”起来，这是有意为之的良好软件的设计原则。</p>
</li>
<li>
<p>函数不是唯一的作用域单元。块作用域指的是变量和函数不仅可以属于所处的作用域，也可以属于某个代码块(通常指 { .. } 内部)。</p>
</li>
<li>
<p>从 ES3 开始，try/catch 结构在 catch 分句中具有块作用域。</p>
</li>
<li>
<p>ES6 的 let / const 可将变量绑定至当前函数或块级作用域。</p>
</li>
</ul>
</div></template>


