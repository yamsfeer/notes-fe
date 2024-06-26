<template><div><h1 id="对象的内容" tabindex="-1"><a class="header-anchor" href="#对象的内容"><span>对象的内容</span></a></h1>
<h2 id="对象的内容-1" tabindex="-1"><a class="header-anchor" href="#对象的内容-1"><span>对象的内容</span></a></h2>
<p>在JavaScript中，对象的内容是由一些存储在特定命名位置的(任意类型的)值组成的，我们称之为<strong>属性</strong>。</p>
<p>在引擎内部，值的存储方式是多种多样的，<strong>一般并不会存在对象容器内部</strong>。</p>
<p>存储在对象容器内部的是这些属性的名称，它们就像指针(从技术角度来说就是引用)一样，指向这些值真正的存储位置。</p>
<p>访问对象对象属性的两种方式：</p>
<ul>
<li>用 . 操作符，称为“属性访问” （常用）</li>
<li>用 [] 操作符，称为“键访问”</li>
</ul>
<p><strong>在对象中，属性名永远都是字符串。</strong></p>
<p>如果你使用 string(字面量)以外的其他值作为属性名，那它首先会被<strong>转换为一个字符串</strong>。即使是数字也不例外。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">[</span><span class="token boolean">true</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"foo"</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"bar"</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">[</span>myObject<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"baz"</span><span class="token punctuation">;</span>

<span class="token comment">/* 事实上，就是对属性名调用toString方法 */</span>

 myObject<span class="token punctuation">[</span><span class="token string">"true"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// "foo"</span>
 myObject<span class="token punctuation">[</span><span class="token string">"3"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// "bar"</span>
 myObject<span class="token punctuation">[</span><span class="token string">"[object Object]"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// "baz"</span>
</code></pre></div><h3 id="可计算属性名" tabindex="-1"><a class="header-anchor" href="#可计算属性名"><span>可计算属性名</span></a></h3>
<p>ES6 增加了可计算属性名，用法：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> s <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'s'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> prefix <span class="token operator">=</span> <span class="token string">'prefix-'</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>s<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token string">'symbol value'</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>prefix <span class="token operator">+</span> <span class="token string">'suffix'</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token string">'other computed name'</span>
<span class="token punctuation">}</span>

obj<span class="token punctuation">[</span>s<span class="token punctuation">]</span> <span class="token comment">// symbol value</span>
obj<span class="token punctuation">[</span><span class="token string">'prefix-suffix'</span><span class="token punctuation">]</span> <span class="token comment">// other computed name</span>
</code></pre></div><h3 id="没有-方法-只有-属性" tabindex="-1"><a class="header-anchor" href="#没有-方法-只有-属性"><span>没有“方法”只有“属性”</span></a></h3>
<p><strong>无论返回值是什么类型，每次访问对象的属性就是属性访问。</strong></p>
<p>如果属性访问返回的是一个 函数，那它也并不是一个“方法”。</p>
<p>属性访问返回的函数和其他函数没有任何区别(除了可能发生的隐式绑定 this)。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> <span class="token string">"foo"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> someFoo <span class="token operator">=</span> foo<span class="token punctuation">;</span> <span class="token comment">// 对 foo 的变量引用</span>
<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">someFoo</span><span class="token operator">:</span> foo
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre></div><p>someFoo 和 myObject.someFoo 只是对于同一个函数的不同引用，并不能说明这个函数是特别的或者“属于”某个对象。</p>
<h3 id="复制对象" tabindex="-1"><a class="header-anchor" href="#复制对象"><span>复制对象</span></a></h3>
<p>要复制一个对象，首先要考虑的是<strong>浅拷贝</strong>还是<strong>深拷贝</strong>。</p>
<p><strong>深拷贝</strong>比较复杂，因为原对象可能有循环引用，深复制可能会造成死循环。</p>
<ul>
<li>
<p>深拷贝</p>
<p>对于 JSON 安全(可以被序列化为一个 JSON 字符串并且可以根据这个字符串解析出一个结构和值完全一样的对象)的对象来说，可用：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> newObj <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> someObj <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>当然，这种方法需要保证对象是 JSON 安全的，所以只适用于部分情况。</p>
</li>
<li>
<p>浅拷贝</p>
<p>Object.assign 方法的第一个参数是目标对象，之后还可以跟一个或多个源对象。</p>
<p>它会遍历一个或多个源对象的所有<strong>可枚举(enumerable)</strong> 的**自有键(owned key)**并把它们复制(<strong>使用 = 操作符赋值</strong>)到目标对象，最后返回目标对象。</p>
<p><strong>由于 Object.assign 就是使用 = 操作符来赋值，所以源对象属性的一些特性(比如 writable)不会被复制到目标对象。</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">anotherFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">var</span> anotherObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> anotherArray <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> anotherObject<span class="token punctuation">,</span> <span class="token comment">// 引用，不是复本!</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span> anotherArray<span class="token punctuation">,</span> <span class="token comment">// 另一个引用!</span>
  <span class="token literal-property property">d</span><span class="token operator">:</span> anotherFunction
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> newObj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> myObject <span class="token punctuation">)</span><span class="token punctuation">;</span>

newObj<span class="token punctuation">.</span>b <span class="token operator">===</span> anotherObject<span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre></div></li>
</ul>
<h2 id="属性描述符" tabindex="-1"><a class="header-anchor" href="#属性描述符"><span>属性描述符</span></a></h2>
<p>从ES5开始，所有属性都具备了属性描述符。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/*
	{
		value: 2,
		writable: true,
		enumerable: true,
		configurable: true
	}
*/</span>
</code></pre></div><ul>
<li>
<p>writable：可以决定<strong>是否可以修改属性的值</strong>。若为false，对属性值的修改会<strong>静默失败(silently failed)，严格模式下会报错</strong>。</p>
</li>
<li>
<p>configurable</p>
<p>configurable决定<strong>是否可以用defineProperty修改属性描述符</strong>。</p>
<p>不管是不是处于严格模式，尝试修改一个不可配置的属性描述符都会出错。</p>
<p><strong>把 configurable 修改成 false 是单向操作，无法撤销！</strong></p>
<p><strong>configurable:false 还会禁止删除这个属性！</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span><span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token keyword">delete</span> myObject<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
myObject<span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// undefined</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span> myObject<span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// 2</span>
<span class="token keyword">delete</span> myObject<span class="token punctuation">.</span>a<span class="token punctuation">;</span>
myObject<span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// 2 静默失败</span>
</code></pre></div><p><em>不要把 delete 看作一个释放内存的工具(就像 C/C++ 中那样)，它就是一个删除对象属性的操作，仅此而已。</em></p>
</li>
<li>
<p>enumerable</p>
<p>这个描述符控制的是属性<strong>是否会出现在对象的属性枚举中</strong>（比如 for-in循环）。</p>
<p>如果把 enumerable 设置成 false，这个属性就不会出现在枚举中，虽然仍然可以正常访问它。</p>
</li>
<li>
<p>后面会提到的<strong>访问描述符</strong>（有getter / setter 的属性），也属于属性描述符。</p>
</li>
</ul>
<h2 id="对象的不变性" tabindex="-1"><a class="header-anchor" href="#对象的不变性"><span>对象的不变性</span></a></h2>
<ul>
<li>
<p>对象常量属性</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 结合 writable:false 和 configurable:false 就可以创建一个真正的常量属性(不可修改、 重定义或者删除)</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"FAVORITE_NUMBER"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">42</span><span class="token punctuation">,</span>
  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div></li>
<li>
<p>禁止拓展(preventExtensions)</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">preventExtensions</span><span class="token punctuation">(</span> myObject <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 禁止一个对象添加新属性并且保留已有属性</span>

<span class="token comment">/* 在非严格模式下，创建属性 b 会静默失败。
	 在严格模式下，将会抛出 TypeError 错误。 */</span>
myObject<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">.</span>b<span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre></div></li>
<li>
<p>密封(seal)</p>
<p><strong>无法拓展、不能配置或删除属性、能修改属性的值</strong>。</p>
<p>Object.seal 会创建一个“密封”的对象，密封之后<strong>不能添加新属性</strong>，也<strong>不能重新配置或者删除任何现有属性</strong>(虽然可以修改属性值)。</p>
<p>这个方法实际上会在一个现有对象上调用 Object.preventExtensions，并把所有现有属性标记为 configurable:false。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">seal</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
obj<span class="token punctuation">.</span>b<span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre></div></li>
<li>
<p>冻结(freeze)</p>
<p><strong>密封基础上再加无法修改值的效果</strong>。</p>
<p>Object.freeze 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal 并把所有“数据访问”属性标记为 writable:false。</p>
<p>这个方法是你可以应用在对象上的<strong>级别最高的不可变性</strong>，它会禁止对于对象本身及其任意直接属性的修改。</p>
</li>
</ul>
<p><strong>以上所有的方法创建的都是浅不变形，也就是说，它们只会影响目标对象和它的直接属性。</strong></p>
<p><strong>如果目标对象引用了其他对象(数组、对象、函数，等)，其他对象的内容不受影响，仍然是可变的。</strong></p>
<p><em>在 JavaScript 程序中很少需要深不可变性。有些特殊情况可能需要这样做，但是根据通用的设计模式，如果你发现需要密封或者冻结所有的对象，那你或许应当退一步，重新思考一下程序的设计，让它能更好地应对对象值的改变。</em></p>
<h3 id="get" tabindex="-1"><a class="header-anchor" href="#get"><span>[[Get]]</span></a></h3>
<p>在对一个对象进行属性访问时，比如<code v-pre>obj.prop</code>，实际上是进行了**[[Get]]操作（类似函数调用[[Get()]]）**。</p>
<p>[[Get]]操作的具体步骤：</p>
<ol>
<li>对象默认的内置 [[Get]] 操作首先在对象中查找是否有名称相同的属性， 如果找到就会返回这个属性的值。</li>
<li>如果没有找到名称相同的属性，按照 [[Get]] 算法的定义，会遍历可能存在的 <strong>[[Prototype]] 链， 也就是原型链</strong>。</li>
<li>如果无论如何都没有找到名称相同的属性，那 [[Get]] 操作会返回值 undefined</li>
</ol>
<h3 id="put" tabindex="-1"><a class="header-anchor" href="#put"><span>[[Put]]</span></a></h3>
<p>当给对象进行属性赋值时会触发[[Put]]操作。</p>
<p>然而，[[Put]] 被触发时，实际的行为取决于许多因素，包括<strong>对象中是否已经存在这个属性(这是最重要的因素)</strong>。</p>
<ul>
<li>如果已经存在这个属性
<ol>
<li>属性是否是访问描述符（比如<code v-pre>{get a() {return 'a'}}</code>）？如果是并且存在setter就调用setter。</li>
<li>属性描述符中writable是否是false？如果是，在非严格模式下静默失败，在严格模式下抛出 TypeError 异常。</li>
<li>如果都不是，将该值设置为属性的值。</li>
</ol>
</li>
<li>如果不存在
<ul>
<li>情况复杂，参考原型链章节。</li>
</ul>
</li>
</ul>
<h3 id="访问描述符-getter-和-setter" tabindex="-1"><a class="header-anchor" href="#访问描述符-getter-和-setter"><span>访问描述符（getter 和 setter）</span></a></h3>
<p>对象默认的 [[Put]] 和 [[Get]] 操作分别可以控制属性值的设置和获取。</p>
<p>在 ES5 中可以使用 getter 和 setter 部分改写默认操作，但是只能应用在单个属性上，无法应用在整个对象上。</p>
<p>getter 是一个隐藏函数，会在获取属性值时调用。setter 也是一个隐藏函数，会在设置属性值时调用。</p>
<p>对于访问描述符来说，JavaScript 会<strong>忽略它们的 value 和 writable 特性</strong>，取而代之的是<strong>关心 set 和 get(还有 configurable 和 enumerable)特性</strong>。</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token keyword">get</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// 属性描述符</span>
  <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>a <span class="token operator">*</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 确保 b 会出现在对象的属性列表中</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>对于<code v-pre>myObject.a</code>，如果只进行了getter的定义，那么对属性赋值时会<strong>忽略赋值操作，不会抛出错误</strong>。</p>
<p>即使进行了setter的定义，因为getter限定了返回，setter的操作也是无意义的。</p>
<p>setter 会覆盖单个属性默认的 [[Put]]操作。</p>
<p>通常来说 getter 和 setter 是成对出现的(只定义一个的话 通常会产生意料之外的行为)</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">get</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_a_<span class="token punctuation">;</span> <span class="token comment">// 名称 _a_ 只是一种惯例，没有任何特殊的行为，和其他普通属性 一样。</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token keyword">set</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_a_ <span class="token operator">=</span> val <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
myObject<span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// 4</span>
</code></pre></div><h3 id="判断对象是否有某属性" tabindex="-1"><a class="header-anchor" href="#判断对象是否有某属性"><span>判断对象是否有某属性</span></a></h3>
<p>参考如下代码：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token keyword">undefined</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/* 无法判断返回undefined是因为属性不存在
	 还是属性的值是undefined */</span>
obj<span class="token punctuation">.</span>a <span class="token comment">// undefined</span>
obj<span class="token punctuation">.</span>b <span class="token comment">// undefined</span>
</code></pre></div><p>判断方法：</p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span><span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token string">"a"</span> <span class="token keyword">in</span> myObject<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token punctuation">(</span><span class="token string">"b"</span> <span class="token keyword">in</span> myObject<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
myObject<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span> <span class="token string">"a"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
myObject<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span> <span class="token string">"b"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>

<span class="token comment">// 如果hasOwnProperty函数不在对象的原型链上</span>
<span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
</code></pre></div><p><strong>in 操作符会检查属性是否在对象及其 [[Prototype]] 原型链中。</strong></p>
<p><strong>hasOwnProperty 只会检查属性是否在对象中，不会检查 [[Prototype]] 链。</strong></p>
<h3 id="枚举" tabindex="-1"><a class="header-anchor" href="#枚举"><span>枚举</span></a></h3>
<p>“可枚举”就相当于“可以出现在<strong>对象属性的遍历中</strong>。</p>
<p><strong>注意，枚举是否检查原型链很重要。</strong></p>
<div class="language-javascript" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> myObject <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">"a"</span><span class="token punctuation">,</span>
  <span class="token comment">// 让 a 像普通属性一样可以枚举</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">2</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>myObject<span class="token punctuation">,</span> <span class="token string">"b"</span><span class="token punctuation">,</span>
  <span class="token comment">// 让b不可枚举</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">3</span> <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

myObject<span class="token punctuation">.</span>b<span class="token punctuation">;</span> <span class="token comment">// 3</span>
<span class="token comment">// 可以通过 in 操作符来判断是否存在</span>
<span class="token punctuation">(</span><span class="token string">"b"</span> <span class="token keyword">in</span> myObject<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
myObject<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span> <span class="token string">"b"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> k <span class="token keyword">in</span> myObject<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> k<span class="token punctuation">,</span> myObject<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 只能循环得到a</span>
<span class="token punctuation">}</span>

myObject<span class="token punctuation">.</span><span class="token function">propertyIsEnumerable</span><span class="token punctuation">(</span> <span class="token string">"a"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
myObject<span class="token punctuation">.</span><span class="token function">propertyIsEnumerable</span><span class="token punctuation">(</span> <span class="token string">"b"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span> myObject <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ["a"]</span>
Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyNames</span><span class="token punctuation">(</span> myObject <span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ["a", "b"]</span>
</code></pre></div><ul>
<li>
<p><code v-pre>in</code> 操作符会检查属性是否在对象中，<strong>会检查 [[Prototype]] 链</strong>。</p>
</li>
<li>
<p><code v-pre>Object.hasOwnProperty</code> 只会检查属性是否在对象中，<strong>不检查 [[Prototype]] 链</strong>。</p>
</li>
<li>
<p><code v-pre>Object.propertyIsEnumerable</code>会检查给定的属性名<strong>是否可枚举，不检查 [[Prototype]] 链</strong>。</p>
</li>
<li>
<p><code v-pre>Object.keys</code>会返回一个数组，<strong>包含所有可枚举属性</strong>，<strong>不检查 [[Prototype]] 链</strong>。</p>
</li>
<li>
<p><code v-pre>Object.getOwnPropertyNames</code>会返回一个数组，<strong>包含所有属性，无论它们是否可枚举</strong>，<strong>不检查 [[Prototype]] 链</strong>。</p>
</li>
</ul>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2>
<p>JavaScript中创建对象的两种形式：</p>
<ul>
<li>字面形式：<code v-pre>var obj = {};</code></li>
<li>构造形式：<code v-pre>var arr = new Array();</code></li>
</ul>
<p>JavaScript数据类型：</p>
<ul>
<li>string</li>
<li>number</li>
<li>boolean</li>
<li>null</li>
<li>undefined</li>
<li>symbol</li>
<li>object
<ul>
<li>function</li>
<li>array</li>
<li>error</li>
<li>...</li>
</ul>
</li>
</ul>
<p>对象的属性访问方式：</p>
<ul>
<li>obj.propName</li>
<li>obj['propName']</li>
</ul>
<p>访问属性时，引擎实际上会调用内部的默认 [[Get]] 操作(在设置属性值时是 [[Put]])，</p>
<p>[[Get]] 操作会检查对象本身是否包含这个属性，如果没找到的话还会查找 [[Prototype]] 链。</p>
<p>属性描述符：</p>
<ul>
<li>value</li>
<li>writable</li>
<li>enumerable</li>
<li>configurable</li>
</ul>
<p>设置对象不可变级别：</p>
<ul>
<li>Object.preventExtensions</li>
<li>Object.seal</li>
<li>Object.freeze</li>
</ul>
<p>属性不一定包含值——它们可能是具备 getter/setter 的“访问描述符”。</p>
<p>你可以使用 ES6 的 for..of 语法来遍历数据结构(数组、对象，等等)中的值，for..of 会寻找内置或者自定义的 @@iterator 对象并调用它的 next() 方法来遍历数据值。</p>
</div></template>


