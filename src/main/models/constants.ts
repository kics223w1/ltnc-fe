enum OS_PLATFORM {
  MAC_OS = 'OS_PLATFORM_MAC_OS',
  WINDOWS = 'OS_PLATFORM_WINDOWS',
  LINUX = 'OS_PLATFORM_LINUX',
  UKNOWN = 'OS_PLATFORM_UKNOWN',
}

enum EVENTS_FROM_MAIN_PROCESS {
  ON_SHOW_DIALOG = 'EVENTS_FROM_MAIN_PROCESS_ON_SHOW_DIALOG',
  ON_UPDATE_MAIN_VIEW = 'EVENTS_FROM_MAIN_PROCESS_ON_UPDATE_MAIN_VIEW',
}

enum NOTIFICATION_SERVICE {
  ON_SHOW_DIALOG = 'NOTIFICATION_SERVICE_ON_SHOW_DIALOG',
}

enum MAIN_VIEW_TAB {
  DOCTOR_LIST = 'MAIN_VIEW_TAB_DOCTOR_LIST',
  NURSE_INFORMATION = 'MAIN_VIEW_TAB_NURSE_INFORMATION',
  OTHER_STAFFS_INFORMATION = 'MAIN_VIEW_TAB_OTHER_STAFFS_INFORMATION',
  STAFF_MANAGEMENT = 'MAIN_VIEW_TAB_STAFF_MANAGEMENT',

  PATIENT_HISTORY = 'MAIN_VIEW_TAB_PATIENT_HISTORY',
  PATIENT_APPOINTMENT = 'MAIN_VIEW_TAB_PATIENT_APPOINTMENT',
  PATIENT_BILLING = 'MAIN_VIEW_TAB_PATIENT_BILLING',
  PATIENT_BOOKING = 'MAIN_VIEW_TAB_PATIENT_BOOKING',

  ADMIN_DOCTOR_DASHBOARD = 'MAIN_VIEW_TAB_ADMIN_DOCTOR_DASHBOARD',
  ADMIN_NURSE_DASHBOARD = 'MAIN_VIEW_TAB_ADMIN_NURSE_DASHBOARD',
  ADMIN_OTHER_STAFF_DASHBOARD = 'MAIN_VIEW_TAB_ADMIN_OTHER_STAFF_DASHBOARD',
  ADMIN_MACHINE_DASHBOARD = 'MAIN_VIEW_TAB_ADMIN_MACHINE_DASHBOARD',
}

enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
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
  DELETE_MACHINES = 'MACHINE_SERVICE_DELETE_MACHINES',
}

enum DOCTOR_SERVICE {
  GET_DOCTORS = 'DOCTOR_SERVICE_GET_DOCTORS',
  RELOAD_DOCTORS = 'DOCTOR_SERVICE_RELOAD_DOCTORS',
  EDIT_DOCTOR = 'DOCTOR_SERVICE_EDIT_DOCTOR',
  DELETE_DOCTORS = 'DOCTOR_SERVICE_DELETE_DOCTORS',
}

export {
  ROLE,
  EXAMINATION_STATUS,
  OS_PLATFORM,
  EVENTS_FROM_MAIN_PROCESS,
  NOTIFICATION_SERVICE,
  MAIN_VIEW_TAB,
  MACHINE_SERVICE,
  ICON_SVG,
  DOCTOR_SERVICE,
};
