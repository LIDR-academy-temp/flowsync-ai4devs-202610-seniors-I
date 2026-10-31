# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt N

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
Este es el ejemplo. Bórralo.

El prompt va aquí dentro, entero y con sus saltos de línea,
para que se sepa dónde empieza y dónde acaba.
```

**Qué salió:** (opcional, una línea) funcionó a la primera / tuve que insistir / me inventó una ruta que no existe.

---

## Prompt 1

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
make setup
```

**Qué salió:** make setup terminó sin errores. Arranca todo con make start.

---

## Prompt 2

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
make start
```

**Qué salió:** los dos servidores están arrancados y responden con HTTP 200.

---

## Prompt 3

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
escribe la spec de lo que el sistema hace hoy y déjala en un archivo que no esté versionado al proyecto, propongo la ruta ~/code ; las capas que necesito son "lo que pasa por el API" y "lo que se ve en
  pantalla", nada que no sea cuentas y acceso. El formato es: Arriba, un ## Purpose de una o dos frases: para qué existe esta capability.Debajo, ## Requirements, y colgando de él ### Requirement: en los que
  el sistema SHALL hacer algo.Bajo cada requisito, al menos un #### Scenario: de cuatro almohadillas, con dos viñetas: - **WHEN** y - **THEN**. No hay casilla para el GIVEN: la precondición se mete dentro
  del WHEN. Es castellano, salvo las mayúsculas de la RFC
```

**Qué salió:** Antes de escribir código, voy a levantar una copia desechable del backend con su propia base de datos y puerto para verificar el comportamiento real de la API sin tocar tu entorno de desarrollo. La API ya me sorprendió: ADA@… y ada@… generan cuentas distintas. Me quedan casos por probar y quiero revisar las pantallas en un navegador real en vez de solo leer el código. Faltan unas librerías del sistema. No voy a pedir sudo para esto: las bajo sin instalar y las desempaqueto en el scratchpad. La spec está en ~/code/spec-cuentas-y-acceso.md, fuera del repo, con 21 requisitos y 63 escenarios en el formato que pediste. Cada requisito lleva su SHALL y no aparecen nombres de archivo ni de clase.
No la escribí solo leyendo el código: probé cada capa contra una copia desechable, con su propia base de datos, y tu base de datos de desarrollo no se tocó.
- API: peticiones reales, incluidos los casos límite.
- Pantalla: un navegador headless contra esa misma copia.
Tres cosas no se comprobaron de forma directa:
- Caída del backend y errores 500: los simulé interceptando peticiones en el navegador, no apagando el servidor.
- Tokens sin caducidad: lo vi en la base de datos (fecha de caducidad vacía), no esperando a que pase el tiempo.
- Email de más de 254 caracteres: la API lo rechaza con 422, pero salta antes la regla de formato. Nunca vi actuar el límite de longitud por sí solo.
La spec recoge lo que el sistema hace hoy, también cuando parece un fallo. Estos comportamientos no sé si alguien los decidió así:
- Cuentas duplicadas: ada@… y ADA@… crean dos cuentas distintas.
- Contraseñas: se les quitan los espacios de los extremos sin avisar, así que "  password1  " y password1 entran igual.
- Iniciales: Ada  Lovelace, con dos espacios, da AD. Una cuenta sin nombre usa el dominio del email: maria.perez@example.com da ME.
- Tokens: nunca caducan, aunque la pantalla diga Tu sesión ha caducado.
- Cierre de sesión sin backend: la pantalla confirma la salida, pero el token sigue válido en el servidor.
- Errores de longitud: empiezan en minúscula (la contraseña debe tener…).
- JSON roto: devuelve 422 y no 400.
Para la entrega:
- El README pide la spec versionada en docs/spec-viva/<tus-iniciales>.md. Si la vas a entregar así, tendrás que moverla desde ~/code.
- El README también pide tres listas debajo de la spec (la parte B). No las he incluido porque no las pediste.
Estado del entorno: paré los servidores de prueba y borré el navegador que había descargado. Tu make start original sigue en los puertos 3333 y 5173. No he hecho ningún cambio en el repo, así que no hay rama ni PR. prompts.md aparece modificado, pero ese cambio no es mío y no lo he tocado.

---

## Prompt 4

**Modelo:** Opus 5.5 1M xHigh
**Herramienta:** Claude Code

```
para trabajar en la entrega, crea un nuevo documento en la ruta que especifica el readme, usa las iniciales "jcpv", deja el documento con el formato definido, y las tres listas de la parte B debajo de la spec, esta documento solo debe contener las secciones establecidas pero sin información que se recopiló en la spec que está por fuera de proyecto
```

**Qué salió:** He creado docs/spec-viva/jcpv.md como plantilla vacía, sin nada de la spec que está en ~/code. Tiene ## Purpose, ## Requirements con un ### Requirement: y un #### Scenario: de ejemplo (viñetas WHEN y THEN vacías), y debajo las tres listas de la parte B. El título ## Parte B: las tres listas y los títulos de cada lista los he redactado a partir del README, que no fija un formato para esa parte. El archivo está en la rama spec-viva-jcpv, que ya estaba activa. No he hecho commit ni abierto PR, porque todavía vas a trabajar en la entrega.