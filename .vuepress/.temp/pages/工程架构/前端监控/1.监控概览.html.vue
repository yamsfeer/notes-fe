<template><div><h1 id="监控概览" tabindex="-1"><a class="header-anchor" href="#监控概览"><span>监控概览</span></a></h1>
<p>监控的作用：提升稳定性、提升用户体验、建立性能规范、</p>
<h2 id="监控流程" tabindex="-1"><a class="header-anchor" href="#监控流程"><span>监控流程</span></a></h2>
<h3 id="数据采集" tabindex="-1"><a class="header-anchor" href="#数据采集"><span>数据采集</span></a></h3>
<ul>
<li>PV 监控：页面切换后的 url、页面切换原因</li>
<li>JS 错误：错误的类型、描述、行列号、堆栈、错误上下文</li>
<li>性能监控：首屏加载各阶段耗时、性能指标、SPA 切换耗时、longtask</li>
<li>请求监控：请求的路径、状态码、请求头、响应头、请求各阶段的耗时</li>
<li>白屏监控：白屏发生的页面、关联的异常、相关上下文</li>
<li>静态资源监控</li>
<li>用户行为监控</li>
<li>自定义监控</li>
</ul>
<h3 id="组装上报" tabindex="-1"><a class="header-anchor" href="#组装上报"><span>组装上报</span></a></h3>
<ul>
<li>基础信息：页面路径、部署版本、网络等</li>
<li>采样逻辑：条件采样，如某些页面不采样</li>
<li>自定义逻辑执行：补充上下文、数据脱敏等</li>
<li>队列暂存和聚合发送</li>
<li><code v-pre>navigator.sendBeacon</code>：在页面关闭时发送，不阻塞页面卸载</li>
</ul>
<h3 id="存储" tabindex="-1"><a class="header-anchor" href="#存储"><span>存储</span></a></h3>
<ul>
<li>User-Agent 解析：浏览器版本、系统版本、机型、设备类型等</li>
<li>IP 解析：地理位置、网络运营商等信息</li>
<li>分类型落表落库</li>
<li>处理 JS 错误</li>
<li>clickhouse 存储</li>
</ul>
<h3 id="数据消费" tabindex="-1"><a class="header-anchor" href="#数据消费"><span>数据消费</span></a></h3>
<ul>
<li>总览分析</li>
<li>各功能模块消费视角、多维分析</li>
<li>单点查询</li>
<li>数据订阅、实时报警</li>
<li>issue 管理、归因分析</li>
</ul>
<h2 id="监控指标" tabindex="-1"><a class="header-anchor" href="#监控指标"><span>监控指标</span></a></h2>
<ul>
<li>
<p>可交互性</p>
<ul>
<li>卡顿监控</li>
<li>请求性能</li>
</ul>
</li>
<li>
<p>服务稳定性</p>
<ul>
<li>请求成功率</li>
</ul>
</li>
<li>
<p>加载速度</p>
<ul>
<li>首屏性能</li>
</ul>
</li>
<li>
<p>可用性</p>
<ul>
<li>渲染错误、白屏</li>
<li>请求错误</li>
<li>JS错误</li>
<li>静态资源错误</li>
</ul>
</li>
<li>
<p>业务数据</p>
<ul>
<li>
<p>PV / UV</p>
</li>
<li>
<p>自定义事件打点</p>
</li>
</ul>
</li>
</ul>
</div></template>


