#!/usr/bin/env bash
# PostToolUse hook: formatea con Prettier los archivos de frontend/src que el agente acaba de editar.
file=$(jq -r '.tool_input.file_path // empty')
case "$file" in
  */frontend/src/*.ts|*/frontend/src/*.tsx|*/frontend/src/*.css)
    cd "$(dirname "$file")/../.." && npx --no-install prettier --write "$file" >/dev/null 2>&1 ;;
esac
exit 0
