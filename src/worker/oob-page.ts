import { html, raw } from "hono/html";
import { securityTopics } from "./security-reference";
import consoleScript from "./oob-console.js?raw";
import endpointsScript from "./oob-endpoints.js?raw";
import fieldReference from "./assets/field-reference.md?raw";

const screens = [
  ["Tools", "/monstera"],
  ["OOB Console", "/monstera/oob"],
  ["Endpoints", "/monstera/endpoints"],
  ["Cheatsheets", "/monstera/reference"],
  ["Protobuf", "/monstera/protobuf"],
] as const;

function page(title: string, body: ReturnType<typeof html>, client?: { nonce: string; script: string }) {
  return html`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} · mement0rq</title>
  <style>
    :root { color-scheme: dark; --bg: #1e2335; --panel: #23283d; --bar: #212844; --selected: #2f354f; --border: #3b4261; --accent: #7aa2f7; --text: #c0caf5; --muted: #a9b4df; --green: #9ece6a; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--text); font: 1rem/1.5 ui-monospace, monospace; }
    header { background: var(--bar); border-bottom: 1px solid var(--border); padding: 1rem clamp(1rem, 3vw, 2rem); }
    header, nav, .title-row, .actions, .toolbar { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
    header, .title-row { justify-content: space-between; }
    header strong { color: var(--green); letter-spacing: .15em; }
    a { color: var(--accent); }
    nav a { color: var(--muted); text-decoration: none; }
    nav a:hover, nav a[aria-current="page"] { color: var(--green); }
    :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
    main { max-width: 94rem; margin: auto; padding: clamp(1rem, 3vw, 2rem); }
    h1 { margin: .25rem 0; font-size: 1.65rem; }
    h2 { font-size: 1.05rem; }
    .eyebrow { color: var(--accent); letter-spacing: .12em; font-size: .875rem; }
    .toolbar { margin: 1rem 0; }
    .toolbar label { flex: 1 1 18rem; }
    input, button { font: inherit; color: inherit; border: 1px solid var(--border); border-radius: .3rem; padding: .5rem .7rem; }
    input { width: 100%; background: var(--bg); }
    button { background: var(--selected); cursor: pointer; }
    button:hover, button[aria-pressed="true"] { border-color: var(--accent); }
    #status, p { color: var(--muted); }
    .layout { display: grid; grid-template-columns: minmax(14rem, 28%) 1fr; gap: 1rem; }
    .card { background: var(--panel); border: 1px solid var(--border); border-radius: .5rem; padding: 1rem; overflow: auto; }
    .card h2 { margin-top: 0; }
    .card button { width: 100%; display: flex; justify-content: space-between; margin: .5rem 0; }
    .tool-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 1rem; }
    .intro { margin-bottom: 1.5rem; }
    .tool-card { display: block; color: inherit; text-decoration: none; }
    .tool-card:hover { border-color: var(--accent); }
    .tool-card:hover h2 { color: var(--green); }
    .card p:last-child { margin-bottom: 0; }
    .endpoint { display: block; background: #161a27; color: var(--accent); border-radius: .3rem; padding: .75rem; overflow-wrap: anywhere; }
    .reference-nav { align-items: stretch; flex-direction: column; gap: .5rem; }
    .reference-nav a { display: block; padding: .4rem .6rem; border-radius: .3rem; }
    .reference-nav a:hover, .reference-nav a[aria-current="true"], .reference-views a[aria-current="true"] { background: var(--selected); }
    .reference-views { margin: 1rem 0; gap: .5rem; }
    .reference-views a { border: 1px solid var(--border); border-radius: .3rem; padding: .45rem .7rem; }
    .reference-code { margin: 0; padding: 1rem; color: var(--text); background: #161a27; border-radius: .35rem; white-space: pre-wrap; overflow-wrap: anywhere; }
    .reference-section li + li { margin-top: .4rem; }
    .reference-layout { align-items: start; }
    .reference-section + .reference-section { margin-top: 1rem; }
    .workbench { display: block; width: 100%; height: max(34rem, calc(100dvh - 11rem)); border: 1px solid var(--border); border-radius: .5rem; background: var(--panel); }
    .endpoint-cards .card[hidden] { display: none; }
    .endpoint-cards .card button { width: auto; margin: .75rem 0 0; }
    .endpoint-builder { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); gap: 1rem; }
    .endpoint-cards section { margin-top: 1.5rem; }
    .endpoint-cards .endpoint { white-space: pre-wrap; }
    .field-reference { max-height: 70dvh; overflow: auto; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: .65rem; text-align: left; }
    tbody tr { border-top: 1px solid var(--border); }
    td:last-child { color: var(--green); }
    .oob-heading { margin-bottom: 1.25rem; }
    .oob-heading p { margin: .25rem 0 0; }
    .oob-toolbar { display: grid; grid-template-columns: minmax(16rem, 26rem) minmax(12rem, 1fr) auto; gap: .75rem; align-items: end; padding: 1rem; margin-bottom: 1rem; }
    .oob-toolbar form { display: flex; gap: .5rem; align-items: end; flex-wrap: nowrap; }
    .oob-toolbar form label { min-width: 0; flex: 1; }
    .oob-toolbar form button { width: auto; margin: .25rem 0 0; white-space: nowrap; }
    .oob-toolbar label { display: block; color: var(--muted); font-size: .8rem; }
    .oob-toolbar input { margin-top: .25rem; }
    .oob-layout { grid-template-columns: minmax(14rem, 24%) minmax(0, 1fr); align-items: start; }
    .oob-side, .oob-detail { min-height: 24rem; }
    .oob-side h2 { margin-bottom: .5rem; }
    .oob-side button { display: block; text-align: left; overflow-wrap: anywhere; }
    .oob-side button[aria-pressed="true"] { background: var(--selected); color: var(--accent); }
    .oob-side small { display: block; color: var(--muted); }
    .oob-side hr { border: 0; border-top: 1px solid var(--border); margin: 1rem 0; }
    .oob-detail-head { display: flex; justify-content: space-between; align-items: start; flex-wrap: wrap; gap: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
    .oob-detail-head h2 { margin: .25rem 0; color: var(--accent); overflow-wrap: anywhere; }
    .oob-detail-head .actions { gap: .5rem; }
    .oob-detail-head .actions button { width: auto; margin: 0; }
    .oob-tabs { display: flex; gap: .5rem; border-bottom: 1px solid var(--border); margin: .75rem 0 1rem; }
    .oob-tabs button { width: auto; margin: 0; border: 0; border-bottom: 2px solid transparent; border-radius: 0; background: transparent; }
    .oob-tabs button[aria-pressed="true"] { border-bottom-color: var(--accent); color: var(--accent); }
    .oob-record { margin-top: .75rem; padding: 1rem; border: 1px solid var(--border); border-radius: .5rem; background: #1b2031; }
    .oob-record-head { display: flex; align-items: center; justify-content: space-between; gap: .75rem; flex-wrap: wrap; }
    .oob-method { color: var(--green); font-weight: 700; }
    .oob-path { display: block; margin: .75rem 0; overflow-wrap: anywhere; }
    .oob-fields { display: grid; grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr)); gap: .75rem; margin: 1rem 0; }
    .oob-field-label { display: block; color: var(--muted); font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; }
    .oob-fields code { overflow-wrap: anywhere; }
    .oob-record details { border-top: 1px solid var(--border); padding: .6rem 0; }
    .oob-record summary { cursor: pointer; color: var(--muted); }
    .oob-record pre, #raw-json { white-space: pre-wrap; overflow-wrap: anywhere; }
    #raw-json { max-height: 60dvh; overflow: auto; }
    @media (max-width: 65rem) { .oob-toolbar { grid-template-columns: 1fr; } }
    @media (max-width: 48rem) { .layout { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header>
    <div><strong>MONSTERA</strong> Web Tools</div>
    <nav aria-label="Web Tools">
      ${screens.map(([label, url]) => label === title
        ? html`<a href="${url}" aria-current="page">${label}</a>`
        : html`<a href="${url}">${label}</a>`)}
      <a href="/">mement0rq</a>
    </nav>
  </header>
  <main>${body}</main>
  ${client ? html`<script type="module" nonce="${client.nonce}">${raw(client.script)}</script>` : ""}
</body>
</html>`;
}

