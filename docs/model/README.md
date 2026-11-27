# Site model and generated views

The [site model](../../src/react-app/site-model.json) is the source for route
paths, navigation, headings, client-side page metadata and the article index.
A draft has no route or link; publishing requires a matching page and dated
article record. React still owns page bodies and visual components.

The same model supplies two diagram inputs and a browser acceptance inventory.
No step infers behaviour from React or asks AI to draw the diagrams.

- [Architecture](rendered/architecture/diagram.svg): the browser, Cloudflare
  static assets and the React application.
- [Read an article](rendered/sequence-ReadArticle/diagram.svg): loading the
  shell, opening the blog, reading an article and returning to the index.
- [Browser cases](acceptance.json): index metadata, ordered published routes,
  dates and unlinked drafts. The runner uses this file, not React modules.

The Hono endpoints are not involved in these journeys. The browser check
serves the built client locally with SPA fallback. It does not certify
Cloudflare routing, the Worker, APIs or SEO rendering.

## From model change to reviewed evidence

1. Edit the site model. Add the React view for a new route. If deliberately
   changing an existing public URL, review the independent baseline in the
   [acceptance runner](../../scripts/verify-site-acceptance.mjs) separately.
2. Run `npm ci`, then `npm run model:generate` and `npm test`. The normal
   site build also refuses stale inputs.
3. Use Go 1.27.4 and a clean Foundry checkout at the revision in
   [foundry.json](../../foundry.json). Build the shared entry point from that
   checkout's `modeling/foundrygen` directory:

   ```sh
   go build -o /tmp/foundrygen ./cmd/foundrygen
   ```

   From the site root, replace `/path/to/foundry` with that checkout:

   ```sh
   /tmp/foundrygen plan --project . --foundry /path/to/foundry
   /tmp/foundrygen generate --project . --foundry /path/to/foundry
   /tmp/foundrygen check --project . --foundry /path/to/foundry
   ```

   Review the diagrams and commit their generated bundles. Never hand-edit
   SVGs or manifests. The older direct-render script remains available.
4. Build the app and run browser acceptance:

   ```sh
   npx playwright install chromium --only-shell
   npm run model:accept
   ```

   The runner starts a local-only preview on port 4173. Alternatively set
   `CHROMIUM_EXECUTABLE` to a compatible browser binary already installed.
   It checks the actual index and deep links, rendered headings and browser
   metadata, article dates, return links, independent article body headings,
   and draft captions that are not links.

The ordinary website build needs neither Go nor a browser. A passing
Foundry check proves diagram consistency, while acceptance checks the
rendered app. They are separate checks.

To exercise the negative control in a throwaway checkout, append an incorrect
suffix to the link target in the React blog index without changing the model.
The site should still build, but `npm run model:accept` must fail on the actual
rendered article links. Revert the deliberate edit afterward.
