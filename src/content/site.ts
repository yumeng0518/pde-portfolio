export const siteConfig = {
  name: "传创妙字",
  role: "产品设计工程师 · PDE",
  tagline: "从需求洞察到产品上线，端到端交付",
  email: "your.email@example.com",
  location: "北京",
  links: {
    resume: "#",
    linkedin: "#",
    figma: "#",
  },
};

export const navItems = [
  { label: "作品", href: "#work" },
  { label: "流程", href: "#process" },
  { label: "服务", href: "#services" },
];

export const paradigmContent = {
  eyebrow: "PDE · 新协作范式",
  title: "产设研边界模糊化，\n端到端交付成为常态",
  description:
    "在 AI Coding Product 为载体的交付新范式下，产品、设计、前端开发的单一职能角色，正在融合为产品设计工程师（PDE）。不再等待需求文档流转，而是将洞察、原型、视觉与验证串联为一条连续的设计生产链路。",
  pillars: [
    {
      title: "需求洞察",
      subtitle: "Product",
      description:
        "从用户场景与业务目标出发，定义问题边界与成功指标，让设计决策始终锚定在真实价值上。",
    },
    {
      title: "原型验证",
      subtitle: "Design",
      description:
        "以可交互原型快速验证假设，在真实反馈中迭代信息架构与交互路径，降低后期返工成本。",
    },
    {
      title: "设计表达",
      subtitle: "Design",
      description:
        "建立一致的视觉语言与组件语义，在细节中传递品牌气质与可用性，而非仅交付静态稿。",
    },
    {
      title: "实现闭环",
      subtitle: "Engineer",
      description:
        "借助 AI 辅助编码，将设计意图快速落地为可运行产品，缩短从概念到上线的距离。",
    },
  ],
  contrast: {
    before: {
      label: "传统串行",
      steps: ["产品提需", "设计执行", "研发实现"],
    },
    after: {
      label: "PDE 端到端",
      steps: ["洞察", "原型", "设计", "验证", "上线"],
    },
  },
};

export const processSteps = [
  {
    step: "01",
    title: "发现与定义",
    focus: "产品思维",
    description:
      "梳理用户旅程与业务约束，输出问题陈述与设计原则，明确「为什么做」与「做到什么程度」。",
    deliverables: ["问题框架", "成功指标", "设计原则"],
  },
  {
    step: "02",
    title: "探索与原型",
    focus: "设计巧思",
    description:
      "多方案并行探索，用低保真到高保真原型验证核心路径，在交互细节中体现设计判断。",
    deliverables: ["信息架构", "交互原型", "可用性验证"],
  },
  {
    step: "03",
    title: "系统化设计",
    focus: "设计语言",
    description:
      "构建组件层级、动效语义与响应式规则，确保复杂场景下体验一致、可扩展。",
    deliverables: ["设计系统", "关键页面", "动效规范"],
  },
  {
    step: "04",
    title: "构建与迭代",
    focus: "端到端交付",
    description:
      "与 AI Coding 协同，将设计决策沉淀为可运行界面，在真实环境中持续验证与优化。",
    deliverables: ["可运行 Demo", "上线版本", "迭代记录"],
  },
];

export const skillGroups = [
  {
    category: "产品思维",
    categoryEn: "Product",
    icon: "🧠",
    skills: ["用户研究", "需求分析", "数据驱动", "PRD / MVP", "成功指标"],
  },
  {
    category: "设计能力",
    categoryEn: "Design",
    icon: "✏️",
    skills: ["交互设计", "视觉设计", "设计系统", "高保真原型", "动效设计"],
  },
  {
    category: "交付开发",
    categoryEn: "Engineering",
    icon: "</>",
    skills: ["React / Next.js", "TypeScript", "AI Coding", "响应式实现", "性能优化"],
  },
  {
    category: "工具平台",
    categoryEn: "Tools",
    icon: "⚡",
    skills: ["Figma", "Cursor", "Framer Motion", "CatDesk / CatPaw", "Vibe Coding"],
  },
];

export const philosophyItems = [
  {
    title: "设计是决策，不是装饰",
    description:
      "每一个间距、层级与动效都应服务于用户理解与业务目标。我倾向于在作品集中展示「为什么这样设计」，而非仅展示最终画面。",
  },
  {
    title: "简约是克制的结果",
    description:
      "受微软 Fluent 与字节产品气质启发，我追求信息密度与留白之间的平衡——界面安静，但层次清晰、操作可预期。",
  },
  {
    title: "AI 放大个体，而非替代思考",
    description:
      "AI 缩短实现路径，但无法替代对场景的判断。PDE 的价值在于：更快地把正确的想法，变成用户可以触摸的产品。",
  },
];
