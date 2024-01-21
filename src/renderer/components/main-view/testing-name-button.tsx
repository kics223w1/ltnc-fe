import TestingEntry from '/main/models/testing-entry';
import { FONT_WEIGHT } from '/renderer/models/constants';
import { getSFProString } from '/renderer/models/utils';

type TestingNameButtonProps = {
  entry: TestingEntry;
};

const TestingNameButton = ({ entry }: TestingNameButtonProps) => {
  console.log(entry.bgColor);

  return (
    <div
      className={`flex items-center justify-center py-5 ${entry.bgColor} rounded cursor-pointer overflow-hidden hover:shadow-md transform hover:scale-105 transition-transform duration-300`}
    >
      <span
        className="text-sm text-center text-black"
        style={{
          fontFamily: getSFProString(FONT_WEIGHT.MEDIUM),
        }}
      >
        {entry.name}
      </span>
    </div>
  );
};

export default TestingNameButton;
