import { Button } from '../../../~/components/ui/button';

type Params = {
  doctorName: string;
  time: string;
  imageSrc: string;
};

const BookingBox = ({ doctorName, time, imageSrc }: Params) => {
  return (
    <div className="flex items-center justify-between w-full p-3 rounded border border-border">
      <div className="flex items-center gap-3 w-full h-full">
        <img className="w-14 h-14 rounded-full" src={imageSrc}></img>
        <div className="flex flex-col -mt-1">
          <span className="text-xl font-sfProSemiBold">{doctorName}</span>
          <span className="font-sfProRegular text-sm">{time}</span>
        </div>
      </div>

      <div className="flex items-center h-full gap-4">
        <Button size={'lg'} variant={'outline'}>
          Details
        </Button>
        <Button size={'lg'}>Book</Button>
      </div>
    </div>
  );
};

export default BookingBox;
