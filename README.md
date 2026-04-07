# 个人主页 · 快速上手指南

> 用 Astro 搭建的温暖人文型个人主页

## 技术栈

- **框架**：Astro 4（静态站生成器，比 Jekyll 更现代）
- **托管**：GitHub Pages
- **评论**：Gitalk（基于 GitHub Issues）
- **统计**：不蒜子（极简浏览量统计）

---

## 本地开发

```bash
# 1. 进入目录
cd my-site

# 2. 安装依赖
npm install

# 3. 本地预览
npm run dev
# 打开 http://localhost:4321

# 4. 构建生产版本
npm run build
```

---

## 如何发布到 GitHub Pages

### 方法一：GitHub Actions（推荐）

在 GitHub 仓库的 **Settings → Pages → Source** 中选择 `GitHub Actions`，然后推送代码即可自动构建。

创建文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 方法二：手动构建推送

```bash
npm run build
# 将 dist/ 目录内容推送到 gh-pages 分支
```

---

## 目录结构说明

```
my-site/
├── src/
│   ├── data/
│   │   ├── posts.js      ← 博客文章数据（添加文章在这里）
│   │   ├── mri.js        ← MRI专区数据
│   │   └── life.js       ← 生活照片墙数据
│   ├── pages/
│   │   ├── index.astro   ← 首页
│   │   ├── blog/         ← 博客（列表+文章页）
│   │   ├── mri/          ← MRI专区
│   │   │   ├── notes/    ← 学习笔记
│   │   │   └── logs/     ← 实验日志
│   │   ├── notes/        ← 课程笔记
│   │   └── life/         ← 照片墙
│   ├── layouts/          ← 页面布局
│   ├── styles/
│   │   └── global.css    ← 全局样式（主要设计系统）
│   └── assets/            ← 图片资源
└── public/                ← 静态资源（favicon等）
```

---

## 如何写一篇新博客

**方法一：数据驱动（无需新建文件，推荐）**

在 `src/data/posts.js` 中添加一个对象：

```js
{
  slug: 'my-new-post',           // 唯一标识，英文
  title: '我的新文章标题',        // 中文标题
  date: '2026-04-01',            // 发布日期
  category: 'MRI',               // 分类
  tags: ['MRI', '深度学习'],     // 标签
  views: 0,                      // 初始阅读量
  excerpt: '文章摘要，100字以内', // 显示在列表页
  cover: 'https://...',          // 封面图URL
  pinned: false,                  // 是否置顶
}
```

然后创建对应的页面文件 `src/pages/blog/my-new-post.astro`：

```astro
---
import Post from '../../layouts/Post.astro';
---

<Post
  title="我的新文章标题"
  date="2026-04-01"
  category="MRI"
  tags={['MRI', '深度学习']}
  views={0}
  excerpt="文章摘要"
  cover="https://..."
  activeNav="blog"
>
  <!-- 在这里写 Markdown 格式的文章内容 -->
  ## 第一章

  正文内容...

</Post>
```

**方法二：动态博客列表（无需手动建页）**

如果你想让博客文章直接在 `posts.js` 中管理所有内容（不需要单独建页），我可以帮你修改为动态路由 `[slug].astro`，自动根据 `posts.js` 生成所有文章页。

---

## 如何配置 Gitalk 评论

Gitalk 需要一个 **GitHub 仓库** 来存储评论（以 Issue 的形式）。

### 第一步：创建一个空仓库

1. 打开 https://github.com/new
2. **Repository name**: 填 `blog-comments`（或其他名字）
3. **Private** 打勾（评论仓库不需要公开）
4. 点 "Create repository"

### 第二步：创建 GitHub OAuth App

1. 打开 https://github.com/settings/applications/new
2. 填入：
   - **Application name**: `TroyZhou的博客`
   - **Homepage URL**: `https://YitongZhou.github.io`
   - **Authorization callback URL**: `https://YitongZhou.github.io`
3. 点 "Register application"

### 第三步：填入配置

将 `Client ID`、`Client Secret` 和仓库名填入 `src/layouts/Post.astro`：

```js
clientID:     '刚刚复制的Client ID',
clientSecret: '刚刚复制的Client Secret',
repo:         'blog-comments',   // 你创建的仓库名
owner:        'YitongZhou',      // 你的GitHub用户名
admin:        ['YitongZhou'],
```

---

## 如何添加 MRI 笔记 / 实验日志

在 `src/data/mri.js` 中添加对应条目，然后创建页面文件。

---

## 如何添加照片到生活墙

1. 将图片放入 `src/assets/images/travel/` 等目录
2. 在 `src/data/life.js` 的 `gallery` 数组中添加条目

---

## 自定义配色

所有颜色都在 `src/styles/global.css` 的 `:root` 中定义：

```css
:root {
  --bg:           #FAF7F2;   /* 背景色：暖米白 */
  --primary:      #4A3728;   /* 主色：深棕 */
  --accent:       #C4846A;   /* 强调色：陶土橙 */
  --mri-green:    #5C8A6A;   /* MRI专区：薄荷绿 */
  --mri-amber:    #C8884A;   /* 实验日志：琥珀色 */
}
```

---

## 常见问题

**Q: 首页照片怎么换？**
修改 `src/pages/index.astro` 中的 `<img>` src 属性，替换为你的照片 URL 或本地路径。

**Q: 博客评论不显示？**
检查 Gitalk 的 Client ID 和 Client Secret 是否正确填写，首次使用需要你登录 GitHub 授权。

**Q: 如何添加更多子页面？**
在 `src/pages/` 下新建目录，参照现有页面结构创建即可，记得在 `src/layouts/Base.astro` 的导航菜单中添加链接。

---

*用 ❤️ 和 Astro 构建 · 祝你玩得开心*
