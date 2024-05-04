enum OS_PLATFORM {
  MAC_OS = 'OS_PLATFORM_MAC_OS',
  WINDOWS = 'OS_PLATFORM_WINDOWS',
  LINUX = 'OS_PLATFORM_LINUX',
  UKNOWN = 'OS_PLATFORM_UKNOWN',
}

enum EVENTS_FROM_MAIN_PROCESS {
  ON_SHOW_DIALOG = 'EVENTS_FROM_MAIN_PROCESS_ON_SHOW_DIALOG',
  ON_UPDATE_MAIN_VIEW = 'EVENTS_FROM_MAIN_PROCESS_ON_UPDATE_MAIN_VIEW',
  ON_CLOSE_APP = 'EVENTS_FROM_MAIN_PROCESS_ON_CLOSE_APP',
  ON_TOGGLE_FULL_SCREEN = 'EVENTS_FROM_MAIN_PROCESS_ON_TOGGLE_FULL_SCREEN',
  ON_MINIMIZE_APP = 'EVENTS_FROM_MAIN_PROCESS_ON_MINIMIZE_APP',
  ON_UPDATE_USER = 'EVENTS_FROM_MAIN_PROCESS_ON_UPDATE_USER',
}

enum NOTIFICATION_SERVICE {
  ON_SHOW_DIALOG = 'NOTIFICATION_SERVICE_ON_SHOW_DIALOG',
}

enum MAIN_VIEW_TAB {
  DOCTOR_LIST = 'MAIN_VIEW_TAB_DOCTOR_LIST',
  PATIENT_LIST = 'MAIN_VIEW_TAB_PATIENT_LIST',
  NURSE_LIST = 'MAIN_VIEW_TAB_NURSE_LIST',
  OTHER_STAFFS_INFORMATION = 'MAIN_VIEW_TAB_OTHER_STAFFS_INFORMATION',
  MANAGEMENT_EXAMINATION = 'MAIN_VIEW_TAB_MANAGEMENT_EXAMINATION',

  USER_PROFILE = 'MAIN_VIEW_TAB_USER_PROFILE',

  PATIENT_HISTORY = 'MAIN_VIEW_TAB_PATIENT_HISTORY',
  PATIENT_APPOINTMENT = 'MAIN_VIEW_TAB_PATIENT_APPOINTMENT',
  PATIENT_BILLING = 'MAIN_VIEW_TAB_PATIENT_BILLING',
  PATIENT_BOOKING = 'MAIN_VIEW_TAB_PATIENT_BOOKING',

  ADMIN_DOCTOR_DASHBOARD = 'MAIN_VIEW_TAB_ADMIN_DOCTOR_DASHBOARD',
  ADMIN_NURSE_DASHBOARD = 'MAIN_VIEW_TAB_ADMIN_NURSE_DASHBOARD',
  ADMIN_MACHINE_DASHBOARD = 'MAIN_VIEW_TAB_ADMIN_MACHINE_DASHBOARD',
  ADMIN_MEDICINE_DASHBOARD = 'MAIN_VIEW_TAB_ADMIN_MEDICINE_DASHBOARD',
  ADMIN_BATCH_DASHBOARD = 'MAIN_VIEW_TAB_ADMIN_BATCH_DASHBOARD',

  MACHINE_LIST = 'MAIN_VIEW_TAB_MACHINE_LIST',
  MEDICINE_LIST = 'MAIN_VIEW_TAB_MEDICINE_LIST',
}

enum ROLE {
  ADMIN = 'admin',
  NURSE = 'nurse',
  PATIENT = 'patient',
  DOCTOR = 'doctor',
}

enum EXAMINATION_STATUS {
  CREATED = 'created',
  DONE = 'done',
  CANCEL = 'cancel',
}

