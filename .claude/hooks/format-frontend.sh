#!/usr/bin/env bash
# Hook PostToolUse: formatea con Prettier cada archivo de frontend/src/** que edita el agente.
set -euo pipefail

project="${CLAUDE_PROJECT_DIR:-$(pwd)}"
prettier="$project/frontend/node_modules/.bin/prettier"

# Claude Code envía el evento como JSON por stdin; extraemos la ruta del archivo editado.
file="$(node -e '
let d = "";
process.stdin.on("data", c => (d += c)).on("end", () => {
  const t = (JSON.parse(d).tool_input) || {};
  process.stdout.write(t.file_path || "");
});')"

[ -z "$file" ] && exit 0

case "$file" in
  /*) abs="$file" ;;
  *)  abs="$project/$file" ;;
esac

# Solo actuamos sobre frontend/src/**
case "$abs" in
  "$project"/frontend/src/*) ;;
  *) exit 0 ;;
esac

[ -f "$abs" ] || exit 0

if [ ! -x "$prettier" ]; then
  echo "Prettier no está instalado en frontend/. Ejecuta: cd frontend && npm install --save-dev --save-exact prettier" >&2
  exit 2
fi

cd "$project/frontend"
if ! out="$("$prettier" --write --ignore-unknown "$abs" 2>&1)"; then
  # exit 2 devuelve el error a Claude para que corrija el archivo (p. ej. un error de sintaxis).
  echo "Prettier no pudo formatear ${abs#"$project"/}:" >&2
  echo "$out" >&2
  exit 2
fi

exit 0
