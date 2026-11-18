const siteHeader = document.querySelector('.site-header');
const checkShell = document.getElementById('projectCheck');
const checkDialog = checkShell.querySelector('.check-dialog');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const toast = document.getElementById('toast');
const state = { challenge: '', stage: '', outcome: '' };
let activeStep = 1;
let lastFocused = null;

const recommendationMap = {
  transformation: {
    title: 'Business & Transformation Advisory',
    text: 'Der sinnvollste Einstieg ist eine fokussierte Klärung des Geschäftsproblems. Sie verbindet Ursachen, wirtschaftliche Wirkung und Lösungsoptionen zu einer belastbaren Entscheidungs- und Transformationsgrundlage.',
    focus: ['Geschäftsproblem, Ursachen und Wirkung strukturieren', 'Handlungsoptionen und Trade-offs bewerten', 'Prioritäten und Umsetzungslogik entwickeln'],
    deliverables: ['Gemeinsames Problem- und Zielbild', 'Begründete Entscheidungsoptionen', 'Transformationsplan für den nächsten Schritt']
  },
  partnership: {
    title: 'Strategic Partnerships & Organizational Design',
    text: 'Die Zusammenarbeit braucht mehr als eine vertragliche Grundlage. Ein gemeinsames Operating Model klärt Governance, Rollen, Entscheidungen und Schnittstellen, damit die Kooperation im Alltag arbeitsfähig wird.',
    focus: ['Interessen, Beiträge und Abhängigkeiten klären', 'Governance und Entscheidungsrechte gestalten', 'Rollen, Prozesse und Schnittstellen definieren'],
    deliverables: ['Abgestimmtes Kooperationsmodell', 'Klare Governance- und Rollenstruktur', 'Umsetzbares gemeinsames Operating Model']
  },
  change: {
    title: 'Change Management & Stakeholder Alignment',
    text: 'Die Veränderung wird tragfähig, wenn Interessen, Erwartungen und Widerstände früh sichtbar werden. Der Fokus liegt auf Beteiligung, Kommunikation und organisatorischer Verankerung.',
    focus: ['Stakeholder und Veränderungswirkung analysieren', 'Beteiligungs- und Kommunikationsformate gestalten', 'Verantwortung und Adoption in der Organisation verankern'],
    deliverables: ['Stakeholder- und Change-Bild', 'Abgestimmter Beteiligungs- und Kommunikationsplan', 'Konkrete Maßnahmen für Adoption und Implementierung']
  },
  technology: {
    title: 'Business Analysis & Technology Enablement',
    text: 'Die digitale Lösung sollte aus Geschäftsproblem, Prozess und Anforderungen entstehen. So werden Nutzen, System-Fit und Umsetzbarkeit vor der Implementierung nachvollziehbar.',
    focus: ['Ist- und Zielprozesse analysieren', 'Business und System Requirements priorisieren', 'Lösung, Tool-Auswahl und Delivery verbinden'],
    deliverables: ['Abgestimmtes Prozess- und Anforderungsbild', 'Nachvollziehbare Lösungsentscheidung', 'Umsetzungsfähiger Blueprint und Delivery-Rahmen']
  }
};

function openCheck() {
  lastFocused = document.activeElement;
  checkShell.classList.add('open');
  checkShell.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  window.setTimeout(() => checkDialog.focus(), 20);
}

function closeCheck() {
  checkShell.classList.remove('open');
  checkShell.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (lastFocused) lastFocused.focus();
}

function showStep(step) {
  activeStep = step;
  checkShell.querySelectorAll('.check-step').forEach((panel) => {
    panel.classList.toggle('active', String(panel.dataset.step) === String(step));
  });

  if (step === 'result') {
    progressBar.style.width = '100%';
    progressText.textContent = 'Auswertung';
  } else {
    progressBar.style.width = `${(step / 3) * 100}%`;
    progressText.textContent = `Schritt ${step} von 3`;
  }
  checkDialog.scrollTop = 0;
}

function getRecommendation() {
  return recommendationMap[state.challenge] || recommendationMap.transformation;
}

