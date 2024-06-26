<template><div><h1 id="cls-累积布局偏移" tabindex="-1"><a class="header-anchor" href="#cls-累积布局偏移"><span>CLS 累积布局偏移</span></a></h1>
<p>CLS ( Cumulative Layout Shift ) 累积布局偏移。</p>
<p>理解 CLS 前需要介绍三个概念：</p>
<ul>
<li>布局偏移 ( layout shift )：可见元素的起始位置在两帧之间发生改变</li>
<li>会话窗口 ( session window )：连续的布局偏移，每次偏移相隔不超过 1s，整个窗口不超过 5s。</li>
<li>最大窗口：布局偏移分数之和最大的会话窗口。</li>
</ul>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/Screenshot 2023-05-09 at 20.52.22.png" alt="累计布局偏移" style="zoom:40%;" class="img-mid" />
<p>图中每个蓝条表示一次布局偏移，两条虚线构成一个会话窗口，每个窗口不超过 5s，窗口内的蓝条之间间隔不超过 1s，蓝条高度之和是该窗口的布局偏移分数，蓝条高度之和最大的窗口就是最大窗口。</p>
<p>CLS 描述的是页面生命周期内，元素的移动程度。具体来说，就是最大窗口的布局偏移分数。</p>
<h2 id="什么是布局偏移-layout-shift" tabindex="-1"><a class="header-anchor" href="#什么是布局偏移-layout-shift"><span>什么是布局偏移 ( layout shift )</span></a></h2>
<p>可见元素的起始位置在两帧之间发生改变，就产生了布局偏移。这些元素称为<strong>不稳定元素</strong>。</p>
<p>注意是元素的<strong>起始位置改变</strong>才算布局偏移。动态添加 DOM 元素、元素改变大小都不算布局偏移。</p>
<h2 id="如何计算布局偏移" tabindex="-1"><a class="header-anchor" href="#如何计算布局偏移"><span>如何计算布局偏移</span></a></h2>
<p>不稳定元素的位移有两个度量：影响分数和距离分数。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>布局偏移分数 = 影响分数 * 距离分数
</code></pre></div><h3 id="影响分数-impact-fraction" tabindex="-1"><a class="header-anchor" href="#影响分数-impact-fraction"><span>影响分数 ( Impact fraction )</span></a></h3>
<p>变化过程中，不稳定元素所占的可见区域与总可视区域的比值，就是影响分数。</p>
<p>影响分数衡量的是不稳定元素对可视区域的影响程度。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/BbpE9rFQbF8aU6iXN1U6.png" alt="包含一个*不稳定元素*的影响分数示例" style="zoom: 40%;" class="img-mid" />
<p>上图中，文本元素原本占 50% 可视区域，后来元素下移了可视区域高度的 25%。红色虚线框表示的是受不稳定元素影响的区域，它占总可视区域的 75%，因此影响分数为 0.75 。</p>
<h3 id="距离分数-distance-fraction" tabindex="-1"><a class="header-anchor" href="#距离分数-distance-fraction"><span>距离分数 ( Distance fraction )</span></a></h3>
<p>距离分数衡量的是不稳定元素位移的距离。</p>
<p>不稳定元素的最大位移，与可视区域的最大维度的比值就是距离分数。</p>
<ul>
<li>最大位移：水平或垂直位移的较大者</li>
<li>最大维度：宽高中的较大者</li>
</ul>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/ASnfpVs2n9winu6mmzdk.png" alt="包含一个*不稳定元素*的距离分数示例" style="zoom: 40%;" class="img-mid" />
<p>上图中，不稳定元素的最大位移为高度的 25%，最大维度是可视区域的高度，因此距离分数为 0.25。</p>
<p>综上，可计算布局偏移分数。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>布局偏移分数 = 影响分数 * 距离分数 = 0.75 * 0.25 = 0.1875
</code></pre></div><div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>最初，布局偏移分数只根据影响分数计算。引入距离分数是为了避免在大元素发生微小位移的情况下进行过度惩罚。</p>
</div>
<h3 id="动态添加-dom-元素" tabindex="-1"><a class="header-anchor" href="#动态添加-dom-元素"><span>动态添加 DOM 元素</span></a></h3>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/xhN81DazXCs8ZawoCj0T.png" alt="包含稳定和*不稳定元素*及可视区域剪裁的布局偏移示例" style="zoom:40%;" class="img-mid" />
<p>假设按钮被动态添加到灰色元素底部，使得绿色背景元素被往下推，且有一部分超出可视区域。</p>
<p>这个过程中，区分哪些是稳定与不稳定元素。</p>
<ul>
<li>
<p>灰色元素大小改变，但起始位置不变，是稳定元素。</p>
</li>
<li>
<p>按钮一开始不在 DOM 中，起始位置不变，是稳定元素</p>
</li>
<li>
<p>绿色元素的起始位置发生了变化，是不稳定元素</p>
<p>注意，绿色元素的一部分在可视区域外，计算影响分数时忽略不可见区域。</p>
</li>
</ul>
<p>绿色元素的移动区域 ( 红色虚线框 ) 占可视区域的 50%，因此影响分数为 0.5 。</p>
<p>向下移动的距离为可视区域高度的 14%，因此距离分数为 0.14。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>布局偏移分数 = 0.5 * 0.14 = 0.07
</code></pre></div><h3 id="多个不稳定元素" tabindex="-1"><a class="header-anchor" href="#多个不稳定元素"><span>多个不稳定元素</span></a></h3>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/FdCETo2dLwGmzw0V5lNT.png" alt="包含多个稳定和*不稳定元素*的布局偏移示例" style="zoom:40%;" class="img-mid" />
<p>上图中，不稳定元素为：Dog、Horse、Zebra。</p>
<p>红色框表示这三个不稳定元素的影响区域，占可视区域的 38%，所以影响分数为 0.38 。</p>
<p>箭头表示不稳定元素相对于起始位置的位移距离。Zebra 的位移距离最大 ( 蓝色箭头 )，约为可视区域高度的 30%，所以距离分数为 0.3。</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>布局偏移分数 = 0.38 x 0.3 = 0.1172
</code></pre></div><h3 id="预期布局偏移与意外布局偏移" tabindex="-1"><a class="header-anchor" href="#预期布局偏移与意外布局偏移"><span>预期布局偏移与意外布局偏移</span></a></h3>
<p>预期内的布局偏移是可接受的，意外的布局偏移是要避免的。</p>
<h4 id="用户发起的布局偏移" tabindex="-1"><a class="header-anchor" href="#用户发起的布局偏移"><span>用户发起的布局偏移</span></a></h4>
<p>为响应用户交互造成布局偏移，只要偏移与交互时间上足够接近，就是预期内的。</p>
<p>在用户输入后 500ms 内发生的偏移会有 <code v-pre>hadRecentInput</code> 标志，表明它们可能是由用户交互引起预期偏移。</p>
<p>注意，hadRecentInput 只适用于不连续输入，如 tap、click 等。scroll、drag 等属于连续性输入。</p>
<h4 id="动画" tabindex="-1"><a class="header-anchor" href="#动画"><span>动画</span></a></h4>
<p>动画是在更新页面内容时不让用户感到突兀的好方法。CSS transform 动画可以在不触发布局偏移的情况下设置动画。</p>
<h2 id="cls-阈值" tabindex="-1"><a class="header-anchor" href="#cls-阈值"><span>CLS 阈值</span></a></h2>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/uqclEgIlTHhwIgNTXN3Y.svg" alt="良好的 CLS 值低于 0.1，较差的值大于 0.25 并且介于两者之间的任何东西都需要改进" width="400" class="img-mid" />
<h2 id="如何测量-cls" tabindex="-1"><a class="header-anchor" href="#如何测量-cls"><span>如何测量 CLS</span></a></h2>
<p>在 JavaScript 中测量 CLS 可以使用<a href="https://github.com/WICG/layout-instability" target="_blank" rel="noopener noreferrer">布局不稳定性 API<ExternalLinkIcon/></a>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> clsValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> clsEntries <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> sessionValue <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> sessionEntries <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token parameter">list</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> entry <span class="token keyword">of</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 只考虑没有 hadRecentInput 的布局偏移。</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>entry<span class="token punctuation">.</span>hadRecentInput<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> <span class="token punctuation">[</span>firstSessionEntry<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">,</span> lastSessionEntry<span class="token punctuation">]</span> <span class="token operator">=</span> sessionEntries

    <span class="token comment">// 偏移相隔少于 1s，且与会话第一个偏移相差不超过 5s</span>
    <span class="token comment">// 属于同一个会话窗口</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      sessionValue <span class="token operator">&amp;&amp;</span>
      entry<span class="token punctuation">.</span>startTime <span class="token operator">-</span> lastSessionEntry<span class="token punctuation">.</span>startTime <span class="token operator">&lt;</span> <span class="token number">1000</span> <span class="token operator">&amp;&amp;</span>
      entry<span class="token punctuation">.</span>startTime <span class="token operator">-</span> firstSessionEntry<span class="token punctuation">.</span>startTime <span class="token operator">&lt;</span> <span class="token number">5000</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      sessionValue <span class="token operator">+=</span> entry<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
      sessionEntries<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      sessionValue <span class="token operator">=</span> entry<span class="token punctuation">.</span>value<span class="token punctuation">;</span>
      sessionEntries <span class="token operator">=</span> <span class="token punctuation">[</span>entry<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 如果当前会话大于已有 CLS 值，更新 CLS。</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sessionValue <span class="token operator">></span> clsValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      clsValue <span class="token operator">=</span> sessionValue<span class="token punctuation">;</span>
      clsEntries <span class="token operator">=</span> sessionEntries<span class="token punctuation">;</span>

      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'CLS:'</span><span class="token punctuation">,</span> clsValue<span class="token punctuation">,</span> clsEntries<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'layout-shift'</span><span class="token punctuation">,</span> <span class="token literal-property property">buffered</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="如何改进-cls" tabindex="-1"><a class="header-anchor" href="#如何改进-cls"><span>如何改进 CLS</span></a></h2>
<ul>
<li>为 img 和 video 提供 width、height 属性，或使用 aspect-radio 预留所需空间</li>
<li>尽量不在现有内容的上方动态插入内容</li>
<li>使用 transform 动画</li>
</ul>
<p>深入了解如何改进 CLS 请参阅：</p>
<ul>
<li><a href="https://web.dev/optimize-cls/" target="_blank" rel="noopener noreferrer">optimize CLS<ExternalLinkIcon/></a></li>
<li><a href="https://web.dev/debug-layout-shifts" target="_blank" rel="noopener noreferrer">调试布局偏移<ExternalLinkIcon/></a></li>
<li><a href="https://developers.google.com/doubleclick-gpt/guides/minimize-layout-shift" target="_blank" rel="noopener noreferrer">最小化布局偏移<ExternalLinkIcon/></a></li>
</ul>
</div></template>


