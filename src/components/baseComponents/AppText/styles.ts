import {StyleSheet} from 'react-native';
import sizeValues from '../../../themes/sizeValues';
import {colorThemes} from '../../../themes/colors';

const styles = StyleSheet.create({
  textStyle: {
    color: colorThemes.black1,
    fontSize: sizeValues.fontNormal,
    includeFontPadding: false,
    fontFamily: 'Manrope-Regular',
    letterSpacing: 1,
  },
});

export default styles;
