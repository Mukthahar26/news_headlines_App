import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colorThemes} from '../../../themes/colors';
import sizeValues from '../../../themes/sizeValues';

const styles = StyleSheet.create({
  container: {
    margin: sizeValues.size16,
    backgroundColor: colorThemes.lightGray,
    height: scale(140),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(8),
  },
  message: {
    color: colorThemes.black40,
    fontSize: sizeValues.fontMedium,
    marginTop: scale(10),
  },
});

export default styles;
