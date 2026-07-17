# Tic Tac Toe

A browser Tic Tac Toe game — [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe) JavaScript course project. Vanilla JS, no frameworks, no build step.

**Live:** _(added once GitHub Pages is enabled)_

## Run it locally

Clone the repo and open `main.html` in a browser. That's it — no install, no server.

## How it's built

- `GameBoard` and `GameController` are both the [module pattern](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures) (an IIFE returning one object) — each needs exactly one instance with private internal state, so there's no reason to reach for a constructor.
- `render()` re-reads `GameBoard`'s state and syncs it to the DOM after every move; the game doesn't keep any UI state of its own.

**One tradeoff:** `checkWinner()` returns an object (`{ message, line }`) instead of a bare string. A bare string was enough for win/tie detection alone, but the winning-line highlight feature needed to know *which three cells* won — bundling both into one return value meant every existing caller only had to change `result` → `result.message`, instead of adding a second function that re-scans the board to find the same triplet again.

## Tech

HTML, CSS, vanilla JavaScript. No dependencies.
