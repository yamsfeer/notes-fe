<template><div><h1 id="响应式图片" tabindex="-1"><a class="header-anchor" href="#响应式图片"><span>响应式图片</span></a></h1>
<p>响应式图片可以分为两种情况：</p>
<ul>
<li>让浏览器选择最合适的图像</li>
<li>开发者控制浏览器选择图像</li>
</ul>
<p>这两种情况对应图片的描述性和规定性语法。具体来说是对应以下两种图片设置：</p>
<ul>
<li>
<p>srcset 和 sizes：浏览器根据用户、设备等情况做出最佳选择</p>
</li>
<li>
<p>picture 元素：开发者根据浏览器视口大小和对图片格式的支持等因素，指定相应图片</p>
</li>
</ul>
<h2 id="描述性语法" tabindex="-1"><a class="header-anchor" href="#描述性语法"><span>描述性语法</span></a></h2>
<p>通常来说，浏览器掌握的信息远多于开发者，包括视口大小、显示密度、用户偏好、带宽和无数其他因素。</p>
<p>描述性语法就是：开发者提供图片地址和图片的信息，最终决策权留给浏览器。简单来说，就是让浏览器根据其手头的信息，尽可能地做出最有效的图像请求。</p>
<p>为了帮助浏览器做出选择，img 标签提供了两个属性：</p>
<ul>
<li>srcset：为浏览器提供图片候选列表</li>
<li>sizes：告诉浏览器如何渲染该 img</li>
</ul>
<p>在介绍 srcset 和 sizes 属性前，先来看看什么是 DPR。</p>
<h3 id="dpr" tabindex="-1"><a class="header-anchor" href="#dpr"><span>DPR</span></a></h3>
<p>一个设备的逻辑像素和物理像素之比称为设备像素比率 <em>( device pixel ratio, DPR )</em>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span>devicePixelRatio <span class="token comment">// 2</span>
</code></pre></div><p>在 DPR 为 2 的设备上显示图片，四个物理像素显示一个逻辑像素。</p>
<p>一个固定宽度的 img 在任何浏览环境中都会占据相同数量的视口，而不考虑用户屏幕的物理像素数量。</p>

<CodeDemo id="code-demo-73" type="normal" code="eJyljssOgjAQRX9lMmulEiUxFf2SJqbSCmNKqUx9EMK/W9SNa5c3J7nnjNjE1qHE0tD9oDxASW0N3Fd7lVAMLIXQzDZyVnXGBusz6kSer4tC6OuNnK1JL5vh1JPRx81qlV1CrRDE/2fbn7NSfApxgRVzKk4TxlliiIPTg4Szs8+d8pPys/bNHmRiIyF1hS/C6QXsklGD">
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://assets.codepen.io/11355/aquilegia-hybrida_400.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://assets.codepen.io/11355/aquilegia-hybrida_800.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre></div><div class="language-css" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="token selector">div</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">img</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 400px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div></CodeDemo><p>为了防止这种放大，被渲染的图像必须有至少 800px 的宽度。当按比例缩小以适应400逻辑像素宽的布局中的空间时，800像素的图像源具有双倍的像素密度。</p>
<ul>
<li>低 DPR 显示器显示高分辨率图片，图片降级以匹配显示器，显示效果和低分辨率一样，但文件更大</li>
<li>高 DPR 显示器显示低分辨率图片，图片放大模糊</li>
</ul>
<h3 id="用-x-描述像素密度" tabindex="-1"><a class="header-anchor" href="#用-x-描述像素密度"><span>用 X 描述像素密度</span></a></h3>
<p>srcset 可以为浏览器提供多个图像选择，每个图片选项由逗号分开，并由两部分组成：图片 URL 和描述，描述语法有两种：x 语法和 w 语法。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>low-density.jpg<span class="token punctuation">"</span></span>
  <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>double-density.jpg 2x,
          triple-density.jpg 3x<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>浏览器将会有以下选择：</p>
