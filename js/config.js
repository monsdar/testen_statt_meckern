// SPDX-License-Identifier: GPL-3.0-or-later
/**
 * ============================================================================
 * VEREINS-KONFIGURATION ("Testen statt Meckern" – Basketball-Regelquiz)
 * ============================================================================
 *
 * Ihr möchtet dieses Regelquiz für euren eigenen Basketballverein nutzen?
 * Ihr müsst KEINE HTML-, CSS- oder App-Dateien umbauen!
 *
 * Passt einfach die Werte in dieser Datei an und legt eure Vereinslogos
 * im Ordner `./assets/` ab. Dadurch könnt ihr später jederzeit mit einem
 * Klick ("Sync fork" auf GitHub) neue Regelfragen aus dem Haupt-Repository
 * übernehmen, ohne dass eure Vereinsdaten überschrieben werden.
 */

window.CLUB_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. VEREINS-IDENTITÄT & KONTAKT
  // --------------------------------------------------------------------------
  club: {
    // Kurzname des Vereins (für Header, Titel, Teilen-Text & 10/10-Auswertung)
    shortName: 'BG BiBA',

    // Vollständiger Vereinsname (für Untertitel & Footer)
    fullName: 'Basketballgemeinschaft Bierden-Bassen-Achim',

    // Optionale Zusatzzeile im Footer (z. B. Stammvereine, Abteilung oder Slogan;
    // leer lassen '', falls nicht benötigt)
    subline: 'TSV Bierden von 1928 e.V. · TSV Bassen e.V. · TSV Achim 1860 e.V.',

    // Name der Aktion / Initiative
    initiativeName: 'Testen statt Meckern',

    // Kontakt-E-Mail für Schiedsrichter- & Kampfrichter-Interessierte (Auswertungs-Screen)
    contactEmail: 'info@bgbiba.net',
  },

  // --------------------------------------------------------------------------
  // 2. VEREINSFARBEN & ERSCHEINUNGSBILD
  // --------------------------------------------------------------------------
  // Tipp: Die Textfarbe (Weiß oder Schwarz) auf euren Vereinsfarben sowie
  // abgedunkelte Hover-Farben für Buttons werden automatisch barrierefrei berechnet!
  theme: {
    // Strukturfarbe (30 %): Header, Kategorie-Badges, Sekundär-Buttons, Score-Ring
    primaryColor: '#412774',

    // Akzentfarbe (10 %): Haupt-Buttons (Call-to-Action), Fortschrittsbalken, Fokus-Rahmen
    accentColor: '#E2322A',

    // Form des Logos: '50%' für runde Logos/Wappen, '0' oder '8px' für eckige/freie Wappen
    logoBorderRadius: '50%',
  },

  // --------------------------------------------------------------------------
  // 3. VEREINSLOGOS & ICONS (Pfade relativ zur index.html)
  // --------------------------------------------------------------------------
  // Tipp: Wenn euer Verein nur eine einzige Logo-Datei (z. B. PNG/SVG mit
  // transparentem Hintergrund) nutzt, tragt einfach bei headerLogo,
  // cardLogoLight und cardLogoDark denselben Pfad ein.
  logos: {
    // Logo im farbigen Header oben links
    headerLogo: './assets/bgbiba_full_black_white.png',

    // Logo in der Schiri-Box auf der Auswertungsseite (Helles Design)
    cardLogoLight: './assets/bgbiba_full_small.png',

    // Logo in der Schiri-Box auf der Auswertungsseite (Dunkles Design)
    cardLogoDark: './assets/bgbiba_full_black_white.png',

    // Browser-Icon (Favicon)
    favicon: './assets/bgbiba_full_tiny.png',

    // Barrierefreier Alternativtext für Screenreader
    altText: 'Vereinswappen der BG BiBA',
  },

  // --------------------------------------------------------------------------
  // 4. IMPRESSUM & DATENSCHUTZ (Pflichtangaben nach § 5 DDG / DSGVO)
  // --------------------------------------------------------------------------
  // Ihr habt zwei Möglichkeiten:
  // Option A (Standard): Tragt eure Vereinsdaten direkt hier ein – sie werden
  //                      automatisch in die eingebauten Popups eingesetzt.
  // Option B:            Tragt unten bei `externalImpressumUrl` / `externalPrivacyUrl`
  //                      die Links zu eurer bestehenden Vereins-Webseite ein. Dann
  //                      öffnen die Footer-Links direkt eure vorhandene Webseite.
  legal: {
    organizationName: 'BG BiBA – Basketballgemeinschaft Bierden-Bassen-Achim',
    organizationDetails:
      'Zusammenschluss der Basketballabteilungen der Stammvereine TSV Bierden von 1928 e.V., TSV Bassen e.V. und TSV Achim 1860 e.V.',
    representativeName: 'Jörg Grüneberg',
    street: 'Am Berg 101',
    postalCodeCity: '28876 Oyten',
    email: 'info@bgbiba.net',
    phone: '', // Optional: Telefonnummer (wird nur eingeblendet, wenn ausgefüllt)
    responsiblePersonMStV: 'Jörg Grüneberg\nAm Berg 101\n28876 Oyten',
    supervisoryAuthority: 'Landesbeauftragten für den Datenschutz Niedersachsen',

    // Optional (Option B): Externe Links statt eingebauter Dialog-Popups
    externalImpressumUrl: '',
    externalPrivacyUrl: '',
  },

  // --------------------------------------------------------------------------
  // 5. ANONYME QUIZ-STATISTIK (GoatCounter – ohne Cookies, DSGVO-konform)
  // --------------------------------------------------------------------------
  // Standardmäßig fließen die anonymen Quiz-Ergebnisse (welche Regelfrage wird
  // wie oft richtig/falsch beantwortet?) in die gemeinsame Auswertung ein, damit
  // wir zu schwere oder missverständliche Fragen im Katalog gezielt verbessern
  // können. Gleichzeitig wird über den Vereins-Slug erfasst, wie viele Runden
  // pro Verein gespielt werden.
  //
  // - Eigene GoatCounter-Instanz nutzen: Eigene `endpoint`-URL eintragen
  // - Statistik komplett abschalten: `enabled: false` setzen (entfernt auch
  //   automatisch das Skript sowie Abschnitt 4 aus der Datenschutzerklärung)
  analytics: {
    enabled: true,
    endpoint: 'https://biba-regeltest.goatcounter.com/count',
    // Optionales Kürzel für die Vereins-Zuordnung in der Statistik
    // (wird automatisch aus `club.shortName` gebildet, falls leer gelassen)
    clubSlug: 'bg-biba',
  },
};

