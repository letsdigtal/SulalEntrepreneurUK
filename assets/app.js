window.initSulal=function(){
 document.documentElement.classList.add('js');
 if(window.sulalObserver)window.sulalObserver.disconnect();
 const root=document.querySelector('#preview-root')||document;
 const toggle=root.querySelector('.menu-toggle'),nav=root.querySelector('#navigation');
 function closeNav(){if(toggle&&nav){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation')}}
 if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));nav.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=nav.querySelector('.nav-dropdown.open .dropdown-toggle');nav.querySelectorAll('.nav-dropdown.open').forEach(d=>{d.classList.remove('open');d.querySelector('button').setAttribute('aria-expanded','false')});if(innerWidth<=800){closeNav();toggle.focus()}else if(active){active.focus()}}})}
 root.querySelectorAll('.dropdown-toggle').forEach(btn=>btn.addEventListener('click',()=>{const parent=btn.closest('.nav-dropdown'),open=!parent.classList.contains('open');root.querySelectorAll('.nav-dropdown').forEach(d=>{d.classList.remove('open');d.querySelector('button').setAttribute('aria-expanded','false')});parent.classList.toggle('open',open);btn.setAttribute('aria-expanded',String(open))}));
 if(window.sulalOutsideClick)document.removeEventListener('click',window.sulalOutsideClick);
 window.sulalOutsideClick=e=>{if(!e.target.closest('.nav-dropdown'))root.querySelectorAll('.nav-dropdown.open').forEach(d=>{d.classList.remove('open');d.querySelector('button').setAttribute('aria-expanded','false')});if(!e.target.closest('.header'))closeNav()};
 document.addEventListener('click',window.sulalOutsideClick);
 const modeButton=root.querySelector('.theme-toggle');
 function refreshMode(){const dark=document.documentElement.dataset.theme==='dark';if(modeButton){modeButton.setAttribute('aria-pressed',String(dark));modeButton.setAttribute('aria-label','Switch to '+(dark?'light':'dark')+' mode');modeButton.title=dark?'Switch to light mode':'Switch to dark mode'}const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=dark?'#0b252e':'#0b3540'}
 refreshMode();if(modeButton)modeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;document.documentElement.style.colorScheme=next;try{localStorage.setItem('sulal-color-mode',next)}catch(e){}refreshMode()});
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 window.initSulalInteractions(root,reduced);
 root.querySelectorAll('main > section:not(.hero)').forEach(section=>section.classList.add('scroll-reveal'));
 function animateStat(el){if(el.dataset.animated)return;el.dataset.animated='true';const final=Number(el.dataset.count);el.setAttribute('aria-label',String(final));if(reduced){el.textContent=final;return}const start=performance.now();function tick(now){const fraction=Math.min(1,(now-start)/1100);el.textContent=Math.round(final*(1-Math.pow(1-fraction,3)));if(fraction<1&&el.isConnected)requestAnimationFrame(tick)}requestAnimationFrame(tick)}
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){if(item.target.hasAttribute('data-count'))animateStat(item.target);else {item.target.classList.add('visible');if(item.target.classList.contains('scroll-reveal'))item.target.classList.add('in-view');}observer.unobserve(item.target)}}),{threshold:.08});window.sulalObserver=observer;root.querySelectorAll('.reveal,.scroll-reveal,[data-count]').forEach(el=>observer.observe(el))}else{root.querySelectorAll('.reveal,.scroll-reveal').forEach(el=>el.classList.add('visible','in-view'));root.querySelectorAll('[data-count]').forEach(animateStat)}
 const page=document.body.dataset.page;
 root.querySelectorAll('#navigation a').forEach(a=>{let matches=false;try{const href=new URL(a.href,location.href);matches=href.hash.startsWith('#page=')?new URLSearchParams(href.hash.slice(1)).get('page')===page:href.pathname===location.pathname&&href.search===location.search}catch(e){}if(matches)a.setAttribute('aria-current','page')});
 const form=root.querySelector('#enquiry-form');
 const params=new URLSearchParams(window.sulalPreviewQuery||location.search);
 const services={'property-real-estate':'Property & Real Estate','rent-a-car':'Rent a Car','car-sales-purchase':'Car Sales & Purchase','construction-development':'Construction & Development','forex-education':'Forex Trading Education'};
 if(form){const select=form.querySelector('[name="sulal_service"]');if(select&&services[params.get('service')])select.value=services[params.get('service')];
  if(form.dataset.mode==='demo'){form.addEventListener('submit',e=>{e.preventDefault();const status=form.querySelector('.form-status');status.textContent='Demo only — your enquiry has not been sent or stored. The WordPress version sends enquiries to the email configured by the site owner.';status.dataset.state='notice';status.scrollIntoView({block:'nearest',behavior:reduced?'auto':'smooth'})})}
  if(form.dataset.mode==='wordpress'){const result=params.get('enquiry');const message={sent:'Your enquiry has been accepted by the website mail system. Please allow the team time to respond.',failed:'Your enquiry could not be sent. Please try again later or use the published contact details.',invalid:'Please check all required fields and your consent, then try again.',expired:'The form session expired. Please reload the page and try again.',limited:'Please wait a moment before sending another enquiry.',unconfigured:'Online enquiries are not enabled yet. Please use the published contact details.'}[result];if(message){const status=form.querySelector('.form-status');status.textContent=message;status.dataset.state=result==='sent'?'success':'error'}}
 }
};


