const sections = [...document.querySelectorAll('.case-section')];
const links = [...document.querySelectorAll('.chapter-link')];
const nav = document.querySelector('.chapter-nav');
const selector = document.getElementById('chapter-select');
const progress = document.querySelector('.reading-track i');
let current = '';
function updateReading() {
  const threshold = matchMedia('(max-width:760px)').matches ? 160 : 145;
  let active = sections[0];
  for (const section of sections) { if (section.getBoundingClientRect().top <= threshold) active = section; else break; }
  if (scrollY > 0 && document.documentElement.scrollHeight - innerHeight - scrollY < 3) active = sections[sections.length - 1];
  if (current !== active.id) {
    current = active.id;
    links.forEach(link => {
      if (link.hash === '#' + current) {
        link.setAttribute('aria-current', 'location');
        const rect=link.getBoundingClientRect(), bounds=nav.getBoundingClientRect();
        if (rect.top < bounds.top || rect.bottom > bounds.bottom) nav.scrollTop += rect.top-bounds.top-bounds.height/2+rect.height/2;
      } else link.removeAttribute('aria-current');
    });
    selector.value = current;
    document.getElementById('current-page').textContent = current.split('-')[1] + ' / 19';
  }
  const available = document.documentElement.scrollHeight-innerHeight;
  progress.style.transform = `scaleX(${available>0 ? Math.min(1,Math.max(0,scrollY/available)) : 1})`;
}
let scheduled=false;
function scheduleUpdate(){if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;updateReading()});}
addEventListener('scroll',scheduleUpdate,{passive:true});addEventListener('resize',scheduleUpdate);addEventListener('load',scheduleUpdate);
selector.addEventListener('change',()=>{location.hash=selector.value;});
links.forEach(link=>link.addEventListener('click',()=>{const target=document.getElementById(link.hash.slice(1));if(target)selector.value=target.id;}));
updateReading();
