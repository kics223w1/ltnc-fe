import { FONT_FAMILY, FONT_WEIGHT } from './constants';

const getSFProString = (fontWeight: FONT_WEIGHT) => {
  switch (fontWeight) {
    case FONT_WEIGHT.BOLD:
      return 'SF-Pro-Bold';
    case FONT_WEIGHT.SEMI_BOLD:
      return 'SF-Pro-SemiBold';
    case FONT_WEIGHT.MEDIUM:
      return 'SF-Pro-Medium';
    case FONT_WEIGHT.REGULAR:
      return 'SF-Pro-Regular';
    default:
      return 'SF-Pro-Regular';
  }
};

export { getSFProString };
