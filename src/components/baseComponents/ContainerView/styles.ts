import {scale, ScaledSheet} from 'react-native-size-matters';
import sizeValues from '../../../themes/sizeValues';
import {colorThemes} from '../../../themes/colors';

const styles = ScaledSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: colorThemes.white,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeContainer: {
    flex: 1,
    padding: sizeValues.size16,
  },
  container: {
    flexGrow: 1,
    padding: sizeValues.size16,
  },
  loadingView: {
    width: '100%',
    height: '100%',
  },
  back: {
    height: scale(50),
    justifyContent: 'center',
    backgroundColor: colorThemes.white,
    borderWidth: 1,
    borderColor: '#ebebeb',
  },
  ovalStyle: {
    position: 'absolute',
    bottom: scale(50),
  },
  navigationHeader: {
    padding: sizeValues.size16,
  },
});

export default styles;
