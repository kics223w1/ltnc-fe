import { ModeToggle } from '../theme/ModeToggle';
import { Button } from '~/components/ui/button';
import { openDialog } from '/renderer/ipc-service';
import { ICON_SVG, WINDOWS } from '/renderer/models/constants';
import IconSVG from '../utils/icon-svg';

const HeaderRightPanel = () => {
  return (
    <div className="flex items-center justify-end w-full h-12 border-b border-border px-4 pt-1 gap-3">
      <Button
        variant={'default'}
        size={'sm'}
        className="px-5"
        onClick={() => {
          openDialog(WINDOWS.SIGN_IN);
        }}
      >
        Sign In
      </Button>
      <Button variant={'ghost'} size={'icon'}>
        <IconSVG iconName={ICON_SVG.BELL} css="w-4 h-4" style={{}} />
      </Button>
      <ModeToggle />
    </div>
  );
};

export default HeaderRightPanel;
