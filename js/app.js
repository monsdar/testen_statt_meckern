/**
 * BG BiBA – "Testen statt Meckern" Quiz-Engine
 * Reine statische Vanilla-JS-Anwendung für GitHub Pages
 */

const QUESTIONS_PER_ROUND = 10;
const LETTERS = ['A', 'B', 'C', 'D'];

/**
 * Eingebetteter Fallback-Fragenkatalog (identisch zu data/questions.json),
 * damit die App auch bei direktem Öffnen über file:// oder Funkloch in der Sporthalle
 * sofort und ohne Ladefehler funktioniert.
 */
const FALLBACK_QUESTIONS = [
  {
    id: 'q-travel-zero-step',
    category: 'Schrittfehler & Dribbling',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Spieler fängt den Ball in voller Bewegung, während sein rechter Fuß gerade den Boden berührt. Wie viele Schritte darf er danach noch machen, um zum Korbleger hochzugehen?',
    options: [
      "Noch 2 Schritte – der Bodenkontakt im Moment des Fangens zählt als ‚Schritt 0'",
      'Nur noch 1 Schritt, weil der rechte Fuß bereits als erster Schritt zählt',
      'Gar keinen Schritt mehr – er muss sofort abstoppen oder dribbeln',
      '3 Schritte, solange er innerhalb der Zone (Rechteck) abspringt',
    ],
    correctIndex: 0,
    explanation:
      "Seit Einführung des ‚Schritt 0' (Gather Step) zählt der Fuß, der im Moment der Ballkontrolle in der Bewegung bereits auf dem Boden ist, noch nicht zu den zwei erlaubten Schritten. Unsere Schiedsrichter müssen dafür in Sekundenbruchteilen gleichzeitig auf die Hände (Wann ist der Ball unter Kontrolle?) und auf die Füße achten!",
    ruleReference: 'DBB/FIBA Regel V – Art. 25.2.1 (Schrittfehler in der Bewegung)',
  },
  {
    id: 'q-foot-accidental',
    category: 'Schrittfehler & Dribbling',
    officialRole: 'Schiedsrichter',
    question:
      'Ein scharfer Bodenpass prallt gegen den Fuß eines Verteidigers, der normal in seiner Verteidigungsstellung steht und das Bein nicht aktiv zum Ball bewegt. Von der Tribüne schallt es: „Fuß!!“ – Was ist richtig?',
    options: [
      'Weiterspielen! Nur absichtliches Berühren oder Stoppen mit dem Bein/Fuß ist ein Regelverstoß',
      'Pfiff und Einwurf für den Angriff + neue 24 Sekunden',
      'Freiwurf für den Passgeber wegen Fußspiels',
      'Sprungball (Wechselnder Ballbesitz), weil keine Absicht vorlag',
    ],
    correctIndex: 0,
    explanation:
      'Einer der häufigsten Irrtümer auf der Tribüne: Wird ein Spieler am Fuß oder Bein einfach nur angeschossen, ohne eine aktive Bewegung zum Ball zu machen, läuft das Spiel weiter. Schiedsrichter müssen sofort unterscheiden: Ging der Fuß zum Ball oder der Ball zum Fuß?',
    ruleReference: 'DBB/FIBA Regel IV – Art. 13.2 (Wie der Ball gespielt wird)',
  },
  {
    id: 'q-shotclock-off-rebound',
    category: 'Zeitregeln & Wurfuhr',
    officialRole: '24-Sekunden-Zeitnehmer',
    question:
      'Ein Korbwurf berührt den Ring, springt ab und die angreifende Mannschaft sichert sich direkt wieder den Offensiv-Rebound. Auf wie viele Sekunden stellt das Kampfgericht die Wurfuhr?',
    options: [
      'Auf 14 Sekunden',
      'Auf volle 24 Sekunden',
      'Die Uhr läuft einfach ohne Zurücksetzen weiter',
      'Auf 8 Sekunden',
    ],
    correctIndex: 0,
    explanation:
      'Nach einem Offensiv-Rebound nach Ringberührung muss das Team den Ball nicht noch einmal über die Mittellinie bringen – deshalb gibt es nur 14 statt 24 Sekunden. Am Kampfrichtertisch braucht der 24-Sekunden-Zeitnehmer dafür höchste Konzentration: War der Ball am Ring? Wer hat den Rebound wirklich kontrolliert? Und dann sofort die richtige Taste (14 vs. 24) drücken!',
    ruleReference: 'DBB/FIBA Regel V – Art. 29.2.7 & Regel VIII – Art. 50.4 (Wurfuhr)',
  },
  {
    id: 'q-backcourt-dribble',
    category: 'Ausball & Rückspiel',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Aufbauspieler dribbelt über die Mittellinie ins Vorfeld, stoppt mit einem Fuß im Vorfeld (der andere Fuß und der Ball sind noch im Rückfeld) und dribbelt wieder zurück. Ist das Rückspiel?',
    options: [
      'Nein! Erst wenn BEIDE Füße des Dribblers UND der Ball vollständig im Vorfeld waren, zählt der Ball als im Vorfeld',
      'Ja, sobald ein Fuß die Mittellinie berührt oder überschreitet, ist es Rückspiel',
      'Ja, sobald der Ball einmal über der Mittellinie in der Luft war',
      'Nein, beim Dribbeln gibt es überhaupt kein Rückspiel – nur bei Pässen',
    ],
    correctIndex: 0,
    explanation:
      'Beim Dribbling gilt das Vorfeld erst dann als erreicht (und die 8-Sekunden-Zählung als beendet), wenn beide Füße des Dribblers UND der Ball Kontakt mit dem Vorfeld haben. Solange noch ein Fuß oder der Ball im Rückfeld ist, befindet sich der Spieler regeltechnisch noch im Rückfeld!',
    ruleReference: 'DBB/FIBA Regel V – Art. 28.1.2 & Art. 30.1.1 (Acht Sekunden / Rückspiel)',
  },
  {
    id: 'q-cylinder-vertical',
    category: 'Fouls & Kontakt',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Verteidiger steht in legaler Position vor dem Korb und springt mit senkrecht nach oben gestreckten Armen kerzengerade hoch. Der Angreifer springt in ihn hinein, es knallt laut und der Wurf geht daneben. Was entscheidet der Schiedsrichter?',
    options: [
      'Kein Verteidigerfoul (Weiterspielen oder ggf. Offensivfoul) – der Verteidiger hat Recht auf seinen vertikalen Zylinder',
      'Immer Verteidigerfoul und 2 Freiwürfe, weil der Verteidiger in der Luft Körperkontakt hatte',
      'Immer Doppelfoul, wenn beide Spieler in der Luft zusammenprallen',
      'Technisches Foul wegen gefährlichen Hochspringens in der Zone',
    ],
    correctIndex: 0,
    explanation:
      'Laut Zylinder- und Vertikalprinzip hat jeder Spieler das Recht auf den Luftraum senkrecht über seinem Standort. Springt der Verteidiger innerhalb seines Zylinders gerade hoch und hält die Arme senkrecht, verursacht der hineinspringende Angreifer den Kontakt – auch wenn es von der Tribüne spektakulär aussieht!',
    ruleReference: 'DBB/FIBA Regel VI – Art. 33.1 & 33.2 (Zylinder- und Vertikalprinzip)',
  },
  {
    id: 'q-fumble-no-travel',
    category: 'Schrittfehler & Dribbling',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Spieler will einen Pass fangen, der Ball rutscht ihm aber unabsichtlich durch die Finger, er läuft drei Schritte hinterher und bekommt den Ball erst dann sicher zu fassen. Ist das ein Schrittfehler?',
    options: [
      "Nein – das unabsichtliche Entgleiten heißt ‚Fumbling', und Schritte zählen erst ab sicherer Ballkontrolle",
      'Ja, klarer Schrittfehler, weil er den Ball zweimal berührt und dazwischen gelaufen ist',
      'Ja, das wird als Doppeldribbling gewertet',
      'Nur erlaubt, wenn ein Gegenspieler den Ball zwischendurch berührt hat',
    ],
    correctIndex: 0,
    explanation:
      "Ohne Ballkontrolle gibt es keinen Schrittfehler! Wenn ein Spieler beim Fangen oder Aufnehmen unabsichtlich die Kontrolle verliert (‚Fumbling'), darf er dem Ball nachsetzen und ihn sichern. Erst ab dem Moment, in dem er den Ball wirklich kontrolliert hält, zählt die Schrittregel.",
    ruleReference: 'DBB/FIBA Regel V – Art. 24.1.3 & Art. 25.1.1 (Fumbling & Schrittfehler)',
  },
  {
    id: 'q-player-falls-slides',
    category: 'Schrittfehler & Dribbling',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Spieler hechtet nach einem freien Ball, fängt ihn im Fallen und rutscht durch seinen Schwung noch einen Meter auf dem Hallenboden entlang. Was muss der Schiedsrichter pfeifen?',
    options: [
      'Nichts (Weiterspielen)! Mit dem Ball zu fallen und durch den Schwung zu rutschen ist völlig legal',
      'Sofort Schrittfehler, sobald der Spieler mit dem Ball am Boden rutscht',
      'Halteball, sobald ein Spieler mit dem Ball den Boden mit dem Knie berührt',
      'Technisches Foul wegen Spielverzögerung am Boden',
    ],
    correctIndex: 0,
    explanation:
      'Es ist ausdrücklich erlaubt, nach dem Ball zu werfen, zu fallen und durch den eigenen Schwung über das Parkett zu rutschen. Erst wenn der liegende Spieler sich mit festgehaltenem Ball herumrollt oder versucht, ohne Dribbling mit dem Ball aufzustehen, wird es zum Schrittfehler.',
    ruleReference: 'DBB/FIBA Regel V – Art. 25.2.2 (Spieler fällt, liegt oder sitzt auf dem Spielfeld)',
  },
  {
    id: 'q-three-seconds-shot',
    category: 'Zeitregeln & Wurfuhr',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Angriffsspieler steht schon fast 3 Sekunden in der gegnerischen Zone (Rechteck), als sein Mitspieler außen zum Korbwurf ansetzt. Warum pfeift der Schiedsrichter hier oft keine 3 Sekunden ab?',
    options: [
      'Weil die Regel vorschreibt, Nachsicht zu üben, sobald sich ein Spieler in der Korbwurfaktion befindet',
      'Weil die 3-Sekunden-Regel nur gilt, wenn der Spieler in der Zone selbst den Ball hält',
      'Weil im Amateur-Basketball die Zone erst ab 5 Sekunden abgepfiffen wird',
      'Weil die 3 Sekunden immer neu starten, sobald irgendein Pass gespielt wird',
    ],
    correctIndex: 0,
    explanation:
      'Schiedsrichter zählen nicht stur wie eine Stoppuhr: Wenn ein Spieler versucht, die Zone gerade zu verlassen, oder wenn ein Korbwurf bereits im Gange ist, verlangt das Regelwerk ausdrücklich Nachsicht, um das Spiel nicht unnötig zu zerpfeifen. Außerdem endet mit dem Wurf die Mannschafts-Ballkontrolle!',
    ruleReference: 'DBB/FIBA Regel V – Art. 26.1.2 (Drei Sekunden – Nachsicht)',
  },
  {
    id: 'q-three-seconds-exit',
    category: 'Zeitregeln & Wurfuhr',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Center will den 3-Sekunden-Zähler in der Zone zurücksetzen und stellt dafür kurz einen Fuß über die Linie nach draußen, während der andere Fuß in der Zone bleibt. Reicht das?',
    options: [
      'Nein! Er hat die Zone erst verlassen, wenn er BEIDE Füße außerhalb der Zone auf dem Boden aufgesetzt hat',
      'Ja, ein Fuß außerhalb der Zone unterbricht sofort das Zählen',
      'Ja, es reicht sogar, kurz in der Zone hochzuspringen',
      'Ja, solange er dabei die Hände hebt',
    ],
    correctIndex: 0,
    explanation:
      "Der berühmte ‚Alibi-Ausfallschritt' mit nur einem Fuß hilft gar nichts: Nach Artikel 26.1.3 gilt die Zone erst dann als verlassen, wenn beide Füße gleichzeitig den Boden außerhalb der Zone berühren.",
    ruleReference: 'DBB/FIBA Regel V – Art. 26.1.3 (Verlassen der Zone)',
  },
  {
    id: 'q-closely-guarded-5sec',
    category: 'Zeitregeln & Wurfuhr',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Spieler hält den Ball auf dem Feld fest (dribbelt nicht) und ein Verteidiger bewacht ihn aktiv in weniger als 1 Meter Abstand. Wie lange darf der Angreifer den Ball so halten?',
    options: [
      'Maximal 5 Sekunden – innerhalb dieser Zeit muss er passen, werfen oder dribbeln',
      'Maximal 3 Sekunden',
      'Maximal 8 Sekunden',
      'Solange die 24-Sekunden-Wurfuhr noch nicht abgelaufen ist',
    ],
    correctIndex: 0,
    explanation:
      "Wird ein ballhaltender Spieler aktiv in maximal 1 Meter Distanz verteidigt (‚nah bewacht'), zählt der Schiedsrichter sichtbar mit dem Arm die 5 Sekunden an. Passt, wirft oder dribbelt der Spieler nicht rechtzeitig, gibt es Einwurf für die Verteidigung.",
    ruleReference: 'DBB/FIBA Regel V – Art. 27 (Nah bewachter Spieler)',
  },
  {
    id: 'q-out-of-bounds-line',
    category: 'Ausball & Rückspiel',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Spieler mit Ball steht mit der Ferse minimal AUF der Seitenlinie, berührt aber noch nicht den Boden hinter der Linie. Ist das im Basketball schon Aus?',
    options: [
      'Ja! Im Basketball gehören die Grenzlinien nicht zum Spielfeld – auf der Linie ist bereits im Aus',
      'Nein, wie beim Fußball oder Tennis muss der Ball bzw. Fuß die Linie komplett überschritten haben',
      'Nur wenn der ganze Fuß die Linie berührt',
      'Nein, solange der Ball selbst noch innerhalb des Spielfelds gehalten wird',
    ],
    correctIndex: 0,
    explanation:
      'Anders als beim Fußball oder Handball gehören die Seiten- und Endlinien im Basketball NICHT zum Spielfeld. Schon die kleinste Berührung der Linie mit dem Schuh bedeutet: Der Spieler steht im Aus!',
    ruleReference: 'DBB/FIBA Regel II – Art. 2.2.2 & Regel V – Art. 23.1.1 (Spieler im Aus)',
  },
  {
    id: 'q-out-of-bounds-jump-save',
    category: 'Ausball & Rückspiel',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Spieler springt noch im Spielfeld ab, hechtet einem Ball hinterher, wirft ihn in der Luft über dem Ausbereich zurück ins Feld und landet erst danach im Aus. Was gilt?',
    options: [
      'Der Ball bleibt im Spiel! Solange der Spieler vor dem Rückwurf nichts im Aus berührt hat, geht es weiter',
      'Ausball, weil sich der Körper des Spielers in der Luft bereits außerhalb der Linie befand',
      'Ausball, weil der Spieler nach seiner Aktion im Aus gelandet ist',
      'Sprungballsituation wegen unklarer Spielfeldgrenze',
    ],
    correctIndex: 0,
    explanation:
      'Im Basketball gilt: Ein Spieler in der Luft behält den Status des Ortes bei, an dem er zuletzt den Boden berührt hat. Springt er im Feld ab und wirft den Ball zurück, bevor er selbst den Boden (oder einen Gegenstand) im Aus berührt, ist die Rettungsaktion gültig!',
    ruleReference: 'DBB/FIBA Regel IV – Art. 11.1 (Standort eines Spielers)',
  },
  {
    id: 'q-referee-touched-by-ball',
    category: 'Schiedsrichter & Spielleitung',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Pass prallt unglücklich gegen den Schiedsrichter, der mit einem Fuß auf der Seitenlinie im Aus steht. Was passiert jetzt?',
    options: [
      'Ausball! Berührt der Ball einen Schiedsrichter, zählt es genau so, als hätte er den Boden am Standort des Schiedsrichters berührt',
      'Schiedsrichterball (Wechselnder Ballbesitz), sobald ein Schiedsrichter den Ball berührt',
      'Der Pass wird wiederholt, weil der Schiedsrichter als neutrales Hindernis gilt',
      'Weiterspielen, egal wo der Schiedsrichter gerade steht',
    ],
    correctIndex: 0,
    explanation:
      'Für den Standort eines Schiedsrichters gilt dieselbe Regel wie für Spieler: Steht der Schiedsrichter im Feld, bleibt der Ball im Spiel. Steht der Schiedsrichter aber auf oder hinter der Grenzlinie im Aus, ist der Ball sofort im Aus!',
    ruleReference: 'DBB/FIBA Regel IV – Art. 11.2 & Regel V – Art. 23 (Standort eines Schiedsrichters)',
  },
  {
    id: 'q-team-fouls-bonus',
    category: 'Fouls & Kontakt',
    officialRole: 'Kampfgericht / Anschreiber',
    question:
      'Am Anschreibertisch wird das rote Mannschaftsfoul-Zeichen aufgestellt. Ab dem wievielten Mannschaftsfoul in einem Viertel gibt es für jedes weitere Verteidigerfoul sofort 2 Freiwürfe?',
    options: [
      'Ab dem 5. Mannschaftsfoul im Viertel (nach dem 4. Foul ist die Grenze erreicht und das rote Zeichen wird aufgestellt)',
      'Schon beim 4. Mannschaftsfoul im Viertel',
      'Erst ab dem 6. Mannschaftsfoul im Viertel',
      'Ab dem 8. Mannschaftsfoul pro Halbzeit',
    ],
    correctIndex: 0,
    explanation:
      'Mit dem 4. Spielerfoul in einem Viertel hat ein Team die Mannschaftsfoulgrenze erreicht – der Zeitnehmer stellt das rote Warnzeichen auf, sobald der Ball wieder belebt wird. Ab dem 5. Mannschaftsfoul gibt es dann auch ohne Korbwurfaktion 2 Freiwürfe.',
    ruleReference: 'DBB/FIBA Regel VII – Art. 41.1 & 41.2 & Regel VIII – Art. 49.1 (Mannschaftsfouls)',
  },
  {
    id: 'q-offensive-foul-no-freethrows',
    category: 'Fouls & Kontakt',
    officialRole: 'Schiedsrichter & Kampfgericht',
    question:
      'Team A hat bereits 5 Mannschaftsfouls im Viertel (rotes Schild steht). Nun begeht ein Angreifer von Team A beim Ziehen zum Korb ein Stürmerfoul (Offensivfoul). Bekommt Team B jetzt 2 Freiwürfe?',
    options: [
      'Nein, es gibt nur Einwurf für Team B! Für Fouls der ballkontrollierenden Mannschaft gibt es nie Teamfoul-Freiwürfe',
      'Ja, weil Team A über der Mannschaftsfoulgrenze ist, gibt es immer 2 Freiwürfe',
      'Es gibt 1 Freiwurf plus Einwurf an der Mittellinie',
      'Das Offensivfoul zählt gar nicht zu den Mannschaftsfouls',
    ],
    correctIndex: 0,
    explanation:
      'Wichtiges Detail für Anschreiber und Schiedsrichter: Das Offensivfoul wird zwar auf dem Anschreibebogen als Spieler- und Mannschaftsfoul eingetragen (bis max. 4), aber ein persönliches Foul der ballkontrollierenden Mannschaft wird immer nur mit Einwurf für den Gegner bestraft – niemals mit Freiwürfen!',
    ruleReference: 'DBB/FIBA Regel VII – Art. 41.2.2 (Persönliches Foul der Mannschaft in Ballkontrolle)',
  },
  {
    id: 'q-fifth-foul-player',
    category: 'Fouls & Kontakt',
    officialRole: 'Kampfgericht / Anschreiber',
    question:
      'Ein Spieler begeht sein 5. Foul. Welche Aufgabe haben Anschreiber und Zeitnehmer am Kampfrichtertisch in diesem Moment?',
    options: [
      'Sie zeigen das 5. Foul mit der roten Foulkelle an und informieren sofort die Schiedsrichter – der Spieler muss innerhalb von 30 Sekunden ersetzt werden',
      'Der Spieler darf weiterspielen, bis eine reguläre Auszeit genommen wird',
      'Ein Spieler scheidet erst beim 6. Foul aus (wie in der NBA)',
      'Der Spieler bekommt eine 2-Minuten-Zeitstrafe auf der Bank und darf danach wieder rein',
    ],
    correctIndex: 0,
    explanation:
      'Nach DBB/FIBA-Regeln ist beim 5. Foul (egal ob persönliches, technisches oder unsportliches Foul) für diesen Spieler Schluss. Anschreiber und Zeitnehmer führen über jedes einzelne Foul Buch und müssen den Schiedsrichter sofort beim 5. Foul benachrichtigen.',
    ruleReference: 'DBB/FIBA Regel VII – Art. 40.1 & Regel VIII – Art. 48.1 & 49.1 (Spieler mit fünf Fouls)',
  },
  {
    id: 'q-timeout-who-requests',
    category: 'Kampfgericht & Anschreiber',
    officialRole: 'Kampfgericht / Anschreiber',
    question:
      'In einer engen Schlussphase wird ein Spieler an der Seitenlinie eingekesselt und ruft dem Schiedsrichter laut „Auszeit!“ zu, während er das T-Zeichen mit den Händen formt. Bekommt er die Auszeit?',
    options: [
      'Nein! Im DBB/FIBA-Basketball darf ausschließlich der Trainer (oder 1. Trainer-Assistent) beim Kampfgericht eine Auszeit beantragen',
      'Ja, solange sein Team selbst in Ballkontrolle ist',
      'Ja, aber nur der Mannschaftskapitän auf dem Feld darf das',
      'Ja, allerdings verliert das Team dadurch 14 Sekunden auf der Wurfuhr',
    ],
    correctIndex: 0,
    explanation:
      'Schon wieder eine typische NBA-Falle! Nach DBB- und FIBA-Regeln können Spieler auf dem Feld KEINE Auszeit nehmen. Nur der Trainer oder 1. Trainer-Assistent beantragt die Auszeit direkt beim Kampfgericht (Anschreibertisch), das dann bei der nächsten Auszeitmöglichkeit das Signal gibt.',
    ruleReference: 'DBB/FIBA Regel IV – Art. 18.1 & 18.3.1 (Auszeit)',
  },
  {
    id: 'q-substitution-who-requests',
    category: 'Kampfgericht & Anschreiber',
    officialRole: 'Kampfgericht / Anschreiber',
    question: 'Wie läuft ein regulärer Spielerwechsel am Kampfrichtertisch korrekt ab?',
    options: [
      'Der einzuwechselnde Ersatzspieler geht selbst spielbereit zum Anschreibertisch, beantragt den Wechsel und wartet, bis der Schiedsrichter ihn aufs Feld winkt',
      'Die Spieler klatschen wie beim Handball an der Seitenlinie fliegend ab, während das Spiel weiterläuft',
      'Nur der Trainer darf den Wechsel beim Schiedsrichter auf dem Feld anmelden',
      'Der ausgewechselte Spieler muss sich erst beim Anschreiber abmelden, bevor der neue Spieler aufs Feld darf',
    ],
    correctIndex: 0,
    explanation:
      'Nicht der Trainer ruft quer durch die Halle, sondern der Ersatzspieler selbst meldet sich spielbereit am Anschreibertisch an. Der Zeitnehmer gibt beim nächsten geeigneten Unterbrechungsmoment (Wechselmöglichkeit) das Signal, und erst auf das Handzeichen des Schiedsrichters darf das Feld betreten werden.',
    ruleReference: 'DBB/FIBA Regel IV – Art. 19.3 (Vorgehensweise beim Spielerwechsel)',
  },
  {
    id: 'q-alternating-possession-arrow',
    category: 'Kampfgericht & Anschreiber',
    officialRole: 'Kampfgericht / Anschreiber',
    question:
      'Zwei Gegenspieler halten den Ball gleichzeitig mit beiden Händen fest – der Schiedsrichter pfeift und hebt beide Daumen („Halteball“). Wie geht das Spiel weiter?',
    options: [
      'Mit Einwurf für das Team, in dessen Angriffsrichtung der Pfeil am Anschreibertisch zeigt – danach wird der Pfeil umgedreht',
      'Mit einem neuen Sprungball zwischen den beiden Spielern an der nächsten Freiwurflinie',
      'Immer mit Einwurf für die verteidigende Mannschaft als Belohnung',
      'Immer mit Einwurf für die angreifende Mannschaft, weil im Zweifel für den Angreifer entschieden wird',
    ],
    correctIndex: 0,
    explanation:
      "Einen echten Sprungball gibt es nur noch zu Beginn des 1. Viertels! Bei allen späteren Sprungballsituationen (Halteball, eingeklemmter Ball am Ring, Beginn des 2./3./4. Viertels) regelt der Einwurfpfeil für ‚Wechselnden Ballbesitz' am Anschreibertisch, wer Einwurf bekommt. Und zur Halbzeit muss der Anschreiber den Pfeil sogar einmal wegen des Seitenwechsels umdrehen!",
    ruleReference: 'DBB/FIBA Regel IV – Art. 12.4–12.6 & Regel VIII – Art. 48.1 (Wechselnder Ballbesitz)',
  },
  {
    id: 'q-backcourt-jump-steal',
    category: 'Ausball & Rückspiel',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Verteidiger springt in seinem Vorfeld ab, fängt in der Luft einen Pass des Gegners ab (Steal) und landet durch seinen Schwung mit dem Ball im eigenen Rückfeld. Ist das Rückspiel?',
    options: [
      'Nein, kein Rückspiel! Wer im Vorfeld abspringt, in der Luft erstmals neue Ballkontrolle für sein Team erlangt und im Rückfeld landet, spielt legal',
      'Ja, weil er im Vorfeld abgesprungen und mit Ball im Rückfeld gelandet ist',
      'Ja, außer er dribbelt den Ball noch in der Luft vor der Landung',
      'Es gibt Einwurf für den Gegner an der Mittellinie',
    ],
    correctIndex: 0,
    explanation:
      'Eine der kniffligsten Regeln überhaupt (Art. 30.1.2): Weil das Team vor dem Sprung noch gar keine Ballkontrolle hatte und diese erst in der Luft erlangt wurde, greift hier eine offizielle Ausnahmeregelung. Die Landung im Rückfeld ist in genau diesem Fall KEIN Rückspiel!',
    ruleReference: 'DBB/FIBA Regel V – Art. 30.1.2 (Ausnahme beim Spielen des Balls ins Rückfeld)',
  },
  {
    id: 'q-goaltending-backboard',
    category: 'Schiedsrichter & Spielleitung',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Korbleger klatscht oberhalb des Ringniveaus ans Spielbrett (ist sogar noch leicht im Steigflug), und ein heraneilender Verteidiger blockt den Ball danach weg. Zählt der Block?',
    options: [
      'Nein, das ist Goaltending – die 2 Punkte zählen! Nach Kontakt mit dem Spielbrett darf ein Ball über Ringniveau nicht mehr geblockt werden',
      'Ja, sauberer Block, solange der Ball noch nicht im Abwärtsflug war',
      'Ja, am Spielbrett darf der Ball jederzeit geblockt werden, solange er den Ring nicht berührt hat',
      'Es gibt 2 Freiwürfe für den Werfer',
    ],
    correctIndex: 0,
    explanation:
      "Viele Zuschauer kennen beim Goaltending nur den ‚Abwärtsflug'. Aber Artikel 31.2.1 sagt klar: Ein Korbwurf über Ringniveau darf AUCH DANN nicht mehr berührt werden, sobald er das Spielbrett berührt hat – selbst wenn der Ball danach noch leicht steigt! Die Punkte zählen sofort.",
    ruleReference: 'DBB/FIBA Regel V – Art. 31.2.1 (Goaltending)',
  },
  {
    id: 'q-scoresheet-vs-scoreboard',
    category: 'Kampfgericht & Anschreiber',
    officialRole: 'Kampfgericht / Anschreiber',
    question:
      'Auf der großen Hallen-Anzeigetafel steht es 62:60, aber auf dem offiziellen Anschreibebogen am Tisch sind 62:61 Punkte eingetragen (und eine Diskrepanz lässt sich nicht anders klären). Was gilt?',
    options: [
      'Der offizielle Anschreibebogen am Kampfrichtertisch ist maßgebend – die Anzeigetafel muss angepasst werden',
      'Die Hallen-Anzeigetafel gilt immer, weil sie für beide Trainer sichtbar war',
      'Der 1. Schiedsrichter wirft eine Münze',
      'Das letzte Viertel muss wiederholt werden',
    ],
    correctIndex: 0,
    explanation:
      'Deshalb trägt der Anschreiber am Kampfrichtertisch eine so hohe Verantwortung: Der Anschreibebogen ist die offizielle Urkunde des Spiels. Bei nicht aufklärbaren Abweichungen zur Anzeigetafel ist immer der Anschreibebogen bindend!',
    ruleReference: 'DBB/FIBA Regel VIII – Art. 48.2 (Pflichten des Anschreibers)',
  },
  {
    id: 'q-contact-advantage-disadvantage',
    category: 'Fouls & Kontakt',
    officialRole: 'Schiedsrichter',
    question:
      'Beim Zug zum Korb berühren sich Angreifer und Verteidiger leicht an der Hüfte, ohne dass jemand aus der Balance gerät oder einen Vorteil/Nachteil hat. Muss der Schiedsrichter pfeifen?',
    options: [
      "Nein! Nach dem ‚Vorteil/Nachteil-Prinzip' sollen Schiedsrichter zufälligen Kontakt ohne Auswirkung auf das Spiel laufen lassen",
      'Ja, Basketball ist ein komplett körperloses Spiel – jede Berührung ist zwingend ein Foul',
      'Ja, jeder Kontakt in der Zone führt automatisch zu Freiwürfen',
      'Nur in den letzten 2 Spielminuten wird jeder Kontakt gepfiffen',
    ],
    correctIndex: 0,
    explanation:
      'Würden Schiedsrichter jede kleinste Berührung unter 10 Spielern auf engem Raum abpfeifen, gäbe es überhaupt keinen Spielfluss mehr. Artikel 47.3 verpflichtet Schiedsrichter ausdrücklich dazu, zwischen regelwidrigem Kontakt (mit Vor-/Nachteil) und unbedeutendem Kontakt abzuwägen.',
    ruleReference: 'DBB/FIBA Regel VI – Art. 33.11 & Regel VIII – Art. 47.3 (Vorteil/Nachteil-Prinzip)',
  },
  {
    id: 'q-throw-in-5-seconds',
    category: 'Ausball & Rückspiel',
    officialRole: 'Schiedsrichter',
    question:
      'Wie lange hat ein Spieler bei einem Einwurf Zeit, bis der Ball seine Hände verlassen haben muss – und wie weit darf er sich seitlich an der Linie bewegen?',
    options: [
      'Maximal 5 Sekunden und seitlich höchstens 1 Meter von der zugewiesenen Einwurfstelle (außer nach einem Korberfolg hinter der Endlinie)',
      'Maximal 3 Sekunden und er darf keinen einzigen Zentimeter zur Seite treten',
      'Maximal 8 Sekunden und er darf die gesamte Seitenlinie entlanglaufen',
      'Es gibt kein Zeitlimit beim Einwurf, solange die Spieluhr steht',
    ],
    correctIndex: 0,
    explanation:
      'Ab dem Moment, in dem der Ball dem Einwerfer zur Verfügung steht, zählt der Schiedsrichter 5 Sekunden. Seitlich darf sich der Einwerfer insgesamt maximal 1 Meter bewegen (nach hinten ins Aus dagegen so weit, wie Platz in der Halle ist). Ausnahme: Nach einem regulären Korberfolg darf man sich hinter der gesamten Endlinie frei bewegen und dort sogar einem Mitspieler im Aus zupassen!',
    ruleReference: 'DBB/FIBA Regel IV – Art. 17.2.10 & Art. 17.3.1 (Einwurf)',
  },
  {
    id: 'q-pivot-lift-on-shot',
    category: 'Schrittfehler & Dribbling',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Spieler steht nach beendetem Dribbling still, macht einen Sternschritt und hebt nun seinen Standfuß vom Boden ab, um zu passen oder auf den Korb zu werfen. Ist das Anheben des Standfußes ein Schrittfehler?',
    options: [
      'Nein! Für einen Korbwurf oder Pass darf der Standfuß angehoben werden – der Ball muss nur die Hand verlassen, bevor der Fuß wieder den Boden berührt',
      'Ja, sobald der Standfuß den Boden verlässt, ist es immer sofort Schrittfehler',
      'Nein, man darf den Standfuß sogar vor dem Beginn eines Dribblings erst anheben und danach den Ball prellen',
      'Das ist nur bei Drei-Punkte-Würfen erlaubt',
    ],
    correctIndex: 0,
    explanation:
      'Ein Klassiker, der auf der Tribüne fast in jedem Spiel falsch gerufen wird: Beim Start eines Dribblings muss der Ball die Hand verlassen, BEVOR sich der Standfuß hebt. Aber für einen Pass oder Korbwurf darf man vom Standfuß abspringen bzw. ihn anheben – solange der Ball aus der Hand ist, ehe der Fuß wieder aufsetzt!',
    ruleReference: 'DBB/FIBA Regel V – Art. 25.2.1 (Standfuß bei Dribbling vs. Wurf/Pass)',
  },
  {
    id: 'q-airball-shotclock',
    category: 'Zeitregeln & Wurfuhr',
    officialRole: '24-Sekunden-Zeitnehmer',
    question:
      'Ein Korbwurf bei noch 3 Sekunden auf der Wurfuhr streift nur das Netz (berührt NICHT den Ring!) und ein Mitspieler des Werfers fängt den Ball unter dem Korb. Was macht der 24-Sekunden-Zeitnehmer?',
    options: [
      'Er lässt die Wurfuhr weiterlaufen! Nur eine Berührung des Rings setzt die Wurfuhr zurück',
      'Er stellt auf 14 Sekunden zurück, weil das Netz zum Korb gehört',
      'Er stellt auf 24 Sekunden zurück, weil ein Wurfversuch stattgefunden hat',
      "Er stoppt sofort das Spiel wegen eines ‚Airballs'",
    ],
    correctIndex: 0,
    explanation:
      'Das Netz oder das Spielbrett alleine reichen nicht aus: Damit die 24-Sekunden-Uhr zurückgesetzt wird, muss der Ball zwingend den Metallring berühren (oder in den Korb gehen). Der 24-Sekunden-Zeitnehmer muss also genau hinsehen und die Uhr bei einem reinen Netzstreifer gnadenlos weiterlaufen lassen!',
    ruleReference: 'DBB/FIBA Regel V – Art. 29.1.1 & Regel VIII – Art. 50.4 (Wurfuhr & Ringberührung)',
  },
  {
    id: 'q-unsportsmanlike-fastbreak',
    category: 'Fouls & Kontakt',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Spieler läuft beim Tempogegenstoß (Fastbreak) alleine auf den Korb zu – kein Verteidiger ist mehr zwischen ihm und dem Korb. Ein Verfolger foult ihn von hinten am Arm, bevor die Wurfbewegung beginnt. Was ist die Folge?',
    options: [
      'Unsportliches Foul: 2 Freiwürfe + anschließend Einwurf für die gefoulte Mannschaft im Vorfeld (mit 14 Sekunden auf der Wurfuhr)',
      'Ganz normales persönliches Foul und Einwurf an der Seitenlinie',
      "Sofortiger Platzverweis (Disqualifikation) wie bei der ‚Notbremse' im Fußball",
      'Der Korb zählt automatisch 2 Punkte ohne Freiwürfe',
    ],
    correctIndex: 0,
    explanation:
      "Kontakt von hinten oder seitlich an einem zum Korb ziehenden Spieler ohne weiteren Verteidiger zwischen ihm und dem Korb (‚Clear Path') ist bis zum Beginn der Wurfaktion ein Unsportliches Foul. Übrigens: Kassiert ein Spieler im selben Spiel ein zweites Unsportliches Foul (oder ein Unsportliches + ein Technisches Foul), wird er disqualifiziert!",
    ruleReference: 'DBB/FIBA Regel VI – Art. 37.1.1 & Art. 37.2.2 (Unsportliches Foul)',
  },
  {
    id: 'q-technical-foul-penalty',
    category: 'Schiedsrichter & Spielleitung',
    officialRole: 'Schiedsrichter',
    question:
      'Ein Spieler der angreifenden Mannschaft beschwert sich respektlos beim Schiedsrichter und kassiert ein Technisches Foul. Wie wird das Spiel danach fortgesetzt?',
    options: [
      'Die Verteidigung bekommt 1 Freiwurf – danach behält die angreifende Mannschaft aber den Ball zum Einwurf mit der verbliebenen Restzeit auf der Wurfuhr!',
      'Die Verteidigung bekommt 2 Freiwürfe UND zusätzlich Einwurf an der Mittellinie',
      'Es gibt keinen Freiwurf, sondern nur Ballverlust (Einwurf für den Gegner)',
      'Der meckernde Spieler muss für 5 Spielminuten auf die Strafbank',
    ],
    correctIndex: 0,
    explanation:
      'Früher gab es für ein Technisches Foul noch Freiwurf(e) plus Ballbesitz für den Gegner. Nach dem aktuellen Regelwerk gibt es genau 1 Freiwurf (sofort ausgeführt), und anschließend geht das Spiel mit der Mannschaft weiter, die zum Zeitpunkt der Unterbrechung den Ball hatte!',
    ruleReference: 'DBB/FIBA Regel VI – Art. 36.3.2 & Regel V – Art. 29.2.4 (Technisches Foul)',
  },
  {
    id: 'q-overtime-duration-fouls',
    category: 'Kampfgericht & Anschreiber',
    officialRole: 'Kampfgericht / Anschreiber',
    question:
      'Nach dem 4. Viertel steht es unentschieden – es geht in die Verlängerung! Wie lange dauert eine Verlängerung, und was passiert mit den Mannschaftsfouls aus dem 4. Viertel?',
    options: [
      'Die Verlängerung dauert 5 Minuten, und die Mannschaftsfouls aus dem 4. Viertel bleiben bestehen (sie werden NICHT auf null zurückgesetzt!)',
      'Die Verlängerung dauert 5 Minuten, und die Mannschaftsfouls starten wieder bei null',
      'Es werden wie im Fußball 2 × 5 Minuten mit Seitenwechsel gespielt',
      'Es gewinnt die Mannschaft, die in der Verlängerung zuerst 5 Punkte erzielt',
    ],
    correctIndex: 0,
    explanation:
      'Alle Verlängerungen gelten bezüglich der Mannschaftsfouls und der Korbs-Spielrichtung als Fortsetzung des 4. Viertels! Deshalb lässt das Kampfgericht die roten Mannschaftsfoul-Schilder stehen, falls im 4. Viertel schon 4 Teamfouls erreicht waren, und die Teams spielen weiter auf denselben Korb wie im 4. Viertel.',
    ruleReference: 'DBB/FIBA Regel IV – Art. 8.7, Art. 9.6 & Regel VII – Art. 41.1.3 (Verlängerung)',
  },
  {
    id: 'q-timer-horn-does-not-stop-play',
    category: 'Kampfgericht & Anschreiber',
    officialRole: 'Kampfgericht / Anschreiber',
    question:
      'Mitten im laufenden Angriff ertönt plötzlich versehentlich die Sirene vom Anschreibertisch (z. B. weil ein Wechsel zu früh signalisiert wurde). Alle Spieler bleiben irritiert stehen, nur ein Angreifer legt den Ball in den Korb. Zählt der Korb?',
    options: [
      'Ja, der Korb zählt! Das Signal des Zeitnehmers/Anschreibers allein stoppt weder die Spieluhr noch macht es den Ball tot – gespielt wird bis zum Schiedsrichterpfiff',
      'Nein, sobald die Hallensirene vom Tisch ertönt, ist das Spiel automatisch sofort unterbrochen',
      'Es gibt Sprungball, weil die Verteidiger durch die Sirene abgelenkt wurden',
      'Der Zeitnehmer bekommt ein Technisches Foul und der Angriff wird wiederholt',
    ],
    correctIndex: 0,
    explanation:
      "Goldene Basketballregel: ‚Play until the whistle!' (Spiele bis zum Pfiff!). Artikel 49.1 legt ausdrücklich fest, dass das akustische Signal des Anschreibertischs weder die Uhr anhält noch den Ball tot macht – erst der Pfiff eines Schiedsrichters unterbricht das laufende Spiel.",
    ruleReference: 'DBB/FIBA Regel VIII – Art. 49.1 (Pflichten des Zeitnehmers – Signal)',
  },
];

