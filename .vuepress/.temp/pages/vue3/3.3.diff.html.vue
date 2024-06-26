<template><div><h1 id="diff" tabindex="-1"><a class="header-anchor" href="#diff"><span>diff</span></a></h1>
<p>diff 算法用来计算两组子节点的差异，并最大程度复用 dom 元素。</p>
<p>算法的整体策略是：深度优先，同层比较。即比较只会在同层级进行, 不会跨层级比较。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/diff算法-同层比较.svg" style="zoom:80%;" />
<p>以下 diff 算法的讲解针对的都是某一层的新旧节点列表。</p>
<h2 id="双端-diff" tabindex="-1"><a class="header-anchor" href="#双端-diff"><span>双端 diff</span></a></h2>
<p>双端 diff 算法的特点是，从新旧节点的两边向中间比较。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/diff算法-两端向中间.svg" style="zoom:80%;" />
<p>比较过程可以分为 3 步：</p>
<ol>
<li>新旧列表两端各有两个节点，两两比较，找出可复用的节点</li>
<li>如果第 1 步没有可复用节点，则在旧列表中找新列表的第一个节点</li>
<li>当某一列表遍历完成，处理剩余的节点</li>
</ol>
<h3 id="两端比较" tabindex="-1"><a class="header-anchor" href="#两端比较"><span>两端比较</span></a></h3>
<p>新旧列表两端的 4 个节点上下比较，有 5 中可能的情况。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/diff算法-vue2.svg" style="zoom:80%;" />
<ul>
<li>如果 oldStart = newStart 或者 oldEnd = newEnd，则两个指针都相应移动一步</li>
<li>如果 oldStart = newEnd，说明 oldStart 节点最终应该在 oldEnd 的后一个位置；同理，如果 oldEnd = newStart，说明 oldEnd 节点应该在 oldStart 的前一个位置</li>
<li>最后一种情况是，上下比较没能找到可复用节点</li>
</ul>
<h3 id="中间遍历" tabindex="-1"><a class="header-anchor" href="#中间遍历"><span>中间遍历</span></a></h3>
<p>如果两端没有找到相同节点，则在旧节点中遍历寻找与 newStart 节点</p>
<ul>
<li>如果找到，则移动到 oldStart 之前</li>
<li>如果没有，则新建节点并放在 oldStartVnode 之前</li>
</ul>
<h3 id="处理剩余节点" tabindex="-1"><a class="header-anchor" href="#处理剩余节点"><span>处理剩余节点</span></a></h3>
<ul>
<li>如果 oldStart &gt; oldEnd，说明旧列表遍历完成，将新列表的剩余节点全部新建。</li>
<li>如果 newStart &gt; newEnd，说明新列表遍历完成，将旧列表的剩余节点全部删除。</li>
</ul>
<h2 id="快速-diff" tabindex="-1"><a class="header-anchor" href="#快速-diff"><span>快速 diff</span></a></h2>
<p>快速 diff 算法可以分为三步：</p>
<ol>
<li>预处理</li>
<li>找出新节点在旧节点中的位置 source 列表，source 列表中的最长递增子序列是不需要移动的</li>
<li>移动、创建、删除其余节点</li>
</ol>
<h3 id="预处理" tabindex="-1"><a class="header-anchor" href="#预处理"><span>预处理</span></a></h3>
<p>预处理和双端 diff 算法中的两端比较是一样的，就是将</p>
<ul>
<li>oldStart = newStart</li>
<li>oldEnd = newEnd</li>
</ul>
<p>这两种情况先处理。它们是不需要移动的，只需调用 patch 对子树继续进行 diff 算法，毕竟 diff 算法是深度优先的。</p>
<h3 id="source-列表" tabindex="-1"><a class="header-anchor" href="#source-列表"><span>source 列表</span></a></h3>
<p>source 是一个数组，存储的是新列表节点在旧列表中的下标，如果不存在则为 -1。</p>
<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/diff算法-vue3.svg" style="zoom:80%;" />
<p>source 的作用是找出其中的最长递增子序列 LIS，它们是不需要移动的。</p>
<p>具体如何求一个数组的最长递增子序列后文会介绍，它是一个动态规划问题。</p>
<p><strong>从后向前遍历 source 数组</strong>，有 3 种情况：</p>
<ul>
<li>
<p>值为 -1：这是一个新节点，直接创建并插入尾部</p>
</li>
<li>
<p>值是 LIS 中的值：这个节点不需要移动</p>
</li>
<li>
<p>值不是 LIS 中的值：这个节点需要移动，将旧列表中这个 index 的节点放到尾部</p>
<p>比如上图中的 B 节点的 source 值为 1，且不是 LIS 中的值，那么 <code v-pre>old[1]</code> 需要被移动到尾部</p>
</li>
</ul>
<h3 id="最长递增子序列" tabindex="-1"><a class="header-anchor" href="#最长递增子序列"><span>最长递增子序列</span></a></h3>
<p>求一个序列中的最长递增子序列是一个动态规划问题。</p>
<p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/diff算法-最长递增子序列.svg" alt=""></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">/* 动态规划：
	 dp 数组表示当前位置到 nums 末尾的最长递增子序列长度
   dp 初始化为 1，因为一个字符最长序列就是本身
   当前位置的 dp 值，等于往后各递增数字的 dp 值中的最大值 */</span>

<span class="token comment">/* nums 10,9,2,5,3,8,7,13
    dp           3 2 2 1 */</span>
<span class="token keyword">function</span> <span class="token function">lengthOfLIS</span><span class="token punctuation">(</span><span class="token parameter">nums</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>nums<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> max <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 当前 dp 最大值</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> j <span class="token operator">=</span> i<span class="token punctuation">;</span> j <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 加入递增序列</span>
        max <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span> dp<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// dp[j] + 1 表示把 nums[i] 加入序列</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> max
  <span class="token punctuation">}</span>

  <span class="token comment">// 求出 dp 中的最大值</span>
  <span class="token keyword">let</span> ans <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> val <span class="token keyword">of</span> dp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ans <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>ans<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> ans
<span class="token punctuation">}</span>
</code></pre></div></div></template>


