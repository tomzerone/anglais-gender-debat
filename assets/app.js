/* Gender quotas — site de révision, version courte (sans dépendance) */
(function () {
  'use strict';

  const D = window.DATA;
  if (!D) return;

  /* ------------------------------------------------------------------ */
  /* Outils                                                              */
  /* ------------------------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC[c]);
  const shuffle = (a) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  };
  const store = {
    get(k, d) {
      try { const v = window.localStorage.getItem('gq:' + k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set(k, v) {
      try { window.localStorage.setItem('gq:' + k, JSON.stringify(v)); }
      catch (e) { /* stockage indisponible : le site marche quand même */ }
    }
  };

  const ICON = {
    speaker: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.5 9.2v5.6h3.9l4.9 4V5.2L7.4 9.2H3.5z" fill="currentColor"/><path d="M15.6 8.6a4.6 4.6 0 0 1 0 6.8M18.3 6a8.3 8.3 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 9.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg class="bib__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12h16M13 5.5l6.5 6.5-6.5 6.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const sayBtn = (text, label) =>
    `<button class="say" type="button" data-say="${esc(text)}" aria-label="${esc(label || 'Écouter en anglais')}" title="Écouter en anglais">${ICON.speaker}</button>`;
  const sayBtnText = (text, label) =>
    `<button class="btn btn--ghost" type="button" data-say="${esc(text)}">${ICON.speaker}<span>${esc(label || 'Écouter')}</span></button>`;
  /* Une phrase anglaise + sa traduction (masquable) */
  const bi = (en, tr, cls) =>
    `<div class="bi${cls ? ' ' + cls : ''}"><p class="en" lang="en">${esc(en)} ${sayBtn(en)}</p><p class="tr">${esc(tr)}</p></div>`;
  const SIDE = { pour: 'Pour', contre: 'Contre', both: 'Les deux camps' };
  const tag = (side) => `<span class="tag tag--${side}">${SIDE[side]}</span>`;

  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-on'), 3000);
  }

  /* ------------------------------------------------------------------ */
  /* Lecture audio (voix anglaise du navigateur)                         */
  /* ------------------------------------------------------------------ */
  const Speech = (() => {
    const ok = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    let voice = null;
    let current = null;
    let slow = store.get('slow', false);
    const preferred = /(Google UK English|Serena|Kate|Daniel|Arthur|Martha|Sonia|Libby|Ryan|Stephanie|Oliver)/i;

    function pick() {
      if (!ok) return;
      const all = window.speechSynthesis.getVoices() || [];
      const gb = all.filter((v) => /^en[-_]GB/i.test(v.lang));
      voice = gb.find((v) => preferred.test(v.name)) || gb[0] ||
        all.find((v) => /^en[-_](IE|AU|US)/i.test(v.lang)) || all.find((v) => /^en/i.test(v.lang)) || null;
    }
    if (ok) {
      pick();
      if (typeof window.speechSynthesis.addEventListener === 'function') window.speechSynthesis.addEventListener('voiceschanged', pick);
      else window.speechSynthesis.onvoiceschanged = pick;
    }
    const clean = (t) => String(t).replace(/…/g, ' ').replace(/\s\/\s/g, ', ').replace(/→/g, ' to ').replace(/[“”«»]/g, '').replace(/\s+/g, ' ').trim();
    function reset() { if (current) current.classList.remove('is-speaking'); current = null; }
    function stop() { if (ok) window.speechSynthesis.cancel(); reset(); }
    function speak(text, btn) {
      if (!ok) { toast('La lecture audio n’est pas disponible ici. Essaie Chrome ou Safari.'); return; }
      const synth = window.speechSynthesis;
      if (btn && btn === current) { stop(); return; }
      synth.cancel();
      reset();
      if (!voice) pick();
      const txt = clean(text);
      const parts = (txt.match(/[^.!?]+[.!?]*/g) || [txt]).map((p) => p.trim()).filter(Boolean);
      if (!parts.length) return;
      current = btn || null;
      if (current) current.classList.add('is-speaking');
      const mine = current;
      parts.forEach((p, i) => {
        const u = new SpeechSynthesisUtterance(p);
        u.lang = voice ? voice.lang : 'en-GB';
        if (voice) u.voice = voice;
        u.rate = slow ? 0.74 : 0.95;
        if (i === parts.length - 1) u.onend = () => { if (current === mine) reset(); };
        u.onerror = () => { if (current === mine) reset(); };
        synth.speak(u);
      });
    }
    return { ok, speak, stop, isSlow: () => slow, setSlow(v) { slow = v; store.set('slow', v); } };
  })();

  /* ------------------------------------------------------------------ */
  /* Réglages : traductions et vitesse de la voix                        */
  /* ------------------------------------------------------------------ */
  let showTr = store.get('tr', true);

  function applyTr() {
    document.body.classList.toggle('no-tr', !showTr);
    const b = $('#trBtn');
    if (b) b.setAttribute('aria-pressed', String(showTr));
  }

  function initToggles() {
    applyTr();
    $('#trBtn').addEventListener('click', () => {
      showTr = !showTr;
      store.set('tr', showTr);
      applyTr();
      toast(showTr ? 'Traductions affichées.' : 'Traductions masquées : à toi de traduire dans ta tête.');
    });
    const v = $('#voiceBtn');
    if (!Speech.ok) { v.hidden = true; return; }
    v.setAttribute('aria-pressed', String(Speech.isSlow()));
    v.addEventListener('click', () => {
      Speech.setSlow(!Speech.isSlow());
      v.setAttribute('aria-pressed', String(Speech.isSlow()));
      toast(Speech.isSlow() ? 'Lecture ralentie.' : 'Lecture à vitesse normale.');
    });
  }

  /* Camp choisi : pour / contre / both (partagé par les trois onglets) */
  let camp = store.get('camp', 'both');
  if (!['pour', 'contre', 'both'].includes(camp)) camp = 'both';
  const setCamp = (c) => { camp = c; store.set('camp', c); };
  const campSeg = (options, label, current) =>
    `<div class="seg" role="group" aria-label="${esc(label)}">${options.map(([k, l]) => `<button class="seg__b seg__b--${k}" type="button" data-camp="${k}" aria-pressed="${current === k}">${l}</button>`).join('')}</div>`;

  /* ------------------------------------------------------------------ */
  /* Onglet 1 : Apprendre                                                */
  /* ------------------------------------------------------------------ */
  const numHTML = (num) => esc(num).split('→').join(ICON.arrow);

  function statItem(s) {
    return `<article class="stat">
      <div class="bib bib--${s.side}" role="img" aria-label="${esc(s.num + ' ' + s.unit + ' : ' + s.label)}">
        <span class="bib__label">${esc(s.label)}</span>
        <span class="bib__num" lang="en">${numHTML(s.num)}${s.unit ? `<span class="bib__unit">${esc(s.unit)}</span>` : ''}</span>
      </div>
      ${bi(s.say, s.tr)}
      ${s.note ? `<p class="stat__note">${esc(s.note)}</p>` : ''}
      <p class="stat__meta">${tag(s.side)}<a href="${esc(s.url)}" target="_blank" rel="noopener">Source : ${esc(s.src)}</a></p>
    </article>`;
  }

  function argHTML(a, side) {
    return `<details class="arg arg--${side}">
      <summary>
        <span class="arg__t"><span class="arg__en" lang="en">${esc(a.en)}</span><span class="arg__fr">${esc(a.fr)}</span></span>
        <span class="arg__chev">${ICON.chevron}</span>
      </summary>
      <div class="arg__body">
        <div class="blk"><h4>Dis-le</h4>${bi(a.say, a.sayTr)}</div>
        <div class="blk"><h4>La preuve</h4>${bi(a.proof, a.proofTr)}</div>
        <div class="blk blk--them"><h4>Si un collègue te répond…</h4>${bi(a.theySay, a.theySayTr)}</div>
        <div class="blk blk--you"><h4>… tu réponds</h4>${bi(a.answer, a.answerTr)}</div>
      </div>
    </details>`;
  }

  function drawArgs() {
    const box = $('#argBox');
    if (!box) return;
    const c = camp === 'contre' ? 'contre' : 'pour';
    $$('#s-arguments [data-camp]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.camp === c)));
    box.innerHTML = `
      <div class="speech speech--${c}"><h3>Ton ouverture, à connaître presque par cœur</h3>${bi(D.openings[c].en, D.openings[c].tr)}</div>
      <div class="args">${D.args[c].map((a) => argHTML(a, c)).join('')}</div>
      <div class="speech speech--${c}"><h3>Ta conclusion</h3>${bi(D.closings[c].en, D.closings[c].tr)}</div>`;
  }

  function renderLearn() {
    const argCamp = camp === 'contre' ? 'contre' : 'pour';
    $('#p-apprendre').innerHTML = `
      <div class="wrap">
        <div class="intro">
          <h1 class="motion" lang="en" tabindex="-1">Should Asics London set gender quotas?</h1>
          <p class="tr intro__tr">Asics (Londres) doit-elle fixer des quotas pour aider les femmes à progresser ?</p>
          <p class="intro__fr">Ton oral est une réunion entre deux ou trois collègues. Tu seras pour ou contre, sans le savoir à l’avance. Cette page contient l’essentiel, rien de plus.</p>
          <ol class="plan">
            <li><span class="plan__t"><strong>Apprendre</strong> cette page, en écoutant l’anglais</span><span class="plan__d">45 min</span></li>
            <li><span class="plan__t"><strong>T’entraîner</strong> à voix haute (onglet S’entraîner)</span><span class="plan__d">45 min</span></li>
            <li><span class="plan__t"><strong>Relire la fiche J-0</strong> juste avant le TP</span><span class="plan__d">10 min</span></li>
          </ol>
          <p class="hint">Le bouton <strong>FR</strong>, en haut à droite, cache les traductions : pratique pour te tester.</p>
        </div>

        <nav class="toc" aria-label="Sur cette page">
          ${[['s-sujet', 'Le sujet'], ['s-mots', '20 mots'], ['s-chiffres', '6 chiffres'], ['s-arguments', 'Arguments'], ['s-hors', 'Hors travail'], ['s-phrases', 'Phrases']].map(([id, l]) => `<button class="chip" type="button" data-goto="${id}">${l}</button>`).join('')}
        </nav>

        <section class="sec" id="s-sujet">
          <h2>1. Le sujet en 30 secondes</h2>
          ${bi(D.subject.en, D.subject.tr, 'bi--quote')}
          ${D.basics.map((b) => bi(b.en, b.tr)).join('')}
        </section>

        <section class="sec" id="s-mots">
          <h2>2. Les 20 mots à connaître</h2>
          <p class="muted">Ceux marqués « cours » viennent de ta prof : les placer, ce sont des points faciles.</p>
          <ul class="words">
            ${D.vocab.map((v) => `<li><span class="words__en" lang="en">${esc(v.en)}${v.cours ? ' <span class="badge">cours</span>' : ''}</span>${sayBtn(v.en)}<span class="words__fr tr">${esc(v.fr)}</span></li>`).join('')}
          </ul>
        </section>

        <section class="sec" id="s-chiffres">
          <h2>3. Les 6 chiffres à retenir</h2>
          <p class="muted">Un chiffre par argument : c’est ce que la prof attend. Le bandeau indique le camp : vert pour, or contre, violet les deux.</p>
          <div class="stats">${D.stats.map(statItem).join('')}</div>
        </section>

        <section class="sec" id="s-arguments">
          <h2>4. Les arguments</h2>
          <p class="muted">Trois arguments par camp, chacun avec une preuve et ta réponse à l’objection la plus probable.</p>
          ${campSeg([['pour', 'Camp pour'], ['contre', 'Camp contre']], 'Camp affiché', argCamp)}
          <div id="argBox"></div>
          <div class="speech speech--both"><h3>Le compromis, utile aux deux camps</h3>${bi(D.middle.en, D.middle.tr)}</div>
        </section>

        <section class="sec" id="s-hors">
          <h2>5. Trois exemples hors du travail</h2>
          <p class="muted">La prof veut que tu sortes du monde de l’entreprise : glisse au moins un de ces exemples.</p>
          ${D.beyond.map((b) => `
            <article class="case">
              <h3 lang="en">${esc(b.title)}</h3>
              ${bi(b.en, b.tr)}
              <p class="case__use">${tag(b.side)} ${esc(b.use)}</p>
            </article>`).join('')}
        </section>

        <section class="sec" id="s-phrases">
          <h2>6. Les 10 phrases pour débattre</h2>
          <p class="muted">Ce n’est pas un exposé : il faut réagir. Ces phrases te donnent le temps de réfléchir.</p>
          <ul class="phr">
            ${D.phrases.map((p) => `<li><span class="phr__en" lang="en">${esc(p.en)}</span>${sayBtn(p.en)}<span class="phr__fr tr">${esc(p.tr)}</span></li>`).join('')}
          </ul>
          <h3 class="sub">Les 5 pièges à éviter</h3>
          <ul class="traps">
            ${D.traps.map((t) => `<li><p class="traps__no"><span class="sr">À éviter : </span><s lang="en">${esc(t.wrong)}</s></p><p class="traps__yes" lang="en"><span class="sr">À dire : </span>${esc(t.right)} ${sayBtn(t.right)}</p><p class="traps__note">${esc(t.note)}</p></li>`).join('')}
          </ul>
          <p class="pron">${esc(D.pronunciation)} ${sayBtn('woman, women', 'Écouter woman et women')}</p>
        </section>

        <details class="more">
          <summary>Les sources ${ICON.chevron}</summary>
          <ul class="sources">${D.sources.map((s) => `<li><a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a></li>`).join('')}</ul>
        </details>
      </div>`;
    drawArgs();
  }

  /* ------------------------------------------------------------------ */
  /* Onglet 2 : S’entraîner (répliques + quiz)                           */
  /* ------------------------------------------------------------------ */
  let trainMode = 'replies';
  const sim = { queue: [], item: null, answer: false, timer: null, left: 30 };

  function simPool() {
    const a = D.sim.vsPour.map((x) => Object.assign({ side: 'pour' }, x));
    const b = D.sim.vsContre.map((x) => Object.assign({ side: 'contre' }, x));
    if (camp === 'pour') return a;
    if (camp === 'contre') return b;
    return a.concat(b);
  }

  function stopTimer() {
    if (sim.timer) { clearInterval(sim.timer); sim.timer = null; }
  }

  function timerText() {
    if (sim.timer) return `Arrêter (0:${String(sim.left).padStart(2, '0')})`;
    return 'Chrono 30 s';
  }

  function toggleTimer() {
    const b = $('[data-sim="timer"]');
    if (sim.timer) { stopTimer(); if (b) b.textContent = timerText(); return; }
    sim.left = 30;
    sim.timer = setInterval(() => {
      sim.left -= 1;
      const btn = $('[data-sim="timer"]');
      if (sim.left <= 0) {
        stopTimer();
        toast('Temps écoulé ! Compare avec la réponse possible.');
      }
      if (btn) btn.textContent = timerText();
    }, 1000);
    if (b) b.textContent = timerText();
  }

  function nextReply() {
    stopTimer();
    if (!sim.queue.length) {
      const prev = sim.item ? sim.item.id : null;
      sim.queue = shuffle(simPool());
      if (sim.queue.length > 1 && sim.queue[0].id === prev) sim.queue.push(sim.queue.shift());
    }
    sim.item = sim.queue.shift();
    sim.answer = false;
    drawReply();
  }

  function drawReply() {
    const st = $('#trainBody');
    if (!st || !sim.item) return;
    const it = sim.item;
    const p = D.people[it.who];
    const total = simPool().length;
    const pos = total - sim.queue.length;
    st.innerHTML = `
      ${campSeg([['pour', 'Je suis pour'], ['contre', 'Je suis contre'], ['both', 'Les deux']], 'Ton camp', camp)}
      <article class="meeting">
        ${camp === 'both' ? `<p class="meeting__side meeting__side--${it.side}">Pour cette réplique, tu défends le <strong>${it.side}</strong>.</p>` : ''}
        <div class="meeting__who"><span class="avatar avatar--${it.who}" aria-hidden="true">${esc(p.name.charAt(0))}</span><span><strong>${esc(p.name)}</strong><span class="muted" lang="en">${esc(p.role)}</span></span></div>
        <blockquote class="bubble" lang="en">${esc(it.en)}</blockquote>
        <p class="tr bubble__tr">${esc(it.tr)}</p>
        <div class="row">${sayBtnText(it.en, 'Écouter')}<button class="btn btn--ghost" type="button" data-sim="timer">${timerText()}</button></div>
      </article>
      <p class="step">Réponds à voix haute, puis compare.</p>
      ${sim.answer
        ? `<div class="model"><h2>Une réponse possible</h2>${bi(it.answer, it.answerTr)}</div>`
        : '<button class="btn" type="button" data-sim="answer">Voir une réponse possible</button>'}
      <div class="row row--end">
        <span class="muted small">Réplique ${pos} sur ${total}</span>
        <button class="btn btn--primary" type="button" data-sim="next">Réplique suivante</button>
      </div>`;
  }

  /* Quiz : 8 questions tirées au hasard */
  const quiz = { started: false, qs: [], i: 0, score: 0, answered: false, pick: null, missed: [] };

  function newQuiz() {
    quiz.qs = shuffle(D.quiz).slice(0, 8).map((q) => Object.assign({}, q, { opts: shuffle(q.o.map((t, k) => ({ t, ok: k === 0 }))) }));
    quiz.started = true;
    quiz.i = 0;
    quiz.score = 0;
    quiz.answered = false;
    quiz.pick = null;
    quiz.missed = [];
    drawQuiz();
  }

  function answerQuiz(k) {
    if (quiz.answered) return;
    const q = quiz.qs[quiz.i];
    quiz.answered = true;
    quiz.pick = k;
    if (q.opts[k].ok) quiz.score += 1;
    else quiz.missed.push({ q: q.q, a: q.opts.find((o) => o.ok).t });
    drawQuiz();
    const next = $('[data-quiz="next"]');
    if (next) next.focus({ preventScroll: true });
  }

  function drawQuiz() {
    const st = $('#trainBody');
    if (!st) return;
    if (!quiz.started) {
      const best = store.get('quizBest8', null);
      st.innerHTML = `<p>Huit questions sur les chiffres, le vocabulaire et les pièges.${best === null ? '' : ` Ton meilleur score : <strong>${best}/8</strong>.`}</p>
        <button class="btn btn--primary" type="button" data-quiz="start">Commencer le quiz</button>`;
      return;
    }
    if (quiz.i >= quiz.qs.length) {
      const s = quiz.score;
      const best = store.get('quizBest8', null);
      if (best === null || s > best) store.set('quizBest8', s);
      const msg = s >= 7 ? 'Excellent : tu es prêt.' : s >= 5 ? 'Bien. Relis les réponses ratées ci-dessous.' : 'Relis les chiffres et les 20 mots, puis rejoue.';
      st.innerHTML = `
        <p class="qend__score">${s}<small>/${quiz.qs.length}</small></p>
        <p>${msg}</p>
        ${quiz.missed.length ? `<h2>À revoir</h2><ul class="missed">${quiz.missed.map((m) => `<li><p>${esc(m.q)}</p><p class="missed__a">${esc(m.a)}</p></li>`).join('')}</ul>` : ''}
        <button class="btn btn--primary" type="button" data-quiz="start">Rejouer</button>`;
      return;
    }
    const q = quiz.qs[quiz.i];
    const opts = q.opts.map((o, k) => {
      let cls = '';
      let extra = '';
      if (quiz.answered && o.ok) { cls = ' is-right'; extra = `${ICON.check}<span class="sr"> (bonne réponse)</span>`; }
      else if (quiz.answered && quiz.pick === k) { cls = ' is-wrong'; extra = '<span class="sr"> (ta réponse)</span>'; }
      return `<button class="opt${cls}" type="button" data-opt="${k}"${quiz.answered ? ' disabled' : ''}><span>${esc(o.t)}</span>${extra}</button>`;
    }).join('');
    const right = quiz.answered && q.opts[quiz.pick].ok;
    st.innerHTML = `
      <p class="qcount">Question ${quiz.i + 1} sur ${quiz.qs.length}</p>
      <div class="bar"><span style="width:${100 * quiz.i / quiz.qs.length}%"></span></div>
      <h2 class="qq">${esc(q.q)}</h2>
      <div class="opts">${opts}</div>
      ${quiz.answered ? `
        <div class="feedback ${right ? 'feedback--ok' : 'feedback--ko'}" role="status"><p><strong>${right ? 'Bonne réponse.' : 'Raté.'}</strong> ${esc(q.x)}</p></div>
        <button class="btn btn--primary" type="button" data-quiz="next">${quiz.i + 1 < quiz.qs.length ? 'Question suivante' : 'Voir mon score'}</button>` : ''}`;
  }

  function drawTrain() {
    $$('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === trainMode)));
    if (trainMode === 'replies') {
      if (!sim.item) nextReply(); else drawReply();
    } else {
      stopTimer();
      drawQuiz();
    }
  }

  function renderTrain() {
    $('#p-entrainer').innerHTML = `
      <div class="wrap">
        <h1 tabindex="-1">S’entraîner</h1>
        <p class="lead">Réponds à voix haute avant de regarder l’aide. Dix minutes par jour valent mieux qu’une heure la veille.</p>
        <div class="seg seg--modes" role="group" aria-label="Exercice">
          <button class="seg__b" type="button" data-mode="replies" aria-pressed="${trainMode === 'replies'}">Répondre à un collègue</button>
          <button class="seg__b" type="button" data-mode="quiz" aria-pressed="${trainMode === 'quiz'}">Quiz</button>
        </div>
        <div id="trainBody"></div>
      </div>`;
    drawTrain();
  }

  /* ------------------------------------------------------------------ */
  /* Onglet 3 : Fiche J-0                                                */
  /* ------------------------------------------------------------------ */
  function renderFiche() {
    const sides = camp === 'both' ? ['pour', 'contre'] : [camp];
    $('#p-fiche').innerHTML = `
      <div class="wrap wrap--wide">
        <div class="fiche-head">
          <h1 tabindex="-1">Fiche J-0</h1>
          <button class="btn btn--ghost no-print" type="button" data-print>Imprimer</button>
        </div>
        <p class="lead no-print">À relire juste avant le TP. Si tu connais ton camp, n’affiche que le tien.</p>
        <div class="no-print">${campSeg([['pour', 'Pour'], ['contre', 'Contre'], ['both', 'Les deux']], 'Camp affiché', camp)}</div>

        <div class="fiche-cols fiche-cols--${sides.length}">
          ${sides.map((s) => `
            <section class="fiche-col fiche-col--${s}">
              <h2>${s === 'pour' ? 'Camp pour' : 'Camp contre'}</h2>
              <h3>Ouverture</h3>
              ${bi(D.openings[s].en, D.openings[s].tr)}
              <h3>Tes trois arguments</h3>
              <ol class="fiche-args">
                ${D.args[s].map((a) => `<li><span class="fiche-args__en" lang="en">${esc(a.en)}</span><span class="fiche-args__fr tr">${esc(a.fr)}</span><span class="fiche-args__fig" lang="en">${esc(a.figure)}</span></li>`).join('')}
              </ol>
              <h3>Conclusion</h3>
              ${bi(D.closings[s].en, D.closings[s].tr)}
            </section>`).join('')}
        </div>

        <h2>Les 6 chiffres</h2>
        <ul class="fiche-stats">
          ${D.stats.map((s) => `<li><span class="fiche-stats__n">${esc(s.num)}${esc(s.unit === 'years' ? ' years' : s.unit)}</span>${bi(s.say, s.tr)}</li>`).join('')}
        </ul>

        <div class="fiche-cols fiche-cols--2">
          <section>
            <h2>Les 10 phrases</h2>
            <ul class="fiche-list">${D.phrases.map((p) => `<li><span lang="en">${esc(p.en)}</span> <span class="tr">${esc(p.tr)}</span></li>`).join('')}</ul>
          </section>
          <section>
            <h2>Les 5 pièges</h2>
            <ul class="fiche-list">${D.traps.map((t) => `<li><s lang="en">${esc(t.wrong)}</s> <strong lang="en">${esc(t.right)}</strong></li>`).join('')}</ul>
          </section>
        </div>

        <h2>Le compromis, pour finir</h2>
        ${bi(D.middle.en, D.middle.tr)}
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Navigation                                                          */
  /* ------------------------------------------------------------------ */
  const PAGES = {
    apprendre: ['Apprendre', renderLearn],
    entrainer: ['S’entraîner', renderTrain],
    fiche: ['Fiche J-0', renderFiche]
  };
  /* Anciens liens de la première version */
  const OLD = {
    accueil: ['apprendre'], comprendre: ['apprendre', 's-sujet'], vocabulaire: ['apprendre', 's-mots'],
    chiffres: ['apprendre', 's-chiffres'], arguments: ['apprendre', 's-arguments'], 'hors-travail': ['apprendre', 's-hors'],
    phrases: ['apprendre', 's-phrases'], simulateur: ['entrainer'], quiz: ['entrainer'], flashcards: ['entrainer']
  };
  let firstRoute = true;

  function goTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - ($('.top') ? $('.top').offsetHeight : 0) - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function route() {
    let id = decodeURIComponent(location.hash.replace(/^#/, '')) || 'apprendre';
    let anchor = null;
    if (OLD[id]) { anchor = OLD[id][1] || null; if (OLD[id][0] === 'entrainer' && id === 'quiz') trainMode = 'quiz'; id = OLD[id][0]; }
    if (!PAGES[id]) id = 'apprendre';
    Speech.stop();
    stopTimer();
    Object.keys(PAGES).forEach((p) => { const s = $('#p-' + p); if (s) s.hidden = p !== id; });
    $$('.tabs a').forEach((a) => {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    PAGES[id][1]();
    document.title = `${PAGES[id][0]} — Gender quotas, débat d’anglais`;
    window.scrollTo(0, 0);
    if (anchor) setTimeout(() => goTo(anchor), 60);
    else if (!firstRoute) { const h = $('#p-' + id + ' h1'); if (h) h.focus({ preventScroll: true }); }
    firstRoute = false;
  }

  /* ------------------------------------------------------------------ */
  /* Clics                                                               */
  /* ------------------------------------------------------------------ */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button');
    if (!t) return;
    const d = t.dataset;

    if (d.say !== undefined) { Speech.speak(d.say, t); return; }
    if (d.goto) { goTo(d.goto); return; }

    if (d.camp) {
      setCamp(d.camp);
      const page = t.closest('.page');
      if (page && page.id === 'p-apprendre') { drawArgs(); }
      else if (page && page.id === 'p-entrainer') { sim.queue = []; sim.item = null; nextReply(); }
      else if (page && page.id === 'p-fiche') { renderFiche(); }
      const again = $(`#${page ? page.id : 'main'} [data-camp="${d.camp}"]`);
      if (again) again.focus({ preventScroll: true });
      return;
    }

    if (d.mode) { trainMode = d.mode; drawTrain(); return; }
    if (d.sim === 'timer') { toggleTimer(); return; }
    if (d.sim === 'answer') { sim.answer = true; drawReply(); return; }
    if (d.sim === 'next') { Speech.stop(); nextReply(); const b = $('[data-sim="answer"]'); if (b) b.focus({ preventScroll: true }); return; }

    if (d.quiz) {
      if (d.quiz === 'start') newQuiz();
      else { quiz.i += 1; quiz.answered = false; quiz.pick = null; drawQuiz(); }
      const first = $('#trainBody .opt') || $('#trainBody .btn');
      if (first) first.focus({ preventScroll: true });
      return;
    }
    if (d.opt !== undefined) { answerQuiz(Number(d.opt)); return; }
    if (d.print !== undefined) { window.print(); }
  });

  const skip = $('.skip');
  if (skip) skip.addEventListener('click', (e) => { e.preventDefault(); const m = $('#main'); if (m) m.focus(); });

  window.addEventListener('hashchange', route);
  initToggles();
  route();
})();
