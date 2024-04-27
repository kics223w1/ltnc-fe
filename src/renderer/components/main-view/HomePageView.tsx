import { Button } from '../../../~/components/ui/button';
import PatientBooking from '../patient/PatientBooking';

export default function HomePageView() {
  return (
    <div
      className="flex flex-col gap-10 items-center justify-center w-full h-full pt-5"
      style={{
        backgroundImage: 'url(https://images8.alphacoders.com/129/1295197.png)',
      }}
    >
      <PatientBooking isHomepage={true} />
    </div>
  );
}