const quizState = {
  allQuestions: [],
  recentQuestionIds: [],
  currentQuestions: [],
  currentIndex: 0,
  score: 0,
  isAnswered: false,
  history: [],
};

// DOM-Referenzen
const viewStart = document.getElementById('view-start');
const viewQuiz = document.getElementById('view-quiz');
const viewResult = document.getElementById('view-result');
const srAnnouncer = document.getElementById('sr-announcer');

const btnStartQuiz = document.getElementById('btn-start-quiz');
const btnNextQuestion = document.getElementById('btn-next-question');
const btnRestartQuiz = document.getElementById('btn-restart-quiz');
const btnShareResult = document.getElementById('btn-share-result');
const themeToggleBtn = document.getElementById('theme-toggle');

const questionCounter = document.getElementById('question-counter');
const scoreCounter = document.getElementById('score-counter');
const quizProgress = document.getElementById('quiz-progress');
const questionCategory = document.getElementById('question-category');
const questionRole = document.getElementById('question-role');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const explanationBox = document.getElementById('explanation-box');
const feedbackBadge = document.getElementById('feedback-badge');
const feedbackHeadline = document.getElementById('feedback-headline');
const explanationText = document.getElementById('explanation-text');
const ruleReference = document.getElementById('rule-reference');

const resultScoreValue = document.getElementById('result-score-value');
const resultRankBadge = document.getElementById('result-rank-badge');
const resultHeadline = document.getElementById('result-headline');
const resultSubtext = document.getElementById('result-subtext');
const reviewList = document.getElementById('review-list');

