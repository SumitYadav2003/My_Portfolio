# Sumit Yadav — Portfolio

A single-page portfolio site. Plain HTML/CSS/JS — no build step, no framework, no dependencies to install.

## Structure

```
portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── images/
│   ├── profile.png
│   ├── culinaai/        (4 screenshots)
│   └── carverse/        (4 screenshots)
├── files/
│   └── Sumit-Yadav-CV.pdf
└── README.md
```

## Run it locally

No build tools needed. Easiest option:

1. Open this folder in VS Code.
2. Install the **"Live Server"** extension (by Ritwick Dey) from the Extensions panel.
3. Right-click `index.html` → **"Open with Live Server"**.
4. It opens in your browser at `http://127.0.0.1:5500` and reloads automatically whenever you save a change.

Alternative without VS Code: just double-click `index.html` — it'll open directly in your browser. A couple of things (like the theme toggle remembering your choice) work fine this way; nothing here requires a server to function.

## Still to do before this goes live

- [ ] PlaceNexus is intentionally left off the site for now — re-add later, following the same pattern as the CulinaAI/Carverse project blocks
- [ ] If you want your phone number on the site too (it's already on the downloadable CV), add it to the Contact section — left off for now since a phone number on a public page is easier to scrape than one inside a PDF someone has to actively download

## Deploying (Vercel + GitHub)

See the step-by-step instructions in chat — short version:
1. Push this folder to a new GitHub repo
2. Import that repo in Vercel
3. Deploy — no configuration needed, it's a static site