export function consolePage(nonce: string) {
  return page("OOB Console", html`
    <div class="title-row oob-heading">
      <div><div class="eyebrow">CALLBACK EVIDENCE</div><h1>Requests</h1><p>Review requests recorded by the collector.</p></div>
      <div class="actions">
        <button id="poll" aria-pressed="false">Enable polling (90s)</button>
        <button id="refresh">Refresh</button>
      </div>
    </div>
    <div class="card oob-toolbar">
      <form id="token-form" class="actions" method="post" action="/monstera/oob/lookup">
        <label>Callback token <input id="callback-token" name="token" autocomplete="off" placeholder="Paste a collector callback token"></label>
        <button type="submit">Load token</button>
      </form>
      <label>Filter requests <input id="filter" type="search" placeholder="Path, method, header, or body hash"></label>
      <span id="status" role="status">Loading hits…</span>
    </div>
    <div class="layout oob-layout">
      <aside class="card oob-side">
        <h2>Recent tokens</h2><div id="recent-tokens"><p>Load a token to start.</p></div>
        <hr><h2>Protocols</h2><div id="protocols"></div>
      </aside>
      <article class="card oob-detail">
        <div class="oob-detail-head">
          <div><div class="eyebrow">SELECTED TOKEN</div><h2 id="selected-token">No token selected</h2><span id="selected-summary">Load a token to see its requests.</span></div>
          <div class="actions"><button id="copy-token" disabled>Copy token</button><button id="copy-url" disabled>Copy callback URL</button><button id="export-json" disabled>Export JSON</button></div>
        </div>
        <div class="oob-tabs"><button id="details-tab" aria-pressed="true">Request details</button><button id="raw-tab" aria-pressed="false">Raw JSON</button><button id="copy-headers" disabled>Copy headers</button></div>
        <p id="empty" hidden>No matching hits.</p>
        <div id="records"></div><pre id="raw-json" hidden></pre>
      </article>
    </div>`, { nonce, script: consoleScript });
}

