// PostToolUse (Write|Edit): formatea con Prettier los archivos editados dentro de frontend/src/.
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const input = JSON.parse(readFileSync(0, 'utf8'))
const filePath = input.tool_input?.file_path ?? input.tool_response?.filePath
if (!filePath) process.exit(0)

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd()
const frontendDir = path.resolve(projectDir, 'frontend')
const srcDir = path.join(frontendDir, 'src')
const absFile = path.resolve(projectDir, filePath)

const rel = path.relative(srcDir, absFile)
if (rel.startsWith('..') || path.isAbsolute(rel)) process.exit(0)

const prettierBin = path.join(frontendDir, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
if (!existsSync(prettierBin)) process.exit(0)

execFileSync(process.execPath, [prettierBin, '--write', '--ignore-unknown', absFile], {
  cwd: frontendDir,
  stdio: ['ignore', 'ignore', 'inherit'],
})
