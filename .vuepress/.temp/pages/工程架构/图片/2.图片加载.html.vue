<template><div><h1 id="图片加载" tabindex="-1"><a class="header-anchor" href="#图片加载"><span>图片加载</span></a></h1>
<h2 id="预加载" tabindex="-1"><a class="header-anchor" href="#预加载"><span>预加载</span></a></h2>
<p>预加载就是告诉浏览器你想尽快加载的关键资源。例如样式表中的字体、背景图片或从脚本中加载的资源。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>important.png<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre></div><h3 id="预加载响应式图片" tabindex="-1"><a class="header-anchor" href="#预加载响应式图片"><span>预加载响应式图片</span></a></h3>
<p>将响应式图片的 srcset 和 sizes 属性应用到 preload。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span>
  <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span>
  <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span>
  <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>important.jpg<span class="token punctuation">"</span></span>
  <span class="token attr-name">imagesrcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>important_400px.jpg 400w,
               important_800px.jpg 800w,
               important_1600px.jpg 1600w<span class="token punctuation">"</span></span>
  <span class="token attr-name">imagesizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50vw<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre></div><h3 id="预加载背景图片" tabindex="-1"><a class="header-anchor" href="#预加载背景图片"><span>预加载背景图片</span></a></h3>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">image-set</span><span class="token punctuation">(</span> <span class="token string">"cat.png"</span> 1x<span class="token punctuation">,</span> <span class="token string">"cat-2x.png"</span> 2x<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>CSS 背景图片有一个问题，浏览器可能在下载处理了 head 中所有 CSS 后才发现以上代码，而这可能是大量的CSS。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- css link 1 --></span>
  <span class="token comment">&lt;!-- css link 2 --></span>
  <span class="token comment">&lt;!-- css link ... --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">img</span> <span class="token punctuation">{</span> <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">image-set</span><span class="token punctuation">(</span> <span class="token string">"cat.png"</span> 1x<span class="token punctuation">,</span> <span class="token string">"cat-2x.png"</span> 2x<span class="token punctuation">)</span> <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
</code></pre></div><p>这样的预加载很难达到预期效果。更好的做法是同时提供两种写法，用 link preload 图片，同时用 css image-set 设置图片。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span> <span class="token attr-name">imagesrcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>cat.png 1x, cat-2x.png 2x<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
</code></pre></div><p>这里不写 href 是为了确保，不支持 link imagesrcset 但支持 css image-set 的浏览器不会下载同一个错误的源。</p>
<h3 id="预加载-picture-元素" tabindex="-1"><a class="header-anchor" href="#预加载-picture-元素"><span>预加载 picture 元素</span></a></h3>
<p>picture 元素的写法大概如下：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small_cat.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(max-width: 400px)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>medium_cat.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(max-width: 800px)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>large_cat.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span>
</code></pre></div><p>picture 元素的预加载暂没有标准化的做法。</p>
<p>实际上，pictue 的逻辑是按顺序查看 source 元素的 media 属性，找到第一个匹配的。通过在每个断点写一个预加载代码，我们可以模拟实现 picture 预加载的过程。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small_cat.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(max-width: 400px)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>medium_cat.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(min-width: 400.1px) and (max-width: 800px)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>preload<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>large_cat.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(min-width: 800.1px)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre></div><p>参考：<a href="https://web.dev/preload-responsive-images/" target="_blank" rel="noopener noreferrer">Preloading responsive images - web.dev<ExternalLinkIcon/></a></p>
<h2 id="懒加载-延迟加载" tabindex="-1"><a class="header-anchor" href="#懒加载-延迟加载"><span>懒加载 ( 延迟加载 )</span></a></h2>
<p>图片懒加载就是不一次性请求加载所有图片，而是当图片进入可视窗口 ( viewport ) 时再请求。</p>
<h3 id="html-属性-loading-lazy" tabindex="-1"><a class="header-anchor" href="#html-属性-loading-lazy"><span>HTML 属性 loading=lazy</span></a></h3>
<p>img 标签的 <strong><code v-pre>loading</code></strong> 属性告知浏览器不在视口的图片或 iframe 该如何加载。</p>
<ul>
<li>
<p>eager</p>
<p>默认值，浏览器遇到 img 标签时立即加载图片，相当于没有加 loading 属性。</p>
</li>
<li>
<p>lazy</p>
<p>推迟图片加载，直到浏览器认为其需要立即加载时才去加载。</p>
<p>如果图像位于可视区，则立即加载图像，并在用户滚动到它们附近时获取其他图像。</p>
</li>
</ul>
<h4 id="loading-和-fetchpriority-的关系" tabindex="-1"><a class="header-anchor" href="#loading-和-fetchpriority-的关系"><span>loading 和 fetchpriority 的关系</span></a></h4>
<p>浏览器有加载图片的队列，loading 决定图片是否应该加入队列，而 fetchpriority 决定的是图片在队列中的顺序。</p>
<p>当图片位于可视区外：</p>
<ul>
<li><code v-pre>loading=eager</code>，图片照常加载，优先级根据 fetchpriority 决定</li>
<li><code v-pre>loading=lazy</code>，即使 <code v-pre>fetchpriority=high</code>，也会延迟加载</li>
</ul>
<h4 id="距离视口的阈值" tabindex="-1"><a class="header-anchor" href="#距离视口的阈值"><span>距离视口的阈值</span></a></h4>
<p>我们知道，loading 为 lazy 的图片会在用户滚动到它们附近时开始加载，这个距离<strong>由浏览器决定，且无法通过 API 改变</strong>。</p>
<p>但浏览器对距离的设置不是固定的，它根据几个因素而变化：</p>
<ul>
<li>正在获取的图像资源的类型</li>
<li>当前网络连接情况</li>
</ul>
<p>chrome 也一直在不断调整优化这个阈值。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/xSZMqpbioBRwRTnenK8f-20230515184401410.png" alt="The new and improved thresholds for image lazy loading, reducing the distance-from-viewport thresholds for fast connections from 3000px down to 1250px" style="zoom:40%;" class="img-mid" />
<h3 id="css-属性-content-visibility-auto" tabindex="-1"><a class="header-anchor" href="#css-属性-content-visibility-auto"><span>CSS 属性 content-visibility: auto</span></a></h3>
<p><strong><code v-pre>content-visibility</code></strong> 控制元素是否渲染其内容，让浏览器省略大量布局和渲染工作，直到需要才渲染。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">content-visibility</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span>
  <span class="token property">content-visibility</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
  <span class="token property">content-visibility</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><ul>
