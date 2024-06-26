<template><div><h1 id="inp-与下一次绘制的交互" tabindex="-1"><a class="header-anchor" href="#inp-与下一次绘制的交互"><span>INP 与下一次绘制的交互</span></a></h1>
<h2 id="什么是-inp" tabindex="-1"><a class="header-anchor" href="#什么是-inp"><span>什么是 INP</span></a></h2>
<p>INP ( Interaction to Next Paint ) 与下一次绘制的交互，描述页面对用户输入的响应速度。</p>
<p>具体来说，INP 会收集所有交互延迟，将其中的最大值作为 INP。</p>
<p>INP 是在用户离开页面时计算的，它代表了页面在整个生命周期中的总体响应性。低 INP 意味着页面能够可靠地响应用户输入。</p>
<h3 id="什么是交互延迟-interaction-latency" tabindex="-1"><a class="header-anchor" href="#什么是交互延迟-interaction-latency"><span>什么是交互延迟 ( interaction latency )</span></a></h3>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Ng0j5yaGYZX9Bm3VQ70c.svg" class="img-mid" />
<p>上图展示的是交互的生命周期。先收到用户输入，然后处理事件，完成后浏览器再渲染绘制，最终呈现视觉反馈。</p>
<p>总的来说，交互延迟就是从用户交互到下一帧呈现视觉反馈的时间。具体包括三部分：</p>
<ul>
<li>输入延迟 ( input delay )，可能由主线程上的长任务等因素造成</li>
<li>交互处理时间 ( processing time )</li>
<li>展示延迟 ( presentation delay )</li>
</ul>
<p>需要注意的是，每个浏览上下文都有自己的主线程：顶层页面有一个主线程，每个 iframe 也有自己的主线程，INP 是包含了 iframe 的。</p>
<h3 id="inp-中的交互类型" tabindex="-1"><a class="header-anchor" href="#inp-中的交互类型"><span>INP 中的交互类型</span></a></h3>
<p>INP 只观察以下交互类型:</p>
<ul>
<li>鼠标 click</li>
<li>触摸屏 tap</li>
<li>键盘按键 keystroke</li>
</ul>
<p>不观察以下类型</p>
<ul>
<li>鼠标 hover 和 scroll 不影响INP。</li>
<li>iframe 中的交互，web api 无法访问 iframe 的内容</li>
</ul>
<h3 id="一次交互有多个事件" tabindex="-1"><a class="header-anchor" href="#一次交互有多个事件"><span>一次交互有多个事件</span></a></h3>
<p>交互可能由两个部分组成，每个部分有多个事件。例如，keystroke 包含 keydown、keypress 和 keyup；tap 包含 pointerup 和 pointerdown。我们把其中持续时间最长的事件视作整个交互的延迟。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/vNosnKDYgBRnFmEvwm0c.svg" class="img-mid" />
<p>上图是一个 click 交互的处理过程。</p>
<ul>
<li>按下鼠标时，接收到一个输入，进行 mousedown 事件处理，显示一帧</li>
<li>释放鼠标，接收到另一个输入，进行 pointerup 和 click 的事件处理，显示下一帧</li>
</ul>
<p>第二部分的持续时间较长，它将作为整个交互的交互延迟。</p>
<h3 id="inp-与-fid-的区别" tabindex="-1"><a class="header-anchor" href="#inp-与-fid-的区别"><span>INP 与 FID 的区别</span></a></h3>
<p>INP 考虑页面的所有交互，FID 只考虑第一次交互。且 FID 只测量第一个交互的 input delay，不包含 processing time 和 presentation delay。</p>
<p>总的来说，FID 考虑的是用户对页面响应性的第一印象，INP 则可以全面评估。</p>
<h3 id="inp-没有报告" tabindex="-1"><a class="header-anchor" href="#inp-没有报告"><span>INP 没有报告</span></a></h3>
<p>如果页面不返回 INP，原因可能是：</p>
<ul>
<li>页面被加载，但用户从未做出 click、tap 等交互操作。</li>
<li>页面被加载，但用户只使用 hover 或 scroll 交互，INP 不支持这些方式。</li>
<li>页面是由 bot 访问的，比如爬虫或者无头浏览器。</li>
</ul>
<h2 id="inp-阈值" tabindex="-1"><a class="header-anchor" href="#inp-阈值"><span>INP 阈值</span></a></h2>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/INP.svg" width="300" class="img-mid" />
<h2 id="如何测量-inp" tabindex="-1"><a class="header-anchor" href="#如何测量-inp"><span>如何测量 INP</span></a></h2>
<p>INP 是基于 Event Timing API 的。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>interactionId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> duration <span class="token operator">=</span> entry<span class="token punctuation">.</span>processingEnd <span class="token operator">-</span> entry<span class="token punctuation">.</span>startTime<span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Interaction:'</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span>name<span class="token punctuation">,</span> duration<span class="token punctuation">,</span> entry<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'event'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">durationThreshold</span><span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="如何改进-inp" tabindex="-1"><a class="header-anchor" href="#如何改进-inp"><span>如何改进 INP</span></a></h2>
<p><a href="https://web.dev/optimize-inp/" target="_blank" rel="noopener noreferrer">Optimize INP<ExternalLinkIcon/></a></p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<p><a href="https://web.dev/inp/" target="_blank" rel="noopener noreferrer">Interaction to Next Paint (INP) - web.dev<ExternalLinkIcon/></a></p>
</div></template>


