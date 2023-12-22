import React, {useState} from 'react';
import {Image, ImageStyle, View} from 'react-native';

import {ImageIcon} from '../../../utilities/iconPaths';
import {isFieldEmpty} from '../../../utilities/utils';
import styles from './styles';
import Loader from '../../baseComponents/loader';

type Props = {
  uri: string;
  style?: ImageStyle;
};

const ImageViewer = ({uri, style}: Props) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return isFieldEmpty(uri) ? (
    <View>
      {loading && (
        <View style={[styles.thumbnail, style]}>
          <Loader />
        </View>
      )}
      <Image
        onLoad={handleImageLoad}
        source={{uri}}
        style={loading ? [] : [styles.thumbnail, style]}
      />
    </View>
  ) : (
    <View style={styles.imageIcon}>
      <ImageIcon />
    </View>
  );
};

export default ImageViewer;
