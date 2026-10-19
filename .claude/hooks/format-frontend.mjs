import { spawnSync } from 'node:child_process';
import { resolve, sep } from 'node:path';

let input = '';
for await (const chunk of process.stdin) input += chunk;

try {
  const event = JSON.parse(input);
  const file = event.tool_input?.file_path ?? event.tool_input?.path ?? '';
  const frontendSrc = resolve('frontend', 'src') + sep;
  const target = resolve(file);
  if (!target.startsWith(frontendSrc)) process.exit(0);

  const frontend = resolve('frontend');
  const prettier = resolve(frontend, 'node_modules', 'prettier', 'bin', 'prettier.cjs');
  const result = spawnSync(process.execPath, [
    prettier,
    '--write',
    'src/**/*.{ts,tsx,js,jsx,css,json,html}',
  ], {
    cwd: frontend,
    stdio: 'inherit',
    shell: false,
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
} catch (error) {
  console.error(`Falló el hook de formato del frontend: ${error.message}`);
  process.exit(1);
}


