/* ielts-engine.js — Auswertung für den TEST-Bereich: Fragetyp-Prüfung, Timer,
   Score-zu-Band-Umrechnung (eigene Näherungstabelle, keine offizielle Cambridge-Tabelle),
   Stärken-/Schwächen-Analyse nach Fragetyp. */

const IeltsEngine = (() => {
  const TYPE_LABELS = {
    mc: "Multiple Choice",
    tfng: "Richtig/Falsch/Nicht angegeben",
    matching: "Überschriften zuordnen",
    gap: "Lückentext",
  };

  /* Eigene Näherungstabelle: Prozent richtig -> ungefährer IELTS-Band-Score.
     Bewusst KEINE Kopie der offiziellen Cambridge-Konvertierungstabelle. */
  const BAND_TABLE = [
    { min: 97, band: 9.0 },
    { min: 90, band: 8.5 },
    { min: 83, band: 8.0 },
    { min: 75, band: 7.5 },
    { min: 67, band: 7.0 },
    { min: 60, band: 6.5 },
    { min: 52, band: 6.0 },
    { min: 44, band: 5.5 },
    { min: 36, band: 5.0 },
    { min: 28, band: 4.5 },
    { min: 20, band: 4.0 },
    { min: 12, band: 3.5 },
    { min: 0, band: 3.0 },
  ];

  function normalizeText(s) {
    return String(s || "")
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:"'`]/g, "")
      .replace(/\s+/g, " ");
  }

  function checkAnswer(question, userAnswer) {
    switch (question.type) {
      case "mc":
      case "matching":
        return userAnswer === question.correctIndex;
      case "tfng":
        return userAnswer === question.correctAnswer;
      case "gap": {
        const accepted = [question.answer, ...(question.altAnswers || [])].map(normalizeText);
        return accepted.includes(normalizeText(userAnswer));
      }
      default:
        return false;
    }
  }

  function percentToBand(percent) {
    for (const row of BAND_TABLE) {
      if (percent >= row.min) return row.band;
    }
    return 3.0;
  }

  function scoreAttempt(questions, userAnswers) {
    const byType = {};
    let correct = 0;

    questions.forEach((q, i) => {
      const isCorrect = checkAnswer(q, userAnswers[i]);
      if (isCorrect) correct++;
      byType[q.type] = byType[q.type] || { correct: 0, total: 0 };
      byType[q.type].total++;
      if (isCorrect) byType[q.type].correct++;
    });

    const total = questions.length;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    const band = percentToBand(percent);

    return { correct, total, percent, band, byType };
  }

  function analyzeByType(byType) {
    const entries = Object.entries(byType).map(([type, v]) => ({
      type,
      label: TYPE_LABELS[type] || type,
      rate: v.total ? v.correct / v.total : 0,
      correct: v.correct,
      total: v.total,
    }));
    entries.sort((a, b) => b.rate - a.rate);
    return {
      strongest: entries[0] || null,
      weakest: entries[entries.length - 1] || null,
      entries,
    };
  }

  function overallBand(bands) {
    const valid = bands.filter((b) => typeof b === "number");
    if (!valid.length) return null;
    const avg = valid.reduce((s, b) => s + b, 0) / valid.length;
    return Math.round(avg * 2) / 2;
  }

  function formatTime(totalSeconds) {
    const s = Math.max(0, Math.round(totalSeconds));
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${String(sec).padStart(2, "0")}`;
  }

  /* Countdown-Timer: onTick(remainingSeconds) läuft jede Sekunde, onExpire() bei Ablauf. */
  function createTimer(seconds, onTick, onExpire) {
    let remaining = seconds;
    let intervalId = null;
    return {
      start() {
        onTick(remaining);
        intervalId = setInterval(() => {
          remaining -= 1;
          onTick(remaining);
          if (remaining <= 0) {
            clearInterval(intervalId);
            intervalId = null;
            onExpire();
          }
        }, 1000);
      },
      stop() {
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      },
      remaining() {
        return remaining;
      },
    };
  }

  return {
    TYPE_LABELS,
    normalizeText,
    checkAnswer,
    percentToBand,
    scoreAttempt,
    analyzeByType,
    overallBand,
    formatTime,
    createTimer,
  };
})();
