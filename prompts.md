# Prompts

## Prompt 1

**Modelo:** claude-opus-5-5
**Herramienta:** Claude Code

```
Descripción

Como usuario de FlowSync, quiero poder crear una cuenta e iniciar sesión desde la web, para acceder a mi perfil. El backend ya ofrece la autenticación; falta la parte visual en el frontend.

Criterios de aceptación

Existe una pantalla de registro donde el usuario introduce su email y una contraseña.

Existe una pantalla de login donde el usuario introduce su email y su contraseña.

Tras iniciar sesión correctamente, el usuario llega a una página de perfil que muestra sus datos.

Si el usuario recarga la página, sigue con la sesión iniciada.

Si las credenciales son incorrectas, se muestra un mensaje claro.

Si el email ya está registrado, se muestra un mensaje claro.

Desde el login se puede ir al registro, y desde el registro al login.
```

**Qué salió:** mismo texto lanzado en las dos copias; las dos funcionaron a la primera, sin intervenciones. Con harness: leyó el contrato del backend y lo probó con `curl`, separó cliente HTTP / token / errores en archivos propios, no añadió dependencias, lint y build pasaron; no explicó antes qué archivos iba a tocar y no pudo probar en el navegador. Sin harness: también acertó el contrato del backend (`passwordConfirmation`, mínimo 8), pero añadió `react-router` y concentró la lógica HTTP en un solo `api.ts`.
