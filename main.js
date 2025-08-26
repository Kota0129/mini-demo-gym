// Intersection Observerで各ステップに .in-view を付与
const steps = document.querySelectorAll('.step');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in-view');
      // 一度だけでOKなら↓
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

steps.forEach(s=>io.observe(s));

// スクロール進捗バー（journeyセクション内の割合でwidthを更新）
const journey = document.getElementById('journey');
const progressBar = document.getElementById('progressBar');

function updateProgress(){
  if(!journey || !progressBar) return;
  const rect = journey.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;

  // セクションが画面に入り始め〜抜け終わるまでを0→1に正規化
  const total = rect.height + vh*0.5; // 少し余白
  const seen = Math.min(Math.max(vh*0.5 - rect.top, 0), total);
  const ratio = total ? (seen / total) : 0;

  progressBar.style.width = `${Math.round(ratio*100)}%`;
}
updateProgress();
window.addEventListener('scroll', updateProgress, { passive:true });
window.addEventListener('resize', updateProgress);
