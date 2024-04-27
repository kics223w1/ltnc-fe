import { Button } from '~/components/ui/button';
import { Dialog, DialogTrigger } from '/~/components/ui/dialog';
import DialogSignInContent from '../dialog/SignInContent';
import {
  EVENTS_FROM_MAIN_PROCESS,
  LOGIN_SERVICE,
  ROLE,
} from '../../../main/models/constants';
import { useEffect, useState } from 'react';

const styleDrag: any = {
  WebkitAppRegion: 'drag',
};

const styleNoDrag: any = {
  WebkitAppRegion: 'no-drag',
};

type HeaderRightPanelProps = {
  userRole: ROLE | undefined;
  setUserRole: (role: ROLE | undefined) => void;
};

const HeaderRightPanel = ({ userRole, setUserRole }: HeaderRightPanelProps) => {
  const handleLogout = () => {
    setUserRole(undefined);
    window.electron.ipcRenderer.sendMessage(LOGIN_SERVICE.LOGOUT, {});
  };

  return (
    <div
      className="flex flex-shrink-0 items-center justify-between w-full h-12 border-b border-border pl-12 pt-1 gap-2"
      style={styleDrag}
    >
      {userRole ? (
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
