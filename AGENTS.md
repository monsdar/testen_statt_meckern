# AGENTS.md – Projektleitlinien für KI-Assistenten & Entwickler

Dieses Dokument definiert die verbindlichen Regeln, Design-Vorgaben und Arbeitsweisen für alle KI-Assistenten (Agents) und Entwickler, die am Projekt **„Testen statt Meckern"** der **BG BiBA** arbeiten.

---

## 1. Projektkontext & Mission

- **Initiative:** „Testen statt Meckern" der **BG BiBA (Basketballgemeinschaft Bierden-Bassen-Achim)**.
- **Hintergrund:** Bei Amateur- und Jugend-Basketballspielen kommentieren oder meckern Eltern und Zuschauer auf der Tribüne häufig über Entscheidungen der Schiedsrichter oder des Kampfgerichts, ohne die genauen Basketballregeln zu kennen.
- **Lösung:** In der Sporthalle hängen Poster mit einem QR-Code. Wer ihn mit dem Smartphone scannt, landet direkt auf dieser statischen Quiz-Webapp und bekommt **10 zufällige Basketball-Regelfragen** gestellt.
- **Ziel:** Spielerisch Wissen vermitteln, für Aha-Effekte sorgen und den Respekt sowie das Verständnis für die hohe Verantwortung, Entscheidungsgeschwindigkeit und Wissenstiefe unserer **Schiedsrichter** und **Kampfrichter (Anschreiber / Zeitnehmer / 24-Sekunden-Zeitnehmer)** stärken.

---

## 2. Umgang mit den lokalen Regelwerken (`dbb_2022/` & `fiba_2026/`)

Im Projektverzeichnis liegen die offiziellen Basketball-Regeln als strukturierte Markdown- und JSON-Referenz vor:
- `dbb_2022/` – Offizielle Basketball-Regeln des Deutschen Basketball Bundes (DBB 2022, deutsch)
- `fiba_2026/` – FIBA Official Basketball Rules (FIBA 2026, englisch)

### Verbindliche Regeln für diese Ordner:
1. **Striktes Git-Verbot (`.gitignore`):** Die Ordner `dbb_2022/` und `fiba_2026/` dürfen **niemals** in das Git-Repository committet, gepusht oder in öffentlich ausgelieferte Web-Assets kopiert werden. Sie müssen dauerhaft in der `.gitignore` gelistet bleiben.
2. **Quelle der Wahrheit für Quizfragen:** Jede Quizfrage, Antwortoption und Erklärung **muss** fachlich auf den offiziellen DBB-/FIBA-Regeln basieren. Erfinde keine inoffiziellen „Straßen- oder NBA-Mythen" als richtige Antwort (nutze typische Zuschauer-Irrtümer stattdessen gezielt als falsche Antwortoptionen / Distraktoren!).
3. **Artikel-Referenzen angeben:** Jede Frage-Erklärung in der App soll den passenden Regel-Artikel benennen (z. B. *DBB/FIBA Regel V, Art. 25 – Schrittfehler* oder *Regel VIII, Art. 48 – Anschreiber*), jedoch in leicht verständlicher Sprache für Laien zusammengefasst.
4. **Abgleich DBB 2022 vs. FIBA 2026:** Formuliere Fragen und Begriffe auf **Deutsch** (gemäß DBB-Terminologie in `dbb_2022/regeln_markdown/`), prüfe aber bei Detailfragen gegen `fiba_2026/rules_markdown/`, damit keine veralteten Regelauslegungen abgefragt werden.

---

## 3. Tonalität (Tone of Voice)