<ul>
<li>double-density.jpg，适合 DPR 为 2 的显示器</li>
<li>triple-density.jpg，适合 DPR 为 3 的显示器</li>
<li>low-density.jpg，srcset 中没有合适的选择时降级使用</li>
</ul>
<p>不支持 srcset 的浏览器会忽略该属性，直接请求 src 的内容。</p>
<p>注意，srcset 是声明而不是指令，2x 是告知浏览器，这张图片适合在 DPR 为 2 的设备上使用，并非要求浏览器在 DPR 为 2 的设备上使用这张图片。</p>
<h3 id="用-w-描述宽度" tabindex="-1"><a class="header-anchor" href="#用-w-描述宽度"><span>用 w 描述宽度</span></a></h3>
<p>w 语法描述的是图片的固有宽度。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small.jpg 600w, large.jpg 1200w<span class="token punctuation">"</span></span> <span class="token punctuation">></span></span>
</code></pre></div><ul>
<li>small.jpg，宽度为 600px 的图片</li>
<li>large.jpg，宽度为1200px 的图片</li>
</ul>
<p>和 x 语法类似，w 语法描述的也是图片本身，选择哪张图片由浏览器决定。</p>
<p>在浏览器决定渲染哪张图片之前，你需要向它提供更多的信息：描述该图片在页面上的渲染方式。要做到这一点，请使用 sizes 属性。</p>
<h3 id="用-sizes-描述用途" tabindex="-1"><a class="header-anchor" href="#用-sizes-描述用途"><span>用 sizes 描述用途</span></a></h3>
<p>浏览器解析 html 时，css 等外部文件也许并未下载或解析完成。也就是说， 当浏览器解析 img 标签并发起图片请求时，它可能只有浏览器级别的信息：视口的大小、DPR 值、用户的偏好等等。</p>
<p>sizes 可以在解析 html 标签中提供图像的信息。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
 <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>80vw<span class="token punctuation">"</span></span>
 <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small.jpg 600w,
         medium.jpg 1200w,
         large.jpg 2000w<span class="token punctuation">"</span></span>
 <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fallback.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>sizes 告诉浏览器，img 占据的宽度是80vw，即视口的 80%。</p>
<p>记住，这不是一个指令，而是对页面布局中图像大小的描述。它不是说&quot;让这个图片占据80%的视口&quot;，而是说&quot;一旦页面渲染完毕，这个图片最终将占据80%的视口&quot;。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
   <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>80vw<span class="token punctuation">"</span></span>
   <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://assets.codepen.io/11355/pontederia-crassipes_600.jpg 600w,
           https://assets.codepen.io/11355/pontederia-crassipes_1200.jpg 1200w,
           https://assets.codepen.io/11355/pontederia-crassipes_2000.jpg 2000w<span class="token punctuation">"</span></span>
   <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fallback.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>作为开发者，你的工作已经完成了。你在 srcset 中提供了候选图片列表，并在 sizes 中描述了图片宽度，剩下的就由浏览器来决定了。</p>
<p>那么，浏览器是如何决策的。</p>
<p>浏览器已知：图片将占据可用视口的 80%</p>
<ul>
<li>
<p>如果在 1000px 宽的 viewport 上渲染，图片将占据 800 px。</p>
</li>
<li>
<p>浏览器将 srcset 中每个候选图片的宽度与之相除。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>600  / 800 = 0.75
1200 / 800 = 1.5
200  / 800 = 2.5
</code></pre></div></li>
</ul>
<p>这个计算值是对 DPR 的参考，越接近越好。</p>
<ul>
<li>无论 DPR 是多少，small.jpg 都会被丢弃，计算值低于1，说明这张图片对任何用户都需要放大</li>
<li>DPR = 1，medium.jpg 提供了最接近的匹配，该源适合在DPR为1.5的情况下显示，所以它比需要的要大一点，但请记住，降频是一个视觉上的无缝过程。</li>
<li>DPR = 2，large.jpg是最接近的匹配。</li>
</ul>
<p>如果在 600px 宽的 viewport 上渲染，计算结果将完全不同：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>600  / 480 = 1.25
1200 / 480 = 2.5
200  / 480 = 4.167
</code></pre></div><p>small.jpg 将在 1x 设备上匹配，medium.jpg 将在 2x 设备上匹配。</p>
<p>考虑到 margin、padding 或页面上其他元素的影响，你也许需要用各种单位的组合来表达图像的宽度。calc 允许我们混合计算 CSS 单位，任何原生支持响应式图像的浏览器都支持 calc。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
	<span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>calc(100vw-2em)<span class="token punctuation">"</span></span>
	<span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small.jpg 400w, medium.jpg 800w, large.jpg 1600w, x-large.jpg 2400w<span class="token punctuation">"</span></span>
	<span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fallback.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><h3 id="描述断点" tabindex="-1"><a class="header-anchor" href="#描述断点"><span>描述断点</span></a></h3>
<p>sizes 支持媒体查询，当页面布局变化时，图片会做出相应变化。</p>
<p>假设有一张图片，在 1200px 以上的视口中宽度占 80%，两边各有 1em 的 padding，在更小视口中宽度占 100%。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
     <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(min-width: 1200px) calc(80vw - 2em), 100vw<span class="token punctuation">"</span></span>
     <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small.jpg 600w, medium.jpg 1200w, large.jpg 2000w<span class="token punctuation">"</span></span>
     <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fallback.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>一旦媒体查询匹配，浏览器就会停止解析 sizes 属性，并应用指定的值。</p>
