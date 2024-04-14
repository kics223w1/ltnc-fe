import { MAIN_VIEW_TAB } from '/main/models/constant';

export const getTabTitle = (tab: MAIN_VIEW_TAB): string => {
  switch (tab) {
    case MAIN_VIEW_TAB.DOCTOR_INFORMATION:
      return 'Doctor Information';
    case MAIN_VIEW_TAB.NURSE_INFORMATION:
      return 'Nurse Information';
    case MAIN_VIEW_TAB.OTHER_STAFFS_INFORMATION:
      return 'Other Staff Information';
    case MAIN_VIEW_TAB.STAFF_MANAGEMENT:
      return 'Management';
  }
};
