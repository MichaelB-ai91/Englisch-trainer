/* seed.js — Erstbefüllung der Datenbank beim allerersten Start.
   RAW_CARDS kommt aus js/data/cards.js als kompaktes Tupel-Array:
   [en, de, categoryId, type, difficulty]  (type: "w"=word/phrase, "s"=sentence/frage/satz)
   (difficulty: "e"=easy, "m"=medium, "h"=hard) */

const TYPE_MAP = { w: "word", s: "sentence" };
const DIFF_MAP = { e: "easy", m: "medium", h: "hard" };

function buildCardRecord(raw, categoryIndex) {
  const [en, de, category, type, diff] = raw;
  return {
    id: `${category}-${categoryIndex}`,
    en,
    de,
    category,
    type: TYPE_MAP[type] || "word",
    difficulty: DIFF_MAP[diff] || "medium",
    timesAsked: 0,
    timesCorrect: 0,
    timesWrong: 0,
    successRate: null,
    lastAsked: null,
    lastWrong: null,
  };
}

const Seed = {
  async run() {
    const [categoryCount, cardCount] = await Promise.all([
      DB.count("categories"),
      DB.count("cards"),
    ]);

    if (categoryCount === 0) {
      await DB.putAll("categories", DEFAULT_CATEGORIES);
    }

    if (cardCount === 0 && typeof RAW_CARDS !== "undefined") {
      const categoryCounters = {};
      const records = RAW_CARDS.map((raw) => {
        const category = raw[2];
        const idx = categoryCounters[category] || 0;
        categoryCounters[category] = idx + 1;
        return buildCardRecord(raw, idx);
      });
      await DB.putAll("cards", records);
    }
  },
};
