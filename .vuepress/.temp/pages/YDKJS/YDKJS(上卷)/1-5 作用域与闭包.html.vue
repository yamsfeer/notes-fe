<template><div><h1 id="作用域与闭包" tabindex="-1"><a class="header-anchor" href="#作用域与闭包"><span>作用域与闭包</span></a></h1>
<h2 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包"><span>闭包</span></a></h2>
<p><strong>当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。</strong></p>
<p>参考以下例子1：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
  <span class="token punctuation">}</span>
  <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>这里确切的说没有产生闭包，因为bar函数<strong>只是正常地根据作用域查找规则，向上查找到了变量a</strong>。</p>
<p>参考例子2:</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> bar<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> baz <span class="token operator">=</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 这就是闭包</span>
</code></pre></div><ul>
<li>
<p>可以不太严谨地认为<strong>能够记住当前作用域的函数，就是闭包</strong>。</p>
</li>
<li>
<p><strong>通常闭包效果的产生都与函数作为值被传递，然后在词法作用域之外被执行的场景相关</strong>。具体可参考例子2。</p>
</li>
<li>
<p>也有说法称被传递的函数对原词法作用域的引用叫闭包。</p>
</li>
<li>
<p>事实上，<strong>只要能够准确地意识到一个函数能访问到那些变量即可，不用太纠结是不是叫闭包</strong>。</p>
</li>
</ul>
<p>针对例子2，因为bar函数可以访问foo函数的作用域，因此，在foo函数执行完后，<strong>foo函数的作用域不会被回收</strong>。</p>
<p>以下是闭包的几个例子：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
  <span class="token punctuation">}</span>
  <span class="token function">bar</span><span class="token punctuation">(</span> baz <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 闭包</span>
<span class="token punctuation">}</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> fn<span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">baz</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> a <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  fn <span class="token operator">=</span> baz<span class="token punctuation">;</span> <span class="token comment">// 将 baz 分配给全局变量</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 被传递的函数在词法作用域外执行</span>
  <span class="token comment">// 仍可以对foo函数作用域的访问</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 闭包</span>
<span class="token punctuation">}</span>
<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">wait</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// timer函数被传递给setTimeout，timer保留对wait函数作用域的引用</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span> <span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> message <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">wait</span><span class="token punctuation">(</span> <span class="token string">"Hello, closure!"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">setupBot</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> selector</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">$</span><span class="token punctuation">(</span> selector <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span> <span class="token keyword">function</span> <span class="token function">activator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"Activating: "</span> <span class="token operator">+</span> name <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="循环与闭包" tabindex="-1"><a class="header-anchor" href="#循环与闭包"><span>循环与闭包</span></a></h3>
<p>先来看一个例子：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span> <span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> i <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> i<span class="token operator">*</span><span class="token number">1000</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>以上这段代码试图以一秒为间隔打印1-6，但事实是每次打印的结果都是6。</p>
<p>这是因为当定时器被执行时，循环早已结束，此时<code v-pre>i = 6</code>。整段代码<strong>从头到尾都只有一个i</strong>。</p>
<p>即使将setTimeout的时间定为0也是如此，因为<strong>setTimeout的任务会重新进入时间循环队列排队</strong>，任务执行时循环已结束。</p>
<p>解决方法：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">j</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span> <span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> j <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> j<span class="token operator">*</span><span class="token number">1000</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span> i <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>在迭代的<strong>IIFE 会为每个迭代都生成一个新的作用域</strong>，新的作用域每次迭代都保存了一个新的i值。</p>
<p>也可以使用ES6的块级作用域：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;=</span><span class="token number">5</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// let 会绑定当前块作用域</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span> <span class="token keyword">function</span> <span class="token function">timer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> i <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> i<span class="token operator">*</span><span class="token number">1000</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="模块" tabindex="-1"><a class="header-anchor" href="#模块"><span>模块</span></a></h3>
<ul>
<li>
<p>返回公共API</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">CoolModule</span><span class="token punctuation">(</span><span class="token parameter">id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 修改公共 API</span>
    publicAPI<span class="token punctuation">.</span>identify <span class="token operator">=</span> identify2<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">identify1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> id <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">identify2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> id<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">var</span> publicAPI <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">change</span><span class="token operator">:</span> change<span class="token punctuation">,</span>
    <span class="token literal-property property">identify</span><span class="token operator">:</span> identify1
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> publicAPI<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span> <span class="token string">"foo module"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

foo<span class="token punctuation">.</span><span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// foo module</span>
foo<span class="token punctuation">.</span><span class="token function">change</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
foo<span class="token punctuation">.</span><span class="token function">identify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// FOO MODULE</span>
</code></pre></div></li>
<li>
<p>定义模块和加载模块</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 模块管理器</span>
<span class="token keyword">var</span> MyModules <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">Manager</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> modules <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">define</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> deps<span class="token punctuation">,</span> impl</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>deps<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> modules<span class="token punctuation">[</span>deps<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    modules<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">impl</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span> impl<span class="token punctuation">,</span> deps <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 核心代码</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">function</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> modules<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    define<span class="token punctuation">,</span>
    get
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>这段代码的核心是 <code v-pre>modules[name] = impl.apply(impl, deps)</code>。</p>
<p>为了模块的定义引入了包装函数(可以传入任何依赖)，并且将返回值，也就是模块的 API，储存在一个根据名字来管理的模块列表中。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 使用模块</span>
MyModules<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span> <span class="token string">"bar"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token parameter">who</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"Let me introduce: "</span> <span class="token operator">+</span> who<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    hello
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

MyModules<span class="token punctuation">.</span><span class="token function">define</span><span class="token punctuation">(</span> <span class="token string">"foo"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"bar"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">bar</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> hungry <span class="token operator">=</span> <span class="token string">"hippo"</span><span class="token punctuation">;</span>
  <span class="token keyword">function</span> <span class="token function">awesome</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> bar<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span> hungry <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    awesome
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token keyword">var</span> bar <span class="token operator">=</span> MyModules<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span> <span class="token string">"bar"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> foo <span class="token operator">=</span> MyModules<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span> <span class="token string">"foo"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>bar<span class="token punctuation">.</span><span class="token function">hello</span><span class="token punctuation">(</span> <span class="token string">"hippo"</span> <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Let me introduce: hippo foo.awesome(); // LET ME INTRODUCE: HIPPO</span>
</code></pre></div></li>
<li>
<p><code v-pre>CommonJS、ES6</code>等模块机制。</p>
</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p><strong>当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。</strong></p>
<p>如果不了解闭包，有时会产生意料之外的结果，但闭包同时又是很有用的工具，代码中的闭包无处不在。比如可以利用闭包构建模块系统。</p>
<p>模块有两个主要特征:</p>
<ul>
<li>为创建内部作用域而调用了一个包装函数。</li>
<li>包装函数的返回值必须至少包括一个对内部函数的引用，这样就会创建涵盖整个包装函数内部作用域的闭包。</li>
</ul>
</div></template>


