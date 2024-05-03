import { Button } from '../../../~/components/ui/button';
import { useState, useEffect } from 'react';
import * as Form from '@radix-ui/react-form';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import Machine from '/main/models/machine';
import MachineTable from '../table/MachineTable';
import DialogAddMachineContent from '../dialog/AddMachineContent';
import DialogEditMachineContent from '../dialog/EditMachineContent';
import DialogDeleteMachineContent from '../dialog/MachineContent';
import { MACHINE_SERVICE } from '/main/models/constants';

const AdminMachineDashboard = () => {
  const [selectedMachines, setSelectedMachines] = useState<Machine[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    handleLoadMachines();
  }, []);

  const handleLoadMachines = async () => {
    const values = await window.electron.ipcRenderer.invoke(
      MACHINE_SERVICE.GET_MACHINES,
      {}
    );
    setMachines(values);
  };

  const handleAddMachine = () => {
    handleLoadMachines();
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
              onSave={handleAddMachine}
              onClose={() => setSelectedMachines([])}
            />
          )}
        </Dialog>
        <Dialog>
          <DialogTrigger disabled={selectedMachines.length === 0}>
            <Button
              className="bg-red-500 text-white"
              variant={'default'}
              size={'lg'}
              disabled={selectedMachines.length === 0}
            >
              Xóa
            </Button>
          </DialogTrigger>
          {selectedMachines.length > 0 && (
            <DialogDeleteMachineContent
              machine={selectedMachines[selectedMachines.length - 1]}
              onSave={handleAddMachine}
              onClose={() => setSelectedMachines([])}
            />
          )}
        </Dialog>

        <Dialog>
          <DialogTrigger>
            <Button
              variant={'default'}
              size={'lg'}
              onClick={() => setIsAddFormOpen(true)}
            >
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogAddMachineContent
            isOpen={isAddFormOpen}
            setIsOpen={setIsAddFormOpen}
            handleAddMachine={handleAddMachine}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default AdminMachineDashboard;