<p>也就是说，如果 min-width: 1200px 条件不匹配，浏览器就会转到下一个值。由于 100vw 没有关联媒体查询，它被作为默认值使用。</p>
<p>如果用最大宽度媒体查询来满足上述要求：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
     <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(max-width: 1200px) 100vw, calc(80vw - 2em)<span class="token punctuation">"</span></span>
     <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>small.jpg 600w, medium.jpg 1200w, large.jpg 2000w<span class="token punctuation">"</span></span>
     <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fallback.jpg<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre></div><p>现在，你已经向浏览器提供了所有关于img元素的信息：图片来源、宽度，以及最终展示结果。</p>
<p>HTML 规范没有规定要如何选择图片。一旦来源、描述符以及图像的渲染方式都被解析完毕，浏览器就可以自由地做它想做的事情。</p>
<p>将控制权交给浏览器，有很多好处。例如，使用 srcset 或 sizes 的 img 永远不会去请求一个比浏览器缓存中已经存在的尺寸更小的图片。另外，img 通常还会有 src 属性提供的降级图片资源。</p>
<h3 id="使用-srcset-和-sizes" tabindex="-1"><a class="header-anchor" href="#使用-srcset-和-sizes"><span>使用 srcset 和 sizes</span></a></h3>
<p>srcset 可以用 webpack 等工具自动生成到代码中。</p>
<p>sizes 比较难以自动化，因为还没渲染的页面是无法计算的。但现在也有一些工具：</p>
<ul>
<li><a href="https://github.com/ausi/respimagelint" target="_blank" rel="noopener noreferrer">respImageLint<ExternalLinkIcon/></a> 是一个 code snippet，它会检查 sizes 属性并提供改进建议</li>
<li><a href="https://github.com/aFarkas/lazysizes" target="_blank" rel="noopener noreferrer">Lazysizes<ExternalLinkIcon/></a> 将图片请求推迟到布局建立之后，用 JavaScript 生成 sizes</li>
</ul>
<h2 id="规定性语法" tabindex="-1"><a class="header-anchor" href="#规定性语法"><span>规定性语法</span></a></h2>
<p>有时你需要明确控制哪个源文件在什么时候被呈现。</p>
<p>通过规定性的语法，你告诉浏览器应该做什么--根据你定义的特定标准选择什么资源。</p>
<p>例如，你可能想根据不同的设计处理方法，在不同的布局断点上显示不同长宽比的同一图像内容的版本，或者确保只有支持特定编码的浏览器才能收到特定的源文件。</p>
<p>在这些情况下，你需要明确地控制哪个源被显示，以及何时显示。这些都是srcset和size在设计上不能给我们的保证。为了获得这种控制，我们需要使用picture元素。</p>
<h3 id="picture-元素" tabindex="-1"><a class="header-anchor" href="#picture-元素"><span>picture 元素</span></a></h3>
<p>picture 本身并不渲染任何东西，而是作为 img 的决策引擎，告诉它要渲染什么。</p>
<p>picture 是包含 source 的包装器，类似 audio、video。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span>
</code></pre></div><p>如果浏览器不支持 picture，则会后退使用 img 元素，source 也会被忽略。</p>
<h3 id="艺术指导-图像与picture" tabindex="-1"><a class="header-anchor" href="#艺术指导-图像与picture"><span>&quot;艺术指导 &quot;图像与picture</span></a></h3>
<p>根据页面中图片的大小来改变图片的内容或长宽比，通常被称为&quot;艺术指导 &quot;的响应式图片。</p>
<p>srcset 和 sizes 被设计成隐形工作，根据用户浏览器的要求无缝地交换来源。然而，有些时候，你想跨断点改变来源，以更好地突出内容，就像你调整页面布局一样。例如：一个全宽的标题图片，其中心焦点较小，在大的视口上可能效果不错：</p>
<p>但当缩小尺寸以适应小视窗时，图像的中心焦点可能会丢失：</p>
<p>这些图像源的主题是相同的，但为了在视觉上更好地聚焦于该主题，你会希望图像源的比例在各个断点上发生变化。例如，对图像中心进行更严格的放大，而将边缘的一些细节裁剪掉：</p>
<p>这种 &quot;裁剪 &quot;可以通过CSS实现，但会让用户要求获得构成该图像的所有数据，尽管他们最终可能不会看到它。</p>
<p>每个 source 元素都有定义选择该源的条件的属性：</p>
<ul>
<li>media，接受媒体查询</li>
<li>type，媒体类型 ( MIME )</li>
</ul>
<p>source 元素，按顺序检查，一旦匹配，就不继续往下。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(min-width: 1200px)<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>wide-crop.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>close-crop.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>…<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span>
</code></pre></div><p>如果用最小宽度的媒体查询，把最大的源放在前面的代码中。用最大宽度媒体查询时，把最小的源放在第一位。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(max-width: 400px)<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>mid-bp.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(max-width: 800px)<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>high-bp.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>highest-bp.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>…<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span>
</code></pre></div><p>当根据你指定的标准选择一个源时，源上的srcset属性会被传递到img上，就像它被定义在img上一样-。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(min-width: 800px)<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>high-bp-1600.jpg 1600w, high-bp-1000.jpg 1000w<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lower-bp-1200.jpg 1200w, lower-bp-800.jpg 800w<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fallback.jpg<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>…<span class="token punctuation">"</span></span> <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>calc(100vw - 2em)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span>
</code></pre></div><p>为减少布局偏移，HTML 允许在 source 元素上使用 width 和 height 属性。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span>
      <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(min-width: 800px)<span class="token punctuation">"</span></span>
      <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>high-bp-1600.jpg 1600w, high-bp-1000.jpg 1000w<span class="token punctuation">"</span></span>
      <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1600<span class="token punctuation">"</span></span>
      <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>800<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>fallback.jpg<span class="token punctuation">"</span></span>
      <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>lower-bp-1200.jpg 1200w, lower-bp-800.jpg 800w<span class="token punctuation">"</span></span>
      <span class="token attr-name">sizes</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>calc(100vw - 2em)<span class="token punctuation">"</span></span>
      <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>1200<span class="token punctuation">"</span></span>
      <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>750<span class="token punctuation">"</span></span>
      <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>…<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span>
