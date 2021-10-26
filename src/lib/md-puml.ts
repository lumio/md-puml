import { promises as fs } from 'fs';
import readFiles from './read-files';
import parseMd from './parse-md';
import hash from './hash';

interface MdPumlOptions {
  globPattern: string;
  ignorePattern: string[];
  assetsOutput: string;
  outputFormat: 'svg' | 'png';
}

const defaultOptions: MdPumlOptions = {
  globPattern: '**/*.md',
  ignorePattern: ['node_modules'],
  assetsOutput: './__generated-assets__',
  outputFormat: 'svg',
};

export default async function mdPuml(options: Partial<MdPumlOptions>) {
  const usedOptions = {
    ...defaultOptions,
    ...options,
  };

  const fileList = await readFiles(
    usedOptions.globPattern,
    usedOptions.ignorePattern
  );
  for await (let fileReturn of fileList) {
    const { file, content } = fileReturn;
    const hashedContent = hash(content);
    const result = parseMd(file, content);

    // await generatePlantUmlFromHashMap(hashesToGenerate, hashesFileMap);

    if (hashedContent !== hash(result.processedContent)) {
      await fs.writeFile(file, result.processedContent);
    }
  }
}
