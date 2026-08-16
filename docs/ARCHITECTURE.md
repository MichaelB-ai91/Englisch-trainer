# Architektur

## Technologie

- **Sprache**: HTML, CSS, JavaScript (Vanilla, kein Framework, kein Build-Schritt)
- **Datenbank**: IndexedDB (lokal im Browser, kein Server)
- **Typ**: Progressive Web App (PWA) — installierbar über "Zum Startbildschirm hinzufügen",
  läuft danach offline dank Service Worker

Diese Wahl wurde getroffen, weil auf dem Entwicklungsrechner kein Node.js/npm installiert
war und die App bewusst einfach und ohne zusätzliche Build-Werkzeuge bleiben sollte.

## Ordnerstruktur

```
Englisch-Trainer/
  index.html            App-Shell mit allen Screens (per JS ein-/ausgeblendet)
  manifest.json          PWA-Manifest (Name, Icons, Startbildschirm-Verhalten)
  service-worker.js      Offline-Caching der App-Shell
  css/style.css          Gesamtes Styling (mobile-first)
  js/
    app.js                Screen-Steuerung, Event-Wiring, verbindet alle Module
    db.js                 IndexedDB-Wrapper (get/put/getAll/getByIndex/count/…)
    seed.js               Erstbefüllung der DB beim allerersten Start
    categories.js          Kategorie-CRUD, lädt/speichert Kategorien aus der DB
    quiz.js                Fragen-Generator: Fragetypen, Distraktor-Auswahl, Antwort-Shuffle
    stats.js               Auswertung: Rundenergebnis, Tagesstatistik, Kategorie-Fortschritt
    review.js              Gewichtung "schwierige Wörter" (einfaches Wiederholungssystem)
    data/cards.js           Rohdaten der 1.000 Start-Lernkarten
  icons/                  App-Icons (generiert mit generate_icons.py)
  docs/                   Diese Dokumentation
```

## Datenbankschema (IndexedDB `englischTrainerDB`)

### Object Store `cards`
```
{
  id: string,                // z. B. "auto-12" oder "auto-custom-1699999999999"
  en: string,                 // Englisch (Wort, Redewendung oder Satz)
  de: string,                 // deutsche Übersetzung
  category: string,           // Kategorie-ID (Fremdschlüssel auf "categories")
  type: "word" | "sentence",  // steuert die möglichen Fragetypen
  difficulty: "easy" | "medium" | "hard",
  timesAsked: number,
  timesCorrect: number,
  timesWrong: number,
  successRate: number | null, // timesCorrect / timesAsked
  lastAsked: string | null,   // ISO-Datum
  lastWrong: string | null,   // ISO-Datum
}
```

### Object Store `categories`
```
{ id: string, name: string, emoji: string, custom: boolean }
```
Wird aus der DB geladen, nicht im Code hartkodiert — neue Kategorien lassen sich jederzeit
über "Verwalten" anlegen.

### Object Store `settings`
Key-Value-Speicher, z. B. `lastCategories` und `lastCount` (merkt sich die zuletzt gewählte
Auswahl für die automatische Tagesrunde).

### Object Store `dailyRounds`
```
{ date: "YYYY-MM-DD", categoryIds: string[], cardIds: string[], total, correct, wrong, completed }
```

## Multiple-Choice-Logik (quiz.js)

- **Distraktoren** (falsche Antworten) werden nicht fest gespeichert, sondern zur Laufzeit
  aus bis zu 3 zufälligen anderen Karten **derselben Kategorie** gezogen. Das hält die
  Falschantworten thematisch plausibel (z. B. bei "brake" andere Auto-Teile) und funktioniert
  automatisch auch für neu hinzugefügte Karten.
- **Fragetypen**: Karten vom Typ `word` erzeugen Typ 1 (Englisch→Deutsch) oder Typ 2
  (Deutsch→Englisch); Karten vom Typ `sentence` erzeugen Typ 3 oder Typ 4 (Satzübersetzung
  in beide Richtungen). Die Wahl ist pro Frage zufällig.
- **A/B/C/D-Balance**: Ein `createPositionBalancer()` sorgt dafür, dass die richtige Antwort
  über eine Lernrunde hinweg möglichst gleichmäßig auf allen vier Positionen landet, statt
  z. B. immer bei B.

## Wiederholungssystem (review.js)

Kein vollständiges Spaced-Repetition-System (wie SM-2), sondern eine einfache
gewichtete Zufallsauswahl:

- Karten mit niedriger Erfolgsquote bekommen ein höheres Gewicht (erscheinen häufiger).
- Kürzlich falsch beantwortete Karten bekommen einen zusätzlichen Bonus.
- Noch nie abgefragte Karten bekommen ein mittleres Gewicht, damit auch sie vorkommen.

„Meine schwierigen Wörter" zeigt alle Karten mit mindestens 3 Abfragen und einer
Erfolgsquote unter 70 %, gruppiert nach Kategorie.

## Neue Kategorien / Lernkarten hinzufügen (für Entwickler)

- **Neue Start-Lernkarten**: in `js/data/cards.js` dem `RAW_CARDS`-Array neue Zeilen im Format
  `[en, de, categoryId, "w"|"s", "e"|"m"|"h"]` hinzufügen. Nur relevant für den *Startbestand*
  vor dem allerersten App-Start — danach werden neue Karten direkt in der DB über den
  "Verwalten"-Screen gespeichert.
- **Neue Kategorien im Code**: `DEFAULT_CATEGORIES` in `js/categories.js` erweitern (nur für
  den Startbestand — zur Laufzeit legt der Nutzer Kategorien selbst über die UI an).

## Spätere Erweiterungen (noch nicht umgesetzt, aber architektonisch vorbereitet)

Diese Punkte wurden bewusst nicht in Version 1 umgesetzt, passen aber ohne größere
Umbauten in die bestehende Struktur:

- 🔊 Aussprache (Web Speech API `speechSynthesis`, direkt im Browser, kein Server nötig)
- 🎤 Eigene Aussprache aufnehmen / Sprachprüfung
- ⭐ Favoriten, 📚 eigene Lernlisten
- 🧠 Vollständiges Spaced-Repetition-System (SM-2) — `review.js` kapselt die Gewichtung bereits
  isoliert, sodass sich die Formel austauschen lässt, ohne den Rest der App zu berühren
- 🏆 Lernserien/Streaks
- 🌙 Dark Mode (CSS-Variablen in `style.css` sind bereits zentral definiert)
- 📥 Import / 📤 Export der Datenbank als Datei (Backup)
