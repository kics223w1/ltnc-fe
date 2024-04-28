import { Button } from '../../../~/components/ui/button';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import DialogSignInContent from '../dialog/SignInContent';
import DialogSignUpContent from '../dialog/SignUpContent';
import PatientBooking from '../patient/PatientBooking';

export default function HomePageView() {
  return (
    <div
      className="flex flex-col gap-10 items-center justify-center w-full h-full pt-5"
      style={{
        backgroundImage: 'url(https://images8.alphacoders.com/129/1295197.png)',
      }}
    >
      <div className="flex flex-col gap-10 rounded bg-muted p-10 bg-blue-400">
        <Dialog>
          <DialogTrigger>
            <Button size={'lg'} className="w-40 h-10">
              Đăng kí
            </Button>
          </DialogTrigger>
          <DialogSignUpContent></DialogSignUpContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button className="w-40 h-10">Đăng nhập</Button>
          </DialogTrigger>
          <DialogSignInContent></DialogSignInContent>
        </Dialog>
      </div>
    </div>
  );
}
