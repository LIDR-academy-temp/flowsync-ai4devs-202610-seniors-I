// PostToolUse hook: runs Prettier on files the agent edits under frontend/src/.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const input = JSON.parse(readFileSync(0, 'utf8'))
const filePath = input.tool_input?.file_path
if (!filePath) process.exit(0)

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? input.cwd
const frontendDir = path.join(projectDir, 'frontend')
const relative = path.relative(path.join(frontendDir, 'src'), path.resolve(filePath))
if (relative.startsWith('..') || path.isAbsolute(relative) || !existsSync(filePath)) process.exit(0)

const prettier = path.join(frontendDir, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
try {
  execFileSync(process.execPath, [prettier, '--write', '--ignore-unknown', filePath], {
    cwd: frontendDir,
    stdio: ['ignore', 'ignore', 'pipe'],
  })
} catch (error) {
  // Exit code 2 feeds stderr back to the agent so it can fix the syntax error.
  process.stderr.write(`Prettier failed on ${filePath}:\n${error.stderr ?? error.message}`)
  process.exit(2)
}
