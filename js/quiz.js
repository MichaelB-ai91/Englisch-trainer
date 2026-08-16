/* quiz.js — Multiple-Choice-Engine.
   - wählt Karten (gewichtet, siehe review.js) aus den gewünschten Kategorien
   - erzeugt für jede Karte eine von 4 Fragetypen
   - zieht plausible Distraktoren aus derselben Kategorie (keine fest gespeicherten Falschantworten)
   - mischt die Antwortreihenfolge und hält A/B/C/D über die Runde im Gleichgewicht */

const Quiz = (() => {
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickRandom(arr, n) {
    return shuffle(arr).slice(0, n);
  }

  /* Distraktoren: 3 zufällige andere Karten derselben Kategorie (gleicher Typ bevorzugt),
     damit die Falschantworten thematisch passen. Reicht die Kategorie nicht aus,
     wird mit Karten aus allen anderen ausgewählten Karten aufgefüllt. */
  function pickDistractors(card, pool) {
    const sameCategorySameType = pool.filter(
      (c) => c.id !== card.id && c.category === card.category && c.type === card.type
    );
    const sameCategory = pool.filter((c) => c.id !== card.id && c.category === card.category);
    const others = pool.filter((c) => c.id !== card.id);

    let candidates = sameCategorySameType.length >= 3 ? sameCategorySameType : sameCategory;
    if (candidates.length < 3) candidates = others;

    return pickRandom(candidates, 3);
  }

  /* Fragetyp anhand des Kartentyps:
     word/phrase -> Typ 1 (EN->DE) oder Typ 2 (DE->EN)
     sentence    -> Typ 3 (EN-Satz->DE) oder Typ 4 (DE-Satz->EN) */
  function pickQuestionType(card) {
    if (card.type === "sentence") {
      return Math.random() < 0.5 ? "en-sentence-de" : "de-sentence-en";
    }
    return Math.random() < 0.5 ? "en-de" : "de-en";
  }

  function buildPrompt(card, qType) {
    switch (qType) {
      case "en-de":
        return { prompt: `Was bedeutet „${card.en}“?`, tag: "Englisch → Deutsch" };
      case "de-en":
        return { prompt: `Was bedeutet „${card.de}“ auf Englisch?`, tag: "Deutsch → Englisch" };
      case "en-sentence-de":
        return { prompt: card.en, tag: "Englisch → Deutsch" };
      case "de-sentence-en":
        return { prompt: card.de, tag: "Deutsch → Englisch" };
      default:
        return { prompt: card.en, tag: "" };
    }
  }

  function answerLang(qType) {
    // "en-de" und "en-sentence-de" fragen nach der deutschen Antwort, sonst englisch
    return qType === "de-en" || qType === "de-sentence-en" ? "en" : "de";
  }

  /* A/B/C/D-Balance: verfolgt, wie oft die richtige Antwort bislang auf welcher
     Position lag, und bevorzugt die bisher am seltensten genutzte Position. */
  function createPositionBalancer() {
    const counts = [0, 0, 0, 0];
    return {
      nextPosition() {
        const min = Math.min(...counts);
        const candidates = [0, 1, 2, 3].filter((i) => counts[i] === min);
        const pos = candidates[Math.floor(Math.random() * candidates.length)];
        counts[pos]++;
        return pos;
      },
    };
  }

  function buildQuestion(card, pool, qType) {
    const type = qType || pickQuestionType(card);
    const { prompt, tag } = buildPrompt(card, type);
    const lang = answerLang(type);
    const distractors = pickDistractors(card, pool);
    const correctText = lang === "de" ? card.de : card.en;
    const wrongTexts = distractors.map((d) => (lang === "de" ? d.de : d.en));

    return {
      cardId: card.id,
      category: card.category,
      questionType: type,
      categoryTag: tag,
      prompt,
      correctText,
      options: [correctText, ...wrongTexts], // wird beim Zuweisen der Position gemischt
    };
  }

  /* Erzeugt eine vollständige Runde: wählt `count` Karten aus dem Pool (gewichtet
     nach Review.pickWeighted, falls vorhanden) und baut daraus Fragen mit
     ausbalancierter Antwortposition. */
  function buildRound(pool, count, weightFn) {
    const chosenCards =
      typeof weightFn === "function" ? weightFn(pool, count) : pickRandom(pool, Math.min(count, pool.length));

    const balancer = createPositionBalancer();

    return chosenCards.map((card) => {
      const q = buildQuestion(card, pool);
      const correctPos = balancer.nextPosition();
      const shuffledWrong = shuffle(q.options.slice(1));
      const finalOptions = new Array(4);
      finalOptions[correctPos] = q.correctText;
      let wi = 0;
      for (let i = 0; i < 4; i++) {
        if (i === correctPos) continue;
        finalOptions[i] = shuffledWrong[wi++];
      }
      return { ...q, options: finalOptions, correctIndex: correctPos };
    });
  }

  return { shuffle, pickRandom, pickDistractors, pickQuestionType, buildQuestion, buildRound, createPositionBalancer };
})();