const tools = [
  ["OOB Console", "/monstera/oob", "Review recorded callbacks by protocol and UTC timestamp."],
  ["Endpoints", "/monstera/endpoints", "Open the console or view the JSON response."],
  ["Cheatsheets", "/monstera/reference", "Browse secure code examples, review checks, and viewer help."],
  ["Protobuf", "/monstera/protobuf", "Encode and decode protobuf messages in the browser."],
] as const;

export function toolsPage() {
  return page("Tools", html`
    <h1 class="intro">Web Tools</h1>
    <div class="tool-grid">
      ${tools.map(([label, url, detail]) => html`
        <a class="card tool-card" href="${url}"><h2>${label}</h2><p>${detail}</p></a>`)}
    </div>`);
}

export function endpointsPage(nonce: string) {
  const endpoints = [
    ["Callbacks", "Generic callback", "/oob/{token}", "Use in SSRF, webhook, import, or server-side fetch fields."],
    ["Callbacks", "Image callback", "/oob/{token}.gif", "Use for image fetchers, Markdown, avatars, and media proxy tests."],
    ["Callbacks", "Script callback", "/oob/{token}.js", "Use for script loaders and remote JavaScript references."],
    ["Redirects", "Single redirect", "/redirect/{token}?to={target}&status=302", "Redirect to a controlled destination."],
    ["Redirects", "Three-hop redirect", "/redirect-chain/{token}?to={target}&hops=3&status=302", "Check redirect following at each hop."],
    ["Responses", "Custom JSON response", "/respond/{token}?status=200&content_type=application%2Fjson&body=%7B%22ok%22%3Atrue%7D", "Return a small controlled JSON body."],
    ["Responses", "Delayed response", "/delay/{token}?ms=1000&status=200", "Test timeout and asynchronous fetch behaviour."],
    ["Payloads", "JSONP callback", "/json/{token}?callback=probe", "Test JSONP callback handling."],
    ["Payloads", "JavaScript callback", "/js/{token}?callback=probe", "Return JavaScript from a tokenized URL."],
  ] as const;
  const groups = [...new Set(endpoints.map(([group]) => group))];

  return page("Endpoints", html`
    <div class="intro"><h1>Endpoints and example payloads</h1><p>Build and copy collector URLs. These examples do not send a request until you use them.</p></div>
    <div class="card endpoint-builder">
      <label>Collector origin <input id="endpoint-origin" type="url" value="https://hooks.mement0rq.com"></label>
      <label>Callback token <input id="endpoint-token" value="recon-callback-change-me"></label>
      <label>Redirect target <input id="endpoint-target" type="url" value="https://example.com/"></label>
    </div>
    <div class="toolbar">
      <label>Filter endpoints <input id="endpoint-filter" type="search" placeholder="Name, path, or description"></label>
    </div>
    <section><h2>Private viewer routes</h2>
      <p><a href="/monstera/oob">OOB Console</a> · <a href="/monstera/oob/hits">Hit records JSON</a></p>
    </section>
    <div class="endpoint-cards">
      ${groups.map((group) => html`<section>
        <h2>${group}</h2>
        <div class="tool-grid">${endpoints.filter(([name]) => name === group).map(([, title, path, detail]) => html`
          <article class="card" data-endpoint data-template="${path}">
            <h3>${title}</h3><p>${detail}</p>
            <code class="endpoint" data-url></code>
            <button type="button" data-copy-url aria-label="Copy ${title} URL">Copy full URL</button>
          </article>`)}</div>
      </section>`)}
    </div>
    <p id="endpoint-empty" hidden>No endpoints match this filter.</p>
    <p id="endpoint-status" role="status"></p>`, { nonce, script: endpointsScript });
}

