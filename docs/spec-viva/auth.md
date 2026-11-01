# Cuentas y acceso

## Purpose

Permite a una persona crear una cuenta, iniciar y cerrar sesión, mantener la sesión abierta entre recargas y consultar los datos de su propia cuenta. Es la puerta de entrada al espacio compartido y lo único implementado hoy de punta a punta.

## Requirements

### Requirement: Registro de una cuenta

El sistema SHALL permitir crear una cuenta con email y contraseña, con el nombre como dato opcional, y dejar a la persona con la sesión ya iniciada.

#### Scenario 1: Registro con datos válidos

- **WHEN** una persona anónima envía un email no registrado, una contraseña de entre 8 y 32 caracteres y la confirmación de esa misma contraseña (y, opcionalmente, su nombre)
- **THEN** se crea la cuenta y la respuesta devuelve los datos de la persona junto con un credencial de sesión, quedando autenticada sin ningún paso adicional de invitación o alta

#### Scenario 2: Registro desde la pantalla de registro

- **WHEN** una persona anónima abre la pantalla de registro y rellena nombre (opcional), email, contraseña y la repetición de la contraseña, y confirma
- **THEN** queda con sesión iniciada y pasa a la pantalla de su cuenta sin volver a introducir credenciales

#### Scenario 3: Nombre omitido en el registro

- **WHEN** una persona se registra sin indicar nombre
- **THEN** la cuenta se crea igualmente y sus datos reflejan la ausencia de nombre

### Requirement: Validación de los datos de registro

El sistema SHALL rechazar un registro cuyos datos no sean válidos, indicando qué falla junto al campo afectado y sin crear la cuenta.

#### Scenario 4: Email ya registrado

- **WHEN** una persona intenta registrarse con un email que ya tiene cuenta
- **THEN** el registro se rechaza y se le indica que ese email ya está registrado y que inicie sesión en su lugar

#### Scenario 5: Email con formato inválido

- **WHEN** una persona intenta registrarse con un email que no tiene forma de dirección de correo
- **THEN** el registro se rechaza y se le pide introducir una dirección de email válida

#### Scenario 6: Contraseña demasiado corta o demasiado larga

- **WHEN** una persona intenta registrarse con una contraseña de menos de 8 o más de 32 caracteres
- **THEN** el registro se rechaza y se le indica el rango de longitud exigido

#### Scenario 7: La confirmación no coincide con la contraseña

- **WHEN** una persona intenta registrarse y la repetición de la contraseña no coincide con la contraseña
- **THEN** el registro se rechaza y se le indica que las contraseñas no coinciden, sin llegar a crear la cuenta

#### Scenario 8: Falta un dato obligatorio

- **WHEN** una persona intenta registrarse sin email o sin contraseña
- **THEN** el registro se rechaza indicando qué campo falta por rellenar

### Requirement: Inicio de sesión

El sistema SHALL permitir a una persona con cuenta iniciar sesión con su email y contraseña, obteniendo acceso al espacio.

#### Scenario 9: Credenciales correctas

- **WHEN** una persona anónima envía el email y la contraseña correctos de una cuenta existente
- **THEN** la respuesta devuelve sus datos y un credencial de sesión, y queda autenticada

#### Scenario 10: Credenciales incorrectas

- **WHEN** una persona envía un email o una contraseña que no corresponden a una cuenta válida
- **THEN** no se le da acceso y se le muestra un mensaje comprensible indicando que el email o la contraseña no son correctos

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar la sesión de forma explícita, dejando de tener acceso al espacio.

#### Scenario 11: Cierre de sesión desde la cuenta

- **WHEN** una persona autenticada pulsa cerrar sesión
- **THEN** su sesión queda cerrada, deja de poder acceder al contenido protegido y vuelve a la pantalla de inicio de sesión

#### Scenario 12: Volver atrás tras cerrar sesión

- **WHEN** una persona cierra sesión e intenta volver atrás en el navegador para recuperar el contenido del espacio
- **THEN** el contenido no vuelve a mostrarse y se la lleva de nuevo a iniciar sesión

### Requirement: Persistencia de la sesión

El sistema SHALL mantener la sesión abierta al recargar la página o cerrar la pestaña, sin obligar a volver a introducir las credenciales.

#### Scenario 13: Recarga de la página con sesión activa

- **WHEN** una persona con sesión iniciada recarga la página o vuelve a abrir la aplicación en una pestaña nueva
- **THEN** su sesión se restaura automáticamente y no se le piden de nuevo las credenciales, mostrándose una indicación de carga mientras se restablece

