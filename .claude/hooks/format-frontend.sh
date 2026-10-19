#!/usr/bin/env bash
# PostToolUse: formatea con Prettier los archivos de frontend/src que edita el agente.
file=$(jq -r '.tool_input.file_path // empty')
case "$file" in
  "$CLAUDE_PROJECT_DIR"/frontend/src/*)
    cd "$CLAUDE_PROJECT_DIR/frontend" && npx --no-install prettier --write --ignore-unknown "$file" >/dev/null 2>&1
    ;;
esac
exit 0
