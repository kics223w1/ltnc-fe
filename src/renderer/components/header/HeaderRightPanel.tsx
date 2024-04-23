import { Button } from '~/components/ui/button';
import { Dialog, DialogTrigger } from '/~/components/ui/dialog';
import DialogSignInContent from '../dialog/SignInContent';
import DialogSignUpContent from '../dialog/SignUpContent';
import IconSVG from '../utils/icon-svg';
import { ICON_SVG } from '../../../main/models/constants';

const styleDrag: any = {
  WebkitAppRegion: 'drag',
};

const styleNoDrag: any = {
  WebkitAppRegion: 'no-drag',
};

const HeaderRightPanel = () => {
  return (
    <div
      className="flex flex-shrink-0 items-center justify-between w-full h-12 border-b border-border pl-12 pt-1 gap-2"
      style={styleDrag}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button
            style={styleNoDrag}
            variant={'default'}
            size={'sm'}
            className="px-5 mr-1"
          >
            Đăng nhập
          </Button>
        </DialogTrigger>
        <DialogSignInContent />
      </Dialog>
    </div>
  );
};

export default HeaderRightPanel;
