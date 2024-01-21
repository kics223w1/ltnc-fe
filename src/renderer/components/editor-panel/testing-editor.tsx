import { useState } from 'react';
import DefaultEditor from '../editor/default-editor';
import { MONACO_EDITOR_LANGUAGE } from '/renderer/models/constants';

const TestingEditor = () => {
  const [value, setValue] = useState<string>('');

  return (
    <DefaultEditor
      value={value}
      readonly={false}
      language={MONACO_EDITOR_LANGUAGE.JSON}
      handleOnChange={(editorValue: string) => {
        setValue(editorValue);
      }}
    />
  );
};

export default TestingEditor;
