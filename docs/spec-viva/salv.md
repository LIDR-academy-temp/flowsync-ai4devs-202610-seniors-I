# Spec viva: cuentas y acceso

## Purpose

Permitir que una persona cree una cuenta, entre y salga de FlowSync, conserve su sesión entre visitas y consulte su perfil, e impedir que quien no tenga sesión acceda a lo protegido.

## Requirements

### Requirement: Registro con sesión inmediata

El sistema SHALL crear una cuenta a partir de un email y una contraseña confirmada, y SHALL dejar a la persona con la sesión iniciada sin ningún paso adicional.

#### Scenario: Registro correcto desde la pantalla

- **WHEN** una persona sin sesión rellena en la pantalla de registro un email libre y válido y una contraseña de 8 a 32 caracteres repetida igual, y pulsa «Crear cuenta»
- **THEN** la cuenta queda creada y la persona llega a su perfil con la sesión iniciada

#### Scenario: Registro correcto por la API

- **WHEN** un cliente de la API envía un registro con todos los datos válidos
- **THEN** la API responde con los datos de la cuenta y una credencial de acceso

### Requirement: Validación de los datos de registro

El sistema SHALL rechazar un registro con datos inválidos sin crear la cuenta, e indicar qué campo falla.

#### Scenario: Campos sin rellenar

- **WHEN** una persona envía el formulario de registro vacío
- **THEN** la cuenta no se crea y aparecen los avisos «Falta rellenar el email.», «Falta rellenar la contraseña.» y «Falta rellenar la confirmación de la contraseña.» junto a sus campos

#### Scenario: Email con formato inválido

- **WHEN** una persona envía el registro con un email mal formado
- **THEN** ve «Introduce una dirección de email válida.» junto al campo

#### Scenario: Contraseña demasiado corta o demasiado larga

- **WHEN** una persona envía el registro con una contraseña de menos de 8 caracteres o de más de 32
- **THEN** la cuenta no se crea y ve junto al campo el límite que ha incumplido

#### Scenario: Las contraseñas no coinciden

- **WHEN** una persona escribe en «Repite la contraseña» un valor distinto al de «Contraseña» y envía el formulario
- **THEN** ve «Las contraseñas no coinciden.» junto a ese campo y la cuenta no se crea

#### Scenario: Error de validación por la API

- **WHEN** un cliente de la API envía un registro con datos inválidos
- **THEN** la API lo rechaza con un 422 e indica cada campo que falla y por qué

### Requirement: Email único

El sistema SHALL impedir que se registren dos cuentas con el mismo email.

#### Scenario: Email ya registrado

- **WHEN** alguien intenta registrarse con un email que ya tiene cuenta
- **THEN** la API lo rechaza con un 422 sobre el email, y la pantalla muestra «Ese email ya está registrado. Inicia sesión en su lugar.»

#### Scenario: Mismo email con distintas mayúsculas

- **WHEN** alguien se registra con un email que solo se diferencia de uno existente en las mayúsculas
- **THEN** el registro se acepta y se crea una segunda cuenta

### Requirement: Nombre opcional

El sistema SHALL permitir crear una cuenta sin nombre desde la pantalla de registro, y SHALL exigir a los clientes de la API que envíen el campo de nombre, aunque sea vacío.

#### Scenario: Registro sin nombre desde la pantalla

- **WHEN** una persona deja vacío «Nombre completo (opcional)» y completa el resto del registro
- **THEN** la cuenta se crea y su nombre queda vacío

#### Scenario: La API recibe un registro sin el campo

- **WHEN** un cliente de la API envía un registro sin el campo de nombre
- **THEN** la API lo rechaza con un 422 sobre ese campo

### Requirement: Inicio de sesión

El sistema SHALL iniciar sesión a quien presente un email y una contraseña correctos.

#### Scenario: Credenciales correctas desde la pantalla

- **WHEN** una persona sin sesión introduce en la pantalla de inicio de sesión el email y la contraseña de su cuenta y pulsa «Entrar»
- **THEN** llega a su perfil con la sesión iniciada

#### Scenario: Credenciales correctas por la API

- **WHEN** un cliente de la API envía un inicio de sesión con credenciales correctas
- **THEN** la API responde con los datos de la cuenta y una credencial de acceso

### Requirement: Rechazo de credenciales incorrectas

El sistema SHALL denegar el acceso con credenciales incorrectas sin revelar si falló el email o la contraseña.

#### Scenario: Contraseña incorrecta

- **WHEN** una persona introduce un email existente con una contraseña incorrecta
- **THEN** no entra y ve el aviso general «El email o la contraseña no son correctos.»

#### Scenario: Credenciales incorrectas por la API

- **WHEN** un cliente de la API envía un inicio de sesión con una contraseña incorrecta o con un email que no tiene cuenta
- **THEN** la API lo rechaza con un 400 igual en ambos casos, sin indicar ningún campo

#### Scenario: Email con distintas mayúsculas

