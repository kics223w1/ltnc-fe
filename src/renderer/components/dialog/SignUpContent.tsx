import { useState } from 'react';
import { LOGIN_SERVICE } from '../../../main/models/constants';
import { Button } from '../../../~/components/ui/button';
import { Input } from '../../../~/components/ui/input';
import { Label } from '../../../~/components/ui/label';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '/~/components/ui/dialog';

const DialogSignUpContent = () => {
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleSignUp = () => {
    window.electron.ipcRenderer.sendMessage(LOGIN_SERVICE.SIGN_UP, {
      account,
      password,
      fullName,
      phoneNumber,
    });
  };

  return (
    <>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Đăng kí</DialogTitle>
          <DialogDescription>
            Đăng kí để đăng nhập vào hệ thống
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Họ và tên
            </Label>
            <Input
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập họ và tên của bạn"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Số điện thoại
            </Label>
            <Input
              type="tel"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại của bạn"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tài khoản
            </Label>
            <Input
              onChange={(e) => setAccount(e.target.value)}
              placeholder="Nhập tài khoản của bạn"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Mật khẩu
            </Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu của bạn"
              type="password"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between w-full">
          <DialogClose className="w-full flex items-start pl-5">
            <Button variant={'outline'}>Huỷ bỏ</Button>
          </DialogClose>
          <Button
            disabled={!account || !password || !fullName || !phoneNumber}
            onClick={handleSignUp}
            type="submit"
          >
            Đăng kí
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogSignUpContent;
