# Comparación

Encargo: FLOW-1, alta de cuenta desde la página de inicio. Los dos textos no son idénticos: en la copia pelada iba el título y en la del harness no.

## Qué archivos tocó

Con harness, 5: `frontend/index.html`, `frontend/src/App.tsx`, `frontend/src/App.css`, `frontend/src/components/SignupForm.tsx`, `frontend/src/components/SignupForm.css`. `AGENTS.md` y `.cursor/hooks/` los monté yo. `prompts.md` es el registro.

Sin harness, 6: `frontend/index.html`, `frontend/src/App.tsx`, `frontend/src/App.css`, `frontend/src/index.css`, `frontend/src/signup.ts`, `frontend/vite.config.ts`. El diagrama C4 no quedó en ningún archivo.

## Qué convenciones respetó

Con harness, las de `AGENTS.md`, una a una:

- No editar `backend/`: sí. No hay ningún archivo de `backend/` en el diff.
- Ceñirse al validador (`fullName` nullable, email, contraseña de 8 a 32, confirmación igual): sí en el código que quedó. En el primer resultado el máximo de 32 se marcaba en rojo con la contraseña vacía.
- Textos de la interfaz en español: sí.
- No añadir dependencias y llamar a la API con `fetch`: sí. `package.json` no cambió.
- Componentes en `frontend/src/components/`: sí. El formulario está en `SignupForm.tsx`.
- No mostrar ni dejar escrito el token: sí. Lo vi al abrir `SignupForm.tsx`: la pantalla de éxito solo enseña el correo.

Sin harness: no había ninguna convención escrita en ninguna parte.

## Cuántas veces intervine

Con harness: 1. El segundo prompt, «Mejora la experiencia de usuario con UX». Ahí seguían el foco, que no volvía al correo repetido, y el máximo de 32 en rojo con la contraseña vacía.

Sin harness: 3. Pedir el diagrama C4, corregirlo, y preguntar si el token había quedado a la vista. El alta del primer prompt no la corregí.

## Qué arreglaría a mano

Con harness: en `App.tsx` la página sigue mostrando la plantilla de Vite (logos y la sección de documentación) debajo del formulario. En `SignupForm.tsx` la URL está fija a `http://localhost:3333`. Probaría el correo ya usado para ver si el foco vuelve al campo.

Sin harness: el diagrama C4 se quedó en el chat; no hay archivo que enseñar. El alta sí se puede enseñar: la página es el formulario y el éxito solo muestra el correo.

## Parte B

Monté `AGENTS.md` y el hook `afterFileEdit` en `.cursor/hooks/lint-frontend.sh`. El rato se fue en el hook: comprobar `jq`, dejar el script ejecutable y entender qué hacía, no en escribir `AGENTS.md`.

La primera diferencia fue dónde quedó el formulario: con harness en `frontend/src/components/SignupForm.tsx` y sin harness en `frontend/src/App.tsx` más `frontend/src/signup.ts`. Lo vi en `git status` y lo confirmé al abrir `App.tsx` de las dos copias.

Dejé escrito en `AGENTS.md` que la contraseña es de 8 a 32 caracteres, y en el primer resultado del lado con harness el máximo de 32 se marcaba en rojo con la contraseña vacía. Lo anoté en el segundo prompt, mirando el formulario, no la copia pelada.
