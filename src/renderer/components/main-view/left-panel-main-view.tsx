import TestingNameButton from './testing-name-button';
import TestingEntry from '/main/models/testing-entry';

const generateRandomColor = () => {
  // You can replace this with your logic to generate random colors
  const arr = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
  return arr[Math.floor(Math.random() * arr.length)];
};

const generateRandomQuery = () => {
  // You can replace this with your logic to generate random queries
  // For example, a simple SELECT statement with a random table
  const tables = ['users', 'products', 'orders', 'employees'];
  return `SELECT * FROM ${tables[Math.floor(Math.random() * tables.length)]}`;
};

const arr = Array.from({ length: 60 }, (_, index) => {
  return new TestingEntry(generateRandomQuery(), generateRandomColor());
});

const LeftPanelMainView = () => {
  return (
    <div className="flex flex-col gap-5 w-full h-full py-5 px-8 overflow-y-auto overflow-x-hidden">
      {arr.map((entry, index) => (
        <TestingNameButton key={index} entry={entry} />
      ))}
    </div>
  );
};

export default LeftPanelMainView;
