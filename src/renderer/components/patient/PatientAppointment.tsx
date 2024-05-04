import { Button } from '/~/components/ui/button';
import {
  APPOINTMENT_SERVICE,
  APPOINTMENT_STATUS,
  EVENTS_FROM_MAIN_PROCESS,
  MAIN_VIEW_TAB,
} from '../../../main/models/constants';
import AppointmentTable from '../table/AppointmentTable';
import { useState } from 'react';
import { Dialog, DialogTrigger } from '../../../~/components/ui/dialog';
import Appointment from '../../../main/models/appointment';
import DoctorInformation from '../dialog/DoctorInformation';
import { Alert } from '../../../~/components/ui/alert';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '../../../~/components/ui/alert-dialog';
import AlertConfirm from '../alert/AlertConfirm';
import { useToast } from '../../../~/components/ui/use-toast';

type Params = {};

const PatientAppointment = ({}: Params) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointments, setSelectedAppointments] = useState<
    Appointment[]
  >([]);
  const [status, setStatus] = useState<APPOINTMENT_STATUS>(
    APPOINTMENT_STATUS.CREATED
  );

  const { toast } = useToast();

  const handleNewAppointment = () => {
    window.electron.ipcRenderer.sendMessage(
      EVENTS_FROM_MAIN_PROCESS.ON_UPDATE_MAIN_VIEW,
      {
        tab: MAIN_VIEW_TAB.PATIENT_BOOKING,
      }
    );
  };

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
    <div className="flex flex-col w-full h-full px-12 pt-10">
      <AppointmentTable
        handleLoadAppointments={handleLoadAppointments}
        appointments={appointments}
        setSelectedAppointments={setSelectedAppointments}
        status={status}
        setStatus={setStatus}
      />
      <div className="flex items-center justify-between gap-4 mt-5">
        <Dialog>
          <DialogTrigger disabled={selectedAppointments.length === 0}>
            <Button
              disabled={selectedAppointments.length === 0}
              variant={'outline'}
              size={'lg'}
            >
              Xem lý lịch bác sĩ
            </Button>
          </DialogTrigger>
          {selectedAppointments.length > 0 && (
            <DoctorInformation
              doctor={
                selectedAppointments[selectedAppointments.length - 1].doctor
              }
            />
          )}
        </Dialog>

        <div className="flex items-center gap-4">
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

          <Button
            variant={'default'}
            size={'lg'}
            onClick={handleNewAppointment}
          >
            Đặt lịch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointment;
