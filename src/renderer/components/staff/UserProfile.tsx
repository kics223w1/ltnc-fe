import { useEffect, useState } from 'react';
import User from '../../../main/models/user';
import { LOGIN_SERVICE } from '../../../main/models/constants';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import { Button } from '../../../~/components/ui/button';
import DialogEditDoctorContent from '../dialog/EditDoctorContent';
import moment from 'moment';

export default function UserProfile() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const setup = async () => {
      const newUsers = await window.electron.ipcRenderer.invoke(
        LOGIN_SERVICE.GET_USER,
        {}
      );
      setUser(newUsers);
    };

    setup();
  }, []);

  if (!user) {
    return <></>;
  }

  const handleReload = async () => {
    setIsLoading(true);
    const newUsers = await window.electron.ipcRenderer.invoke(
      LOGIN_SERVICE.RELOAD_USER,
      {}
    );
    setUser(newUsers);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col pt-10 px-12 gap-2 w-full h-full">
      <h1 className="text-2xl font-sfProSemiBold">Thông tin cá nhân</h1>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Họ và tên: </span>
        <span>{getTitle(user.userName)}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Chức vụ: </span>
        <span>{getTitle(user.role)}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Giới tính: </span>
        <span>
          {getTitle(
            user.isMale === undefined
              ? 'Chưa cập nhật'
              : user.isMale
              ? 'Nam'
              : 'Nữ'
          )}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Ngày sinh: </span>
        <span>
          {' '}
          {user.dateOfBirth
            ? moment(user.dateOfBirth).format('DD/MM/YYYY')
            : 'Chưa cập nhật'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Số điện thoại: </span>
        <span>{getTitle(user.phone)}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Email: </span>
        <span>{getTitle(user.email)}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">CID: </span>
        <span>{getTitle(user.CID)}</span>
      </div>

      <div className="flex w-full items-center gap-5 mt-2">
        <Dialog>
          <DialogTrigger>
            <Button variant={'default'} size={'lg'}>
              Cập nhật hồ sơ
            </Button>
          </DialogTrigger>

          {user && (
            <DialogEditDoctorContent
              handleClose={() => {}}
              doctor={user}
            ></DialogEditDoctorContent>
          )}
        </Dialog>

        <Button
          onClick={handleReload}
          disabled={isLoading}
          variant={'outline'}
          size={'lg'}
        >
          {isLoading && 'Đang tải...'}
          Làm mới
        </Button>
      </div>
    </div>
  );
}

function getTitle(str: string | undefined) {
  return str ? str : 'Chưa cập nhật';
}