#### Scenario 14: La sesión guardada ya no es válida

- **WHEN** una persona vuelve a la aplicación con una sesión guardada que ya ha dejado de ser válida
- **THEN** se la trata como anónima y se la lleva a iniciar sesión

#### Scenario 15: El servidor no está disponible al restaurar

- **WHEN** una persona vuelve a la aplicación con una sesión guardada pero el servidor no responde temporalmente
- **THEN** se le explica que no se pudo conectar y su sesión guardada se conserva, de modo que vuelve a restaurarse cuando el servidor esté disponible de nuevo

### Requirement: Protección del espacio

El sistema SHALL impedir el acceso al contenido protegido a quien no tenga sesión iniciada.

#### Scenario 16: Acceso anónimo a una vista protegida

- **WHEN** una persona sin sesión intenta abrir una vista protegida de la aplicación
- **THEN** se la redirige a iniciar sesión y no ve ningún contenido del espacio

#### Scenario 17: Petición protegida sin credencial

- **WHEN** se solicita un recurso protegido sin aportar un credencial de sesión válido
- **THEN** la petición se rechaza por falta de autorización y no se devuelve ningún dato del espacio

### Requirement: Consulta de la propia cuenta

El sistema SHALL permitir a una persona autenticada consultar los datos de su propia cuenta.

#### Scenario 18: Ver los datos de la cuenta

- **WHEN** una persona autenticada abre la pantalla de su cuenta
- **THEN** ve su nombre (o una indicación de que no tiene nombre), su email, sus iniciales y la fecha desde la que es miembro

### Requirement: Navegación entre registro e inicio de sesión

El sistema SHALL ofrecer a quien aún no tiene sesión moverse entre la pantalla de inicio de sesión y la de registro.

#### Scenario 19: Ir de inicio de sesión a registro

- **WHEN** una persona anónima está en la pantalla de inicio de sesión y elige crear una cuenta
- **THEN** se la lleva a la pantalla de registro

#### Scenario 20: Ir de registro a inicio de sesión

- **WHEN** una persona anónima está en la pantalla de registro y elige que ya tiene cuenta
- **THEN** se la lleva a la pantalla de inicio de sesión

### Requirement: Mensajes de error comprensibles y en castellano

El sistema SHALL mostrar los errores en castellano y comprensibles, sin exponer detalles técnicos crudos, situando los fallos de validación junto a su campo.

#### Scenario 21: Fallo de validación sobre un campo visible

- **WHEN** un dato introducido por la persona no supera la validación y su campo está a la vista
- **THEN** el mensaje de error se muestra junto a ese campo

#### Scenario 22: Fallo de conexión con el servidor

- **WHEN** una acción no puede completarse porque no hay conexión con el servidor
- **THEN** se muestra un mensaje que explica que no se pudo conectar y qué comprobar, en lugar de un error técnico


# Parte B: las tres listas

## 1. Requisitos generados y comprobados.

Comprobados: 

| Scenario | Correcto | Notas |
| ---|---|---|
| 1 | Sí | Validacion definida |
| 2 | Sí | Código revisado. Datos almacenados en BBDD |
| 3 | Sí | BBDD tiene el nombre como nullabe |
| 4 | Sí | Lo hace en el validador: email().unique({ table: 'users', column: 'email' }) |
| 5 | Sí | Validación de email | 
| 6 | Repetida | Misma que Scenario 1 |
| 7 | Sí | Hay una validación para comprobar la contraseña .same(passw) |
| 8 | Sí | Deducida por las validacions.  |
| 9 | Sí | Login success |
| 10 | Sí | Revisado ya que no se encuentran los datos en BBDD - No entiendo el JS muy bien, pero probado empiricamente|
| 11 | Sí | Controller de auth |
| 12 | Sí | Se borra el token por lo que se le desloga |
| 13 | Sí | Se recupera de BBDD el token y se valida |
| 14 | Sí | El sistema de Auth lo rechaza|
| 15 |  |  |
| 16 | Sí | Mediante el router, con paths protegidos |
| 17 | Sí | Lo hace la librería de Auth |

Scenarios creados por la IA : 22
Scenarios revisados por mi: 17


## 2. Incoherencias detectadas

La gestión de errores no es uniforme. El front gestiona los errores y su traducción según sea el caso en vez de tener todo unificado. 
Esto no lo ha detectado la IA ni los specs

## 3. Comportamientos que no supiste clasificar como bug o contrato.

