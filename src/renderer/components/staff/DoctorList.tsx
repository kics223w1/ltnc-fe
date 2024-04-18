import { Button } from '../../../~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../~/components/ui/tooltip';
import DoctorTable from '../table/DoctorTable';

const DoctorList = () => {
  return (
    <div className="flex flex-col pt-10 px-12 w-full h-full">
      <DoctorTable />

      <div className="flex items-center justify-end gap-4 mt-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={'default'} size={'lg'}>
                Schedule
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See doctor's schedule</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DoctorList;
