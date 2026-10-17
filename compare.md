# Comparativa con harness y sin harness

## Qué archivos propone tocar

### Con harness

**Setup (frontend/)**

- `package.json`
- `vite.config.ts`
- `src/index.css`
- `.env.example`

**Código de la aplicación (frontend/src/)**

- `lib/api.ts`
- `lib/errors.ts`
- `auth/AuthContext.tsx`
- `auth/ProtectedRoute.tsx`
- `pages/LoginPage.tsx`
- `App.tsx`
- `main.tsx`

### Sin harness

**Setup (frontend/)**

- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `components.json`, `lib/utils.ts` y `components/ui/*`
- Eliminar `App.css`

**Código de la aplicación**

- `lib/api.ts`
- `lib/auth.tsx`
- `pages/LoginPage.tsx`
- `pages/SignupPage`
- `pages/ProfilePage.tsx`
- `App.tsx`

## Qué convenciones del proyecto respetó y cuáles no


## Cuántas veces tuviste que intervenir

Solo he tenido que intervenir una vez para corregir una conclusión a la que había llegado el modelo sin que yo se lo especificara: Implementó las reglas del procesó en `CLAUDE.md` para que las Pull Requests fueran contra mi repositorio en lugar de contra el repositorio de LIDR original, con lo que no se cumplían los criterios del ejercicio por el cuál tenemos que crear PRs hacia el repositorio original.

---

1. En los 45 minutos que tenía marcados como tope, he llegado hasta mi prompt número 7, que consistía en crear el Hook para formatear el código de front-end con Prettier cada vez que un agente lo modifica. Dónde más tiempo he perdido ha sido en tratar de crear los prompts de la manera más detallada posible siguiendo las buenas prácticas del "Contenido de un buen prompt técnico en 2026" del contenido del curso.

2. La primera diferencia que he visto ha sido en el nivel de detalle de los cambios que propone uno y otro. El proyecto con harness no toca prácticamente ningún archivo de configuración, mientras que el proyecto sin harness si tiene bastantes cambios en estos archivos.

3. Sinceramente, no tengo la sensación de que el agente haya incumplido ninguna instrucción que esté documentada en el harness. Seguramente el harness se pueda mejorar, pero comparando uno y otro, no tengo la sensación de que haya grandes diferencias.