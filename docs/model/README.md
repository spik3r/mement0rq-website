# Site model and generated views

The [site model](../../src/react-app/site-model.json) is the source for route
paths, navigation, headings, client-side page metadata and the article index.
A draft has no route or link; publishing requires a matching page and dated
article record. React still owns page bodies and visual components.

The same model includes the site's logical components and directed
dependencies, plus authored steps for the article-reading journey. The
projector uses the shared IDs and real page paths. It does not infer behaviour
from source code or generate the sequence with AI.

- [Architecture](rendered/architecture/diagram.svg): the browser, Cloudflare
  static assets and the React application.
- [Read an article](rendered/sequence-ReadArticle/diagram.svg): loading the
  shell, opening the blog, reading an article and returning to the index.

The existing Hono demo endpoint is not involved in this journey. The model
does not claim to describe all Cloudflare infrastructure or SEO rendering.

## Change and check it

1. Edit the site model. Add the corresponding React view for a new route.
2. Run `npm run model:generate` to update the Foundry input JSON, then
   `npm test` and `npm run build`. The site build refuses stale inputs.
3. Build `diagramgen` from the exact
   [Foundry #191 merge](https://github.com/spik3r/clanker-foundry/commit/1418f44fd49631101d879bd95cdbd255898d355e)
   with Go 1.27.4, from Foundry's `modeling/diagram` directory:

   ```sh
   go build -o /tmp/diagramgen ./cmd/diagramgen
   ```

4. From the site root, run `bash scripts/render-model-views.sh --write /tmp/diagramgen`,
   inspect the diagrams, then run
   `bash scripts/render-model-views.sh --check /tmp/diagramgen`.
   Commit each regenerated bundle; never hand-edit SVGs or manifests.

The ordinary website build does not need Go or a Foundry checkout. The
versioned input and the explicit projection are a small site-local pilot,
not yet a new general-purpose Foundry schema. No BPMN process, UML class
inference or deployment changes are part of this pilot.
