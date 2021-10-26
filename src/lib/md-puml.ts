import readFiles from './read-files';

interface MdPumlOptions {
  globPattern: string;
  ignorePattern: string[];
  assetsOutput: string;
}

const defaultOptions: MdPumlOptions = {
  globPattern: '**/*.md',
  ignorePattern: ['node_modules'],
  assetsOutput: './__generated-assets__',
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
    console.log(fileReturn);
  }
}
