// PostToolUse hook (Edit|Write): formatea con Prettier el archivo editado si está bajo frontend/src/.
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

let input = ''
for await (const chunk of process.stdin) input += chunk

const payload = JSON.parse(input || '{}')
const filePath = payload.tool_input?.file_path ?? payload.tool_response?.filePath
if (!filePath) process.exit(0)

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? payload.cwd ?? process.cwd()
const frontendDir = path.resolve(projectDir, 'frontend')
const srcDir = path.join(frontendDir, 'src')
const absolute = path.resolve(projectDir, filePath)

const rel = path.relative(srcDir, absolute)
if (rel.startsWith('..') || path.isAbsolute(rel) || !existsSync(absolute)) process.exit(0)

const prettier = path.join(frontendDir, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
try {
  execFileSync(process.execPath, [prettier, '--write', '--ignore-unknown', absolute], {
    cwd: frontendDir,
    stdio: ['ignore', 'ignore', 'pipe'],
  })
} catch (err) {
  // No bloquea al agente: avisa del fallo (p. ej. sintaxis inválida) y sigue.
  console.error(`prettier falló en ${filePath}: ${err.stderr?.toString() ?? err.message}`)
}
