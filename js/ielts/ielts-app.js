/* ielts-app.js — Screen-Steuerung für den TEST-Bereich (IELTS-Vorbereitung).
   Folgt demselben Muster wie app.js: State-Objekt, render*-Funktionen, Event-Wiring.
   Nutzt App.switchScreen() aus app.js für die eigentliche Screen-Umschaltung sowie
   Review.getDifficultCards() aus review.js, um Vokabel-Empfehlungen einzubinden. */

const IeltsApp = (() => {
  const el = (id) => document.getElementById(id);

  const state = {
    level: "beginner",
    session: null,
  };

  const SKILLS = [
    { id: "reading", emoji: "📖", name: "Reading", desc: "Lesetexte mit Multiple Choice, True/False/Not Given u.v.m.", available: true },
    { id: "listening", emoji: "🎧", name: "Listening", desc: "Skript anhören und Verständnisfragen beantworten.", available: true },
    { id: "writing", emoji: "✍️", name: "Writing", desc: "Task 1 & 2 mit Selbsteinschätzung.", available: false },
    { id: "speaking", emoji: "🎤", name: "Speaking", desc: "Part 1–3 mit Aufnahme & Selbsteinschätzung.", available: false },
  ];

  function levelLabel(id) {
    const lv = IELTS_LEVELS.find((l) => l.id === id);
    return lv ? lv.label : id;
  }

  function skillEmoji(skill) {
    return skill === "reading" ? "📖" : skill === "listening" ? "🎧" : "🎯";
  }

  function skillLabel(skill) {
    return skill === "reading" ? "Reading" : skill === "listening" ? "Listening" : "Full Test";
  }

  /* ---------------- Home ---------------- */
  function renderLevelRow() {
    const row = el("test-level-row");
    row.innerHTML = "";
    IELTS_LEVELS.forEach((lv) => {
      const btn = document.createElement("button");
      btn.className = "level-chip" + (state.level === lv.id ? " selected" : "");
      btn.textContent = lv.label;
      btn.addEventListener("click", () => {
        state.level = lv.id;
        renderLevelRow();
      });
      row.appendChild(btn);
    });
  }

  function renderSkillGrid() {
    const grid = el("test-skill-grid");
    grid.innerHTML = "";
    SKILLS.forEach((skill) => {
      const card = document.createElement("button");
      card.className = "skill-card" + (skill.available ? "" : " disabled");
      card.innerHTML = `
        ${skill.available ? "" : '<span class="badge soon">Bald verfügbar</span>'}
        <span class="emoji">${skill.emoji}</span>
        <span class="name">${skill.name}</span>
        <span class="desc">${skill.desc}</span>
      `;
      if (skill.available) {
        card.addEventListener("click", () => startPractice(skill.id, state.level));
      }
      grid.appendChild(card);
    });
  }

  async function renderResultsSummary() {
    const attempts = await DB.getAll("ieltsAttempts");
    const container = el("test-results-summary");
    if (!attempts.length) {
      container.innerHTML = `<div class="empty-state">Noch keine Testergebnisse. Starte deine erste Übung!</div>`;
      return;
    }
    const sorted = attempts.slice().sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5);
    container.innerHTML = sorted
      .map(
        (a) => `
      <div class="progress-item">
        <div class="progress-item-top">
          <span>${skillEmoji(a.mode)} ${skillLabel(a.mode)} · ${levelLabel(a.level)}</span>
          <span>Band ${a.overallBand != null ? a.overallBand.toFixed(1) : "–"}</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${((a.overallBand || 0) / 9) * 100}%"></div></div>
      </div>`
      )
      .join("");
  }

  function renderHome() {
    renderLevelRow();
    renderSkillGrid();
    renderResultsSummary();
  }

  el("btn-start-full-test").addEventListener("click", () => startFullTest(state.level));

  /* ---------------- Practice (Reading / Listening) ---------------- */
  function pickItem(skill, level) {
    const bank = skill === "reading" ? IELTS_READING : IELTS_LISTENING;
    const candidates = bank.filter((it) => it.level === level);
    return candidates[Math.floor(Math.random() * candidates.length)] || bank[0];
  }

  function beginQueue(queue, level, completedResults) {
    const [current, ...rest] = queue;
    state.session = {
      skill: current.skill,
      level,
      item: current.item,
      userAnswers: new Array(current.item.questions.length).fill(undefined),
      startTime: Date.now(),
      mode: queue.length > 1 || completedResults.length > 0 ? "full" : current.skill,
      remainingQueue: rest,
      completedResults,
      timer: null,
    };
    App.switchScreen("test-practice");
    renderPracticeScreen();
    startTimer();
  }

  function startPractice(skill, level) {
    beginQueue([{ skill, item: pickItem(skill, level) }], level, []);
  }

  function startFullTest(level) {
    const queue = [
      { skill: "reading", item: pickItem("reading", level) },
      { skill: "listening", item: pickItem("listening", level) },
    ];
    beginQueue(queue, level, []);
  }

  function startTimer() {
    const s = state.session;
    const fill = el("test-timer-fill");
    const text = el("test-timer-text");
    const total = s.item.timeLimitSec;
    s.timer = IeltsEngine.createTimer(
      total,
      (remaining) => {
        text.textContent = IeltsEngine.formatTime(remaining);
        fill.style.width = `${Math.max(0, (remaining / total) * 100)}%`;
      },
      () => submitPractice()
    );
    s.timer.start();
  }

  function stopTimerAndSpeech() {
    if (state.session && state.session.timer) state.session.timer.stop();
    Speech.stop();
  }

  function renderPracticeScreen() {
    const s = state.session;
    const item = s.item;

    el("test-practice-title").textContent = `${skillEmoji(s.skill)} ${skillLabel(s.skill)} · ${levelLabel(s.level)}`;
    el("test-passage-title").textContent = item.title;

    const listenBtn = el("btn-test-listen");
    const transcriptBtn = el("btn-test-toggle-transcript");
    const textEl = el("test-passage-text");

    if (s.skill === "reading") {
      listenBtn.classList.add("hidden");
      transcriptBtn.classList.add("hidden");
      textEl.textContent = item.text;
      textEl.classList.remove("hidden");
    } else {
      textEl.textContent = item.text;
      textEl.classList.add("hidden");
      transcriptBtn.textContent = "Transkript anzeigen";

      if (Speech.isSupported()) {
        listenBtn.classList.remove("hidden");
        listenBtn.onclick = () => Speech.speak(item.text);
      } else {
        listenBtn.classList.add("hidden");
      }
      transcriptBtn.classList.remove("hidden");
      transcriptBtn.onclick = () => {
        const nowHidden = textEl.classList.toggle("hidden");
        transcriptBtn.textContent = nowHidden ? "Transkript anzeigen" : "Transkript verbergen";
      };
    }

    const list = el("test-questions-list");
    list.innerHTML = "";
    item.questions.forEach((q, i) => list.appendChild(renderQuestionBlock(q, i)));

    el("btn-test-submit").textContent = s.remainingQueue.length > 0 ? "Weiter zum nächsten Teil" : "Abgeben";
  }

  function renderQuestionBlock(q, index) {
    const block = document.createElement("div");
    block.className = "test-question-block";

    const num = document.createElement("div");
    num.className = "test-question-num";
    num.textContent = `Frage ${index + 1}`;
    block.appendChild(num);

    const prompt = document.createElement("div");
    prompt.className = "test-question-prompt";
    prompt.textContent = q.prompt;
    block.appendChild(prompt);

    if (q.type === "mc" || q.type === "matching") {
      const opts = document.createElement("div");
      opts.className = "test-options";
      q.options.forEach((optText, i) => {
        const btn = document.createElement("button");
        btn.className = "test-option-btn";
        btn.textContent = optText;
        btn.addEventListener("click", () => {
          state.session.userAnswers[index] = i;
          opts.querySelectorAll(".test-option-btn").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        });
        opts.appendChild(btn);
      });
      block.appendChild(opts);
    } else if (q.type === "tfng") {
      const row = document.createElement("div");
      row.className = "test-tfng-row";
      [
        ["true", "True"],
        ["false", "False"],
        ["not_given", "Not Given"],
      ].forEach(([value, label]) => {
        const btn = document.createElement("button");
        btn.className = "test-option-btn";
        btn.textContent = label;
        btn.addEventListener("click", () => {
          state.session.userAnswers[index] = value;
          row.querySelectorAll(".test-option-btn").forEach((b) => b.classList.remove("selected"));
          btn.classList.add("selected");
        });
        row.appendChild(btn);
      });
      block.appendChild(row);
    } else if (q.type === "gap") {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "test-gap-input";
      input.placeholder = "Deine Antwort";
      input.addEventListener("input", (e) => {
        state.session.userAnswers[index] = e.target.value;
      });
      block.appendChild(input);
      const hint = document.createElement("div");
      hint.className = "test-gap-hint";
      hint.textContent = "Ein bis zwei Wörter aus dem Text.";
      block.appendChild(hint);
    }

    return block;
  }

  el("btn-test-exit").addEventListener("click", () => {
    if (confirm("Übung wirklich abbrechen?")) {
      stopTimerAndSpeech();
      state.session = null;
      App.switchScreen("test-home");
    }
  });

  el("btn-test-submit").addEventListener("click", () => submitPractice());

  async function submitPractice() {
    const s = state.session;
    if (!s) return;
    stopTimerAndSpeech();

    const result = IeltsEngine.scoreAttempt(s.item.questions, s.userAnswers);
    const completed = [...s.completedResults, { skill: s.skill, item: s.item, result, durationMs: Date.now() - s.startTime }];

    if (s.remainingQueue.length > 0) {
      beginQueue(s.remainingQueue, s.level, completed);
      return;
    }

    const attempt = await saveAttempt(s.mode, s.level, completed);
    await renderResultScreen(completed, s.mode, s.level, attempt.overallBand);
  }

  /* ---------------- Result ---------------- */
  async function saveAttempt(mode, level, completed) {
    const bands = completed.map((c) => c.result.band);
    const overallBand = IeltsEngine.overallBand(bands);
    const skillScores = {};
    completed.forEach((c) => {
      skillScores[c.skill] = c.result.band;
    });
    const durationMs = completed.reduce((sum, c) => sum + (c.durationMs || 0), 0);

    const combinedByType = combineByType(completed);
    const analysis = IeltsEngine.analyzeByType(combinedByType);

    const attempt = {
      id: `ielts-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      mode,
      level,
      skillScores,
      overallBand,
      strengths: analysis.strongest ? analysis.strongest.label : null,
      weaknesses: analysis.weakest ? analysis.weakest.label : null,
      durationMs,
    };
    await DB.put("ieltsAttempts", attempt);
    return attempt;
  }

  function combineByType(completed) {
    const combined = {};
    completed.forEach((c) => {
      Object.entries(c.result.byType).forEach(([type, v]) => {
        combined[type] = combined[type] || { correct: 0, total: 0 };
        combined[type].correct += v.correct;
        combined[type].total += v.total;
      });
    });
    return combined;
  }

  function suggestNextLevel(level, avgBand) {
    const idx = IELTS_LEVELS.findIndex((l) => l.id === level);
    if (avgBand >= 7.5 && idx < IELTS_LEVELS.length - 1) {
      return `Starke Leistung! Versuche als Nächstes das Niveau „${IELTS_LEVELS[idx + 1].label}".`;
    }
    if (avgBand < 5 && idx > 0) {
      return `Übe erstmal noch etwas auf Niveau „${IELTS_LEVELS[idx - 1].label}", um die Grundlagen zu festigen.`;
    }
    return null;
  }

  async function renderRecommendations(completed, analysis, level, overallBand) {
    const items = [];

    if (analysis.weakest && analysis.weakest.total > 0 && analysis.weakest.rate < 1) {
      items.push(
        `Übe gezielt mehr Aufgaben vom Typ „${analysis.weakest.label}" – hier war deine Erfolgsquote mit ${Math.round(analysis.weakest.rate * 100)}% am niedrigsten.`
      );
    }

    if (completed.length > 1) {
      const sorted = completed.slice().sort((a, b) => a.result.band - b.result.band);
      const weakest = sorted[0];
      const strongest = sorted[sorted.length - 1];
      if (weakest.skill !== strongest.skill && weakest.result.band !== strongest.result.band) {
        items.push(
          `Dein ${skillLabel(weakest.skill)}-Ergebnis (Band ${weakest.result.band.toFixed(1)}) war schwächer als dein ${skillLabel(strongest.skill)}-Ergebnis (Band ${strongest.result.band.toFixed(1)}) – hier lohnt sich gezieltes Üben.`
        );
      }
    }

    const nextLevelTip = suggestNextLevel(level, overallBand != null ? overallBand : 0);
    if (nextLevelTip) items.push(nextLevelTip);

    try {
      const cards = await DB.getAll("cards");
      const difficult = Review.getDifficultCards(cards, { minAttempts: 3 });
      if (difficult.length > 0) {
        const groups = Review.groupByCategory(difficult);
        const catId = Object.keys(groups)[0];
        const categories = await Categories.all();
        const catInfo = categories.find((c) => c.id === catId);
        const catLabel = catInfo ? `${catInfo.emoji} ${catInfo.name}` : catId;
        items.push(
          `Du hast auch bei Vokabeln der Kategorie „${catLabel}" Nachholbedarf. Ein Blick in „🧠 Schwierig" könnte dein Reading/Listening zusätzlich verbessern.`
        );
      }
    } catch (err) {
      /* Vokabel-Empfehlung ist optional — Testergebnis funktioniert auch ohne */
    }

    const container = el("test-recommendations");
    container.innerHTML =
      items.map((text) => `<div class="recommendation-item">💡 ${text}</div>`).join("") ||
      `<div class="empty-state">Weiter so! Aktuell keine besonderen Schwächen erkennbar.</div>`;
  }

  async function renderResultScreen(completed, mode, level, overallBand) {
    el("test-overall-band").textContent = overallBand != null ? overallBand.toFixed(1) : "–";
    el("test-result-emoji").textContent = overallBand >= 7 ? "🎉" : overallBand >= 5.5 ? "👍" : "💪";
    el("test-result-title").textContent = mode === "full" ? "Full IELTS Test — Ergebnis" : `${skillLabel(completed[0].skill)} — Ergebnis`;

    el("test-skill-breakdown").innerHTML = completed
      .map(
        (c) => `
      <div class="progress-item">
        <div class="progress-item-top"><span>${skillEmoji(c.skill)} ${skillLabel(c.skill)}</span><span>Band ${c.result.band.toFixed(1)} · ${c.result.correct}/${c.result.total} richtig</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${c.result.percent}%"></div></div>
      </div>`
      )
      .join("");

    const combinedByType = combineByType(completed);
    const analysis = IeltsEngine.analyzeByType(combinedByType);
    el("test-strengths-weaknesses").innerHTML = `
      <div class="sw-block"><div class="sw-label">Stärke</div><div class="sw-value">${analysis.strongest ? `${analysis.strongest.label} (${Math.round(analysis.strongest.rate * 100)}%)` : "–"}</div></div>
      <div class="sw-block"><div class="sw-label">Schwäche</div><div class="sw-value">${analysis.weakest ? `${analysis.weakest.label} (${Math.round(analysis.weakest.rate * 100)}%)` : "–"}</div></div>
    `;

    await renderRecommendations(completed, analysis, level, overallBand);

    state.session = null;
    App.switchScreen("test-result");
  }

  el("btn-test-result-home").addEventListener("click", () => App.switchScreen("test-home"));

  return { renderHome };
})();
