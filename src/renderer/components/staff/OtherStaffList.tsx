import { Button } from '../../../~/components/ui/button';
import OtherStaffTable from '../table/OtherStaffTable';

const OtherStaffList = () => {
  return (
    <div className="flex flex-col w-full h-full px-12 pt-10">
      <OtherStaffTable />
      <div className="flex items-center justify-end gap-4 mt-5">
        <Button variant={'default'} size={'lg'}>
          Schedule
        </Button>
      </div>
    </div>
  );
};

export default OtherStaffList;
