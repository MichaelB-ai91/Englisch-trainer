/* speech.js — kleiner Wrapper um die Web Speech API (speechSynthesis).
   Wird für die IELTS-Listening-Übungen verwendet (Skript wird per Sprachausgabe
   vorgelesen statt echter Audiodatei). Läuft komplett offline im Browser. */

const Speech = (() => {
  let voicesReady = false;
  let cachedVoice = null;

  function isSupported() {
    return "speechSynthesis" in window;
  }

  function pickEnglishVoice() {
    if (!isSupported()) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;
    return (
      voices.find((v) => v.lang === "en-US") ||
      voices.find((v) => v.lang && v.lang.startsWith("en")) ||
      voices[0]
    );
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
