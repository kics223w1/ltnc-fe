import { useState } from 'react';
import { LOGIN_SERVICE, USER_SERVICE } from '../../../main/models/constants';
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

const DialogAddDoctorContent = () => {
  const [user_name, setUser_name] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleDone = async () => {
    const response: string = await window.electron.ipcRenderer.invoke(
      USER_SERVICE.ADD_DOCTOR,
      {
        user_name,
        password,
        email,
      }
    );

    // Success
    if (response === 'Success!') {
      setEmail('');
      setUser_name('');
      setPassword('');
      setErrorMessage('');

      setSuccessMessage(
        'Thêm bác sĩ thành công. Làm mới bảng để xem thay đổi!'
      );
      return;
    }

    setErrorMessage(response);
  };

  return (
    <>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Thêm bác sĩ</DialogTitle>
          <DialogDescription>Thêm bác sĩ mới vào hệ thống</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tài khoản
            </Label>
            <Input
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
              placeholder="Nhập tài khoản của bạn"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Mật khẩu
            </Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu của bạn"
              type="password"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="" className="text-right"></Label>
            {errorMessage && (
              <span className="text-red-400 text-sm col-span-3">
                {errorMessage}
              </span>
            )}
            {successMessage && (
              <span className="text-green-400 text-sm col-span-3">
                {successMessage}
              </span>
            )}
          </div>
        </div>
        <DialogFooter className="flex items-center justify-between w-full">
          <DialogClose className="w-full flex items-start pl-5">
            <Button variant={'outline'}>Huỷ bỏ</Button>
          </DialogClose>
          <Button
            disabled={!user_name || !password || !email}
            onClick={handleDone}
          >
            Hoàn tất
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogAddDoctorContent;
