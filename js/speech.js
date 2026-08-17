/* speech.js — kleiner Wrapper um die Web Speech API (speechSynthesis).
   Wird für die IELTS-Listening-Übungen verwendet (Skript wird per Sprachausgabe
   vorgelesen statt echter Audiodatei). Läuft komplett offline im Browser. */

const Speech = (() => {
  let voicesReady = false;
  let cachedVoice = null;

  function isSupported() {
    return "speechSynthesis" in window;
  }

  /* Die Web Speech API kennt kein offizielles "Geschlecht"-Attribut für Stimmen —
     daher wird anhand bekannter Stimmennamen geraten (funktioniert auf den meisten
     Windows-, Android- und iOS-Browsern zuverlässig, aber nicht garantiert überall). */
  const FEMALE_VOICE_HINTS = [
    "female", "zira", "samantha", "victoria", "karen", "moira", "tessa", "susan",
    "hazel", "aria", "jenny", "fiona", "kate", "serena", "allison", "ava", "emma",
    "salli", "joanna", "google us english", "google uk english female",
  ];
  const MALE_VOICE_HINTS = [
    "male", "david", "mark", "james", "daniel", "fred", "george", "alex",
    "tom", "guy", "ryan", "google uk english male",
  ];

  function pickEnglishVoice() {
    if (!isSupported()) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    const englishVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("en"));
    const pool = englishVoices.length ? englishVoices : voices;

    const femaleMatch = pool.find((v) => FEMALE_VOICE_HINTS.some((hint) => v.name.toLowerCase().includes(hint)));
    if (femaleMatch) return femaleMatch;

    const notObviouslyMale = pool.find((v) => !MALE_VOICE_HINTS.some((hint) => v.name.toLowerCase().includes(hint)));
    if (notObviouslyMale) return notObviouslyMale;

    return pool.find((v) => v.lang === "en-US") || pool[0];
  }

  if (isSupported()) {
    cachedVoice = pickEnglishVoice();
    if (!cachedVoice) {
      window.speechSynthesis.addEventListener("voiceschanged", () => {
        cachedVoice = pickEnglishVoice();
        voicesReady = true;
      });
    } else {
      voicesReady = true;
    }
  }

  function speak(text, onEnd) {
    if (!isSupported() || !text) {
      if (typeof onEnd === "function") onEnd();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    if (cachedVoice) utterance.voice = cachedVoice;
    utterance.rate = 0.95;
    if (typeof onEnd === "function") {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if (isSupported()) window.speechSynthesis.cancel();
  }

  return { isSupported, speak, stop };
})();
