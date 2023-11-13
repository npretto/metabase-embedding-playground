# playground for embedding metabase

## instructions

### Add the entries to /etc/hosts

```
127.0.0.1 metabase.local metabase.company.local company.local dashboard.company.local
```

### start caddy

`docker compose up`

Caddy will create a root certificate that it will use to enable https on the reverse proxy, you should see 4 fils in `certs/`

### install the certificate

Open "keychain access", go to "login", drag and drop `certs/root.crt` there.
Double click it, trust > "When using this certificate: _always trust_"

### start metabase

`yarn dev` doesn't work well behind a reverse proxy with https (for now)

- build:hot uses a websocket that by default uses http and is therefore blocked by the browser
- same thing for clojure hot

Manually start the backend with `clojure -M:run` and the frontend "yarn build-watch:js"
or run them together with concurrently `yarn concurrently -n 'BE,FE' 'clojure -M:run' 'yarn build-watch:js'`

_Note_: you will have to manually reload the page after a change

You should now be able to open metabase.local or metabase.company.local an see metabase running

## useful things

`caddy fmt --overwrite` to format the caddyfile (requires `brew install caddy`)
