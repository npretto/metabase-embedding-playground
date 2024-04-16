import dotenv from "dotenv";
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { staticRoutes } from "./static";
import { ssoRoutes } from "./sso";
import { interactiveRoutes } from "./interactive";

import * as ENV from "./env";

dotenv.config();

const app = new Hono();

serve({
  fetch: app.fetch,
  port: ENV.PORT,
});

app.get("/", (c) => {
  return c.html(
    <div>
      <h1>Embedding playground</h1>
      <h2>ENV:</h2>
      <pre>{JSON.stringify(ENV, null, 2)}</pre>
      <h2>ROUTES:</h2>
      <pre>
        {`
/static/:id
/interactive/:id
/sso`}
      </pre>
    </div>
  );
});

app.route("/static", staticRoutes);

app.route("/sso", ssoRoutes);

app.route("/interactive", interactiveRoutes);
