import { MAIN_VIEW_TAB } from '../../../main/models/constants';

export const getTabTitle = (tab: MAIN_VIEW_TAB): string => {
  switch (tab) {
    case MAIN_VIEW_TAB.DOCTOR_LIST:
      return 'Danh sách bác sĩ';
    case MAIN_VIEW_TAB.NURSE_LIST:
      return 'Danh sách y tá';
    case MAIN_VIEW_TAB.MEDICINE_LIST:
      return 'Danh sách thuốc';
    case MAIN_VIEW_TAB.MACHINE_LIST:
      return 'Danh sách máy móc';
    case MAIN_VIEW_TAB.OTHER_STAFFS_INFORMATION:
      return 'Danh sách nhân viên khác';
    case MAIN_VIEW_TAB.MANAGEMENT_EXAMINATION:
      return 'Quản lý ca khám';
    case MAIN_VIEW_TAB.PATIENT_HISTORY:
      return 'Lịch sử khám bệnh';
    case MAIN_VIEW_TAB.PATIENT_APPOINTMENT:
      return 'Lịch khám';
    case MAIN_VIEW_TAB.PATIENT_BILLING:
      return 'Thanh toán';
    case MAIN_VIEW_TAB.PATIENT_BOOKING:
      return 'Đặt lịch khám';
    case MAIN_VIEW_TAB.ADMIN_DOCTOR_DASHBOARD:
      return 'Quản trị bác sĩ';
    case MAIN_VIEW_TAB.ADMIN_NURSE_DASHBOARD:
      return 'Quản trị y tá';
    case MAIN_VIEW_TAB.ADMIN_MACHINE_DASHBOARD:
      return 'Quản trị máy móc';
    case MAIN_VIEW_TAB.ADMIN_MEDICINE_DASHBOARD:
      return 'Quản trị thuốc';
    case MAIN_VIEW_TAB.ADMIN_BATCH_DASHBOARD:
      return 'Quản trị lô thuốc';
    case MAIN_VIEW_TAB.PATIENT_LIST:
      return 'Danh sách bệnh nhân';

    case MAIN_VIEW_TAB.USER_PROFILE:
      return 'Thông tin cá nhân';
    default:
      return '';
  }
};
