# Instrucciones del proyecto FlowSync

## Contexto

FlowSync es una aplicación TypeScript con:

- Backend en AdonisJS 7, dentro de `backend/`.
- Frontend en React 19 + Vite, dentro de `frontend/`.
- Base de datos SQLite para desarrollo.
- El backend ya proporciona la autenticación y no debe modificarse en esta tarea.

## Alcance de trabajo

- Para configurar o mantener el harness, también se permite modificar `CLAUDE.md` y los archivos dentro de `.claude`.
- No modifiques archivos de `backend/`.
- No edites archivos generados automáticamente.
- No modifiques `.env`, credenciales ni secretos.
- Antes de crear una ruta nueva, revisa las rutas existentes del backend.
- Antes de consumir una API, comprueba su contrato en el backend.


## Convenciones de código

- Usa TypeScript, no JavaScript.
- Usa componentes funcionales de React.
- Mantén los componentes pequeños y con una responsabilidad clara.
- Usa nombres descriptivos en inglés para variables, funciones y componentes.
- Usa PascalCase para componentes React.
- Usa camelCase para variables y funciones.
- No dupliques lógica de autenticación o llamadas HTTP.
- Gestiona explícitamente los estados de carga, éxito y error.
- Los errores visibles para el usuario deben ser claros y no mostrar errores técnicos internos.
- No guardes contraseñas en el navegador.
- Guarda el token de autenticación únicamente después de un login correcto.

## API

Utiliza las rutas existentes del backend:

- `backend/start/routes.ts`
- `backend/app/validators/`
- `backend/app/controllers/`
- `backend/app/transformers/`

## Criterios de aceptación

Una funcionalidad de autenticación debe incluir:

- Pantalla de registro con email y contraseña.
- Pantalla de login con email y contraseña.
- Mensajes claros para credenciales inválidas.
- Mensajes claros si el email ya está registrado.
- Persistencia del token tras un login correcto.
- Acceso a una vista protegida que consuma el perfil.
- Navegación entre login y registro.

## Verificación obligatoria

Después de editar el proyecto:

1. Ejecuta `npm run lint` desde `frontend/`.
2. Ejecuta `npm run build` desde `frontend/`.
3. Corrige los errores antes de terminar.
4. Revisa que no queden errores en la consola del navegador.
5. Comprueba manualmente los flujos de registro, login y acceso al perfil.

## Proceso

- Antes de editar, inspecciona la estructura existente.
- No implementes cambios sin explicar primero qué archivos vas a modificar.
- Mantén los cambios limitados al ticket actual.
- No añadas dependencias nuevas salvo que sean necesarias para el ticket o para el harness solicitado.
- No modifiques el backend para compensar un problema del frontend.
- Al terminar, resume los archivos modificados y las comprobaciones ejecutadas.