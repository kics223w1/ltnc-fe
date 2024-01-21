import CommandEditor from '../editor-panel/command-editor';

const TopPanelMainView = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="w-full h-[calc(100%-56px)]">
        <CommandEditor />
      </div>

      <div className="w-full h-14 border-t border-[#414141]"></div>
    </div>
  );
};

export default TopPanelMainView;
