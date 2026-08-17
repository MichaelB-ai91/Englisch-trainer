/* app.js — Screen-Steuerung und Verbindung von UI, Datenbank und Lernlogik. */

const App = (() => {
  const state = {
    allCards: [],
    allCategories: [],
    selectedCategories: new Set(["__all__"]),
    questionCount: 20,
    session: null, // { questions, index, answers, startTime, source }
  };

  const el = (id) => document.getElementById(id);

  function todayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function todayLabel() {
    return new Date().toLocaleDateString("de-DE", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
  }

  /* ---------------- Screen switching ---------------- */
  function switchScreen(name) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.add("hidden"));
    el(`screen-${name}`).classList.remove("hidden");
    if (name === "home") renderHome();
    if (name === "stats") renderStats();
    if (name === "difficult") renderDifficult();
    if (name === "manage") renderManage();
    if (name === "test-home") IeltsApp.renderHome();
    window.scrollTo(0, 0);
  }

  document.addEventListener("click", (e) => {
    const tabBtn = e.target.closest(".tab-btn");
    if (tabBtn) switchScreen(tabBtn.dataset.tab);
  });

  /* ---------------- Data loading ---------------- */
  async function reloadData() {
    const [cards, categories] = await Promise.all([DB.getAll("cards"), Categories.all()]);
    state.allCards = cards;
    state.allCategories = categories;
  }

  /* ---------------- Home screen ---------------- */
  function getSelectedCategoryIds() {
    if (state.selectedCategories.has("__all__")) {
      return state.allCategories.map((c) => c.id);
    }
    return Array.from(state.selectedCategories);
  }

  function renderCategoryGrid() {
    const grid = el("category-grid");
    grid.innerHTML = "";

    state.allCategories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "category-chip";
      btn.dataset.cat = cat.id;
      if (state.selectedCategories.has(cat.id)) btn.classList.add("selected");
      btn.innerHTML = `<span class="emoji">${cat.emoji}</span><span>${cat.name}</span>`;
      btn.addEventListener("click", () => {
        state.selectedCategories.delete("__all__");
        if (state.selectedCategories.has(cat.id)) {
          state.selectedCategories.delete(cat.id);
        } else {
          state.selectedCategories.add(cat.id);
        }
        if (state.selectedCategories.size === 0) state.selectedCategories.add("__all__");
        renderCategoryGrid();
      });
      grid.appendChild(btn);
    });

    const allBtn = document.createElement("button");
    allBtn.className = "category-chip all-cats";
    if (state.selectedCategories.has("__all__")) allBtn.classList.add("selected");
    allBtn.innerHTML = `<span class="emoji">📚</span><span>Alle Kategorien</span>`;
    allBtn.addEventListener("click", () => {
      state.selectedCategories = new Set(["__all__"]);
      renderCategoryGrid();
    });
    grid.appendChild(allBtn);
  }

  function renderCountRow() {
    document.querySelectorAll(".count-chip[data-count]").forEach((chip) => {
      const isCustom = chip.dataset.count === "custom";
      const active = isCustom
        ? !["10", "20", "30", "50"].includes(String(state.questionCount))
        : Number(chip.dataset.count) === state.questionCount;
      chip.classList.toggle("selected", active);
    });
  }

  function wireCountRow() {
    document.querySelectorAll(".count-chip[data-count]").forEach((chip) => {
      chip.addEventListener("click", () => {
        if (chip.dataset.count === "custom") {
          el("count-custom-input").classList.remove("hidden");
          el("count-custom-input").focus();
          if (el("count-custom-input").value) state.questionCount = Number(el("count-custom-input").value);
        } else {
          el("count-custom-input").classList.add("hidden");
          state.questionCount = Number(chip.dataset.count);
        }
        renderCountRow();
      });
    });
    el("count-custom-input").addEventListener("input", (e) => {
      const v = Math.max(1, Math.min(500, Number(e.target.value) || 1));
      state.questionCount = v;
      renderCountRow();
    });
  }

  async function renderDailyCard() {
    const key = todayKey();
    const round = await DB.get("dailyRounds", key);
    el("daily-title").textContent = todayLabel();
    if (round && round.completed) {
      el("daily-sub").textContent = `Heute bereits erledigt: ${round.correct}/${round.total} richtig ✓`;
      el("btn-start-daily").textContent = "Nochmal üben";
    } else {
      const count = (round && round.total) || 20;
      el("daily-sub").textContent = `${count} Fragen`;
      el("btn-start-daily").textContent = "Tagesrunde starten";
    }
  }

  function renderHome() {
    el("home-date").textContent = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
    renderCategoryGrid();
    renderCountRow();
    renderDailyCard();
  }

  el("btn-start-round").addEventListener("click", async () => {
    const catIds = getSelectedCategoryIds();
    if (catIds.length === 0) return;
    const pool = state.allCards.filter((c) => catIds.includes(c.category));
    if (pool.length === 0) return;
    await DB.put("settings", { key: "lastCategories", value: catIds });
    await DB.put("settings", { key: "lastCount", value: state.questionCount });
    const questions = Quiz.buildRound(pool, state.questionCount, (p, n) => Review.pickWeighted(p, n));
    startSession(questions, "custom");
  });

  el("btn-start-daily").addEventListener("click", async () => {
    const key = todayKey();
    const lastCatSetting = await DB.get("settings", "lastCategories");
    const lastCountSetting = await DB.get("settings", "lastCount");
    const catIds = (lastCatSetting && lastCatSetting.value) || state.allCategories.map((c) => c.id);
    const count = (lastCountSetting && lastCountSetting.value) || 20;
    const pool = state.allCards.filter((c) => catIds.includes(c.category));
    const questions = Quiz.buildRound(pool, count, (p, n) => Review.pickWeighted(p, n));
    await DB.put("dailyRounds", {
      date: key,
      categoryIds: catIds,
      cardIds: questions.map((q) => q.cardId),
      total: questions.length,
      correct: 0,
      wrong: 0,
      completed: false,
    });
    startSession(questions, "daily");
  });

  /* ---------------- Quiz screen ---------------- */
  function categoryLabel(catId) {
    const cat = state.allCategories.find((c) => c.id === catId);
    return cat ? `${cat.emoji} ${cat.name}` : catId;
  }

  function startSession(questions, source) {
    state.session = { questions, index: 0, answers: [], startTime: Date.now(), source, answered: false };
    switchScreen("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const s = state.session;
    const q = s.questions[s.index];
    s.answered = false;

    el("quiz-progress-text").textContent = `Frage ${s.index + 1} / ${s.questions.length}`;
    el("quiz-progress-fill").style.width = `${(s.index / s.questions.length) * 100}%`;
    el("quiz-score").textContent = `✓ ${s.answers.filter((a) => a.correct).length}`;
    el("quiz-category-tag").textContent = categoryLabel(q.category);
    el("quiz-question").textContent = q.prompt;

    const buttons = document.querySelectorAll("#quiz-answers .answer-btn");
    buttons.forEach((btn, i) => {
      btn.className = "answer-btn";
      btn.querySelector(".answer-letter").textContent = "ABCD"[i];
      btn.querySelector(".answer-text").textContent = q.options[i];
    });

    el("quiz-feedback").classList.add("hidden");
    el("feedback-correct-answer").classList.add("hidden");
    el("btn-quiz-next").classList.add("hidden");
  }

  document.querySelectorAll("#quiz-answers .answer-btn").forEach((btn) => {
    btn.addEventListener("click", () => handleAnswer(Number(btn.dataset.idx)));
  });

  function handleAnswer(idx) {
    const s = state.session;
    if (s.answered) return;
    s.answered = true;

    const q = s.questions[s.index];
    const correct = idx === q.correctIndex;
    const card = state.allCards.find((c) => c.id === q.cardId);

    Review.recordAnswer(card, correct);
    DB.put("cards", card);

    s.answers.push({ card, correct });

    const buttons = document.querySelectorAll("#quiz-answers .answer-btn");
    buttons.forEach((btn, i) => {
      btn.classList.add("disabled");
      if (i === q.correctIndex) btn.classList.add("correct");
      else if (i === idx) btn.classList.add("wrong");
      else btn.classList.add("dim");
    });

    const feedback = el("quiz-feedback");
    const feedbackText = el("feedback-text");
    feedback.classList.remove("hidden");
    if (correct) {
      feedbackText.textContent = "✓ Richtig!";
      feedbackText.className = "feedback-text is-correct";
      el("feedback-correct-answer").classList.add("hidden");
    } else {
      feedbackText.textContent = "✗ Leider falsch.";
      feedbackText.className = "feedback-text is-wrong";
      el("feedback-correct-answer").textContent = `Richtig: ${q.correctText}`;
      el("feedback-correct-answer").classList.remove("hidden");
    }

    el("quiz-score").textContent = `✓ ${s.answers.filter((a) => a.correct).length}`;
    el("quiz-progress-fill").style.width = `${((s.index + 1) / s.questions.length) * 100}%`;
    el("btn-quiz-next").classList.remove("hidden");
  }

  el("btn-quiz-next").addEventListener("click", () => {
    const s = state.session;
    s.index++;
    if (s.index >= s.questions.length) {
      finishRound();
    } else {
      renderQuestion();
    }
  });

  el("btn-quiz-exit").addEventListener("click", () => {
    if (confirm("Lernrunde wirklich abbrechen?")) {
      switchScreen("home");
    }
  });

  async function finishRound() {
    const s = state.session;
    const summary = Stats.summarizeRound(s.answers);
    const timeMs = Date.now() - s.startTime;

    if (s.source === "daily") {
      const key = todayKey();
      const round = await DB.get("dailyRounds", key);
      if (round) {
        round.correct = summary.correct;
        round.wrong = summary.wrong;
        round.completed = true;
        await DB.put("dailyRounds", round);
      }
    }

    const difficultNow = Review.getDifficultCards(state.allCards, { minAttempts: 3 });

    el("result-emoji").textContent = summary.percent >= 80 ? "🎉" : summary.percent >= 50 ? "👍" : "💪";
    el("result-count").textContent = `${summary.total} Fragen`;
    el("result-correct").textContent = summary.correct;
    el("result-wrong").textContent = summary.wrong;
    el("result-percent").textContent = `${summary.percent} % richtig`;
    el("result-time").textContent = Stats.formatDuration(timeMs);
    el("result-words").textContent = summary.total;
    el("result-hard").textContent = difficultNow.length;
    el("result-best").textContent = summary.best ? categoryLabel(summary.best.category) : "–";
    el("result-worst").textContent = summary.worst ? categoryLabel(summary.worst.category) : "–";

    switchScreen("result");
  }

  el("btn-result-home").addEventListener("click", () => switchScreen("home"));

  /* ---------------- Stats screen ---------------- */
  async function renderStats() {
    const overall = await Stats.overallSummary();
    el("stats-summary").innerHTML = `
      <div class="stat-tile"><strong>${overall.cardsLearned}/${overall.totalCards}</strong><span>Karten gelernt</span></div>
      <div class="stat-tile"><strong>${overall.overallPercent}%</strong><span>Erfolgsquote</span></div>
      <div class="stat-tile"><strong>${overall.difficultCount}</strong><span>Schwierig</span></div>
    `;

    const progress = await Stats.categoryProgress(state.allCategories);
    el("progress-list").innerHTML = progress
      .map(
        (p) => `
      <div class="progress-item">
        <div class="progress-item-top"><span>${p.category.emoji} ${p.category.name}</span><span>${p.percent === null ? "–" : p.percent + "%"}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${p.percent || 0}%"></div></div>
      </div>`
      )
      .join("");
  }

  /* ---------------- Difficult words screen ---------------- */
  let difficultCardsCache = [];

  async function renderDifficult() {
    const cards = await DB.getAll("cards");
    state.allCards = cards;
    const difficult = Review.getDifficultCards(cards, { minAttempts: 3 });
    difficultCardsCache = difficult;

    const listEl = el("difficult-list");
    const learnBtn = el("btn-learn-difficult");

    if (difficult.length === 0) {
      listEl.innerHTML = `<div class="empty-state">Noch keine schwierigen Wörter erkannt.<br>Lerne weiter, dann erscheinen hier deine Fehlerschwerpunkte.</div>`;
      learnBtn.classList.add("hidden");
      return;
    }

    const groups = Review.groupByCategory(difficult);
    listEl.innerHTML = Object.entries(groups)
      .map(([catId, cards]) => {
        const cat = state.allCategories.find((c) => c.id === catId);
        const label = cat ? `${cat.emoji} ${cat.name}` : catId;
        const items = cards
          .map(
            (c) => `
          <div class="difficult-item">
            <div><div class="en">${c.en}</div><div class="de">${c.de}</div></div>
            <div class="rate">${Math.round(c.successRate * 100)}%</div>
          </div>`
          )
          .join("");
        return `<div class="difficult-category-block"><div class="difficult-category-title">${label}</div>${items}</div>`;
      })
      .join("");
    learnBtn.classList.remove("hidden");
  }

  el("btn-learn-difficult").addEventListener("click", () => {
    if (difficultCardsCache.length === 0) return;
    const forceCards = () => difficultCardsCache;
    const questions = Quiz.buildRound(state.allCards, difficultCardsCache.length, forceCards);
    startSession(questions, "review");
  });

  /* ---------------- Manage screen ---------------- */
  async function renderManage() {
    const listEl = el("manage-category-list");
    listEl.innerHTML = "";
    for (const cat of state.allCategories) {
      const count = await Categories.cardCount(cat.id);
      const row = document.createElement("div");
      row.className = "manage-list-item";
      row.innerHTML = `
        <div><span class="name">${cat.emoji} ${cat.name}</span> <span class="count">(${count} Karten)</span></div>
        <button class="del-btn" data-id="${cat.id}">✕</button>
      `;
      row.querySelector(".del-btn").addEventListener("click", async () => {
        try {
          await Categories.remove(cat.id);
          await reloadData();
          renderManage();
        } catch (err) {
          alert(err.message);
        }
      });
      listEl.appendChild(row);
    }

    const select = el("input-category");
    select.innerHTML = state.allCategories.map((c) => `<option value="${c.id}">${c.emoji} ${c.name}</option>`).join("");
  }

  el("btn-add-category").addEventListener("click", async () => {
    const name = prompt("Name der neuen Kategorie:");
    if (!name || !name.trim()) return;
    const emoji = prompt("Emoji für diese Kategorie (optional):", "📁") || "📁";
    try {
      await Categories.create(name, emoji);
      await reloadData();
      renderManage();
      renderHome();
    } catch (err) {
      alert(err.message);
    }
  });

  el("form-add-card").addEventListener("submit", async (e) => {
    e.preventDefault();
    const en = el("input-en").value.trim();
    const de = el("input-de").value.trim();
    const category = el("input-category").value;
    const type = el("input-type").value;
    const difficulty = el("input-difficulty").value;
    if (!en || !de || !category) return;

    const card = {
      id: `${category}-custom-${Date.now()}`,
      en,
      de,
      category,
      type,
      difficulty,
      timesAsked: 0,
      timesCorrect: 0,
      timesWrong: 0,
      successRate: null,
      lastAsked: null,
      lastWrong: null,
    };
    await DB.put("cards", card);
    state.allCards.push(card);

    e.target.reset();
    const fb = el("manage-feedback");
    fb.textContent = `✓ Karte "${en}" gespeichert.`;
    fb.classList.remove("hidden");
    setTimeout(() => fb.classList.add("hidden"), 2500);
  });

  /* ---------------- Init ---------------- */
  async function init() {
    await Seed.run();
    await reloadData();
    wireCountRow();
    switchScreen("home");
    el("loading-overlay").classList.add("hidden");

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js").catch(() => {});
    }
  }

  return { init, switchScreen };
})();

document.addEventListener("DOMContentLoaded", () => App.init());