/**
 * Kryptografisch gestützter Fisher-Yates Shuffle
 */
function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    let j;
    if (window.crypto?.getRandomValues) {
      const rand = new Uint32Array(1);
      window.crypto.getRandomValues(rand);
      j = rand[0] % (i + 1);
    } else {
      j = Math.floor(Math.random() * (i + 1));
    }
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Lädt den Fragenkatalog aus ./data/questions.json (mit lokalem Fallback)
 */
async function loadQuestionCatalog() {
  try {
    const response = await fetch('./data/questions.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length >= QUESTIONS_PER_ROUND) {
      quizState.allQuestions = data;
      return;
    }
  } catch {
    // Fallback auf eingebetteten Katalog (z. B. bei file:// oder Verbindungsabbruch)
  }
  quizState.allQuestions = FALLBACK_QUESTIONS;
}

/**
 * Zieht 10 zufällige Fragen und mischt deren Antwortoptionen
 */
function prepareRoundQuestions() {
  const pool = quizState.allQuestions.length > 0 ? quizState.allQuestions : FALLBACK_QUESTIONS;

  // Bevorzuge Fragen, die nicht in der direkt vorherigen Runde gestellt wurden
  const freshQuestions = pool.filter((q) => !quizState.recentQuestionIds.includes(q.id));
  const usedQuestions = pool.filter((q) => quizState.recentQuestionIds.includes(q.id));

  const selected = [
    ...shuffleArray(freshQuestions),
    ...shuffleArray(usedQuestions),
  ].slice(0, QUESTIONS_PER_ROUND);

  quizState.recentQuestionIds = selected.map((q) => q.id);

  quizState.currentQuestions = selected.map((q) => {
    const mappedOptions = q.options.map((text, idx) => ({
      text,
      isCorrect: idx === q.correctIndex,
    }));
    return {
      ...q,
      shuffledOptions: shuffleArray(mappedOptions),
    };
  });
}

