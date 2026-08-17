# English Trainer — Bedienungsanleitung

Eine kleine, moderne Englisch-Lern-App für dein Smartphone. Läuft komplett offline,
ohne Server, ohne Login, ohne Benutzerkonto.

## Was die App kann

- 1.000 Lernkarten (Vokabeln, Verben, Redewendungen, Sätze, Fragen, Antworten) in 8 Kategorien
- Multiple-Choice-Abfrage mit 4 Antwortmöglichkeiten
- 4 Fragetypen: Englisch→Deutsch, Deutsch→Englisch, englischer Satz→Deutsch, deutscher Satz→Englisch
- Eine oder mehrere Kategorien wählbar, oder "Alle Kategorien"
- Frei wählbare Fragenanzahl (10/20/30/50 oder eigene Anzahl)
- Automatische Tagesrunde
- Statistik nach jeder Runde und je Kategorie
- "Meine schwierigen Wörter" – Wörter mit vielen Fehlern werden automatisch häufiger wiederholt
- Eigene Lernkarten und eigene Kategorien hinzufügen
- **🎯 TEST-Bereich**: gezielte IELTS-Vorbereitung mit Reading- und Listening-Übungen auf
  5 Niveaustufen, geschätztem Band-Score, Stärken/Schwächen-Analyse und einem
  "Full IELTS Test"-Modus (Writing & Speaking folgen als spätere Erweiterung)
- Funktioniert vollständig offline

## App auf dem Smartphone installieren

Siehe [DEPLOYMENT.md](DEPLOYMENT.md) für die verschiedenen Bereitstellungs-Optionen und
eine Schritt-für-Schritt-Anleitung.

Kurzfassung, sobald die App online erreichbar ist (z. B. über GitHub Pages):

1. Öffne die Adresse im Handy-Browser (Chrome auf Android, Safari auf iPhone).
2. Android/Chrome: Menü (⋮) → **"Zum Startbildschirm hinzufügen"** bzw. **"App installieren"**.
3. iPhone/Safari: Teilen-Symbol (□↑) → **"Zum Home-Bildschirm"**.
4. Das App-Icon erscheint auf deinem Startbildschirm und lässt sich wie eine normale App öffnen — danach auch ohne Internet.

## Bedienung

- **Startseite**: Kategorie(n) auswählen, Anzahl Fragen wählen, "▶ Lernen starten" tippen.
  Oder die vorgeschlagene **Tagesrunde** direkt starten.
- **Lernbildschirm**: Frage lesen, eine der 4 Antworten antippen. Feedback erscheint sofort,
  bei falscher Antwort wird die richtige Lösung angezeigt. Mit "Weiter →" geht's zur nächsten Frage.
- **📈 Fortschritt** (untere Leiste): Gesamtstatistik und Erfolgsquote je Kategorie.
- **🧠 Schwierig**: Wörter mit niedriger Erfolgsquote, gezielt übbar über den Button oben.
- **⚙️ Verwalten**: Eigene Kategorien anlegen/löschen, neue Lernkarten hinzufügen.
- **🎯 TEST**: Niveau wählen, dann Reading oder Listening starten (oder "Full IELTS Test"
  für beides nacheinander). Am Ende gibt es einen geschätzten Band-Score, deine Stärken/
  Schwächen nach Fragetyp und konkrete Übungsempfehlungen.

## Neue Lernkarte hinzufügen

1. Tab **⚙️ Verwalten** öffnen.
2. Unter "Neue Lernkarte" Englisch, Deutsch, Kategorie, Typ und Schwierigkeit ausfüllen.
3. "Karte speichern" tippen — die Karte ist sofort im Lernsystem verfügbar.

## Neue Kategorie anlegen

1. Tab **⚙️ Verwalten** öffnen.
2. "+ Neue Kategorie" tippen, Namen (und optional ein Emoji) eingeben.
3. Die Kategorie erscheint sofort auf der Startseite und im Formular für neue Karten.

Eine Kategorie lässt sich nur löschen, wenn sie keine Lernkarten mehr enthält.

## Daten sichern (Backup)

Aktuell werden alle Daten lokal im Browser des Geräts gespeichert (IndexedDB). Ein
Export/Import als Datei ist als spätere Erweiterung vorgesehen (siehe
[ARCHITECTURE.md](ARCHITECTURE.md), Abschnitt "Spätere Erweiterungen").

## Weiterentwicklung

Siehe [ARCHITECTURE.md](ARCHITECTURE.md) für den technischen Aufbau und
[PROGRESS.md](PROGRESS.md) für das Entwicklungsprotokoll.