function renderResult() {
  const result = getRecommendation();
  const contactPrompts = {
    transformation: 'Sie möchten Klarheit über Ihr Vorhaben gewinnen? Lassen Sie uns Ihre Ausgangslage gemeinsam besprechen.',
    partnership: 'Sie planen eine Kooperation oder stehen vor einer Verhandlung? Lassen Sie uns Ihre Ziele und nächsten Schritte besprechen.',
    change: 'Sie möchten Menschen für Ihre Veränderung gewinnen? Lassen Sie uns über Ihre Stakeholder und Herausforderungen sprechen.',
    technology: 'Sie suchen eine passende digitale Lösung? Lassen Sie uns zuerst Ihre Prozesse und Anforderungen verstehen.'
  };
  document.getElementById('resultContactText').textContent = contactPrompts[state.challenge] || contactPrompts.transformation;
  document.getElementById('resultTitle').textContent = result.title;
  document.getElementById('resultText').textContent = result.text;
  document.getElementById('resultFocus').innerHTML = result.focus.map(item => `<li>${item}</li>`).join('');
  document.getElementById('resultDeliverables').innerHTML = result.deliverables.map(item => `<li>${item}</li>`).join('');
  showStep('result');
}

function labels() {
  const challenge = {
    transformation: 'Ein komplexes Geschäftsproblem braucht eine klare Richtung',
    partnership: 'Eine strategische Zusammenarbeit muss arbeitsfähig werden',
    change: 'Stakeholder müssen für eine Veränderung zusammenfinden',
    technology: 'Prozess, Anforderungen und Technologie müssen zusammenpassen'
  }[state.challenge];
  const stage = {
    understand: 'Orientierung und Diagnose',
    design: 'Zielbild und Gestaltung',
    implement: 'Entscheidung und Implementierung',
    optimize: 'Stabilisierung und Optimierung'
  }[state.stage];
  const outcome = {
    decision: 'Eine belastbare Entscheidung',
    'operating-model': 'Ein arbeitsfähiges Operating Model',
    alignment: 'Alignment und Veränderungsbereitschaft',
    technology: 'Eine passende Lösung in Umsetzung'
  }[state.outcome];
  return { challenge, stage, outcome };
}

function briefText() {
  const result = getRecommendation();
  const answers = labels();
  return [
    'NUTHEM — Projekt-Check',
    '',
    `Ausgangsproblem: ${answers.challenge}`,
    `Aktueller Stand: ${answers.stage}`,
    `Gewünschtes Ergebnis: ${answers.outcome}`,
    '',
    `Empfohlener Einstieg: ${result.title}`,
    result.text,
    '',
    'Empfohlener Fokus:',
    ...result.focus.map(item => `• ${item}`),
    '',
    'Erstes Ergebnis:',
    ...result.deliverables.map(item => `• ${item}`),
    '',
    'Hinweis: Diese erste Einordnung ersetzt noch kein persönliches Discovery-Gespräch.'
  ].join('\n');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
}

document.querySelectorAll('.js-open-check').forEach(button => button.addEventListener('click', openCheck));
checkShell.querySelectorAll('[data-close-check]').forEach(button => button.addEventListener('click', closeCheck));

checkShell.querySelectorAll('.answer').forEach(button => {
  button.addEventListener('click', () => {
    state[button.dataset.answer] = button.dataset.value;
    if (activeStep < 3) showStep(activeStep + 1);
    else renderResult();
  });
});

checkShell.querySelectorAll('[data-prev]').forEach(button => {
  button.addEventListener('click', () => showStep(Math.max(1, activeStep - 1)));
});

document.getElementById('restartCheck').addEventListener('click', () => {
  Object.keys(state).forEach(key => state[key] = '');
  showStep(1);
});

document.getElementById('copyBrief').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(briefText());
    showToast('Ergebnis kopiert.');
  } catch {
    showToast('Kopieren wurde vom Browser blockiert.');
  }
});

document.getElementById('downloadBrief').addEventListener('click', () => {
  const blob = new Blob([briefText()], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'NUTHEM-Projektbrief.txt';
  link.click();
  URL.revokeObjectURL(url);
  showToast('Projektbrief heruntergeladen.');
});

document.addEventListener('keydown', (event) => {
  if (!checkShell.classList.contains('open')) return;
  if (event.key === 'Escape') closeCheck();
  if (event.key === 'Tab') {
    const focusable = [...checkDialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')].filter(el => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--delay', `${entry.target.dataset.delay || 0}ms`);
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.capability').forEach(card => {
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.capability').forEach(item => item.classList.remove('active'));
    card.classList.add('active');
  });
});

window.addEventListener('scroll', () => siteHeader.classList.toggle('scrolled', window.scrollY > 18), { passive: true });
document.getElementById('year').textContent = new Date().getFullYear();
