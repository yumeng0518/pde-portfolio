export type MediaItem = {
  type: "image" | "video";
  url: string;
  caption?: string;
  section?: "hero" | "background" | "requirements" | "design" | "delivery" | "retrospective";
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  accent: string;
  cover: string; // 卡片列表展示用封面图
  summary: string;
  productInsight: string;
  designCraft: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  tags: string[];

  // 媒体资源（从学城文档提取）
  media?: MediaItem[];

  // 项目背景
  background: {
    businessGoal: string;
    userPain: string;
    marketStatus: string;
    competitorAnalysis: string;
  };

  // 需求拆解
  requirements: {
    userPersona: string;
    userJourney: string;
    coreNeeds: string[];
    secondaryNeeds: string[];
  };

  // 方案设计
  designSolution: {
    informationArchitecture: string;
    functionalFlow: string;
    prototype: string;
    interactionRules: string;
    pageNotes: string;
    optimizationOverview?: string[];
  };

  // 落地成果
  deliveryResults: {
    iterationLog: string[];
    dataPerformance: { label: string; value: string }[];
    userFeedback: string;
  };

  // 复盘总结
  retrospective: {
    strengths: string[];
    weaknesses: string[];
    optimizationIdeas: string[];
  };
};

import { applyWorkEdits } from "./apply-work-edits";

