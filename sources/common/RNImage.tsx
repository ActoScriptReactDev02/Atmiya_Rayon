import React from 'react';
import { Image } from 'react-native';
import RNStyles from './RNStyles';

const RNImage = ({
  source,
  tintColor,
  resizeMode,
  style,
  ImageUri,
  onLoadStart,
  onLoadEnd,
  onError,
}) => {
  return (
    <Image
      tintColor={tintColor}
      resizeMode={resizeMode || 'contain'}
      source={
        ImageUri
          ? {
              uri: ImageUri,
              //  cache: 'only-if-cached',
            }
          : source
      }
      style={[RNStyles.image100, style]}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
      onError={onError}
    />
    // <FastImage
    //   tintColor={tintColor}
    //   source={
    //     ImageUri
    //       ? {
    //           uri: ImageUri,
    //           priority: FastImage.priority.normal,
    //           cache: FastImage.cacheControl.cacheOnly,
    //         }
    //       : source
    //   }
    //   resizeMode={resizeMode ? resizeMode : FastImage.resizeMode.contain}
    //   style={[RNStyles.image100, style]}
    // />
  );
};

export default React.memo(RNImage);
