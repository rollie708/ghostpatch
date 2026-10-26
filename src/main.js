import './style.css';

const capabilities = [
  { n: '01', title: 'Contract visibility', text: 'A clearer view of what a contract contains and how its pieces connect — designed to make technical context easier to navigate.' },
  { n: '02', title: 'Risk signals', text: 'Research into useful signals that can help people ask better questions about on-chain code and its behavior.' },
  { n: '03', title: 'Research, together', text: 'A community-led approach to security research, with room for builders and curious minds to shape what comes next.' },
];

document.querySelector('#app').innerHTML = `
  <header class="topbar"><a class="brand" href="#home" aria-label="GHOSTPATCH home"><img src="/ghostpatch-mark.svg" alt="" width="36" height="36"><span>GHOST<span class="brand-light">PATCH</span></span></a><nav aria-label="Main navigation"><a href="#about">About</a><a href="#vision">The vision</a><a href="#community">Community</a><a class="nav-cta" href="#join">Get early access <span aria-hidden="true">↗</span></a></nav><button class="menu-toggle" aria-expanded="false" aria-label="Open navigation">☰</button></header>
  <main id="home">
    <section class="hero wrap"><div class="hero-copy"><div class="eyebrow"><span class="pulse"></span> AN EARLY-STAGE SECURITY RESEARCH PROJECT</div><h1>See what’s<br>hiding in the <span>code.</span></h1><p class="hero-lede">The next layer of on-chain security should be easier to see, understand, and question.</p><p class="hero-note">We’re exploring what that could look like. GHOSTPATCH is in early development — come follow the build.</p><div class="hero-actions"><a class="button primary" href="#join">Join early access <span aria-hidden="true">→</span></a><a class="text-link" href="#about">Get to know us <span aria-hidden="true">↓</span></a></div><div class="hero-meta"><span><i></i> EARLY DAYS. OPEN BUILD.</span><span>NO TOKEN. NO HYPE. JUST RESEARCH.</span></div></div><div class="hero-art" aria-hidden="true"><div class="art-grid"></div><div class="orbit orbit-a"></div><div class="orbit orbit-b"></div><div class="core-mark"><img src="/ghostpatch-mark.svg" alt=""></div><span class="art-tag tag-top">SIGNAL / NOT NOISE</span><span class="art-tag tag-bottom">SURFACE AREA // 001</span><span class="art-cross cross-a">+</span><span class="art-cross cross-b">+</span></div></section>
    <section class="ticker" aria-label="Project principles"><div>CLARITY OVER COMPLEXITY <b>✳</b> SECURITY STARTS WITH VISIBILITY <b>✳</b> BUILT IN THE OPEN <b>✳</b> CLARITY OVER COMPLEXITY <b>✳</b> SECURITY STARTS WITH VISIBILITY</div></section>
    <section class="section wrap about" id="about"><div class="section-label">01 / THE WHY</div><div class="about-copy"><h2>Good security starts with <span>seeing clearly.</span></h2><p>Smart contracts are public. Understanding them shouldn’t feel out of reach. GHOSTPATCH is an early-stage project exploring ways to make security research more approachable, informative, and useful to the people building on-chain.</p><p>We’re at the beginning. The ideas are taking shape, and we’re sharing the journey as we go.</p><a class="inline-link" href="#join">Be part of the beginning <span>↗</span></a></div><div class="about-stamp"><span>G/P</span><small>INDEPENDENT<br>RESEARCH<br>PROJECT</small></div></section>
    <section class="vision" id="vision"><div class="wrap"><div class="section-label">02 / WHAT WE’RE EXPLORING</div><div class="vision-heading"><h2>A direction,<br>not a finished product.</h2><p>These are areas of exploration, not features you can use today. We’ll share more as the work develops.</p></div><div class="cards">${capabilities.map(c=>`<article class="card"><div class="card-top"><span>${c.n} / EXPLORING</span><span class="card-arrow">↗</span></div><div class="card-icon">${c.n === '01' ? '⌘' : c.n === '02' ? '◉' : '⌬'}</div><h3>${c.title}</h3><p>${c.text}</p><div class="card-foot"><span>IN RESEARCH</span><span class="status-dot"></span></div></article>`).join('')}</div></div></section>
    <section class="join wrap" id="join"><div class="join-panel"><div class="join-glow"></div><div class="section-label">03 / GET IN EARLY</div><h2>Curious where this goes?</h2><p class="join-intro">Get occasional project updates and an invitation to shape the conversation. No noise, no promises about launch dates.</p><form id="signup" novalidate><label for="email">YOUR EMAIL ADDRESS</label><div class="form-row"><input id="email" name="email" type="email" autocomplete="email" placeholder="you@example.com" required maxlength="254" aria-describedby="signup-status"><button class="button primary" type="submit">Join the list <span aria-hidden="true">→</span></button></div><div id="signup-status" role="status" aria-live="polite"></div><p class="privacy">By joining, you agree to receive occasional GHOSTPATCH updates. Unsubscribe anytime.</p></form></div></section>
    <section class="community wrap" id="community"><div class="section-label">04 / FIND US</div><div><h2>Stay close to the signal.</h2><p>Follow the work as the project takes shape. Community links will be added here when official channels are ready.</p></div><span class="community-note"><i></i> CHANNELS IN THE WORKS</span></section>
  </main><footer><div class="footer-inner wrap"><a class="brand" href="#home"><img src="/ghostpatch-mark.svg" alt="" width="32" height="32"><span>GHOST<span class="brand-light">PATCH</span></span></a><span class="footer-copy">An early-stage security research project.<br>Built with curiosity. Shared in the open.</span><a href="#home" class="back-top">BACK TO TOP ↑</a><span class="copyright">© <span id="year"></span> GHOSTPATCH</span></div></footer>`;

document.querySelector('#year').textContent = new Date().getFullYear();
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  document.querySelector('nav').classList.toggle('nav-open', !open);
});
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => {
  document.querySelector('nav').classList.remove('nav-open'); menu.setAttribute('aria-expanded', 'false');
}));

const form = document.querySelector('#signup');
const status = document.querySelector('#signup-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const email = new FormData(form).get('email').trim();
  const input = form.querySelector('input');
  if (!input.checkValidity()) { input.reportValidity(); return; }
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    status.className = 'message error';
    status.textContent = 'The early-access list is not open yet. Signup is temporarily unavailable — please check back soon.';
    return;
  }
  const button = form.querySelector('button'); button.disabled = true; button.textContent = 'Submitting…';
  status.className = ''; status.textContent = '';
  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/early_access`, {
      method: 'POST', headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error(response.status === 409 ? 'already' : 'save');
    status.className = 'message success'; status.textContent = 'You’re on the list. Thanks for being here from the start.'; form.reset();
  } catch (error) {
    status.className = 'message error';
    status.textContent = error.message === 'already' ? 'That email is already on the list — thanks for your interest.' : 'We couldn’t save your signup just now. Please try again in a little while.';
  } finally { button.disabled = false; button.innerHTML = 'Join the list <span aria-hidden="true">→</span>'; }
});
