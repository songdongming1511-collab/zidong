const config = window.PORTFOLIO;
const nav = document.querySelector('.header nav');
const menu = document.querySelector('.menu-button');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? '收起导航' : '展开导航');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', '展开导航');
}));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', '展开导航'); menu.focus(); } });
const observed = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { nav.querySelectorAll('a').forEach(a => { const active = a.hash === '#' + entry.target.id; a.classList.toggle('active', active); if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); } });
}, { rootMargin: '-15% 0px -60% 0px' });
['about', 'expertise', 'work'].forEach(id => observed.observe(document.getElementById(id)));
const projects = [...document.querySelectorAll('.project')];
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => { const selected = b === button; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected)); });
  projects.forEach(p => { p.hidden = filter !== 'all' && p.dataset.category !== filter; });
  document.getElementById('filter-status').textContent = `显示 ${projects.filter(p => !p.hidden).length} 个项目`;
}));
function openDialog(dialog) { dialog.showModal(); document.body.classList.add('modal-open'); }
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
});
const projectDialog = document.getElementById('project-dialog');
projects.forEach(project => project.addEventListener('click', () => {
  if (project.tagName === 'A') return;
  const data = config.projects[project.dataset.project];
  projectDialog.querySelector('.dialog-eyebrow').textContent = data.category;
  projectDialog.querySelector('h2').textContent = data.title;
  projectDialog.querySelector('.dialog-description').textContent = data.description;
  projectDialog.querySelectorAll('dd')[0].textContent = data.role;
  projectDialog.querySelectorAll('dd')[2].textContent = data.outcome;
  openDialog(projectDialog);
}));
document.querySelector('.dialog-done').addEventListener('click', () => projectDialog.close());
const contactDialog = document.getElementById('contact-dialog');
document.getElementById('contact-button').addEventListener('click', () => openDialog(contactDialog));
document.getElementById('contact-work').addEventListener('click', () => contactDialog.close());
function safeUrl(value) { try { const url = new URL(value, location.href); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } }
if (config.portraitUrl && safeUrl(config.portraitUrl)) {
  const img = document.querySelector('.portrait-image img');
  img.addEventListener('load', () => { img.alt = '紫咚的个人照片'; document.querySelector('.portrait-tag').textContent = 'ZIDONG / DESIGN DIRECTOR'; }, { once: true });
  img.addEventListener('error', () => { img.src = 'assets/portrait-placeholder.svg'; img.alt = '照片加载失败，暂时显示个人照片占位'; document.querySelector('.portrait-tag').textContent = 'PORTRAIT / 待添加本人照片'; }, { once: true });
  img.src = safeUrl(config.portraitUrl);
}
if (config.resumeUrl && safeUrl(config.resumeUrl)) {
  const old = document.querySelector('.resume-button');
  const link = document.createElement('a'); link.className = 'resume-button'; link.href = safeUrl(config.resumeUrl); link.target = '_blank'; link.rel = 'noopener'; link.textContent = '查看个人简历 ↗'; old.replaceWith(link);
}
if (config.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail)) {
  const description = contactDialog.querySelector('.dialog-description'); description.textContent = '欢迎交流产品体验、AI 设计与创意合作。';
  const link = document.createElement('a'); link.className = 'button primary'; link.href = 'mailto:' + config.contactEmail; link.textContent = '发送邮件 ↗'; document.getElementById('contact-work').replaceWith(link);
  document.querySelector('.contact-bottom > span').textContent = config.contactEmail;
}
