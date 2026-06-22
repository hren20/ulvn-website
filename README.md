# ULVN Project Website

这是一个用于论文 / 研究项目展示页的静态网站模板，技术栈为：

```text
Astro + Nerfies/Bulma style + Pages CMS + GitHub Pages
```

网站内容集中写在 `content/project.yml` 中，页面模板在 `src/pages/index.astro` 中，样式在 `src/styles/nerfies.css` 中。部署到 GitHub 后，可以通过 Pages CMS 在可视化界面编辑内容，保存后自动提交到 GitHub，并触发 GitHub Pages 重新发布。

## 目录结构

```text
.
├── content/
│   └── project.yml              # 网站主要内容
├── public/
│   ├── images/                  # 图片资源
│   ├── videos/                  # 视频资源
│   ├── files/                   # PDF、补充材料等文件
│   └── admin/                   # Pages CMS 入口跳转页
├── src/
│   ├── pages/
│   │   └── index.astro          # 页面模板
│   └── styles/
│       └── nerfies.css          # 页面样式
├── .pages.yml                   # Pages CMS 后台字段配置
├── .github/workflows/deploy.yml # GitHub Pages 自动部署
├── astro.config.mjs             # Astro 和 GitHub Pages base path 配置
└── package.json
```

## 本地预览

先安装 Node.js 22 或更高版本。服务器上如果使用 `nvm`：

```bash
source ~/.nvm/nvm.sh
nvm use 22
```

安装依赖：

```bash
npm install
```

启动本地预览：

```bash
npm run dev -- --host 0.0.0.0 --port 4321
```

如果你在服务器本机浏览器访问：

```text
http://服务器IP:4321/
```

如果你通过 SSH 从自己的电脑访问服务器，建议端口转发：

```bash
ssh -L 4321:localhost:4321 <用户名>@<服务器IP>
```

然后在自己电脑浏览器打开：

```text
http://localhost:4321/
```

本地构建检查：

```bash
npm run build
```

## 编辑网站内容

主要编辑文件是：

```text
content/project.yml
```

修改后，本地 dev server 会自动刷新页面。

### 标题

```yaml
title: "Unordered Landmark Visual Navigation"
venue: ""
```

`title` 是页面顶部大标题。`venue` 当前模板默认不显示，可保留为空；如果以后要显示会议名，可以在模板中重新启用。

### 作者与单位

单位按顺序编号：

```yaml
affiliations:
  - "Sun Yat-sen University" # 1
  - "Insta360 Research"      # 2
```

作者通过 `affiliation` 指定单位编号：

```yaml
authors:
  - name: "Hao Ren"
    url: "https://hren20.github.io/"
    affiliation: "1"

  - name: "Zhaoliang Wan"
    url: "https://wan-zhaoliang.vercel.app/"
    affiliation: "2"

  - name: "Example Author"
    url: "https://example.com"
    affiliation: "1,2"
```

显示效果类似：

```text
Hao Ren¹, Zhaoliang Wan², Example Author¹²
¹ Sun Yat-sen University / ² Insta360 Research
```

没有个人主页的作者可以不写 `url`：

```yaml
- name: "Junzhe Zhu"
  affiliation: "1"
```

### 顶部按钮

```yaml
links:
  paper: "https://arxiv.org/abs/xxxx.xxxxx"
  arxiv: ""
  code: "https://github.com/username/repo"
  video: "https://youtube.com/watch?v=example"
  poster: ""
  data: ""
```

非空字段会自动显示按钮。空字符串不会显示。

常用资源可以放在：

```text
public/files/
```

例如放入：

```text
public/files/paper.pdf
```

然后写：

```yaml
links:
  paper: "/files/paper.pdf"
```

### Teaser

```yaml
teaser:
  image: "/images/teaser.svg"
  video: ""
  alt: "Project teaser"
  caption: "One-sentence summary of the project."
```

如果 `video` 非空，页面会显示视频；否则显示 `image`。

图片放在：

```text
public/images/
```

视频放在：

```text
public/videos/
```

路径写法示例：

```yaml
teaser:
  image: "/images/teaser.png"
  video: "/videos/demo.mp4"
```

### Abstract

```yaml
abstract: >
  Write your abstract here. The template supports Markdown, so you can use
  **emphasis**, links, and short lists.
```

支持 Markdown，例如：

```yaml
abstract: >
  We propose **ULVN**, a navigation framework for unordered landmarks.
  See [project code](https://github.com/username/repo).
```

### Sections

`sections` 控制正文模块，比如 Method、Results、Qualitative Results。

```yaml
sections:
  - title: "Method"
    body: >
      Describe your method here.
    image: "/images/method.png"
    image_alt: "Method diagram"
    caption: "Overview of the proposed method."
    media: []
```

每个 section 可以有一张主图：

```yaml
image: "/images/method.png"
caption: "Overview of the proposed method."
```

也可以添加双列媒体网格：

```yaml
sections:
  - title: "Qualitative Results"
    body: >
      Exploration rollouts in simulation.
    image: ""
    media:
      - kind: "video"
        video: "/videos/rollout_bev.mp4"
        caption: "Bird's-eye exploration trace"
        autoplay: true
        controls: false

      - kind: "video"
        video: "/videos/rollout_pov.mp4"
        caption: "Agent point-of-view rollout"
        autoplay: true
        controls: false
```

