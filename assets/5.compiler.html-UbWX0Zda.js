import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as n,c as t,a as s}from"./app-BPFsuHku.js";const e={},p=s(`<h1 id="compiler" tabindex="-1"><a class="header-anchor" href="#compiler"><span>compiler</span></a></h1><p>对于 vue 而言，编译就是将模板转化成 JavaScript 代码的过程。具体来说，是将模板编译成渲染函数。</p><div class="language-html" data-ext="html" data-title="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">:id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>appId<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>vue<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>以上 vue 模板编译后的 render 函数如下。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">&#39;h1&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> appId <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>vue 模板编译器的工作流程如下图。</p><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/compiler-workflow.svg" alt=""></p><p>我们用 parse 函数完成词法分析和语法分析，整个编译过程可以分成三步：parse、transform、generate。</p><div class="language-javascript" data-ext="js" data-title="js"><pre class="language-javascript"><code><span class="token keyword">const</span> template <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">&lt;div&gt;&lt;h1 v-if=&quot;ok&quot;&gt;vue template&lt;/h1&gt;&lt;/div&gt;</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> templateAST <span class="token operator">=</span> <span class="token function">parse</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span>
<span class="token keyword">const</span> jsAST <span class="token operator">=</span> <span class="token function">transform</span><span class="token punctuation">(</span>templateAST<span class="token punctuation">)</span>
<span class="token keyword">const</span> code <span class="token operator">=</span> <span class="token function">generate</span><span class="token punctuation">(</span>jsAST<span class="token punctuation">)</span>
</code></pre></div>`,9),o=[p];function c(r,l){return n(),t("div",null,o)}const m=a(e,[["render",c],["__file","5.compiler.html.vue"]]),k=JSON.parse('{"path":"/vue3/5.compiler.html","title":"compiler","lang":"zh-CN","frontmatter":{"description":"compiler 对于 vue 而言，编译就是将模板转化成 JavaScript 代码的过程。具体来说，是将模板编译成渲染函数。 以上 vue 模板编译后的 render 函数如下。 vue 模板编译器的工作流程如下图。 我们用 parse 函数完成词法分析和语法分析，整个编译过程可以分成三步：parse、transform、generate。","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/vue3/5.compiler.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"compiler"}],["meta",{"property":"og:description","content":"compiler 对于 vue 而言，编译就是将模板转化成 JavaScript 代码的过程。具体来说，是将模板编译成渲染函数。 以上 vue 模板编译后的 render 函数如下。 vue 模板编译器的工作流程如下图。 我们用 parse 函数完成词法分析和语法分析，整个编译过程可以分成三步：parse、transform、generate。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/compiler-workflow.svg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"compiler\\",\\"image\\":[\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/compiler-workflow.svg\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":0.48,"words":144},"filePathRelative":"vue3/5.compiler.md","localizedDate":"2024年4月12日","autoDesc":true}');export{m as comp,k as data};