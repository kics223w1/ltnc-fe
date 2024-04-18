import { Button } from '~/components/ui/button';
import { openDialog } from '/renderer/ipc-service';
import { ICON_SVG, WINDOWS } from '/renderer/models/constants';
import IconSVG from '../utils/icon-svg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '/~/components/ui/dialog';
import { Label } from '/~/components/ui/label';
import { Input } from '/~/components/ui/input';
import DialogSignInContent from '../dialog/SignInContent';
import DialogSignUpContent from '../dialog/SignUpContent';

const HeaderRightPanel = () => {
  return (
    <div className="flex flex-shrink-0 items-center justify-end w-full h-12 border-b border-border px-4 pt-1 gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} size={'sm'} className="px-5 mr-1">
            Sign Up
          </Button>
        </DialogTrigger>
        <DialogSignUpContent />
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'default'} size={'sm'} className="px-5 mr-1">
            Sign In
          </Button>
        </DialogTrigger>
        <DialogSignInContent />
      </Dialog>

      <Button variant={'ghost'} size={'icon'}>
        <IconSVG iconName={ICON_SVG.BELL} css="w-4 h-4" style={{}} />
      </Button>
    </div>
  );
};

export default HeaderRightPanel;
