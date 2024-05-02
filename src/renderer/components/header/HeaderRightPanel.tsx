import { Button } from '~/components/ui/button';
import { Dialog, DialogTrigger } from '/~/components/ui/dialog';
import DialogSignInContent from '../dialog/SignInContent';
import { LOGIN_SERVICE } from '../../../main/models/constants';
import User from '../../../main/models/user';

const styleDrag: any = {
  WebkitAppRegion: 'drag',
};

const styleNoDrag: any = {
  WebkitAppRegion: 'no-drag',
};

type HeaderRightPanelProps = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const HeaderRightPanel = ({ user, setUser }: HeaderRightPanelProps) => {
  const handleLogout = () => {
    setUser(undefined);
    window.electron.ipcRenderer.sendMessage(LOGIN_SERVICE.LOGOUT, {});
  };

  return (
    <div
      className="flex flex-shrink-0 items-center justify-between w-full h-12 border-b border-border pl-12 pt-1 gap-2"
      style={styleDrag}
    >
      {user ? (
        <>
          <Button onClick={handleLogout}>Đăng xuất</Button>
        </>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button style={styleNoDrag} variant={'default'} size={'sm'}>
              Đăng nhập
            </Button>
          </DialogTrigger>
          <DialogSignInContent />
        </Dialog>
      )}
    </div>
  );
};

export default HeaderRightPanel;