</code></pre></div><p>source 还可以用在其他方面，比如选择更适合用户偏好颜色的图片。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">media</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>(prefers-color-scheme: dark)<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hero-dark.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>hero-light.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span>
</code></pre></div><h4 id="type-属性" tabindex="-1"><a class="header-anchor" href="#type-属性"><span>type 属性</span></a></h4>
<p>type 属性允许你使用 picture 元素的单一请求决定引擎，只向支持图片格式的浏览器提供图片格式。</p>
<p>在引入 picture 元素之前，要使用新格式图片，最可行的前端解决方案就是浏览器请求并尝试解析，不支持就丢弃它并加载后备文件。一个常见的例子是类似这样的脚本：</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span>
  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image.webp<span class="token punctuation">"</span></span>
  <span class="token attr-name">data-fallback</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image.jpg<span class="token punctuation">"</span></span>
  <span class="token special-attr"><span class="token attr-name">onerror</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript"><span class="token keyword">this</span><span class="token punctuation">.</span>src<span class="token operator">=</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">'data-fallback'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>onerror<span class="token operator">=</span><span class="token keyword">null</span><span class="token punctuation">;</span></span><span class="token punctuation">"</span></span></span>
  <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>...<span class="token punctuation">"</span></span>
<span class="token punctuation">/></span></span>
</code></pre></div><p>这明显不是一个好办法，对不支持 webp 的浏览器来说，不仅浪费了一个请求，还会抛出 error 事件。</p>
<p>type 属性会预先告知浏览器图片的编码，这样它就可以决定是否提出请求。</p>
<div class="language-html" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>picture</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image/webp<span class="token punctuation">"</span></span> <span class="token attr-name">srcset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pic.webp<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>pic.jpg<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>picture</span><span class="token punctuation">></span></span>
</code></pre></div><p>如果浏览器不支持 webp，就不会请求 pic.webp 文件，而是请求备用的 pic.jpg。</p>
<h3 id="响应式图片的未来" tabindex="-1"><a class="header-anchor" href="#响应式图片的未来"><span>响应式图片的未来</span></a></h3>
<ul>
<li>
<p>sizes: auto</p>
<p><code v-pre>&lt;img loading=&quot;lazy&quot;&gt;</code> 图片会在页面布局已知之后再请求，这样初始视口以外的图片请求会被推迟到页面渲染后期，从而避免不必要的请求。</p>
<p>由于提出 lazy 请求时，浏览器已经得到页面的布局，所以有人建议在 HTML 规范中增加 sizes=&quot;auto&quot;，以避免手写 sizes 的麻烦。</p>
</li>
<li>
<p>容器查询 ( container query syntax )</p>
<p>对于 picture 来说，就是根据 picture 元素中的 img 占据的空间，而不是根据视口的大小来选择 source。</p>
</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://web.dev/learn/images/" target="_blank" rel="noopener noreferrer">Learn Images – web.dev<ExternalLinkIcon/></a></p>
<p><a href="https://performance.shopify.com/blogs/blog/responsive-images-on-shopify-with-liquid?_pos=1&amp;_sid=be9d88768&amp;_ss=r" target="_blank" rel="noopener noreferrer">Responsive images on Shopify with Liquid – Performance @ Shopify<ExternalLinkIcon/></a></p>
</div></template>