- **WHEN** una persona intenta entrar con su email escrito en mayúsculas, la cuenta se registró en minúsculas y no existe otra cuenta con esa variante
- **THEN** no entra y ve el mismo aviso que con unas credenciales incorrectas

### Requirement: Validación del formulario de inicio de sesión

El sistema SHALL señalar en su campo los datos que falten o tengan un formato inválido.

#### Scenario: Formulario vacío

- **WHEN** una persona envía el inicio de sesión sin rellenar nada
- **THEN** ve «Falta rellenar el email.» y «Falta rellenar la contraseña.» junto a sus campos

#### Scenario: Email mal formado

- **WHEN** una persona envía el inicio de sesión con un email mal formado
- **THEN** ve «Introduce una dirección de email válida.» junto al campo y no entra

### Requirement: Persistencia de la sesión

El sistema SHALL conservar la sesión al recargar la página y entre visitas del mismo navegador, sin volver a pedir credenciales.

#### Scenario: Recarga con sesión válida

- **WHEN** una persona con sesión iniciada recarga su perfil
- **THEN** sigue en su perfil con sus datos a la vista

#### Scenario: Comprobación durante la carga

- **WHEN** se abre la aplicación con una sesión guardada que todavía no se ha validado
- **THEN** se muestra un indicador de carga, sin redirigir, hasta que el servidor responde

### Requirement: Sesión rechazada por el servidor

El sistema SHALL descartar una sesión guardada que el servidor rechace, y SHALL explicárselo a la persona en la pantalla de inicio de sesión.

#### Scenario: Credencial guardada no válida

- **WHEN** se abre el perfil con una sesión guardada que el servidor rechaza
- **THEN** la sesión guardada se elimina y la persona llega a la pantalla de inicio de sesión, donde ve «Tu sesión ha caducado. Vuelve a iniciar sesión.»

### Requirement: Sesión conservada ante un corte de conexión

El sistema SHALL conservar la sesión guardada cuando no pueda contactar con el servidor, y SHALL recuperarla al recargar cuando vuelva la conexión.

#### Scenario: Servidor inaccesible al abrir la aplicación

- **WHEN** se abre el perfil con una sesión guardada y el servidor no responde
- **THEN** la persona ve la pantalla de inicio de sesión con el aviso «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.» y la sesión sigue guardada

#### Scenario: Vuelve la conexión

- **WHEN** tras ese corte el servidor vuelve a responder y la persona recarga la página
- **THEN** entra en su perfil sin introducir credenciales

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión explícitamente, y SHALL devolver a la persona a la pantalla de inicio de sesión.

#### Scenario: Cierre desde el perfil

- **WHEN** una persona pulsa «Cerrar sesión» en su perfil con el servidor disponible
- **THEN** llega a la pantalla de inicio de sesión, la sesión desaparece del navegador y la credencial deja de valer

#### Scenario: Cierre por la API

- **WHEN** un cliente de la API pide cerrar sesión con una credencial válida
- **THEN** la API confirma el cierre y esa credencial deja de valer

#### Scenario: Cierre sin conexión con el servidor

- **WHEN** una persona pulsa «Cerrar sesión» y el servidor no responde
- **THEN** llega igualmente a la pantalla de inicio de sesión y la sesión desaparece del navegador, pero la credencial sigue siendo válida en el servidor

### Requirement: Sesiones independientes

El sistema SHALL tratar cada inicio de sesión como una sesión independiente de las demás de la misma cuenta.

#### Scenario: Cerrar una de dos sesiones

- **WHEN** una cuenta tiene dos sesiones abiertas y se cierra una de ellas
- **THEN** la credencial de la sesión cerrada deja de valer y la de la otra sigue funcionando

### Requirement: Protección de la API

El sistema SHALL exigir una credencial válida para consultar el perfil y para cerrar sesión.

#### Scenario: Petición sin credencial

- **WHEN** un cliente de la API pide el perfil o el cierre de sesión sin credencial
- **THEN** la API lo rechaza con un 401

#### Scenario: Credencial no válida

- **WHEN** un cliente de la API pide el perfil con una credencial inventada
- **THEN** la API lo rechaza con un 401

### Requirement: Protección de las pantallas

El sistema SHALL llevar a la pantalla de inicio de sesión a quien abra sin sesión cualquier dirección que no sea de acceso.

#### Scenario: Perfil sin sesión

- **WHEN** una persona sin sesión abre la dirección del perfil
- **THEN** llega a la pantalla de inicio de sesión y no ve datos de ninguna cuenta

#### Scenario: Dirección desconocida sin sesión

- **WHEN** una persona sin sesión abre una dirección que no existe
- **THEN** llega a la pantalla de inicio de sesión, sin ningún aviso de que la dirección no existe

### Requirement: Pantallas de acceso reservadas a quien no tiene sesión

El sistema SHALL llevar al perfil a quien abra con sesión una pantalla de acceso.

#### Scenario: Login o registro con sesión

- **WHEN** una persona con sesión abre la pantalla de inicio de sesión o la de registro
- **THEN** llega a su perfil

### Requirement: Direcciones desconocidas con sesión

