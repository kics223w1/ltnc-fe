import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../~/components/ui/alert-dialog';

type Params = {
  handleAction: () => void;
};

export default function AlertConfirm({ handleAction }: Params) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Bạn chắc chắn muốn thực hiện thao tác này?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Thao tác này không thể hoàn tác, bạn có chắc chắn muốn tiếp tục?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Huỷ bỏ</AlertDialogCancel>
        <AlertDialogAction onClick={handleAction}>Thực hiện</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
