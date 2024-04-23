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

const DialogSignInContent = () => {
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
              placeholder="Nhập tài khoản của bạn"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Mật khẩu
            </Label>
            <Input
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
          <Button type="submit">Đăng nhập</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DialogSignInContent;
