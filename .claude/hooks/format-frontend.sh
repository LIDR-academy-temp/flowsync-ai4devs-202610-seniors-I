#!/usr/bin/env bash
# Hook PostToolUse (Edit|Write): formatea con Prettier los archivos editados dentro de frontend/src/.
# Recibe por stdin el JSON del hook y lee tool_input.file_path.

file_path=$(jq -r '.tool_input.file_path // empty')
[ -z "$file_path" ] && exit 0

frontend_dir="$CLAUDE_PROJECT_DIR/frontend"

case "$file_path" in
  "$frontend_dir"/src/*)
    cd "$frontend_dir" || exit 0
    # --no: usa solo el Prettier instalado en frontend/, nunca lo descarga.
    npx --no -- prettier --write --ignore-unknown "$file_path" >/dev/null || true
    ;;
esac

exit 0
