import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.get("/static/:id", (req, res) => {
  console.log("/static");
  const dashboardId = req.params.id;
  console.log({ dashboardId });
  res.write(`<div>
  <h1>Static Dashboard Embed</h1>
  <iframe
    src="${getIframeUrl({ dashboardId })}"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>
  </div>`);
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const getIframeUrl = ({ dashboardId }: { dashboardId: string }) => {
  // you will need to install via 'npm install jsonwebtoken' or in your package.json

  var jwt = require("jsonwebtoken");

  var METABASE_SITE_URL = process.env.METABASE_SITE_URL;
  var METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY;

  var payload = {
    resource: { dashboard: dashboardId },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };
  var token = jwt.sign(payload, METABASE_SECRET_KEY);

  var iframeUrl =
    METABASE_SITE_URL +
    "/embed/dashboard/" +
    token +
    "#bordered=true&titled=true";

  return iframeUrl;
};
