# Dilemmas

An anthology of short interactive stories about professional ethics. Each story is a branching dilemma: at every step you choose between two paths, and decisions converge toward a small set of distinct endings.

## Structure

- `index.html` — markup
- `styles.css` — styles
- `dilemmas.js` — story data (one object per dilemma)
- `script.js` — generic router and rendering logic
- `.github/workflows/deploy.yml` — GitHub Pages deployment

## Running locally

Open `index.html` in a browser — no build step.

Or serve it:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Deployment

1. Push the repo to GitHub (`main` branch).
2. Repo settings: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. `deploy.yml` runs on every push to `main`.
4. Site goes live at `https://<username>.github.io/<repo>/`.

## Adding a new dilemma

Append an object to the `DILEMMAS` array in `dilemmas.js`:

```js
{
    id: 'my-dilemma',
    kicker: 'Domain · Subtopic',
    title: "The Someone's Dilemma",
    description: 'Short hook for the menu card.',
    tags: ['tag1', 'tag2'],
    estimatedMinutes: 5,
    approxSteps: 4,
    start: 'start',
    story: {
        start: {
            text: "Opening scene...",
            choices: [
                { text: "Choice A", next: "nodeA" },
                { text: "Choice B", next: "nodeB" }
            ]
        },
        // ...intermediate nodes with choices
        // ...terminal nodes (no choices) referenced by id in `endings`
    },
    endings: {
        ending_id: { title: "Ending Title", verdict: "One-line moral." }
    }
}
```

Mark in-progress entries with `comingSoon: true` to keep them as placeholders without rendering in the menu.

## Story tree shape

A dilemma is a DAG: paths can merge (a choice can lead back into a shared sub-story). This lets you get more choice points per playthrough without exploding the ending count. Typical shape: 4–7 choices per playthrough, 3 endings.
