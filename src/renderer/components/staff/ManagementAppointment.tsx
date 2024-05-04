import { useEffect, useState } from 'react';
import Examination from '../../../main/models/examination';
import AppointmentTable from '../table/AppointmentTable';
import { Button } from '../../../~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';
import { ToastAction } from '../../../~/components/ui/toast';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import {
  APPOINTMENT_SERVICE,
  APPOINTMENT_STATUS,
} from '../../../main/models/constants';
import Appointment from '../../../main/models/appointment';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '../../../~/components/ui/alert-dialog';
import AlertConfirm from '../alert/AlertConfirm';
import DialogAppointmentContent from '../dialog/AppointmentContent';

export default function ManagementAppointment() {
  const [status, setStatus] = useState<APPOINTMENT_STATUS>(
    APPOINTMENT_STATUS.CREATED
  );
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointments, setSelectedAppointments] = useState<
    Appointment[]
  >([]);

  const { toast } = useToast();

  useEffect(() => {}, []);

  const handleLoadAppointments = async (status: APPOINTMENT_STATUS) => {
    const newAppointments: Appointment[] =
      await window.electron.ipcRenderer.invoke(
        APPOINTMENT_SERVICE.GET_APPOINTMENTS,
        {
          status,
        }
      );
    setAppointments(newAppointments);
  };

  const handleCancelAppointment = async () => {
    if (selectedAppointments.length === 0) {
      return;
    }

    const appointment = selectedAppointments[selectedAppointments.length - 1];

    const response = await window.electron.ipcRenderer.invoke(
      APPOINTMENT_SERVICE.CANCEL_APPOINTMENT,
      {
        appointment_id: appointment.id,
      }
    );

    if (response === 'Success!') {
      toast({
        variant: 'default',
        title: 'Huỷ lịch thành công',
        description: 'Vui lòng load lại bảng để cập nhật',
      });
      setStatus(APPOINTMENT_STATUS.CANCEL);
      return;
    }

    toast({
      variant: 'destructive',
      title: 'Huỷ lịch thất bại',
      description: 'Vui lòng thử lại sau',
    });
  };

  return (
    <div className="flex flex-col w-full h-full px-12 pt-5">
      <AppointmentTable
        status={status}
        appointments={appointments}
        setStatus={setStatus}
        handleLoadAppointments={handleLoadAppointments}
        setSelectedAppointments={setSelectedAppointments}
      />

      <div className="flex items-center justify-end gap-2 w-full mt-5">
        {status === APPOINTMENT_STATUS.CREATED && (
          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                variant={'destructive'}
                size={'lg'}
                disabled={selectedAppointments.length === 0}
                onClick={handleCancelAppointment}
              >
                Huỷ lịch
              </Button>
            </AlertDialogTrigger>
            {selectedAppointments.length > 0 && (
              <AlertConfirm handleAction={handleCancelAppointment} />
            )}
          </AlertDialog>
        )}

        <Dialog>
          <DialogTrigger disabled={selectedAppointments.length === 0}>
            <Button
              disabled={selectedAppointments.length === 0}
              variant={'default'}
              size={'lg'}
            >
              Chỉnh sửa
            </Button>
          </DialogTrigger>
          {selectedAppointments.length > 0 && (
            <DialogAppointmentContent
              appointment={
                selectedAppointments[selectedAppointments.length - 1]
              }
              handleClose={() => setSelectedAppointments([])}
            ></DialogAppointmentContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
