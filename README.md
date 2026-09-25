# KGS Kfz-Gutachter München — Refonte du site

Refonte moderne et responsive du site `kfz-gutachten-smida-muenchen.de` (archive : `smida_archive`).
Site 100 % statique : HTML + 1 CSS + 1 petit JS vanilla. Aucun framework, aucun build.

## Structure

```
index.html                  Accueil (hero, trust bar, bento services, FAQ + schema.org)
leistungen.html             Vue d'ensemble des prestations + tarifs (149–249 €, 0 €, ab 149 €)
haftpflichtgutachten.html   Expertise responsabilité civile (ex "elementor-6011")
kostenvoranschlag.html      Kurzgutachten & Kostenvoranschlag
fahrzeugbewertung.html      Évaluation de véhicule
ueber-uns.html              À propos + processus de travail
kontakt.html                Contact (formulaire, WhatsApp, coordonnées)
impressum.html              ⚠ Placeholder — compléter les mentions légales obligatoires
datenschutz.html            ⚠ Placeholder — faire valider juridiquement
assets/css/style.css        Design system complet (tokens, composants)
assets/js/main.js           Menu mobile, reveal au scroll, compteurs, formulaire → mailto
assets/img/                 Toutes les images de l'ancien site, renommées proprement
robots.txt, sitemap.xml     SEO
```

## Design

- **Typographie** : Archivo (Google Fonts, variable — titres étendus/gras, corps normal).
- **Couleurs** : bleu signalisation `#0b5fbe`, asphalte `#12161d`, papier `#f2f4f7`,
  jaune hazard `#ffc400` en micro-doses (soulignement du hero). Tokens dans `:root`.
- **Mobile-first** : barre CTA sticky en bas (Anrufen / WhatsApp / Termin), menu latéral,
  cibles tactiles ≥ 44 px, `prefers-reduced-motion` respecté, aucun overflow horizontal.
- **SEO** : un `<h1>` par page, meta descriptions, Open Graph, canonical,
  schema.org `LocalBusiness` + `FAQPage` sur l'accueil, sitemap.

## ⚠ À faire avant mise en ligne

1. **Formulaires** : actuellement ils ouvrent le client e-mail du visiteur (mailto pré-rempli).
   Pour un envoi réel côté serveur, brancher un service (Web3Forms, Formspree, FormSubmit)
   ou une fonction serverless — voir `data-mailto` dans les `<form>` et le gestionnaire dans `main.js`.
2. **Impressum / Datenschutz** : compléter (l'ancien site n'en avait pas — obligation légale en Allemagne).
3. Vérifier le numéro de téléphone affiché : `0155 11322674` (`tel:+4915511322674`), repris de l'ancien site.

## Contenu

Tout le contenu allemand de l'ancien site a été repris mot pour mot (extraction page par page),
avec uniquement : correction des coquilles (Reparatur, unverbindliche, Haftpflicht-Gutachten…),
normalisation des coordonnées (une page de l'ancien site contenait un ancien téléphone/e-mail
de template : +49 176 75 87 46 32 / info@kgf-gutachten.de — remplacés par les coordonnées officielles),
et remplacement des médias non archivés (vidéo d'atelier, animation Lottie, portrait) par des
images existantes. La vidéo de fond de l'ancienne page Leistungen est devenue une bande image.

## Aperçu local

```bash
cd smida_nouveau && python3 -m http.server 8642
# puis http://localhost:8642
```
