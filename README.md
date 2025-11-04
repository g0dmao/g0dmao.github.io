# 更新日志（自2025.08）

## 2025

- 11.04
  
  - 有一天，我萌生了一个念头：重新设计我的博客主题，把它变得格外“简约”。虽然说不清具体缘由，但直觉告诉我，这样反而会让我更满意——毕竟我一直钟爱极简风格。因此，我打算尽可能避免多余的装饰，只保留必要的 CSS 样式，把各个元素调整到恰当的位置，让整体看起来既舒服又易读。这些样式全都服务于内容的协调与可读性，让博客回归最本真的状态。

- 10.01
  
  - 调整主页样式，增加描述，能更多地展示个性化内容了。

- 09.29
  
  - 添加blockquote元素样式
  - 改用blockquote元素作为文章中的提示元素，朴实且无华，而不是使用插件，
  - 优化代码块、表格样式。

- 09.28
  
  - 修改了主页样式，移除主页的数据统计，改为用一个新页面展示。
  - 重新设计了footer样式。
  - 新增page页面的样式，这样就可以分开page页面和post页面了。
  - 优化导航栏视觉效果。
  - 修复目录生成的bug

- 09.24
  
  - 优化了侧栏目录样式，支持自动展开、提示当前阅读章节等。
  - 优化文章页面样式，优化阅读体验。

- 09.18
  
  - 着重调整了文章页面样式，优化了阅读体验，调整思路为模仿wiki的文章页面。
  - 改用prismjs作为代码高亮，因为highlightjs对博客的响应式布局有影响。
  - 代码块新增复制按钮。

- 09.12
  
  - 在文章页面，新增了版权声明、作者说明、ai创作说明，新增文章标签 ai、ai_ver、copyright。
  - 改用[hexo-generator-index-custom ](https://github.com/im0o/hexo-generator-index-custom)索引生成器代替官方索引生成器，它能生成隐藏或置顶文章的索引。
  - 优化文章页面部分显示。
  - 文章页面顶部新增进度条，提示当前阅读进度。
  - 隐藏博客数据在主页的显示，因为影响了页面的简洁性。
  - 导航栏新增欢迎文字。
  - 将主页标题修改展现形式为艺术字。

- 09.11
  
  - 新增插件[hexo-graph](https://github.com/codepzj/hexo-graph)用于博客数据可视化，并添加在主页。
  - 优化文章页面显示。重新修改了h2、h3的样式，使文章标题更好区分。
  - 添加本地搜索功能。

- 09.09
  
  - 优化文章页面显示。优化了表格、代码块的样式。

- 08.30
  
  - 优化文章页面显示 。

- 08.25 
  
  - 自编写主题初版完成。
  - 切换博客主题为新的自编主题。

# 插件依赖

目前博客使用了如下插件：

- 索引生成器：[hexo-generator-index-custom ](https://github.com/im0o/hexo-generator-index-custom)
- 博客数据可视化：[hexo-graph](https://github.com/codepzj/hexo-graph)
- 文章链接生成：[hexo-abbrlink](https://github.com/ohroy/hexo-abbrlink)
- 渲染器：[hexo-renderer-markdown-it-plus](https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus)
- 警告卡片：[hexo-admonition](https://github.com/lxl80/hexo-admonition)
- 文章加密：[hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt)
- RSS生成：[hexo-feed](https://github.com/sergeyzwezdin/hexo-feed)
- 用于本地搜索的索引生成：[hexo-generator-search](https://github.com/wzpan/hexo-generator-search)
