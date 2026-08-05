KultureKatta lint fix

Replace the matching files in your current project with the files in this patch.
Then run:

npm run lint
npm run build

Fixes included:
- CookieBanner: removes synchronous setState calls from the effect and reads cookie consent through useSyncExternalStore.
- Five forms: moves Date.now() out of render and initializes the anti-spam timer after mount.
