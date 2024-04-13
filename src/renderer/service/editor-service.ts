import * as monaco from 'monaco-editor';
import {
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  TAB_WIDTH,
} from '../models/constants';
import { getSFProString } from '../models/utils';

type Monaco = typeof monaco;

class EditorService {
  private wordWrap: boolean;
  private isShowMiniMap: boolean;
  private isShowInvisible: boolean;
  private isScrollBeyondLastLine: boolean;
  private fontSize: FONT_SIZE;
  private fontWeight: FONT_WEIGHT;
  private tabWidth: TAB_WIDTH;

  constructor() {
    this.wordWrap = false;
    this.isShowMiniMap = false;
    this.isShowInvisible = false;
    this.isScrollBeyondLastLine = false;
    this.fontSize = FONT_SIZE.TWELVE;
    this.fontWeight = FONT_WEIGHT.MEDIUM;
    this.tabWidth = TAB_WIDTH.FOUR_SPACES;
  }

  public getDefaultMonacoEditor(): Monaco {
    return monaco;
  }

  public getDefaultOptions(readOnly: boolean): any {
    return {
      value: '',
      automaticLayout: true,
      readOnly,
      theme: 'vs-dark',
      renderWhitespace: this.isShowInvisible ? 'all' : 'none',
      // Need to double the tabSize value to make sure the UI is the same as Proxyman macOS.
      // Must set property `detectIndentation` to false so the tabSize can work.
      tabSize: this.tabWidth === TAB_WIDTH.TWO_SPACES ? 4 : 8,
      detectIndentation: false,
      wordWrap: this.wordWrap ? 'on' : 'off',
      folding: true,
      fontSize: this.getFontSizeString(),
      fontFamily: getSFProString(this.fontWeight),
      foldingStrategy: 'auto',
      showFoldingControls: 'always',
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
      selectionHighlight: true,
      autoClosingQuotes: 'always',
      autoClosingBrackets: 'always',
      scrollBeyondLastLine: this.isScrollBeyondLastLine,
      renderValidationDecorations: 'on',
      wordBasedSuggestions: true,
      wordSeparators: `~!@#$%^&*()-=+[{]}\|;:'",.<>/?`,
      minimap: {
        enabled: this.isShowMiniMap,
      },
    };
  }

  private getFontSizeString() {
    switch (this.fontSize) {
      case FONT_SIZE.TEN:
        return '11px';
      case FONT_SIZE.ELEVEN:
        return '12px';
      case FONT_SIZE.TWELVE:
        return '13px';
      case FONT_SIZE.THIRTEEN:
        return '14px';
      case FONT_SIZE.FOURTEEN:
        return '15px';
      case FONT_SIZE.FIFTEEN:
        return '16px';
      case FONT_SIZE.SIXTEEN:
        return '17px';
      case FONT_SIZE.SEVENTEEN:
        return '18px';
      case FONT_SIZE.EIGHTEEN:
        return '19px';
      case FONT_SIZE.NINETEEN:
        return '20px';
      case FONT_SIZE.TWENTY:
        return '21px';
      case FONT_SIZE.TWENTY_FOUR:
        return '25px';
      case FONT_SIZE.TWENTY_EIGHT:
        return '29px';
      default:
        return '13px';
    }
  }
}

export default new EditorService();
