# Cuentas y acceso

## Purpose

Permite que cada persona del equipo tenga su propia cuenta para entrar en FlowSync y que el espacio compartido solo sea accesible con una sesión iniciada. Cubre el registro, el inicio y cierre de sesión, la persistencia de la sesión y la protección de las pantallas privadas.

## Requirements

### Requirement: Registro de una cuenta nueva

El sistema SHALL permitir crear una cuenta desde la pantalla «Crea tu cuenta» indicando un nombre completo opcional, un email, una contraseña y su repetición. Tras registrarse con éxito, la persona MUST quedar con la sesión iniciada y ver su perfil sin ningún paso adicional.

#### Scenario: Registro con todos los datos válidos

- **WHEN** una persona rellena nombre completo, un email no registrado, una contraseña de entre 8 y 32 caracteres y la misma contraseña en «Repite la contraseña», y pulsa «Crear cuenta»
- **THEN** se muestra su pantalla de perfil con su nombre, su email y la fecha de alta, sin volver a pedir credenciales

#### Scenario: Registro sin nombre completo

- **WHEN** una persona deja vacío el campo «Nombre completo (opcional)» y completa el resto de campos correctamente
- **THEN** la cuenta se crea, la sesión queda iniciada y el perfil muestra «Sin nombre» en lugar del nombre

#### Scenario: Botón durante el envío

- **WHEN** la persona pulsa «Crear cuenta» y la petición todavía no ha terminado
- **THEN** el botón queda deshabilitado y muestra el texto «Creando cuenta…»

### Requirement: Validación del formulario de registro

El sistema MUST rechazar el registro cuando algún dato no es válido, sin crear la cuenta, y SHALL mostrar el motivo en castellano junto al campo afectado.

#### Scenario: Las contraseñas no coinciden

- **WHEN** la contraseña y «Repite la contraseña» son distintas y se pulsa «Crear cuenta»
- **THEN** bajo «Repite la contraseña» aparece «Las contraseñas no coinciden.» y no se crea la cuenta

#### Scenario: Email ya registrado

- **WHEN** se intenta registrar un email que ya pertenece a otra cuenta, escrito exactamente igual
- **THEN** bajo el campo email aparece «Ese email ya está registrado. Inicia sesión en su lugar.» y no se crea la cuenta

#### Scenario: Email con formato no válido

- **WHEN** el email introducido no tiene formato de dirección de correo
- **THEN** bajo el campo email aparece «Introduce una dirección de email válida.»

#### Scenario: Campos obligatorios vacíos

- **WHEN** se pulsa «Crear cuenta» con el email, la contraseña o su repetición vacíos
- **THEN** bajo cada campo vacío aparece un aviso del tipo «Falta rellenar el email.», «Falta rellenar la contraseña.» o «Falta rellenar la confirmación de la contraseña.»

#### Scenario: Contraseña demasiado corta

- **WHEN** la contraseña tiene menos de 8 caracteres
- **THEN** bajo el campo contraseña aparece «la contraseña debe tener al menos 8 caracteres.»

#### Scenario: Contraseña demasiado larga

- **WHEN** la contraseña tiene más de 32 caracteres
- **THEN** bajo el campo contraseña aparece «la contraseña no puede superar los 32 caracteres.»

#### Scenario: Ayuda sobre la longitud de la contraseña

- **WHEN** la persona está en la pantalla de registro y el campo contraseña no tiene ningún error
- **THEN** bajo el campo se muestra la ayuda «Entre 8 y 32 caracteres.»

#### Scenario: Mismo email con distintas mayúsculas

- **WHEN** se registra un email que solo se diferencia de uno existente en mayúsculas y minúsculas
- **THEN** el registro se acepta como una cuenta distinta

### Requirement: Inicio de sesión

El sistema SHALL permitir iniciar sesión desde la pantalla «Inicia sesión» con email y contraseña. Con credenciales correctas la persona MUST acceder a su perfil; con credenciales incorrectas MUST NOT acceder y SHALL ver un error comprensible.

#### Scenario: Credenciales correctas

- **WHEN** una persona introduce el email y la contraseña de su cuenta y pulsa «Entrar»
- **THEN** accede a su pantalla de perfil

#### Scenario: Credenciales incorrectas

- **WHEN** el email no existe o la contraseña no es la de la cuenta
- **THEN** aparece arriba del formulario el aviso «El email o la contraseña no son correctos.» y la persona permanece en la pantalla de inicio de sesión

#### Scenario: Email con distintas mayúsculas

- **WHEN** la persona escribe su email con mayúsculas y minúsculas distintas a las usadas al registrarse
- **THEN** el inicio de sesión se rechaza con «El email o la contraseña no son correctos.»

#### Scenario: Campos vacíos o email no válido

- **WHEN** se pulsa «Entrar» con el email o la contraseña vacíos, o con un email sin formato válido
- **THEN** bajo el campo afectado aparece «Falta rellenar el email.», «Falta rellenar la contraseña.» o «Introduce una dirección de email válida.»

#### Scenario: Botón durante el envío

- **WHEN** la persona pulsa «Entrar» y la petición todavía no ha terminado
- **THEN** el botón queda deshabilitado y muestra el texto «Entrando…»

### Requirement: Navegación entre registro e inicio de sesión

Las pantallas de registro e inicio de sesión SHALL enlazarse entre sí.