<li>
<p>visible</p>
<p>默认值，无任何效果，相当于没有添加 <code v-pre>content-visibility</code>。</p>
</li>
<li>
<p>hidden</p>
<p>元素跳过其内容的渲染 ( 注意是内容的渲染 )。类似于子元素 <code v-pre>display: none</code>，被跳过的内容不可被页内查找、tab 导航、选中或获得焦点。</p>
</li>
<li>
<p>auto</p>
<p>若元素不<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Containment#%E4%B8%8E%E7%94%A8%E6%88%B7%E7%9B%B8%E5%85%B3" target="_blank" rel="noopener noreferrer">与用户相关<ExternalLinkIcon/></a>，则元素跳过其内容。与 <code v-pre>hidden</code> 不同的是，被跳过的内容仍可页内查找、获得焦点等。</p>
</li>
</ul>
<p>注意，<code v-pre>content-visibility: auto</code> <strong>无法直接替代图片懒加载</strong>，虽然元素内容未被渲染，静态资源却会在页面初始化时全部加载。因此，它更像是一个虚拟列表的替代方案。</p>
<h3 id="intersectionobserver" tabindex="-1"><a class="header-anchor" href="#intersectionobserver"><span>IntersectionObserver</span></a></h3>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver" target="_blank" rel="noopener noreferrer">IntersectionObserver API<ExternalLinkIcon/></a> 可以自动&quot;观察&quot;元素是否可见。由于可见 ( visible ) 的本质是，目标元素与视口产生一个交叉区，所以叫做交叉观察器。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span><span class="token parameter">entries</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// intersectionRatio = 0 表示目标在视野外</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>intersectionRatio <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token keyword">return</span> 
    <span class="token punctuation">}</span>

    <span class="token comment">// load image</span>
    <span class="token keyword">const</span> img <span class="token operator">=</span> entry<span class="token punctuation">.</span>target
    img<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>src
    
    <span class="token comment">// unobserve 已加载的图片就不需要再观察</span>
    observer<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 开始监听</span>
Array
  <span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'img'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">img</span> <span class="token operator">=></span> observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>上面代码中，我们先创建一个 observer，主要是指定它的回调函数，然后让 observer 观察所有图片是否可见。</p>
