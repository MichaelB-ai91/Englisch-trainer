# Bereitstellung fürs Smartphone

Die App ist eine reine Client-Anwendung (kein Server, kein Login, keine Benutzerverwaltung —
wie in der Spezifikation gefordert). Für die **dauerhafte Installation** auf dem Handy
(Offline-Fähigkeit, Icon auf dem Startbildschirm) braucht ein Service Worker aber einen
**sicheren Kontext (HTTPS oder `localhost`)** — das ist eine technische Vorgabe der
Smartphone-Browser, keine Server-Architektur der App selbst. Die Datenbank bleibt dabei
zu 100 % lokal auf dem Gerät; ein Hoster liefert nur die statischen Dateien aus.

## Option A — Schnelltest im selben WLAN (kein Account nötig)

Für einen ersten Blick auf dem Handy, bevor etwas dauerhaft eingerichtet wird:

1. Am PC im Projektordner: `python -m http.server 8420`
2. Die lokale IP-Adresse des PCs herausfinden (z. B. `ipconfig` → IPv4-Adresse, etwa `192.168.1.23`).
3. Auf dem Handy (im selben WLAN) im Browser öffnen: `http://192.168.1.23:8420`

**Einschränkung:** Ohne HTTPS funktioniert kein Offline-Modus und "Zum Startbildschirm
hinzufügen" installiert nur ein einfaches Lesezeichen, keine echte installierte PWA. Gut für
einen schnellen Funktionstest, nicht für die dauerhafte Nutzung.

## Option B — GitHub Pages (empfohlen für Dauerbetrieb)

Kostenlos, automatisches HTTPS, kein eigener Server nötig. Voraussetzung: ein (kostenloser)
GitHub-Account.

1. Neues (privates oder öffentliches) Repository auf github.com anlegen.
2. Projektordner hochladen (per `git push` oder Drag & Drop im Browser).
3. In den Repository-Einstellungen unter "Pages" die Quelle auf den Hauptbranch stellen.
4. GitHub liefert eine Adresse wie `https://<name>.github.io/<repo>/`.
5. Diese Adresse auf dem Handy öffnen → "Zum Startbildschirm hinzufügen".

## Option C — Netlify / Cloudflare Pages

Ähnlich wie GitHub Pages: Ordner hochladen (teils sogar per Drag & Drop ohne Git-Kenntnisse),
automatisches HTTPS, kostenlos für dieses Nutzungsvolumen. Sinnvoll, wenn kein GitHub-Account
gewünscht ist.

## Was ich für dich vorbereiten kann

Ich kann bei Option B oder C die technischen Schritte übernehmen (Git-Repository einrichten,
Dateien hochladen), sobald du dich für eine Variante entschieden hast und mir grünes Licht
gibst — das Anlegen von Accounts und das Veröffentlichen von Inhalten mache ich nur mit
deiner ausdrücklichen Zustimmung.
