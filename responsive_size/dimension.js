
// dimension.js
import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions from a standard mobile screen (e.g., iPhone 11)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Scale based on width
const scale = size => (width / guidelineBaseWidth) * size;

// Vertical scale based on height
const verticalScale = size => (height / guidelineBaseHeight) * size;

// Moderate scale (average)
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default {
  window: {
    width,
    height,
  },
  scale,
  verticalScale,
  moderateScale,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 80,
  },
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 50,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  iconSize: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },
};