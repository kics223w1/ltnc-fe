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
import { Checkbox } from '/~/components/ui/checkbox';

const DialogSignInContent = () => {
  const [account, setAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const handleLogin = () => {
    window.electron.ipcRenderer.sendMessage(LOGIN_SERVICE.LOGIN, {
      account,
      password,
      rememberMe: rememberMe,
    });
  };

  return (
    <>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Đăng nhập</DialogTitle>
          <DialogDescription>
            Đăng nhập để sử dụng các tính năng của hệ thống
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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

          <div
            className="grid grid-cols-4 items-center gap-4 cursor-pointer"
            onClick={() => {
              setRememberMe(!rememberMe);
            }}
          >
            <div className="flex items-end justify-end">
              <Checkbox checked={rememberMe} onChange={() => {}}></Checkbox>
            </div>
            <span className="col-span-3 text-muted-foreground">
              Ghi nhớ tài khoản trong 1 tháng
            </span>
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between w-full">
          <DialogClose className="w-full flex items-start pl-5">
            <Button variant={'outline'}>Huỷ bỏ</Button>
          </DialogClose>
          <Button onClick={handleLogin} type="submit">
            Đăng nhập
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogSignInContent;