- **Leicht, locker & sportlich:** Die Ansprache erfolgt per **„Du"**, freundlich, humorvoll und mit einem Augenzwinkern.
- **Nicht belehrend oder arrogant:** Ziel ist es nicht, Zuschauer vorzuführen, sondern Neugier zu wecken und den Perspektivwechsel zu fördern (*„Hand aufs Herz: Hättest du das in 0,5 Sekunden auf dem Feld richtig entschieden?"*).
- **Wertschätzung für Offizielle:** Sowohl in den Erklärungen als auch in der Endauswertung soll immer wieder deutlich werden, was **Schiedsrichter** auf dem Parkett und **Anschreiber / Zeitnehmer** am Kampfrichtertisch leisten.
- **Verbindliche Anker-Texte für die Endauswertung:**
  - **0/10 Richtige:** `„0/10 Richtige! Versuch es gleich noch einmal, vielleicht hast du ja etwas gelernt."`
  - **5/10 Richtige:** `„5/10 Richtige! Das ist schon nicht schlecht, aber für den Schiri-Schein reicht es noch nicht."`
  - **10/10 Richtige:** `„10/10 Richtige! Perfekt - Du weißt wahrscheinlich ganz genau wie schwer es ist immer die richtigen Entscheidungen zu treffen."`
  - Die Zwischenstufen (`1–4/10` und `6–9/10`) müssen sich nahtlos in denselben Tonfall einfügen.

---

## 4. Marken- & Design-Richtlinien (BG BiBA Styleguide)

Alle visuellen Elemente müssen sich strikt an den offiziellen [BG BiBA Brand Guidelines](https://wiki.bgbiba.de/books/media/page/bg-biba-brand-guidelines) orientieren.

### 4.1 Offizielle Schreibweise des Vereins
- **Korrekt:** **BG BiBA** (wichtig: kleines **`i`** in `BiBA`!) bzw. in der Langform **Basketballgemeinschaft Bierden-Bassen-Achim**.
- **Verboten:** `BG Biba`, `BG-BiBA` oder `BG BIBA` (letzteres nur in reinen Versalien-/All-Caps-Überschriften per CSS `text-transform: uppercase`).

### 4.2 Farbpalette & CSS Custom Properties
Folgende Design Tokens sind in CSS verpflichtend als Basis zu verwenden:

```css
:root {
  /* Brand Colors (BG BiBA Official CI) */
  --biba-red: #E2322A;
  --biba-blue: #412774;
  --biba-black: #000000;
  --biba-white: #FFFFFF;

  /* Backgrounds */
  --biba-bg-bright: #F2F2F2;
  --biba-bg-dark: #111111;

  /* Semantic Mapping (Light Theme Default) */
  --color-primary: var(--biba-blue);
  --color-accent: var(--biba-red);
  --color-text: var(--biba-black);
  --color-bg: var(--biba-bg-bright);
  --color-surface: var(--biba-white);

  /* Typography */
  --font-heading: 'Outfit', system-ui, -apple-system, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
}

[data-theme="dark"], .theme-dark {
  --color-text: var(--biba-white);
  --color-bg: var(--biba-bg-dark);
  --color-surface: #1C1C1C;
}
```

### 4.3 UI-, Layout- & Kontrastregeln
1. **Stilrichtung:** *Modern Athletic* & minimalistisch – klar, kontrastreich, sportlich, kein unnötiger visueller Ballast.
2. **60-30-10 Farbregel:**
   - **60 %** Neutrale Hintergründe (`#F2F2F2` im Light-Mode bzw. `#111111` in Dark-Sections und `#FFFFFF` für Cards).
   - **30 %** Strukturfarbe & Typografie (`#000000` für Text/Rahmen sowie `#412774` BiBA-Blau für Header, Fortschrittsbalken, Badges oder Sekundärflächen).
   - **10 %** Akzentfarbe (`#E2322A` BiBA-Rot gezielt für primäre Call-to-Action-Buttons, aktive States und wichtige Highlights).
3. **Kontrast-Verbote (Barrierefreiheit):**
   - **Niemals** schwarze Schrift (`#000000`) auf BiBA-Blau (`#412774`) verwenden – immer weiße Schrift (`#FFFFFF`).
   - **Niemals** roten Fließtext (`#E2322A`) direkt auf BiBA-Blau (`#412774`) oder dunklem Hintergrund (`#111111`) setzen.
4. **Logo-Verwendung:**
   - Seitenverhältnis immer exakt **1:1 (Kreisform)**, niemals verzerren, drehen oder umfärben.
   - Schutzzone (Clear Space) von mindestens **10 % des Logo-Durchmessers** einhalten.
   - Mindestgröße digital: **48 × 48 Pixel**.
   - Auf `#F2F2F2` oder `#FFFFFF` → `bgbiba_full_small.png` / `bgbiba_full.svg` (Light Ring).
   - Auf `#111111` oder `#412774` → `bgbiba_full_black_white.png` / `bgbiba_full_black_white.svg` (Dark Ring).

---

## 5. Technische Grundregeln

1. **Statisches Hosting (GitHub Pages):**
   - Die Webapp muss als **100 % statische Webseite** ohne Backend-Server oder Datenbank funktionieren.
   - Alle Pfade müssen relativ gehalten werden (`./...`), damit die App sowohl unter einer eigenen Domain als auch in einem GitHub-Pages-Unterverzeichnis (`/<repo-name>/`) fehlerfrei lädt.
2. **Zero-Dependency / Vanilla-First:**
   - Bevorzuge sauberes, standardkonformes **Vanilla HTML5, CSS3 und ES6+ JavaScript** ohne unnötige Build-Pipelines oder schwere Frontend-Frameworks.
3. **Mobile-First & Sporthallen-Performance:**
   - Die primäre Nutzung erfolgt per Smartphone über den QR-Code auf der Tribüne.
   - Da der Mobilfunkempfang in Sporthallen oft schwach ist, muss die Seite extrem leichtgewichtig sein und den Fragenkatalog direkt beim ersten Laden im Speicher halten, sodass ein Quiz-Durchlauf auch bei kurzzeitigem Verbindungsabbruch unterbrechungsfrei durchgespielt werden kann.
   - Alle interaktiven Elemente (Antwort-Buttons, Weiter-Buttons) müssen große, komfortable Touch-Flächen (**mind. 48 px Höhe**) bieten.
4. **Datenschutz (Privacy by Design):**
   - Keine Cookies, keine externen Tracking-Skripte, keine personenbezogenen Daten erheben.
   - Falls Webfonts (`Outfit`, `Inter`) eingebunden werden, entweder lokal hosten (DSGVO-konform) oder mit sauberen System-Font-Fallbacks versehen.

