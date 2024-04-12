import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,o as l,c as i,b as e,d as t,e as o,a as s}from"./app-BPFsuHku.js";const c={},h=e("h1",{id:"tti-可交互时间",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#tti-可交互时间"},[e("span",null,"TTI 可交互时间")])],-1),p=e("h2",{id:"什么是-tti",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#什么是-tti"},[e("span",null,"什么是 TTI")])],-1),d=e("p",null,"TTI ( Time to Interactive ) 可交互时间，从页面开始加载，到主要资源渲染完成并能快速响应用户输入的时间。",-1),m=e("p",null,"具体来说，可以用以下步骤测量 TTI。",-1),T=e("li",null,"从 FCP 开始",-1),u={href:"https://web.dev/custom-metrics/#long-tasks-api",target:"_blank",rel:"noopener noreferrer"},_=e("li",null,"向左寻找安静窗口前的最后一个长任务，如果没有长任务，则在 FCP 处停止。",-1),f=e("li",null,[e("strong",null,"安静窗口前最后一个长任务的结束时间就是 TTI"),t("，如果没有长任务，则 TTI 与 FCP 值相同。")],-1),g=s('<img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/WZM0n4aXah67lEyZugOT.svg" alt="显示 TTI 计算方式的页面加载时间轴" width="500" class="img-mid"><h3 id="为什么要优化-tti" tabindex="-1"><a class="header-anchor" href="#为什么要优化-tti"><span>为什么要优化 TTI</span></a></h3><p>服务端渲染 ( SSR ) 可以让页面看似具备交互性 ( 按钮在屏幕上可见 )，但实际上并不是，主线程也许正阻塞，或者 JavaScript 未完成加载。</p><p>当用户尝试与看似具备交互性的页面交互时，他们可能会：</p><ul><li>认为页面响应缓慢</li><li>认为页面已损坏，然后直接离开</li></ul><p>为避免这个问题，请将 FCP 和 TTI 之间的差值降至最低。如果难以优化，请指示当前还无法进行交互。</p><h2 id="tti-阈值" tabindex="-1"><a class="header-anchor" href="#tti-阈值"><span>TTI 阈值</span></a></h2><p><img src="https://raw.githubusercontent.com/yamsfeer/pic-bed/master/TTI-acceptable-score.png" alt=""></p><h2 id="如何测量" tabindex="-1"><a class="header-anchor" href="#如何测量"><span>如何测量</span></a></h2><p>虽然 TTI 可以线上测量，但用户交互会影响 TTI，所以最好线下测量。</p><h2 id="如何优化-tti" tabindex="-1"><a class="header-anchor" href="#如何优化-tti"><span>如何优化 TTI</span></a></h2>',11),I={href:"https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/",target:"_blank",rel:"noopener noreferrer"},E={href:"https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preload/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://developer.chrome.com/docs/lighthouse/performance/third-party-summary/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://developer.chrome.com/docs/lighthouse/performance/bootup-time/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/",target:"_blank",rel:"noopener noreferrer"},B={href:"https://developer.chrome.com/docs/lighthouse/performance/resource-summary/",target:"_blank",rel:"noopener noreferrer"};function C(w,A){const r=a("ExternalLinkIcon");return l(),i("div",null,[h,p,d,m,e("ol",null,[T,e("li",null,[t("向右寻找至少 5 秒的安静窗口 ( 没有"),e("a",u,[t("长任务"),o(r)]),t("且不超过两个正在处理的 GET 请求 )。")]),_,f]),g,e("ul",null,[e("li",null,[e("a",I,[t("缩小 JavaScript"),o(r)])]),e("li",null,[e("a",b,[t("预连接到所需的来源"),o(r)])]),e("li",null,[e("a",E,[t("预加载关键请求"),o(r)])]),e("li",null,[e("a",v,[t("减少第三方代码的影响"),o(r)])]),e("li",null,[e("a",y,[t("最小化关键请求深度"),o(r)])]),e("li",null,[e("a",k,[t("减少 JavaScript 执行时间"),o(r)])]),e("li",null,[e("a",x,[t("最小化主线程工作"),o(r)])]),e("li",null,[e("a",B,[t("保持较低的请求数和较小的传输大小"),o(r)])])])])}const S=n(c,[["render",C],["__file","TTI.html.vue"]]),F=JSON.parse('{"path":"/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TTI.html","title":"TTI 可交互时间","lang":"zh-CN","frontmatter":{"description":"TTI 可交互时间 什么是 TTI TTI ( Time to Interactive ) 可交互时间，从页面开始加载，到主要资源渲染完成并能快速响应用户输入的时间。 具体来说，可以用以下步骤测量 TTI。 从 FCP 开始 向右寻找至少 5 秒的安静窗口 ( 没有长任务且不超过两个正在处理的 GET 请求 )。 向左寻找安静窗口前的最后一个长任务，如...","head":[["meta",{"property":"og:url","content":"https://yamsfeer.github.io/notes-fe/%E5%B7%A5%E7%A8%8B%E6%9E%B6%E6%9E%84/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96/TTI.html"}],["meta",{"property":"og:site_name","content":"yamsfeer"}],["meta",{"property":"og:title","content":"TTI 可交互时间"}],["meta",{"property":"og:description","content":"TTI 可交互时间 什么是 TTI TTI ( Time to Interactive ) 可交互时间，从页面开始加载，到主要资源渲染完成并能快速响应用户输入的时间。 具体来说，可以用以下步骤测量 TTI。 从 FCP 开始 向右寻找至少 5 秒的安静窗口 ( 没有长任务且不超过两个正在处理的 GET 请求 )。 向左寻找安静窗口前的最后一个长任务，如..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/TTI-acceptable-score.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-12T16:21:32.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-12T16:21:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TTI 可交互时间\\",\\"image\\":[\\"https://raw.githubusercontent.com/yamsfeer/pic-bed/master/TTI-acceptable-score.png\\"],\\"dateModified\\":\\"2024-04-12T16:21:32.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"什么是 TTI","slug":"什么是-tti","link":"#什么是-tti","children":[{"level":3,"title":"为什么要优化 TTI","slug":"为什么要优化-tti","link":"#为什么要优化-tti","children":[]}]},{"level":2,"title":"TTI 阈值","slug":"tti-阈值","link":"#tti-阈值","children":[]},{"level":2,"title":"如何测量","slug":"如何测量","link":"#如何测量","children":[]},{"level":2,"title":"如何优化 TTI","slug":"如何优化-tti","link":"#如何优化-tti","children":[]}],"git":{"createdTime":1712938892000,"updatedTime":1712938892000,"contributors":[{"name":"yamsfeer","email":"feer.yams@gmail.com","commits":1}]},"readingTime":{"minutes":1.6,"words":480},"filePathRelative":"工程架构/性能优化/TTI.md","localizedDate":"2024年4月12日","autoDesc":true}');export{S as comp,F as data};