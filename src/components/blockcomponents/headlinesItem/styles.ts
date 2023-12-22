import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colorThemes} from '../../../themes/colors';
import sizeValues from '../../../themes/sizeValues';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: sizeValues.size16,
    backgroundColor: colorThemes.lightGrayWhite,
    elevation: 3,
  },
  image: {
    width: scale(100),
    flex: 30,
  },
  details: {
    padding: sizeValues.size10,
    flex: 70,
  },
  title: {
    fontSize: sizeValues.fontMedium,
    fontWeight: '700',
  },
  description: {
    fontSize: sizeValues.fontNormal,

    marginTop: scale(10),
  },
  date: {
    marginTop: scale(10),
  },
  button: {
    backgroundColor: colorThemes.red,
    width: scale(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: sizeValues.fontNormal,
    color: colorThemes.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: scale(120),
  },
  unpinnedIcon: {
    width: sizeValues.size16,
    height: sizeValues.size16,
  },
  unpinBtn: {
    alignSelf: 'flex-end',
    marginBottom: scale(5),
    padding: scale(5),
  },
});

export default styles;
