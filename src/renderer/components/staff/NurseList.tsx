import { Button } from '../../../~/components/ui/button';
import NurseTable from '../table/NurseTable';

const NurseList = () => {
  return (
    <div className="flex flex-col w-full h-full px-12 pt-10">
      <NurseTable />

      <div className="flex items-center justify-end gap-4 mt-5">
        <Button variant={'default'} size={'lg'}>
          Schedule
        </Button>
      </div>
    </div>
  );
};

export default NurseList;