/* Interaction layer shared by WordPress, static pages, and the offline preview. */
window.initSulalInteractions=function(root,reduced){
 const config=window.SULAL_CONFIG||{};
 clearTimeout(window.sulalTypingTimer);
 const typing=root.querySelector('.typed-service');
 if(typing){
  const names=['Property & Real Estate','Rent a Car','Car Sales & Purchase','Construction & Development','Forex Trading Education'];
  typing.textContent=names[0];
  if(!reduced){let index=0,position=names[0].length,deleting=true;
   const step=()=>{if(!typing.isConnected)return;const name=names[index];
    if(deleting){position=Math.max(0,position-1);typing.textContent=name.slice(0,position);if(position===0){deleting=false;index=(index+1)%names.length;window.sulalTypingTimer=setTimeout(step,260);return}}
    else{position++;typing.textContent=names[index].slice(0,position);if(position>=names[index].length){deleting=true;window.sulalTypingTimer=setTimeout(step,1800);return}}
    window.sulalTypingTimer=setTimeout(step,deleting?28:62);
   };window.sulalTypingTimer=setTimeout(step,2000);
  }
 }
 const soundButton=root.querySelector('.sound-toggle');
 if(typeof window.sulalSoundEnabled!=='boolean'){
  window.sulalSoundEnabled=config.soundEnabled!==false;
  try{const saved=localStorage.getItem('sulal-click-sound');if(saved==='off'||saved==='on')window.sulalSoundEnabled=saved==='on'}catch(e){}
 }
 const audioSupported=!!(window.AudioContext||window.webkitAudioContext);
 function updateSoundControl(){if(!soundButton)return;soundButton.setAttribute('aria-pressed',String(window.sulalSoundEnabled));soundButton.dataset.muted=String(!window.sulalSoundEnabled);const label=audioSupported?'Turn click sounds '+(window.sulalSoundEnabled?'off':'on'):'Click sound is unavailable in this browser';soundButton.setAttribute('aria-label',label);soundButton.title=label;soundButton.querySelector('.sound-label').textContent=window.sulalSoundEnabled?'Sound on':'Sound off';if(!audioSupported)soundButton.disabled=true}
 function playClick(){if(!window.sulalSoundEnabled||!audioSupported)return;
  try{const Audio=window.AudioContext||window.webkitAudioContext;const context=window.sulalAudioContext||(window.sulalAudioContext=new Audio());
   const play=()=>{if(!window.sulalSoundEnabled)return;const oscillator=context.createOscillator(),gain=context.createGain(),now=context.currentTime;oscillator.type='sine';oscillator.frequency.setValueAtTime(720,now);oscillator.frequency.exponentialRampToValueAtTime(420,now+.045);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.035,now+.004);gain.gain.exponentialRampToValueAtTime(.0001,now+.055);oscillator.connect(gain);gain.connect(context.destination);oscillator.start(now);oscillator.stop(now+.06);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect()}};
   if(context.state==='suspended')context.resume().then(play).catch(()=>{});else play();
  }catch(e){/* Sound is optional; browser restrictions never block navigation. */}
 }
 updateSoundControl();
 if(window.sulalSoundClick)document.removeEventListener('click',window.sulalSoundClick,true);
 window.sulalSoundClick=event=>{const control=event.target.closest('button,a[href],summary,input[type="submit"],[role="button"]');if(!control||control.disabled||control.getAttribute('aria-disabled')==='true')return;
  if(control.classList.contains('sound-toggle')){window.sulalSoundEnabled=!window.sulalSoundEnabled;try{localStorage.setItem('sulal-click-sound',window.sulalSoundEnabled?'on':'off')}catch(e){}updateSoundControl();if(window.sulalSoundEnabled)playClick();return}playClick();
 };
 document.addEventListener('click',window.sulalSoundClick,true);
 const wa=root.querySelector('[data-whatsapp]'),notice=root.querySelector('.whatsapp-note');
 if(wa){const digits=String(config.whatsappNumber||'').replace(/\D/g,'');
  if(/^\d{8,15}$/.test(digits)){wa.href='https://wa.me/'+digits+'?text='+encodeURIComponent(config.whatsappMessage||'Hello Sulal Entrepreneur UK.');wa.target='_blank';wa.rel='noopener noreferrer';wa.setAttribute('aria-label','Chat with Sulal Entrepreneur UK on WhatsApp');wa.title='Open WhatsApp';wa.dataset.configured='true'}
  else{wa.dataset.configured='false';wa.setAttribute('aria-label','WhatsApp setup pending — see contact options');wa.title='WhatsApp number has not been configured';wa.addEventListener('click',event=>{event.preventDefault();if(notice)notice.hidden=!notice.hidden})}
 }
 if(notice){notice.querySelector('.wa-note-close').addEventListener('click',()=>{notice.hidden=true;if(wa)wa.focus()});notice.addEventListener('keydown',event=>{if(event.key==='Escape'){notice.hidden=true;if(wa)wa.focus()}})}
};
window.initSulal();