#### Scenario: Del inicio de sesión al registro

- **WHEN** en la pantalla «Inicia sesión» se pulsa el enlace «Crea una»
- **THEN** se muestra la pantalla «Crea tu cuenta»

#### Scenario: Del registro al inicio de sesión

- **WHEN** en la pantalla «Crea tu cuenta» se pulsa el enlace «Inicia sesión»
- **THEN** se muestra la pantalla «Inicia sesión»

### Requirement: Perfil de la persona con sesión iniciada

Con la sesión iniciada, el sistema SHALL mostrar una pantalla de perfil con las iniciales, el nombre completo, el email y la fecha de alta de la persona.

#### Scenario: Ver el perfil

- **WHEN** una persona con sesión iniciada está en su perfil
- **THEN** ve un círculo con sus iniciales, su nombre completo (o «Sin nombre» si no lo indicó), su email y «Miembro desde» seguido de la fecha de alta en formato largo en castellano

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión explícitamente desde el perfil. Tras cerrarla, la persona MUST NOT poder volver a ver el contenido privado sin iniciar sesión de nuevo.

#### Scenario: Cerrar sesión

- **WHEN** la persona pulsa «Cerrar sesión» en su perfil
- **THEN** el botón muestra «Cerrando sesión…» y a continuación se muestra la pantalla «Inicia sesión»

#### Scenario: Volver atrás tras cerrar sesión

- **WHEN** después de cerrar sesión se pulsa «atrás» en el navegador
- **THEN** no se muestra el perfil y la persona sigue en la pantalla de inicio de sesión

### Requirement: Persistencia de la sesión

La sesión MUST sobrevivir a la recarga de la página y al cierre y reapertura de la pestaña, sin volver a pedir credenciales mientras siga siendo válida.

#### Scenario: Recargar la página

- **WHEN** una persona con sesión iniciada recarga la página
- **THEN** sigue viendo su perfil sin introducir de nuevo email y contraseña

#### Scenario: Cerrar y reabrir la pestaña

- **WHEN** una persona con sesión iniciada cierra la pestaña y vuelve a abrir la aplicación en el mismo navegador
- **THEN** entra directamente con su sesión iniciada

#### Scenario: Comprobación de la sesión al cargar

- **WHEN** la aplicación se abre con una sesión guardada y aún no ha terminado de comprobarla
- **THEN** se muestra una pantalla de carga en lugar de redirigir a otra pantalla

#### Scenario: Sesión que ya no es válida

- **WHEN** la aplicación se abre con una sesión guardada que ya no es válida
- **THEN** se muestra la pantalla de inicio de sesión con el aviso «Tu sesión ha caducado. Vuelve a iniciar sesión.»

#### Scenario: Servidor no disponible al restaurar la sesión

- **WHEN** la aplicación se abre con una sesión guardada y no puede contactar con el servidor
- **THEN** se muestra la pantalla de inicio de sesión con el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

### Requirement: Protección de las pantallas privadas

Sin sesión iniciada, el sistema MUST NOT mostrar ninguna pantalla privada y SHALL redirigir a la pantalla de inicio de sesión. Con sesión iniciada, las pantallas de inicio de sesión y registro SHALL redirigir al perfil.

#### Scenario: Acceso al perfil sin sesión

- **WHEN** una persona sin sesión iniciada abre `/profile`
- **THEN** se muestra la pantalla «Inicia sesión»

#### Scenario: Acceso a una dirección desconocida sin sesión

- **WHEN** una persona sin sesión iniciada abre cualquier dirección que no sea `/login` ni `/register`
- **THEN** se muestra la pantalla «Inicia sesión»

#### Scenario: Acceso a una dirección desconocida con sesión

- **WHEN** una persona con sesión iniciada abre una dirección que no existe
- **THEN** se muestra su perfil

#### Scenario: Acceso a login o registro con sesión

- **WHEN** una persona con sesión iniciada abre `/login` o `/register`
- **THEN** se muestra su perfil en lugar del formulario




# PARTE B 
## 1  Cuántos requisitos escribió el agente, y cuántos comprobaste tú abriendo el código.

Despues de mirar el codigo se me han ocurrido 4 el agente a escrito 8.

Requirementes que se me havian ocurrido: 
 * El usuario deve poder registrarse
 * El usuario deve poder hacer login
 * El usuario deve poder ver su perfil
 * El usuario puede cerrar session  
 

## 2 Las incoherencias que aparecieron al escribirla. Una línea cada una, con dónde se ve. No las busques a propósito: aparecen solas, porque una regla que se cumple en casi todas partes canta en cuanto intentas escribirla como si se cumpliera siempre.
 - Linea 117 Se deve mostrar perfil con las iniciales, el nombre completo, el email y la fecha de alta de la persona. --> el nombre es opcional en el registro
 - linea 140 La sesión tiene que sobrevivir mientras sea valida --> no especifica cuando no es valida

## 3 Lo que no supiste decidir si era un bug o el contrato. Al menos una, y en una frase, qué dos lecturas se contradecían. Esta es la lista que importa. No es lo que estaba mal: es lo que podría estar bien o mal según a quién le preguntes, y no había forma de decidirlo leyendo el código.
- Que se consideren cuentas distintas si el email esta escrito con algunas mayusculas o no. Se contradice en la linea 74 y la 86 el usuario puede considerar-lo credenciales correctas y se le esta negado el acceso. 
