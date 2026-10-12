/* =========================================================================
 *  app.js —— 渲染逻辑，一般不用改
 * ========================================================================= */

(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function has(v) { return typeof v === 'string' && v.trim() !== ''; }
  function hrefOk(v) { return has(v) && v !== '#'; }

  /* ---------- 通用：区块标题 ---------- */
  function paintHead(id, cfg) {
    var sec = document.getElementById(id);
    if (!sec || !cfg) { return; }
    $('.eyebrow', sec).textContent = cfg.eyebrow || '';
    $('h2', sec).textContent = cfg.title || '';
    $('.sec-desc', sec).textContent = cfg.desc || '';
  }

  /* ---------- 通用：封面 / 占位 ---------- */
  function coverHTML(item, index, dir) {
    var phText = '<div class="ph">封面图待补充<br>把图片放进 assets 文件夹，<br>再在 data.js 里填 <code>' +
      esc(dir || 'assets/xxx.png') + '</code></div>';
    if (has(item.cover)) {
      return '<img src="' + esc(item.cover) + '" alt="' + esc(item.title) + '">';
    }
    if (has(item.embed)) {
      phText = '<div class="ph">可嵌入在线试玩<br>或补一张封面截图</div>';
    }
    if (index > 0) { phText = '<div class="ph">封面图待补充</div>'; }
    return phText;
  }

  function galleryHTML(item) {
    if (!Array.isArray(item.gallery) || item.gallery.length === 0) { return ''; }
    return '<div class="thumb-row">' + item.gallery
      .filter(has)
      .map(function (g) { return '<img src="' + esc(g) + '" alt="作品截图">'; })
      .join('') + '</div>';
  }

  function linksHTML(item, kind) {
    var list = (Array.isArray(item.links) ? item.links : []).filter(function (l) { return hrefOk(l && l.href); });
    if (list.length) {
      return '<div class="links">' + list.map(function (l) {
        return '<a href="' + esc(l.href) + '" target="_blank" rel="noopener">' + esc(l.label || '查看') + '</a>';
      }).join('') + '</div>';
    }
    if (kind === 'muted') {
      return '<div class="links"><span class="ph" style="border:0;padding:0;text-align:left">链接待补充</span></div>';
    }
    return '';
  }

  function cardHTML(item, i, dir) {
    var top;
    if (has(item.embed)) {
      top = '<div class="embed-box"><iframe src="' + esc(item.embed) +
            '" allowfullscreen loading="lazy" title="' + esc(item.title) + '"></iframe></div>';
    } else {
      top = '<div class="cover">' + coverHTML(item, i, dir) + '</div>';
    }
    return '<article class="card">' + top +
      '<div class="card-body">' +
        '<h3>' + esc(item.title) + '</h3>' +
        (has(item.tag) ? '<span class="tag">' + esc(item.tag) + '</span>' : '') +
        (has(item.desc) ? '<p>' + esc(item.desc) + '</p>' : '') +
        galleryHTML(item) +
        linksHTML(item, 'muted') +
      '</div></article>';
  }

  function gridHTML(list, dir) {
    return (Array.isArray(list) ? list : []).map(function (it, i) { return cardHTML(it, i, dir); }).join('');
  }

  /* ---------- 导航 ---------- */
  function renderNav() {
    $('#brand').textContent = SITE.hero.name + ' · 作品集';
    var sections = [
      { id: 'about',       label: '关于我',   on: !!(SITE.about && (SITE.about.title || []).length !== 0) },
      { id: 'teaching',    label: '教学课件', on: !!(SITE.teaching && SITE.teaching.items && SITE.teaching.items.length) },
      { id: 'coding',      label: '编程作品', on: !!(SITE.coding && SITE.coding.items && SITE.coding.items.length) },
      { id: 'opensource',  label: 'GitHub',   on: !!(SITE.opensource && SITE.opensource.items && SITE.opensource.items.length) },
      { id: 'resume',      label: '简历',     on: has(SITE.resume && SITE.resume.file) },
      { id: 'contact',     label: '联系',     on: !!(SITE.contact && SITE.contact.items && SITE.contact.items.length) }
    ];
    $('#navlinks').innerHTML = sections
      .filter(function (s) { return s.on; })
      .map(function (s) { return '<a href="#' + s.id + '">' + s.label + '</a>'; })
      .join('');
  }

  /* ---------- 首页 ---------- */
  function renderHero() {
    var h = SITE.hero;
    document.title = h.name + ' · 初中信息技术教师作品集';
    var avatar = has(h.avatar)
      ? '<img src="' + esc(h.avatar) + '" alt="' + esc(h.name) + '">'
      : '<div class="ph" style="width:80%">形象照<br>建议 1:1 生活照<br><code>assets/avatar.jpg</code></div>';

    $('#hero').innerHTML =
      '<div>' +
        (has(h.target) ? '<span class="badge">' + esc(h.target) + '</span>' : '') +
        '<h1>你好，我是 ' + esc(h.name) + '</h1>' +
        (has(h.tagline) ? '<div class="tagline">' + esc(h.tagline) + '</div>' : '') +
        (has(h.intro) ? '<p class="intro">' + esc(h.intro) + '</p>' : '') +
        '<div class="btn-row">' +
          ((h.primaryBtn && hrefOk(h.primaryBtn.href)) ? '<a class="btn btn-primary" href="' + esc(h.primaryBtn.href) + '">' + esc(h.primaryBtn.label) + '</a>' : '') +
          ((h.secondaryBtn && hrefOk(h.secondaryBtn.href)) ? '<a class="btn btn-ghost" href="' + esc(h.secondaryBtn.href) + '">' + esc(h.secondaryBtn.label) + '</a>' : '') +
        '</div>' +
      '</div>' +
      '<div class="avatar">' + avatar + '</div>';
  }

  /* ---------- 关于我 ---------- */
  function renderAbout() {
    var a = SITE.about;
    if (!a) { return; }
    var facts = (a.facts || []).filter(function (f) { return has(f.value); });
    var left =
      '<div class="about-text">' +
        (a.paragraphs || []).filter(has).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
        (facts.length ? '<div class="facts">' + facts.map(function (f) {
          return '<div class="fact"><div class="k">' + esc(f.label) + '</div><div class="v">' + esc(f.value) + '</div></div>';
        }).join('') + '</div>' : '') +
      '</div>';
    var skills = (a.skills || []).filter(function (s) { return has(s.name); });
    var right = skills.length
      ? '<div>' + skills.map(function (s) {
          var v = Math.max(0, Math.min(100, Number(s.score) || 0));
          return '<div class="skill"><div class="skill-row"><span>' + esc(s.name) + '</span><span>' + v + '</span></div>' +
                 '<div class="bar"><i style="width:' + v + '%"></i></div></div>';
        }).join('') + '</div>'
      : '';
    $('#aboutBody').innerHTML = left + right;
  }

  /* ---------- 各卡片区 ---------- */
  var cardSections = [
    { key: 'teaching',   el: '#teachingBody',   dir: 'assets/kejian.png' },
    { key: 'coding',     el: '#codingBody',     dir: 'assets/works.png' },
    { key: 'opensource', el: '#opensourceBody', dir: 'assets/repo.png' }
  ];

  function renderCardSections() {
    cardSections.forEach(function (s) {
      var cfg = SITE[s.key];
      if (!cfg) { return; }
      paintHead(s.id || s.key, cfg);
      $(s.el).innerHTML = gridHTML(cfg.items, s.dir);
    });
    paintHead('teaching', SITE.teaching);
    paintHead('coding', SITE.coding);
    paintHead('opensource', SITE.opensource);
    paintHead('about', SITE.about);
    paintHead('contact', SITE.contact);

    if (SITE.opensource && has(SITE.opensource.githubUser)) {
      $('#githubTip').innerHTML = '完整代码在 <a href="https://github.com/' + esc(SITE.opensource.githubUser) +
        '" target="_blank" rel="noopener" style="color:var(--accent)">github.com/' + esc(SITE.opensource.githubUser) + '</a>';
    }
  }

  /* ---------- 简历 ---------- */
  function renderResume() {
    var r = SITE.resume;
    if (!r) { return; }
    if (has(r.file)) {
      $('#resumeBox').innerHTML =
        '<div><h3>' + esc(r.title) + '</h3><p>' + esc(r.desc) + '</p></div>' +
        '<a class="btn btn-primary" href="' + esc(r.file) + '" download>' + esc(r.btnLabel || '下载简历') + '</a>';
    } else {
      $('#resumeBox').innerHTML =
        '<div><h3>' + esc(r.title) + '</h3><p>' + esc(r.desc) + '</p>' +
        '<div class="tip">还没上传：把简历 PDF 重命名为 resume.pdf，放进 assets 文件夹即可自动生效。</div></div>';
    }
  }

  /* ---------- 联系 + 页脚 ---------- */
  function renderContact() {
    var c = SITE.contact;
    if (!c) { return; }
    $('#contactBody').innerHTML = (c.items || []).filter(function (i) { return has(i.value); }).map(function (i) {
      var inner = '<div class="k">' + esc(i.label) + '</div><div class="v">' + esc(i.value) + '</div>';
      return hrefOk(i.href)
        ? '<a class="contact-item" href="' + esc(i.href) + '"' + (i.href.indexOf('http') === 0 ? ' target="_blank" rel="noopener"' : '') + '>' + inner + '</a>'
        : '<div class="contact-item">' + inner + '</div>';
    }).join('');
    if ($('#footer')) { $('#footer').textContent = c.footer || ''; }
  }

  /* ---------- 启动 ---------- */
  try {
    renderNav();
    renderHero();
    renderAbout();
    renderCardSections();
    renderResume();
    renderContact();
  } catch (e) {
    document.body.insertAdjacentHTML('afterbegin',
      '<div style="padding:16px;margin:16px;border:1px solid #e6e8ec;border-radius:12px;background:#fff5f5;color:#a32d2d;font-size:14px">' +
      'data.js 好像出了点问题，检查一下引号或逗号是不是漏了：<br><code>' + esc(e.message) + '</code></div>');
  }
})();