enum ICON_SVG {
  APPLE_LOGO = 'apple.logo.svg',
  BELL = 'bell.svg',
  MINUS = 'minus.svg',
  MINUS_THICKER = 'minus.thicker.svg',
  MOON_STARS = 'moon.stars.svg',
  PLUS = 'plus.svg',
  PLUS_THICKER = 'plus.thicker.svg',
  PIN_FILL = 'pin.fill.svg',
  GEAR = 'gear.svg',
  LOCK = 'lock.svg',
  DOC = 'doc.svg',
  LOCK_OPEN = 'lock.open.svg',
  PERSON_FILL = 'person.fill.svg',
  GITHUB = 'github.svg',
  GEAR_SHAPE_FILL = 'gearshape.fill.svg',
  TWITTER = 'twitter.svg',
  TRASH = 'trash.svg',
  XMARK = 'xmark.svg',
  XMARK_THICKER = 'xmark.thicker.svg',
  XMARK_CIRCLE_FILL = 'xmark.circle.fill.svg',
  NETWORK = 'network.svg',
  INFO_CIRCLE_FILL = 'info.circle.fill.svg',
  IPHONE = 'iphone.svg',
  FOLDER = 'folder.svg',
  QUESTION_MARK_CIRCLE = 'questionmark.circle.svg',
  HEART_FILL = 'heart.fill.svg',
  QR_ICON = 'qr-icon.svg',
  EYE = 'eye.svg',
  EYE_SLASH = 'eye.slash.svg',
  SQUARE = 'square.svg',
  SERVER_RACK = 'server.rack.svg',
  DOC_ON_DOC = 'doc.on.doc.svg',
  EXCLAMATIONMARK_TRIANGLE_FILL = 'exclamationmark.triangle.fill.svg',
  EXCLAMATIONMARK_OCTAGON_FILL = 'exclamationmark.octagon.fill.svg',
  EXCLAMATIONMARK_CIRCLE = 'exclamationmark.circle.svg',
  ELLIPSIS_CIRCLE = 'ellipsis.circle.svg',
  CHECK_MARK_CIRCLE_FILL = 'checkmark.circle.fill.svg',
  CHECK_MARK = 'checkmark.svg',
  ARROW_RIGHT_CIRCLE = 'arrow.right.circle.svg',
  ARROW_UP_CIRCLE_FILL = 'arrow.up.circle.fill.svg',
  ARROW_DOWN_CIRCLE_FILL = 'arrow.down.circle.fill.svg',
  ARROW_DOWN_TO_LINE_COMPACT = 'arrow.down.to.line.compact.svg',
  MAGNIFLYING_GLASS = 'magniflyingglass.svg',
  CHEVRON_UP_CHEVRON_DOWN = 'chevron.up.chevron.down.svg',
  CHEVRON_FORWARD = 'chevron.forward.svg',
  CHEVRON_BACKWARD = 'chevron.backward.svg',
  CHEVRON_DOWN = 'chevron.down.svg',
  CHEVRON_RIGHT = 'chevron.right.svg',
  CHEVRON_LEFT = 'chevron.left.svg',
  LINE_3_HORIZONTAL_DECREASE_CIRCLE = 'line.3.horizontal.decrease.circle.svg',
  WRENCH_AND_SCREWDRIVER = 'wrench.and.screwdriver.svg',
  WAND_AND_STARS = 'wand.and.stars.svg',
  SQUARE_AND_PENCIL = 'square.and.pencil.svg',
  STAR_CIRCLE = 'star.circle.svg',
  SUN_MAX = 'sun.max.svg',
  TORTOISE = 'tortoise.svg',
  TRAY_AND_ARROW_DOWN_FILL = 'tray.and.arrow.down.fill.svg',
  BOTH_HORIZONTAL_CIRCLE = 'bolt.horizontal.circle.svg',
  ARROW_UP_RIGHT_CIRCLE_FILE = 'arrow.up.right.circle.fill.svg',
  PERSON_2_1 = 'person.2.1.svg',
  TABLE_CELL_1 = 'table.cell.1.svg',
  PERSON_3_SEQUENCE_1 = 'person.3.sequence.1.svg',
}

enum MACHINE_SERVICE {
  GET_MACHINES = 'MACHINE_SERVICE_GET_MACHINES',
  RELOAD_MACHINES = 'MACHINE_SERVICE_RELOAD_MACHINES',
  EDIT_MACHINE = 'MACHINE_SERVICE_EDIT_MACHINE',
  DELETE_MACHINE = 'MACHINE_SERVICE_DELETE_MACHINE',

  ADD_MACHINE = 'MACHINE_SERVICE_ADD_MACHINE',
}

enum MEDICINE_SERVICE {
  GET_MEDICINES = 'MEDICINE_SERVICE_GET_MEDICINES',
  GET_MEDICINE_LOG = 'MEDICINE_SERVICE_GET_MEDICINE_LOG',