export function referencePage(topicId?: string, view?: string) {
  const fieldTopics = fieldReference.split(/^## /m).slice(1).map((section, index) => {
    const [title, ...lines] = section.split("\n");
    return { id: `field-${index + 1}`, title: title.trim(), content: lines.join("\n").trim() };
  });
  const fieldTopic = fieldTopics.find(({ id }) => id === topicId) ?? (topicId ? undefined : fieldTopics[0]);
  const topic = securityTopics.find(({ id }) => id === topicId) ?? securityTopics[0];
  const viewer = topicId === "viewer";
  const markdown = view === "markdown" && !viewer;
  const topicURL = (id: string) => `/monstera/reference?topic=${id}`;
  return page("Cheatsheets", html`
    <h1 class="intro">Recon Cheatsheets</h1>
    <nav class="reference-views" aria-label="Reference format">
      <a href="${topicURL(viewer ? "viewer" : fieldTopic?.id ?? topic.id)}" aria-current="${markdown ? "false" : "true"}">Guide catalogue</a>
      <a href="/monstera/reference?view=markdown" aria-current="${markdown ? "true" : "false"}">Full Markdown reference</a>
    </nav>
    <div class="layout reference-layout">
      <nav class="card reference-nav" aria-label="Reference topics">
        ${fieldTopics.map(({ id, title }) => html`
          <a href="${topicURL(id)}${markdown ? "&view=markdown" : ""}" aria-current="${!viewer && id === fieldTopic?.id ? "true" : "false"}">${title}</a>`)}
        <strong>Defensive checks</strong>
        ${securityTopics.map(({ id, title }) => html`
          <a href="${topicURL(id)}${markdown ? "&view=markdown" : ""}" aria-current="${!viewer && !fieldTopic && id === topic.id ? "true" : "false"}">${title}</a>`)}
        <a href="${topicURL("viewer")}" aria-current="${viewer ? "true" : "false"}">OOB viewer help</a>
      </nav>
      <div>
        ${viewer ? html`
        <section class="card reference-section" id="refreshing">
          <h2>Refreshing hits</h2>
          <p><strong>Refresh</strong> fetches records once. <strong>Enable polling</strong> refreshes every 90 seconds until paused or the page is reloaded.</p>
        </section>
        <section class="card reference-section" id="reading">
          <h2>Reading records</h2>
          <p>Filter by protocol or UTC timestamp. The console lists the newest hits first.</p>
        </section>
        <section class="card reference-section" id="sources">
          <h2>Data sources</h2>
          <p><strong>Load token</strong> reads that callback's public metadata from the collector. <strong>Live feed</strong> reads a configured HTTPS feed. <strong>Snapshot</strong> reads saved records. Cloudflare request events appear separately in Workers Observability.</p>
        </section>
        ` : html`
          <article class="card reference-section">
            <h2>${markdown ? "Full field reference" : fieldTopic?.title ?? topic.title}</h2>
            ${markdown
              ? html`<p>The complete Monstera field reference is shown below.</p><pre class="reference-code field-reference"><code>${fieldReference}</code></pre>`
              : fieldTopic ? html`<pre class="reference-code"><code>${fieldTopic.content}</code></pre>` : html`
                <p>${topic.summary}</p>
                <h3>${topic.exampleTitle}</h3>
                <pre class="reference-code"><code>${topic.example}</code></pre>
                <h3>Review checks</h3>
                <ul>${topic.checks.map((check) => html`<li>${check}</li>`)}</ul>`}
          </article>`}
      </div>
    </div>`);
}

export function protobufPage() {
  return page("Protobuf", html`
    <h1 class="intro">Protobuf Workbench</h1>
    <iframe class="workbench" title="Protobuf Workbench editor" src="/monstera/protobuf/workbench"
      sandbox="allow-scripts allow-downloads"></iframe>`);
}
