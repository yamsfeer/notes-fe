<template><div><h1 id="renderer" tabindex="-1"><a class="header-anchor" href="#renderer"><span>renderer</span></a></h1>
<p>renderer 的作用就是将 vnode 渲染成真实 dom。一个 renderer 的结构大概是这样的：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token punctuation">{</span> 
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// render 过程</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>renderer 有一个 render 函数，它接受 vnode 以及 container 作为参数，将 vnode 渲染成真实的 dom 节点并挂载到 container 上。</p>
<p>利用响应式系统，我们可以让渲染过程自动化。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'vue'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token function">effect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;h1></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>obj<span class="token punctuation">.</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/h1></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token comment">// 暂时用字符串代替 vnode</span>
    document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>上面代码中，通过 effect 对 render 过程进行注册，它会被收集到 obj.title 的依赖集合中，当 obj.title 变化时，render 函数会重新执行，这就实现了响应式数据变化时自动重新渲染。</p>
<h2 id="renderer-的基本概念" tabindex="-1"><a class="header-anchor" href="#renderer-的基本概念"><span>renderer 的基本概念</span></a></h2>
<p>介绍 render 的具体过程之前，关于 renderer 有几个概念需要明确。</p>
<h3 id="vnode" tabindex="-1"><a class="header-anchor" href="#vnode"><span>vnode</span></a></h3>
<p>前面提到过，render 过程就是将 vnode 渲染成真实 dom。</p>
<p>vnode 就是一个描述 dom 节点的 JavaScript 对象。它包含 type、props、children 等属性，其中 children 是一个 vnode 数组，表示当前节点的子节点。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'div'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>vnode<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="mount-patch" tabindex="-1"><a class="header-anchor" href="#mount-patch"><span>mount&amp;patch</span></a></h3>
<p>在 render 过程中，有两个主要操作：patch 和 mount。</p>
<p>渲染器把 vnode 渲染成真实 dom 节点的过程称为挂载 ( mount )，挂载点称为容器 ( container )。</p>
<p>当在一个已挂载过的 container 上执行渲染时，则需要进行更新 ( patch )。</p>
<p>render 函数的具体实现：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token parameter">vnode<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 新旧 vnode 一起传给 patch，如果旧 vnode 不存在，则直接 mount</span>
      <span class="token function">patch</span><span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>container<span class="token punctuation">.</span>_vnode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token function">umount</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span> <span class="token comment">// 有旧 vnode 无新 vnode，是 unmount 操作</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    container<span class="token punctuation">.</span>_vnode <span class="token operator">=</span> vnode <span class="token comment">// _vnode 就是旧 vnode</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>不难看出，patch 是 render 的核心入口。</p>
<p>patch 函数接受三个参数，其中 n1 和 n2 分别代表旧 vnode 和新 vnode。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">patch</span><span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>n1<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 旧 vnode 不存在，直接 mount</span>
    <span class="token function">mountElement</span><span class="token punctuation">(</span>n2<span class="token punctuation">,</span> container<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// patch</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>如果旧 vnode 不存在，说明是首次渲染，直接 mount，否则 patch。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 首次渲染，只涉及 mount</span>
renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment">// 第二次渲染，需要 patch</span>
renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>newVnode<span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>如上代码所示，首次渲染会把 oldVnode 渲染到 container 内，这个过程称为 mount；第二次渲染时，由于 container 内已经渲染过 vnode，渲染器需要将 oldVnode 和 newVnode 进行比较，找出需要变更的地方，这个过程称为 patch。</p>
<p>事实上，<strong>mount 相当于一种特殊的 patch</strong>，因为没有旧的 vnode，所以无须比较，直接挂载。</p>
</div></template>