图片媒体示例：

```yaml
media:
  - kind: "image"
    image: "/images/result_1.png"
    alt: "Result example"
    caption: "Representative result."
```

### BibTeX

```yaml
bibtex: |
  @article{yourproject2026,
    title={Your Research Project Title},
    author={Author A and Author B},
    year={2026}
  }
```

使用 `|` 可以保留 BibTeX 的换行和缩进。

## 媒体文件规则

静态资源必须放在 `public/` 下：

```text
public/images/teaser.png   -> /images/teaser.png
public/videos/demo.mp4     -> /videos/demo.mp4
public/files/paper.pdf     -> /files/paper.pdf
```

在 `project.yml` 中不要写 `public`：

```yaml
image: "/images/teaser.png"
video: "/videos/demo.mp4"
paper: "/files/paper.pdf"
```

## Pages CMS 可视化编辑

本仓库已经配置了：

```text
.pages.yml
```

使用方式：

1. 打开 `https://app.pagescms.org/`
2. 用 GitHub 登录
3. 授权 Pages CMS 访问仓库
4. 选择 `hren20/ulvn-website`
5. 进入 `Project Page`
6. 编辑 Title、Authors、Links、Teaser、Abstract、Sections、BibTeX
7. 保存

保存后，Pages CMS 会修改 GitHub 仓库里的：

```text
content/project.yml
```

然后 GitHub Actions 会自动重新部署网站。

部署后也可以访问：

```text
https://hren20.github.io/ulvn-website/admin/
```

这个 `/admin/` 页面会跳转到 Pages CMS。Pages CMS 的完整后台不是纯静态页面，真正的编辑界面在 `app.pagescms.org`。

## GitHub Pages 部署

当前 workflow 是：

```text
.github/workflows/deploy.yml
```

它会在每次 push 到 `main` 时自动：

```text
checkout -> configure pages -> build Astro -> upload artifact -> deploy pages
```

第一次部署前，必须在 GitHub 仓库里启用 Pages：

```text
Repository -> Settings -> Pages
Build and deployment -> Source -> GitHub Actions
```

仓库地址：

```text
https://github.com/hren20/ulvn-website
```

部署后的地址通常是：

```text
https://hren20.github.io/ulvn-website/
```

### 本地提交并推送

```bash
git add .
git commit -m "update project website"
git push
```

如果 remote 使用 SSH，应该类似：

```text
git@github.com:hren20/ulvn-website.git
```

检查 remote：

```bash
git remote -v
```

如果需要修改：

```bash
git remote set-url origin git@github.com:hren20/ulvn-website.git
```

## URL 和 base path

本仓库名是：

```text
ulvn-website
```

所以 GitHub Pages 项目页地址是：

```text
https://hren20.github.io/ulvn-website/
```

`astro.config.mjs` 会在 GitHub Actions 中自动读取仓库名，并把 Astro `base` 设置为：

```text
/ulvn-website
```

因此图片、视频、CSS 等资源在 GitHub Pages 子路径下也能正常加载。

如果以后把仓库改名，不需要手动改模板；重新部署即可。

## 常见问题

### GitHub Actions 报错：Ensure GitHub Pages has been enabled

原因是仓库还没有启用 GitHub Pages。

解决：

```text
Settings -> Pages -> Source -> GitHub Actions
```

保存后重新运行 workflow。

### git push 提示 password authentication is not supported

GitHub 不再支持账号密码 push。推荐使用 SSH：

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
cat ~/.ssh/id_ed25519.pub
```

把公钥添加到：

```text
GitHub -> Settings -> SSH and GPG keys -> New SSH key
```

然后设置 remote：

```bash
git remote set-url origin git@github.com:hren20/ulvn-website.git
```

### 页面中图片或视频不显示

检查三点：

1. 文件是否放在 `public/images`、`public/videos` 或 `public/files`
2. `project.yml` 中路径是否以 `/images/`、`/videos/`、`/files/` 开头
3. 文件名大小写是否完全一致

正确示例：

```text
public/images/method.png
```

```yaml
image: "/images/method.png"
```

### 作者单位显示不对

检查 `affiliation` 是否对应 `affiliations` 的顺序：

```yaml
affiliations:
  - "Sun Yat-sen University" # 1
  - "Insta360 Research"      # 2

authors:
  - name: "Hao Ren"
    affiliation: "1"
  - name: "Zhaoliang Wan"
    affiliation: "2"
```

### 本地 npm 不存在

先安装或启用 Node.js：

```bash
source ~/.nvm/nvm.sh
nvm install 22
nvm use 22
node -v
npm -v
```

## 主要文件说明

```text
content/project.yml
```

网站内容。日常主要修改这个文件。

```text
.pages.yml
```

Pages CMS 后台字段定义。只有需要修改后台表单结构时才改。

```text
src/pages/index.astro
```

页面模板。只有需要改布局结构时才改。

```text
src/styles/nerfies.css
```

页面样式。只有需要改视觉风格时才改。

```text
.github/workflows/deploy.yml
```

GitHub Pages 自动部署流程。
