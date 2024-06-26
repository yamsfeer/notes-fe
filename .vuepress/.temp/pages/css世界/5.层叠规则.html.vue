<template><div><h1 id="层叠规则" tabindex="-1"><a class="header-anchor" href="#层叠规则"><span>层叠规则</span></a></h1>
<p>说到层叠，很多人第一反应是 z-index。事实上，z-index 只有和定位元素（非 static）一起才有用。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>css3 的 flex 盒子的子元素也可以设置 z-index，这里不介绍。</p>
</div>
<p>网页中绝大部分元素是 static 元素，并且影响层叠顺序的属性远不止 z-index 一个。</p>
<h2 id="层叠上下文、层叠层级、层叠顺序" tabindex="-1"><a class="header-anchor" href="#层叠上下文、层叠层级、层叠顺序"><span>层叠上下文、层叠层级、层叠顺序</span></a></h2>
<ul>
<li>
<p>层叠上下文( stacking context )</p>
<p>跟块级格式化上下文( BFC ) 类似，层叠上下文是一个结界，一个层叠上下文自成一个小世界，层叠上下文可以嵌套。</p>
</li>
<li>
<p>层叠层级( stacking level )</p>
<p>层叠层级决定了同一个层叠上下文中元素在 z 轴上的显示顺序。</p>
<p>需要注意的是，不要把层叠层级和 z-index 混为一谈。z-index 可以影响定位元素的层叠层级，但层叠层级是普遍存在的。</p>
</li>
<li>
<p>层叠顺序( stacking order ) 表示元素发生层叠时特定的垂直显示顺序。</p>
<p>用一张图表示层叠顺序的规则如下图：</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/e6c9d24egy1h185bnvgpxj20ef08fdg2.jpg" alt=""></p>
<ul>
<li>
<p>位于最下面的 background / border 特指层叠上下文元素的边框和背景色。每个层叠顺序规则仅适用于当前层叠上下文元素的小世界。</p>
</li>
<li>
<p>单从层级上看，z-index: 0 和 z-index: auto 可以看成是一样的。</p>
</li>
</ul>
</li>
</ul>
<p>注意，inline box 层级比 float 和 block 元素要高，这是因为 background / border 为装饰属性，float 和 block 一般用作布局，而 inline 元素都是内容。很明显，内容优先。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>总结一下，在同一个层叠上下文中，有多个图层，它们的优先级如上图。</p>
</div>
<p>当元素发生层叠时，其覆盖关系遵循以下两条准则：</p>
<ul>
<li>谁大谁上：具有明显的层级设置时( 比如生效的 z-index )，在同一层叠上下文中，值大的覆盖小的</li>
<li>后来居上：层级相同，在 DOM 流中后面的覆盖前面的</li>
</ul>
<h2 id="深入了解层叠上下文" tabindex="-1"><a class="header-anchor" href="#深入了解层叠上下文"><span>深入了解层叠上下文</span></a></h2>
<h3 id="层叠上下文特性" tabindex="-1"><a class="header-anchor" href="#层叠上下文特性"><span>层叠上下文特性</span></a></h3>
<ul>
<li>层叠上下文的层级要比普通元素高（原因后面介绍）</li>
<li>层叠上下文可以嵌套，内部的层叠上下文及其子元素均受制于外部的层叠上下文</li>
<li>每个层叠上下文和兄弟元素独立，也就是说，层级的变化只需要考虑后代元素</li>
<li>每个层叠上下文是自成体系的，当元素层叠时，整个元素都是在父层叠上下文中</li>
</ul>
<h3 id="层叠上下文的创建" tabindex="-1"><a class="header-anchor" href="#层叠上下文的创建"><span>层叠上下文的创建</span></a></h3>
<p>和 BFC 一样，stacking context 也基本是由一些特定的 css 属性创建的。</p>
<p>比如 BFC 可以有 overflow: hidden 创建，stacking context 有以下几种方法：</p>
<h4 id="html-元素" tabindex="-1"><a class="header-anchor" href="#html-元素"><span>html 元素</span></a></h4>
<p>html 元素天生具有 stacking context，称为 root stacking context，可见，页面中所有的元素一定处于至少一个 stacking context 中。</p>
<h4 id="z-index-为数值的定位元素" tabindex="-1"><a class="header-anchor" href="#z-index-为数值的定位元素"><span>z-index 为数值的定位元素</span></a></h4>
<p>z-index 为数值的定位元素是传统的 stacking context。看个例子：</p>

<CodeDemo id="code-demo-133" type="normal" code="eJyVjkFuwyAQRa8yIts2AUvpgrqVGlU+BRtiqBkVgwU4tRrl7sVBTaxklQVC+jPvzzsSk3pLOKkVHqC1MsY3Qb5kMjoI8i4cQI19d5lE7yA/Jghs8rTeZGz+H6KrG5o8kTbGLLEuKBxncvARE3rHIWgrEx706xz/PqNTeuJyTD4HJ+GEW8/FZ+gHVTIcGKXDdF43GjuTlsm1V+6jt2MqvXsflA55cZiyo0UFK0rp8gIrJ/4FoCqcbL+74EenOKw+2cvuY7uEqhuI3UPbptk1Je9l6DCbsSKbW8jpD2ruinQ=">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>father<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>son son1<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>father<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>son son2<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.father</span> <span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span>auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.son</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">border</span><span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.son1</span> <span class="token punctuation">{</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 2<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #D16BA5<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.son2</span> <span class="token punctuation">{</span>
  <span class="token property">z-index</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #5FFBF1<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>当设置父级 z-index: 0 后，两张图片的层级又反过来了。这是因为：</p>
<ul>
<li>原本父级 z-index: auto，使得里面的图片的层级比较不受父级的影响，两张图片按照“谁大谁上”准则层叠</li>
<li>父级设置 z-index: 0，会创建一个 stacking context，此时，层叠规则发生变化。每个上下文是自成体系的，父级 z-index 都是 0，根据后来居上原则，第二个 father 要在第一个上面。可见，这种情况下，图片的 z-index 没起作用。</li>
</ul>
<h4 id="用一些-css3-属性创建" tabindex="-1"><a class="header-anchor" href="#用一些-css3-属性创建"><span>用一些 css3 属性创建</span></a></h4>
<p>css3 中一些情况会创建 stacking context：</p>
<ul>
<li>display: flex 且 z-index 不是 auto</li>
<li>opacity 不为1</li>
<li>transform 不为 none</li>
<li>mix-blend-mode ( 混合模式 ) 不为 normal</li>
</ul>
<h3 id="z-index-的使用准则" tabindex="-1"><a class="header-anchor" href="#z-index-的使用准则"><span>z-index 的使用准则</span></a></h3>
<ul>
<li>对于非浮层元素（比如弹窗）避免设置 z-index值</li>
<li>z-index 值不需要超过2</li>
</ul>
</div></template>


