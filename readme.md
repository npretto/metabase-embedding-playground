# playground for embedding metabase

## instructions for basic functionality

Populate .env with values of your MB instance.
Pro tip: you can set the following ENVS on your MB instance to make sure embedding is always enabled and keep keys the same if you nuke the db:

```
MB_EMBEDDING_SECRET_KEY=...
MB_JWT_SHARED_SECRET=...
MB_JWT_ENABLED=true
MB_JWT_IDENTITY_PROVIDER_URI="http://localhost:8001/sso"
MB_ENABLE_EMBEDDING=true
MB_EMBEDDING_APP_ORIGIN=http://localhost:8001
MB_JWT_GROUP_MAPPINGS='{"admin": [2]}'
MB_JWT_GROUP_SYNC=true
```

## instructions for same domain

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