/**
 * Wechselt die aktive Ansicht und setzt den Tastatur-/Screenreader-Fokus
 */
function switchView(activeView, focusTarget, pageTitle) {
  [viewStart, viewQuiz, viewResult].forEach((view) => {
    view.hidden = view !== activeView;
  });
  document.title = pageTitle;
  if (focusTarget) {
    focusTarget.focus();
  }
}

/**
 * Startet einen neuen Quiz-Durchlauf
 */
function startQuiz() {
  prepareRoundQuestions();
  quizState.currentIndex = 0;
  quizState.score = 0;
  quizState.isAnswered = false;
  quizState.history = [];

  renderCurrentQuestion(true);
}

/**
 * Rendert die aktuelle Frage
 */
function renderCurrentQuestion(isFirstQuestion = false) {
  const index = quizState.currentIndex;
  const total = quizState.currentQuestions.length;
  const question = quizState.currentQuestions[index];

  quizState.isAnswered = false;
  explanationBox.hidden = true;
  explanationBox.classList.remove('is-correct-feedback', 'is-wrong-feedback');

  questionCounter.textContent = `Frage ${index + 1} von ${total}`;
  scoreCounter.textContent = `${quizState.score} / ${total} richtig`;
  quizProgress.max = total;
  quizProgress.value = index + 1;

  questionCategory.textContent = question.category;
  questionRole.textContent = `Fokus: ${question.officialRole}`;
  questionText.textContent = question.question;

  optionsContainer.replaceChildren();

  question.shuffledOptions.forEach((opt, optIdx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.dataset.index = String(optIdx);

    const letterSpan = document.createElement('span');
    letterSpan.className = 'option-letter';
    letterSpan.setAttribute('aria-hidden', 'true');
    letterSpan.textContent = LETTERS[optIdx] ?? String(optIdx + 1);

    const contentSpan = document.createElement('span');
    contentSpan.className = 'option-content';
    contentSpan.textContent = opt.text;

    btn.append(letterSpan, contentSpan);
    btn.addEventListener('click', () => handleAnswerSelection(optIdx));
    optionsContainer.appendChild(btn);
  });

  const pageTitle = `Frage ${index + 1} von ${total} | BG BiBA Regelquiz`;
  if (isFirstQuestion || viewQuiz.hidden) {
    switchView(viewQuiz, questionText, pageTitle);
  } else {
    document.title = pageTitle;
    questionText.focus();
  }
}

