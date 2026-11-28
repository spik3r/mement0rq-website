import { Hono } from "hono";
import oob from "./oob";

const app = new Hono();

app.route("/monstera", oob);

app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

export default app;
