# Lang Tutor

A Nuxt 4 application with Nitro server routes, Pinia, Tailwind CSS 4, Sera-style
shadcn-vue components, and installable PWA metadata.

## Setup

```sh
pnpm install
```

## Development

```sh
pnpm dev
```

Nuxt registers files in `server/api/` under `/api` and files in `server/routes/`
without that prefix. For example, `server/api/health.get.ts` is available at
`GET /api/health`.

## Validation

```sh
pnpm type-check
pnpm lint
pnpm build
```

## Production

The default build targets a Node server:

```sh
pnpm build
node .output/server/index.mjs
```

Serve the application over HTTPS in production so browsers can install it. The
generated service worker precaches versioned frontend assets while page navigation
and API data continue to use the Nuxt server.