/**
 * Verarbeitet die Auswahl einer Antwortoption
 */
function handleAnswerSelection(selectedIndex) {
  if (quizState.isAnswered) {
    return;
  }
  quizState.isAnswered = true;

  const question = quizState.currentQuestions[quizState.currentIndex];
  const selectedOption = question.shuffledOptions[selectedIndex];
  const isCorrect = Boolean(selectedOption?.isCorrect);

  if (isCorrect) {
    quizState.score += 1;
  }

  const total = quizState.currentQuestions.length;
  scoreCounter.textContent = `${quizState.score} / ${total} richtig`;

  const buttons = optionsContainer.querySelectorAll('.option-btn');
  buttons.forEach((btn, idx) => {
    btn.setAttribute('aria-disabled', 'true');
    const opt = question.shuffledOptions[idx];

    if (opt.isCorrect) {
      btn.classList.add('is-correct');
      const tag = document.createElement('span');
      tag.className = 'option-state-tag';
      tag.textContent = idx === selectedIndex ? '✓ Richtig' : '✓ Richtige Lösung';
      btn.appendChild(tag);
    } else if (idx === selectedIndex) {
      btn.classList.add('is-wrong');
      const tag = document.createElement('span');
      tag.className = 'option-state-tag';
      tag.textContent = '✗ Falsch';
      btn.appendChild(tag);
    }
  });

  const correctOption = question.shuffledOptions.find((o) => o.isCorrect);
  quizState.history.push({
    question: question.question,
    chosenText: selectedOption.text,
    correctText: correctOption ? correctOption.text : '',
    isCorrect,
    explanation: question.explanation,
    ruleReference: question.ruleReference,
  });

  explanationBox.classList.toggle('is-correct-feedback', isCorrect);
  explanationBox.classList.toggle('is-wrong-feedback', !isCorrect);

  if (isCorrect) {
    feedbackBadge.textContent = '✓ Richtig';
    feedbackHeadline.textContent = 'Stark! Genau richtig entschieden.';
  } else {
    feedbackBadge.textContent = '✗ Knapp daneben';
    feedbackHeadline.textContent = 'Hier liegt die Tribüne oft falsch!';
  }

  explanationText.textContent = question.explanation;
  ruleReference.textContent = `📖 Offizielle Regel: ${question.ruleReference}`;

  const isLastQuestion = quizState.currentIndex + 1 >= total;
  btnNextQuestion.textContent = isLastQuestion ? 'Zur Auswertung' : 'Nächste Frage';

  explanationBox.hidden = false;
  srAnnouncer.textContent = `${feedbackBadge.textContent}. ${feedbackHeadline.textContent} ${question.explanation}`;
}