const rawFeaturedProjects: Project[] = [
  {
    slug: "geo-portal",
    title: "美团 GEO 门户",
    subtitle: "AI 搜索优化的策略制定与内容分发一站式平台",
    category: "AI 平台 · 产品设计",
    year: "2025",
    accent: "#0ea5e9",
    cover: "/media/GEO/c818ee98629096f274f27e6d64547a95.png",
    summary:
      "我以设计为主、产品为辅的角色，主导了 GEO（Generative Engine Optimization）门户的产品设计——一个面向业务运营的 AI 搜索优化平台，实现从策略制定到内容生成再到多平台分发的全链路自动化，已处理 1261 条优化需求，创造 360 万+增值。",
    productInsight:
      "随着 AI 搜索（ChatGPT、Perplexity、豆包等）逐渐替代传统搜索引擎成为用户获取信息的新入口，品牌在 AI 搜索结果中的曝光变得至关重要。但现有团队面临「策略制定靠人工分析、内容生产靠逐条撰写、效果追踪靠手动监测」的三重效率瓶颈。GEO 门户的核心价值在于用 AI 将这条链路全部自动化。",
    designCraft:
      "设计上我构建了三板块式的工作台界面：意图研究面板（关键词分析 + 竞对监测 + 准入诊断）、策略生成面板（基于数据自动生成 GEO 优化策略）、内容分发面板（一键生成内容 + 多平台分发追踪）。信息层级清晰，操作路径最短化，让运营人员从「策略分析师」解放为「策略审核者」。",
    highlights: [
      "设计主导产品体验，产品辅助需求定义",
      "全链路自动化：策略→内容→分发→追踪",
      "已处理 1261 条优化需求",
      "创造 360 万+增值"
    ],
    tags: [
      "GEO",
      "AI 搜索优化",
      "产品设计",
      "自动化",
      "内容分发"
    ],

    media: [
      {
        type: "video",
        url: "/media/GEO/geo-1.mp4",
        caption: "美团 GEO 门户产品演示",
        section: "hero",
      },
    ],

    background: {
      businessGoal:
        "美团各业务线（外卖、闪购、到餐、酒旅等）需要在 AI 搜索渠道获取流量增长。业务目标是建设一个统一的 GEO 运营平台，将分散的人工优化工作系统化、自动化，降低运营成本的同时提升优化效果和响应速度。",
      userPain:
        "运营团队面临三大痛点：1）AI 搜索的排名规则不透明，策略制定依赖经验和猜测；2）每条关键词都需要人工分析竞对、撰写内容，效率极低；3）内容分发后缺乏统一的效果追踪，无法形成数据驱动的优化闭环。",
      marketStatus:
        "GEO 作为新兴领域，市场上缺乏成熟的工具平台。传统 SEO 工具（Ahrefs、SEMrush）不适用于 AI 搜索场景；各公司基本依赖人工+表格的原始方式运营。率先建设平台化工具具有显著的先发优势。",
      competitorAnalysis:
        "传统 SEO 平台：针对搜索引擎排名优化，未覆盖 AI 搜索的新范式；内容营销平台（如蝉妈妈、新榜）：侧重内容分发分析但无 AI 搜索策略能力；市场空白为我们提供了从 0 到 1 构建标准化平台的机会。",
    },

    requirements: {
      userPersona:
        "业务线运营人员和内容运营专员，每日需处理大量关键词优化需求，具备基本的搜索营销知识但不精通 AI 搜索算法。需要一个能「告诉我该怎么做」并「帮我执行」的智能化工具。",
      userJourney:
        "输入目标关键词/业务线 → 系统自动进行意图研究（词分析+竞对+准入判断）→ 生成 GEO 优化策略 → 运营审核确认 → 系统自动生成优化内容 → 一键分发至目标平台 → 效果追踪与迭代。",
      coreNeeds: [
        "关键词意图自动分析与竞对监测",
        "基于数据的 GEO 策略自动生成",
        "内容自动生成与多平台一键分发"
      ],
      secondaryNeeds: [
        "效果追踪看板与 ROI 分析",
        "批量处理与队列管理",
        "策略模板库与历史策略复用"
      ],
    },

    designSolution: {
      informationArchitecture:
        "三大工作板块横向并列：1）意图研究区（关键词现状 + AI 搜索准入判断 + 竞对布局分析）；2）策略生成区（目标设定 + 策略方向 + 执行计划）；3）内容分发区（KFS 执行框架 + 信源渠道矩阵 + 分发状态追踪）。顶部为全局数据看板，展示处理量和增值数据。",
      functionalFlow:
        "运营输入关键词 → 系统并行执行意图分析、竞对抓取、准入评估 → 汇总为结构化报告 → 基于报告自动生成策略方案（可人工调整）→ 确认后触发内容生成 → 生成内容经审核后一键分发 → 分发后自动监测排名变化 → 闭环反馈优化策略。",
      prototype:
        "基于对运营实际工作流的深入观察，我直接设计了高保真原型并与开发团队密切协作。通过反复的用户测试（邀请一线运营试用）迭代界面布局和操作路径，确保平台真正贴合实际工作场景。",
      interactionRules:
        "分析过程采用流式输出展示（类似 ChatGPT），让用户实时看到系统思考过程；策略结果采用卡片式布局，支持拖拽排序优先级；批量操作支持框选+右键菜单；所有异步操作提供进度条和预计时间。",
      pageNotes:
        "平台以 Web 端为主，需支持大量数据的列表性能优化（虚拟滚动）。策略生成依赖 LLM 后端服务，前端需处理流式响应渲染和超时重试。多平台分发通过 API 对接各内容渠道。",
    },

    deliveryResults: {
      iterationLog: [
        "V1.0：核心意图研究 + 策略生成模块上线，支持单条关键词处理",
        "V1.1：新增批量处理能力 + 内容自动生成，处理效率提升 5 倍",
        "V1.2：上线多平台分发与效果追踪，形成完整闭环",
        "V2.0：支持多业务线（外卖/闪购/到餐/酒旅），累计处理 1261 条需求"
      ],
      dataPerformance: [
      { label: "累计处理需求", value: "1261 条" },
      { label: "创造增值", value: "360 万+" },
      { label: "策略生成效率", value: "提升 5x" },
      { label: "覆盖业务线", value: "4+" }
    ],
      userFeedback:
        "运营团队反馈「以前一个关键词要分析半天，现在系统几分钟就出完整策略」「内容生成质量超出预期，基本不需要大改」。管理层认可平台对效率提升和增值创造的贡献。",
    },

    retrospective: {
      strengths: [
        "设计主导确保了产品体验的一致性和操作效率，运营上手成本极低",
        "全链路自动化设计将人工操作时间压缩了 80%+",
        "平台化思维使能力可复用到多业务线，边际成本递减"
      ],
      weaknesses: [
        "AI 搜索排名规则不透明，策略效果预测仍有不确定性",
        "多平台分发的 API 稳定性受第三方影响",
        "初期缺乏 A/B 测试机制来验证不同策略的效果差异"
      ],
      optimizationIdeas: [
        "建立策略效果预测模型，基于历史数据提供策略成功率评估",
        "引入 A/B 测试框架对比不同策略的实际效果",
        "探索跨业务线的策略知识迁移，用一个业务的成功经验加速其他业务"
      ],
    },
  },
  {
    slug: "meiling-ai-tools",
    title: "美团创意中心 · 美灵 AI",
    subtitle: "从 0 到 1 搭建 AIGC 多工具聚合平台的前端与产品框架",
    category: "AI 平台 · AIGC 工具",
    year: "2025",
    accent: "#8b5cf6",
    cover: "/media/MLAI/ML封面.png",
    summary:
      "我以 AI 产品经理的角色，负责美团创意中心「美灵 AI」(/tools) 模块从 0 到 1 的前端与基础功能搭建——将模型生图、Midjourney、Stable Diffusion、AI 文案、智能配音、数字人视频等分散 AIGC 能力聚合为统一工具工作台，降低运营在多模型、多模态工具间的切换成本，形成创意中心内标准化的 AI 工具集。",
    productInsight:
      "在调研中我发现，投放与创意运营团队每天需要在 5-8 个不同的 AI 工具间来回切换，每次切换都意味着重新登录、重新理解界面、手动搬运素材。问题的本质不是工具不够好，而是缺少一个统一的「工具发现与使用入口」。美灵 AI 的核心价值在于将分散能力封装为标准化工具页，让运营从「找工具」转变为「用工具」。",
    designCraft:
      "我设计了清晰的多工具聚合架构：/tools 总览页作为工具发现入口，按能力类型（图像/视频/音频/文本）分区展示；各子工具页遵循统一的页面框架与交互范式。导航层面，设计了工具卡片 + 分类筛选 + 权限标识的组合，让不同角色的用户快速找到可用工具。同时我直接参与前端搭建，完成工具路由、权限菜单（CREATIVE_TOOL）和统一页面框架的实现。",
    highlights: [
      "从 0 到 1 搭建美灵 AI 工具集导航与子工具页框架",
      "聚合 10+ AIGC 子能力为统一工作台",
      "设计并实现权限菜单体系，支撑角色分权可见",
      "标准化工具页模式，降低新工具接入成本"
    ],
    tags: [
      "AI 产品",
      "B 端平台",
      "AIGC",
      "工具聚合",
      "前端搭建"
    ],

    media: [
      {
        type: "video",
        url: "/media/MLAI/美灵-1.mp4",
        caption: "美灵 AI 内部工具演示",
        section: "hero",
      },
      {
        type: "video",
        url: "/media/MLAI/美灵外部-1.mp4",
        caption: "美灵 AI 外部版本演示",
        section: "hero",
      },
    ],

    background: {
      businessGoal:
        "美团创意中心（fe-creative-center）面向投放、创意与素材运营团队，提供素材管理、自动化生产、AIGC 工具集等 B 端能力。业务目标是将分散的生成式 AI 工具统一收敛到 /tools 模块，降低工具发现和使用门槛，提升素材生产与投放创意的整体效率。",
      userPain:
        "运营团队面临三大痛点：1）AIGC 工具分散在不同平台，每次使用需单独找入口、切换上下文；2）不同工具的交互范式不一致，学习成本高；3）缺乏统一的权限管理，工具可见性混乱，运营不知道自己能用什么、该用什么。",
      marketStatus:
        "AIGC 工具正从单点突破走向平台化聚合阶段。外部如 Canva AI Suite、Adobe Firefly 生态均在构建「多能力统一入口」；内部各算法团队各自开发独立工具页面，缺少统一的产品框架和用户体验标准。",
      competitorAnalysis:
        "Canva：Magic Studio 聚合了图像/视频/文案 AI 工具，入口统一但面向 C 端，不适用于 B 端投放场景；Adobe Firefly：嵌入 Creative Cloud 但与美团业务无关联；内部各团队的独立工具页：能力强但入口分散、体验不一致。我们的机会在于建立内部标准化的 AIGC 工具平台。",
    },

    requirements: {
      userPersona:
        "投放运营、创意设计师与素材运营人员，每日需要高频使用多种 AI 工具进行素材生产。他们不是技术人员，需要「开箱即用」的工具体验，同时需要在多种 AI 能力之间快速切换和组合使用。",
      userJourney:
        "进入创意中心 → 点击「美灵 AI」/tools 入口 → 总览页浏览可用工具（按分类筛选）→ 点击目标工具卡片进入子工具页 → 在标准化界面中完成 AI 生成任务 → 产出素材回到创意中心做后续投放。",
      coreNeeds: [
        "统一的工具发现入口与分类导航",
        "标准化的子工具页面框架（降低学习成本）",
        "基于角色的权限菜单（CREATIVE_TOOL），不同角色看到不同工具集"
      ],
      secondaryNeeds: [
        "工具使用数据埋点与效率分析",
        "新工具快速接入的标准化模板",
        "工具间素材流转（一个工具的输出可直接作为另一个工具的输入）"
      ],
    },

    designSolution: {
      informationArchitecture:
        "/tools 总览页为一级入口，按能力类型分区：图像生成（模型生图、Midjourney、Stable Diffusion）、视频制作（智能成片、数字人视频、直播回放下载）、音频工具（智能配音）、文本工具（AI 文案助手）。每个工具卡片展示名称、能力描述、适用场景标签和权限状态。",
      functionalFlow:
        "总览页工具卡片 → 路由分发至对应子工具页 → 子工具页遵循统一框架（顶部工具名称/说明 + 中部操作区 + 底部结果展示区）→ 各子工具内部逻辑由对应算法团队实现，外层框架提供统一的加载状态、错误处理和权限拦截。",
      prototype:
        "我直接在代码层面构建了工具导航与路由框架的原型，采用 React + 配置化路由的方式实现。每个子工具注册自身的路由、权限码和元信息，总览页自动聚合展示。这种配置驱动的方式让新工具接入只需添加一份配置文件即可。",
      interactionRules:
        "工具卡片 Hover 展示能力摘要与适用场景；无权限工具灰显并展示申请入口；子工具页统一 Loading 骨架屏；工具切换时保持上一个工具的状态不丢失（后台驻留）；响应式布局适配不同屏幕尺寸。",
      pageNotes:
        "平台地址为 creative.sankuai.com/tools，内网访问。前端基于创意中心主框架，权限对接 CREATIVE_TOOL 权限码体系。子工具页采用微前端或 iframe 方式接入，确保各算法团队可独立迭代而不影响整体框架稳定性。",
    },

    deliveryResults: {
      iterationLog: [
        "V1.0：完成 /tools 总览页 + 工具路由框架 + 权限菜单上线，首批接入 5 个工具",
        "V1.1：优化工具分类与搜索，新增工具使用引导和权限申请流程",
        "V1.2：扩展至 10+ 工具接入，建立标准化接入模板降低新工具上线成本",
        "V2.0：形成完整的 AIGC 工具工作台，覆盖图像/视频/音频/文本全模态"
      ],
      dataPerformance: [
      { label: "聚合 AIGC 工具", value: "10+" },
      { label: "工具曝光率", value: "显著提升" },
      { label: "工具切换效率", value: "提升 3x+" },
      { label: "新工具接入周期", value: "缩短 60%" }
    ],
      userFeedback:
        "运营团队反馈「终于不用在各种系统间来回跳转了，所有 AI 工具都在一个地方」「新接入的工具体验跟之前的一致，不需要重新学习」。算法团队反馈新工具接入流程清晰，只需按模板配置即可上线。",
    },

    retrospective: {
      strengths: [
        "从 0 到 1 建立了标准化的 AIGC 工具平台框架，可持续扩展",
        "配置化路由 + 权限体系设计让新工具接入成本极低",
        "统一的交互范式显著降低了用户在多工具间切换的认知负担"
      ],
      weaknesses: [
        "初期子工具页的接入标准不够严格，部分工具体验一致性仍有差异",
        "工具间素材流转能力尚未打通，用户仍需手动搬运中间产物",
        "工具使用数据分析体系搭建滞后于功能上线"
      ],
      optimizationIdeas: [
        "建立工具间素材流转通道，实现「生图 → 成片 → 配音」的一站式创作链",
        "引入智能推荐——基于用户历史使用习惯推荐最可能用到的工具",
        "建设工具效果评估体系，用数据驱动工具优先级排序和资源投入决策"
      ],
    },
  },
  {
    slug: "flower-destination-recommend",
    title: "赏花目的地推荐",
    subtitle: "设计师端到端交付 C 端活动页的 SDD 实践",
    category: "C 端增长 · SDD 实践",
    year: "2025",
    accent: "#ff6b9d",
    cover: "/media/fm/009e95a6b390803a05b8323b2c51ff00.png",
    summary:
      "春季赏花场景下，我独立完成从产品洞察到设计再到前端开发的全链路交付，用 SDD（Software Design Designer）模式将项目周期从 15pd 压缩至 8pd，活动 UV 提升 146%，订单转化提升 128%。",
    productInsight:
      "我发现春季出行决策链中，用户最大的痛点不是「不想去」，而是「不知道去哪、怎么去」。基于 LBS 数据与花期日历，我将推荐逻辑从品类导向改为场景导向——按距离、花期、人流密度构建目的地卡片，让用户 3 秒内完成「种草→决策」闭环。",
    designCraft:
      "视觉上以花瓣粒子动效构建春日氛围，用渐变色温区分花种类别；交互层采用横滑卡片 + 地图联动，单手可完成浏览→导航全路径。作为设计师我同时完成了前端代码开发，确保设计意图零损耗落地。",
    highlights: [
      "设计师独立完成端到端 C 端页面交付",
      "LBS + 花期数据驱动的场景化推荐",
      "项目周期压缩 47%（15pd → 8pd）",
      "横滑卡片 + 地图联动的轻量交互模式"
    ],
    tags: [
      "SDD",
      "端到端交付",
      "C 端增长",
      "场景设计",
      "数据驱动"
    ],

    media: [
      {
        type: "video",
        url: "/media/flower/demo-video.mp4",
        caption: "赏花目的地推荐 Demo 演示",
        section: "hero",
      }
    ],

    background: {
      businessGoal:
        "春季是本地生活出行的流量高峰，业务目标是通过赏花场景活动撬动到店 GMV 增长，将「赏花」从内容种草转化为订单。",
      userPain:
        "用户春天有强烈的出游意愿，但面临三大痛点：不知道附近哪里有花可赏、不了解花期是否正当时、到达方式和周边配套信息分散难找。",
      marketStatus:
        "各内容平台（小红书、抖音）赏花内容火爆但缺乏即时转化路径；地图类 App 有 POI 但缺少场景化包装和情感共鸣。市场上没有一个产品做到「赏花种草 → 即时决策 → 直接下单」的闭环。",
      competitorAnalysis:
        "携程/飞猪：有赏花专题但偏远途旅游，缺本地近郊场景；小红书：种草强但离交易远，用户看完还需切 App 搜索导航；高德/百度地图：有花海地点但无内容包装、无订单转化。我们的机会在于用 LBS 精准匹配 + 即时下单，把决策链压到最短。",
    },

    requirements: {
      userPersona:
        "25-35 岁都市女性为主，周末有短途出游需求，决策受社交媒体内容影响大，偏好「轻决策」——不想做攻略只想被推荐，注重拍照出片的体验。",
      userJourney:
        "刷到赏花内容产生兴趣 → 想知道附近哪里有 → 对比距离/花期/人流 → 确认目的地 → 查看交通/周边 → 下单（门票/餐饮/出行）。传统路径在「对比」和「确认」之间流失严重，我们的设计目标是让前 4 步在一屏内完成。",
      coreNeeds: [
        "基于定位推荐附近 3-5km 内正在花期的赏花地",
        "一屏展示距离、花种、实时人流密度，辅助快速决策",
        "支持一键导航和关联商品下单"
      ],
      secondaryNeeds: [
        "花期日历提醒（某花即将盛放通知）",
        "用户 UGC 实拍照片参考",
        "多人出行拼车/组队功能"
      ],
    },

    designSolution: {
      informationArchitecture:
        "首屏：沉浸式花瓣动效 + 定位城市 + 「附近花海」入口；第二屏：横滑目的地卡片列表，每张卡片包含花种/距离/花期/人流热力；详情层：地图定位 + 实拍照片 + 周边商品（门票/餐厅/出行）。三层递进，由浅入深。",
      functionalFlow:
        "用户打开活动页 → 自动获取定位 → 展示附近花海卡片 → 横滑浏览/筛选花种 → 点击卡片进入详情 → 查看地图/实拍 → 一键下单。整个核心路径控制在 4 步以内，支持随时返回横滑继续浏览。",
      prototype:
        "采用高保真原型直接在代码中实现——因为 SDD 模式下，我的原型即最终代码。用 Figma 做了初版布局草图后，直接进入 React 组件开发，在浏览器中调整交互细节，省去传统标注交接环节。",
      interactionRules:
        "横滑卡片：惯性滑动 + 吸附效果，当前卡片放大 5%、左右卡片缩小露出 20px 预览；地图联动：滑动卡片时地图标记实时跟随高亮；花瓣粒子：随页面滚动速率动态变化，向上滑时花瓣加速飘落制造沉浸感。",
      pageNotes:
        "活动页面对 SEO 无需求，重点关注首屏加载速度（目标 <1.5s）和低端机适配。花瓣动效在 GPU 内存不足时自动降级为静态背景图；横滑组件使用虚拟列表优化，即使有 50+ 目的地也不卡顿。",
    },

    deliveryResults: {
      iterationLog: [
        "V1.0：核心横滑卡片 + 地图联动上线，验证用户对场景化推荐的接受度",
        "V1.1：增加花期日历和人流实时热力，下单转化率提升 20%",
        "V1.2：加入 UGC 实拍照片模块，用户停留时长增加 35%"
      ],
      dataPerformance: [
      { label: "活动 UV", value: "+146%" },
      { label: "订单转化率", value: "+128%" },
      { label: "人均浏览深度", value: "4.2 页" },
      { label: "首屏加载", value: "1.2s" },
      { label: "次日留存", value: "32%" }
    ],
      userFeedback:
        "用户调研显示 87% 认为「比自己搜攻略方便」，核心好评集中在「定位精准」和「花期实时性」。部分用户反馈希望增加「朋友同行组队」功能。",
    },

    retrospective: {
      strengths: [
        "SDD 模式极大压缩了交付周期，设计师直接编码避免了设计-开发信息损耗",
        "场景化推荐策略精准击中用户「选择焦虑」痛点，转化率远超预期",
        "花瓣动效 + 横滑交互让活动页兼具功能性与情感体验"
      ],
      weaknesses: [
        "首版缺少 UGC 内容，纯数据推荐说服力不够，V1.2 才补上",
        "低端安卓机上花瓣动效偶有掉帧，降级策略触发阈值需更精细",
        "地图联动在横屏 pad 上布局需要适配"
      ],
      optimizationIdeas: [
        "接入 AI 图片识别自动判断花期状态，减少人工运营维护成本",
        "增加 AR 实景赏花预览，提升决策信心",
        "拓展至秋季红叶、冬季雪景等四季场景，复用架构做季节化增长"
      ],
    },
  },
  {
    slug: "food-play-card",
    title: "美食玩法卡",
    subtitle: "AI Coding 驱动的外卖 C 端互动增长实验",
    category: "C 端互动 · AI Coding",
    year: "2025",
    accent: "#ff8c42",
    cover: "/media/food-card/2ff94e1777fa809273ace134d62daf0b.png",
    summary:
      "我用 AI Coding 的方式独立开发了外卖「美食玩法卡」H5 抽卡互动——设计师不再只是输出设计稿，而是直接产出可上线的交互代码，探索了设计与前端协作的新范式，开发效率提升 35%。",
    productInsight:
      "外卖用户的下单决策往往卡在「吃什么」的选择焦虑上。我将抽卡的随机性与美食推荐结合：每张卡片承载一个菜品故事与优惠钩子，用「开盲盒」的愉悦感消解选择压力，同时为商家带来精准曝光。",
    designCraft:
      "交互采用 3D 翻卡 + 物理弹性动效，视觉以插画风格卡面制造收集欲。技术上我使用 Cursor + AI 辅助编码，从设计稿直接推导出组件结构与动画参数，省去了传统设计→标注→开发的转译损耗。",
    highlights: [
      "设计师直接产出可上线 H5 代码",
      "3D 翻卡 + 物理弹性动效的沉浸体验",
      "AI Coding 消除设计-开发转译损耗",
      "随机抽卡机制缓解用户选择焦虑"
    ],
    tags: [
      "AI Coding",
      "H5 互动",
      "C 端增长",
      "设计新范式",
      "Cursor"
    ],

    media: [
      {
        type: "video",
        url: "/media/food-card/flip-card-demo.mp4",
        caption: "美食玩法卡 3D 翻卡交互演示",
        section: "hero",
      },
    ],

    background: {
      businessGoal:
        "外卖业务在午/晚高峰的下单转化率遇到瓶颈——用户打开 App 浏览但不下单的比例持续上升。业务目标是通过互动玩法提升下单决策效率，同时为优质商家带来额外曝光流量。",
      userPain:
        "「今天吃什么」是外卖用户最高频的痛点——选择过载导致决策瘫痪。用户平均浏览 12 家店铺才下单，浏览过程中随时可能流失。用户需要一个「帮我决定」的轻量互动来打破选择僵局。",
      marketStatus:
        "抽卡/盲盒机制在电商（泡泡玛特）和游戏领域已验证强吸引力；外卖领域的互动探索还停留在转盘抽奖、红包雨等传统形式，缺乏与「推荐」结合的创新交互。",
      competitorAnalysis:
        "饿了么：有「今天吃什么」随机推荐但交互单一（摇一摇），缺乏收集感和趣味性；抖音外卖：内容驱动但缺乏互动决策工具；本项目创新点在于将盲盒的「惊喜感」与美食推荐的「功能性」结合，让选择变成一种乐趣而非负担。",
    },

    requirements: {
      userPersona:
        "18-30 岁年轻用户为主，外卖高频消费者（周 3 次以上），对新鲜互动接受度高，有一定盲盒/抽卡消费经验，社交分享意愿强。",
      userJourney:
        "打开外卖 App → 看到玩法卡入口（首页 Banner / Push / 下单后彩蛋）→ 点击进入抽卡页 → 抽取美食卡片 → 查看菜品故事 + 优惠 → 心动则一键下单 → 不满意可再抽 → 集齐特定卡组获额外奖励。",
      coreNeeds: [
        "3D 翻卡交互的流畅体验（目标 60fps）",
        "每张卡片承载一个商家/菜品故事 + 专属优惠",
        "抽卡结果基于用户口味偏好推荐，随机但不无序"
      ],
      secondaryNeeds: [
        "卡片收集册和集卡奖励",
        "社交分享（向朋友送卡/求卡）",
        "限定卡片（节日限定/新店限定）制造稀缺感"
      ],
    },

    designSolution: {
      informationArchitecture:
        "页面结构：顶部卡组主题（如「川菜之魂」「深夜食堂」）→ 中央翻卡区域（3D 卡片堆叠）→ 底部卡片详情（商家/菜品/优惠）→ 行动按钮（下单/再抽/分享）。整体信息密度控制在「每次只关注一张卡」。",
      functionalFlow:
        "用户点击翻卡 → 触发 3D 翻转动画（CSS 3D transform + spring physics）→ 揭示卡面（插画 + 菜品信息）→ 底部滑出详情面板 → 用户选择下单/跳过/分享 → 跳过则下一张自动浮现。单次会话提供 5 张免费抽卡，引导下单后额外赠送 3 次。",
      prototype:
        "我直接用 Cursor + React 编写可交互原型，用 CSS 3D 变换实现翻卡，用 Framer Motion 处理弹性物理动画。这个原型本身就是最终交付代码——AI 辅助补全动画参数和性能优化，设计迭代直接在浏览器中验证。",
      interactionRules:
        "翻卡：点击或上滑触发，翻转时长 600ms，使用 spring(1, 80, 10) 缓动；卡片堆叠：后方卡片缩小 5% + 偏移 8px 形成层次感；详情面板：从底部弹出，使用 sheet 手势可下滑关闭；震动反馈：翻卡瞬间触发轻震（navigator.vibrate）。",
      pageNotes:
        "H5 页面需在美团 App WebView 和微信内打开，兼容 iOS 14+ / Android 8+。3D 变换在部分低端机降级为 2D 滑动；图片资源全部走 CDN + WebP；首屏关键路径只加载当前卡面，其余卡面懒加载。",
    },

    deliveryResults: {
      iterationLog: [
        "V1.0：基础翻卡交互 + 5 张美食卡上线灰度测试，验证用户参与率",
        "V1.1：优化 3D 动效性能，低端机帧率从 30fps 提升至 55fps，加入震动反馈",
        "V1.2：接入口味偏好推荐算法，抽卡转化率提升 22%",
        "V2.0：新增集卡成就系统 + 社交分享裂变，日均 UV 提升 3 倍"
      ],
      dataPerformance: [
      { label: "用户参与率", value: "较常规活动 +68%" },
      { label: "抽卡→下单转化", value: "12.3%" },
      { label: "人均抽卡次数", value: "4.7 次/人" },
      { label: "分享率", value: "18%" }
    ],
      userFeedback:
        "用户调研显示 82% 认为「比直接选菜更有趣」，67% 表示「抽到的菜确实想试试」。商家侧反馈曝光分配更均匀，长尾菜品订单占比提升。",
    },

    retrospective: {
      strengths: [
        "AI Coding 消除了设计-开发之间的翻译损耗，设计意图 100% 还原",
        "抽卡机制精准击中选择困难用户，参与率远超传统优惠弹窗",
        "探索出「设计师写代码」的可复制工作流，团队内推广"
      ],
      weaknesses: [
        "初版 3D 动效在低端机表现不佳，上线后才发现需要降级方案",
        "卡面内容更新依赖运营手动配置，缺少自动化推荐"
      ],
      optimizationIdeas: [
        "接入用户历史偏好实现千人千面的卡面推荐",
        "建立设计师 AI Coding 的标准化 Toolkit，降低团队学习门槛",
        "探索卡片内容 AI 自动生成，减少运营配置成本"
      ],
    },
  },
  {
    slug: "frog-writing-platform",
    title: "蛙蛙写作平台",
    subtitle: "Vibe Coding 重建品牌官网的 0→1 实践",
    category: "品牌官网 · Vibe Coding",
    year: "2025",
    accent: "#10b981",
    cover: "/media/frog-writing/733929576429391c4fa9e05f15866fdd.png",
    summary:
      "我通过 CatDesk + CatPaw 的 Vibe Coding 工作流，7pd 内独立完成了蛙蛙写作平台官网的从设计到开发到部署全流程——一个人顶一个小团队，验证了 PDE 在品牌类项目中的端到端交付能力。",
    productInsight:
      "蛙蛙写作的旧官网信息架构混乱，新用户无法快速理解产品价值。我重新梳理了用户认知路径：「这是什么 → 能帮我做什么 → 别人用得怎样 → 我怎么开始」四层递进结构，首屏 5 秒内传递核心价值主张。",
    designCraft:
      "视觉采用蛙蛙品牌绿为主色，搭配大留白与微动效营造「轻松写作」的调性。技术上全程使用 CatDesk 对话式编程 + CatPaw 自动化部署，从页面结构到响应式适配到上线部署，均在 AI 辅助下高效完成。",
    highlights: [
      "7pd 独立完成官网全流程交付",
      "CatDesk + CatPaw Vibe Coding 工作流",
      "四层认知递进的信息架构",
      "对话式编程驱动设计到部署"
    ],
    tags: [
      "Vibe Coding",
      "品牌官网",
      "CatDesk",
      "端到端",
      "0→1"
    ],

    media: [
      {
        type: "video",
        url: "/media/frog-writing/6月11日.mp4",
        caption: "蛙蛙官网完整录屏",
        section: "hero",
      },
      {
        type: "image",
        url: "/media/frog-writing/design-solution.gif",
        caption: "官网设计方案",
        section: "design",
      },
      {
        type: "image",
        url: "/media/frog-writing/page-structure.gif",
        caption: "页面结构设计",
        section: "design",
      }
    ],

    background: {
      businessGoal:
        "蛙蛙写作平台需要一个全新的品牌官网来支撑市场推广和用户获取——旧官网转化率低、视觉过时、移动端体验差，急需重建以匹配产品升级后的品牌定位。",
      userPain:
        "新用户首次接触蛙蛙写作时，旧官网无法在 10 秒内让他们理解产品是做什么的、跟竞品有什么区别。信息层级混乱导致跳出率高达 72%。",
      marketStatus:
        "AI 写作工具赛道竞争激烈，各家官网同质化严重（都在堆功能列表）。差异化机会在于用情感化叙事替代功能罗列，让用户先「感受到」再「了解到」。",
      competitorAnalysis:
        "竞品如 Notion AI、Jasper 等官网以功能 Demo 为主，信息密度高但情感连接弱。蛙蛙写作的差异点是面向中文创作者的温暖调性，官网需要体现这种「陪伴感」。",
    },

    requirements: {
      userPersona:
        "25-40 岁的内容创作者（自媒体人、文案策划、小说作者），对写作工具有明确需求，关注效率但也在意工具的「调性」是否跟自己匹配。",
      userJourney:
        "搜索/广告点击进入 → 首屏理解产品定位（5s）→ 滚动了解核心功能（15s）→ 查看用户案例建立信任（10s）→ 点击注册/试用。目标全程 < 60s 完成转化。",
      coreNeeds: [
        "首屏 5 秒传递核心价值主张",
        "四层递进信息架构引导认知",
        "移动端优先的响应式设计",
        "注册转化路径 < 3 步"
      ],
      secondaryNeeds: [
        "SEO 友好的语义化结构",
        "加载性能 Lighthouse 90+ 分",
        "支持暗色模式",
        "国际化预留"
      ],
    },

    designSolution: {
      informationArchitecture:
        "四层认知递进：Hero（这是什么）→ Features（能帮我做什么）→ Testimonials（别人用得怎样）→ CTA（我怎么开始）。每层有且仅有一个核心信息点。",
      functionalFlow:
        "全程 Vibe Coding 驱动：用 CatDesk 对话式描述页面结构 → AI 生成组件代码 → 实时预览调整 → CatPaw 自动化构建部署。无传统设计稿环节，直接在代码中迭代。",
      prototype:
        "跳过线框图阶段，用自然语言描述每个 Section 的内容与视觉意图，AI 直接生成高保真页面。在浏览器中实时调整间距、颜色、动效直到满意。",
      interactionRules:
        "滚动触发的渐显动效引导视线流动；CTA 按钮在首屏和末屏各出现一次；移动端底部常驻悬浮注册条；所有外链新窗口打开不打断浏览流。",
      pageNotes:
        "品牌绿 (#10B981) 为主色，大面积留白营造呼吸感。标题用 48px 加粗，正文 16px 1.75 行高保证长文可读性。微动效仅用于状态切换和内容进入，不做纯装饰动画。",
    },

    deliveryResults: {
      iterationLog: [
        "Day 1-2：信息架构梳理 + CatDesk 对话生成页面骨架",
        "Day 3-4：视觉细节打磨 + 响应式适配 + 动效添加",
        "Day 5-6：内容填充 + SEO 优化 + 性能调优",
        "Day 7：CatPaw 自动化部署上线 + 监控配置"
      ],
      dataPerformance: [
      { label: "Lighthouse 性能", value: "95+" },
      { label: "首屏加载", value: "< 1.2s" },
      { label: "移动端跳出率", value: "较旧站 -38%" },
      { label: "注册转化率", value: "较旧站 +52%" }
    ],
      userFeedback:
        "产品团队反馈「终于有一个配得上产品气质的官网了」；用户调研显示新官网的品牌认知准确率从 34% 提升至 78%，用户能准确描述蛙蛙写作是做什么的。",
    },

    retrospective: {
      strengths: [
        "Vibe Coding 工作流让一个人实现了传统需要设计+前端+运维三人的工作",
        "对话式编程保留了设计思维的连贯性，避免了设计→开发的意图损耗",
        "7pd 的交付速度远超同类项目常规周期（通常 3-4 周）"
      ],
      weaknesses: [
        "部分复杂交互的 AI 生成代码质量参差，需要手动优化",
        "跳过设计稿环节导致缺少可归档的视觉规范文档"
      ],
      optimizationIdeas: [
        "补充 Design Token 文档以支持后续页面扩展",
        "探索 CatDesk + CatPaw 在更复杂产品官网（多页面、多语言）场景下的极限",
        "建立 Vibe Coding 品牌官网的模板化工作流，支持团队复用"
      ],
    },
  }
];

export const featuredProjects: Project[] = rawFeaturedProjects.map(applyWorkEdits);

export function getProject(slug: string) {
  return featuredProjects.find((p) => p.slug === slug);
}
