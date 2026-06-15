import {
  writeFileSync,
  mkdirSync,
  existsSync,
  symlinkSync,
  readFileSync,
  copyFileSync,
  readdirSync,
} from "fs";
import { join } from "path";
import { featuredProjects, type Project, type MediaItem } from "../src/content/projects";

const OUT_DIR = "C:\\Users\\yumen\\Desktop\\pde-portfolio-works-editable";
const MEDIA_SOURCE = "C:\\Users\\yumen\\Desktop\\pde-portfolio-html\\media";
const EXPORTS_DIR = join(OUT_DIR, "exports");

const FILE_NAMES: Record<string, string> = {
  "geo-portal": "01-美团GEO门户.html",
  "meiling-ai-tools": "02-美团创意中心-美灵AI.html",
  "flower-destination-recommend": "03-赏花目的地推荐.html",
  "food-play-card": "04-美食玩法卡.html",
  "frog-writing-platform": "05-蛙蛙写作平台.html",
};

function esc(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mediaPath(url: string) {
  return url.startsWith("/") ? url.slice(1) : url;
}

function field(tag: string, path: string, value: string, className = "") {
  return `<${tag} class="editable ${className}" contenteditable="true" data-field="${path}" spellcheck="true">${esc(value)}</${tag}>`;
}

function fieldList(path: string, items: string[], ordered = false) {
  const tag = ordered ? "ol" : "ul";
  return `<${tag} class="editable-list">${items
    .map(
      (item, i) =>
        `<li contenteditable="true" data-field="${path}.${i}" spellcheck="true">${esc(item)}</li>`,
    )
    .join("\n        ")}</${tag}>`;
}

function renderMedia(items: MediaItem[] | undefined, section: MediaItem["section"]) {
  const list = (items ?? []).filter((m) => m.section === section);
  if (!list.length) return "";
  return list
    .map((item) => {
      const src = mediaPath(item.url);
      const cap = item.caption
        ? `<figcaption contenteditable="true" data-field="media.${section}.caption" spellcheck="true">${esc(item.caption)}</figcaption>`
        : "";
      if (item.type === "video") {
        return `<figure class="media"><video src="${src}" controls playsinline preload="metadata"></video>${cap}</figure>`;
      }
      return `<figure class="media"><img src="${src}" alt="${esc(item.caption || "项目图片")}" />${cap}</figure>`;
    })
    .join("\n        ");
}

function renderMetrics(p: Project) {
  const metrics = p.metrics ?? p.deliveryResults.dataPerformance;
  return metrics
    .map(
      (m, i) => `<div class="metric">
          <span contenteditable="true" data-field="deliveryResults.dataPerformance.${i}.label" spellcheck="true">${esc(m.label)}</span>
          <strong contenteditable="true" data-field="deliveryResults.dataPerformance.${i}.value" spellcheck="true">${esc(m.value)}</strong>
        </div>`,
    )
    .join("\n        ");
}

const EDITOR_SCRIPT = `
<script>
(function () {
  const slug = document.body.dataset.slug;
  const storageKey = "pde-work-edit:" + slug;

  function setByPath(obj, path, value) {
    const keys = path.split(".");
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      const next = keys[i + 1];
      if (/^\\d+$/.test(next)) {
        if (!Array.isArray(cur[k])) cur[k] = [];
      } else if (!cur[k] || typeof cur[k] !== "object") {
        cur[k] = {};
      }
      cur = cur[k];
    }
    const last = keys[keys.length - 1];
    if (/^\\d+$/.test(last)) {
      cur[Number(last)] = value;
    } else {
      cur[last] = value;
    }
  }

  function collectData() {
    const data = JSON.parse(JSON.stringify(window.__PROJECT__));
    document.querySelectorAll("[data-field]").forEach((el) => {
      setByPath(data, el.dataset.field, el.innerText.trim());
    });
    return data;
  }

  function saveLocal() {
    localStorage.setItem(storageKey, JSON.stringify(collectData()));
    toast("已保存到浏览器本地");
  }

  function restoreLocal() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return toast("没有本地草稿");
    applyData(JSON.parse(raw));
    toast("已恢复本地草稿");
  }

  function applyData(data) {
    window.__PROJECT__ = data;
    document.querySelectorAll("[data-field]").forEach((el) => {
      const keys = el.dataset.field.split(".");
      let cur = data;
      for (const k of keys) {
        cur = cur?.[k];
      }
      if (cur != null) el.innerText = cur;
    });
  }

  function exportJson() {
    const payload = {
      slug,
      updatedAt: new Date().toISOString(),
      data: collectData(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = slug + ".json";
    a.click();
    URL.revokeObjectURL(a.href);
    toast("已导出 " + slug + ".json，请放入 exports 文件夹后运行 npm run sync:works");
  }

  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 3200);
  }

  document.getElementById("btn-save").addEventListener("click", saveLocal);
  document.getElementById("btn-restore").addEventListener("click", restoreLocal);
  document.getElementById("btn-export").addEventListener("click", exportJson);

  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try { applyData(JSON.parse(saved)); } catch (e) {}
  }
})();
</script>`;

function renderProjectHtml(p: Project) {
  const projectJson = JSON.stringify(p).replace(/</g, "\\u003c");
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(p.title)} · 可编辑作品页</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
      color: #1a1a1a;
      background: #f7f8fa;
      line-height: 1.75;
      padding: 24px 20px 96px;
    }
    .wrap { max-width: 860px; margin: 0 auto; }
    .toolbar {
      position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;
      display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
      padding: 12px 16px; background: rgba(255,255,255,.95);
      border-top: 1px solid #e5e5e5; backdrop-filter: blur(12px);
    }
    .toolbar button {
      border: none; border-radius: 999px; padding: 10px 18px;
      font-size: 14px; cursor: pointer; font-weight: 600;
    }
    #btn-save { background: #f0f0f0; color: #333; }
    #btn-restore { background: #fff; border: 1px solid #ddd; color: #333; }
    #btn-export { background: #0078d4; color: #fff; }
  .back { color: #0078d4; text-decoration: none; font-size: 14px; }
    .editable:focus, .editable-list li:focus, [contenteditable]:focus {
      outline: 2px solid #0078d4; outline-offset: 2px; border-radius: 4px;
      background: #fffef5;
    }
    .tip {
      margin: 16px 0; padding: 14px 16px; background: #e8f4fd;
      border: 1px solid #b6dcfa; border-radius: 12px; font-size: 13px; color: #0c4a6e;
    }
    .eyebrow { margin-top: 16px; font-size: 12px; color: #666; }
    h1.editable { margin-top: 8px; font-size: clamp(28px, 5vw, 40px); line-height: 1.2; }
    .subtitle { margin-top: 10px; font-size: 18px; color: #555; }
    .tags { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px; }
    .tag { background: #fff; border: 1px solid #e8e8e8; border-radius: 999px; padding: 4px 12px; font-size: 12px; }
    section { margin-top: 32px; background: #fff; border: 1px solid #ececec; border-radius: 16px; padding: 24px; }
    h2 { font-size: 20px; margin-bottom: 4px; }
    h3 { margin-top: 18px; font-size: 15px; color: ${p.accent}; }
    p.editable, .editable { margin-top: 8px; color: #444; font-size: 15px; min-height: 1.5em; }
    ul, ol { margin-top: 8px; padding-left: 20px; }
    li { margin-top: 6px; min-height: 1.4em; }
    .media img, .media video { width: 100%; border-radius: 12px; margin-top: 12px; }
    figcaption { margin-top: 6px; font-size: 13px; color: #777; }
    .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 12px; }
    .metric { background: #f8fafc; border-radius: 12px; padding: 14px; }
    .metric strong { display: block; margin-top: 6px; font-size: 22px; color: ${p.accent}; }
    #toast {
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%) translateY(-120%);
      background: #1a1a1a; color: #fff; padding: 10px 20px; border-radius: 999px;
      font-size: 14px; transition: transform .25s; z-index: 100;
    }
    #toast.show { transform: translateX(-50%) translateY(0); }
  </style>
</head>
<body data-slug="${p.slug}">
  <div id="toast"></div>
  <div class="wrap">
    <a class="back" href="index.html">← 返回作品列表</a>
    <p class="tip">点击任意文字即可在浏览器中直接编辑。编辑完成后点底部「导出 JSON」，将文件保存到 <strong>exports</strong> 文件夹，再在项目目录运行 <strong>npm run sync:works</strong> 更新网站。</p>

    ${field("p", "category", p.category, "eyebrow")}
    ${field("h1", "title", p.title)}
    ${field("p", "subtitle", p.subtitle, "subtitle")}
    <div class="tags">${p.tags
      .map((t, i) => `<span class="tag" contenteditable="true" data-field="tags.${i}" spellcheck="true">${esc(t)}</span>`)
      .join("\n      ")}</div>

    ${renderMedia(p.media, "hero")}

    <section>
      <h2>项目概述</h2>
      ${field("p", "summary", p.summary)}
    </section>

    <section>
      <h2>一、项目背景</h2>
      <h3>业务目标</h3>${field("p", "background.businessGoal", p.background.businessGoal)}
      <h3>用户痛点</h3>${field("p", "background.userPain", p.background.userPain)}
      <h3>市场现状</h3>${field("p", "background.marketStatus", p.background.marketStatus)}
      <h3>竞品分析</h3>${field("p", "background.competitorAnalysis", p.background.competitorAnalysis)}
      ${renderMedia(p.media, "background")}
    </section>

    <section>
      <h2>二、需求拆解</h2>
      <h3>用户画像</h3>${field("p", "requirements.userPersona", p.requirements.userPersona)}
      <h3>用户旅程</h3>${field("p", "requirements.userJourney", p.requirements.userJourney)}
      <h3>核心需求</h3>${fieldList("requirements.coreNeeds", p.requirements.coreNeeds)}
      <h3>次要需求</h3>${fieldList("requirements.secondaryNeeds", p.requirements.secondaryNeeds)}
      ${renderMedia(p.media, "requirements")}
    </section>

    <section>
      <h2>三、方案设计</h2>
      <h3>信息架构</h3>${field("p", "designSolution.informationArchitecture", p.designSolution.informationArchitecture)}
      <h3>功能流程</h3>${field("p", "designSolution.functionalFlow", p.designSolution.functionalFlow)}
      <h3>原型设计</h3>${field("p", "designSolution.prototype", p.designSolution.prototype)}
      <h3>交互规则</h3>${field("p", "designSolution.interactionRules", p.designSolution.interactionRules)}
      <h3>页面说明</h3>${field("p", "designSolution.pageNotes", p.designSolution.pageNotes)}
      ${renderMedia(p.media, "design")}
    </section>

    <section>
      <h2>四、落地成果</h2>
      <h3>版本迭代</h3>${fieldList("deliveryResults.iterationLog", p.deliveryResults.iterationLog, true)}
      <h3>数据表现</h3><div class="metrics">${renderMetrics(p)}</div>
      <h3>用户反馈</h3>${field("p", "deliveryResults.userFeedback", p.deliveryResults.userFeedback)}
      ${renderMedia(p.media, "delivery")}
    </section>

    <section>
      <h2>五、复盘总结</h2>
      <h3>亮点</h3>${fieldList("retrospective.strengths", p.retrospective.strengths)}
      <h3>不足</h3>${fieldList("retrospective.weaknesses", p.retrospective.weaknesses)}
      <h3>优化思路</h3>${fieldList("retrospective.optimizationIdeas", p.retrospective.optimizationIdeas)}
      ${renderMedia(p.media, "retrospective")}
    </section>

    <section>
      <h2>设计思考</h2>
      <h3>产品洞察</h3>${field("p", "productInsight", p.productInsight)}
      <h3>设计巧思</h3>${field("p", "designCraft", p.designCraft)}
      <h3>关键设计决策</h3>${fieldList("highlights", p.highlights)}
    </section>
  </div>

  <div class="toolbar">
    <button type="button" id="btn-save">保存草稿（本地）</button>
    <button type="button" id="btn-restore">恢复草稿</button>
    <button type="button" id="btn-export">导出 JSON → 更新网站</button>
  </div>

  <script>window.__PROJECT__ = ${projectJson};</script>
  ${EDITOR_SCRIPT}
</body>
</html>`;
}

function renderIndexHtml() {
  const items = featuredProjects
    .map((p) => {
      const file = FILE_NAMES[p.slug];
      return `<li><a href="${file}">${esc(p.title)}</a><span>${esc(p.subtitle)}</span></li>`;
    })
    .join("\n      ");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>作品可编辑导出 · 张鹏飞作品集</title>
  <style>
    body { font-family: "Segoe UI", "PingFang SC", sans-serif; background: #f5f7fa; padding: 40px 20px; }
    .wrap { max-width: 720px; margin: 0 auto; }
    h1 { font-size: 28px; }
    p { margin-top: 12px; color: #555; line-height: 1.7; }
    ol { margin-top: 24px; padding: 0; list-style: none; }
    li { background: #fff; border: 1px solid #e8e8e8; border-radius: 12px; padding: 16px 20px; margin-top: 12px; }
    a { font-size: 17px; font-weight: 600; color: #0078d4; text-decoration: none; }
    a:hover { text-decoration: underline; }
    span { display: block; margin-top: 6px; font-size: 14px; color: #666; }
    .steps { margin-top: 28px; padding: 20px; background: #fff8e6; border-radius: 12px; font-size: 14px; color: #7c5e10; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>作品案例 · 浏览器可编辑版</h1>
    <p>打开下方任意作品，在浏览器里直接点击文字编辑。完成后导出 JSON，同步回作品集网站。</p>
    <ol>${items}</ol>
    <div class="steps">
      <strong>更新网站流程：</strong><br>
      1. 编辑作品 → 点击「导出 JSON」<br>
      2. 将下载的 .json 文件放入本文件夹下的 <code>exports</code> 目录<br>
      3. 在项目目录运行：<code>npm run sync:works</code><br>
      4. 运行 <code>npm run dev</code> 预览，确认后推送到 GitHub
    </div>
  </div>
</body>
</html>`;
}

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(EXPORTS_DIR, { recursive: true });

const mediaLink = join(OUT_DIR, "media");
if (!existsSync(mediaLink) && existsSync(MEDIA_SOURCE)) {
  try {
    symlinkSync(MEDIA_SOURCE, mediaLink, "junction");
  } catch {
    /* ignore */
  }
}

writeFileSync(join(OUT_DIR, "index.html"), renderIndexHtml(), "utf8");

for (const project of featuredProjects) {
  const fileName = FILE_NAMES[project.slug] ?? `${project.slug}.html`;
  writeFileSync(join(OUT_DIR, fileName), renderProjectHtml(project), "utf8");
  console.log(`✓ ${fileName}`);
}

writeFileSync(
  join(OUT_DIR, "使用说明.txt"),
  `作品集 · 浏览器可编辑 HTML 导出

【打开编辑】
  双击 index.html → 选择作品 → 点击文字直接编辑

【保存草稿】
  底部「保存草稿」存在浏览器本地，关闭页面不丢失

【更新网站】
  1. 点击「导出 JSON」，得到 geo-portal.json 等文件
  2. 把 JSON 放进 exports 文件夹
  3. 打开终端，进入项目目录 0608，运行：
     npm run sync:works
  4. 运行 npm run dev 预览网站

项目路径：
  C:\\Users\\yumen\\Desktop\\0608 2\\0608
`,
  "utf8",
);

console.log(`\n导出完成：${OUT_DIR}`);
console.log(`请双击打开：${join(OUT_DIR, "index.html")}`);
