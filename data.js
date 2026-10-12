/* =========================================================================
 *  只需要改这一个文件 —— data.js
 *  ------------------------------------------------------------------------
 *  规则很简单：
 *   1. 所有中文写字的地方，都用一对单引号 ' 包起来
 *   2. 暂时没有的内容，把引号里留空 ''，页面上会自动变成占位提示，不会难看
 *   3. 删掉整个 { ... } 对象，对应卡片也会跟着消失
 *   4. 图片路径统一写成  'assets/文件名.png'  （图片放进 assets 文件夹里）
 *  改完保存，双击 index.html 就能看效果。
 * ========================================================================= */

const SITE = {

  /* ---------- 【一】页头和首页 ---------- */
  hero: {
    name: '明路路',
    avatar: '',                       // 证件照/形象照，建议正方形，例如 'assets/avatar.jpg'
    target: '求职意向：初中信息技术教师',
    tagline: '用学生玩得起来的方式，讲清楚技术的本质',
    intro: '我是安徽师范大学现代教育技术（师范）专业应届毕业生，喜欢把抽象的信息技术知识拆成学生能亲手完成的小作品。相信一节好课的标准不是讲了多少，而是学生下课后还想继续做。',
    primaryBtn:  { label: '查看我的作品', href: '#teaching' },
    secondaryBtn:{ label: '联系我',       href: '#contact'  }
  },

  /* ---------- 【二】关于我 ---------- */
  about: {
    eyebrow: 'About me',
    title: '关于我',
    desc: '技术与教学的结合点，是我一直投入的方向。',
    paragraphs: [
      '习惯用任务驱动拆解知识点 每节课给时间让学生自己动手做作品 '
    ],
    // 一行一句的基本信息，留空的会自动隐藏
    facts: [
      { label: '学历专业', value: '安徽师范大学 · 现代教育技术 · 硕士研究生' },
      { label: '教师资格', value: '高级中学信息技术教师资格证' },
      { label: '实习经历', value: '芜湖弋江中学 · 信息技术实习教师' }
    ]
  },

  /* ---------- 【三】教学课件（信息技术 PPT）---------- */
  teaching: {
    eyebrow: 'Teaching',
    title: '教学课件与设计',
    desc: '按课时设计的完整课件，含情境导入、任务单与课堂检测。封面建议放课件首页截图。',
    items: [
      {
        title: '《认识算法与流程图》',
        tag: '七年级',
        desc: '用"泡一杯奶茶"的生活案例引入算法的顺序、分支、循环三种结构，配套课堂流程图小练习。',
        cover: '',                    // 例：'assets/kejian-01.png'
        gallery: [],                  // 可以再放几张内页截图：['assets/k1a.png','assets/k1b.png']
        links: [
          { label: '查看 / 下载课件', href: '' }   // 填公开链接，例如腾讯文档、百度网盘分享链接
        ]
      },
      {
        title: '《Scratch 入门：让角色动起来》',
        tag: '七年级 · 8 课时',
        desc: '连贯的入门单元设计，从坐标、事件到循环，含分层任务单，照顾不同进度的学生。',
        cover: '',
        gallery: [],
        links: [ { label: '查看 / 下载课件', href: '' } ]
      },
      {
        title: '《网络安全与信息素养》',
        tag: '八年级',
        desc: '情景剧导入 + 小组辩论，讨论密码安全、网络身份与信息甄别，附课堂辩论评分表。',
        cover: '',
        gallery: [],
        links: [ { label: '查看 / 下载课件', href: '' } ]
      },
      {
        title: '《Excel 数据处理初步》',
        tag: '八年级',
        desc: '以学生自己的成绩表为素材做任务驱动，讲透相对引用、公式与图表呈现。',
        cover: '',
        gallery: [],
        links: [ { label: '查看 / 下载课件', href: '' } ]
      }
    ]
  },

  /* ---------- 【四】编程与创作（sb3 作品 + 小游戏）---------- */
  coding: {
    eyebrow: 'Creation',
    title: '编程作品',
    desc: '图形化编程与自制小作品。在线可玩',
    items: [
      {
        title: 'Scratch 作品集（sb3 源文件）',
        tag: 'Scratch · sb3',
        desc: '若干原创 Scratch 作品，涵盖动画、交互故事与益智小游戏，均提供可二次编辑的 sb3 源文件。',
        cover: '',
        gallery: [],
        // ★ 想让访客直接在网页上玩，就把 sb3 传到网上后填这里（README 里有做法）
        embed: '',
        links: [ { label: '源文件下载', href: '' } ]
      },
      {
        title: '钓鱼小游戏（开发中）',
        tag: 'Scratch · 制作中',
        desc: '以钓鱼为题材的休闲小游戏：随机鱼群、稀有度分级、积分与商店系统。目前已完成核心玩法，正在打磨手感与美术。',
        cover: '',
        gallery: [],
        embed: '',
        links: [ { label: '试玩 Demo', href: '' }, { label: '查看进度', href: '' } ]
      },
      {
        title: 'Python 小工具集',
        tag: 'Python',
        desc: '面向日常教学的小脚本，如成绩统计、随机点名、作业文件批量整理。',
        cover: '',
        gallery: [],
        embed: '',
        links: [ { label: '查看代码', href: '' } ]
      }
    ]
  },

  /* ---------- 【五】GitHub 项目 ---------- */
  opensource: {
    eyebrow: 'Open source',
    title: 'GitHub 项目',
    desc: '把仓库直接推给对方看，是最直接的能力证明。',
    githubUser: 'xiaoming0303',
    items: [
      {
        title: '项目名称一',
        tag: '主要语言',
        desc: '一两句话说明这个项目做什么、解决了什么问题、你自己负责哪部分。',
        cover: '',
        gallery: [],
        links: [ { label: '代码仓库', href: '' } ]
      },
      {
        title: '项目名称二',
        tag: '主要语言',
        desc: '一两句话说明这个项目做什么、解决了什么问题、你自己负责哪部分。',
        cover: '',
        gallery: [],
        links: [ { label: '代码仓库', href: '' } ]
      }
    ]
  },

  /* ---------- 【六】简历下载 ---------- */
  resume: {
    title: '想看完整简历？',
    desc: '这份线上作品集是简历的补充说明：PDF 简历负责讲清楚经历，这里负责让经历变得可见。',
    // 把 PDF 放进 assets 文件夹，命名 resume.pdf，下面的路径就不用动
    file: 'assets/resume.pdf',
    btnLabel: '下载 PDF 简历'
  },

  /* ---------- 【七】联系方式 ---------- */
  contact: {
    eyebrow: 'Contact',
    title: '联系我',
    desc: '随时欢迎交流，看到邮件一般当天回复。',
    items: [
      { label: '邮箱',   value: '2827098045@qq.com',  href: 'mailto:2827098045@qq.com' },
      { label: '电话',   value: '134 7081 4729 ',    href: '' },
      { label: '微信',   value: '微信号 ulul6gnim',        href: '' },
      { label: '在线作品集', value: 'xiaoming0303.github.io', href: 'https://xiaoming0303.github.io' },
      { label: 'GitHub', value: 'github.com/xiaoming0303', href: 'https://github.com/xiaoming0303' }
    ],
    footer: '© 2026 明路路 · 在线作品集 xiaoming0303.github.io · 本站由 HTML + CSS 手写，托管于 GitHub Pages'
  }
};
