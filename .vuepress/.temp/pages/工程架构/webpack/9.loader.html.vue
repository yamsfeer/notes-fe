<template><div><h1 id="loader" tabindex="-1"><a class="header-anchor" href="#loader"><span>loader</span></a></h1>
<p>loader 机制是 webpack 的核心。</p>
<p>webpack 从入口文件开始，根据 import、require 等语句，找出整个项目的依赖关系树，然后遍历这棵树，将不同的文件类型交给相应的 loader 处理，然后将处理结果添加到最后的 bundle.js 文件中。</p>
<p>webpack 本身只能处理 js 文件，当遇到其他资源比如 css 文件时，需要其他 loader 处理。在 webpack 配置文件中加入如下配置即可使用 loader 处理 css 文件。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// 注意，loader 的处理顺序是从后往前</span>
        <span class="token comment">// 即先用 css-loader 处理完，结果传给 style-loader</span>
        <span class="token string">'style-loeader'</span><span class="token punctuation">,</span>
        <span class="token string">'css-loader'</span>
      <span class="token punctuation">]</span><span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>常见的 loader 有：</p>
<ul>
<li>css-loader：将 css 代码转成 js 模块</li>
<li>style-loader：将 css 代码通过style 标签添加到 html 中</li>
<li>file-loader：处理图片等资源</li>
<li>url-loader：将文件转为 data-url 的格式，后面有介绍</li>
</ul>
<p>可以说，loader 为 webpack 提供了处理所有类型资源文件的能力。事实上，loader 大致可以分为三类：</p>
<ul>
<li>编译转换类：如 css-loader，babel-loader</li>
<li>文件操作类：如 file-loeader</li>
<li>代码检查类，如 eslint-loader</li>
</ul>
<h3 id="data-url" tabindex="-1"><a class="header-anchor" href="#data-url"><span>data-url</span></a></h3>
<p>data-url 分为协议、媒体类型和编码、文件内容三部分，具体格式为：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>data:[&lt;mediatype>][;base64],&lt;data>
</code></pre></div><p>举几个例子：</p>
<div class="language-text" data-ext="text" data-title="text"><pre v-pre class="language-text"><code>data:text/html;charset=utf-8,&lt;h1>content&lt;/h1> // h1 标签
data:image/png;base64,AJSJrii8eAKD...AJSzdadCKKzod // base 64 图片
</code></pre></div><h3 id="编写一个-loader" tabindex="-1"><a class="header-anchor" href="#编写一个-loader"><span>编写一个 loader</span></a></h3>
<p>下面以 markdown-loader 为例，介绍编写 loader 的过程。</p>
<p>loader 其实是一个函数，它接收源文件的内容，并返回一个处理后的结果。这里我们用 marked 包将 markdown 文本转换成 html 文本。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// markdown-loader.js</span>
<span class="token keyword">const</span> marked <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'marked'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>marked

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token parameter">source</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token function">marked</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span> <span class="token comment">// 处理 markdown 文本，获得 html 文本</span>
  <span class="token keyword">return</span> html
<span class="token punctuation">}</span>
</code></pre></div><p>值得注意的是，loader 函数返回的结果是会直接以<strong>字符串拼接</strong>的形式加入到 bundle 文件中的，所以，loader 的返回值需要是规范的 javascript 代码。于是，我们用 <code v-pre>module.exports</code> 将 html 文本导出。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// markdown-loader.js</span>
<span class="token keyword">const</span> marked <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'marked'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>marked

module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token parameter">source</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token function">marked</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">module.exports = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> <span class="token comment">// 返回值会直接拼接到 bundle 中</span>
<span class="token punctuation">}</span>
</code></pre></div><p>之所以要用 <code v-pre>JSON.stringify</code> 处理 html 文本是因为 html 中的换行符或引号等会造成代码错误。</p>
<p>处理一段 markdown 代码：</p>
<div class="language-markdown" data-ext="md" data-title="md"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> title1</span>
<span class="token title important"><span class="token punctuation">##</span> title2</span>
</code></pre></div><p>可以看到打包后的模块代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">module</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token string">"&lt;h1 id=\"title1\">title1&lt;/h1>\n&lt;h2 id=\"title2\">title2&lt;/h2>\n"</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>编写完 loader 后，在配置文件中使用该 loader 处理 markdown 文件。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>
      <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.md$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
      <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token string">'./markdown-loader.js'</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>另外，我们也可以用 <code v-pre>export default</code> 的方式导出 html 文本。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token parameter">source</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">export default </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token function">marked</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span>
</code></pre></div><p>打包后的结果：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">__unused_webpack_module<span class="token punctuation">,</span> __webpack_exports__<span class="token punctuation">,</span> __webpack_require__</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  __webpack_require__<span class="token punctuation">.</span><span class="token function">r</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">)</span><span class="token punctuation">;</span>
  __webpack_require__<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>__webpack_exports__<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"default"</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>__WEBPACK_DEFAULT_EXPORT__<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> __WEBPACK_DEFAULT_EXPORT__ <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token string">"&lt;h1 id=\"title1\">title1&lt;/h1>\n&lt;h2 id=\"title2\">title2&lt;/h2>\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></div></template>