El sistema SHALL llevar al perfil a quien abra con sesión una dirección que no existe.

#### Scenario: Dirección inexistente

- **WHEN** una persona con sesión abre una dirección que no existe
- **THEN** llega a su perfil, sin ningún aviso de que la dirección no existe

### Requirement: Consulta del perfil

El sistema SHALL mostrar a cada persona con sesión los datos de su propia cuenta.

#### Scenario: Perfil de una cuenta sin nombre

- **WHEN** una persona registrada sin nombre abre su perfil
- **THEN** ve «Sin nombre», unas iniciales formadas por la primera letra de su email y la primera de su dominio, su email, la fecha en que se registró tras «Miembro desde» y el botón «Cerrar sesión»

#### Scenario: Perfil por la API

- **WHEN** un cliente de la API pide el perfil con una credencial válida
- **THEN** la API responde con el identificador, el nombre, el email, las iniciales y las fechas de la cuenta, y nunca con la contraseña

### Requirement: Errores comprensibles en la interfaz

El sistema SHALL mostrar en castellano los errores de las pantallas de acceso, y SHALL explicar los fallos de conexión sin enseñar errores técnicos del servidor.

#### Scenario: Registro sin conexión con el servidor

- **WHEN** una persona envía el registro y el servidor no responde
- **THEN** ve en el formulario «No se pudo conectar con el servidor. Comprueba que el backend está arrancado.»

## Parte B: las tres listas

### 1. Requisitos escritos y comprobados

- **Escritos por el agente:** 18
- **Comprobados por mí abriendo el código:** 1

### 2. Incoherencias que aparecieron al escribirla

- **Botón atrás:** RF-2 dice que tras cerrar sesión volver atrás no devuelve el contenido. Con la sesión abierta en dos cargas completas de página, cerrar sesión y volver atrás mostró el perfil con los datos de la cuenta; al recargar llevó a la pantalla de inicio de sesión. Se vio en una navegación automatizada y falta repetirlo a mano.
- **Email duplicado con mayúsculas (bug):** la pantalla de registro aceptó un email que solo cambiaba en las mayúsculas y creó otra cuenta, aunque el sistema rechaza los emails repetidos y debe tratarlos como el mismo.
- **Nombre:** RF-1 pide crear la cuenta «con nombre, email y contraseña», y la pantalla de registro lo marca como «(opcional)».
- **Opcional, pero obligatorio:** el nombre es opcional en la pantalla, y la API rechaza el registro si falta ese campo.
- **Espacio compartido:** RF-1 dice que tras registrarse se «ve el espacio», y se llega al perfil; no hay ningún espacio. R-2 da la épica por implementada y PA-11 lo desmiente.
- **Sesión «caducada»:** la pantalla de inicio de sesión dice «Tu sesión ha caducado», pero ninguna sesión caducó en las pruebas: el aviso sale ante cualquier rechazo, también con una credencial inventada.
- **Forma de respuesta:** en la API, el registro, el inicio de sesión y el perfil devuelven sus datos con un envoltorio; el cierre de sesión no.
- **Idioma:** RNF-8 pide los errores en castellano; la API responde en inglés, y solo la interfaz los traduce.
- **Mayúsculas:** «Falta rellenar el email.» empieza en mayúscula y «la contraseña debe tener al menos 8 caracteres.» en minúscula, en el mismo formulario.
- **Validación en dos tiempos:** en la pantalla de registro, si las contraseñas no coinciden solo aparece ese aviso y el resto de errores queda oculto, como un email mal formado. Los demás errores salen todos a la vez.
- **Aviso de sesión perdida:** se muestra en la pantalla de inicio de sesión y no en la de registro, y desaparece al recargar.
- **Lenguaje técnico:** RNF-10 prohíbe errores técnicos, y el aviso de conexión dice a la persona que compruebe «que el backend está arrancado».
- **Tareas inexistentes:** la pantalla de inicio de sesión promete «volver a tus tareas», y la aplicación no tiene tareas.

### 3. Lo que no supe decidir si era bug o contrato

- **Duración de la sesión:** o la sesión indefinida es lo que pide RF-3, que no pone límite, o es un olvido, porque la interfaz habla de sesiones que caducan.
- **Cerrar sesión sin servidor:** o es correcto priorizar que la persona salga del navegador, o RF-2 no se cumple, porque la credencial sigue siendo válida en el servidor y no hay forma de revocarla después.
- **Alcance del cierre:** cerrar sesión puede significar «salir de este navegador», que es lo que hace, o «salir de la cuenta», que dejaría sin efecto las demás sesiones.
- **Direcciones inexistentes:** redirigir sin avisar puede ser una decisión para que nadie vea un error, o una casualidad de la regla que protege las pantallas: desde fuera no se distingue.
- **Pantalla de inicio de sesión con sesión conservada:** ante un corte, la persona ve «Inicia sesión» aunque su sesión sigue siendo buena. Puede ser una degradación aceptable, o un mensaje engañoso que la empuja a abrir una sesión nueva.
