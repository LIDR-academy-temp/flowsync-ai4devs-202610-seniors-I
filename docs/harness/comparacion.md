# Comparación: plan con harness vs plan sin harness (FLOW-1)

**Nota de alcance:** respondido desde los dos archivos de plan y el CLAUDE.md del repo. No se verificó el backend ni se ejecutó nada.

## 1. Archivos que propone tocar

| | Con harness | Sin harness |
|---|---|---|
| Modificar | 10: package.json, package-lock.json, vite.config.ts, tsconfig.json, tsconfig.app.json, index.css, App.tsx, main.tsx, App.css (eliminar), prompts.md | 6: package.json, vite.config.ts, tsconfig.app.json, main.tsx, App.tsx, index.css |
| Crear | 14: components.json, utils.ts, 5 componentes ui, api.ts, auth.tsx, ProtectedRoute.tsx, 3 páginas, docs/harness/comparacion.md | 14: components.json, 5 componentes ui, api.ts, auth.tsx, utils.ts, 3 páginas, RequireAuth.tsx, .env.example |
| **Total** | **24** | **20** (21 si cuenta limpiar App.css, que solo menciona en el enfoque) |

- Los dos cuentan 5 componentes ui, aunque `src/components/ui/*` queda abierto en el sin harness.
- El plan con harness dice "todos en frontend/", pero prompts.md y docs/harness/ están en la raíz.
- El sin harness no menciona package-lock.json ni tsconfig.json. El lockfile cambiará igual con `npm install`. El `tsconfig.json` raíz probablemente también necesite el alias.

## 2. Convenciones del proyecto

**Respetadas por ambos**
- No modificar el backend.
- Token `Authorization: Bearer`.
- Llamar directo a `localhost:3333` sin proxy de Vite.
- Mostrar los errores 422 por campo y la forma `{ errors: [...] }`.
- Contraseña de 8 a 32 caracteres, `passwordConfirmation` y email único.
- shadcn/ui copiado al repo (`components.json` más `src/components/ui/`).
- `npm run lint` y `npm run build` como verificación.
- No tocar `flowsync-sin-harness`.

**Solo el con harness**
- prompts.md: dice que no se reescribe y solo se añaden entradas. El sin harness no lo menciona, pero tampoco lo toca.
- Rama nueva antes de tocar código. Lo atribuye a "README/CLAUDE.md", pero el CLAUDE.md no dice nada de ramas. Además el repo ya está en `harness-agnaedig`.
- Entregables del PR según el README (`docs/harness/comparacion.md`): los incluye. El sin harness los omite.
- Contrato del backend leído en el código (`validators/user.ts`): lo cita como verificado.
- Declara `package-lock.json` como cambio esperado por dependencias nuevas. Eso no choca con la nota de no commitear churn no relacionado.

**Solo el sin harness**
- `node ace migration:run` antes de arrancar: coincide con el CLAUDE.md.
- Llama a `POST /account/logout` en el cierre de sesión, como el backend lo expone. El con harness solo limpia el token en el cliente.

**No respetadas o dudosas**
- Con harness: dice que las respuestas son `{ data: { user, token } }`, mientras el CLAUDE.md dice `{ user, token }`. Una de las dos descripciones está mal y no se verificó.
- Con harness: el logout nunca llama a `/account/logout`.
- Sin harness: añade `VITE_API_URL` y `.env.example`. El CLAUDE.md fija que el frontend llama directo a `http://localhost:3333`, así que esto es una variación no pedida, aunque con el mismo valor por defecto.
- Sin harness: deja sin verificar si la respuesta viene envuelta en `data` y lo cubre con un desenvolvedor defensivo, en lugar de confirmarlo con `curl`.

**Sobre el lado sin harness:** no había ningún CLAUDE.md escrito en su contexto. Lo que acertó viene del README y del código, no de convenciones escritas. Por eso no respeta ni incumple reglas de prompts.md, entregables o rama: no tenía dónde leerlas. Es lo que explica la diferencia de cobertura entre los dos.

## 3. Cuántas veces tuviste que intervenir
Varias veces ~10 cuando utilicé /priority-ticket, sobre todo porque calude no detectaba el Skill.

## 4. Qué te tocaría arreglar a mano antes de enseñarle eso a alguien de tu equipo.
Dominar la instalación y uso del skill de Atlassian

# Parte B #
Hasta qué pieza llegaste, y cuál te costó más de lo que esperabas. El número de la lista, y en qué se te fue el rato de verdad.
**Respuesta: En el #3. No detectaba el conector.**

La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla. Ojo, no cuál fue mejor: qué salió distinto, concretamente, y dónde estabas mirando cuando lo notaste. Si tuviste que abrir un archivo para verlo, dilo.
**Respuesta: En donde no existe harness, entro en modo de explorador.**
