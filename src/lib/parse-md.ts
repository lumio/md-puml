/**
 * The regex pattern to find already processed plantUML code blocks
 */
const GENERATED_PATTERN =
  '(<!-- puml:(?<hash>.+?) -->\\s+!\\[(?<alt>.+?)\\]\\((?<file>.+?)\\)' +
  '\\s+<details>\\s+<summary>(?<toggleText>.+?)<\\/summary>\\s+```puml( (?<customAlt1>.+?))?\\s+(?<code1>[\\s\\S]+?)```\\s+<\\/details>)';
/**
 * The regex pattern to find plantUML code blocks
 */
const CODE_PATTERN =
  '(([ ]{4}|\\t)?```puml( (?<customAlt2>.+?))?\\s+(?<code2>[\\s\\S]+?)```)';
/**
 * The regex pattern to find a generated image from a linked puml file
 */
const GENERATED_PUML_IMAGE_PATTERN =
  '(<!-- puml-ref:"(?<originalFilePumlRef>.+?)" puml:(?<hashRef>.+?) -->\\s+!\\[(?<altRef>.+?)\\]\\((?<fileGeneratedRef>.+?)\\))';
/**
 * The regex pattern to find image referencing a puml file
 */
const PUML_IMAGE_PATTERN =
  '(([ ]{4}|\\t)?!\\[(?<altRefImage>.+?)\\]\\((?<filePumlRef>.+?\\.puml)\\))';
/**
 * A combination of both the GENERATED_PATTERN and CODE_PATTERN to find both
 */
const MAIN_REGEX = new RegExp(
  // Parsing an already processed code block
  GENERATED_PATTERN +
    '|' +
    // Parsing a regular code block
    CODE_PATTERN +
    '|' +
    // Parsing an already processed puml image red
    GENERATED_PUML_IMAGE_PATTERN +
    '|' +
    // Parsing a referenced puml image
    PUML_IMAGE_PATTERN,
  'gm'
);
const GENERATED_PUML_IMAGE_PATTERN_REGEX = new RegExp(
  GENERATED_PUML_IMAGE_PATTERN
);
const PUML_IMAGE_PATTERN_REGEX = new RegExp(PUML_IMAGE_PATTERN);
const GENERATED_REGEX = new RegExp(GENERATED_PATTERN);
const CODE_REGEX = new RegExp(CODE_PATTERN);

interface GenerateGraphs {
  [key: string]: {
    file: string;
    code: string;
  };
}

export default function parseMd(
  file: string,
  content: string
): {
  generateGraphs: GenerateGraphs;
  processedContent: string;
} {
  const generateGraphs: GenerateGraphs = {};
  const processedContent = content.replace(MAIN_REGEX, (match) => {
    const parsed =
      GENERATED_REGEX.exec(match) ||
      CODE_REGEX.exec(match) ||
      GENERATED_PUML_IMAGE_PATTERN_REGEX.exec(match) ||
      PUML_IMAGE_PATTERN_REGEX.exec(match);

    if (parsed == null) {
      return match;
    }

    const groups = parsed.groups;
    if (!groups) {
      return match;
    }

    let result: any;
    if (groups.fileGeneratedRef) {
      // Code comes from https://github.com/lumio/test-plant
      // result = generateFromPumlImage(
      //   file,
      //   match,
      //   groups.originalFilePumlRef,
      //   groups.altRef,
      //   groups.hashRef,
      //   options
      // );
    } else if (groups.filePumlRef) {
      // Code comes from https://github.com/lumio/test-plant
      // result = generateFromPumlImage(
      //   file,
      //   match,
      //   groups.filePumlRef,
      //   groups.altRefImage
      // );
    } else if (groups.code1) {
      // Code comes from https://github.com/lumio/test-plant
      // result = updateGeneratedHtml(file, match, groups, options);
    } else if (groups.code2) {
      // Code comes from https://github.com/lumio/test-plant
      // result = generateHtmlFromCodeBlock(file, match, groups);
    }

    if (typeof result === 'string') {
      return result;
    }
    if (result == null) {
      return match;
    }

    if (result.codeHash) {
      generateGraphs[result.codeHash] = {
        file: result.file,
        code: result.generateFromCode,
      };
    }

    return result.generated || match;
  });

  return {
    generateGraphs,
    processedContent,
  };
}