<p>交叉观察器还可以设置 rootMargin属性，给元素设置一个缓冲区，在元素进入视口之前就触发了懒加载。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span><span class="token parameter">entries</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// lazy-loading image code</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">rootMargin</span><span class="token operator">:</span> <span class="token string">"0px 0px 256px 0px"</span> <span class="token comment">// margin-bottom</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="offsettop-计算高度" tabindex="-1"><a class="header-anchor" href="#offsettop-计算高度"><span>offsetTop 计算高度</span></a></h3>
<p>要想判断元素是否可见，需要以下几个属性。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientHeight <span class="token comment">// 可视区域高度</span>
document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>scrollTop <span class="token comment">// 当前滚动位置</span>
element<span class="token punctuation">.</span>offsetTop <span class="token comment">// 元素相对顶部的位置</span>
</code></pre></div><p>它们之间的关系大概如下图。</p>
<img src="https://pic1.zhimg.com/80/v2-af1ab0c5f34e468e8647135c1f9f51e4_1440w.webp" alt="img" style="zoom:45%;" class="img-mid" />
<p>注意，element.offsetTop 返回的是元素相对父元素顶部的位置，我们需要的是元素相对文档顶部的位置。为此，需要通过 element.offsetParent 获取其父元素，并不断累加计算直到 body 元素。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">toBodyTop</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> top <span class="token operator">=</span> el<span class="token punctuation">.</span>offsetTop
  <span class="token keyword">while</span><span class="token punctuation">(</span>el <span class="token operator">=</span> el<span class="token punctuation">.</span>offsetParent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    top <span class="token operator">+=</span> el<span class="token punctuation">.</span>offsetTop
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> top
<span class="token punctuation">}</span>
</code></pre></div><p>从上图中不难得出以下判断元素是否可见代码。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isVisible</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> scrollTop <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>scrollTop
  <span class="token keyword">const</span> visibleHeight <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientHeight <span class="token comment">// viewport 高度</span>

  <span class="token keyword">return</span> visibleHeight <span class="token operator">+</span> scrollTop <span class="token operator">></span> <span class="token function">toBodyTop</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>当图片可见时，加载图片，图片地址通过 <code v-pre>&lt;img data-src=&quot;url&quot;&gt;</code> 的方式存储。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter">imgs</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  imgs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">img</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isVisible</span><span class="token punctuation">(</span>img<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 进入 viewport</span>
      img<span class="token punctuation">.</span>src <span class="token operator">=</span> img<span class="token punctuation">.</span>dataset<span class="token punctuation">.</span>src
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>最后，监听 scroll 事件，不断检查图片是否可见。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> imgs <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'img'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
window<span class="token punctuation">.</span><span class="token function-variable function">onscroll</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">load</span><span class="token punctuation">(</span>imgs<span class="token punctuation">)</span>
</code></pre></div><h3 id="getboundingclientrect" tabindex="-1"><a class="header-anchor" href="#getboundingclientrect"><span>getBoundingClientRect</span></a></h3>
<p>元素的 <code v-pre>getBoundingClientRect</code> 方法可以直接获取元素相对于 viewport 的位置，更加方便。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">isVisible</span><span class="token punctuation">(</span><span class="token parameter">el</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> rect <span class="token operator">=</span> el<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> clientHeight <span class="token operator">=</span> document<span class="token punctuation">.</span>body<span class="token punctuation">.</span>clientHeight
  <span class="token keyword">return</span> rect<span class="token punctuation">.</span>top <span class="token operator">&lt;=</span> clientHeight
<span class="token punctuation">}</span>
</code></pre></div><h3 id="背景图像的懒加载" tabindex="-1"><a class="header-anchor" href="#背景图像的懒加载"><span>背景图像的懒加载</span></a></h3>
<p><code v-pre>background-image</code> 的图片无法用 <code v-pre>loading</code> 属性懒加载。我们可以用交叉观察期判断元素是否可见，可见时再设置背景图，在这之前，先用占位图代替。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lazy-background<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>一个有巨大背景的容器<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><p>以 <code v-pre>visible</code> 类名区分元素是否可见。</p>
<div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">.lazy-background</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"placeholder.jpg"</span><span class="token punctuation">)</span></span> <span class="token comment">/* 占位图 */</span>
<span class="token punctuation">}</span>

