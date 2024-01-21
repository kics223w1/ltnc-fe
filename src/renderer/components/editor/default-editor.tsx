import { loader } from '@proxymanllc/better-monaco-editor-react';
import Editor from '@proxymanllc/better-monaco-editor-react';
import { MONACO_EDITOR_LANGUAGE } from '/renderer/models/constants';
import { useEffect, useState } from 'react';
import editorService from '/renderer/service/editor-service';

loader.config({ monaco: editorService.getDefaultMonacoEditor() });

type DefaultEditorProps = {
  readonly: boolean;
  value: string;
  language: MONACO_EDITOR_LANGUAGE;
  handleOnChange?: (editorValue: string) => void;
};

const DefaultEditor = ({
  readonly,
  value,
  language,
  handleOnChange,
}: DefaultEditorProps) => {
  const [editorOptions, setEditorOptions] = useState<any>(
    editorService.getDefaultOptions(readonly)
  );

  useEffect(() => {
    setEditorOptions(editorService.getDefaultOptions(readonly));
  }, [readonly]);

  return (
    <div className="w-full h-full" onKeyDown={(event: any) => {}}>
      <Editor
        options={editorOptions}
        value={value}
        theme="vs-dark"
        language={language}
        onChange={(value: string | undefined) => {
          if (handleOnChange && value) {
            handleOnChange(value);
          }
        }}
      ></Editor>
    </div>
  );
};

export default DefaultEditor;
