import { cp, mkdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const output = join(root, 'dist');
const pages = ['index.html', 'producto.html', 'nosotros.html', 'informacion.html'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(pages.map((page) => cp(join(root, page), join(output, page))));
await cp(join(root, 'assets'), join(output, 'assets'), { recursive: true });
console.log(`CashPE static site built in ${output}`);
