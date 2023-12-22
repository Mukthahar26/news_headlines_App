import {scale, ScaledSheet} from 'react-native-size-matters';
import sizeValues from '../../../themes/sizeValues';
import {colorThemes} from '../../../themes/colors';

const styles = ScaledSheet.create({
  heading: {
    fontSize: scale(25),
    marginTop: sizeValues.size16,
    marginBottom: sizeValues.size16,
    color: colorThemes.red,
    fontWeight: 'bold',
  },
});

export default styles;
