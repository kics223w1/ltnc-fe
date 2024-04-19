import { MAIN_VIEW_TAB } from '/main/models/constant';

export const getTabTitle = (tab: MAIN_VIEW_TAB): string => {
  switch (tab) {
    case MAIN_VIEW_TAB.DOCTOR_LIST:
      return 'Doctor List';
    case MAIN_VIEW_TAB.NURSE_INFORMATION:
      return 'Nurse List';
    case MAIN_VIEW_TAB.OTHER_STAFFS_INFORMATION:
      return 'Other Staff List';
    case MAIN_VIEW_TAB.STAFF_MANAGEMENT:
      return 'Management';
    case MAIN_VIEW_TAB.PATIENT_HISTORY:
      return 'Patient History';
    case MAIN_VIEW_TAB.PATIENT_APPOINTMENT:
      return 'Patient Appointment';
    case MAIN_VIEW_TAB.PATIENT_BILLING:
      return 'Patient Billing';
    case MAIN_VIEW_TAB.PATIENT_BOOKING:
      return 'Patient Booking';
    case MAIN_VIEW_TAB.ADMIN_DOCTOR_DASHBOARD:
      return 'Doctor Dashboard';
    case MAIN_VIEW_TAB.ADMIN_NURSE_DASHBOARD:
      return 'Nurse Dashboard';
    case MAIN_VIEW_TAB.ADMIN_OTHER_STAFF_DASHBOARD:
      return 'Other Staff Dashboard';
    case MAIN_VIEW_TAB.ADMIN_MACHINE_DASHBOARD:
      return 'Machine Dashboard';
    default:
      return '';
  }
};