  GET_BATCHES = 'MEDICINE_SERVICE_GET_BATCHES',

  RELOAD_MEDICINES = 'MEDICINE_SERVICE_RELOAD_MEDICINES',
  RELOAD_BATCHES = 'MEDICINE_SERVICE_RELOAD_BATCHES',

  EDIT_MEDICINE_COST = 'MEDICINE_SERVICE_EDIT_MEDICINE_COST',
  EDIT_MEDICINES = 'MEDICINE_SERVICE_EDIT_MEDICINES',

  DELETE_MEDICINES = 'MEDICINE_SERVICE_DELETE_MEDICINES',
}

enum PATIENT_SERVICE {
  RELOAD_PATIENTS = 'PATIENT_SERVICE_RELOAD_PATIENTS',
  RELOAD_EXAMINATIONS = 'PATIENT_SERVICE_RELOAD_EXAMINATIONS',
}

enum MANAGEMENT_SERVICE {
  GET_EXAMINATIONS = 'MANAGEMENT_SERVICE_GET_EXAMINATIONS',
  GET_MEDICINES = 'MANAGEMENT_SERVICE_GET_MEDICINES',
}

enum USER_SERVICE {
  GET_DOCTORS = 'USER_SERVICE_GET_DOCTORS',
  GET_NURSES = 'USER_SERVICE_GET_NURSES',
  GET_PATIENTS = 'USER_SERVICE_GET_PATIENTS',

  RELOAD_DOCTORS = 'USER_SERVICE_RELOAD_DOCTORS',
  RELOAD_NURSES = 'USER_SERVICE_RELOAD_NURSES',
  RELOAD_PATIENTS = 'USER_SERVICE_RELOAD_PATIENTS',

  ADD_DOCTOR = 'USER_SERVICE_ADD_DOCTOR',
  ADD_NURSE = 'USER_SERVICE_ADD_NURSE',

  UPDATE_USER = 'USER_SERVICE_UPDATE_USER',
}

enum LOGIN_SERVICE {
  SIGN_IN = 'LOGIN_SERVICE_SIGN_IN',
  LOGOUT = 'LOGIN_SERVICE_LOGOUT',
  SIGN_UP = 'LOGIN_SERVICE_SIGN_UP',
  GET_USER = 'LOGIN_SERVICE_GET_USER',

  RELOAD_USER = 'LOGIN_SERVICE_RELOAD_USER',
}

enum APP_CONFIG_KEY {
  USER_OBJECT = 'APP_CONFIG_KEY_USER_OBJECT',
  START_TIME_REMEMBER_ME = 'APP_CONFIG_KEY_START_TIME_REMEMBER_ME',
}

enum APPOINTMENT_SERVICE {
  GET_FREE_DOCTORS = 'APPOINTMENT_SERVICE_GET_FREE_DOCTORS',
  BOOK_APPOINTMENT = 'APPOINTMENT_SERVICE_BOOK_APPOINTMENT',

  GET_APPOINTMENTS = 'APPOINTMENT_SERVICE_GET_APPOINTMENTS',
  CANCEL_APPOINTMENT = 'APPOINTMENT_SERVICE_CANCEL_APPOINTMENT',
  DONE_APPOINTMENT = 'APPOINTMENT_SERVICE_DONE_APPOINTMENT',
}

enum APPOINTMENT_STATUS {
  CANCEL = 'cancel',
  DONE = 'done',
  CREATED = 'created',
}

enum MACHINE_STATUS {
  IN_PROGRESS = 'In_Use',
  ACTIVE = 'Free',
  INACTIVE = 'Broken',
  IN_MAINTENANCE = 'In_Maintenence',
}

export {
  ROLE,
  EXAMINATION_STATUS,
  OS_PLATFORM,
  EVENTS_FROM_MAIN_PROCESS,
  NOTIFICATION_SERVICE,
  MAIN_VIEW_TAB,
  MACHINE_SERVICE,
  MEDICINE_SERVICE,
  ICON_SVG,
  USER_SERVICE,
  MANAGEMENT_SERVICE,
  PATIENT_SERVICE,
  LOGIN_SERVICE,
  APP_CONFIG_KEY,
  APPOINTMENT_SERVICE,
  APPOINTMENT_STATUS,
  MACHINE_STATUS,
};
