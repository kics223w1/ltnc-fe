import CommandEditor from '../editor-panel/command-editor';

const BottomPanelMainView = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <CommandEditor />
    </div>
  );
};

export default BottomPanelMainView;
