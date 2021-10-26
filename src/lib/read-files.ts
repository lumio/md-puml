import * as fastGlob from 'fast-glob';
import { promises as fs } from 'fs';

interface FileReturn {
  file: string;
  raw: string;
}

export default async function* readFiles(
  globPattern: string,
  ignorePattern?: string[]
): AsyncGenerator<FileReturn, void, void> {
  const fileList = await fastGlob(globPattern, {
    absolute: true,
    ignore: ignorePattern,
  });

  for (const file of fileList) {
    yield {
      file,
      raw: await fs.readFile(file, 'utf8'),
    };
  }
}
