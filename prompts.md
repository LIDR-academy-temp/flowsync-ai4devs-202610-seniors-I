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

---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Lee el readme del proyecto. Es la tarea por hacer. Ya estoy en la rama. Ya verifiqué toda la instalación y está levantado el frontend y backend. no hagas nada aún
```

**Qué salió:** Resumió la tarea, las reglas y los entregables, sin tocar nada.

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
explora el los archivos en docs y contrasta lo que dicen con el codigo existente
```

**Qué salió:** Contrastó docs y código: 4 contradicciones con el código, 6 supuestos del backlog sin sostén y 8 contradicciones entre docs.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
pon estos datos en un archivo ToAnalize.md. Volvamos a la tarea.
```

**Qué salió:** Creó ToAnalize.md. No empezó la spec: esperó un prompt explícito.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
estan levantados los proyectos explora las funcionalidades existentes, puedes crear un usuario y navegar a alguna pagina no contemplada
```

**Qué salió:** Instala extensiones de chrome, se aborta

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
no hagas instalaciones de paquetes ni agregues test al proyecto. Si lo hiciste deshazlo. Solo navega y observa
```

**Qué salió:** deshace la instalación e intenta por otros medios, demora.  Aborto ya que se analizó el código. el entorno Wsl no tiene acceso al chromium instalado e instalarlo está fuera del scope del readme.

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
sigamos con la tarea. vamos a escribrir las specs de lo que si está hecho que puede surgir de los documentos del MVP.
```

**Qué salió:** Escribió la spec con 18 requisitos y 35 escenarios, y las tres listas.

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
dame un extracto  de los archivos que afectan a cada uno de los 18 requisitos. El resultado debe guardarse en  el archivo comprobación.md  y debe incluir con a) el titulo  y descrición del requisito, b) el archivo o archivos que indicas que cumplen y porqué y c) un extracto de hasta  30 lineas donde se comprueba la hipotesis
```

**Qué salió:** Generó comprobación.md con los 18 requisitos y sus extractos: 17 cumplen y 1 cumple con salvedad.

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
probé la creacion, cierre, login, pagina errada con logín ya hecho (me devuelve a profile), mail o contraseña incorrecta y duplicar el mail en registro. que quedó sin probar/revisar?
```

**Qué salió:** Listó lo que quedaba sin probar: 12 requisitos y varios escenarios sueltos.

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
validé las exigencias de contraseñas de más de 8 y los mails vacio e incorrecto tanto en login como registro. Lo que noté es que si las contraseñas no se coresponden y hay algo escrito en en mail no me valida el formato y solo pone la advertencia de "Las contraseñas no coinciden." que falta?
```

**Qué salió:** Confirmó la causa de lo observado y la añadió a la lista 2.

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
comprobé la contraseña se controla desde el backend no en frontend.
```

**Qué salió:** Matizó: la longitud se controla solo en el backend, pero la coincidencia se controla en los dos lados.

## Prompt 11

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
se creo sin nombre.
```

**Qué salió:** Confirmó el escenario de registro sin nombre del requisito 4.

## Prompt 12

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
se me acabó el tiempo actualiza los entregables con los datos comprobados. y dime que faltó completar
```

**Qué salió:** Actualizó la lista 1 y este archivo, y resumió lo que faltó.

## Prompt 13

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
haz nuevamente el archivo de comprobacion. que tiene que ver el chromiun con la spec¿? no debe tener nada de endpoints ni cosas raras. Haz la validación del readme en la entrega
```

**Qué salió:** Reescribió la spec sin rutas ni términos técnicos, rehízo comprobación.md y pasó los controles del README.

## Prompt 14

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
te indico que si se pudo crear otro usuario con email con mayúscula es un bug de un comportamiento preestablecido
```

**Qué salió:** Pasó el caso de la lista 3 a la lista 2 como bug y añadió el escenario a la spec.

## Prompt 15

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
la api hoy devuelve 400 cuando la password no funciona
```

**Qué salió:** Lo comprobó contra la API y amplió el escenario de credenciales incorrectas.

## Prompt 16

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
deja en comprobación los faltantes únicamente para trabajo futuro. sigue con el siguiente paso del ejercio
```

**Qué salió:** Dejó comprobación.md solo con los faltantes, y preparó el commit y el push de la entrega.
