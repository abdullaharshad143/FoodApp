import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const guideLineBaseWidth = 375;
const guideLineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guideLineBaseWidth) * size;
const verticalScale = (size: number) => (height / guideLineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };