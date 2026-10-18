// PostToolUse hook: formats edited files under frontend/src with the frontend's Prettier. Silent, never blocks.
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'

let data = ''
for await (const chunk of process.stdin) data += chunk

try {
  const payload = JSON.parse(data)
  const filePath = payload?.tool_input?.file_path
  const projectDir = resolve(process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd())
  if (typeof filePath === 'string' && filePath) {
    const file = resolve(payload.cwd || projectDir, filePath)
    const srcDir = join(projectDir, 'frontend', 'src')
    const inSrc = !relative(srcDir, file).startsWith('..') && relative(srcDir, file) !== ''
    const prettier = join(projectDir, 'frontend', 'node_modules', '.bin', 'prettier')
    if (inSrc && existsSync(file) && existsSync(prettier)) {
      spawnSync(prettier, ['--write', '--log-level', 'silent', file], {
        cwd: join(projectDir, 'frontend'),
        stdio: 'ignore',
      })
    }
  }
} catch {
  // formatting must never block
}
process.exit(0)