<span class="token selector">.lazy-background.visible</span> <span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">"bg.jpg"</span><span class="token punctuation">)</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>当元素可见时，添加 <code v-pre>visible</code> 类名。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">IntersectionObserver</span><span class="token punctuation">(</span><span class="token parameter">entries</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  entries<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">entry</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>isIntersecting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      entry<span class="token punctuation">.</span>target<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'visible'</span><span class="token punctuation">)</span> <span class="token comment">// 添加类名</span>
      observer<span class="token punctuation">.</span><span class="token function">unobserve</span><span class="token punctuation">(</span>entry<span class="token punctuation">.</span>target<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.lazy-background'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><h3 id="延迟加载工具库" tabindex="-1"><a class="header-anchor" href="#延迟加载工具库"><span>延迟加载工具库</span></a></h3>
<p>以下库可用于延迟加载图像。</p>
<ul>
<li><a href="https://github.com/aFarkas/lazysizes" target="_blank" rel="noopener noreferrer">lazysizes<ExternalLinkIcon/></a> 可以延迟加载图像和 iframe。</li>
<li><a href="https://github.com/verlok/vanilla-lazyload" target="_blank" rel="noopener noreferrer">vanilla-lazyload<ExternalLinkIcon/></a> 可以延迟加载图像、背景图像、视频、iframe 和脚本的轻量级库。支持响应式图像，并能开启浏览器级的延迟加载。</li>
<li><a href="https://github.com/ApoorvSaxena/lozad.js" target="_blank" rel="noopener noreferrer">lozad.js<ExternalLinkIcon/></a> 仅使用 Intersection Observer 的轻量级库</li>
</ul>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h3>
<p>实现图片懒加载大概有以下几种方式：</p>
<ul>
<li>
<p>html 属性：<code v-pre>loading = &quot;lazy&quot;</code></p>
</li>
<li>
<p>css 属性：<code v-pre>content-visiblity：auto</code></p>
</li>
<li>
<p>javascript 计算，判断图片是否可见。</p>
<ul>
<li>IntersectionObserver API：用“交叉观察器”观察元素是否可见</li>
<li>offsetTop：通过元素距离文档顶部的位置判断</li>
<li>getBoundingClientRect：获取元素相对于 viewport 的位置</li>
</ul>
</li>
</ul>
<p>img 标签的 loading 属性是实现懒加载的首选方式，IntersectionObserver 次之。</p>
<p>由于 scroll 事件会密集发生，容易造成性能问题。监听 scroll 事件并计算元素是否可见是维持兼容性的方式。</p>
<h2 id="图像加载优先级" tabindex="-1"><a class="header-anchor" href="#图像加载优先级"><span>图像加载优先级</span></a></h2>
<p>这是一个实验性属性，提供获取图像时的优先级。</p>
<ul>
<li>high：优先级相对其他图像要高</li>
<li>low：优先级相对其他图像要低</li>
<li>auto：默认值：浏览器自动确定优先级。</li>
</ul>
<h2 id="异步图像解码" tabindex="-1"><a class="header-anchor" href="#异步图像解码"><span>异步图像解码</span></a></h2>
<p>img 标签的 <code v-pre>decoding</code> 属性告诉浏览器使用何种方式解析图像数据。</p>
<ul>
<li>sync： 同步解码图像，保证与其他内容一起显示。</li>
<li>async： 异步解码图像，加快显示其他内容。</li>
<li>auto:：默认模式，表示不偏好解码模式。由浏览器决定哪种方式更适合用户。</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://github.com/chokcoco/iCSS/issues/185" target="_blank" rel="noopener noreferrer">使用 content-visibility 优化渲染性能<ExternalLinkIcon/></a></p>
<p><a href="https://web.dev/fast/" target="_blank" rel="noopener noreferrer">优化图片 - web.dev<ExternalLinkIcon/></a></p>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img#%E5%B1%9E%E6%80%A7" target="_blank" rel="noopener noreferrer">img 属性 - MDN<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/7204860462240170040" target="_blank" rel="noopener noreferrer">现代图片性能优化及体验优化指南 - 懒加载及异步图像解码方案<ExternalLinkIcon/></a></p>
<p><a href="http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html" target="_blank" rel="noopener noreferrer">IntersectionObserver API 使用教程 - 阮一峰的网络日志<ExternalLinkIcon/></a></p>
</div></template>


