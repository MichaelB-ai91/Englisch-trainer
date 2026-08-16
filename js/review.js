/* review.js — einfaches Wiederholungssystem ("schwierige Wörter").
   Keine volle Spaced-Repetition (SM-2), aber die Architektur (Gewichtsfunktion)
   lässt sich später problemlos dazu ausbauen (siehe Spezifikationspunkt 22). */

const Review = (() => {
  function computeWeight(card) {
    if (!card.timesAsked) return 4; // neue Karten mittelhoch gewichten, damit sie vorkommen
    const rate = card.successRate ?? card.timesCorrect / card.timesAsked;
    let weight = 1 + (1 - rate) * 5; // 1 (perfekt) .. 6 (immer falsch)

    if (card.lastWrong) {
      const daysSince = (Date.now() - new Date(card.lastWrong).getTime()) / 86400000;
      if (daysSince < 2) weight += 3;
      else if (daysSince < 7) weight += 1;
    }
    return Math.max(0.5, weight);
  }

  /* gewichtete Zufallsauswahl ohne Zurücklegen */
  function pickWeighted(pool, count) {
    const items = pool.map((c) => ({ card: c, weight: computeWeight(c) }));
    const n = Math.min(count, pool.length);
    const chosen = [];

    for (let i = 0; i < n; i++) {
      const total = items.reduce((s, it) => s + it.weight, 0);
      let r = Math.random() * total;
      let idx = 0;
      for (; idx < items.length - 1; idx++) {
        r -= items[idx].weight;
        if (r <= 0) break;
      }
      chosen.push(items[idx].card);
      items.splice(idx, 1);
    }
    return chosen;
  }

  function recordAnswer(card, correct) {
    card.timesAsked = (card.timesAsked || 0) + 1;
    if (correct) {
      card.timesCorrect = (card.timesCorrect || 0) + 1;
    } else {
      card.timesWrong = (card.timesWrong || 0) + 1;
    }
    card.successRate = card.timesCorrect / card.timesAsked;
    const now = new Date().toISOString();
    card.lastAsked = now;
    if (!correct) card.lastWrong = now;
    return card;
  }

  function getDifficultCards(cards, { minAttempts = 3, threshold = 0.7, limit = 100 } = {}) {
    return cards
      .filter((c) => c.timesAsked >= minAttempts && c.successRate !== null && c.successRate < threshold)
      .sort((a, b) => a.successRate - b.successRate)
      .slice(0, limit);
  }

  function groupByCategory(cards) {
    const groups = {};
    cards.forEach((c) => {
      groups[c.category] = groups[c.category] || [];
      groups[c.category].push(c);
    });
    return groups;
  }

  return { computeWeight, pickWeighted, recordAnswer, getDifficultCards, groupByCategory };
})();
