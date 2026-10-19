#!/usr/bin/env bash
# PostToolUse hook: formatea con Prettier los archivos editados bajo frontend/src/.
# Lee el JSON del hook por stdin; nunca bloquea al agente (siempre sale con 0).

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"
file=$(jq -r '.tool_input.file_path // empty')

case "$file" in
  "$root"/frontend/src/*.ts|"$root"/frontend/src/*.tsx|"$root"/frontend/src/*.css|\
  "$root"/frontend/src/*/*.ts|"$root"/frontend/src/*/*.tsx|"$root"/frontend/src/*/*.css|\
  "$root"/frontend/src/*/*/*.ts|"$root"/frontend/src/*/*/*.tsx|"$root"/frontend/src/*/*/*.css) ;;
  *) exit 0 ;;
esac

[ -f "$file" ] || exit 0
cd "$root/frontend" && npx --no-install prettier --write "$file" >/dev/null 2>&1
exit 0
