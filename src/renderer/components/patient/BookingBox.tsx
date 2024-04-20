import { Button } from '../../../~/components/ui/button';

type Params = {
  doctorName: string;
  time: string;
};

const BookingBox = ({ doctorName, time }: Params) => {
  const handleBooking = () => {};

  return (
    <div className="flex items-center justify-between w-full p-3 rounded border border-border">
      <div className="flex items-center gap-3 w-full h-full">
        <div className="flex flex-col -mt-1">
          <span className="text-xl font-sfProSemiBold">{doctorName}</span>
          <span className="font-sfProRegular text-sm">{time}</span>
        </div>
      </div>

      <div className="flex items-center h-full gap-4">
        <Button size={'lg'} variant={'outline'}>
          Chi tiết
        </Button>
        <Button onClick={handleBooking} size={'lg'}>
          Đặt lịch
        </Button>
      </div>
    </div>
  );
};

export default BookingBox;
