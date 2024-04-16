import { Hono } from "hono";
import jwt from "jsonwebtoken";
import { MB_BASE_URL, METABASE_JWT_SECRET } from "./env";

type User = {
  email: string;
  first_name: string;
  last_name: string;
  groups: string[];
};
const USERS: User[] = [
  {
    email: "admin1@example.org",
    first_name: "Admin1",
    last_name: "(JWT)",
    groups: ["admin"],
  },
  {
    email: "normaluser+jwt@example.org",
    first_name: "Normal",
    last_name: "(JWT)",
    groups: ["Engineer", "People"],
  },
];

const ssoRoutes = new Hono();

ssoRoutes.get("/", (c) => {
  console.log("/jwt-login");
  const returnTo = c.req.query("return_to") || MB_BASE_URL;
  const jwtToken = jwt.sign(USERS[0], METABASE_JWT_SECRET);
  console.log("jwtToken", jwtToken);

  return c.html(
    <div>
      <h1>JWT Login</h1>
      <pre>returnTo={returnTo}</pre>
      <ul>
        {USERS.map((user) => (
          <a href={getSSOUrl(user, returnTo)}>
            <li>
              {user.first_name} {user.last_name} - {user.email}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
});

const getSSOUrl = (user: User, url: string) => {
  const jwtToken = jwt.sign(
    {
      ...user,
      exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
    },
    METABASE_JWT_SECRET
  );

  console.log("jwtToken", jwtToken);

  return MB_BASE_URL + "/auth/sso" + "?jwt=" + jwtToken + "&return_to=" + url;
};

export { ssoRoutes };
