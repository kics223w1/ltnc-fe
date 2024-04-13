import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '/~/components/ui/button';

import { ICON_SVG, WINDOWS } from '/renderer/models/constants';
import IconSVG from '../utils/icon-svg';
import ConnectionConfigDialog from './connection-config-dialog';
import SignInDialog from './sigin-in-dialog';

type ParamsDialogLayout = {
  windowsID: WINDOWS;
  setWindowsID: (windowsID: WINDOWS | undefined) => void;
  showErrorToaster: (message: string) => void;
};

const noButtonCloseDialogs: WINDOWS[] = [WINDOWS.SIGN_IN];

const renderWindowDialog = (windowsID: WINDOWS, handClose: () => void) => {
  switch (windowsID) {
    case WINDOWS.CONNECTION_CONFIG:
      return <ConnectionConfigDialog handClose={handClose} />;
    case WINDOWS.SIGN_IN:
      return <SignInDialog />;
    default:
      return <ConnectionConfigDialog handClose={handClose} />;
  }
};

const DialogLayout = ({
  windowsID,
  setWindowsID,
  showErrorToaster,
}: ParamsDialogLayout) => {
  const handleClose = () => {
    setWindowsID(undefined);
  };

  return (
    <Transition.Root show={windowsID !== undefined} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen h-screen overflow-hidden">
          <div className="flex min-h-full items-end justify-center p-5 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-lg bg-[#161719] text-left shadow-xl transition-all w-fit h-full p-5`}
              >
                {!noButtonCloseDialogs.includes(windowsID) && (
                  <Button
                    className="absolute right-4"
                    variant={'ghost'}
                    size={'icon'}
                    onClick={() => {
                      setWindowsID(undefined);
                    }}
                  >
                    <IconSVG
                      iconName={ICON_SVG.XMARK_THICKER}
                      css="w-[10px] h-[10px]"
                      style={{}}
                    />
                  </Button>
                )}
                {renderWindowDialog(windowsID, handleClose)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DialogLayout;