/**
 * Liefert den passenden Auswertungstext für 0/10 bis 10/10 gemäß Vorgabe
 */
function getEvaluation(score) {
  if (score === 0) {
    return {
      rank: '😅 Tribünen-Rookie',
      headline:
        '0/10 Richtige! Versuch es gleich noch einmal, vielleicht hast du ja etwas gelernt.',
      subtext:
        'Keine Sorge: Basketball hat eines der detailliertesten Regelwerke im Weltsport. Genau deshalb machen unsere Schiedsrichter und Kampfrichter extra Lehrgänge!',
    };
  }
  if (score <= 2) {
    return {
      rank: '👀 Bauchgefühl-Coach',
      headline: `${score}/10 Richtige! Da war noch viel Bauchgefühl dabei – versuch es gleich noch einmal!`,
      subtext:
        'Man sieht: Was von der Tribüne nach einem klaren Fehlpfiff aussieht, ist im offiziellen Regelwerk oft ganz anders geregelt.',
    };
  }
  if (score <= 4) {
    return {
      rank: '🏀 Halbzeit-Theoretiker',
      headline: `${score}/10 Richtige! Ein paar Grundlagen sitzen schon, aber die Details haben es in sich.`,
      subtext:
        'Unsere Schiedsrichter und Anschreiber müssen all diese Feinheiten nicht nur kennen, sondern unter Zeitdruck live entscheiden.',
    };
  }
  if (score === 5) {
    return {
      rank: '⚖️ Solides Mittelfeld',
      headline:
        '5/10 Richtige! Das ist schon nicht schlecht, aber für den Schiri-Schein reicht es noch nicht.',
      subtext:
        'Die Hälfte sitzt! Bei den kniffligen Fällen merkt man aber schnell, wie viel Wissen hinter jedem Pfiff und jedem Signal am Tisch steckt.',
    };
  }
  if (score <= 7) {
    return {
      rank: '👏 Regel-Kenner',
      headline: `${score}/10 Richtige! Starkes Ergebnis – du hast schon ein richtig gutes Auge fürs Spiel!`,
      subtext:
        'Du lässt dich von typischen Basketball-Mythen kaum täuschen. Wie wäre es mal mit einem Blick hinter die Kulissen am Kampfrichtertisch?',
    };
  }
  if (score <= 9) {
    return {
      rank: '🔥 Kampfgericht-Kandidat',
      headline: `${score}/10 Richtige! Fast fehlerfrei – du kennst die Regeln besser als 95 % der Halle!`,
      subtext:
        'Mit diesem Regelwissen weißt du genau, wie anspruchsvoll der Job unserer Unparteiischen und Anschreiber ist.',
    };
  }
  return {
    rank: '🏆 Schiri-Versteher',
    headline:
      '10/10 Richtige! Perfekt - Du weißt wahrscheinlich ganz genau wie schwer es ist immer die richtigen Entscheidungen zu treffen.',
    subtext:
      'Volle Punktzahl! Entweder hast du selbst schon die Pfeife in der Hand gehabt – oder du bist unser nächstes Talent für Schiedsrichter & Kampfgericht bei der BG BiBA!',
  };
}

