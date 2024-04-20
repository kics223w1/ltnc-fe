import { Button } from '~/components/ui/button';
import { Dialog, DialogTrigger } from '/~/components/ui/dialog';
import DialogSignInContent from '../dialog/SignInContent';
import DialogSignUpContent from '../dialog/SignUpContent';

const HeaderRightPanel = () => {
  return (
    <div className="flex flex-shrink-0 items-center w-full h-12 border-b border-border px-4 pt-1 gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} size={'sm'} className="px-5 mr-1">
            Đăng ký
          </Button>
        </DialogTrigger>
        <DialogSignUpContent />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'default'} size={'sm'} className="px-5 mr-1">
            Đăng nhập
          </Button>
        </DialogTrigger>
        <DialogSignInContent />
      </Dialog>
    </div>
  );
};

export default HeaderRightPanel;
