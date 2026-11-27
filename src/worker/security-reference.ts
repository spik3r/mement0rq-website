export const securityTopics = [
  {
    id: "sql-injection",
    title: "SQL injection",
    summary: "Bind user values separately from SQL text. For identifiers such as sort columns, map input to a fixed list of SQL fragments.",
    exampleTitle: "Bind values in a D1 query",
    example: `const customer = await env.DB.prepare(
  "SELECT id, display_name FROM customers WHERE id = ?"
).bind(customerId).first();`,
    checks: [
      "Review queries for interpolation of request values into SQL text.",
      "Check that filters, pagination inputs, and bulk operations use bound values.",
      "Give the application database identity only the permissions it needs.",
    ],
  },
  {
    id: "ssrf",
    title: "Server-side request forgery",
    summary: "Build outbound requests from a fixed service origin and a validated identifier. When fetching user-provided URLs is essential, apply network egress controls and validate each redirect destination.",
    exampleTitle: "Fetch from a fixed origin",
    example: `if (!/^[a-z0-9-]{1,64}$/i.test(productId)) {
  return new Response("Invalid product ID", { status: 400 });
}
const endpoint = new URL(
  "/v1/products/" + encodeURIComponent(productId),
  "https://catalog.example.com"
);
return fetch(endpoint, { redirect: "error" });`,
    checks: [
      "Check which request fields can affect outbound hosts, ports, or schemes.",
      "Confirm that egress policy denies private, loopback, and link-local destinations where external fetching is required.",
      "Verify that the application does not forward inbound credentials to external services.",
    ],
  },
  {
    id: "xss",
    title: "Cross-site scripting",
    summary: "Use text-only DOM APIs or template escaping for untrusted text. Treat HTML, links, and JavaScript as distinct rendering contexts.",
    exampleTitle: "Render user input as text",
    example: `const comment = document.createElement("p");
comment.textContent = userComment;
commentsList.append(comment);`,
    checks: [
      "Review places that render user content as HTML and sanitize rich text with an allowlist.",
      "Validate the schemes of user-provided URLs before assigning them to links.",
      "Use Content Security Policy as an additional layer alongside safe rendering.",
    ],
  },
  {
    id: "access-control",
    title: "Access control",
    summary: "Authorize access to each object on the server. Scope reads and writes to the authenticated identity or its verified tenant membership.",
    exampleTitle: "Scope an object read to its owner",
    example: `const document = await env.DB.prepare(
  "SELECT id, title FROM documents WHERE id = ? AND owner_id = ?"
).bind(documentId, session.userId).first();

if (!document) {
  return new Response("Not found", { status: 404 });
}
return Response.json(document);`,
    checks: [
      "Apply the same ownership rules to updates, deletes, exports, and bulk routes.",
      "In application tests, verify that one signed-in user cannot read or change another user's objects.",
      "Resolve roles and tenant membership from trusted server-side session data.",
    ],
  },
] as const;
