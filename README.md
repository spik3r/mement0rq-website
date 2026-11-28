# mement0rq website

The React site uses one [site model and Foundry diagram workflow](docs/model/README.md)
for navigation, article data and generated views.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/templates/tree/main/vite-react-template)

This template provides a minimal setup for building a React application with TypeScript and Vite, designed to run on Cloudflare Workers. It features hot module replacement, ESLint integration, and the flexibility of Workers deployments.

![React + TypeScript + Vite + Cloudflare Workers](https://imagedelivery.net/wSMYJvS3Xw-n339CbDyDIA/fc7b4b62-442b-4769-641b-ad4422d74300/public)

<!-- dash-content-start -->

🚀 Supercharge your web development with this powerful stack:

- [**React**](https://react.dev/) - A modern UI library for building interactive interfaces
- [**Vite**](https://vite.dev/) - Lightning-fast build tooling and development server
- [**Hono**](https://hono.dev/) - Ultralight, modern backend framework
- [**Cloudflare Workers**](https://developers.cloudflare.com/workers/) - Edge computing platform for global deployment

### ✨ Key Features

- 🔥 Hot Module Replacement (HMR) for rapid development
- 📦 TypeScript support out of the box
- 🛠️ ESLint configuration included
- ⚡ Zero-config deployment to Cloudflare's global network
- 🎯 API routes with Hono's elegant routing
- 🔄 Full-stack development setup
- 🔎 Built-in Observability to monitor your Worker

Get started in minutes with local development or deploy directly via the Cloudflare dashboard. Perfect for building modern, performant web applications at the edge.

<!-- dash-content-end -->

## Getting Started

To start a new project with this template, run:

```bash
npm create cloudflare@latest -- --template=cloudflare/templates/vite-react-template
```

A live deployment of this template is available at:
[https://react-vite-template.templates.workers.dev](https://react-vite-template.templates.workers.dev)

## Development

Install dependencies:

```bash
npm install
```

Start the development server with:

```bash
npm run dev
```

Your application will be available at [http://localhost:5173](http://localhost:5173).

## Production

Build your project for production:

```bash
npm run build
```

Preview your build locally:

```bash
npm run preview
```

Deploy your project to Cloudflare Workers:

```bash
npm run build && npm run deploy
```

Monitor your workers:

```bash
npx wrangler tail
```

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/)
- [Hono Documentation](https://hono.dev/)

## Private OOB hit viewer

Open `/monstera` over HTTPS and sign in through the browser prompt. The Worker
requires the `OOB_VIEW_USERNAME` and `OOB_VIEW_PASSWORD` secrets. Use a
unique, randomly generated password. For local development use an ignored
`.dev.vars` file. In production set the values in Worker Secrets.

For a collector callback, paste its token into `/monstera/oob` and select
**Load token**. The Worker fetches public, token-scoped metadata from
`https://hooks.mement0rq.com/oob/hits` and shows the method, path, time,
header names, content type, body size, and body hash. Request cards include
filtering, a sanitized JSON view, copy actions, and export. Recent tokens are
kept only in the current browser page.
The token stays out of the browser URL and is not stored. Refresh or enable
polling to check that token again. The collector must retain the hit in its
OOB storage; this lookup does not read Cloudflare request logs.

To show routine header values and additional request metadata, set the
`OOB_COLLECTOR_ADMIN_TOKEN` Worker secret to the collector's admin token.
The Worker then calls `/oob/admin/hits` server-side. It sends only a short
allowlist of routine header values to the browser; credential, cookie, token,
and other header values stay redacted or unavailable. The browser never
receives the admin token or stored body previews.

For a separate global feed, set `OOB_HITS_FEED_URL` to an HTTPS endpoint serving the
timestamp and protocol JSON below. If it uses bearer authentication, set
`OOB_HITS_FEED_TOKEN` as a Worker secret. The Worker reads up to 500 records
and 128 KiB per response and rejects redirects. The browser never receives
the feed URL or token. The console loads once on entry, then waits for a
manual refresh or the user to enable polling every 90 seconds.

If the feed URL is unset, the viewer reads the optional `OOB_HITS_SNAPSHOT`
secret as a small static snapshot. Use ISO 8601 timestamps with a timezone
and one of HTTP, HTTPS, DNS, or SMTP.

```json
[
  { "timestamp": "2026-11-27T03:45:00Z", "protocol": "HTTP" }
]
```

Tools, Endpoints, Cheatsheets, Protobuf, and the hit JSON route all share the
console login under `/monstera`. The OOB Console is at `/monstera/oob`. The bundled Protobuf page comes from
`tools/protobuf-workbench/protobuf-workbench.html` in Monstera and runs in a
browser sandbox without network access.