/**
 * Zeigt die Endauswertung an
 */
function showResults() {
  const score = quizState.score;
  const total = quizState.currentQuestions.length;
  const evaluation = getEvaluation(score);

  resultScoreValue.textContent = `${score}/${total}`;
  resultRankBadge.textContent = evaluation.rank;
  resultHeadline.textContent = evaluation.headline;
  resultSubtext.textContent = evaluation.subtext;

  // Rückblick-Liste aller 10 Fragen aufbauen
  reviewList.replaceChildren();
  quizState.history.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'review-item';

    const title = document.createElement('strong');
    title.textContent = `${item.isCorrect ? '✓' : '✗'} ${item.question}`;

    const answerP = document.createElement('p');
    answerP.className = 'review-item-answer';
    answerP.textContent = `Richtige Antwort: ${item.correctText}`;

    const refP = document.createElement('p');
    refP.className = 'review-item-ref';
    refP.textContent = item.ruleReference;

    li.append(title, answerP, refP);
    reviewList.appendChild(li);
  });

  switchView(
    viewResult,
    resultHeadline,
    `Auswertung: ${score}/${total} | BG BiBA Regelquiz`
  );
}

/**
 * Teilt das Quiz-Ergebnis über Web Share API oder Zwischenablage
 */
async function shareResult() {
  const total = quizState.currentQuestions.length || QUESTIONS_PER_ROUND;
  const shareText = `🏀 Ich habe ${quizState.score}/${total} Richtige beim BG BiBA Basketball-Regelquiz „Testen statt Meckern“ geschafft! Schaffst du mehr?`;
  const shareUrl = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Testen statt Meckern – BG BiBA Regelquiz',
        text: shareText,
        url: shareUrl,
      });
      return;
    } catch {
      // Nutzer hat Teilen abgebrochen oder Fallback nötig
    }
  }

  try {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    const originalText = btnShareResult.textContent;
    btnShareResult.textContent = '✓ In Zwischenablage kopiert!';
    setTimeout(() => {
      btnShareResult.textContent = originalText;
    }, 2500);
  } catch {
    // Falls Clipboard nicht verfügbar ist, nichts tun
  }
}

