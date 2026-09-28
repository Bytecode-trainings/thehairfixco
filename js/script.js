(function(){
  // Theme toggle
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  function applyTheme(t){
    if(t){ root.setAttribute('data-theme', t); } else { root.removeAttribute('data-theme'); }
  }
  try{
    var saved = localStorage.getItem('hfc-theme');
    if(saved) applyTheme(saved);
  }catch(e){}
  toggle.addEventListener('click', function(){
    var current = root.getAttribute('data-theme');
    var next = current === 'light' ? 'dark' : (current === 'dark' ? '' : (matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark'));
    applyTheme(next);
    try{ localStorage.setItem('hfc-theme', next); }catch(e){}
  });

  // Mobile menu toggle
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', function(){
    var isOpen = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuBtn.textContent = isOpen ? '✕' : '☰';
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      mobileMenu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded','false');
      menuBtn.textContent = '☰';
    });
  });

  // Copy phone number
  var copyBtn = document.getElementById('copyBtn');
  var phoneText = document.getElementById('phoneText').textContent.trim();
  copyBtn.addEventListener('click', function(){
    function done(){ copyBtn.textContent = 'Copied!'; setTimeout(function(){ copyBtn.textContent = 'Copy number'; }, 1800); }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(phoneText).then(done).catch(function(){ fallbackCopy(); });
    } else { fallbackCopy(); }
    function fallbackCopy(){
      var ta = document.createElement('textarea');
      ta.value = phoneText; document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); }catch(e){}
      document.body.removeChild(ta); done();
    }
  });

  // Booking form -> Web3Forms (free form-relay, no backend to host).
  // Get a free access key at https://web3forms.com and paste it into the
  // hidden "access_key" input above, replacing YOUR_WEB3FORMS_ACCESS_KEY.
  var form = document.getElementById('bookingForm');
  var success = document.getElementById('successBox');
  var resetBtn = document.getElementById('resetForm');
  var submitBtn = document.getElementById('submitBtn');
  var formNote = document.getElementById('formNote');
  var formNoteDefault = formNote.textContent;

  function showNoteError(msg){
    formNote.textContent = msg;
    formNote.style.color = 'var(--accent-2)';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var key = form.access_key.value;
    if(!key || key === 'YOUR_WEB3FORMS_ACCESS_KEY'){
      showNoteError('Booking form isn\'t connected yet — please use WhatsApp or call for now.');
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function(res){ return res.json(); })
      .then(function(data){
        if(data && data.success){
          form.classList.add('hide');
          success.classList.add('show');
        } else {
          showNoteError('Something went wrong sending that — please try WhatsApp instead.');
        }
      })
      .catch(function(){
        showNoteError('Could not reach the server — please try WhatsApp instead.');
      })
      .then(function(){
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request a Consultation';
      });
  });
  resetBtn.addEventListener('click', function(){
    form.reset();
    success.classList.remove('show');
    form.classList.remove('hide');
    formNote.textContent = formNoteDefault;
    formNote.style.color = '';
  });

  // Scroll-reveal — watches [data-reveal] elements and adds .is-visible when in viewport
  (function(){
    var revealEls = document.querySelectorAll('[data-reveal]');
    if(!revealEls.length || !('IntersectionObserver' in window)) {
      // Fallback: just show everything immediately
      revealEls.forEach(function(el){ el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ observer.observe(el); });
  })();

  // ---- Scroll progress bar ----
  var progBar = document.getElementById('progressBar');

  // ---- Active nav link tracking ----
  var navAnchors = document.querySelectorAll('nav.links a[href^="#"], .mobile-menu a[href^="#"]');
  var sectionMap = [];
  (function(){
    var seen = {};
    navAnchors.forEach(function(a){
      var id = a.getAttribute('href').slice(1);
      if(!seen[id]){ var el = document.getElementById(id); if(el) sectionMap.push({id:id,el:el}); seen[id]=true; }
    });
  })();

  var siteHeader = document.querySelector('header.nav');
  var backTopBtn = document.getElementById('backTop');

  function onScrollHandler(){
    var sy = window.scrollY;
    var total = document.documentElement.scrollHeight - window.innerHeight;
    if(progBar) progBar.style.width = (total > 0 ? (sy/total*100) : 0) + '%';
    if(siteHeader) siteHeader.classList.toggle('scrolled', sy > 60);
    if(backTopBtn) backTopBtn.classList.toggle('visible', sy > 420);
    var currentId = '';
    sectionMap.forEach(function(s){ if(s.el.getBoundingClientRect().top <= 120) currentId = s.id; });
    navAnchors.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + currentId); });
  }
  window.addEventListener('scroll', onScrollHandler, {passive:true});
  onScrollHandler();

  // ---- Back to top ----
  if(backTopBtn){
    backTopBtn.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });
  }

  // ---- FAQ accordion (one open at a time) ----
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item){
    var btn = item.querySelector('.faq-q');
    if(!btn) return;
    btn.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function(fi){
        fi.classList.remove('open');
        var b = fi.querySelector('.faq-q'); if(b) b.setAttribute('aria-expanded','false');
      });
      if(!isOpen){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });

  // ---- Live studio hours badge (IST: Wed–Mon 10:00–19:00, closed Tue) ----
  (function(){
    var badge = document.getElementById('hoursBadge');
    if(!badge) return;
    var now = new Date();
    var ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000);
    var day = ist.getDay(); // 0=Sun 1=Mon 2=Tue 3=Wed 4=Thu 5=Fri 6=Sat
    var t   = ist.getHours() + ist.getMinutes() / 60;
    var closed = (day === 2);
    var isOpen = !closed && t >= 10 && t < 19;
    var label = isOpen ? 'Open now' : closed ? 'Closed today (Tue)' : t < 10 ? 'Opens at 10 AM' : 'Closed for today';
    badge.className = 'hours-badge ' + (isOpen ? 'open-now' : 'closed-now');
    badge.innerHTML = '<span class="hours-badge-dot"></span>' + label;
  })();

})();