/**
 * Sofortige Initialisierung im <head> (vor dem ersten Rendern):
 * Setzt Vereinsfarben, Favicon und Seitentitel ohne "Aufblitzen" (FOUC)
 * und konfiguriert GoatCounter für die vereinsbezogene Seitenaufruf-Zählung.
 */
(function applyEarlyHeadConfig() {
  try {
    const cfg = window.CLUB_CONFIG;
    if (!cfg) return;

    const rootStyle = document.documentElement.style;
    if (cfg.theme?.primaryColor) {
      rootStyle.setProperty('--color-primary', cfg.theme.primaryColor);
    }
    if (cfg.theme?.accentColor) {
      rootStyle.setProperty('--color-accent', cfg.theme.accentColor);
    }
    if (cfg.theme?.logoBorderRadius) {
      rootStyle.setProperty('--logo-border-radius', cfg.theme.logoBorderRadius);
    }

    const shortName = cfg.club?.shortName || 'BG BiBA';
    const fullName = cfg.club?.fullName || shortName;
    const initiative = cfg.club?.initiativeName || 'Testen statt Meckern';

    document.title = `${initiative} | ${shortName} Basketball-Regelquiz`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = `10 zufällige Basketball-Regelfragen (${shortName} – ${fullName}). Teste dein Regelwissen direkt auf der Tribüne!`;
    }

    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon && cfg.logos?.favicon) {
      favicon.href = cfg.logos.favicon;
    }

    // GoatCounter vorab konfigurieren:
    // Seitenaufrufe werden unter `/club/<slug>` gezählt (ermöglicht Besucherstatistik pro Verein),
    // während Quiz-Events (`quiz/q/...`) vereinsübergreifend vergleichbar bleiben.
    if (cfg.analytics?.enabled && cfg.analytics?.endpoint) {
      const rawSlug = cfg.analytics.clubSlug || shortName;
      const slug =
        String(rawSlug)
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || 'default-club';

      window.goatcounter = {
        ...window.goatcounter,
        path: function (p) {
          const cleanPath = p && p !== '/' ? p : '';
          return `/club/${slug}${cleanPath}`;
        },
      };
    } else {
      window.goatcounter = { no_onload: true };
    }
  } catch {
    // Fehler in der Früh-Initialisierung niemals nach außen werfen
  }
})();

