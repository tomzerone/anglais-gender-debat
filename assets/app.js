/* Gender quotas — logique du site de révision (sans dépendance) */
(function () {
  'use strict';

  var D = window.DATA;
  if (!D) return;

  /* ------------------------------------------------------------------ */
  /* Outils                                                              */
  /* ------------------------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ESC[c]);
  const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const shuffle = (a) => {
    const b = a.slice();
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  };
  const getPath = (path) => path.split('.').reduce((o, k) => (o ? o[k] : undefined), D);
  const unique = (a) => a.filter((x, i) => a.indexOf(x) === i);

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
    star: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3.2l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3.1-5.4 3.1 1.2-6-4.5-4.2 6.1-.7z" fill="currentColor"/></svg>',
    arrow: '<svg class="bib__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12h16M13 5.5l6.5 6.5-6.5 6.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  const sayBtn = (text, label) =>
    `<button class="say" type="button" data-say="${esc(text)}" aria-label="${esc(label || 'Écouter en anglais')}" title="Écouter en anglais">${ICON.speaker}</button>`;
  const sayBtnText = (text, label) =>
    `<button class="btn btn--ghost" type="button" data-say="${esc(text)}">${ICON.speaker}<span>${esc(label || 'Écouter')}</span></button>`;
  const SIDE = { pour: 'Pour', contre: 'Contre', both: 'Les deux camps' };
  const tag = (side) => `<span class="tag tag--${side}">${SIDE[side]}</span>`;

  /* ------------------------------------------------------------------ */
  /* Message temporaire                                                  */
  /* ------------------------------------------------------------------ */
  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-on'), 3200);
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

    const clean = (t) => String(t)
      .replace(/…/g, ' ')
      .replace(/\s\/\s/g, ', ')
      .replace(/→/g, ' to ')
      .replace(/[“”«»]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    function reset() {
      if (current) current.classList.remove('is-speaking');
      current = null;
    }

    function stop() {
      if (ok) window.speechSynthesis.cancel();
      reset();
    }

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

    return {
      ok,
      speak,
      stop,
      isSlow: () => slow,
      setSlow(v) { slow = v; store.set('slow', v); }
    };
  })();

  function initVoiceButton() {
    const b = $('#voiceBtn');
    if (!b) return;
    if (!Speech.ok) { b.hidden = true; return; }
    const update = () => {
      b.textContent = Speech.isSlow() ? 'Voix : lente' : 'Voix : normale';
      b.setAttribute('aria-pressed', String(Speech.isSlow()));
    };
    update();
    b.addEventListener('click', () => {
      Speech.setSlow(!Speech.isSlow());
      update();
      toast(Speech.isSlow() ? 'Lecture ralentie : pratique pour bien entendre chaque mot.' : 'Lecture à vitesse normale.');
    });
  }

  /* ------------------------------------------------------------------ */
  /* Camp choisi (pour / contre / les deux)                              */
  /* ------------------------------------------------------------------ */
  let camp = store.get('camp', null);
  const CAMP_NOTE = {
    pour: 'C’est noté : tu défends le pour. Pense quand même à jeter un œil aux arguments contre, ce sont ceux que tes collègues utiliseront.',
    contre: 'C’est noté : tu défends le contre. Pense quand même à jeter un œil aux arguments pour, ce sont ceux que tes collègues utiliseront.',
    both: 'C’est noté : tu prépares les deux camps. Le simulateur mélangera les répliques.'
  };

  function setCamp(c) {
    camp = c;
    store.set('camp', c);
    argTab = c === 'contre' ? 'contre' : 'pour';
    sim.camp = c === 'both' ? 'mix' : c;
    ficheCamp = c;
    rendered.arguments = false;
    rendered.simulateur = false;
    rendered.fiche = false;
    $$('.lane').forEach((l) => l.setAttribute('aria-pressed', String(l.dataset.camp === c)));
    const note = $('#campNote');
    if (note) note.textContent = CAMP_NOTE[c];
  }

  /* ------------------------------------------------------------------ */
  /* Accueil                                                             */
  /* ------------------------------------------------------------------ */
  function renderHome() {
    const known = store.get('known', []).filter((id) => D.vocab.some((v) => v.id === id)).length;
    const best = store.get('quizBest', null);
    const simDone = store.get('simDone', []).length;
    const simTotal = D.sim.vsPour.length + D.sim.vsContre.length;
    const lane = (k, en, fr) => `
      <button class="lane lane--${k}" type="button" data-camp="${k}" aria-pressed="${camp === k}">
        <span class="lane__mark" aria-hidden="true"></span>
        <span class="lane__txt"><span class="lane__en" lang="en">${en}</span><span class="lane__fr">${fr}</span></span>
        <span class="lane__ok" aria-hidden="true">${ICON.check}</span>
      </button>`;

    $('#p-accueil').innerHTML = `
      <div class="wrap wrap--wide hero">
        <div class="hero__intro">
          <h1 class="motion" lang="en" tabindex="-1">Should Asics London set gender quotas?</h1>
          <p class="hero__fr">Ton oral d’anglais est une réunion entre collègues chez Asics, à Londres. L’entreprise veut fixer des quotas pour aider les femmes à progresser. Vous êtes deux ou trois, chacun <strong>pour</strong> ou <strong>contre</strong>. Tu ne connais pas encore ton camp : ce site te prépare aux deux, sans te noyer sous le par cœur.</p>
        </div>
        <div class="hero__track">
          <div class="track" role="group" aria-label="Choisis ton camp">
            ${lane('pour', 'Yes, I’m for quotas', 'Je défends le pour')}
            ${lane('contre', 'No, I’m against quotas', 'Je défends le contre')}
            ${lane('both', 'I don’t know yet', 'Je prépare les deux camps')}
          </div>
          <p class="track__note" id="campNote" aria-live="polite">${camp ? CAMP_NOTE[camp] : 'Choisis ton camp : le site adapte les arguments, le simulateur et la fiche J-0.'}</p>
        </div>
      </div>
      <div class="wrap">

        <section class="block">
          <h2>Ce que la prof attend</h2>
          <ul class="ticks">
            <li>Des arguments solides dans les <strong>deux camps</strong>, puisque tu ne choisis pas le tien.</li>
            <li>Des <strong>chiffres</strong> : des pourcentages, des lois, des exemples politiques.</li>
            <li><strong>Sortir du monde du travail</strong> : politique, sport, éducation.</li>
            <li>Une vraie <strong>discussion</strong> : réagir à ce que disent tes collègues, pas réciter un texte.</li>
          </ul>
        </section>

        <section class="block">
          <h2>Ton parcours en quatre étapes</h2>
          <ol class="steps">
            <li><a href="#comprendre"><span class="steps__t">Comprendre</span><span class="steps__d">Le sujet, puis les sept chiffres à épingler. 10 minutes.</span></a></li>
            <li><a href="#flashcards"><span class="steps__t">Mémoriser</span><span class="steps__d">Les flashcards « essentiels », puis un quiz. 15 minutes.</span></a></li>
            <li><a href="#simulateur"><span class="steps__t">Parler</span><span class="steps__d">Le simulateur, à voix haute, dans les deux camps. 20 minutes.</span></a></li>
            <li><a href="#fiche"><span class="steps__t">Le jour J</span><span class="steps__d">La fiche J-0, juste avant le TP. 5 minutes.</span></a></li>
          </ol>
        </section>

        <section class="block">
          <h2>Où tu en es</h2>
          <div class="progress">
            <div class="meter"><span class="meter__n">${known}<small>/${D.vocab.length}</small></span><span class="meter__l">mots sus en flashcards</span></div>
            <div class="meter"><span class="meter__n">${best === null ? '–' : best}<small>/10</small></span><span class="meter__l">meilleur score au quiz</span></div>
            <div class="meter"><span class="meter__n">${simDone}<small>/${simTotal}</small></span><span class="meter__l">répliques travaillées au simulateur</span></div>
          </div>
        </section>

        <section class="block block--tip">
          <h2>Tu n’as que 10 minutes ?</h2>
          <p>Ouvre la <a href="#fiche">fiche J-0</a> : l’ouverture, trois arguments par camp, les sept chiffres et les phrases pour débattre, sur une seule page.</p>
        </section>
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Comprendre                                                          */
  /* ------------------------------------------------------------------ */
  const LADDER_SVG = `
    <svg viewBox="0 0 380 300" role="img" aria-labelledby="ladTitle">
      <title id="ladTitle">Une échelle entre un plancher collant et un plafond de verre, avec le premier échelon cassé</title>
      <text class="lad-label" x="20" y="22" lang="en">the glass ceiling</text>
      <rect class="lad-glass" x="20" y="34" width="340" height="18" rx="3"/>
      <line class="lad-glint" x1="52" y1="48" x2="64" y2="38"/>
      <line class="lad-glint" x1="64" y1="48" x2="76" y2="38"/>
      <line class="lad-glint" x1="262" y1="48" x2="274" y2="38"/>
      <line class="lad-glint" x1="274" y1="48" x2="286" y2="38"/>
      <line class="lad-rail" x1="160" y1="60" x2="160" y2="250"/>
      <line class="lad-rail" x1="210" y1="60" x2="210" y2="250"/>
      <line class="lad-rung" x1="160" y1="88" x2="210" y2="88"/>
      <line class="lad-rung" x1="160" y1="120" x2="210" y2="120"/>
      <line class="lad-rung" x1="160" y1="152" x2="210" y2="152"/>
      <line class="lad-rung" x1="160" y1="184" x2="210" y2="184"/>
      <path class="lad-break" d="M160 216 L180 222"/>
      <path class="lad-break" d="M192 211 L210 216"/>
      <line class="lad-lead" x1="218" y1="216" x2="238" y2="216"/>
      <text class="lad-label" x="244" y="221" lang="en">the broken rung</text>
      <path class="lad-floor" d="M20 250 H360 V262 H344 a7 7 0 0 1 -14 0 H292 a6 6 0 0 1 -12 0 H236 a8 8 0 0 1 -16 0 H136 a6 6 0 0 1 -12 0 H88 a7 7 0 0 1 -14 0 H20 Z"/>
      <text class="lad-label" x="20" y="292" lang="en">the sticky floor</text>
    </svg>`;

  function renderComprendre() {
    const subject = 'Your company, Asics (London), wants to set quotas to help women advance. You are discussing the topic with your colleagues.';
    const exQuota = 'Since June 2026, big listed companies in the EU must have at least 40% women among their non-executive directors.';
    const exTarget = 'Asics had a target of 40% women managers by 2026. It reached 41% without a quota.';
    $('#p-comprendre').innerHTML = `
      <div class="wrap">
        <h1 tabindex="-1">Comprendre le sujet</h1>
        <p class="lead">Le sujet de ton oral, tel que la prof l’a donné :</p>
        <p class="quote-en" lang="en">${esc(subject)} ${sayBtn(subject)}</p>

        <h2>Quota ou objectif ?</h2>
        <div class="compare">
          <div class="compare__col">
            <h3 class="en-term" lang="en">a quota</h3>
            <p>Un minimum <strong>obligatoire</strong>, souvent avec des sanctions.</p>
            <p class="ex" lang="en">${esc(exQuota)} ${sayBtn(exQuota)}</p>
          </div>
          <div class="compare__col">
            <h3 class="en-term" lang="en">a target</h3>
            <p>Un objectif <strong>volontaire</strong> : on vise un chiffre, sans sanction.</p>
            <p class="ex" lang="en">${esc(exTarget)} ${sayBtn(exTarget)}</p>
          </div>
        </div>
        <p>Tout le débat est là : Asics a déjà un <em>objectif</em> (et l’a atteint). Le sujet propose de passer à un <em>quota</em>, c’est-à-dire une obligation.</p>

        <h2>Le plancher, l’échelon, le plafond</h2>
        <figure class="ladder">${LADDER_SVG}</figure>
        <dl class="defs">
          <div><dt lang="en">the glass ceiling ${sayBtn('the glass ceiling')}</dt><dd>Le plafond de verre : une barrière invisible qui empêche des femmes compétentes et expérimentées d’atteindre les postes les plus élevés.</dd></div>
          <div><dt lang="en">the broken rung ${sayBtn('the broken rung')}</dt><dd>L’échelon cassé : le blocage commence dès la première promotion vers un poste de manager. Moins de femmes managers, donc moins de femmes dirigeantes plus tard.</dd></div>
          <div><dt lang="en">the sticky floor ${sayBtn('the sticky floor')}</dt><dd>Le plancher collant : ce qui maintient beaucoup de femmes dans des postes peu payés, sans évolution.</dd></div>
        </dl>

        <h2>À Londres : « positive action » ou « positive discrimination » ?</h2>
        <div class="compare">
          <div class="compare__col compare__col--ok">
            <h3 class="en-term" lang="en">positive action</h3>
            <p><strong>Autorisée.</strong> Encourager les candidatures de femmes, les former, les parrainer. Et, entre deux candidats <strong>aussi qualifiés</strong>, choisir la personne du groupe sous-représenté : c’est le « tie-breaker ».</p>
          </div>
          <div class="compare__col compare__col--no">
            <h3 class="en-term" lang="en">positive discrimination</h3>
            <p><strong>Interdite</strong> par l’Equality Act 2010. Choisir quelqu’un de moins qualifié à cause de son genre. En 2023, l’armée de l’air britannique (RAF) a été reconnue coupable de l’avoir fait.</p>
          </div>
        </div>
        <p>C’est un argument fort pour le camp contre : un vrai quota d’embauche serait risqué juridiquement au Royaume-Uni.</p>

        <h2>Où les quotas existent déjà</h2>
        <ol class="timeline">
          ${D.timeline.map((t) => `<li><span class="timeline__y">${esc(t.y)}${t.m ? `<small>${esc(t.m)}</small>` : ''}</span><span lang="en">${esc(t.en)}</span></li>`).join('')}
        </ol>

        <h2>Ton cours, mis à jour</h2>
        <p class="lead">La vidéo du cours date de 2020 environ. Citer les chiffres de 2026, c’est montrer que tu maîtrises le sujet.</p>
        <ul class="updates">
          ${D.courseUpdates.map((u) => `<li><p class="was"><span class="lbl">Dans ton cours</span>${esc(u.was)}</p><p class="now"><span class="lbl">En 2026</span>${esc(u.now)}</p></li>`).join('')}
        </ul>
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Vocabulaire                                                         */
  /* ------------------------------------------------------------------ */
  let vocabFilter = 'star';
  let vocabQuery = '';
  const VFILTERS = [['star', 'Essentiels'], ['all', 'Tout'], ['cours', 'Vus en cours'], ['concepts', 'Notions'], ['verbs', 'Verbes'], ['adj', 'Adjectifs'], ['links', 'Liaison']];

  function vocabMatch(v) {
    if (vocabFilter === 'all') return true;
    if (vocabFilter === 'star') return !!v.star;
    if (vocabFilter === 'cours') return !!v.cours;
    return v.cat === vocabFilter;
  }

  function wordRow(v) {
    return `<li class="word">
      <div class="word__head">${sayBtn(v.en)}<span class="word__en" lang="en">${esc(v.en)}</span>${v.star ? `<span class="badge badge--star" title="Essentiel">${ICON.star}<span class="sr">essentiel</span></span>` : ''}${v.cours ? '<span class="badge badge--cours">cours</span>' : ''}</div>
      <p class="word__fr">${esc(v.fr)}</p>
      <p class="word__ex" lang="en">${esc(v.ex)} ${sayBtn(v.ex, 'Écouter l’exemple')}</p>
      ${v.pron ? `<p class="word__pron">Prononciation : ${esc(v.pron)}</p>` : ''}
    </li>`;
  }

  function drawVocabList() {
    const box = $('#vlist');
    if (!box) return;
    const q = norm(vocabQuery.trim());
    const items = q ? D.vocab.filter((v) => norm(v.en + ' ' + v.fr + ' ' + v.ex).includes(q)) : D.vocab.filter(vocabMatch);
    if (!items.length) {
      box.innerHTML = `<p class="empty">Aucun mot ne contient « ${esc(vocabQuery)} ». Essaie un seul mot, en anglais ou en français.</p>`;
      return;
    }
    box.innerHTML = Object.keys(D.vocabCats).map((cat) => {
      const its = items.filter((v) => v.cat === cat);
      if (!its.length) return '';
      return `<h2 class="vgroup">${esc(D.vocabCats[cat])}</h2><ul class="words">${its.map(wordRow).join('')}</ul>`;
    }).join('');
  }

  function renderVocab() {
    const stars = D.vocab.filter((v) => v.star).length;
    $('#p-vocabulaire').innerHTML = `
      <div class="wrap">
        <h1 tabindex="-1">Vocabulaire</h1>
        <p class="lead">${D.vocab.length} mots et expressions, dont ceux de ton cours. Pour tenir le débat, les <strong>${stars} essentiels</strong> suffisent.</p>
        <div class="filters" role="group" aria-label="Filtrer le vocabulaire">
          ${VFILTERS.map(([k, l]) => `<button class="chip" type="button" data-vfilter="${k}" aria-pressed="${vocabFilter === k}">${l}</button>`).join('')}
        </div>
        <label class="search"><span class="sr">Chercher un mot</span><input type="search" id="vq" placeholder="Chercher un mot, en anglais ou en français" value="${esc(vocabQuery)}" autocomplete="off"></label>
        <div id="vlist"></div>
        <p class="small muted" style="margin-top:18px">Pour les retenir, passe aux <a href="#flashcards">flashcards</a>.</p>
      </div>`;
    drawVocabList();
    $('#vq').addEventListener('input', (e) => { vocabQuery = e.target.value; drawVocabList(); });
  }

  /* ------------------------------------------------------------------ */
  /* Chiffres                                                            */
  /* ------------------------------------------------------------------ */
  const numHTML = (num) => esc(num).split('→').join(ICON.arrow);

  function bib(s) {
    const unit = s.unit ? `<span class="bib__unit">${esc(s.unit)}</span>` : '';
    return `<div class="bib bib--${s.side}" role="img" aria-label="${esc(s.num.replace('→', ' à ') + ' ' + (s.unit || '') + ' : ' + s.label)}">
      <span class="bib__label">${esc(s.label)}</span>
      <span class="bib__num" lang="en">${numHTML(s.num)}${unit}</span>
    </div>`;
  }

  const topStats = () => D.stats.filter((s) => s.top).sort((a, b) => (b.feature ? 1 : 0) - (a.feature ? 1 : 0));

  function statItem(s) {
    return `<article class="stat${s.feature ? ' stat--feature' : ''}">
      ${bib(s)}
      <p class="stat__say" lang="en">${esc(s.say)} ${sayBtn(s.say)}</p>
      <p class="stat__note">${esc(s.note)}</p>
      <p class="stat__meta">${tag(s.side)}<a href="${esc(s.url)}" target="_blank" rel="noopener">Source : ${esc(s.src)}</a></p>
    </article>`;
  }

  function renderStats() {
    const top = topStats();
    const more = D.stats.filter((s) => !s.top);
    const themes = unique(more.map((s) => s.theme));
    $('#p-chiffres').innerHTML = `
      <div class="wrap wrap--wide">
        <h1 tabindex="-1">Les chiffres</h1>
        <p class="lead">La prof veut des pourcentages. Épingle d’abord ces <strong>sept dossards</strong>, en commençant par ta propre entreprise : avec eux, tu as un chiffre pour chaque argument, dans les deux camps. Le bandeau indique à quel camp sert le chiffre : vert pour, or contre, violet les deux.</p>
        <div class="stats">${top.map(statItem).join('')}</div>

        <details class="more">
          <summary>Pour aller plus loin : ${more.length} autres chiffres, à piocher ${ICON.chevron}</summary>
          ${themes.map((t) => `<h2 class="stats__theme">${esc(t)}</h2><div class="stats">${more.filter((s) => s.theme === t).map(statItem).join('')}</div>`).join('')}
        </details>

        <details class="more" open>
          <summary>Dire les chiffres en anglais ${ICON.chevron}</summary>
          <ul class="numbers">
            ${D.numbers.map((n) => `<li><span class="numbers__w">${esc(n.w)}</span><span class="numbers__say" lang="en">${esc(n.say)} ${sayBtn(n.say)}</span>${n.fr ? `<span class="numbers__fr">${esc(n.fr)}</span>` : ''}</li>`).join('')}
          </ul>
        </details>

        <details class="more">
          <summary>Toutes les sources (${D.sources.length}) ${ICON.chevron}</summary>
          <ul class="sources">${D.sources.map((s) => `<li><a href="${esc(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a></li>`).join('')}</ul>
          <p class="small muted">Chiffres vérifiés le 24 novembre 2026.</p>
        </details>
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Arguments                                                           */
  /* ------------------------------------------------------------------ */
  let argTab = null;

  function argHTML(a, side) {
    return `<details class="arg arg--${side}">
      <summary>
        <span class="arg__t"><span class="arg__en" lang="en">${esc(a.en)}</span><span class="arg__fr">${esc(a.fr)}</span></span>
        <span class="arg__chev">${ICON.chevron}</span>
      </summary>
      <div class="arg__body">
        <p class="arg__brief">${esc(a.brief)}</p>
        <div class="blk"><h3>Dis-le</h3><p lang="en">${esc(a.say)} ${sayBtn(a.say)}</p></div>
        <div class="blk"><h3>La preuve</h3><p lang="en">${esc(a.proof)} ${sayBtn(a.proof)}</p></div>
        <div class="blk blk--them"><h3>Si un collègue te répond…</h3><p lang="en">“${esc(a.theySay)}” ${sayBtn(a.theySay)}</p></div>
        <div class="blk blk--you"><h3>… tu réponds</h3><p lang="en">${esc(a.answer)} ${sayBtn(a.answer)}</p></div>
        <div class="keys"><h3>À retenir</h3><ul>${a.keys.map((k) => `<li lang="en">${esc(k)}</li>`).join('')}</ul></div>
      </div>
    </details>`;
  }

  function middleHTML() {
    return `
      <section class="speech speech--both">
        <h2>Proposer un compromis</h2>
        <p>Dans une discussion à trois, celui qui propose une solution équilibrée marque des points, quel que soit son camp. Garde-le pour la fin.</p>
        <p class="big-en" lang="en">${esc(D.middle.say)} ${sayBtn(D.middle.say)}</p>
      </section>
      <h2>Les outils du compromis</h2>
      <ul class="ideas">
        ${D.middle.ideas.map((i) => `<li><span class="ideas__en" lang="en">${esc(i.en)} ${sayBtn(i.en)}</span><span class="ideas__fr">${esc(i.fr)}</span></li>`).join('')}
      </ul>`;
  }

  function renderArgs() {
    if (!argTab) argTab = camp === 'contre' ? 'contre' : 'pour';
    let body;
    if (argTab === 'middle') {
      body = middleHTML();
    } else {
      body = `
        <section class="speech speech--${argTab}">
          <h2>Ton ouverture</h2>
          <p lang="en">${esc(D.openings[argTab])} ${sayBtn(D.openings[argTab])}</p>
          <p class="small muted">Environ 40 secondes. C’est le seul passage à connaître presque par cœur.</p>
        </section>
        <div class="args-tools"><button class="link-btn" type="button" data-expand>Tout déplier</button></div>
        <div class="args">${D.args[argTab].map((a) => argHTML(a, argTab)).join('')}</div>
        <section class="speech speech--${argTab}">
          <h2>Ta conclusion</h2>
          <p lang="en">${esc(D.closings[argTab])} ${sayBtn(D.closings[argTab])}</p>
        </section>`;
    }
    $('#p-arguments').innerHTML = `
      <div class="wrap">
        <h1 tabindex="-1">Les arguments</h1>
        <p class="lead">Six arguments par camp. Pour chacun : la phrase à dire, la preuve chiffrée, et ta réponse à l’objection la plus probable.</p>
        <div class="seg" role="group" aria-label="Camp affiché">
          ${[['pour', 'Pour'], ['contre', 'Contre'], ['middle', 'Compromis']].map(([k, l]) => `<button class="seg__b seg__b--${k}" type="button" data-argtab="${k}" aria-pressed="${argTab === k}">${l}</button>`).join('')}
        </div>
        ${body}
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Hors travail                                                        */
  /* ------------------------------------------------------------------ */
  function renderBeyond() {
    const themes = unique(D.beyond.map((b) => b.theme));
    $('#p-hors-travail').innerHTML = `
      <div class="wrap">
        <h1 tabindex="-1">Hors du monde du travail</h1>
        <p class="lead">La prof l’a demandé : ne te limite pas aux entreprises. Un exemple politique ou sportif rend un argument bien plus convaincant. Chaque exemple indique à quel camp il sert.</p>
        ${themes.map((t) => `
          <h2>${esc(t)}</h2>
          ${D.beyond.filter((b) => b.theme === t).map((b) => `
            <article class="case">
              <h3 lang="en">${esc(b.en)}</h3>
              <p>${esc(b.fr)}</p>
              <p class="case__say" lang="en">${esc(b.say)} ${sayBtn(b.say)}</p>
              <p class="case__use">${tag(b.side)}${esc(b.use)}</p>
            </article>`).join('')}`).join('')}
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Phrases utiles                                                      */
  /* ------------------------------------------------------------------ */
  function renderPhrases() {
    $('#p-phrases').innerHTML = `
      <div class="wrap">
        <h1 tabindex="-1">Phrases utiles pour débattre</h1>
        <p class="lead">Ce n’est pas un exposé : tu dois réagir. Ces phrases te laissent le temps de réfléchir et rendent ton anglais naturel. Les étoiles marquent les huit à connaître en priorité.</p>
        ${D.phrases.map((g) => `
          <section class="pgroup">
            <h2>${esc(g.cat)}</h2>
            <ul class="phr">
              ${g.items.map((p) => `<li><span class="phr__en" lang="en">${p.star ? ICON.star : ''}${esc(p.en)}${p.star ? '<span class="sr"> (prioritaire)</span>' : ''}</span>${sayBtn(p.en)}<span class="phr__fr">${esc(p.fr)}</span></li>`).join('')}
            </ul>
          </section>`).join('')}
        <section class="pgroup">
          <h2>Les pièges des francophones</h2>
          <ul class="traps">
            ${D.traps.map((t) => `<li><p class="traps__no"><span class="sr">À éviter : </span><s lang="en">${esc(t.wrong)}</s></p><p class="traps__yes" lang="en"><span class="sr">À dire : </span>${esc(t.right)} ${sayBtn(t.right.replace(/\s*\(.*\)$/, ''))}</p>${t.note ? `<p class="traps__note">${esc(t.note)}</p>` : ''}</li>`).join('')}
          </ul>
        </section>
        <section class="pgroup">
          <h2>Prononciation</h2>
          <ul class="pron">
            ${D.pronunciation.map((p) => `<li><span class="pron__en" lang="en">${esc(p.en)}</span>${sayBtn(p.en)}<span class="pron__tip">${esc(p.tip)}</span></li>`).join('')}
          </ul>
        </section>
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Simulateur                                                          */
  /* ------------------------------------------------------------------ */
  const sim = { camp: null, mode: 'replies', queue: [], item: null, hints: false, answer: false, fr: false, timer: null, left: 30, total: 30 };

  const fmtTime = (s) => `${Math.floor(Math.max(0, s) / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;
  const modelText = (it) => it.answer || getPath(it.ref) || '';

  function simPool() {
    if (sim.mode === 'talk') {
      return D.monologues
        .filter((m) => sim.camp === 'mix' || m.side === 'both' || m.side === sim.camp)
        .map((m) => Object.assign({ kind: 'talk' }, m));
    }
    const a = D.sim.vsPour.map((x) => Object.assign({ kind: 'reply', side: 'pour' }, x));
    const b = D.sim.vsContre.map((x) => Object.assign({ kind: 'reply', side: 'contre' }, x));
    if (sim.camp === 'pour') return a;
    if (sim.camp === 'contre') return b;
    return a.concat(b);
  }

  function stopTimer() {
    if (sim.timer) { clearInterval(sim.timer); sim.timer = null; }
  }

  function markDone(it) {
    if (!it || it.kind !== 'reply') return;
    const done = store.get('simDone', []);
    if (!done.includes(it.id)) { done.push(it.id); store.set('simDone', done); }
  }

  function nextSim() {
    stopTimer();
    if (!sim.queue.length) {
      const prev = sim.item ? sim.item.id : null;
      sim.queue = shuffle(simPool());
      if (sim.queue.length > 1 && sim.queue[0].id === prev) sim.queue.push(sim.queue.shift());
    }
    sim.item = sim.queue.shift();
    sim.hints = false;
    sim.answer = false;
    sim.fr = false;
    sim.total = sim.item.kind === 'talk' ? 60 : 30;
    sim.left = sim.total;
    drawSim();
  }

  function timerLabel() {
    if (sim.timer) return 'Pause';
    if (sim.left === sim.total) return `Lancer le chrono (${sim.total} s)`;
    if (sim.left <= 0) return 'Relancer le chrono';
    return 'Reprendre';
  }

  function updateTimer() {
    const t = $('#simTime');
    const b = $('#simBar');
    if (t) t.textContent = fmtTime(sim.left);
    if (b) b.style.width = (100 * sim.left / sim.total) + '%';
  }

  function toggleTimer() {
    if (sim.timer) { stopTimer(); drawSim(); return; }
    if (sim.left <= 0) sim.left = sim.total;
    sim.timer = setInterval(() => {
      sim.left -= 1;
      updateTimer();
      if (sim.left <= 0) {
        stopTimer();
        toast('Temps écoulé ! Compare avec la réponse possible.');
        drawSim();
      }
    }, 1000);
    drawSim();
  }

  function drawSim() {
    const st = $('#simStage');
    if (!st || !sim.item) return;
    const it = sim.item;
    let head;
    if (it.kind === 'reply') {
      const p = D.people[it.who];
      head = `
        <article class="meeting">
          ${sim.camp === 'mix' ? `<p class="meeting__side meeting__side--${it.side}">Pour cette réplique, tu défends le <strong>${it.side}</strong>.</p>` : ''}
          <div class="meeting__who"><span class="avatar avatar--${it.who}" aria-hidden="true">${esc(p.name.charAt(0))}</span><span><strong>${esc(p.name)}</strong><span class="muted" lang="en">${esc(p.role)}</span></span></div>
          <blockquote class="bubble" lang="en">${esc(it.en)}</blockquote>
          <div class="row">${sayBtnText(it.en, 'Écouter')}<button class="btn btn--ghost" type="button" data-sim="fr" aria-expanded="${sim.fr}">${sim.fr ? 'Masquer la traduction' : 'Traduire'}</button></div>
          ${sim.fr ? `<p class="bubble__fr">${esc(it.fr)}</p>` : ''}
        </article>`;
    } else {
      head = `
        <article class="meeting">
          ${it.side !== 'both' ? `<p class="meeting__side meeting__side--${it.side}">Camp ${it.side}</p>` : ''}
          <p class="meeting__task">${esc(it.task)}</p>
          <p class="muted" style="margin:0">Parle une minute sans t’arrêter. Glisse au moins un chiffre et un mot de liaison (however, moreover, therefore).</p>
        </article>`;
    }
    const hint = it.kind === 'reply'
      ? `<div class="hintbox">${sim.hints
        ? `<p class="small muted">Pistes pour ta réponse :</p><ul>${it.hints.map((h) => `<li lang="en">${esc(h)}</li>`).join('')}</ul>`
        : '<button class="btn btn--ghost" type="button" data-sim="hints">Un indice</button>'}</div>`
      : '';
    const model = sim.answer
      ? `<div class="model"><h2>Une réponse possible</h2><p lang="en">${esc(modelText(it))} ${sayBtn(modelText(it))}</p></div>`
      : '<div><button class="btn btn--ghost" type="button" data-sim="answer">Voir une réponse possible</button></div>';
    const done = store.get('simDone', []).length;
    const total = D.sim.vsPour.length + D.sim.vsContre.length;

    st.innerHTML = `${head}
      <div class="sim-steps">
        <div class="timer">
          <span class="timer__n" id="simTime">${fmtTime(sim.left)}</span>
          <div class="bar"><span id="simBar" style="width:${100 * sim.left / sim.total}%"></span></div>
          <button class="btn" type="button" data-sim="timer">${timerLabel()}</button>
        </div>
        ${hint}
        ${model}
        <div class="row"><button class="btn btn--primary" type="button" data-sim="next">${it.kind === 'reply' ? 'Réplique suivante' : 'Sujet suivant'}</button></div>
        ${sim.mode === 'replies' ? `<p class="sim-count">Répliques travaillées : ${done} sur ${total}.</p>` : ''}
      </div>`;
  }

  function simAction(a) {
    const it = sim.item;
    if (a === 'fr') { sim.fr = !sim.fr; drawSim(); }
    else if (a === 'hints') { sim.hints = true; drawSim(); }
    else if (a === 'answer') { sim.answer = true; markDone(it); drawSim(); }
    else if (a === 'timer') { toggleTimer(); }
    else if (a === 'next') { markDone(it); Speech.stop(); nextSim(); }
  }

  function renderSim() {
    if (!sim.camp) sim.camp = camp === 'pour' || camp === 'contre' ? camp : 'mix';
    stopTimer();
    $('#p-simulateur').innerHTML = `
      <div class="wrap">
        <h1 tabindex="-1">Simulateur de débat</h1>
        <p class="lead">Un collègue te lance une phrase. Réponds <strong>à voix haute</strong> avant de regarder l’aide : c’est en parlant que ça rentre.</p>
        <div class="sim-controls">
          <div class="seg" role="group" aria-label="Ton camp">
            ${[['pour', 'Pour', 'pour'], ['contre', 'Contre', 'contre'], ['mix', 'Les deux, mélangés', 'both']].map(([k, l, c]) => `<button class="seg__b seg__b--${c}" type="button" data-simcamp="${k}" aria-pressed="${sim.camp === k}">${l}</button>`).join('')}
          </div>
          <div class="seg seg--small" role="group" aria-label="Exercice">
            ${[['replies', 'Répondre à un collègue'], ['talk', 'Parler une minute']].map(([k, l]) => `<button class="seg__b" type="button" data-simmode="${k}" aria-pressed="${sim.mode === k}">${l}</button>`).join('')}
          </div>
        </div>
        <div id="simStage"></div>
      </div>`;
    sim.queue = [];
    sim.item = null;
    nextSim();
  }

  /* ------------------------------------------------------------------ */
  /* Quiz                                                                */
  /* ------------------------------------------------------------------ */
  const quiz = { started: false, qs: [], i: 0, score: 0, answered: false, pick: null, missed: [] };

  function vocabQuestion(used) {
    let v;
    let guard = 0;
    do { v = D.vocab[Math.floor(Math.random() * D.vocab.length)]; guard++; } while (used.has(v.id) && guard < 50);
    used.add(v.id);
    const others = shuffle(D.vocab.filter((x) => x.id !== v.id && x.cat === v.cat)).slice(0, 3);
    if (Math.random() < 0.5) {
      return { q: `Que veut dire « ${v.en} » ?`, o: [v.fr].concat(others.map((x) => x.fr)), x: `Exemple : ${v.ex}`, say: v.en };
    }
    return { q: `Comment dit-on « ${v.fr} » en anglais ?`, o: [v.en].concat(others.map((x) => x.en)), x: `Exemple : ${v.ex}`, say: v.en, en: true };
  }

  function newQuiz() {
    const used = new Set();
    const picked = shuffle(D.quiz).slice(0, 7).concat([vocabQuestion(used), vocabQuestion(used), vocabQuestion(used)]);
    quiz.qs = shuffle(picked).map((q) => Object.assign({}, q, { opts: shuffle(q.o.map((t, k) => ({ t, ok: k === 0 }))) }));
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
    const st = $('#quizStage');
    if (!st) return;
    if (!quiz.started) {
      const best = store.get('quizBest', null);
      st.innerHTML = `<p>${best === null ? 'Pas encore de score enregistré.' : `Ton meilleur score : <strong>${best}/10</strong>.`}</p>
        <button class="btn btn--primary" type="button" data-quiz="start">Commencer le quiz</button>`;
      return;
    }
    if (quiz.i >= quiz.qs.length) {
      const s = quiz.score;
      const best = store.get('quizBest', null);
      if (best === null || s > best) store.set('quizBest', s);
      const msg = s >= 9 ? 'Excellent : tu es prêt pour le TP.'
        : s >= 7 ? 'Très bien. Relis les réponses ratées ci-dessous.'
          : s >= 5 ? 'Pas mal. Un tour de flashcards, puis rejoue.'
            : 'Commence par les sept chiffres et les flashcards « essentiels », puis rejoue.';
      st.innerHTML = `
        <p class="qend__score">${s}<small>/${quiz.qs.length}</small></p>
        <p>${msg}${best !== null && s > best ? ' Nouveau record !' : ''}</p>
        ${quiz.missed.length ? `<h2>À revoir</h2><ul class="missed">${quiz.missed.map((m) => `<li><p>${esc(m.q)}</p><p class="missed__a">${esc(m.a)}</p></li>`).join('')}</ul>` : ''}
        <button class="btn btn--primary" type="button" data-quiz="start">Rejouer avec d’autres questions</button>`;
      return;
    }
    const q = quiz.qs[quiz.i];
    const opts = q.opts.map((o, k) => {
      let cls = '';
      let extra = '';
      if (quiz.answered && o.ok) { cls = ' is-right'; extra = `${ICON.check}<span class="sr"> (bonne réponse)</span>`; }
      else if (quiz.answered && quiz.pick === k) { cls = ' is-wrong'; extra = '<span class="sr"> (ta réponse)</span>'; }
      return `<button class="opt${cls}" type="button" data-opt="${k}"${quiz.answered ? ' disabled' : ''}${q.en ? ' lang="en"' : ''}><span>${esc(o.t)}</span>${extra}</button>`;
    }).join('');
    const right = quiz.answered && q.opts[quiz.pick].ok;
    st.innerHTML = `
      <div class="qcard">
        <p class="qcount">Question ${quiz.i + 1} sur ${quiz.qs.length}</p>
        <div class="bar"><span style="width:${100 * quiz.i / quiz.qs.length}%"></span></div>
        <h2 class="qq">${esc(q.q)}</h2>
        <div class="opts">${opts}</div>
        ${quiz.answered ? `
          <div class="feedback ${right ? 'feedback--ok' : 'feedback--ko'}" role="status">
            <p><strong>${right ? 'Bonne réponse.' : 'Raté.'}</strong> ${esc(q.x)}</p>
            ${q.say ? sayBtn(q.say) : ''}
          </div>
          <button class="btn btn--primary" type="button" data-quiz="next">${quiz.i + 1 < quiz.qs.length ? 'Question suivante' : 'Voir mon score'}</button>` : ''}
      </div>`;
  }

  function renderQuiz() {
    $('#p-quiz').innerHTML = `
      <div class="wrap">
        <h1 tabindex="-1">Quiz</h1>
        <p class="lead">Dix questions tirées au hasard : chiffres, vocabulaire, arguments et pièges. Une explication s’affiche après chaque réponse.</p>
        <div id="quizStage"></div>
      </div>`;
    drawQuiz();
  }

  /* ------------------------------------------------------------------ */
  /* Flashcards                                                          */
  /* ------------------------------------------------------------------ */
  const fc = { deck: 'star', dir: 'en', queue: [], cur: null, flipped: false };
  const DECKS = [['star', 'Essentiels'], ['cours', 'Vus en cours'], ['all', 'Tout'], ['concepts', 'Notions'], ['verbs', 'Verbes'], ['adj', 'Adjectifs'], ['links', 'Liaison']];

  function deckItems() {
    return D.vocab.filter((v) => {
      if (fc.deck === 'all') return true;
      if (fc.deck === 'star') return !!v.star;
      if (fc.deck === 'cours') return !!v.cours;
      return v.cat === fc.deck;
    });
  }

  function buildQueue() {
    const known = new Set(store.get('known', []));
    fc.queue = shuffle(deckItems().filter((v) => !known.has(v.id)));
    nextCard();
  }

  function nextCard() {
    fc.cur = fc.queue.shift() || null;
    fc.flipped = false;
    drawFlash();
  }

  function drawFlash() {
    const st = $('#fcStage');
    if (!st) return;
    const items = deckItems();
    const known = new Set(store.get('known', []));
    const k = items.filter((v) => known.has(v.id)).length;
    const prog = `<div class="fc-prog"><div class="bar"><span style="width:${items.length ? (100 * k / items.length) : 0}%"></span></div><p>${k} sur ${items.length} mots sus dans ce paquet</p></div>`;
    if (!fc.cur) {
      st.innerHTML = `${prog}
        <div class="fc-done">
          <p><strong>Paquet terminé.</strong> Tu connais tous les mots de ce paquet. Passe au paquet suivant, ou recommence celui-ci pour vérifier.</p>
          <div class="row"><button class="btn btn--primary" type="button" data-fc="restart">Recommencer ce paquet</button></div>
        </div>`;
      return;
    }
    const v = fc.cur;
    const enFront = fc.dir === 'en';
    st.innerHTML = `${prog}
      <div class="card${fc.flipped ? ' is-flipped' : ''}">
        <button class="card__inner" type="button" data-fc="flip" aria-label="${fc.flipped ? 'Revoir la question' : 'Retourner la carte pour voir la réponse'}">
          <span class="card__face card__front" aria-hidden="${fc.flipped}">
            <span class="card__hint">${enFront ? 'Que veut dire…' : 'Comment dit-on en anglais…'}</span>
            <span class="card__word"${enFront ? ' lang="en"' : ''}>${esc(enFront ? v.en : v.fr)}</span>
            <span class="card__tap">Dis la réponse à voix haute, puis touche la carte</span>
          </span>
          <span class="card__face card__back" aria-hidden="${!fc.flipped}">
            <span class="card__word card__word--sm"${enFront ? '' : ' lang="en"'}>${esc(enFront ? v.fr : v.en)}</span>
            <span class="card__ex" lang="en">${esc(v.ex)}</span>
          </span>
        </button>
      </div>
      <div class="row row--center" style="margin-top:12px">${sayBtnText(v.en, 'Écouter le mot')}${sayBtnText(v.ex, 'Écouter l’exemple')}</div>
      <div class="fc-actions">
        <button class="btn" type="button" data-fc="again">À revoir</button>
        <button class="btn btn--know" type="button" data-fc="know">Je savais</button>
      </div>`;
  }

  function fcAction(a) {
    if (a === 'flip') {
      fc.flipped = !fc.flipped;
      const card = $('#fcStage .card');
      if (card) card.classList.toggle('is-flipped', fc.flipped);
      const inner = $('#fcStage .card__inner');
      if (inner) inner.setAttribute('aria-label', fc.flipped ? 'Revoir la question' : 'Retourner la carte pour voir la réponse');
      const front = $('#fcStage .card__front');
      const back = $('#fcStage .card__back');
      if (front) front.setAttribute('aria-hidden', String(fc.flipped));
      if (back) back.setAttribute('aria-hidden', String(!fc.flipped));
      return;
    }
    if (a === 'know' && fc.cur) {
      const known = store.get('known', []);
      if (!known.includes(fc.cur.id)) { known.push(fc.cur.id); store.set('known', known); }
      Speech.stop();
      nextCard();
      return;
    }
    if (a === 'again' && fc.cur) {
      const pos = Math.min(fc.queue.length, 3 + Math.floor(Math.random() * 3));
      fc.queue.splice(pos, 0, fc.cur);
      Speech.stop();
      nextCard();
      return;
    }
    if (a === 'restart') {
      const ids = new Set(deckItems().map((v) => v.id));
      store.set('known', store.get('known', []).filter((id) => !ids.has(id)));
      buildQueue();
    }
  }

  function renderFlash() {
    $('#p-flashcards').innerHTML = `
      <div class="wrap">
        <h1 tabindex="-1">Flashcards</h1>
        <p class="lead">Lis la carte, dis la réponse à voix haute, puis retourne-la. Les mots que tu sais sortent du paquet ; les autres reviennent un peu plus tard.</p>
        <div class="filters" role="group" aria-label="Paquet de cartes">
          ${DECKS.map(([k, l]) => `<button class="chip" type="button" data-deck="${k}" aria-pressed="${fc.deck === k}">${l}</button>`).join('')}
        </div>
        <div class="seg seg--small" role="group" aria-label="Sens des cartes">
          ${[['en', 'Anglais → français'], ['fr', 'Français → anglais']].map(([k, l]) => `<button class="seg__b" type="button" data-dir="${k}" aria-pressed="${fc.dir === k}">${l}</button>`).join('')}
        </div>
        <div id="fcStage"></div>
      </div>`;
    buildQueue();
  }

  /* ------------------------------------------------------------------ */
  /* Fiche J-0                                                           */
  /* ------------------------------------------------------------------ */
  let ficheCamp = null;
  const HOOK = 'The name Asics comes from a Latin phrase: “a sound mind in a sound body”.';

  function renderFiche() {
    if (!ficheCamp) ficheCamp = camp || 'both';
    const sides = ficheCamp === 'both' ? ['pour', 'contre'] : [ficheCamp];
    const top = topStats();
    const phrases = [];
    D.phrases.forEach((g) => g.items.forEach((p) => { if (p.star) phrases.push(p); }));
    const traps = D.traps.filter((t) => t.top);
    const unitTxt = (s) => (s.unit === 'years' ? ' years' : (s.unit || ''));

    $('#p-fiche').innerHTML = `
      <div class="wrap wrap--wide">
        <div class="fiche-head">
          <h1 tabindex="-1">Fiche J-0</h1>
          <button class="btn btn--ghost no-print" type="button" data-print>Imprimer la fiche</button>
        </div>
        <p class="lead no-print">À relire juste avant le TP. Si tu connais ton camp, affiche seulement le tien.</p>
        <div class="seg no-print" role="group" aria-label="Camp affiché">
          ${[['pour', 'Pour', 'pour'], ['contre', 'Contre', 'contre'], ['both', 'Les deux', 'both']].map(([k, l, c]) => `<button class="seg__b seg__b--${c}" type="button" data-fichecamp="${k}" aria-pressed="${ficheCamp === k}">${l}</button>`).join('')}
        </div>

        <section class="fiche-hook">
          <h2>Ton accroche</h2>
          <p lang="en">${esc(HOOK)} ${sayBtn(HOOK)}</p>
        </section>

        <div class="fiche-cols fiche-cols--${sides.length}">
          ${sides.map((s) => `
            <section class="fiche-col fiche-col--${s}">
              <h2>${s === 'pour' ? 'Camp pour' : 'Camp contre'}</h2>
              <h3>Ouverture</h3>
              <p lang="en">${esc(D.openings[s])} ${sayBtn(D.openings[s])}</p>
              <h3>Tes trois meilleurs arguments</h3>
              <ol class="fiche-args">
                ${D.args[s].filter((a) => a.fiche).map((a) => `<li><span class="fiche-args__en" lang="en">${esc(a.en)}</span><span class="fiche-args__fig" lang="en">${esc(a.figure)}</span></li>`).join('')}
              </ol>
              <h3>Conclusion</h3>
              <p lang="en">${esc(D.closings[s])} ${sayBtn(D.closings[s])}</p>
            </section>`).join('')}
        </div>

        <h2>Les sept chiffres</h2>
        <ul class="fiche-stats">
          ${top.map((s) => `<li><span class="fiche-stats__n">${esc(s.num)}${esc(unitTxt(s))}</span><span lang="en">${esc(s.say)}</span></li>`).join('')}
        </ul>

        <div class="fiche-cols fiche-cols--2">
          <section>
            <h2>Huit phrases pour débattre</h2>
            <ul class="fiche-list">${phrases.map((p) => `<li lang="en">${esc(p.en)}</li>`).join('')}</ul>
          </section>
          <section>
            <h2>Cinq pièges</h2>
            <ul class="fiche-list">${traps.map((t) => `<li><s lang="en">${esc(t.wrong)}</s> <strong lang="en">${esc(t.right)}</strong></li>`).join('')}</ul>
          </section>
        </div>

        <h2>Le compromis, pour finir</h2>
        <p lang="en">${esc(D.middle.say)} ${sayBtn(D.middle.say)}</p>
      </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Navigation                                                          */
  /* ------------------------------------------------------------------ */
  const PAGES = {
    accueil: ['Accueil', renderHome],
    comprendre: ['Comprendre le sujet', renderComprendre],
    vocabulaire: ['Vocabulaire', renderVocab],
    chiffres: ['Les chiffres', renderStats],
    arguments: ['Les arguments', renderArgs],
    'hors-travail': ['Hors du monde du travail', renderBeyond],
    phrases: ['Phrases utiles', renderPhrases],
    simulateur: ['Simulateur de débat', renderSim],
    quiz: ['Quiz', renderQuiz],
    flashcards: ['Flashcards', renderFlash],
    fiche: ['Fiche J-0', renderFiche]
  };
  const rendered = {};
  let firstRoute = true;

  function route() {
    let id = decodeURIComponent(location.hash.replace(/^#/, '')) || 'accueil';
    if (!PAGES[id]) id = 'accueil';
    Speech.stop();
    if (id !== 'simulateur') { stopTimer(); if (sim.item) drawSim(); }
    Object.keys(PAGES).forEach((p) => { const s = $('#p-' + p); if (s) s.hidden = p !== id; });
    $$('.tabs a').forEach((a) => {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (!rendered[id] || id === 'accueil') { PAGES[id][1](); rendered[id] = true; }
    document.title = `${PAGES[id][0]} — Gender quotas, débat d’anglais`;
    const active = $('.tabs a[aria-current="page"]');
    const tabs = $('.tabs');
    if (active && tabs) {
      const left = active.getBoundingClientRect().left - tabs.getBoundingClientRect().left + tabs.scrollLeft;
      tabs.scrollLeft = Math.max(0, left - tabs.clientWidth / 2 + active.offsetWidth / 2);
    }
    window.scrollTo(0, 0);
    if (!firstRoute) {
      const h = $('#p-' + id + ' h1');
      if (h) h.focus({ preventScroll: true });
    }
    firstRoute = false;
  }

  /* ------------------------------------------------------------------ */
  /* Clics (délégation)                                                  */
  /* ------------------------------------------------------------------ */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button');
    if (!t) return;
    const d = t.dataset;

    if (d.say !== undefined) { Speech.speak(d.say, t); return; }
    if (d.camp) { setCamp(d.camp); return; }

    if (d.vfilter) {
      vocabFilter = d.vfilter;
      vocabQuery = '';
      const input = $('#vq');
      if (input) input.value = '';
      $$('[data-vfilter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.vfilter === vocabFilter)));
      drawVocabList();
      return;
    }

    if (d.argtab) { argTab = d.argtab; renderArgs(); const b = $(`[data-argtab="${argTab}"]`); if (b) b.focus(); return; }
    if (d.expand !== undefined) {
      const all = $$('#p-arguments details.arg');
      const open = all.some((x) => !x.open);
      all.forEach((x) => { x.open = open; });
      t.textContent = open ? 'Tout replier' : 'Tout déplier';
      return;
    }

    if (d.simcamp) { sim.camp = d.simcamp; renderSim(); const b = $(`[data-simcamp="${sim.camp}"]`); if (b) b.focus(); return; }
    if (d.simmode) { sim.mode = d.simmode; renderSim(); const b = $(`[data-simmode="${sim.mode}"]`); if (b) b.focus(); return; }
    if (d.sim) { simAction(d.sim); const b = $(`[data-sim="${d.sim}"]`); if (b && d.sim !== 'next') b.focus(); return; }

    if (d.quiz) {
      if (d.quiz === 'start') newQuiz();
      else { quiz.i += 1; quiz.answered = false; quiz.pick = null; drawQuiz(); }
      const first = $('#quizStage .opt') || $('#quizStage .btn');
      if (first) first.focus({ preventScroll: true });
      return;
    }
    if (d.opt !== undefined) { answerQuiz(Number(d.opt)); return; }

    if (d.deck) {
      fc.deck = d.deck;
      $$('[data-deck]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.deck === fc.deck)));
      buildQueue();
      return;
    }
    if (d.dir) {
      fc.dir = d.dir;
      $$('[data-dir]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.dir === fc.dir)));
      fc.flipped = false;
      drawFlash();
      return;
    }
    if (d.fc) { fcAction(d.fc); if (d.fc !== 'flip') { const b = $(`[data-fc="${d.fc}"]`) || $('[data-fc="flip"]'); if (b) b.focus({ preventScroll: true }); } return; }

    if (d.fichecamp) { ficheCamp = d.fichecamp; renderFiche(); const b = $(`[data-fichecamp="${ficheCamp}"]`); if (b) b.focus(); return; }
    if (d.print !== undefined) { window.print(); }
  });

  /* Raccourcis clavier pour les flashcards : espace = retourner, → = je savais, ← = à revoir */
  document.addEventListener('keydown', (e) => {
    if ($('#p-flashcards').hidden || !fc.cur) return;
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); fcAction('know'); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); fcAction('again'); }
  });

  /* Lien d’évitement : va au contenu sans changer de page */
  const skip = $('.skip');
  if (skip) skip.addEventListener('click', (e) => { e.preventDefault(); const m = $('#main'); if (m) m.focus(); });

  window.addEventListener('hashchange', route);
  initVoiceButton();
  route();
})();
