import { Hono } from "hono";
import jwt from "jsonwebtoken";
import { MB_BASE_URL, METABASE_SECRET_KEY } from "./env";

const staticRoutes = new Hono();

const getIframeUrl = ({
  dashboardId,
  bordered,
  theme,
  titled,
  tab,
}: {
  dashboardId: number;
  bordered: boolean;
  theme: "light" | "night" | " transparent" | string;
  titled: boolean;
  tab?: string;
}) => {
  const payload = {
    resource: { dashboard: dashboardId },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl =
    MB_BASE_URL +
    "/embed/dashboard/" +
    token +
    `${tab ? `?tab=${tab}` : ""}` +
    `#${
      theme == "light" ? "" : `theme=${theme}&`
    }bordered=${bordered}&titled=${titled}`;

  return iframeUrl;
};

staticRoutes.get("/:id", (c) => {
  console.log("/static");
  const dashboardId = Number(c.req.param("id"));
  const bordered = (c.req.query("bordered") || "true") === "true";
  const titled = (c.req.query("titled") || "true") === "true";
  const theme = c.req.query("theme") || "light";
  const tab = c.req.query("tab");

  const page_color = c.req.query("page_color") || "ffffff";
  console.log({ dashboardId });
  const url = getIframeUrl({
    dashboardId,
    bordered,
    theme,
    titled,
    tab,
  });
  return c.html(
    <div>
      <h1>Static Dashboard Embed</h1>
      <style>{`body { background-color: #${page_color};}`}</style>
      <pre>
        {JSON.stringify({
          bordered,
          theme,
          dashboardId,
          titled,
          tab,
          page_color,
        })}
      </pre>
      <a style={{ wordBreak: "break-all" }} href={url}>
        {url}
      </a>
      <br />
      <br />
      <iframe
        src={url}
        frameborder="0"
        style="position: absolute; height: 100%; width:99%; border: none; "
        allowTransparency
      ></iframe>
    </div>
  );
});

export { staticRoutes };
