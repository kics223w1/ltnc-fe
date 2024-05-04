import { Button } from '../../../~/components/ui/button';
import { useState, useEffect } from 'react';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import Machine from '/main/models/machine';
import MachineTable from '../table/MachineTable';
import DialogEditMachineContent from '../dialog/EditMachineContent';
import { MACHINE_SERVICE } from '/main/models/constants';
import AlertConfirm from '../alert/AlertConfirm';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '../../../~/components/ui/alert-dialog';
import { useToast } from '../../../~/components/ui/use-toast';
import DialogAddMachineContent from '../dialog/AddMachineContent';

const AdminMachineDashboard = () => {
  const [selectedMachines, setSelectedMachines] = useState<Machine[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    handleLoadMachines();
  }, []);

  const handleLoadMachines = async () => {
    const values = await window.electron.ipcRenderer.invoke(
      MACHINE_SERVICE.RELOAD_MACHINES,
      {}
    );
    setMachines(values);
  };

  const handleDeleteMachine = async () => {
    const machine =
      selectedMachines.length > 0
        ? selectedMachines[selectedMachines.length - 1]
        : undefined;

    if (!machine) {
      return;
    }

    const response = await window.electron.ipcRenderer.invoke(
      MACHINE_SERVICE.DELETE_MACHINE,
      {
        id: machine.id,
      }
    );

    if (response === 'Success!') {
      toast({
        variant: 'default',
        title: 'Xóa máy thành công',
      });
      await handleLoadMachines();
    } else {
      toast({
        variant: 'destructive',
        title: 'Xóa máy thất bại',
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full px-12 py-10 overflow-auto">
      <MachineTable
        machines={machines}
        handleLoadMachines={handleLoadMachines}
        setSelectedMachines={setSelectedMachines}
      />
      <div className="flex items-center justify-end gap-3">
        <Dialog>
          <DialogTrigger disabled={selectedMachines.length === 0}>
            <Button
              variant={'outline'}
              size={'lg'}
              disabled={selectedMachines.length === 0}
            >
              Chỉnh sửa
            </Button>
          </DialogTrigger>
          {selectedMachines.length > 0 && (
            <DialogEditMachineContent
              machine={selectedMachines[selectedMachines.length - 1]}
            />
          )}
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger disabled={selectedMachines.length === 0}>
            <Button
              className="bg-red-500 text-white"
              variant={'default'}
              size={'lg'}
              disabled={selectedMachines.length === 0}
            >
              Xóa
            </Button>
          </AlertDialogTrigger>
          {selectedMachines.length > 0 && (
            <AlertConfirm handleAction={handleDeleteMachine}></AlertConfirm>
          )}
        </AlertDialog>

        <Dialog>
          <DialogTrigger>
            <Button variant={'default'} size={'lg'}>
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogAddMachineContent />
        </Dialog>
      </div>
    </div>
  );
};

export default AdminMachineDashboard;
