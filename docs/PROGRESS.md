# Entwicklungsprotokoll

## Schritt 1 — Projektgerüst
**Dateien:** `index.html`, `manifest.json`, `service-worker.js`, `css/style.css`, `icons/*.png`, `icons/generate_icons.py`
App-Shell mit PWA-Manifest und Offline-Caching angelegt. Icons (192/512/Apple-Touch/Favicon)
per Python/Pillow generiert, da kein Bildbearbeitungsprogramm nötig sein sollte.

## Schritt 2 — Smartphone-Oberfläche
**Dateien:** `index.html`, `css/style.css`
Alle Screens umgesetzt: Startseite, Lernbildschirm, Ergebnis, Fortschritt/Statistik,
schwierige Wörter, Verwalten. Mobile-first, Touch-Ziele ≥ 44 px, feste Bottom-Tabbar
für die Hauptbereiche.

## Schritt 3 — Datenbank
**Dateien:** `js/db.js`, `js/seed.js`
IndexedDB-Wrapper mit den Object Stores `cards`, `categories`, `settings`, `dailyRounds`.
`seed.js` befüllt die Datenbank beim allerersten Start automatisch.

## Schritt 4 — Kategorien-System
**Dateien:** `js/categories.js`
Kategorien werden aus der DB geladen (nicht hartkodiert). CRUD-Funktionen inklusive
Schutz vor dem Löschen von Kategorien, die noch Lernkarten enthalten.

## Schritt 5 — 1.000 Lernkarten
**Dateien:** `js/data/cards.js`
1.000 Einträge, verteilt wie vorgegeben: Alltag 200, Auto 150, Küche/Essen 150,
Landwirtschaft 150, Werkzeuge/Technik 100, Reisen 100, Haushalt 75, Arbeit 75.
Mischung aus Einzelvokabeln, Verben, Adjektiven, Redewendungen, Fragen, Antworten und
ganzen Alltagssätzen. Verteilung und Struktur wurden per Skript validiert
(0 Duplikate, korrekte Kategorie-Zählung, gültige Typ-/Schwierigkeitscodes).

## Schritt 6 — Multiple-Choice-Engine
**Dateien:** `js/quiz.js`
4 Fragetypen (EN→DE, DE→EN, EN-Satz→DE, DE-Satz→EN). Distraktoren werden zur Laufzeit
aus Karten derselben Kategorie gezogen statt fest gespeichert zu sein.

## Schritt 7 — Zufällige Fragen & A/B/C/D-Balance
**Dateien:** `js/quiz.js`
Zufällige Kartenauswahl je Runde, zufällige Antwortreihenfolge, mit Ausgleichs-Logik
(`createPositionBalancer`), damit die richtige Antwort nicht immer an derselben Position steht.

## Schritt 8 — Tagesrunde
**Dateien:** `js/app.js` (Store `dailyRounds` in `js/db.js`)
Beim Öffnen der App wird automatisch eine Tagesrunde für das aktuelle Datum vorbereitet.
Die Fragen werden bei jedem Start neu zufällig zusammengestellt (keine feste Fragenliste).

## Schritt 9 — Lernstatistik
**Dateien:** `js/stats.js`, `js/app.js`
Auswertung nach jeder Runde: richtig/falsch, Prozent, Lernzeit, gelernte Wörter,
beste/schwächste Kategorie der Runde.

## Schritt 10 — Schwierige Wörter
**Dateien:** `js/review.js`
Gewichtete Zufallsauswahl auf Basis von Erfolgsquote und letztem Fehler. Screen
"Meine schwierigen Wörter" mit Kategorien-Gruppierung und gezieltem Übungsmodus.

## Schritt 11 — Kategorie-Fortschritt
**Dateien:** `js/stats.js`, `js/app.js`
Fortschrittsbalken je Kategorie auf Basis der kumulierten Karten-Statistiken.

## Schritt 12 — Testen
Vollständiger Funktionstest im mobilen Viewport (375×812) über einen lokalen Test-Server:
Kategorie-Einzel- und Mehrfachauswahl, eigene Fragenanzahl, alle 4 Fragetypen, Distraktor-
Plausibilität, A/B/C/D-Verteilung, Tagesrunde inkl. Persistenz, Statistik-Berechnung,
schwierige-Wörter-Erkennung, Kategorie-/Karten-Verwaltung, Touch-Ziel-Größen, kein
horizontales Scrollen. Dabei wurde ein Bug in `seed.js` gefunden und behoben (Karten-IDs
nutzten einen globalen statt einen kategorie-eigenen Zähler — rein kosmetisch, aber
für die spätere Wartung wichtig).

## Schritt 13 — Bereitstellung fürs Handy
**Dateien:** `docs/DEPLOYMENT.md`
Optionen für die dauerhafte Installation auf dem Smartphone dokumentiert (lokal testen
vs. dauerhaftes HTTPS-Hosting, das für Service Worker/Installierbarkeit nötig ist).
