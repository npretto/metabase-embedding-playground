import { Hono } from "hono";
import { BASE_URL, MB_BASE_URL } from "./env";

const interactiveRoutes = new Hono();

interactiveRoutes.get("/:id", (c) => {
  console.log("/interactive/:id");
  const dashboardId = Number(c.req.param("id"));
  console.log({ dashboardId });
  const iframeStartingUrl =
    `${BASE_URL}/sso?return_to=` +
    encodeURIComponent(
      `${MB_BASE_URL}/dashboard/1-dashboard-with-tabs-with-long-names?tab=1-tab-1`
    );
  return c.html(
    <div>
      <h1>Dynamic Dashboard Embed</h1>
      <pre>base url: {MB_BASE_URL}</pre>
      <pre>iframeStartingUrl: {iframeStartingUrl}</pre>
      <iframe
        src={iframeStartingUrl}
        style="position: absolute; height: 100%; width:99%; border: none; border: 2px solid red"
        allowtransparency
      ></iframe>
    </div>
  );
});

// const getSSOIframeUrl = (user: User, url: string) => {
//   return `http://localhost:8000/jwt-login?return_to=${urlencoded()}`;
// };

export { interactiveRoutes };
