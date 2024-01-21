import * as monaco from 'monaco-editor';

type Monaco = typeof monaco;

class EditorService {
  constructor() {}

  public getDefaultMonacoEditor(): Monaco {
    return monaco;
  }

  public getDefaultOptions(readOnly: boolean): any {
    return {
      value: '',
      automaticLayout: true,
      readOnly,
      theme: 'vs-light',
      renderWhitespace: 'none',
      // Need to double the tabSize value to make sure the UI is the same as Proxyman macOS.
      // Must set property `detectIndentation` to false so the tabSize can work.
      tabSize: 4,
      detectIndentation: false,
      wordWrap: 'on',
      folding: true,
      foldingStrategy: 'auto',
      showFoldingControls: 'always',
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
      selectionHighlight: true,
      autoClosingQuotes: 'always',
      autoClosingBrackets: 'always',
      scrollBeyondLastLine: true,
      renderValidationDecorations: 'on',
      wordBasedSuggestions: true,
      wordSeparators: `~!@#$%^&*()-=+[{]}\|;:'",.<>/?`,
      minimap: {
        enabled: true,
      },
    };
  }
}

export default new EditorService();
