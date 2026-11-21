import { defineConfig } from '@foadonis/openapi'

export default defineConfig({
  ui: 'scalar',
  document: {
    info: {
      title: 'FlowSync API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        // El guard `api` de config/auth.ts: access tokens opacos en `Authorization: Bearer`.
        bearer: { type: 'http', scheme: 'bearer' },
      },
    },
  },
})
