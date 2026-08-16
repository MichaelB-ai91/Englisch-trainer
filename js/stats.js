/* stats.js — Auswertung von Lernrunden, Tagesstatistik und Kategorie-Fortschritt. */

const Stats = (() => {
  function summarizeRound(sessionAnswers) {
    const total = sessionAnswers.length;
    const correct = sessionAnswers.filter((a) => a.correct).length;
    const wrong = total - correct;
    const percent = total ? Math.round((correct / total) * 100) : 0;

    const byCat = {};
    sessionAnswers.forEach((a) => {
      const cat = a.card.category;
      byCat[cat] = byCat[cat] || { correct: 0, total: 0 };
      byCat[cat].total++;
      if (a.correct) byCat[cat].correct++;
    });

    let best = null;
    let worst = null;
    Object.entries(byCat).forEach(([cat, v]) => {
      const rate = v.correct / v.total;
      if (!best || rate > best.rate) best = { category: cat, rate };
      if (!worst || rate < worst.rate) worst = { category: cat, rate };
    });

    return { total, correct, wrong, percent, byCat, best, worst };
  }

  function formatDuration(ms) {
    const totalSec = Math.round(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    if (min === 0) return `${sec}s`;
    return `${min} Min ${sec.toString().padStart(2, "0")}s`;
  }

  async function categoryProgress(categories) {
    const allCards = await DB.getAll("cards");
    return categories.map((cat) => {
      const cards = allCards.filter((c) => c.category === cat.id);
      const attempted = cards.filter((c) => c.timesAsked > 0);
      const totalAsked = attempted.reduce((s, c) => s + c.timesAsked, 0);
      const totalCorrect = attempted.reduce((s, c) => s + c.timesCorrect, 0);
      const percent = totalAsked ? Math.round((totalCorrect / totalAsked) * 100) : null;
      return { category: cat, percent, cardsLearned: attempted.length, totalCards: cards.length };
    });
  }

  async function overallSummary() {
    const allCards = await DB.getAll("cards");
    const attempted = allCards.filter((c) => c.timesAsked > 0);
    const totalAsked = attempted.reduce((s, c) => s + c.timesAsked, 0);
    const totalCorrect = attempted.reduce((s, c) => s + c.timesCorrect, 0);
    const percent = totalAsked ? Math.round((totalCorrect / totalAsked) * 100) : 0;
    const difficult = Review.getDifficultCards(allCards, { minAttempts: 3 });
    return {
      totalCards: allCards.length,
      cardsLearned: attempted.length,
      overallPercent: percent,
      difficultCount: difficult.length,
    };
  }

  return { summarizeRound, formatDuration, categoryProgress, overallSummary };
})();
