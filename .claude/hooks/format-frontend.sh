#!/usr/bin/env bash
# PostToolUse hook: formats a file with the frontend's Prettier right after
# the agent edits it. Only acts on files under frontend/src/; anything else is ignored.
# Exit 2 = show stderr to the agent (e.g. Prettier could not parse the file).

file=$(jq -r '.tool_input.file_path // empty')
project_dir="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
frontend="$project_dir/frontend"

case "$file" in
  "$frontend"/src/*) ;;
  *) exit 0 ;;
esac
[ -f "$file" ] || exit 0

prettier="$frontend/node_modules/.bin/prettier"
if [ ! -x "$prettier" ]; then
  echo "format-frontend: Prettier is not installed; run 'npm install' in frontend/. $file was not formatted." >&2
  exit 2
fi

# --ignore-unknown skips files Prettier has no parser for (images, etc.).
if ! out=$(cd "$frontend" && "$prettier" --write --ignore-unknown "$file" 2>&1); then
  echo "format-frontend: Prettier failed on $file:" >&2
  echo "$out" >&2
  exit 2
fi

exit 0
