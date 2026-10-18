// Hook PostToolUse: formatea con Prettier los archivos de frontend/src que edita el agente.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.json', '.md', '.html'])

let raw = ''
for await (const chunk of process.stdin) raw += chunk

const input = JSON.parse(raw || '{}')
const filePath = input.tool_input?.file_path
if (!filePath) process.exit(0)

const projectDir = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd()
const frontendDir = path.join(projectDir, 'frontend')
const srcDir = path.join(frontendDir, 'src')
const absolute = path.resolve(projectDir, filePath)
const relative = path.relative(srcDir, absolute)

const insideSrc = relative && !relative.startsWith('..') && !path.isAbsolute(relative)
if (!insideSrc || !EXTENSIONS.has(path.extname(absolute)) || !existsSync(absolute)) process.exit(0)

const prettier = path.join(frontendDir, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
if (!existsSync(prettier)) {
  console.error('Prettier no está instalado en frontend/: ejecuta npm install en frontend/.')
  process.exit(1)
}

const result = spawnSync(process.execPath, [prettier, '--write', absolute], {
  cwd: frontendDir,
  encoding: 'utf8',
})
if (result.status !== 0) {
  // exit 2: el error de Prettier vuelve al agente para que lo corrija.
  console.error(`Prettier falló en ${filePath}:\n${result.stderr}`)
  process.exit(2)
}
