import ImageColors from 'react-native-image-colors';

export const getImageColor = async (uri: string) => {
  try {
    const colors = await ImageColors.getColors(uri, {
      fallback: '#228B22',
    });

    let primary, secondary;
    if (colors.platform === 'ios') {
      primary = colors.primary;
      secondary = colors.secondary;
    } else if (colors.platform === 'android') {
      primary = colors.dominant;
      secondary = colors.average;
    }
    console.log({primary, secondary});
    return [primary, secondary];
  } catch (error) {
    console.log(error);
  }
};