/**
 * Zwei-Stufen Dark-Mode-Toggle nach modern-web-guidance (dark-mode-toggle)
 */
function initThemeToggle() {
  const metaScheme = document.querySelector('meta[name="color-scheme"]');
  if (!metaScheme || !themeToggleBtn) {
    return;
  }

  themeToggleBtn.addEventListener('click', () => {
    let stored = null;
    try {
      stored = localStorage.getItem('color-scheme');
    } catch {}

    const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemScheme = systemIsDark ? 'dark' : 'light';
    const currentRendered = stored === 'dark' || stored === 'light' ? stored : systemScheme;
    const targetScheme = currentRendered === 'dark' ? 'light' : 'dark';

    try {
      if (targetScheme !== systemScheme) {
        localStorage.setItem('color-scheme', targetScheme);
        metaScheme.content = targetScheme;
      } else {
        localStorage.removeItem('color-scheme');
        metaScheme.content = 'light dark';
      }
    } catch {
      metaScheme.content = targetScheme;
    }
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'color-scheme') {
      metaScheme.content = event.newValue ?? 'light dark';
    }
  });
}

// Event-Listener registrieren
btnStartQuiz.addEventListener('click', startQuiz);

btnNextQuestion.addEventListener('click', () => {
  if (quizState.currentIndex + 1 < quizState.currentQuestions.length) {
    quizState.currentIndex += 1;
    renderCurrentQuestion(false);
  } else {
    showResults();
  }
});

btnRestartQuiz.addEventListener('click', startQuiz);
btnShareResult.addEventListener('click', shareResult);

// Initialisierung
initThemeToggle();
loadQuestionCatalog();

