import {scale} from 'react-native-size-matters';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');
const sizeValues = {
  fontNormal: scale(12),
  fontMedium: scale(14),
  size16: scale(16),
  size10: scale(10),
  screenHeight: height,
  screenWidth: width,
};

export default sizeValues;
